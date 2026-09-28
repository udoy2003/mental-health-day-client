
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "../../lib/api";

export default function AdminDashboardPage() {
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [adminUserId, setAdminUserId] = useState("");
  const [roleSelections, setRoleSelections] = useState({});
  const [updatingRoleId, setUpdatingRoleId] = useState("");
  const [roleMessage, setRoleMessage] = useState("");
  const [roleError, setRoleError] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      try {
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

        const response = await api.get("/admin/users");

        if (isMounted && response.data.success) {
          const loadedUsers = response.data.users || [];

          setAdminUserId(currentUser._id);
          setUsers(loadedUsers);

          const selections = {};
          loadedUsers.forEach((user) => {
            selections[user._id] = user.role || "student";
          });
          setRoleSelections(selections);
        }
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

        setError(
          err.response?.data?.message || "Failed to load users"
        );
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleRoleChange = (userId, newRole) => {
    setRoleSelections((previous) => ({
      ...previous,
      [userId]: newRole,
    }));
    setRoleMessage("");
    setRoleError("");
  };

  const updateUserRole = async (user) => {
    const newRole = roleSelections[user._id];

    if (!newRole || newRole === user.role) return;

    if (user._id === adminUserId) {
      setRoleError("You cannot change your own admin role.");
      return;
    }

    const confirmed = window.confirm(
      `Change ${user.name || "this user's"} role from "${user.role}" to "${newRole}"?`
    );

    if (!confirmed) return;

    setUpdatingRoleId(user._id);
    setRoleMessage("");
    setRoleError("");

    try {
      const response = await api.patch(
        `/admin/users/${user._id}/role`,
        { role: newRole }
      );

      if (response.data.success) {
        setUsers((previous) =>
          previous.map((item) =>
            item._id === user._id
              ? { ...item, role: newRole }
              : item
          )
        );

        setRoleSelections((previous) => ({
          ...previous,
          [user._id]: newRole,
        }));

        setRoleMessage(
          `${user.name || "User"}'s role updated to ${newRole}.`
        );
      }
    } catch (err) {
      setRoleError(
        err.response?.data?.message || "Failed to update user role."
      );
    } finally {
      setUpdatingRoleId("");
    }
  };

  const logout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      await api.post("/users/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("user");
      localStorage.removeItem("loggedInUser");
      router.replace("/login");
    }
  };

  const totalUsers = users.length;

  const counselingUsers = users.filter(
    (user) =>
      user.counselingStatus &&
      user.counselingStatus !== "not_registered"
  ).length;

  const pendingUsers = users.filter(
    (user) => user.counselingStatus === "pending"
  ).length;

  const assignedUsers = users.filter(
    (user) => user.counselingStatus === "assigned"
  ).length;

  const statCards = [
    {
      title: "Total Users",
      value: totalUsers,
      color: "text-slate-800",
      icon: "👥",
    },
    {
      title: "Counseling Requests",
      value: counselingUsers,
      color: "text-emerald-600",
      icon: "💚",
    },
    {
      title: "Pending",
      value: pendingUsers,
      color: "text-amber-500",
      icon: "⏳",
    },
    {
      title: "Assigned",
      value: assignedUsers,
      color: "text-blue-600",
      icon: "✓",
    },
  ];

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center animate-fade-in">
          <div className="mx-auto h-10 w-10 rounded-full border-4 border-emerald-100 border-t-emerald-600 animate-spin" />
          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading admin dashboard...
          </p>
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
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-fade-in {
          animation: softFade 0.5s ease-out both;
        }

        .animate-fade-up {
          animation: fadeInUp 0.55s ease-out both;
        }

        .dashboard-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease,
            border-color 0.25s ease;
        }

        .dashboard-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 30px rgba(15, 23, 42, 0.08);
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

      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-lg font-extrabold tracking-tight text-emerald-700 sm:text-xl">
              Mental Health Day
            </h1>
            <p className="mt-0.5 text-xs font-medium text-slate-500 sm:text-sm">
              Admin Dashboard
            </p>
          </div>

          <button
            type="button"
            onClick={logout}
            disabled={loggingOut}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
        <div className="animate-fade-up mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-600 p-6 text-white shadow-lg shadow-emerald-900/10 sm:p-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-semibold text-emerald-100">
                Administration Panel
              </p>
              <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                Admin Dashboard
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-emerald-50">
                Manage users and monitor counseling requests from one place.
              </p>
            </div>

            <div className="hidden h-20 w-20 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-4xl sm:flex">
              ♡
            </div>
          </div>
        </div>

        {error && (
          <div role="alert" className="animate-fade-in mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card, index) => (
            <div
              key={card.title}
              style={{ animationDelay: `${index * 80}ms` }}
              className="dashboard-card animate-fade-up rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-lg">
                  {card.icon}
                </span>
              </div>
              <p className={`mt-4 text-3xl font-extrabold ${card.color}`}>
                {card.value}
              </p>
            </div>
          ))}
        </div>

        <section className="animate-fade-up mt-9 sm:mt-11">
          <div className="mb-5">
            <h3 className="text-xl font-bold text-slate-800 sm:text-2xl">
              All Users
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              View users, manage roles, and check counseling information.
            </p>
          </div>

          {roleMessage && (
            <div role="status" className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              {roleMessage}
            </div>
          )}

          {roleError && (
            <div role="alert" className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {roleError}
            </div>
          )}

          <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
            <div className="flex flex-col gap-1 border-b border-slate-100 bg-slate-50/80 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p className="text-sm font-semibold text-slate-700">
                User Directory & Role Management
              </p>
              <p className="text-xs text-slate-500">
                {totalUsers} {totalUsers === 1 ? "user" : "users"} found
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px]">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    {[
                      "Name",
                      "Student ID",
                      "Email",
                      "Department",
                      "Current Role",
                      "Change Role",
                      "Counseling",
                      "Details",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => {
                    const selectedRole =
                      roleSelections[user._id] || user.role || "student";
                    const isCurrentAdmin = user._id === adminUserId;
                    const isUpdating = updatingRoleId === user._id;
                    const hasChanged = selectedRole !== user.role;

                    return (
                      <tr
                        key={user._id}
                        className="border-b border-slate-100 transition-colors last:border-b-0 hover:bg-emerald-50/30"
                      >
                        <td className="px-5 py-4">
                          <p className="font-semibold text-slate-800">
                            {user.name || "—"}
                          </p>
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {user.studentId || "—"}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {user.email || "—"}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {user.department || "—"}
                        </td>

                        <td className="px-5 py-4">
                          <span className="inline-flex rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold capitalize text-slate-700">
                            {user.role || "student"}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <select
                              aria-label={`Change role for ${user.name || user.email}`}
                              value={selectedRole}
                              disabled={isCurrentAdmin || isUpdating}
                              onChange={(event) =>
                                handleRoleChange(user._id, event.target.value)
                              }
                              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                            >
                             <option value="student">Student</option>
<option value="counselor">Counselor</option>
{user.role === "admin" && (
  <option value="admin" disabled>
    Admin (restricted)
  </option>
)}
                            </select>

                            <button
                              type="button"
                              onClick={() => updateUserRole(user)}
                              disabled={
                                isCurrentAdmin ||
                                isUpdating ||
                                !hasChanged
                              }
                              className="rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                            >
                              {isUpdating ? "Saving..." : "Save"}
                            </button>
                          </div>
                          {isCurrentAdmin && (
                            <p className="mt-1 text-xs text-slate-400">
                              Your role is protected
                            </p>
                          )}
                        </td>

                        <td className="px-5 py-4">
                          <span className="inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold capitalize text-emerald-700">
                            {(user.counselingStatus || "not_registered").replace(/_/g, " ")}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <Link
                            href={`/admin/users/${user._id}`}
                            className="inline-flex items-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                          >
                            Details <span className="ml-2" aria-hidden="true">→</span>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}

                  {users.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-xl text-slate-500">
                          👥
                        </div>
                        <p className="mt-3 font-semibold text-slate-700">
                          No users found
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          Registered users will appear here.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="border-t border-slate-100 bg-slate-50/70 px-5 py-3 sm:px-6">
              <p className="text-xs leading-5 text-slate-500">
                Role changes affect access permissions. You cannot change your own admin role. Passwords are never displayed.
              </p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}