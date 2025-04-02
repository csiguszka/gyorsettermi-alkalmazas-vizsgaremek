import Authorize from "@/components/Authorize";
import Kitchen from "./Kitchen";

function page() {
  return (
    <Authorize roles={["admin", "kitchen"]}>
      <Kitchen />
    </Authorize>
  );
}
export default page;
