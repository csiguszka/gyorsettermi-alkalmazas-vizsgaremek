"use client";

import { useFetchOrderOngoing } from "@/app/hooks/useFetchOrderOngoing";
import { Food } from "@/app/model/food-model";
import Loading from "@/components/Loading";
import MenuCard from "./_components/MenuCard";

function Menu() {
  const { loading, data: food } = useFetchOrderOngoing<Food[]>("/food/all");
  if (loading) {
    return <Loading />;
  }
  if (!food) {
    return <div>Egyetlen Étel sincs az étlapon!</div>;
  }
  return <MenuCard food={food} />;
}
export default Menu;
