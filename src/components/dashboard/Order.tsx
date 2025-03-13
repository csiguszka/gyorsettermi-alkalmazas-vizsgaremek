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

interface order {
  orderCount: number;
}

function Order({
  currentDate,
  prevDate,
}: {
  currentDate: dateInterval;
  prevDate: dateInterval;
}) {
  const token = useSelector(
    (state: RootState) => state.states.user.value.token
  );
  const {data: currentOrder, isPending} = useQuery({
    queryKey: ["orderCount", currentDate.startDate, currentDate.endDate],
    queryFn: () => getOrder(currentDate.startDate, currentDate.endDate, token),
    staleTime: Infinity
  })

  const {data: prevOrder, isPending: isPendingPrev} = useQuery({
    queryKey: ["prevOrderCount", prevDate.startDate, prevDate.endDate],
    queryFn: () => getOrder(prevDate.startDate, prevDate.endDate, token),
    staleTime: Infinity
  })

  if (isPending || isPendingPrev || currentOrder === undefined || prevOrder === undefined) {
    return <TrendingCardSkeleton/>
  }

  const rating = ratioCalculator(currentOrder.orderCount, prevOrder.orderCount);
  const destination = getRatioDestination(rating);

  return (
    <TrendingCard
      value={currentOrder.orderCount}
      label="Új megrendelések "
      rating={rating}
      destination={destination}
    />
  );
}
export default Order;

const getOrder = async (
  startDate: string,
  endDate: string,
  token: string | null
): Promise<order> => {
  if (!token) {
    window.location.href = "/bejelentkezes";
    return Promise.reject("Nincs token, átirányítás történt.");
  }
  const response = await fetch(
    `${ENDPOINTURL}/dashboard/orderCount?startDate=${startDate}&endDate=${endDate}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token, // Token most már paraméterként jön
      },
    }
  );

  if (!response.ok) {
    throw new Error("Hiba történt az adatok lekérésekor");
  }

  return response.json();
};
