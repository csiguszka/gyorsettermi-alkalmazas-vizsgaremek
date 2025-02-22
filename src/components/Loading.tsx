import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

function Loading({ isCentered = false }: { isCentered?: boolean }) {
  return (
    <Loader2
      className={cn(
        "animate-spin",
        isCentered
          ? "fixed top-1/2 left-1/2 translate-x-1/2 translate-y-1/2"
          : ""
      )}
    />
  );
}
export default Loading;
