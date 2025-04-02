import Authorize from "@/components/Authorize";
import Menu from "./Menu";

function page() {
  return (
    <Authorize roles={["admin"]}>
      <Menu />
    </Authorize>
  );
}
export default page;
