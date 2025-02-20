import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "./ui/card";

const datas = [
  {
    name: "Mai megrendelések száma",
    value: "21",
  },
  {
    name: "Mai rendelések összege",
    value: "58645 Ft",
  },
  {
    name: "Havi rendelések száma",
    value: "52",
  },
  {
    name: "Aktív kategóriák száma",
    value: "12",
  },
  {
    name: "Rendelhető ételek és italok száma",
    value: "52",
  },
];

export default function Overview() {
  return (
    <Card className="card p-5">
      <Table>
        <TableBody>
          {datas.map((data) => (
            <TableRow key={data.name}>
              <TableCell className="font-medium">{data.name}</TableCell>
              <TableCell className="text-right font-bold">
                {data.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
