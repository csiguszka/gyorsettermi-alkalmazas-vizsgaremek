import TrendingCard from "./TrendingCard";

function Trending() {
  return (
    <div className="grid grid-cols-2 gap-3 justify-between md:flex-row md:flex md:gap-3 md:justify-between">
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
