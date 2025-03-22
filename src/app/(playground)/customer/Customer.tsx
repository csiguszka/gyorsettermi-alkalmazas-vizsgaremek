"use client";

import Loading from "@/components/Loading";
import Screen from "@/components/Screen";
import OrderCardCustomer from "./components/OrderCardCustomer";
import { useFectchGet } from "@/app/hooks/useFetchGet";
import { useEffect, useState } from "react";
import { display } from "@/app/model/display-model";
import DisplayWebsocket from "@/components/DisplayWebsocket";

function Customer() {
  const { loading, data: initialOrders } =
    useFectchGet<display[]>("/order/display");
  console.log(initialOrders);
  const [display, setDisplay] = useState<display[]>(initialOrders || []);
  const [isFirstReload, setIsFirstReload] = useState<boolean>(true);

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
      <DisplayWebsocket
        setIsFirstReload={setIsFirstReload}
        setOrders={setDisplay}
        name="display"
      />
      <div className="flex flex-col-reverse sm:flex-row gap-10 w-full overflow-hidden">
        <div className="sm:w-1/2">
          <h1 className="text-5xl text-center sm:text-6xl mb-5">Készül</h1>
          <div className="grid sm:flex flex-col lg:grid grid-cols-2 gap-5">
            {display?.map(
              (item, index) =>
                item.finishedCokingTime === null && (
                  <OrderCardCustomer
                    key={index}
                    display={item}
                    isFirstReload={isFirstReload}
                  />
                )
            )}
          </div>
        </div>
        <div className="hidden sm:w-2 sm:bg-primary sm:fixed sm:block sm:left-[calc(50%-(0.5rem/2))] h-[calc(100vh-65px)]"></div>
        <div className="sm:w-1/2">
          <h1 className="text-5xl text-center sm:text-6xl mb-5">Elkészült</h1>
          <div className="grid sm:flex flex-col lg:grid grid-cols-2 gap-5">
            {display?.map(
              (item, index) =>
                item.finishedCokingTime !== null &&
                (item.finishedTime === null ||
                  item.finishedTime === undefined) && (
                  <OrderCardCustomer
                    key={index}
                    display={item}
                    isFirstReload={isFirstReload}
                  />
                )
            )}
          </div>
        </div>
      </div>
    </Screen>
  );
}
export default Customer;
