import { RootState } from "@/state/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { decoded, role } from "../model/decoded-model";
import ENDPOINTURL from "@/app/url";
import { useDispatch } from "react-redux";
import { reduxSignOut } from "@/state/user";

export function useLoginValidation(roles?: role[]) {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: RootState) => state.states.user.value);
  const router = useRouter();
  const dispatch = useDispatch()

  useEffect(() => {
    const loginRoute = `/bejelentkezes?route=${window.location.pathname}`;
    if (!user.token) {
      console.log(user.token)
      console.log("Átirányítva a bejelnetkezéshez")
      router.push(loginRoute);
    } else {
      try {
        const decoded = jwtDecode(user.token) as decoded;
        if (roles?.includes(decoded?.role) || decoded?.role === "admin") {
          axios
            .get(`${ENDPOINTURL}/token/validate`, {
              headers: { "Accept-Language": "hu", Authorization: user.token },
            })
            .then(function () {})
            .catch(function (error) {
              console.log(error);
              dispatch(reduxSignOut())
              router.push(loginRoute);
            });
          setLoading(false);
        } else {
          console.log("2 " + user.token)
          console.log("Átirányítva a bejelnetkezéshez 2")
          router.push(loginRoute);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        console.log("3 " + user.token)
        console.log("Átirányítva a bejelnetkezéshez 3")
        router.push(loginRoute);
      }
    }
  }, [user, router]);

  return loading;
}
