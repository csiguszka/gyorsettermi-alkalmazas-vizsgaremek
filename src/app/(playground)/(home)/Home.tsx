"use client";

import { BarChart } from "@/components/BarChart";
import { PieChart } from "@/components/PieChart";
import Authorize from "@/components/Authorize";
import { AreaChart } from "@/components/AreaChart";
import { BarChartDouble } from "@/components/BarChartDouble";
import Overview from "@/components/Overview";
import DailyStatistics from "@/components/DailyStatistics";

export default function Home() {
  return (
    <Authorize roles={["admin"]}>
      <div className="flex flex-col gap-3">
        <DailyStatistics />

        <h2>Heti adatok</h2>
        <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          <PieChart />
          <BarChart />
          <AreaChart />
          <BarChartDouble />
        </div>
        <h2>Áttekintés</h2>
        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2">
          <Overview />
          <Overview />
        </div>
      </div>
    </Authorize>
  );
}
