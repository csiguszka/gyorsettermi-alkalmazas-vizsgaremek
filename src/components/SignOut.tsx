"use client";

import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { reduxSignOut } from "@/state/user";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function SignOut() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const router = useRouter();
  function signOut() {
    setLoading(true);
    dispatch(reduxSignOut());
    toast({
      title: "Sikeres kijelentkezés",
      description: "Hamarosan átirányítjuk a bejelentkezéshez.",
    });
    router.push("/bejelentkezes");
  }
  return (
    <Button variant={"outline"} className="text-center" onClick={signOut}>
      Kijelentkezés {loading && <Loader2 className="animate-spin h-4 w-4" />}
    </Button>
  );
}
export default SignOut;
