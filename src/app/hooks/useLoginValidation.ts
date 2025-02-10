import { RootState } from "@/state/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { decoded, role } from "../model/decoded-model";

export function useLoginValidation(roles?: role[]) {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: RootState) => state.user.user.value);
  const router = useRouter();

  useEffect(() => {
    if (!user.token) {
      router.push("/bejelentkezes");
    } else {
      try {
        const decoded = jwtDecode(user.token) as decoded;
        if (roles?.includes(decoded.name) || decoded.name === "admin") {
          //todo token validacio kuldese a backendre
          setLoading(false);
        } else {
          router.push("/bejelentkezes");
        }
      } catch (error) {
        console.error("Invalid token:", error);
        router.push("/bejelentkezes");
      }
    }
  }, [user, router]);

  return loading;
}
