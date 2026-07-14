import { useState } from "react";
import StatsGrid from "./components/StatsGrid";
import ReportsTable from "./components/ReportsTable";
import { stats, reports as initialReports } from "./data";

/**
 * AdminDashboard
 * Responsible only for assembling the page and wiring data/state together.
 * No table logic or card UI lives here — that belongs to the child components.
 *
 * When the backend is ready, replace the `reports` import with an Axios
 * call (e.g. inside a useEffect) and keep the rest of this component as-is.
 */
function AdminDashboard() {
  const [reports, setReports] = useState(initialReports);

  const handleDeleteReport = (id) => {
    setReports((prev) => prev.filter((report) => report.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl space-y-8">
        <header>
          <h1 className="text-3xl font-semibold text-gray-900">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage campus reports and statistics
          </p>
        </header>

        <StatsGrid stats={stats} />

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Reports</h2>
          <ReportsTable reports={reports} onDelete={handleDeleteReport} />
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;