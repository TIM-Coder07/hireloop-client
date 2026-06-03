"use client";

import { useState } from "react";
import { Button, Form, Input, Label, TextField, FieldError } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Link from "next/link";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const { data: user, error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: '/'
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "Login failed");
      return;
    }

    toast.success("Login successful!");
    console.log(user);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-white to-cyan-100 flex items-center justify-center px-3 py-10">
      
      <div className="w-full max-w-md">
        <div className="rounded-3xl bg-white/80 backdrop-blur-lg shadow-2xl border border-white/30 p-6 sm:p-8">

          {/* TITLE */}
          <h1 className="text-2xl font-bold text-center mb-6">
            Welcome Back
          </h1>

          <Form className="flex flex-col gap-5" onSubmit={onSubmit}>

            {/* EMAIL */}
            <TextField isRequired name="email" type="email">
              <Label>Email</Label>
              <Input placeholder="john@example.com" />
              <FieldError />
            </TextField>

            {/* PASSWORD */}
            <TextField isRequired name="password" type="password">
              <Label>Password</Label>
              <Input placeholder="Enter your password" />
              <FieldError />
            </TextField>

            {/* BUTTON */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form>

          {/* SIGNUP LINK */}
          <p className="mt-4 text-center text-sm text-gray-500">
            Don`&apos;`t have an account?{" "}
            <Link href="/signUp" className="text-indigo-600 font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}