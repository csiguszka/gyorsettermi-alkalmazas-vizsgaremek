import { dateInterval } from "@/app/model/dateInterval";
import Loading from "./Loading";
import Profit from "./dashboard/Profit";
import SoldProducts from "./dashboard/SoldProducts";
import Order from "./dashboard/Order";
import RegisteredUsers from "./dashboard/RegisteredUsers";

function Trending({ selectedDate }: { selectedDate: Date | undefined }) {
  if (!selectedDate) {
    return <Loading />
  }
  selectedDate.setHours(0, 0, 0, 0);
  const endDate = new Date(selectedDate);
  endDate.setHours(23, 59, 59, 999);

  const previousDate = new Date(selectedDate);
  previousDate.setDate(selectedDate.getDate() - 1); // Csökkenti egy nappal

  const previousEndDate = new Date(endDate);
  previousEndDate.setDate(endDate.getDate() - 1); // Csökkenti egy nappal

  const currentInterval: dateInterval = {
    startDate: selectedDate.toISOString(),
    endDate: endDate.toISOString(),
  };

  const prevInterval: dateInterval = {
    startDate: previousDate.toISOString(),
    endDate: previousEndDate.toISOString(),
  };

  return (
    <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-4">
      <Profit currentDate={currentInterval} prevDate={prevInterval}/>
      <SoldProducts currentDate={currentInterval} prevDate={prevInterval} />
      <Order currentDate={currentInterval} prevDate={prevInterval} />
      <RegisteredUsers date={currentInterval} />
    </div>
  );
}
export default Trending;
