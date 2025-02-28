"use client";

import { Material } from "@/app/model/material-model";
import Loading from "@/components/Loading";
import { useFectchGet } from "@/app/hooks/useFetchGet";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import InventoryCard from "./_components/InventoryCard";
import InventoryFormCard from "./_components/InventoryFormCard";
import { createStock } from "./services/create";
import { PaginationResponse } from "@/app/model/pagination-model";

function Inventory() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isNew, setIsNew] = useState(false);
  const { toast } = useToast();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [maxPage, setMaxPage] = useState<number>(1);
  const { loading, data } =
    useFectchGet<PaginationResponse<Material[]>>("/inventory");

  useEffect(() => {
    if (data) {
      setMaterials(data.items);
      setMaxPage(data.pageCount);
    }
  }, [data]);

  if (loading || materials === undefined) {
    return <Loading isCentered={true} />;
  }

  const tableRowClickHandle = (id: number) => {
    setSelectedIdx(id);
    setIsNew(false);
  };

  const successModify = (d: Material) => {
    toast({
      variant: "default",
      title: "Áru frissítve",
    });
    setMaterials((prevState) => {
      const newList = [...prevState];
      const idx = newList.findIndex((item) => item._id === d._id);
      newList[idx] = {
        ...newList[idx],
        inStock: d.inStock,
      };
      return newList;
    });
  };

  const failedModify = () => {
    toast({
      variant: "destructive",
      title: "Sikertelen áru frissítés",
    });
  };

  const successCreate = (d: Material) => {
    toast({
      variant: "default",
      title: "Áru létrehozva",
    });
    setMaterials((prevState) => {
      const newList = [...prevState];
      newList.unshift(d);
      return newList;
    });
  };

  const failedCreate = () => {
    toast({
      variant: "destructive",
      title: "Az áru létrehozása sikertelen",
    });
  };

  const newMaterialButtonClickHandle = () => {
    setSelectedIdx(null);
    setIsNew(true);
  };

  return (
    <div>
      <h1 className="text-center mb-5">Árukezelés</h1>
      <div className="flex flex-col w-full justify-center lg:flex-row lg:justify-around gap-3">
        <InventoryCard
          materials={materials}
          tableSelectedIdx={selectedIdx}
          tableRowClickHandle={tableRowClickHandle}
          newButtonHandle={newMaterialButtonClickHandle}
        />
        {selectedIdx !== null && (
          <InventoryFormCard
            material={materials[selectedIdx]}
            successHandle={successModify}
            failedHandle={failedModify}
          />
        )}
        {isNew && (
          <InventoryFormCard
            material={{
              _id: "",
              inStock: 0,
              name: "",
              englishName: "",
              unit: "",
            }}
            handleSubmit={createStock}
            successHandle={successCreate}
            failedHandle={failedCreate}
          />
        )}
      </div>
    </div>
  );
}
export default Inventory;
