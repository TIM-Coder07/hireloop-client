"use client";
import React from "react";
import { useSession } from "@/lib/auth-client";
import DashboardStatsCards from "@/Component/dashboard/DashCard";

const RecruiterDashboard = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    <div>Loading...</div>;
  }

  const user = session?.user;

  return (
    <>
      <h3 className="text-lg font-medium">
        Welcome Back,
        <span className="text-2xl font-bold text-indigo-600">{user?.name}</span>
      </h3>

      <div className="mt-6">
        <DashboardStatsCards />
      </div>
    </>
  );
};

export default RecruiterDashboard;
