import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "components/ui/pagination.tsx";
import React, { type FC, memo, useMemo } from "react";
import {
  PaginationActions,
  type PaginationComponentProps
} from "types/pagination.ts";

const PaginationComponent: FC<PaginationComponentProps> = memo(
  ({ currentSection, visibleSections, handleSectionChange, style }) => {
    const { next, prev, set } = PaginationActions;

    return (
      <Pagination className={style}>
        <PaginationContent>
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious onClick={() => handleSectionChange(prev)} />
          </PaginationItem>
          {/*<PaginationItem>*/}
          {/*  <PaginationEllipsis />*/}
          {/*</PaginationItem>*/}

          <PaginationItem className="cursor-pointer">
            {visibleSections.map((section) => (
              <PaginationLink
                key={section}
                isActive={section === currentSection}
                onClick={() => handleSectionChange(set, section)}
              >
                {section}
              </PaginationLink>
            ))}
          </PaginationItem>

          <PaginationItem className="cursor-pointer">
            <PaginationNext onClick={() => handleSectionChange(next)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  }
);

export default PaginationComponent;
