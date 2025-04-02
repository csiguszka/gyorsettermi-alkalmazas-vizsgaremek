"use client";

import { dateInterval } from "@/app/model/dateInterval";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useQuery } from "@tanstack/react-query";
import ENDPOINTURL from "@/app/url";
import { getRatioDestination } from "@/app/helpers/getRatioDestination";
import TrendingCard from "../TrendingCard";
import { ratioCalculator } from "@/app/helpers/ratioCalculator";
import TrendingCardSkeleton from "../skeletons/TrendingCartSkeleton";

interface profit {
  revenue: number;
}

function Profit({
  currentDate,
  prevDate,
}: {
  currentDate: dateInterval;
  prevDate: dateInterval;
}) {
  const token = useSelector(
    (state: RootState) => state.states.user.value.token
  );
  const { data: currentProfit, isPending } = useQuery({
    queryKey: ["revenue", currentDate.startDate, currentDate.endDate],
    queryFn: () =>
      getRevenue(currentDate.startDate, currentDate.endDate, token),
    staleTime: Infinity,
    enabled: !!token, 
  });

  const { data: prevProfit, isPending: isPendingPrev } = useQuery({
    queryKey: ["prevRevenue", prevDate.startDate, prevDate.endDate],
    queryFn: () => getRevenue(prevDate.startDate, prevDate.endDate, token),
    staleTime: Infinity,
    enabled: !!token, 
  });

  if (
    isPending ||
    isPendingPrev ||
    currentProfit === undefined ||
    prevProfit === undefined
  ) {
    return <TrendingCardSkeleton />;
  }

  const rating = ratioCalculator(currentProfit?.revenue, prevProfit?.revenue);
  const destination = getRatioDestination(rating);

  return (
    <TrendingCard
      value={currentProfit?.revenue}
      label="Forgalom"
      rating={rating}
      destination={destination}
    />
  );
}
export default Profit;

const getRevenue = async (
  startDate: string,
  endDate: string,
  token: string | null
): Promise<profit> => {
  if (!token) {
    window.location.href = "/login";
    return Promise.reject("Nincs bejelentkezve, átirányítás történt.");
  }
  const response = await fetch(
    `${ENDPOINTURL}/dashboard/revenue?startDate=${startDate}&endDate=${endDate}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token, // Token most már paraméterként jön
      },
    }
  );

  if (!response.ok) {
    return Promise.reject("Hiba történt az adatok lekérésekor.");
  }

  return response.json();
};
