"use client";

import { Label, Pie, PieChart as RechartsPieChart } from "recharts";

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
import { useQuery } from "@tanstack/react-query";
import ENDPOINTURL from "@/app/url";
import { dateInterval } from "@/app/model/dateInterval";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import SkeletonChartCard from "./skeletons/SkeletonChart";
import { useMemo } from "react";

interface categorizedOrder {
  _id: number;
  count: number;
}

const chartConfig = {
  visitors: {
    label: "Megrendelések",
  },
  one: {
    label: "0-1999",
    color: "hsl(var(--chart-1))",
  },
  two: {
    label: "2000-4999",
    color: "hsl(var(--chart-2))",
  },
  three: {
    label: "5000-19999",
    color: "hsl(var(--chart-3))",
  },
  four: {
    label: "20000-",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

const categories = [2000, 5000, 20000];

export function PieChart({ date }: { date: dateInterval }) {
  const { token } = useSelector((state: RootState) => state.states.user.value);
  const { data, isPending, isError } = useQuery({
    queryKey: ["categorizedOrders", date.startDate, date.endDate],
    queryFn: () =>
      getCategorizedOrders(date.startDate, date.endDate, categories, token),
    staleTime: Infinity,
    enabled: !!token, 
  });
  
  
  const chartData = useMemo(() => {
    return [
      { browser: "one", visitors: data?.[0]?.count ?? 0, fill: "var(--color-one)" },
      { browser: "two", visitors: data?.[1]?.count ?? 0, fill: "var(--color-two)" },
      { browser: "three", visitors: data?.[2]?.count ?? 0, fill: "var(--color-three)" },
      { browser: "four", visitors: data?.[3]?.count ?? 0, fill: "var(--color-four)" },
    ]
  }, [data])
  
  const totalVisitors = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, [chartData]);
  
  if (isPending) {
    return <SkeletonChartCard isRounded={false}/>
  }

  if (isError) {
    return <div>Van baj!</div>
  }
  return (
    <Card className="flex flex-col card">
      <CardHeader className="items-center pb-0">
        <CardTitle>Költési kategóriák</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RechartsPieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel className="gap-10"/>}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Megrendelések
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </RechartsPieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="grid grid-cols-2 grid-rows-2 gap-2 font-medium leading-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-chart-1"></div>
            <span>0Ft-1999Ft</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-chart-2"></div>
            <span>2000Ft-4999Ft</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-chart-3"></div>
            <span>5000Ft-19999Ft</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-chart-4"></div>
            <span>20000Ft felett</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

const getCategorizedOrders = async (
  startDate: string,
  endDate: string,
  categories: number[],
  token: string | null
): Promise<categorizedOrder[]> => {
  try {
    if (!token) {
      window.location.href = "/login";
      return Promise.reject("Nincs bejelentkezve, átirányítás történt.");
    }
    const categoriesUrl = categories.map((category) => `&categories=${category}`).join("");

    const response = await fetch(
      `${ENDPOINTURL}/dashboard/categorizedOrders?startDate=${startDate}&endDate=${endDate}${categoriesUrl}`,
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
