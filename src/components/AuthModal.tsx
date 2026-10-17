import React, { useState } from "react";
import { X, Mail, Lock, User, Phone, CheckCircle, AlertCircle } from "lucide-react";
import { User as UserType } from "../types";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserType) => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  
  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  
  // Validation errors
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
    general?: string;
  }>({});

  if (!isOpen) return null;

  const validateName = (val: string): string | undefined => {
    if (!val.trim()) return "Name is required";
    // Check if there are any numbers in the name
    if (/\d/.test(val)) {
      return "Name cannot contain numbers! Letters and spaces only.";
    }
    return undefined;
  };

  const validatePhoneNumber = (val: string): string | undefined => {
    if (!val.trim()) return "Phone number is required";
    // Check if there are any letters or names in the number
    if (/[a-zA-Z]/.test(val)) {
      return "Phone number cannot contain letters! Numbers only.";
    }
    // Simple length and format check (digits and optionally leading +)
    if (!/^\+?[0-9\s-]{7,15}$/.test(val.replace(/\s+/g, ""))) {
      return "Please enter a valid phone number format (e.g. 03001234567)";
    }
    return undefined;
  };

  const validateEmail = (val: string): string | undefined => {
    if (!val.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) {
      return "Please enter a valid email address (e.g., user@example.com)";
    }
    return undefined;
  };

  const validatePassword = (val: string): string | undefined => {
    if (!val) return "Password is required";
    if (val.length < 6) {
      return "Password must be at least 6 characters";
    }
    return undefined;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (isSignUp) {
      const nameErr = validateName(name);
      if (nameErr) newErrors.name = nameErr;

      const phoneErr = validatePhoneNumber(phoneNumber);
      if (phoneErr) newErrors.phoneNumber = phoneErr;

      const emailErr = validateEmail(email);
      if (emailErr) newErrors.email = emailErr;

      const passErr = validatePassword(password);
      if (passErr) newErrors.password = passErr;
    } else {
      const emailErr = validateEmail(email);
      if (emailErr) newErrors.email = emailErr;

      const passErr = validatePassword(password);
      if (passErr) newErrors.password = passErr;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Success flow - persist user in local storage
    if (isSignUp) {
      const newUser: UserType = {
        name,
        email,
        phoneNumber,
      };
      // Save to users pool and active user
      const users = JSON.parse(localStorage.getItem("sv_users") || "[]") as UserType[];
      const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        setErrors({ email: "An account with this email already exists" });
        return;
      }
      users.push(newUser);
      localStorage.setItem("sv_users", JSON.stringify(users));
      localStorage.setItem("sv_current_user", JSON.stringify(newUser));
      onSuccess(newUser);
    } else {
      // Login flow
      const users = JSON.parse(localStorage.getItem("sv_users") || "[]") as UserType[];
      const foundUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (foundUser) {
        localStorage.setItem("sv_current_user", JSON.stringify(foundUser));
        onSuccess(foundUser);
      } else {
        // Fallback for demo ease if no user registered yet
        const guestUser: UserType = {
          name: email.split("@")[0].replace(/\d+/g, "") || "Guest User",
          email,
          phoneNumber: "03001234567",
        };
        localStorage.setItem("sv_current_user", JSON.stringify(guestUser));
        onSuccess(guestUser);
      }
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden transform transition-all">
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold font-sans">ShopVista Access</h2>
          <p className="text-xs text-violet-100 mt-1">
            {isSignUp ? "Create an account to start shopping and add items to cart" : "Log in to check out, view order history and save products"}
          </p>
        </div>

        {/* Form area */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Sign Up Mode Only: Name */}
          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder="E.g., Muhammad Ali"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) {
                      setErrors((prev) => ({ ...prev, name: validateName(e.target.value) }));
                    }
                  }}
                  className={`w-full pl-10 pr-4 py-2 text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 rounded-lg border focus:ring-2 focus:outline-hidden transition-all ${
                    errors.name
                      ? "border-red-500 focus:ring-red-200 dark:focus:ring-red-900"
                      : "border-zinc-200 dark:border-zinc-700 focus:border-violet-500 focus:ring-violet-200 dark:focus:ring-violet-900"
                  }`}
                />
              </div>
              {errors.name ? (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  {errors.name}
                </p>
              ) : (
                <p className="text-[10px] text-zinc-400 mt-0.5">Strictly letters and spaces only. No numbers.</p>
              )}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                placeholder="E.g., name@gmail.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors((prev) => ({ ...prev, email: validateEmail(e.target.value) }));
                  }
                }}
                className={`w-full pl-10 pr-4 py-2 text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 rounded-lg border focus:ring-2 focus:outline-hidden transition-all ${
                  errors.email
                    ? "border-red-500 focus:ring-red-200 dark:focus:ring-red-900"
                    : "border-zinc-200 dark:border-zinc-700 focus:border-violet-500 focus:ring-violet-200 dark:focus:ring-violet-900"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Sign Up Mode Only: Phone Number */}
          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                Phone Number
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                  <Phone className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder="E.g., 03001234567"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    if (errors.phoneNumber) {
                      setErrors((prev) => ({ ...prev, phoneNumber: validatePhoneNumber(e.target.value) }));
                    }
                  }}
                  className={`w-full pl-10 pr-4 py-2 text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 rounded-lg border focus:ring-2 focus:outline-hidden transition-all ${
                    errors.phoneNumber
                      ? "border-red-500 focus:ring-red-200 dark:focus:ring-red-900"
                      : "border-zinc-200 dark:border-zinc-700 focus:border-violet-500 focus:ring-violet-200 dark:focus:ring-violet-900"
                  }`}
                />
              </div>
              {errors.phoneNumber ? (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  {errors.phoneNumber}
                </p>
              ) : (
                <p className="text-[10px] text-zinc-400 mt-0.5">Digits only. Strictly no alphabetic letters.</p>
              )}
            </div>
          )}

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                placeholder="••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    setErrors((prev) => ({ ...prev, password: validatePassword(e.target.value) }));
                  }
                }}
                className={`w-full pl-10 pr-4 py-2 text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 rounded-lg border focus:ring-2 focus:outline-hidden transition-all ${
                  errors.password
                    ? "border-red-500 focus:ring-red-200 dark:focus:ring-red-900"
                    : "border-zinc-200 dark:border-zinc-700 focus:border-violet-500 focus:ring-violet-200 dark:focus:ring-violet-900"
                }`}
              />
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                {errors.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white text-sm font-semibold py-2.5 px-4 rounded-lg shadow-md transition-all hover:shadow-lg focus:outline-hidden focus:ring-2 focus:ring-violet-300 mt-2 cursor-pointer"
          >
            {isSignUp ? "Create Secure Account" : "Access Account"}
          </button>

          {/* Switch Mode */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setErrors({});
              }}
              className="text-xs text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300 font-medium hover:underline transition-all"
            >
              {isSignUp
                ? "Already have an account? Log In"
                : "New to ShopVista? Create a secure account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
