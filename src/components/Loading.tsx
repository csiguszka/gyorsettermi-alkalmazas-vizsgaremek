import { Loader2 } from "lucide-react";

function Loading({ isCentered = false }: { isCentered?: boolean }) {
  return (
    <div
      className={
        isCentered
          ? "fixed top-1/2 left-1/2 translate-x-1/2 translate-y-1/2"
          : ""
      }
    >
      <Loader2 className="animate-spin" />
    </div>
  );
}
export default Loading;
