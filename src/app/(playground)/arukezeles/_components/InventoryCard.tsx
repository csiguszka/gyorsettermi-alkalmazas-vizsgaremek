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

interface InventoryCardProps {
  materials: Material[];
  tableSelectedIdx: number | null;
  tableRowClickHandle: (id: number) => void;
  newButtonHandle: () => void;
}

function InventoryCard({
  materials,
  tableSelectedIdx,
  tableRowClickHandle,
  newButtonHandle,
}: InventoryCardProps) {
  const list = materials.map((material) => {
    return {
      name: material.name,
      value: material.inStock.toString() + " " + material.unit,
    };
  });
  return (
    <Card className="card max-w-full lg:w-1/3">
      <CardHeader>
        <h2 className="text-center">Alapanyagok</h2>
        <div className="flex flex-col sm:grid grid-cols-[auto_auto] gap-2">
          <Input className="mb-none" placeholder="Keresés név alapján" />
          <Button className="order-last sm:order-none btn row-span-2 sm:self-center">
            Keresés
          </Button>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Válasszon státuszt" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Státusz</SelectLabel>
                <SelectItem value="all">Összes alapanyag</SelectItem>
                <SelectItem value="no">Nincs raktáron</SelectItem>
                <SelectItem value="less">Kevés van raktáron</SelectItem>
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
          <Pagination />
        </div>
      </CardFooter>
    </Card>
  );
}

export default InventoryCard;
