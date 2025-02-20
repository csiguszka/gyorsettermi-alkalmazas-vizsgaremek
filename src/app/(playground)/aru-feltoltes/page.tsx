import InputForm from "./_components/InputForm";
import { ComboboxDemo } from "./_components/Combobox";
import { TableDemo } from "./_components/Table";
import { Button } from "@/components/ui/button";
import { PaginationDemo } from "./_components/Pagination";

export default function page() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <InputForm />
      <TableDemo />
      <ComboboxDemo />
      <Button className="btn">Click me</Button>
      <PaginationDemo />
    </div>
  );
}
