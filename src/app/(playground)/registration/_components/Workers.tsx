"use client";

import { PaginationResponse } from "@/app/model/pagination-model";
import { User } from "@/app/model/user-model";
import ENDPOINTURL from "@/app/url";
import { RootState } from "@/state/store";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Pagination } from "@/components/Pagination";

function Workers() {
  const { token } = useSelector((state: RootState) => state.states.user.value);
  const { toast } = useToast();
  const [page, setPage] = useState<number>(1);
  const { data: users, refetch } = useQuery({
    queryKey: ["ordersAdmin", page],
    queryFn: () => getOrders(token, page),
  });

  const handleDelete = async (id: string) => {
    if (!token) {
      window.location.href = "/login";
      return Promise.reject();
    }
    try {
      const resp = await fetch(`${ENDPOINTURL}/user/delete/admin/${id}`, {
        method: "DELETE",
        headers: { Authorization: token },
      });
      if (!resp.ok) {
        toast({
          title: "A dolgozó törlése nem sikerült!",
          variant: "destructive",
        });
        return Promise.reject();
      }
      toast({ title: "A dolgozót sikeresen töröltük!" });
      refetch();
    } catch (error) {
      toast({
        title: "A dolgozó törlése nem sikerült!",
        variant: "destructive",
      });
      console.log(error);
      return Promise.reject();
    }
  };

  return (
    <Card className="card lg:m-auto">
      <CardHeader>
        <h1 className="text-center">Jelenlegi dolgozók</h1>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell className="text-lg font-bold">Dolgozó neve</TableCell>
              <TableCell className="text-lg font-bold">
                Dolgozó email címe
              </TableCell>
              <TableCell className="text-lg font-bold">
                Dolgozó státusza
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.items.map((user, idx) => {
              return (
                <TableRow key={idx}>
                  <TableCell className="text-lg">{user.name}</TableCell>
                  <TableCell className="text-lg">{user.email}</TableCell>
                  <TableCell className="text-lg">{user.role}</TableCell>
                  <TableCell className="text-lg">
                    <Trash2
                      onClick={() => handleDelete(user._id)}
                      className="text-destructive"
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        {users?.pageCount && users.pageCount > 1 && (
          <Pagination
            maxPage={users?.pageCount}
            page={page}
            setPage={setPage}
          />
        )}
      </CardFooter>
    </Card>
  );
}
export default Workers;

async function getOrders(
  token: string | null,
  page: number
): Promise<PaginationResponse<User[]>> {
  if (!token) {
    window.location.href = "/login";
    return Promise.reject();
  }
  try {
    const resp = await fetch(`${ENDPOINTURL}/user/all?page=${page}&limit=5`, {
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
