"use client";

import Loading from "@/components/Loading";
import { Order } from "@/app/model/order-model";
import { useFectchGet } from "@/app/hooks/useFetchGet";

function Orders() {
  const { loading, data: orders } = useFectchGet<Order[]>("/order/page/1");
  console.log(orders);
  if (loading) {
    return <Loading />;
  }

  return <div>adsf</div>;
}
export default Orders;
