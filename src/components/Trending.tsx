import TrendingCard from "./TrendingCard";

function Trending() {
  return (
    <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-4">
      <TrendingCard
        value={100}
        label="Total Users"
        rating="+1.5%"
        destination="up"
      />
      <TrendingCard
        value={75}
        label="Active Sessions"
        rating="-0.8%"
        destination="down"
      />
      <TrendingCard
        value={50}
        label="New Signups"
        rating="0%"
        destination="same"
      />
      <TrendingCard
        value={120}
        label="Page Views"
        rating="+3.2%"
        destination="up"
      />
    </div>
  );
}
export default Trending;
