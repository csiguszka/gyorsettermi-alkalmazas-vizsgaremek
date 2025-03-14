"use client";

import { dateInterval } from "@/app/model/dateInterval";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useSuspenseQueries } from "@tanstack/react-query";
import ENDPOINTURL from "@/app/url";
import { getRatioDestination } from "@/app/helpers/getRatioDestination";
import TrendingCard from "../TrendingCard";
import { ratioCalculator } from "@/app/helpers/ratioCalculator";

interface soldProducts {
  soldProducts: number;
}

function SoldProducts({
  currentDate,
  prevDate,
}: {
  currentDate: dateInterval;
  prevDate: dateInterval;
}) {
  const token = useSelector(
    (state: RootState) => state.states.user.value.token
  );
  const [{ data: currentSoldProducts }, { data: prevSoldProducts }] =
    useSuspenseQueries({
      queries: [
        {
          queryKey: [
            "soldProducts",
            currentDate.startDate,
            currentDate.endDate,
          ],
          queryFn: () =>
            getSoldProducts(currentDate.startDate, currentDate.endDate, token),
        },
        {
          queryKey: ["prevSoldProducts", prevDate.startDate, prevDate.endDate],
          queryFn: () =>
            getSoldProducts(prevDate.startDate, prevDate.endDate, token),
        },
      ],
    });

  const rating = ratioCalculator(
    currentSoldProducts.soldProducts,
    prevSoldProducts.soldProducts
  );
  const destination = getRatioDestination(rating);

  return (
    <TrendingCard
      value={currentSoldProducts.soldProducts}
      label="Eladott termékek"
      rating={rating}
      destination={destination}
    />
  );
}
export default SoldProducts;

const getSoldProducts = async (
  startDate: string,
  endDate: string,
  token: string | null
): Promise<soldProducts> => {
  if (!token) {
    window.location.href = "/bejelentkezes";
    return Promise.reject("Nincs token, átirányítás történt.");
  }
  const response = await fetch(
    `${ENDPOINTURL}/dashboard/soldProducts?startDate=${startDate}&endDate=${endDate}`,
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
