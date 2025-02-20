import { UtensilsCrossed } from "lucide-react";

function Logo() {
  return (
    <div className="flex flex-row items-center gap-3 text-white dark:text-foreground">
      <UtensilsCrossed
        className="text-chart-1 text-white dark:text-foreground"
        size={48}
      />
      <h1 className="text-xl md:text-2xl lg:text-3xl">FAST FOOD</h1>
    </div>
  );
}
export default Logo;
