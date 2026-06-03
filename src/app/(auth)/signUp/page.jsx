"use client";

import { useState } from "react";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Link from "next/link";

export default function SignupPage() {
  const [password, setPassword] = useState("");

  const handlePasswordChange = (value) => {
    // supports both event OR direct value
    const val = typeof value === "string" ? value : value?.target?.value || "";

    setPassword(val);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData);

    const { data: user, error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      image: data.imageURL,
      callbackURL: "/logIn"
    });

    if (error) {
      toast.success(error.message);
      return;
    }
    toast.success("Account created successfully!");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-white to-cyan-100 flex items-center justify-center px-3 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-3xl bg-white/80 backdrop-blur-lg shadow-2xl border border-white/30 p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-center mb-6">
            Create Account
          </h1>

          <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
            {/* NAME */}
            <TextField isRequired name="name">
              <Label>Name</Label>
              <Input placeholder="John Doe" />
              <FieldError />
            </TextField>

            {/* EMAIL */}
            <TextField isRequired name="email" type="email">
              <Label>Email</Label>
              <Input placeholder="john@example.com" />
              <FieldError />
            </TextField>

            {/* PASSWORD */}
            <TextField
              isRequired
              name="password"
              type="password"
              onChange={handlePasswordChange}
              validate={(value) => {
                if (value.length < 8) return "Minimum 8 characters";
                if (!/[A-Z]/.test(value)) return "1 uppercase required";
                if (!/[0-9]/.test(value)) return "1 number required";
                return null;
              }}
            >
              <Label>Password</Label>
              <Input placeholder="Enter password" />
              <Description>Strong password required</Description>
              <FieldError />
            </TextField>

            {/* RULES */}
            <div className="bg-gray-50 rounded-xl p-4 text-sm space-y-2">
              <p
                className={
                  password.length >= 8 ? "text-green-600" : "text-gray-400"
                }
              >
                ✓ Minimum 8 characters
              </p>
              <p
                className={
                  /[A-Z]/.test(password) ? "text-green-600" : "text-gray-400"
                }
              >
                ✓ One uppercase letter
              </p>
              <p
                className={
                  /[0-9]/.test(password) ? "text-green-600" : "text-gray-400"
                }
              >
                ✓ One number
              </p>
            </div>

            {/* CONFIRM PASSWORD */}
            <TextField
              isRequired
              name="confirmPassword"
              type="password"
              validate={(value, formValues) => {
                const pass = formValues?.password || password;

                if (value !== pass) {
                  return "Passwords do not match";
                }

                return null;
              }}
            >
              <Label>Confirm Password</Label>
              <Input placeholder="Confirm password" />
              <FieldError />
            </TextField>

            {/* BUTTON */}
            <Button
              type="submit"
              className="w-full h-12 bg-indigo-600 text-white font-semibold rounded-xl"
            >
              <Check />
              Create Account
            </Button>
          </Form>
          <p className="mt-3">Already You have an Account...? <Link className="text-blue-500" href={'/logIn'}>Log In</Link></p>
        </div>
      </div>
    </div>
  );
}
