
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../lib/api";

export default function CounselorDashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [openCase, setOpenCase] = useState(null);
  const [saving, setSaving] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const [sessionForm, setSessionForm] = useState({
    title: "",
    description: "",
    sessionDate: "",
  });

  const loadCases = async () => {
    setError("");

    try {
      const response = await api.get("/counselor/cases");

      if (response.data.success) {
        setCases(response.data.cases || []);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load assigned cases."
      );
    }
  };

  useEffect(() => {
    const verifyAndLoad = async () => {
      try {
        const response = await api.get("/users/me");
        const currentUser = response.data.user;

        if (!currentUser || currentUser.role !== "counselor") {
          router.replace("/login");
          return;
        }

        setUser(currentUser);
        await loadCases();
      } catch {
        localStorage.removeItem("user");
        localStorage.removeItem("loggedInUser");
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    verifyAndLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const logout = async () => {
    setLogoutLoading(true);

    try {
      await api.post("/users/logout");
    } catch {
      // Local data will still be cleared if the request fails.
    } finally {
      localStorage.removeItem("user");
      localStorage.removeItem("loggedInUser");
      router.replace("/login");
    }
  };

  const handleSessionChange = (e) => {
    setSessionForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const addSession = async (caseId) => {
    if (!sessionForm.title.trim() || !sessionForm.description.trim() || !sessionForm.sessionDate) {
      setError("Please complete all session fields.");
      return;
    }

    setSaving(true);
    setError("");
    setMessage("");

    try {
      const response = await api.post(
        `/counselor/cases/${caseId}/sessions`,
        {
          title: sessionForm.title.trim(),
          description: sessionForm.description.trim(),
          sessionDate: sessionForm.sessionDate,
        }
      );

      if (response.data.success) {
        setMessage(response.data.message || "Session added successfully.");

        // Refresh assigned cases so the dashboard shows server data.
        await loadCases();

        setSessionForm({
          title: "",
          description: "",
          sessionDate: "",
        });

        setOpenCase(null);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to add session."
      );
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "Not available";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Not available";
    }

    return parsedDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusStyle = (status) => {
    const styles = {
      pending: "bg-amber-50 text-amber-800 border-amber-200",
      assigned: "bg-emerald-50 text-emerald-800 border-emerald-200",
      ongoing: "bg-emerald-100 text-emerald-900 border-emerald-300",
      completed: "bg-slate-100 text-slate-700 border-slate-300",
    };

    return styles[status] || "bg-slate-100 text-slate-700 border-slate-300";
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full border-4 border-emerald-100 border-t-emerald-700 animate-spin" />
          <p className="text-slate-600 mt-4 font-medium">
            Loading counselor dashboard...
          </p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-slate-600">Redirecting to login...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-800">
      <style jsx global>{`
        @keyframes counselorFadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .counselor-enter {
          animation: counselorFadeUp 0.55s ease-out both;
        }

        .counselor-card {
          animation: counselorFadeUp 0.6s ease-out both;
        }

        .counselor-card:nth-child(2) {
          animation-delay: 0.07s;
        }

        .counselor-card:nth-child(3) {
          animation-delay: 0.14s;
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              M
            </div>

            <div>
              <h1 className="text-lg sm:text-xl font-bold text-emerald-900">
                Mental Health Day
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Counselor Dashboard
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            disabled={logoutLoading}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 active:scale-95 transition-all duration-200 disabled:opacity-60"
          >
            {logoutLoading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 counselor-enter">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg">
          <div className="absolute -right-12 -top-16 h-56 w-56 rounded-full bg-white/10" />
          <div className="absolute right-24 -bottom-24 h-48 w-48 rounded-full bg-white/10" />

          <div className="relative z-10">
            <p className="text-emerald-100 font-medium">
              Welcome Counselor
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold mt-2 break-words">
              {user.name}
            </h2>

            <p className="text-emerald-50 mt-3 max-w-2xl leading-relaxed">
              Review your assigned cases and manage counseling sessions with
              care and professionalism.
            </p>
          </div>
        </div>

        {/* Messages */}
        {message && (
          <div
            role="status"
            className="mt-6 rounded-2xl bg-emerald-50 border border-emerald-200 px-5 py-4 text-emerald-800 counselor-enter"
          >
            <span className="font-semibold mr-2">✓</span>
            {message}
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mt-6 rounded-2xl bg-rose-50 border border-rose-200 px-5 py-4 text-rose-700 counselor-enter"
          >
            {error}
          </div>
        )}

        {/* Assigned Students */}
        <div className="mt-10">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-emerald-900">
                Assigned Students
              </h3>

              <p className="text-slate-500 mt-1 text-sm sm:text-base">
                Students assigned to you by the administrator.
              </p>
            </div>

            <button
              onClick={loadCases}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-50 hover:border-emerald-300 active:scale-95 transition-all duration-200"
            >
              ↻ Refresh
            </button>
          </div>

          {cases.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 counselor-enter">
              <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center text-2xl">
                ♡
              </div>

              <h4 className="font-semibold text-emerald-900 mt-4">
                No assigned cases yet
              </h4>

              <p className="text-slate-500 mt-2">
                No counseling cases have been assigned to you yet.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {cases.map((item) => (
                <div
                  key={item._id}
                  className="counselor-card bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Student Details */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Student
                      </p>

                      <h4 className="text-xl font-bold text-slate-800 mt-1 break-words">
                        {item.studentName || "Student"}
                      </h4>

                      <p className="text-sm text-slate-500 mt-1 break-all">
                        {item.studentEmail || "Email not available"}
                      </p>
                    </div>

                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize w-fit ${getStatusStyle(
                        item.status
                      )}`}
                    >
                      {item.status || "pending"}
                    </span>
                  </div>

                  {/* Concern Category */}
                  <div className="mt-6 rounded-xl bg-slate-50 border border-slate-200 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Concern
                    </p>

                    <p className="font-semibold text-emerald-900 mt-1">
                      {item.category || "Not specified"}
                    </p>
                  </div>

                  {/* Student's Concern */}
                  <div className="mt-5">
                    <p className="text-sm font-semibold text-slate-600">
                      Student&apos;s Concern
                    </p>

                    <p className="text-slate-700 mt-2 leading-7 whitespace-pre-wrap break-words">
                      {item.concern || "No concern details provided."}
                    </p>
                  </div>

                  {/* Preferred Contact */}
                  <div className="mt-5">
                    <p className="text-sm font-semibold text-slate-600">
                      Preferred Contact
                    </p>

                    <p className="font-medium text-slate-800 mt-1">
                      {item.preferredContact || "Not specified"}
                    </p>
                  </div>

                  {/* Session Form Toggle */}
                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <button
                      onClick={() => {
                        setOpenCase(
                          openCase === item._id ? null : item._id
                        );
                        setMessage("");
                        setError("");
                      }}
                      className="w-full sm:w-auto rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] text-white font-semibold px-6 py-3 transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      {openCase === item._id
                        ? "Close Session Form"
                        : "＋ Add Counseling Session"}
                    </button>
                  </div>

                  {/* Add Session Form */}
                  {openCase === item._id && (
                    <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-200 p-5 sm:p-6 counselor-enter">
                      <div>
                        <h5 className="text-lg font-bold text-emerald-900">
                          Add Session
                        </h5>

                        <p className="text-sm text-slate-500 mt-1">
                          Add a session update for this assigned case.
                        </p>
                      </div>

                      <div className="space-y-5 mt-5">
                        <div>
                          <label
                            htmlFor={`session-title-${item._id}`}
                            className="block text-sm font-semibold text-slate-700 mb-2"
                          >
                            Session Title
                          </label>

                          <input
                            id={`session-title-${item._id}`}
                            type="text"
                            name="title"
                            value={sessionForm.title}
                            onChange={handleSessionChange}
                            maxLength={150}
                            placeholder="Example: Initial Counseling Session"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 bg-white text-slate-800 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 transition-all duration-200"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor={`session-date-${item._id}`}
                            className="block text-sm font-semibold text-slate-700 mb-2"
                          >
                            Session Date
                          </label>

                          <input
                            id={`session-date-${item._id}`}
                            type="date"
                            name="sessionDate"
                            value={sessionForm.sessionDate}
                            onChange={handleSessionChange}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 bg-white text-slate-800 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 transition-all duration-200"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor={`session-description-${item._id}`}
                            className="block text-sm font-semibold text-slate-700 mb-2"
                          >
                            Session Description / Notes
                          </label>

                          <textarea
                            id={`session-description-${item._id}`}
                            name="description"
                            value={sessionForm.description}
                            onChange={handleSessionChange}
                            rows={6}
                            maxLength={5000}
                            placeholder="Write a student-visible session update. Do not include confidential counselor notes here."
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 bg-white text-slate-800 outline-none resize-y focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 transition-all duration-200"
                          />

                          <p className="text-xs text-slate-500 text-right mt-1">
                            {sessionForm.description.length}/5000 characters
                          </p>

                          <p className="text-xs text-amber-700 mt-2 leading-relaxed">
                            Privacy reminder: this description is visible to
                            the student. Do not write confidential or internal
                            counselor notes here.
                          </p>
                        </div>

                        <button
                          onClick={() => addSession(item._id)}
                          disabled={saving}
                          className="w-full sm:w-auto rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] disabled:bg-emerald-300 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          {saving ? (
                            <span className="flex items-center justify-center gap-2">
                              <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                              Saving...
                            </span>
                          ) : (
                            "Save Session"
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Session History */}
                  {item.sessions?.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-slate-200">
                      <h5 className="text-lg font-bold text-emerald-900">
                        Session History
                      </h5>

                      <div className="space-y-4 mt-4">
                        {item.sessions.map((session, index) => (
                          <div
                            key={session._id || index}
                            className="rounded-2xl bg-slate-50 border border-slate-200 p-4 sm:p-5 hover:border-emerald-200 transition-colors duration-200"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <h6 className="font-semibold text-slate-800">
                                {session.title || `Session ${index + 1}`}
                              </h6>

                              <span className="text-sm text-slate-500">
                                {formatDate(session.sessionDate)}
                              </span>
                            </div>

                            <p className="text-slate-600 mt-3 leading-7 whitespace-pre-wrap break-words">
                              {session.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 text-center">
          <p className="text-sm text-slate-500">
            Mental Health Day · Supporting care with compassion.
          </p>
        </div>
      </footer>
    </main>
  );
}