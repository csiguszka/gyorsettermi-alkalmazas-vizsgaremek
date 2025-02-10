import { Material } from "@/app/model/material-model";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function InventoryCard({ material }: { material: Material[] }) {
  return (
    <>
      <Table className="w-full md:w-[400px] m-auto">
        <TableHeader>
          <TableRow>
            <TableHead>Alapanyag neve</TableHead>
            <TableHead>Mennyiség</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {material.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.inStock}g</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default InventoryCard;
