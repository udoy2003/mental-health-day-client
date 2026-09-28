
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../lib/api";

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [historyError, setHistoryError] = useState("");
  const [cases, setCases] = useState([]);

  const [form, setForm] = useState({
    category: "",
    concern: "",
    preferredContact: "Email",
  });

  const loadHistory = async () => {
    setHistoryLoading(true);
    setHistoryError("");

    try {
      const response = await api.get("/counseling/my-cases");

      if (response.data.success) {
        setCases(response.data.cases || []);
      }
    } catch (error) {
      setHistoryError(
        error.response?.data?.message ||
          "Could not load counseling history."
      );
    } finally {
      setHistoryLoading(false);
    }
  };

  // Verify the logged-in user through the backend.
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await api.get("/users/me");
        const currentUser = response.data.user;

        if (!currentUser || currentUser.role !== "student") {
          router.replace("/login");
          return;
        }

        setUser(currentUser);
        await loadHistory();
      } catch {
        localStorage.removeItem("user");
        localStorage.removeItem("loggedInUser");
        router.replace("/login");
      }
    };

    verifyUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await api.post("/counseling/register", form);

      if (response.data.success) {
        setMessage(response.data.message || "Counseling request submitted successfully.");

        setForm({
          category: "",
          concern: "",
          preferredContact: "Email",
        });

        setShowForm(false);
        await loadHistory();
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Counseling registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLogoutLoading(true);

    try {
      await api.post("/users/logout");
    } catch {
      // Clear local data even if the server request fails.
    } finally {
      localStorage.removeItem("user");
      localStorage.removeItem("loggedInUser");
      router.replace("/login");
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
      pending: "bg-amber-50 text-amber-800 border-amber-300",
      assigned: "bg-emerald-50 text-emerald-800 border-emerald-300",
      ongoing: "bg-emerald-100 text-emerald-900 border-emerald-400",
      completed: "bg-slate-200 text-slate-800 border-slate-400",
    };

    return styles[status] || "bg-slate-200 text-slate-800 border-slate-400";
  };

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
        <div className="text-center animate-fade-up">
          <div className="mx-auto h-12 w-12 rounded-full border-4 border-emerald-100 border-t-emerald-700 animate-spin" />
          <p className="text-slate-600 mt-4 font-medium">
            Loading your dashboard...
          </p>
        </div>

        <style jsx>{`
          @keyframes fade-up {
            from {
              opacity: 0;
              transform: translateY(14px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-up {
            animation: fade-up 0.5s ease-out both;
          }
        `}</style>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-800">
      <style jsx global>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes softFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .page-enter {
          animation: fadeUp 0.55s ease-out both;
        }

        .card-enter {
          animation: fadeUp 0.65s ease-out both;
        }

        .card-enter:nth-child(2) {
          animation-delay: 0.08s;
        }

        .card-enter:nth-child(3) {
          animation-delay: 0.16s;
        }

        .soft-float {
          animation: softFloat 4s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
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

            <h1 className="text-lg sm:text-xl font-bold text-emerald-900">
              Mental Health Day
            </h1>
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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 page-enter">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg">
          <div className="absolute -right-12 -top-16 h-56 w-56 rounded-full bg-white/10 soft-float" />
          <div className="absolute right-24 -bottom-24 h-48 w-48 rounded-full bg-white/10" />

          <div className="relative z-10">
            <p className="text-emerald-100 mb-2 font-medium">
              Welcome back
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold break-words">
              {user.name}
            </h2>

            <p className="mt-3 text-emerald-50 max-w-xl">
              Your mental wellbeing matters. Take a moment for yourself—you
              deserve care, support, and understanding.
            </p>
          </div>
        </div>

        {/* Success Message */}
        {message && (
          <div
            role="status"
            className="mt-6 rounded-2xl bg-emerald-50 border border-emerald-300 px-5 py-4 text-emerald-900 page-enter"
          >
            <div className="flex items-start gap-3">
              <span className="text-xl" aria-hidden="true">✓</span>
              <p>{message}</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div
            role="alert"
            className="mt-6 rounded-2xl bg-rose-50 border border-rose-200 px-5 py-4 text-rose-700 page-enter"
          >
            {error}
          </div>
        )}

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mt-8">
          <div className="card-enter bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="h-11 w-11 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-xl">
              <span aria-hidden="true">👤</span>
            </div>

            <p className="text-sm text-slate-500 mt-5">Account</p>

            <h3 className="text-xl font-semibold text-slate-800 mt-1">
              Student
            </h3>

            <p className="text-sm text-slate-500 mt-2 break-all">
              {user.email}
            </p>
          </div>

          <div className="card-enter bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="h-11 w-11 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center text-xl">
              <span aria-hidden="true">♡</span>
            </div>

            <p className="text-sm text-slate-500 mt-5">Counseling</p>

            <h3 className="text-xl font-semibold text-slate-800 mt-1">
              Need Support?
            </h3>

            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Register for counseling and share what you are experiencing.
            </p>

            <button
              onClick={() => {
                setShowForm(!showForm);
                setMessage("");
                setError("");
              }}
              className="mt-5 w-full rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] text-white font-semibold py-3 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {showForm ? "Close Form" : "Register for Counseling"}
            </button>
          </div>

          <div className="card-enter bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="h-11 w-11 rounded-xl bg-slate-100 text-emerald-800 flex items-center justify-center text-xl">
              <span aria-hidden="true">✦</span>
            </div>

            <p className="text-sm text-slate-500 mt-5">Support</p>

            <h3 className="text-xl font-semibold text-slate-800 mt-1">
              Mental Health
            </h3>

            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Learn about mental health and available support.
            </p>
          </div>
        </div>

        {/* Counseling Registration Form */}
        {showForm && (
          <div className="mt-8 bg-white rounded-3xl border border-slate-200 shadow-md p-5 sm:p-8 page-enter">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xl">
                  ♡
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-emerald-900">
                    Counseling Registration
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Your wellbeing is important to us.
                  </p>
                </div>
              </div>

              <p className="text-slate-600 mt-5 leading-relaxed">
                Please share a little about what you are experiencing. You do
                not need to provide more personal information than you are
                comfortable sharing.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    What would you like support with?
                  </label>

                  <select
                    id="category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 bg-white text-slate-800 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 transition-all duration-200"
                  >
                    <option value="">Select a concern</option>
                    <option value="Stress & Academic Pressure">
                      Stress & Academic Pressure
                    </option>
                    <option value="Anxiety">Anxiety</option>
                    <option value="Depression & Low Mood">
                      Depression & Low Mood
                    </option>
                    <option value="Sleep & Mental Wellbeing">
                      Sleep & Mental Wellbeing
                    </option>
                    <option value="Relationships & Emotional Wellbeing">
                      Relationships & Emotional Wellbeing
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="concern"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Tell us about your concern
                  </label>

                  <textarea
                    id="concern"
                    name="concern"
                    value={form.concern}
                    onChange={handleChange}
                    required
                    minLength={5}
                    maxLength={5000}
                    rows={6}
                    placeholder="Describe what you are currently experiencing..."
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none resize-y focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 transition-all duration-200"
                  />

                  <p className="text-xs text-slate-500 text-right mt-1">
                    {form.concern.length}/5000 characters
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="preferredContact"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Preferred contact method
                  </label>

                  <select
                    id="preferredContact"
                    name="preferredContact"
                    value={form.preferredContact}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 bg-white text-slate-800 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 transition-all duration-200"
                  >
                    <option value="Email">Email</option>
                    <option value="Phone">Phone</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] disabled:bg-emerald-300 disabled:cursor-not-allowed text-white font-semibold px-8 py-3.5 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    "Submit Counseling Request"
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Counseling History */}
        <section className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-emerald-900">
                My Counseling History
              </h2>
              <p className="text-slate-600 mt-1 text-sm sm:text-base">
                View your counseling requests and session updates.
              </p>
            </div>

            <button
              onClick={loadHistory}
              disabled={historyLoading}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-50 hover:border-emerald-300 active:scale-95 disabled:opacity-50 transition-all duration-200"
            >
              {historyLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-3.5 w-3.5 rounded-full border-2 border-emerald-200 border-t-emerald-700 animate-spin" />
                  Loading...
                </span>
              ) : (
                "↻ Refresh"
              )}
            </button>
          </div>

          {historyLoading && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 text-slate-600">
              <div className="flex items-center gap-3">
                <span className="h-5 w-5 rounded-full border-2 border-emerald-200 border-t-emerald-700 animate-spin" />
                Loading your counseling history...
              </div>
            </div>
          )}

          {!historyLoading && historyError && (
            <div className="bg-white rounded-2xl border border-rose-200 p-6 page-enter">
              <p className="text-rose-700">{historyError}</p>
              <button
                onClick={loadHistory}
                className="mt-4 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800 transition"
              >
                Try Again
              </button>
            </div>
          )}

          {!historyLoading && !historyError && cases.length === 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm page-enter">
              <div className="mx-auto h-14 w-14 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center text-2xl">
                ♡
              </div>

              <h3 className="text-lg font-semibold text-emerald-900 mt-4">
                No counseling history yet
              </h3>

              <p className="text-slate-600 mt-2">
                Your counseling requests and sessions will appear here.
              </p>
            </div>
          )}

          {!historyLoading && !historyError && cases.length > 0 && (
            <div className="space-y-6">
              {cases.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 page-enter"
                >
                  <div className="p-5 sm:p-6 border-b border-slate-200">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-sm text-slate-500">
                          Counseling concern
                        </p>

                        <h3 className="text-lg font-bold text-emerald-900 mt-1">
                          {item.category}
                        </h3>
                      </div>

                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mt-5">
                      <div>
                        <p className="text-xs text-slate-500">Submitted</p>
                        <p className="text-sm font-medium text-slate-700 mt-1">
                          {formatDate(item.createdAt)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">Counselor</p>
                        <p className="text-sm font-medium text-slate-700 mt-1">
                          {item.counselorName || "Not assigned yet"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5">
                      <p className="text-xs text-slate-500">
                        Your submitted concern
                      </p>

                      <p className="text-sm text-slate-700 mt-2 whitespace-pre-wrap leading-relaxed">
                        {item.concern}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 bg-slate-50">
                    <h4 className="font-semibold text-emerald-900 flex items-center gap-2">
                      <span aria-hidden="true">▣</span>
                      Session History
                    </h4>

                    {!item.sessions || item.sessions.length === 0 ? (
                      <p className="text-sm text-slate-600 mt-3">
                        No session has been added yet.
                      </p>
                    ) : (
                      <div className="space-y-4 mt-4">
                        {item.sessions.map((session, index) => (
                          <div
                            key={session._id || index}
                            className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 hover:border-emerald-200 transition-colors duration-200"
                          >
                            <div className="flex flex-wrap justify-between gap-2">
                              <h5 className="font-semibold text-emerald-900">
                                {session.title || `Session ${index + 1}`}
                              </h5>

                              <span className="text-xs text-slate-600">
                                {formatDate(session.sessionDate)}
                              </span>
                            </div>

                            <p className="text-sm text-slate-700 mt-3 whitespace-pre-wrap leading-relaxed">
                              {session.description}
                            </p>

                            <p className="text-xs text-slate-500 mt-4">
                              Added by:{" "}
                              {session.counselorName ||
                                item.counselorName ||
                                "Counselor"}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 text-center">
          <p className="text-sm text-slate-500">
            Mental Health Day · Your wellbeing matters.
          </p>
        </div>
      </footer>
    </main>
  );
}