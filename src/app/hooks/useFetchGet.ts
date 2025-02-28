"use client";

import URL from "@/app/url";
import { RootState } from "@/state/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useUnauthorizedHandler } from "@/app/hooks/useUnauthorizedError";

export function useFectchGet<T>(
  urlEndpoint: string,
  attrs?: { [key: string]: string }
) {
  const [loading, setLoading] = useState(true);
  const token = useSelector(
    (state: RootState) => state.states.user.value.token
  );
  const [data, setData] = useState<T>();
  const handleUnauthorized = useUnauthorizedHandler();
  const url = `${URL}${urlEndpoint}?${new URLSearchParams(attrs).toString()}`;
  console.log(url);
  useEffect(() => {
    async function fetchData() {
      axios
        .get(url, {
          headers: { Authorization: token },
        })
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((error) => {
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
