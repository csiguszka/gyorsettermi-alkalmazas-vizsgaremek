"use client";
import Authorize from "@/components/Authorize";
import Overview from "@/components/Overview";
import DailyStatistics from "@/components/DailyStatistics";
import WeeklyStatistics from "@/components/WeeklyStatistics";

export default function Home() {
  return (
    <Authorize roles={["admin"]}>
      <h1 className="text-center text-4xl mb-5">Vezérlőpult</h1>
      <div className="flex flex-col gap-3">
        <DailyStatistics />
        <WeeklyStatistics />
        <h2>Áttekintés</h2>
        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2">
          <Overview />
        </div>
      </div>
    </Authorize>
  );
}
