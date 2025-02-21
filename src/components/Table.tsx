import {
  Table as ShadcnuiTable,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function Table({ list }: { list: { name: string; value: string }[] }) {
  if (list.length === 0) {
    return <p>Nincs elérhető adat.</p>;
  }

  return (
    <ShadcnuiTable>
      <TableHeader>
        {list.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.name}</TableCell>
            <TableCell className="text-right font-bold">{item.value}</TableCell>
          </TableRow>
        ))}
      </TableHeader>
    </ShadcnuiTable>
  );
}

export default Table;
