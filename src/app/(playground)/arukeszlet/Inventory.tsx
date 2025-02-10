"use client";

import { useFetchOrderOngoing } from "@/app/hooks/useFetchOrderOngoing";
import { Material } from "@/app/model/material-model";
import Loading from "@/components/Loading";
import InventoryCard from "./_components/InventoryCard";

function Inventory() {
  const { loading, data: material } =
    useFetchOrderOngoing<Material[]>("/material/all");
  if (loading) {
    return <Loading />;
  }
  if (!material) {
    return <div>Egyetlen alapanyag sincs felvéve.</div>;
  }
  return <InventoryCard material={material} />;
}
export default Inventory;
