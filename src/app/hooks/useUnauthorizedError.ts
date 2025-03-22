import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function useUnauthorizedHandler() {
  const router = useRouter();
  const toaster = useToast();

  return () => {
    toaster.toast({
      variant: "destructive",
      title: "Kérem azonosítsa magát bejelentkezéssel!",
    });

    router.push("/login");
  };
}
