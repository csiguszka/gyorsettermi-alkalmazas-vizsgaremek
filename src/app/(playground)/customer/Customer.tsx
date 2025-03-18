"use client";

import Loading from "@/components/Loading";
import Screen from "@/components/Screen";
import OrderCardCustomer from "./components/OrderCardCustomer";
import { useFectchGet } from "@/app/hooks/useFetchGet";
import { useEffect, useState } from "react";
import MyWebSocketComponent from "@/components/MyWebSocketComponent";
import { display } from "@/app/model/display-model";

function Customer() {
  const { loading, data: initialOrders } =
    useFectchGet<display[]>("/order/display");
  const [display, setDisplay] = useState<display[]>(initialOrders || []);
  console.log("initialOrders", initialOrders);
  console.log("newOrder", display);
  useEffect(() => {
    if (initialOrders) {
      setDisplay(initialOrders);
    }
  }, [initialOrders]);

  if (loading) {
    return <Loading isCentered={true} />;
  }

  return (
    <Screen>
      <MyWebSocketComponent<display> setOrders={setDisplay} name="display" />
      <div className="flex flex-col-reverse sm:flex-row gap-5 w-full">
        <div className="sm:w-1/2">
          <h1 className="text-5xl text-center sm:text-6xl mb-5">Készül</h1>
          <div className="grid sm:flex flex-col lg:grid grid-cols-2 gap-5">
            {display?.map(
              (item, index) =>
                item.finishedCokingTime === null && (
                  <OrderCardCustomer key={index} display={item} />
                )
            )}
          </div>
        </div>
        <div className="w-2 bg-primary"></div>
        <div className="sm:w-1/2">
          <h1 className="text-5xl text-center sm:text-6xl mb-5">Elkészült</h1>
          <div className="grid sm:flex flex-col lg:grid grid-cols-2 gap-5">
            {display?.map(
              (item, index) =>
                item.finishedCokingTime !== null && (
                  <OrderCardCustomer key={index} display={item} />
                )
            )}
          </div>
        </div>
      </div>
    </Screen>
  );
}
export default Customer;
