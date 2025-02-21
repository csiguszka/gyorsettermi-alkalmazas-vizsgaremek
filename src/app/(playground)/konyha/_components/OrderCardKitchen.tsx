import { Order } from "@/app/model/order-model";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function OrderCardKitchen({ order }: { order: Order }) {
  return (
    <Card className="card">
      <CardHeader className="text-center text-3xl">
        <CardTitle>{order._id.slice(19, 23)}</CardTitle>
      </CardHeader>
      <CardContent>
      <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Extra húsos szendvics</TableHead>
          <TableHead className="text-right font-bold">2 db</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
          <TableRow>
            <TableCell className="w-[100px]">Sültkrumpli</TableCell>
            <TableCell className="text-right font-bold">1 db</TableCell>
          </TableRow>
      </TableBody>
    </Table>
      </CardContent>
      <CardFooter>
        <Button className="btn">Késznek jelölés</Button>
      </CardFooter>
    </Card>
  );
}
export default OrderCardKitchen;
