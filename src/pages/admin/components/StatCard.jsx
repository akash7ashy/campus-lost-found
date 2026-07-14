/**
 * StatCard
 * Displays a single statistic (title + value).
 * Purely presentational — receives all data via props.
 */
function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="mt-2 text-3xl font-semibold text-[#558E81]">{value}</p>
    </div>
  );
}

export default StatCard;