import StatCard from "./StatCard";

/**
 * StatsGrid
 * Receives a stats array and renders a responsive grid of StatCard components.
 */
function StatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.id} title={stat.title} value={stat.value} />
      ))}
    </div>
  );
}

export default StatsGrid;