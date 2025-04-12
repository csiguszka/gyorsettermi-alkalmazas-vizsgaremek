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
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function SalesManOrders() {
  const { token } = useSelector((state: RootState) => state.states.user.value);
  const [page, setPage] = useState<number>(1);
  const router = useRouter();
  const { data, refetch } = useQuery({
    queryKey: ["ordersAdmin", page],
    queryFn: () => getOrders(token, page),
  });

  return (
    <>
      <Button className="btn mb-5" onClick={() => router.push("/salesman")}>
        Vissza a kijelzőhöz
      </Button>
      <Card className="card lg:m-auto ">
        <CardHeader>
          <h1 className="text-center">Megrendelések</h1>
          {/* <Search placholder="Keresés név alapján" /> */}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell className="text-lg font-bold">
                  Rendelés száma
                </TableCell>
                <TableCell className="text-lg font-bold">
                  Rendelés ideje
                </TableCell>
                <TableCell className="text-lg font-bold">Ár</TableCell>
                <TableCell className="text-lg font-bold">
                  Visszavonás gomb
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.items.map((order, idx) => {
                return (
                  <TableRow className="text-lg" key={idx}>
                    <TableCell>{order.orderNumber}</TableCell>
                    <TableCell>
                      {new Date(order.orderedTime).toLocaleString("hu-HU", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                    <TableCell>{order.totalPrice} Ft</TableCell>
                    {order.finishedTime && (
                      <TableCell>
                        <Button
                          onClick={() =>
                            handleOnClick(token, order._id).then(() =>
                              refetch()
                            )
                          }
                          className="btn"
                        >
                          Visszavonás
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          {data && (
            <Pagination
              maxPage={data?.pageCount}
              page={page}
              setPage={setPage}
            />
          )}
        </CardFooter>
      </Card>
    </>
  );
}
export default SalesManOrders;

async function getOrders(
  token: string | null,
  page: number
): Promise<PaginationResponse<Order[]>> {
  if (!token) {
    window.location.href = "/login";
    return Promise.reject();
  }
  try {
    const resp = await fetch(`${ENDPOINTURL}/order?page=${page}&limit=5`, {
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

const handleOnClick = async (token: null | string, orderId: string) => {
  if (!token) {
    window.location.href = "/login";
    return Promise.reject();
  }
  try {
    const resp = await fetch(
      `${ENDPOINTURL}/order/revert/handover/${orderId}`,
      {
        method: "PATCH",
        headers: { Authorization: token },
      }
    );
    if (!resp.ok) {
      return Promise.reject();
    }
    return resp;
  } catch (error) {
    console.log(error);
    return Promise.reject();
  }
};
