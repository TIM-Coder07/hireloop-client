"use client";

import { motion } from "motion/react";
import { Card } from "@heroui/react";
import {
  Briefcase,
  PlusCircle,
  PhoneCall,
  Eye,
} from "lucide-react";

const stats = [
  {
    title: "Available Jobs",
    value: 24,
    icon: Briefcase,
    color: "text-blue-500",
  },
  {
    title: "Posted Jobs",
    value: 8,
    icon: PlusCircle,
    color: "text-green-500",
  },
  {
    title: "Interview Calls",
    value: 12,
    icon: PhoneCall,
    color: "text-orange-500",
  },
  {
    title: "Application Views",
    value: 340,
    icon: Eye,
    color: "text-purple-500",
  },
];

export default function DashboardStatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card className="p-5 rounded-2xl shadow-md hover:shadow-xl transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{item.title}</p>
                  <h2 className="text-2xl font-bold mt-1">
                    {item.value}
                  </h2>
                </div>

                <div
                  className={`p-3 rounded-xl bg-gray-100 ${item.color}`}
                >
                  <Icon size={22} />
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}