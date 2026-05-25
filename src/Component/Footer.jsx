"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";

import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Logo */}
        <div>
          <Image src={logo} width={90} height={90} alt="Logo" />
          <p className="text-gray-300 text-sm mt-3">
            We build modern, responsive and high-quality web applications with Next.js and React.
          </p>
        </div>

        {/* Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-gray-300">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Follow Us</h2>

          <div className="flex gap-4 text-gray-300 text-xl">
            <a href="#" className="hover:text-blue-500 transition">
              <FaFacebook />
            </a>

            <a href="#" className="hover:text-white transition">
              <FaGithub />
            </a>

            <a href="#" className="hover:text-blue-400 transition">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
}