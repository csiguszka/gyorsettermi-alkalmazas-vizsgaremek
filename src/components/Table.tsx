import {
  Table as ShadcnuiTable,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

function Table({
  list,
  RowSelectedIdx,
  onClick,
}: {
  list: { name: string; value: string | React.ReactNode }[];
  RowSelectedIdx?: number | null;
  onClick?: (id: number) => void;
}) {
  if (list.length === 0) {
    return <p>Nincs elérhető adat.</p>;
  }

  return (
    <ShadcnuiTable>
      <TableHeader>
        {list.map((item, index) => (
          <TableRow
            key={index}
            onClick={() => onClick && onClick(index)}
            className={cn(
              onClick ? "cursor-pointer hover:bg-primary_opacity" : "",
              index.toString() === RowSelectedIdx?.toString() &&
                "bg-primary_opacity hover:bg-primary_opacity"
            )}
          >
            <TableCell>{item.name}</TableCell>
            <TableCell className="text-right font-bold float-right">
              {item.value}
            </TableCell>
          </TableRow>
        ))}
      </TableHeader>
    </ShadcnuiTable>
  );
}

export default Table;
