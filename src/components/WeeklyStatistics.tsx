"use client";

import { useState } from "react";
import { AreaChart } from "./AreaChart";
import { BarChart } from "./BarChart";
import { BarChartDouble } from "./BarChartDouble";
import { PieChart } from "./PieChart";
import { dateInterval } from "@/app/model/dateInterval";

const getMondayOfCurrentWeek = () => {
  const now = new Date();
  const day = now.getDay(); // Az aktuális nap (0=vasárnap, 1=hétfő, ..., 6=szombat)
  const diff = (day === 0 ? -6 : 1) - day; // Ha vasárnap van, -6-tal vonunk le, különben 1-hétfő mínusz az aktuális nap
  now.setDate(now.getDate() + diff); // Beállítjuk a hétfőt
  now.setHours(0, 0, 0, 0); // Időt 00:00:00-ra állítjuk
  return now;
};

const getSundayOfCurrentWeek = () => {
  const now = new Date();
  const day = now.getDay(); // Aktuális nap (0=vasárnap, 1=hétfő, ..., 6=szombat)
  const diff = 7 - day; // Vasárnapig hátralévő napok
  now.setDate(now.getDate() + diff); // Átállítjuk a dátumot vasárnapra
  now.setHours(23, 59, 59, 999); // Időt 23:59:59.999-re állítjuk
  return now;
};

function WeeklyStatistics() {
  const [date, setDate] = useState<Date | undefined>(getMondayOfCurrentWeek());
  const asd = getSundayOfCurrentWeek();
  if (!date) {
    return null;
  }
  const interval: dateInterval = {
    startDate: date.toISOString(),
    endDate: asd.toISOString(),
  };
  console.log(interval);

  console.log("hmmmmm1");

  return (
    <>
      <h2>Heti adatok</h2>
      <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-4">
        {/* <PieChart date={interval} /> */}
        <BarChart />
        <AreaChart />
        <BarChartDouble />
      </div>
    </>
  );
}
export default WeeklyStatistics;
