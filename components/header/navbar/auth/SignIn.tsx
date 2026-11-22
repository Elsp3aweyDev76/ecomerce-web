"use client";

import { ClerkLoaded, Show, SignInButton, UserButton } from "@clerk/nextjs";

export default function AuthButton() {
  return (
    <ClerkLoaded>
      <Show when="signed-out">
        <SignInButton mode="modal">
          <button
            type="button"
            className="px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 text-gray-800 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Sign In
          </button>
        </SignInButton>
      </Show>

      <Show when="signed-in">
        <UserButton />
      </Show>
    </ClerkLoaded>
  );
}
