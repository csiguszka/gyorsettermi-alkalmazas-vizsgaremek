import InputForm from "./_components/InputForm";
import { ComboboxDemo } from "./_components/Combobox";
import { TableDemo } from "./_components/Table";
import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <div className="grid grid-cols-2">
      <InputForm />
      <TableDemo />
      <ComboboxDemo />
      <Button className="btn">Click me</Button>
    </div>
  );
}
