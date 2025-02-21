"use client";

import { useFectchGet } from "@/app/hooks/useFetchGet";
import { Food } from "@/app/model/food-model";
import Loading from "@/components/Loading";

function Menu() {
  const { loading, data: food } = useFectchGet<Food[]>("/food/all");
  if (loading) {
    return <Loading />;
  }
  if (!food) {
    return <div>Egyetlen Étel sincs az étlapon!</div>;
  }
  return (
    <div>
      <h1>Étlap</h1>
    </div>
  );
}
export default Menu;
