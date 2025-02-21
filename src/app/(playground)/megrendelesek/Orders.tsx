"use client";

import Loading from "@/components/Loading";
import { Order } from "@/app/model/order-model";
import { useFectchGet } from "@/app/hooks/useFetchGet";
import { Card, CardHeader } from "@/components/ui/card";
import Search from "@/components/Search";
import Table from "@/components/Table";
import ModifyDeleteButtons from "@/components/ModifyDeleteButtons";

function Orders() {
  const { loading, data: data } = useFectchGet<{
    pageCount: number;
    orders: Order[];
  }>("/order/page/1");
  console.log(data);
  if (loading || data === undefined) {
    return <Loading />;
  }
  const list = data.orders.map((order) => {
    order.orderNumber = order.orderNumber || 0;
    return { name: order.orderNumber.toString(), value: ModifyDeleteButtons() };
  });
  return (
    <Card className="card lg:w-1/2 lg:m-auto">
      <CardHeader>
        <h1 className="text-center">Megrendelések</h1>
        <Search placholder="Keresés név alapján" />
        <Table list={list} />
      </CardHeader>
    </Card>
  );
}
export default Orders;
