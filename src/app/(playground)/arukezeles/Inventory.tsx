"use client";

import { Material } from "@/app/model/material-model";
import Loading from "@/components/Loading";
import InventoryCard from "./_components/InventoryCard";
import InventoryFormCard from "./_components/InventoryFormCard";
import { useFectchGet } from "@/app/hooks/useFetchGet";

function Inventory() {
  const { loading, data: materials } =
    useFectchGet<Material[]>("/material/all");
  if (loading || materials === undefined) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="text-center mb-5">Árukezelés</h1>
      <div className="flex flex-col w-full justify-center lg:flex-row lg:justify-around gap-3">
        <InventoryCard materials={materials} />
        <InventoryFormCard />
      </div>
    </div>
  );
}
export default Inventory;
