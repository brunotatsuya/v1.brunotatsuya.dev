"use client";

import Navbar from "@/components/layout/navbar";
import { signOutAction } from "@/actions/auth/mutations";

const navbarOptions = [
  {
    label: "logout",
    href: "/admin-login",
    onClick: () => {
      signOutAction();
    },
  },
];

export default function AdminNavbar() {
  return (
    <Navbar
      options={navbarOptions}
      title="brunotatsuya.dev/admin"
      href="/admin"
      className="bg-secondary"
    />
  );
}
