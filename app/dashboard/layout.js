import StudentSidebar from "@/components/StudentSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      <StudentSidebar />
      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}