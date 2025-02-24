"use client";

import { useDispatch } from "react-redux";
import { reduxSignOut } from "@/state/user";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, LogOut } from "lucide-react";
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
    <div
      className="flex items-center gap-2 text-center border-none text-primary bg-opacity-0 cursor-pointer font-bold"
      onClick={signOut}
    >
      <LogOut size={17} />
      <span className="hidden md:flex md:items-center md:gap-1">
        Kijelentkezés {loading && <Loader2 className="animate-spin h-4 w-4" />}
      </span>
    </div>
  );
}
export default SignOut;
