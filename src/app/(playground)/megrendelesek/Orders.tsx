"use client";

import { Card, CardHeader } from "@/components/ui/card";
import Search from "@/components/Search";

function Orders() {

  return (
    <Card className="card lg:w-1/2 lg:m-auto">
      <CardHeader>
        <h1 className="text-center">Megrendelések</h1>
        <Search placholder="Keresés név alapján" />
      </CardHeader>
    </Card>
  );
}
export default Orders;
