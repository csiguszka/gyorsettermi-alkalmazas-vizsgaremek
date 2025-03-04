import { useState } from "react";
import DataPicker from "./DataPicker";
import Trending from "./Trending";

function DailyStatistics() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <>
      <div className="flex flex-row justify-between">
        <h2>Napi adatok</h2>
        <DataPicker date={date} setDate={setDate} />
      </div>
      <Trending selectedDate={date} />
    </>
  );
}
export default DailyStatistics;
