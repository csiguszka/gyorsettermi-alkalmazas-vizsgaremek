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
import { useFectchGet } from "@/app/hooks/useFetchGet";

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

export function PieChart() {
  // const {loading, data} =
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
