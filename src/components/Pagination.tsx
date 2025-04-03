import {
  Pagination as ShadcnuiPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  maxPage: number;
  setPage: (num: number) => void;
}

export function Pagination({ page, maxPage, setPage }: PaginationProps) {
  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < maxPage) setPage(page + 1);
  };

  const generatePageNumbers = () => {
    const pages = [];
    if (maxPage <= 5) {
      // Ha az oldalak száma kevesebb vagy egyenlő 5-nél, minden oldalt megjelenítünk
      for (let i = 1; i <= maxPage; i++) {
        pages.push(i);
      }
    } else {
      // Ha az oldalak száma nagyobb, akkor "..."-ot használunk
      if (page <= 3) {
        pages.push(1, 2, 3, '...', maxPage);
      } else if (page >= maxPage - 2) {
        pages.push(1, '...', maxPage - 2, maxPage - 1, maxPage);
      } else {
        pages.push(1, '...', page - 1, page, page + 1, '...', maxPage);
      }
    }
    return pages;
  };

  return (
    <ShadcnuiPagination>
      <PaginationContent>
        {/* Előző gomb */}
        <PaginationItem className="hidden sm:block" onClick={handlePrevious}>
          <ChevronLeft
            className={`cursor-pointer ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          />
        </PaginationItem>

        {/* Oldalszámok */}
        {generatePageNumbers().map((item, index) => (
          <PaginationItem key={index}>
            {item === '...' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                isActive={item === page}
                onClick={() => typeof item === 'number' && setPage(item)}
              >
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Következő gomb */}
        <PaginationItem className="hidden sm:block" onClick={handleNext}>
          <ChevronRight
            className={`cursor-pointer ${page === maxPage ? "opacity-50 cursor-not-allowed" : ""}`}
          />
        </PaginationItem>
      </PaginationContent>
    </ShadcnuiPagination>
  );
}
