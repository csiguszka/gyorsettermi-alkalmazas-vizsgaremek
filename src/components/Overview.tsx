import Table from "./Table";
import { Card } from "./ui/card";

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
      <Table list={datas} />
    </Card>
  );
}
