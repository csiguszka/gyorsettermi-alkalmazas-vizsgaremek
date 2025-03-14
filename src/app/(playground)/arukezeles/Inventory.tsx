"use client";

import { Material } from "@/app/model/material-model";
import Loading from "@/components/Loading";
import { useFectchGet } from "@/app/hooks/useFetchGet";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import InventoryCard from "./_components/InventoryCard";
import InventoryFormCard from "./_components/InventoryFormCard";
import { PaginationResponse } from "@/app/model/pagination-model";
import { useFetchPatch } from "@/app/hooks/useFetchPatch";

function Inventory() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isNew, setIsNew] = useState(false);
  const { toast } = useToast();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [maxPage, setMaxPage] = useState<number>(1);
  const patchFunction = useFetchPatch();

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

  const modify = (d: Material) => {
    interface materialFetch_model {
      name: string;
      englishName: string;
      unit: string;
    }
    interface inventoryFetch_model {
      materialId: string;
      quantity: number;
      message: string;
    }
    const newMaterial: materialFetch_model = {
      name: d.name,
      englishName: d.name,
      unit: d.unit,
    };
    const newInventory: inventoryFetch_model = {
      materialId: d._id,
      quantity: d.inStock,
      message: "Változtatás az admin oldalon",
    };
    patchFunction<materialFetch_model>("/material", d._id, newMaterial);
    patchFunction<inventoryFetch_model>("/inventory", d._id, newInventory);
  };

  // const successModify = (d: Material) => {
  //   toast({
  //     variant: "default",
  //     title: "Áru frissítve",
  //   });
  //   setMaterials((prevState) => {
  //     const newList = [...prevState];
  //     const idx = newList.findIndex((item) => item._id === d._id);
  //     newList[idx] = {
  //       ...newList[idx],
  //       inStock: d.inStock,
  //     };
  //     return newList;
  //   });
  // };

  // const failedModify = () => {
  //   toast({
  //     variant: "destructive",
  //     title: "Sikertelen áru frissítés",
  //   });
  // };

  const create = (d: Material) => {
    console.log(d);
  };

  // const successCreate = (d: Material) => {
  //   toast({
  //     variant: "default",
  //     title: "Áru létrehozva",
  //   });
  //   setMaterials((prevState) => {
  //     const newList = [...prevState];
  //     newList.unshift(d);
  //     return newList;
  //   });
  // };

  // const failedCreate = () => {
  //   toast({
  //     variant: "destructive",
  //     title: "Az áru létrehozása sikertelen",
  //   });
  // };

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
            handleSubmit={modify}
          />
        )}
        {maxPage}
        {isNew && (
          <InventoryFormCard
            material={{
              _id: "",
              inStock: 0,
              name: "",
              englishName: "",
              unit: "",
            }}
            handleSubmit={create}
          />
        )}
      </div>
    </div>
  );
}
export default Inventory;
