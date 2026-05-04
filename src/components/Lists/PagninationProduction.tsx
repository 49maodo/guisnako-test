import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";
  
  type Props = {
    currentPage: number;
    totalPages: number;
  };
  
  export function PaginationProduct({ currentPage, totalPages }: Props) {
    return (
      <Pagination className="mt-8">
        <PaginationContent>
          {/* Previous */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
  
          {/* Pages */}
          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;
  
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={page === currentPage}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}
  
          {/* Next */}
          <PaginationItem>
            <PaginationNext
              href="#"
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  }