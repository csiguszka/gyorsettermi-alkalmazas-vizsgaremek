"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { PaginationResponse } from "@/app/model/pagination-model";
import { Order } from "@/app/model/order-model";
import ENDPOINTURL from "@/app/url";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Pagination } from "@/components/Pagination";
import { useState } from "react";
import { Table, TableCell, TableHeader, TableRow } from "@/components/ui/table";

function Orders() {
  const { token } = useSelector((state: RootState) => state.states.user.value);
  const [page, setPage] = useState<number>(1);
  const { data } = useQuery({
    queryKey: ["ordersAdmin", page],
    queryFn: () => getOrders(token, page),
  });

  return (
    <Card className="card lg:w-1/2 lg:m-auto">
      <CardHeader>
        <h1 className="text-center">Megrendelések</h1>
        {/* <Search placholder="Keresés név alapján" /> */}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableCell className="text-lg font-bold">Rendelés száma</TableCell>
            <TableCell className="text-lg font-bold">Rendelés ideje</TableCell>
            <TableCell className="text-lg font-bold">Ár</TableCell>
          </TableHeader>
          {data?.items.map((order, idx) => {
            return (
              <TableRow key={idx}>
                <TableCell className="text-lg">{order.orderNumber}</TableCell>
                <TableCell className="text-lg">
                  {new Date(order.orderedTime).toLocaleString("hu-HU", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>

                <TableCell className="text-lg">{order.totalPrice} Ft</TableCell>
              </TableRow>
            );
          })}
        </Table>
      </CardContent>
      <CardFooter>
        {data && (
          <Pagination maxPage={data?.pageCount} page={page} setPage={setPage} />
        )}
      </CardFooter>
    </Card>
  );
}
export default Orders;

async function getOrders(
  token: string | null,
  page: number
): Promise<PaginationResponse<Order[]>> {
  if (!token) {
    window.location.href = "/login";
    return Promise.reject();
  }
  try {
    const resp = await fetch(`${ENDPOINTURL}/order?page=${page}&limit=10`, {
      method: "GET",
      headers: { Authorization: token },
    });
    if (!resp.ok) {
      return Promise.reject();
    }
    return resp.json();
  } catch (error) {
    console.log(error);
    return Promise.reject();
  }
}
