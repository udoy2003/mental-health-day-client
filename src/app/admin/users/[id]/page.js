"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import api from "../../../../lib/api";

export default function AdminUserDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [cases, setCases] = useState([]);
  const [counselors, setCounselors] = useState([]);
  const [selectedCounselors, setSelectedCounselors] = useState({});
  const [loading, setLoading] = useState(true);
  const [assigningCaseId, setAssigningCaseId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        // Always verify the current admin from the backend.
        const meResponse = await api.get("/users/me");

        if (!meResponse.data.success) {
          router.replace("/login");
          return;
        }

        const currentUser = meResponse.data.user;

        if (currentUser?.role !== "admin") {
          router.replace(
            currentUser?.role === "counselor"
              ? "/counselor"
              : "/dashboard"
          );
          return;
        }

        const [userResponse, counselorResponse] =
          await Promise.all([
            api.get(`/admin/users/${params.id}`),
            api.get("/admin/counselors"),
          ]);

        if (!isMounted) return;

        if (!userResponse.data.success) {
          setError(
            userResponse.data.message ||
              "Failed to load user details."
          );
          return;
        }

        setUser(userResponse.data.user);
        setCases(userResponse.data.cases || []);
        setCounselors(counselorResponse.data.counselors || []);
      } catch (err) {
        if (!isMounted) return;

        if (err.response?.status === 401) {
          router.replace("/login");
          return;
        }

        if (err.response?.status === 403) {
          router.replace("/dashboard");
          return;
        }

        if (err.response?.status === 404) {
          setError("User not found.");
          return;
        }

        setError(
          err.response?.data?.message ||
            "Failed to load user details."
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (params.id) {
      loadData();
    }

    return () => {
      isMounted = false;
    };
  }, [params.id, router]);

  const assignCounselor = async (caseId) => {
    const counselorId = selectedCounselors[caseId];

    if (!counselorId) {
      setError("Please select a counselor first.");
      setMessage("");
      return;
    }

    setMessage("");
    setError("");
    setAssigningCaseId(caseId);

    try {
      const response = await api.patch(
        `/admin/cases/${caseId}/assign`,
        {
          counselorId,
        }
      );

      if (response.data.success) {
        const selectedCounselor = counselors.find(
          (counselor) => counselor._id === counselorId
        );

        setCases((previousCases) =>
          previousCases.map((item) =>
            item._id === caseId
              ? {
                  ...item,
                  counselorId,
                  counselorName:
                    selectedCounselor?.name || "",
                  status: "assigned",
                  assignedAt: new Date().toISOString(),
                }
              : item
          )
        );

        setMessage(
          response.data.message ||
            "Counselor assigned successfully."
        );
      }
    } catch (err) {
      if (err.response?.status === 401) {
        router.replace("/login");
        return;
      }

      if (err.response?.status === 403) {
        router.replace("/dashboard");
        return;
      }

      setError(
        err.response?.data?.message ||
          "Failed to assign counselor."
      );
    } finally {
      setAssigningCaseId("");
    }
  };

  const formatDate = (date) => {
    if (!date) return "Not available";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Not available";
    }

    return parsedDate.toLocaleString();
  };

  const formatStatus = (status) => {
    if (!status) return "Not available";

    return status
      .replace(/_/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 rounded-full border-4 border-emerald-100 border-t-emerald-600 animate-spin" />

          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading user details...
          </p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-5 text-center">
          <p className="font-semibold text-red-700">
            {error || "User not found."}
          </p>

          <Link
            href="/admin"
            className="mt-4 inline-flex rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Back to Admin
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes softFade {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: softFade 0.5s ease-out both;
        }

        .animate-fade-up {
          animation: fadeInUp 0.55s ease-out both;
        }

        .dashboard-card {
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease;
        }

        .dashboard-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 30px rgba(15, 23, 42, 0.07);
          border-color: #a7f3d0;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in,
          .animate-fade-up {
            animation: none !important;
          }

          .dashboard-card {
            transition: none !important;
          }

          .dashboard-card:hover {
            transform: none !important;
          }
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-lg font-extrabold tracking-tight text-emerald-700 sm:text-xl">
              Mental Health Day
            </h1>

            <p className="mt-0.5 text-xs font-medium text-slate-500 sm:text-sm">
              Admin Panel
            </p>
          </div>

          <Link
            href="/admin"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
          >
            ← Back to Admin
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
        {/* Page heading */}
        <div className="animate-fade-up mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-600 p-6 text-white shadow-lg shadow-emerald-900/10 sm:p-8">
          <p className="text-sm font-semibold text-emerald-100">
            User Management
          </p>

          <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold sm:text-3xl">
                User Details
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-50">
                Review user information, counseling cases, and counselor assignments.
              </p>
            </div>

            <span className="w-fit rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white">
              {user.role || "user"}
            </span>
          </div>
        </div>

        {/* Messages */}
        {message && (
          <div
            role="status"
            className="animate-fade-in mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
          >
            {message}
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="animate-fade-in mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            {error}
          </div>
        )}

        {/* Personal information */}
        <section className="animate-fade-up">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-slate-800 sm:text-2xl">
              Personal Information
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Account and basic profile information.
            </p>
          </div>

          <div className="dashboard-card rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-7">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Name
                </p>

                <p className="mt-1 font-semibold text-slate-800">
                  {user.name || "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Email
                </p>

                <p className="mt-1 break-all font-semibold text-slate-800">
                  {user.email || "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Student ID
                </p>

                <p className="mt-1 font-semibold text-slate-800">
                  {user.studentId || "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Department
                </p>

                <p className="mt-1 font-semibold text-slate-800">
                  {user.department || "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Phone
                </p>

                <p className="mt-1 font-semibold text-slate-800">
                  {user.phone || "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Account Status
                </p>

                <span className="mt-1 inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold capitalize text-emerald-700">
                  {user.status || "Not available"}
                </span>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Counseling Status
                </p>

                <span className="mt-1 inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold capitalize text-blue-700">
                  {formatStatus(user.counselingStatus)}
                </span>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Account Created
                </p>

                <p className="mt-1 font-semibold text-slate-800">
                  {formatDate(user.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Counseling cases */}
        <section className="animate-fade-up mt-10">
          <div className="mb-5">
            <h3 className="text-xl font-bold text-slate-800 sm:text-2xl">
              Counseling Cases
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Review cases and manage counselor assignments.
            </p>
          </div>

          {cases.length === 0 ? (
            <div className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-xl">
                💬
              </div>

              <p className="mt-4 font-semibold text-slate-700">
                No counseling cases found
              </p>

              <p className="mt-1 text-sm text-slate-500">
                This user does not have any counseling case yet.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {cases.map((item, index) => (
                <article
                  key={item._id}
                  style={{ animationDelay: `${index * 80}ms` }}
                  className="dashboard-card animate-fade-up rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-7"
                >
                  {/* Case header */}
                  <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                        Concern Category
                      </p>

                      <h4 className="mt-1 text-xl font-bold text-slate-800">
                        {item.category || "Not specified"}
                      </h4>
                    </div>

                    <span className="w-fit rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-xs font-bold capitalize text-emerald-700">
                      {formatStatus(item.status)}
                    </span>
                  </div>

                  {/* Student concern */}
                  <div className="mt-6">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                      Student's Concern
                    </p>

                    <div className="mt-2 rounded-2xl bg-slate-50 p-4">
                      <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                        {item.concern || "No concern provided."}
                      </p>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                        Preferred Contact
                      </p>

                      <p className="mt-1 font-semibold capitalize text-slate-800">
                        {item.preferredContact || "Not specified"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                        Case Created
                      </p>

                      <p className="mt-1 font-semibold text-slate-800">
                        {formatDate(item.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Counselor assignment */}
                  <div className="mt-7 border-t border-slate-100 pt-6">
                    <p className="text-sm font-bold text-slate-700">
                      Counselor Assignment
                    </p>

                    <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                      <select
                        aria-label={`Assign counselor for ${item.category || "case"}`}
                        value={
                          selectedCounselors[item._id] ||
                          item.counselorId ||
                          ""
                        }
                        onChange={(event) =>
                          setSelectedCounselors((previous) => ({
                            ...previous,
                            [item._id]: event.target.value,
                          }))
                        }
                        disabled={assigningCaseId === item._id}
                        className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                      >
                        <option value="">
                          Select counselor
                        </option>

                        {counselors.map((counselor) => (
                          <option
                            key={counselor._id}
                            value={counselor._id}
                          >
                            {counselor.name}
                          </option>
                        ))}
                      </select>

                      <button
                        type="button"
                        onClick={() =>
                          assignCounselor(item._id)
                        }
                        disabled={assigningCaseId === item._id}
                        className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 hover:shadow-md disabled:cursor-not-allowed disabled:bg-slate-300"
                      >
                        {assigningCaseId === item._id
                          ? "Assigning..."
                          : "Assign Counselor"}
                      </button>
                    </div>

                    {item.counselorName && (
                      <div className="mt-3 rounded-xl bg-emerald-50 px-4 py-3">
                        <p className="text-sm text-emerald-800">
                          Currently assigned to:{" "}
                          <span className="font-bold">
                            {item.counselorName}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Sessions */}
                  {Array.isArray(item.sessions) &&
                    item.sessions.length > 0 && (
                      <div className="mt-7 border-t border-slate-100 pt-6">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-bold text-slate-700">
                              Session History
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              Full session information available to Admin.
                            </p>
                          </div>

                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                            {item.sessions.length}{" "}
                            {item.sessions.length === 1
                              ? "session"
                              : "sessions"}
                          </span>
                        </div>

                        <div className="mt-4 space-y-4">
                          {item.sessions.map((session, sessionIndex) => (
                            <div
                              key={
                                session._id ||
                                `${item._id}-session-${sessionIndex}`
                              }
                              className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5"
                            >
                              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                  <p className="font-bold text-slate-800">
                                    {session.title ||
                                      `Session ${sessionIndex + 1}`}
                                  </p>

                                  <p className="mt-1 text-xs text-slate-500">
                                    {formatDate(
                                      session.sessionDate ||
                                        session.createdAt
                                    )}
                                  </p>
                                </div>

                                {session.counselorName && (
                                  <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                                    {session.counselorName}
                                  </span>
                                )}
                              </div>

                              {session.description && (
                                <div className="mt-4">
                                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                    Session Description
                                  </p>

                                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                                    {session.description}
                                  </p>
                                </div>
                              )}

                              {session.privateNote && (
                                <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
                                  <p className="text-xs font-bold uppercase tracking-wide text-amber-700">
                                    Private Counselor Note
                                  </p>

                                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-amber-900">
                                    {session.privateNote}
                                  </p>
                                </div>
                              )}

                              {session.internalNote && (
                                <div className="mt-4 rounded-xl border border-slate-300 bg-slate-100 p-4">
                                  <p className="text-xs font-bold uppercase tracking-wide text-slate-600">
                                    Internal Note
                                  </p>

                                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                                    {session.internalNote}
                                  </p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Privacy notice */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <p className="text-xs leading-5 text-slate-500">
            Admin access includes authorized user and counseling-case
            information. Passwords are never displayed. Private counselor
            notes are restricted to authorized Admin/Counselor access and
            are not intended for student display.
          </p>
        </div>
      </section>
    </main>
  );
}