/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Material } from "@/app/model/material-model";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import InventoryCard from "./_components/InventoryCard";
import InventoryFormCard from "./_components/InventoryFormCard";
import { PaginationResponse } from "@/app/model/pagination-model";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import ENDPOINTURL from "@/app/url";
import { useToast } from "@/hooks/use-toast";
import NewMaterialForm from "./_components/NewMaterialForm";
import { motion } from "framer-motion";

function Inventory() {
  const { toast } = useToast();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchName, setSearchName] = useState<string>("");
  const [searchStatus, setSearchStatus] = useState<string>("all");
  const handleSearch = () => {
    setSearchName(searchTerm); // Keresési feltétel frissítése csak gombnyomásra
    setPage(1); // Oldalszám visszaállítása az első oldalra
  };

  const queryClient = useQueryClient();

  const { token } = useSelector((state: RootState) => state.states.user.value);

  const { isPending, data } = useQuery({
    queryKey: ["material", page, searchName, searchStatus],
    queryFn: () => getMaterials(page, token, searchName, searchStatus),
    enabled: !!token,
  });

  useEffect(() => {
    if (data?.items) {
      setMaterials(data.items);
      setMaxPage(data.pageCount || 1);
    }
  }, [data]);

  function setPageFn(num: number) {
    setPage(num);
  }

  if (isPending || materials === undefined) {
    return <Loading isCentered={true} />;
  }

  const tableRowClickHandle = (id: number) => {
    setSelectedIdx(id);
    setIsNew(false);
  };

  const newMaterialButtonClickHandle = () => {
    setSelectedIdx(null);
    setIsNew(true);
  };

  const modify = async (d: Material) => {
    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      console.log(d.inStock);
      const response = await fetch(`${ENDPOINTURL}/inventory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          materialId: d._id,
          quantity: d.inStock,
          message: "Feltöltés",
        }),
      });

      if (!response.ok) throw new Error("Sikertelen frissítés");

      await fetch(`${ENDPOINTURL}/material/${d._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          name: d.name,
          englishName: d.englishName,
          unit: d.unit,
        }),
      });

      toast({ title: "Az alapanyagot frissítettük", variant: "default" });
      setSelectedIdx(null);
      queryClient.invalidateQueries({ queryKey: ["material"] });
    } catch (error) {
      toast({
        title: "Hiba történt",
        description: error instanceof Error ? error.message : "Ismeretlen hiba",
        variant: "destructive",
      });
    }
  };

  const create = async (d: Material) => {
    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const response = await fetch(`${ENDPOINTURL}/material`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          name: d.name,
          englishName: d.englishName,
          unit: d.unit,
        }),
      });

      if (!response.ok) throw new Error("Nem sikerült létrehozni");

      const responseData = await response.json();
      toast({
        title: "Az alapanyagot sikeresen rögzítettük",
        variant: "default",
      });

      setMaterials((prev) => [responseData, ...prev]);
      setSelectedIdx(null);
      setIsNew(false);
      queryClient.invalidateQueries({ queryKey: ["material"] });
    } catch (error) {
      toast({
        title: "Hiba történt",
        description: error instanceof Error ? error.message : "Ismeretlen hiba",
        variant: "destructive",
      });
    }
  };

  async function handleDelete(id: string) {
    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const response = await fetch(`${ENDPOINTURL}/material/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (!response.ok) throw new Error("Sikertelen törlés");

      toast({ title: "Az alapanyagot sikeresen töröltük", variant: "default" });

      setMaterials((prev) => prev.filter((item) => item._id !== id));
      setSelectedIdx(null);
      queryClient.invalidateQueries({ queryKey: ["material"] });
    } catch (error) {
      toast({
        title: "Hiba történt",
        description: error instanceof Error ? error.message : "Ismeretlen hiba",
        variant: "destructive",
      });
    }
  }

  return (
    <div>
      <h1 className="text-center mb-5">Árukezelés</h1>
      <div className="flex flex-col w-full justify-center lg:flex-row lg:justify-around gap-3">
        <InventoryCard
          materials={materials}
          tableSelectedIdx={selectedIdx}
          page={page}
          maxPage={maxPage}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
          tableRowClickHandle={tableRowClickHandle}
          newButtonHandle={newMaterialButtonClickHandle}
          setSearchStatus={setSearchStatus}
          setSelectedIdx={setSelectedIdx}
          searchStatus={searchStatus}
          setPage={setPageFn}
        />
        {selectedIdx !== null && (
          <InventoryFormCard
            material={materials[selectedIdx]}
            key={selectedIdx}
            handleDelete={handleDelete}
            handleModify={modify}
          />
        )}
        {isNew && (
          <NewMaterialForm
            material={{ name: "", englishName: "", unit: "" }}
            handleCreate={create}
          />
        )}
      </div>
    </div>
  );
}
export default Inventory;

async function getMaterials(
  page: number,
  token: string | null,
  searchName: string = "",
  searchStatus: string = "all"
): Promise<PaginationResponse<Material[]>> {
  if (!token) {
    window.location.href = "/login";
    return Promise.reject("Nincs bejelentkezve, átirányítás történt.");
  }
  let statusParamString = "";
  if (searchStatus === "no") {
    statusParamString = "&isEnough=false";
  } else if (searchStatus === "yes") {
    statusParamString = "&isEnough=true";
  }

  try {
    const response = await fetch(
      `${ENDPOINTURL}/material?page=${page}&fields=englishName&limit=5&name=${searchName}${statusParamString}`,
      {
        method: "GET",
        headers: { Authorization: token, "Accept-Language": "hu" },
      }
    );

    if (!response.ok) throw new Error("Nem sikerült lekérni az adatokat");

    return response.json();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Ismeretlen hiba");
  }
}
