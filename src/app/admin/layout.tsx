import Footer from "@/components/layout/footer";
import AuthGuard from "@/app/admin/components/auth-guard";

import AdminNavbar from "./components/admin-navbar";

export { metadata } from "./metadata";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AuthGuard>
      <AdminNavbar />
      {children}
      <Footer />
    </AuthGuard>
  );
}
