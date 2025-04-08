import { Material } from "@/app/model/material-model";
import { Pagination } from "@/components/Pagination";
import PlusButton from "@/components/PlusButton";
import Table from "@/components/Table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "motion/react";
import { Dispatch, SetStateAction, useEffect } from "react";

const MotionCard = motion.create(Card);

interface InventoryCardProps {
  materials: Material[];
  maxPage: number;
  tableSelectedIdx: number | null;
  page: number;
  tableRowClickHandle: (id: number) => void;
  newButtonHandle: () => void;
  setPage: (num: number) => void;
  searchTerm: string; // Az Input mező aktuális értéke
  setSearchTerm: Dispatch<SetStateAction<string>>; // Az Input mező változásának kezelése
  handleSearch: () => void; // Keresési gomb kezelése
  setSearchStatus: Dispatch<SetStateAction<string>>;
  setSelectedIdx: Dispatch<SetStateAction<number | null>>;
  searchStatus: string;
}

function InventoryCard({
  materials,
  maxPage,
  tableSelectedIdx,
  page,
  searchTerm,
  searchStatus,
  setSelectedIdx,
  setSearchStatus,
  setPage,
  tableRowClickHandle,
  newButtonHandle,
  setSearchTerm,
  handleSearch,
}: InventoryCardProps) {
  useEffect(() => {
    setSelectedIdx(null);
  }, [page]);

  const list = materials.map((material) => {
    return {
      name: material.name,
      value:
        (material.inStock ? material.inStock.toString() : "0") +
        " " +
        material.unit,
    };
  });

  return (
    <MotionCard
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
      className="card max-w-full lg:w-1/3"
    >
      <CardHeader>
        <h2 className="text-center">Alapanyagok</h2>
        <div className="flex flex-col sm:grid grid-cols-[auto_auto] gap-2">
          {/* Input mező kötése a searchTerm állapothoz */}
          <Input
            className="mb-none"
            placeholder="Keresés név alapján"
            value={searchTerm} // Az aktuális érték megjelenítése
            onChange={(e) => setSearchTerm(e.target.value)} // Az állapot frissítése gépeléskor
          />
          {/* Keresési gomb */}
          <Button
            className="order-last sm:order-none btn row-span-2 sm:self-center"
            onClick={handleSearch} // Csak kattintásra történik keresés
          >
            Keresés
          </Button>
          <Select
            value={searchStatus}
            onValueChange={(value) => setSearchStatus(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Válasszon státuszt" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Státusz</SelectLabel>
                <SelectItem value="all">Összes alapanyag</SelectItem>
                <SelectItem value="no">Kevés van raktáron</SelectItem>
                <SelectItem value="yes">Raktáron van</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table
          list={list}
          RowSelectedIdx={tableSelectedIdx}
          onClick={tableRowClickHandle}
        ></Table>
      </CardContent>
      <CardFooter>
        <div className="flex justify-around w-full items-center">
          <PlusButton clickHandle={newButtonHandle} />
          <Pagination page={page} maxPage={maxPage} setPage={setPage} />
        </div>
      </CardFooter>
    </MotionCard>
  );
}

export default InventoryCard;
