"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
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
import { useSuspenseQuery } from "@tanstack/react-query";
import ENDPOINTURL from "@/app/url";
import { dateInterval } from "@/app/model/dateInterval";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

interface categorizedOrder {
  _id: number;
  count: number;
}

const chartConfig = {
  visitors: {
    label: "Megrendelések",
  },
  one: {
    label: "0Ft-2000Ft",
    color: "hsl(var(--chart-1))",
  },
  two: {
    label: "2000Ft-5000Ft",
    color: "hsl(var(--chart-2))",
  },
  three: {
    label: "5000Ft-20000Ft",
    color: "hsl(var(--chart-3))",
  },
  four: {
    label: "20000Ft-",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function PieChart({ date }: { date: dateInterval }) {
  console.log("hmmmmm");
  const categories = [2000, 5000, 20000];
  const { token } = useSelector((state: RootState) => state.states.user.value);
  const { data } = useSuspenseQuery({
    queryKey: ["categorizedOrders", date.startDate, date.endDate],
    queryFn: () =>
      getCategorizedOrders(date.startDate, date.endDate, categories, token),
  });
  console.log(JSON.stringify(data));
  const chartData = [
    { browser: "one", visitors: 275, fill: "var(--color-one)" },
    { browser: "two", visitors: 200, fill: "var(--color-two)" },
    { browser: "three", visitors: 287, fill: "var(--color-three)" },
    { browser: "four", visitors: 173, fill: "var(--color-four)" },
  ];

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

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
              content={<ChartTooltipContent hideLabel />}
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
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
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
  if (!token) {
    window.location.href = "/bejelentkezes";
    return Promise.reject("Nincs token, átirányítás történt.");
  }
  const response = await fetch(
    `${ENDPOINTURL}/dashboard/categorizedOrders?startDate=${startDate}&endDate=${endDate}`,
    {
      method: "GET",
      headers: {
        Authorization: token,
      },
    }
  );
  console.log("response status:", response.status);
  console.log("response text:", await response.text());

  if (!response.ok) {
    throw new Error("Hiba történt az adatok lekérésekor");
  }
  return response.json();
};
