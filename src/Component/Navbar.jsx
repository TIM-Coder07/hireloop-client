"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

import logo from "@/assets/logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  // 🔒 lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src={logo} width={70} height={70} alt="Hire Loop" priority />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 font-medium">
          <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
          <li><Link href="/about" className="hover:text-blue-600">About</Link></li>
          <li><Link href="/services" className="hover:text-blue-600">Services</Link></li>
          <li><Link href="/contact" className="hover:text-blue-600">Contact</Link></li>
        </ul>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="px-4 py-2 border rounded-lg hover:bg-gray-100">
            Login
          </Link>

          <Link href="/signUp" className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
            Signup
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Overlay */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close */}
        <div className="flex justify-end p-4">
          <button onClick={closeMenu} aria-label="Close menu">
            <X size={26} />
          </button>
        </div>

        {/* Menu */}
        <ul className="flex flex-col gap-5 px-6 font-medium">
          <li><Link href="/" onClick={closeMenu}>Home</Link></li>
          <li><Link href="/about" onClick={closeMenu}>About</Link></li>
          <li><Link href="/services" onClick={closeMenu}>Services</Link></li>
          <li><Link href="/contact" onClick={closeMenu}>Contact</Link></li>
        </ul>

        {/* Auth */}
        <div className="mt-8 px-6 flex flex-col gap-3">
          <Link
            href="/login"
            onClick={closeMenu}
            className="border py-2 rounded-lg text-center"
          >
            Login
          </Link>

          <Link
            href="/signUp"
            onClick={closeMenu}
            className="bg-black text-white py-2 rounded-lg text-center"
          >
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
}