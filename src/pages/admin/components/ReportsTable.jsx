import DeleteButton from "./DeleteButton";

const STATUS_STYLES = {
  Pending: "bg-[#DF9C8B]/15 text-[#b5544a]",
  Recovered: "bg-[#558E81]/15 text-[#3f6b60]",
  Claimed: "bg-gray-100 text-gray-600",
};

/**
 * ReportsTable
 * Receives a reports array and an onDelete callback.
 * Renders a responsive table; delegates row removal to the parent
 * via onDelete so this component stays presentation-only.
 */
function ReportsTable({ reports, onDelete }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50">
            <tr>
              {["Item", "Type", "User", "Status", "Action"].map((heading) => (
                <th
                  key={heading}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {reports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {report.item}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{report.type}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{report.user}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                      STATUS_STYLES[report.status] ?? "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {report.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <DeleteButton onDelete={() => onDelete(report.id)} />
                </td>
              </tr>
            ))}

            {reports.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-400">
                  No reports to show.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReportsTable;