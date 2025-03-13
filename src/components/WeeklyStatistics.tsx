"use client";

import { useState } from "react";
import { AreaChart } from "./AreaChart";
import { BarChart } from "./BarChart";
import { BarChartDouble } from "./BarChartDouble";
import { PieChart } from "./PieChart";
import { dateInterval } from "@/app/model/dateInterval";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const getMondayOfCurrentWeek = (referenceDate: Date = new Date()) => {
  const day = referenceDate.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  const monday = new Date(referenceDate);
  monday.setDate(referenceDate.getDate() + diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
};

const getSundayOfCurrentWeek = (referenceDate: Date = new Date()) => {
  const day = referenceDate.getDay();
  const diff = 7 - day;
  const sunday = new Date(referenceDate);
  sunday.setDate(referenceDate.getDate() + diff);
  sunday.setHours(23, 59, 59, 999);
  return sunday;
};

function WeeklyStatistics() {
  const [currentMonday, setCurrentMonday] = useState<Date>(getMondayOfCurrentWeek());

  // Calculate the Sunday based on the current Monday
  const currentSunday = getSundayOfCurrentWeek(currentMonday);

  const interval: dateInterval = {
    startDate: currentMonday.toISOString(),
    endDate: currentSunday.toISOString(),
  };

  // Function to navigate weeks
  const handleWeekChange = (days: number) => {
    const newMonday = new Date(currentMonday);
    newMonday.setDate(currentMonday.getDate() + days);
    setCurrentMonday(getMondayOfCurrentWeek(newMonday));
  };

  return (
    <>
      <h2>Heti adatok</h2>
      <div className="flex justify-end items-center gap-3">
        <ArrowLeft className="cursor-pointer" onClick={() => handleWeekChange(-7)}/>
        <span className="text-lg font-semibold">
          {currentMonday.toLocaleDateString()} - {currentSunday.toLocaleDateString()}
        </span>
        <ArrowRight className="cursor-pointer" onClick={() => handleWeekChange(7)}/>
      </div>
      <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-4">
        <PieChart date={interval} />
        <BarChart date={interval} />
        <AreaChart date={interval} />
        <BarChartDouble date={interval} />
      </div>
    </>
  );
}

export default WeeklyStatistics;
