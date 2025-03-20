"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useQuery } from "@tanstack/react-query";
import { dateInterval } from "@/app/model/dateInterval";
import ENDPOINTURL from "@/app/url";
import SkeletonChartCard from "./skeletons/SkeletonChart";
import { useMemo } from "react";


const chartConfig = {
  desktop: {
    label: "Elkészítés",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Kiadása",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface cookingTime_model {
  orders: {
    _id: string,
    avgCookingTime: number,
    avgHandoverTime: number,
  }[]
}

export function BarChartDouble({date} : {date: dateInterval}) {
  const {token} = useSelector((state: RootState) => state.states.user.value)
  const {data, isPending} = useQuery({
    queryKey: ["cookingTime", date.endDate],
    queryFn: () => getCookingTime(date.endDate, token),
    staleTime: Infinity
  })
console.log(data)
  const chartData = useMemo(() => {
    return [
      { month: "Hétfő", desktop: data?.orders?.[0].avgCookingTime, mobile: data?.orders?.[0].avgHandoverTime },
      { month: "Kedd", desktop: data?.orders?.[1].avgCookingTime, mobile: data?.orders?.[1].avgHandoverTime },
      { month: "Szerda", desktop: data?.orders?.[2].avgCookingTime, mobile: data?.orders?.[2].avgHandoverTime },
      { month: "Csütörtök", desktop: data?.orders?.[3].avgCookingTime, mobile: data?.orders?.[3].avgHandoverTime },
      { month: "Péntek", desktop: data?.orders?.[4].avgCookingTime, mobile: data?.orders?.[4].avgHandoverTime },
      { month: "Szombat", desktop: data?.orders?.[5].avgCookingTime, mobile: data?.orders?.[5].avgHandoverTime },
      { month: "Vasárnap", desktop: data?.orders?.[6].avgCookingTime, mobile: data?.orders?.[6].avgHandoverTime },
    ];
  }, [data]) 

  if (isPending) {
    <SkeletonChartCard/>
  }

  return (
    <Card className="card">
      <CardHeader>
        <CardTitle className="text-center">Rendelésre szánt átlagos idő</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="desktop"
              stackId="a"
              fill="var(--color-desktop)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="mobile"
              stackId="a"
              fill="var(--color-mobile)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
      <div className="font-medium leading-none grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-chart-1"></div>
            <span>Elkészítés</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-chart-2"></div>
            <span>Kiadás</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}


const getCookingTime = async (endDate: string, token: string | null): Promise<cookingTime_model> => {
  if (!token) {
    window.location.href = "/bejelentkezes";
    return Promise.reject("Nincs bejelentkezve, átirányítás történt.");
  }

  try {
    const response = await fetch(
      `${ENDPOINTURL}/dashboard/cookingTime?date=${endDate}`,
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
}