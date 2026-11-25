"use client";

import React, { useState } from "react";
import SmartButton from "@/components/ui/smart-button";
import { CheckCircle2 } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-600 leading-relaxed">
        Subscribe to our newsletter to receive updates and exclusive offers.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (submitted) setSubmitted(false);
          }}
          placeholder="Enter your email"
          aria-label="Enter your email"
          className="w-full h-11 px-3.5 rounded-md border border-gray-300 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/15 focus:border-gray-700 transition"
        />

        <SmartButton
          type="submit"
          className="w-full h-11 rounded-md bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium justify-center"
        >
          Subscribe
        </SmartButton>
      </form>

      {submitted && (
        <p className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>Subscribed successfully!</span>
        </p>
      )}
    </div>
  );
}