import InputForm from "./_components/InputForm";
import { TableDemo } from "./_components/Table";
import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <InputForm />
      <TableDemo />
      <Button className="btn">Click me</Button>
    </div>
  );
}
