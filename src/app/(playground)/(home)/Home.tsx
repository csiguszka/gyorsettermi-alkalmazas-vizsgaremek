"use client";

import { BarChart } from "@/components/BarChart";
import { Dashboard } from "@/components/Dashboard";
import { Curve } from "@/components/Curve";
import Trending from "@/components/Trending";
import Authorize from "@/components/Authorize";

export default function Home() {
  return (
    <Authorize roles={["admin"]}>
      <div className="flex flex-col gap-3">
        <Trending />
        <div className="flex gap-3">
          <div className="flex-1">
            <div className="flex gap-3 flex-col">
              <Dashboard />
              <div className="flex gap-3 flex-row">
                <Curve />
                <Curve />
              </div>
            </div>
          </div>
          <div className="flex-1 max-h-[200px]">
            <BarChart />
          </div>
        </div>
      </div>
    </Authorize>
  );
}
