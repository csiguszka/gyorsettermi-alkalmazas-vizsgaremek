"use client";

import URL from "@/app/url";
import { RootState } from "@/state/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useUnauthorizedHandler } from "@/app/hooks/useUnauthorizedError";

export function useFectchGet<T>(urlEndpoint: string) {
  const [loading, setLoading] = useState(true);
  const token = useSelector(
    (state: RootState) => state.states.user.value.token
  );
  const [data, setData] = useState<T>();
  const handleUnauthorized = useUnauthorizedHandler();
  useEffect(() => {
    async function fetchData() {
      console.log(token);
      axios
        .get(`${URL}${urlEndpoint}`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          console.log(response);
          setData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error.response.status);
          if (error.response.status === 401) {
            handleUnauthorized();
          }
          setLoading(false);
        });
    }
    fetchData();
  }, []);

  return { loading, data };
}
