"use client";

import { PaginationResponse } from "@/app/model/pagination-model";
import { User } from "@/app/model/user-model";
import ENDPOINTURL from "@/app/url";
import { RootState } from "@/state/store";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Table, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function Workers() {
  const { token } = useSelector((state: RootState) => state.states.user.value);
  const { toast } = useToast();
  const { data: users, refetch } = useQuery({
    queryKey: ["ordersAdmin"],
    queryFn: () => getOrders(token),
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
            <TableCell className="text-lg font-bold">Dolgozó neve</TableCell>
            <TableCell className="text-lg font-bold">
              Dolgozó email címe
            </TableCell>
            <TableCell className="text-lg font-bold">
              Dolgozó státusza
            </TableCell>
          </TableHeader>
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
        </Table>
      </CardContent>
    </Card>
  );
}
export default Workers;

async function getOrders(
  token: string | null
): Promise<PaginationResponse<User[]>> {
  if (!token) {
    window.location.href = "/login";
    return Promise.reject();
  }
  try {
    const resp = await fetch(`${ENDPOINTURL}/user/all`, {
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
