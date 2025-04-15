import ENDPOINTURL from "@/app/url";
import { Card } from "./ui/card";
import {
  Table as ShadcnuiTable,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from "@/app/model/order-model";
import { PaginationResponse } from "@/app/model/pagination-model";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useEffect, useState } from "react";
import { Category } from "@/app/model/category-model";
import { Food } from "@/app/model/food-model";

export default function Overview() {
  const { token } = useSelector((state: RootState) => state.states.user.value);
  const [todayOrderNum, setTodayOrderNum] = useState<number | null>(null);
  const [todayProfit, setTodayProfit] = useState<number | null>(null);
  const [monthOrderNum, setMounthOrderNum] = useState<number | null>(null);
  const [monthProfit, setMountProfit] = useState<number | null>(null);
  const [yearOrderNum, setYearOrderNum] = useState<number | null>(null);
  const [yearProfit, setYearProfit] = useState<number | null>(null);
  const [categoryNum, setCategoryNum] = useState<number | null>(null);
  const [foodNum, setFoodNum] = useState<number | null>(null);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endToday = new Date(today);
  endToday.setHours(23, 59, 59, 999);

  // Hónap első napja
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  startOfMonth.setHours(0, 0, 0, 0); // Pontosítás: nap eleje

  // Hónap utolsó napja
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  endOfMonth.setHours(23, 59, 59, 999); // Pontosítás: nap vége
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  startOfYear.setHours(0, 0, 0, 0);

  // Év utolsó napja
  const endOfYear = new Date(today.getFullYear(), 11, 31);
  endOfYear.setHours(23, 59, 59, 999);

  useEffect(() => {
    const _getData = async () => {
      const { revenue } = await getSum(
        token,
        today.toISOString(),
        endToday.toISOString()
      );
      setTodayProfit(revenue);
    };
    _getData();
  }, []);
  useEffect(() => {
    const _getData = async () => {
      const { revenue } = await getSum(
        token,
        startOfMonth.toISOString(),
        endOfMonth.toISOString()
      );
      setMountProfit(revenue);
    };
    _getData();
  }, []);
  useEffect(() => {
    const _getData = async () => {
      const orders = await getOrders(
        token,
        startOfMonth.toISOString(),
        endOfMonth.toISOString()
      );
      setMounthOrderNum(orders.pageCount);
    };
    _getData();
  }, []);
  useEffect(() => {
    const _getOrders = async () => {
      const orders = await getOrders(
        token,
        today.toISOString(),
        endToday.toISOString()
      );
      setTodayOrderNum(orders.pageCount);
    };
    _getOrders();
  }, []);
  useEffect(() => {
    const _getData = async () => {
      const { revenue } = await getSum(
        token,
        startOfYear.toISOString(),
        endOfYear.toISOString()
      );
      setYearProfit(revenue);
    };
    _getData();
  }, []);
  useEffect(() => {
    const _getData = async () => {
      const orders = await getOrders(
        token,
        startOfYear.toISOString(),
        endOfYear.toISOString()
      );
      setYearOrderNum(orders.pageCount);
    };
    _getData();
  }, []);
  useEffect(() => {
    const _getData = async () => {
      const categorys = await getCategory(token);
      setCategoryNum(categorys.pageCount);
    };
    _getData();
  }, []);
  useEffect(() => {
    const _getData = async () => {
      const categorys = await getFood(token);
      setFoodNum(categorys.pageCount);
    };
    _getData();
  }, []);

  return (
    <>
      <Card className="card p-5">
        <ShadcnuiTable>
          <TableHeader>
            <TableRow>
              <TableCell className="text-lg">Mai megrendelések száma</TableCell>
              <TableCell className="text-lg text-right font-bold float-right">
                {todayOrderNum}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-lg">Mai rendelések összege</TableCell>
              <TableCell className="text-lg text-right font-bold float-right">
                {todayProfit}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-lg">Havi rendelések száma</TableCell>
              <TableCell className="text-lg text-right font-bold float-right">
                {monthOrderNum}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-lg">Havi rendelések összege</TableCell>
              <TableCell className="text-lg text-right font-bold float-right">
                {monthProfit}
              </TableCell>
            </TableRow>
          </TableHeader>
        </ShadcnuiTable>
      </Card>
      <Card className="card p-5">
        <ShadcnuiTable>
          <TableHeader>
            <TableRow>
              <TableCell className="text-lg">Éves rendelések száma</TableCell>
              <TableCell className="text-lg text-right font-bold float-right">
                {yearOrderNum}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-lg">Éves rendelések összege</TableCell>
              <TableCell className="text-lg text-right font-bold float-right">
                {yearProfit}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-lg">Aktív kategóriák száma</TableCell>
              <TableCell className="text-lg text-right font-bold float-right">
                {categoryNum}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-lg">
                Rendelhető ételek és italok száma
              </TableCell>
              <TableCell className="text-lg text-right font-bold float-right">
                {foodNum}
              </TableCell>
            </TableRow>
          </TableHeader>
        </ShadcnuiTable>
      </Card>
    </>
  );
}

async function getOrders(
  token: string | null,
  today: string,
  endToday: string
): Promise<PaginationResponse<Order[]>> {
  if (!token) {
    window.location.href = "/login";
    return Promise.reject();
  }
  try {
    const resp = await fetch(
      `${ENDPOINTURL}/order?page=1&limit=1&minOrderedTime=${today}&maxOrderedTime=${endToday}`,
      {
        method: "GET",
        headers: { Authorization: token },
      }
    );
    if (!resp.ok) {
      return Promise.reject();
    }
    return resp.json();
  } catch (error) {
    console.log(error);
    return Promise.reject();
  }
}

async function getSum(
  token: string | null,
  today: string,
  endToday: string
): Promise<{ revenue: number }> {
  console.log(today);
  console.log(endToday);
  if (!token) {
    window.location.href = "/login";
    return Promise.reject();
  }
  try {
    const resp = await fetch(
      `${ENDPOINTURL}/dashboard/revenue?startDate=${today}&endDate=${endToday}`,
      {
        method: "GET",
        headers: { Authorization: token },
      }
    );
    if (!resp.ok) {
      return Promise.reject();
    }
    return resp.json();
  } catch (error) {
    console.log(error);
    return Promise.reject();
  }
}

async function getCategory(
  token: string | null
): Promise<PaginationResponse<Category[]>> {
  if (!token) {
    window.location.href = "/login";
    return Promise.reject();
  }
  try {
    const resp = await fetch(
      `${ENDPOINTURL}/category?page=1&limit=1&isMainCategory=false`,
      {
        method: "GET",
        headers: { Authorization: token },
      }
    );
    if (!resp.ok) {
      return Promise.reject();
    }
    return resp.json();
  } catch (error) {
    console.log(error);
    return Promise.reject();
  }
}

async function getFood(
  token: string | null
): Promise<PaginationResponse<Food[]>> {
  if (!token) {
    window.location.href = "/login";
    return Promise.reject();
  }
  try {
    const resp = await fetch(
      `${ENDPOINTURL}/food?page=1&limit=1&isEnabled=true`,
      {
        method: "GET",
        headers: { Authorization: token },
      }
    );
    if (!resp.ok) {
      return Promise.reject();
    }
    return resp.json();
  } catch (error) {
    console.log(error);
    return Promise.reject();
  }
}
