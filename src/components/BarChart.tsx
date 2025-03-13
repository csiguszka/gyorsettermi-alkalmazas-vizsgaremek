"use client";

import {
  Bar,
  BarChart as RechartsBarChart,
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
import { useQuery } from "@tanstack/react-query";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import ENDPOINTURL from "@/app/url";
import SkeletonChartPieChart from "./skeletons/SkeletonChart";
import { useMemo } from "react";

interface ordersAndSoldProducts_Model {
  orders: {
    _id: string,
    orderCount: number,
    productCount: number
  }[]
}

const chartConfig = {
  desktop: {
    label: "Megrendelések",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Eladott termékek",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function BarChart({date} : {date: dateInterval}) {

  const { token } = useSelector((state: RootState) => state.states.user.value);

  const {data, isPending} = useQuery({
    queryKey: ["ordersAndSoldProducts", date.endDate],
    queryFn: () => getOrdersAndSoldProducts(date.endDate, token),
    staleTime: Infinity
  })
  
  const chartData = useMemo(() => [
    { month: "Hétfő", desktop: data?.orders?.[0]?.orderCount ?? 0, mobile: data?.orders?.[0]?.productCount ?? 0 },
    { month: "Kedd", desktop: data?.orders?.[1]?.orderCount ?? 0, mobile: data?.orders?.[1]?.productCount ?? 0 },
    { month: "Szerda", desktop: data?.orders?.[2]?.orderCount ?? 0, mobile: data?.orders?.[2]?.productCount ?? 0 },
    { month: "Csütörtök", desktop: data?.orders?.[3]?.orderCount ?? 0, mobile: data?.orders?.[3]?.productCount ?? 0 },
    { month: "Péntek", desktop: data?.orders?.[4]?.orderCount ?? 0, mobile: data?.orders?.[4]?.productCount ?? 0 },
    { month: "Szombat", desktop: data?.orders?.[5]?.orderCount ?? 0, mobile: data?.orders?.[5]?.productCount ?? 0 },
    { month: "Vasárnap", desktop: data?.orders?.[6]?.orderCount ?? 0, mobile: data?.orders?.[6]?.productCount ?? 0 },
  ], [data]);
  
  
  if (isPending){
    return <SkeletonChartPieChart/>
  }

  return (
    <Card className="card">
      <CardHeader>
        <CardTitle className="text-center">Megrendelések és eladott termékek</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <RechartsBarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </RechartsBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
      <div className="font-medium leading-none items-center grid grid-cols-2 justify-center gap-2">
          <div className="flex gap-2 justify-center">
            <div className="w-3 h-3 bg-chart-1"></div>
            <span>Megrendelések</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-chart-2"></div>
            <span>Eladott termékek</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}


const getOrdersAndSoldProducts = async (endDate: string, token: string | null): Promise<ordersAndSoldProducts_Model> => {
  if (!token) {
    window.location.href = "/bejelentkezes";
    return Promise.reject("Nincs token, átirányítás történt.");
  }
  try {
    const response = await fetch(
      `${ENDPOINTURL}/dashboard/ordersThisWeek?date=${endDate}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    );
    
    return response.json();
  } catch (error) {
    throw new Error("Something went wrong")
  }
}