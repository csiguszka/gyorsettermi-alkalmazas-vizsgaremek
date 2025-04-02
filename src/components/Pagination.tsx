import {
  Pagination as ShadcnuiPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  maxPage: number;
  setPage: (num: number) => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Pagination({maxPage, setPage}: PaginationProps) {
  return (
    <ShadcnuiPagination>
      <PaginationContent>
        <PaginationItem className="hidden sm:block">
          <ChevronLeft/>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem className="hidden sm:block">
          <ChevronRight/>
        </PaginationItem>
      </PaginationContent>
    </ShadcnuiPagination>
  );
}
