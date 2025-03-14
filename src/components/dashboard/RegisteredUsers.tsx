"use client";

import TrendingCard from "../TrendingCard";
import { getRatioDestination } from "@/app/helpers/getRatioDestination";
import { dateInterval } from "@/app/model/dateInterval";
import ENDPOINTURL from "@/app/url";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import TrendingCardSkeleton from "../skeletons/TrendingCartSkeleton";

interface RegisteredUsersData {
  filteredUsers: number;
  totalUsers: number;
}

function RegisteredUsers({ date }: { date: dateInterval }) {
  const token = useSelector(
    (state: RootState) => state.states.user.value.token
  );

  const { data, isPending } = useQuery({
    queryKey: ["registeredUsers", date.startDate, date.endDate],
    queryFn: () => getRegisteredUsersCount(date.startDate, date.endDate, token),
    staleTime: Infinity
  });

  if (data === undefined || isPending) {
    return <TrendingCardSkeleton/>
  }

  const rating =
    Number(data.totalUsers) /
      (Number(data.totalUsers) - Number(data.filteredUsers)) -
    1;

  const destination = getRatioDestination(rating);

  return (
    <>
      <TrendingCard
        value={Number(data.filteredUsers)}
        label="Új regisztrációk"
        rating={rating}
        destination={destination}
      />
    </>
  );
}

export default RegisteredUsers;

const getRegisteredUsersCount = async (
  startDate: string,
  endDate: string,
  token: string | null
): Promise<RegisteredUsersData> => {
  if (!token) {
    window.location.href = "/bejelentkezes";
    return Promise.reject("Nincs token, átirányítás történt.");
  }
  const response = await fetch(
    `${ENDPOINTURL}/dashboard/registeredUsers?startDate=${startDate}&endDate=${endDate}`,
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
