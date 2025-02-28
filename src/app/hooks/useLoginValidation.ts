import { RootState } from "@/state/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { decoded, role } from "../model/decoded-model";
import URL from "@/app/url";

export function useLoginValidation(roles?: role[]) {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: RootState) => state.states.user.value);
  const router = useRouter();

  useEffect(() => {
    const loginRoute = `/bejelentkezes?route=${window.location.pathname}`;
    if (!user.token) {
      router.push(loginRoute);
    } else {
      try {
        const decoded = jwtDecode(user.token) as decoded;
        if (roles?.includes(decoded?.role) || decoded?.role === "admin") {
          //todo token validacio kuldese a backendre
          axios
            .get(`${URL}/token/validate`, {
              headers: { "Accept-Language": "hu", Authorization: user.token },
            })
            .then(function () {
              console.log("Sikeres bejelentkezés");
            })
            .catch(function (error) {
              console.log("Nem sikerült bejelentkezni");
              console.log(error);
              router.push(loginRoute);
            });
          setLoading(false);
        } else {
          router.push(loginRoute);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        router.push(loginRoute);
      }
    }
  }, [user, router]);

  return loading;
}
