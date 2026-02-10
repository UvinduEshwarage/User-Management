import Sidebar from "../components/admins/Sidebar";
import Topbar from "../components/admins/Topbar";

export default function AdminLayout({
    children,
}:{
    children:React.ReactNode;
}) {
    return(
        <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <Topbar />

        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
    )
}