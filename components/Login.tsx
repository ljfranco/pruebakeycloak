// components/Login.tsx
"use client";
import { signIn } from "next-auth/react";
export default function Login() {
  return (
    <button
      onClick={() => signIn("keycloak")}
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
    >
      Signin with keycloak
    </button>
  );
}
