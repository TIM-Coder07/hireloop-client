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

export default function SignupPage() {
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    alert(JSON.stringify(data, null, 2));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Create Account
        </h1>

        <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
          {/* Email */}
          <TextField isRequired name="name" type="name">
            <Label>Name</Label>
            <Input placeholder="john" />
            <FieldError />
          </TextField>

          {/* Email */}
          <TextField isRequired name="email" type="email">
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>

          {/* Password */}
          <TextField
            isRequired
            name="password"
            type="password"
            validate={(value) => {
              setPassword(value);

              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Must contain 1 uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Must contain 1 number";
              }

              return null;
            }}
          >
            <Label>Password</Label>
            <Input placeholder="Enter password" />
            <Description>8+ chars, 1 uppercase, 1 number</Description>
            <FieldError />
          </TextField>

          {/* Confirm Password */}
          <TextField
            isRequired
            name="confirmPassword"
            type="password"
            validate={(value) => {
              if (value !== password) {
                return "Passwords do not match";
              }
              return null;
            }}
          >
            <Label>Confirm Password</Label>
            <Input placeholder="Confirm password" />
            <FieldError />
          </TextField>

          <Button type="submit" className="flex-1">
            <Check />
            Sign Up
          </Button>
        </Form>
      </div>
    </div>
  );
}
