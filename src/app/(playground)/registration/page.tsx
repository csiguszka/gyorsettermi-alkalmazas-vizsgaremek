import { Registration } from "./_components/Registration";
import Authorize from "@/components/Authorize";
import Workers from "./_components/Workers";

function page() {
  return (
    <Authorize roles={["admin"]}>
      <Registration />
      <br />
      <Workers />
    </Authorize>
  );
}
export default page;
