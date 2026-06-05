"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import logo from "@/assets/logo.png";
import { authClient } from "@/lib/auth-client";
import { DropDown } from "./DropDown";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  const pathname = usePathname();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/browseJob", label: "Browse Job" },
    { href: "/company", label: "Company" },
    { href: "/pricing", label: "Pricing" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <Image src={logo} width={70} height={70} alt="Hire Loop" />
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-gray-700 hover:text-indigo-600 hover:bg-gray-100"
                    }
                  `}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* DESKTOP AUTH */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <DropDown user={user} />
          ) : (
            <>
              <Link
                href="/logIn"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
              >
                Login
              </Link>

              <Link
                href="/signUp"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition"
              >
                Signup
              </Link>
            </>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          onClick={() => setOpen(true)}
        >
          <Menu size={26} />
        </button>
      </div>

      {/* OVERLAY */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
            className="fixed inset-0 bg-black/40 z-40"
          />
        )}
      </AnimatePresence>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-50"
          >
            {/* CLOSE */}
            <div className="flex justify-end p-4">
              <button
                onClick={closeMenu}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>

            {/* MOBILE MENU */}
            <div className="px-4 flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className={`
                      px-4 py-3 rounded-lg text-sm font-medium transition
                      ${
                        isActive
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* MOBILE AUTH */}
            <div className="mt-6 px-4 flex flex-col gap-3">
              {user ? (
                <DropDown user={user} />
              ) : (
                <>
                  <Link
                    href="/logIn"
                    onClick={closeMenu}
                    className="border border-gray-200 py-2 rounded-lg text-center hover:bg-gray-50"
                  >
                    Login
                  </Link>

                  <Link
                    href="/signUp"
                    onClick={closeMenu}
                    className="bg-indigo-600 text-white py-2 rounded-lg text-center hover:bg-indigo-700"
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}