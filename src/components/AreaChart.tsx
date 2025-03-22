"use client";

import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  XAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { dateInterval } from "@/app/model/dateInterval";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useQuery } from "@tanstack/react-query";
import ENDPOINTURL from "@/app/url";
import { useMemo } from "react";
import SkeletonChartCard from "./skeletons/SkeletonChart";


interface AreaModel {
  orders: {
    _id: number,
    count: number
  }[]
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function AreaChart({date}: {date: dateInterval}) {
  const {token} = useSelector((state: RootState) => state.states.user.value)
  const {data, isPending} = useQuery({
    queryKey: ["areaChart", date.endDate],
    queryFn: () => getAreaChartDate(date.endDate, token),
    staleTime: Infinity,
    enabled: !!token, 
  })

  const chartData = useMemo(() => {
    const timeRanges = [
      { label: "0h", range: [0, 3] },
      { label: "4h", range: [4, 7] },
      { label: "8h", range: [8, 11] },
      { label: "12h", range: [12, 15] },
      { label: "16h", range: [16, 19] },
      { label: "24h", range: [20, 24] }
    ];

    
    return timeRanges.map(({ label, range }) => {
      const count = data?.orders.reduce((acc, curr) =>
        curr._id >= range[0] && curr._id <= range[1] ? acc + curr.count : acc,
        0
      );
      return { month: label, desktop: count };
    });
  }, [data]);
  

  
  if (isPending) {
    return <SkeletonChartCard/>
  }

  return (
    <Card className="card">
      <CardHeader>
        <CardTitle className="text-center">Rendelések időbeli átlagos alakulása a héten</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <RechartsAreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              domain={[0, "auto"]}
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </RechartsAreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
      <div className="w-full flex font-medium leading-none justify-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-chart-1"></div>
            <span>Megrendelések</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

const getAreaChartDate = async (endDate: string, token: string | null): Promise<AreaModel> => {
  if (!token) {
    window.location.href = "/login";
    return Promise.reject("Nincs bejelentkezve, átirányítás történt.");
  }

  try {
    const response = await fetch(
      `${ENDPOINTURL}/dashboard/timeOfOrders?date=${endDate}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    );
    
    return response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Something went wrong: ${error.message}`);
    } else {
      throw new Error("Something went wrong");
    }
  }
};



