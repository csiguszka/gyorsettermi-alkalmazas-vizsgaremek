import {
  Pagination as ShadcnuiPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

export function Pagination() {
  return (
    <ShadcnuiPagination>
      <PaginationContent>
        <PaginationItem className="hidden sm:block">
          <div>.</div>
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
          <div>.</div>
        </PaginationItem>
      </PaginationContent>
    </ShadcnuiPagination>
  );
}
