// components/Logout.tsx
"use client";
import federatedLogout from "../utils/federatedLogout";
export default function Logout() {
  return (
    <button
      onClick={() => federatedLogout()}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Signout of keycloak
    </button>
  );
}
