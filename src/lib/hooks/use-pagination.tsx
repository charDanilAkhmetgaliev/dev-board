"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "components/ui/pagination.tsx";
import React, { type FC, useCallback, useEffect, useMemo } from "react";
import {
  PaginationActions,
  type PaginationLinkDataset,
  PaginationSParams,
  type SectionIsValid
} from "types/pagination.ts";
import useClientUrlParams from "./use-client-url-params.ts";
import usePaginationSectionReducer from "./use-pagination-section-reducer.ts";

// Тип возвращаемого интерфейса
interface UsePaginationReturn {
  PaginationComponent: FC<{ style?: string }>;
  currentSection: number;
}

const usePagination = (
  totalItems: number,
  itemsPerSection: number,
  urlSection?: number
): UsePaginationReturn => {
  const { next, prev, set } = PaginationActions;

  // Общее количество секций
  const totalSections = useMemo(
    () => Math.ceil(totalItems / itemsPerSection),
    [totalItems, itemsPerSection]
  );

  // Проверка корректности секции
  const sectionIsValid: SectionIsValid = useCallback(
    (section) => section > 0 && section <= totalSections,
    [totalSections]
  );

  // Reducer управления текущей секцией
  const { currentSection, handleSectionChange, controlSizeL, controlSizeR } =
    usePaginationSectionReducer(sectionIsValid, urlSection);

  // Работа с URL-параметрами
  const { updateUrlParam } = useClientUrlParams();

  // Список видимых номеров секций (между первой и последней)
  const visibleSections = useMemo(() => {
    const start = Math.max(2, currentSection - controlSizeL);
    const end = Math.min(totalSections - 1, currentSection + controlSizeR);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentSection, totalSections, controlSizeL, controlSizeR]);

  useEffect(() => {
    updateUrlParam(PaginationSParams.section, String(currentSection), true);
  }, [currentSection, updateUrlParam]);

  console.log("use-pagination");
  console.log(currentSection);

  // функция делегирования событий пагинации
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLUListElement>) => {
      const triggerElement: HTMLAnchorElement | null = (
        event.target as HTMLUListElement
      ).closest("a");

      if (triggerElement) {
        const elementDataset: PaginationLinkDataset = triggerElement.dataset;
        if (elementDataset) {
          if (elementDataset.slot === "pagination-link") {
            const action = elementDataset.action;
            switch (action) {
              case PaginationActions.next:
                handleSectionChange(PaginationActions.next);
                break;
              case PaginationActions.prev:
                handleSectionChange(PaginationActions.prev);
                break;
              case PaginationActions.set: {
                const sectionValue: number = Number(
                  elementDataset.sectionValue
                );
                handleSectionChange(PaginationActions.set, sectionValue);
                break;
              }
              default:
                return;
            }
          }
        }
      }
    },
    [handleSectionChange]
  );

  // Компонент пагинации
  const PaginationComponent = useMemo<FC<{ style?: string }>>(
    () =>
      ({ style }) => (
        <Pagination className={style}>
          <PaginationContent onClick={handleClick}>
            {/* Назад */}
            <PaginationItem key={"pagination-control-prev"}>
              <PaginationPrevious data-action={PaginationActions.prev} />
            </PaginationItem>

            {/* Первая страница */}
            <PaginationItem key={"pagination-control-set-first"}>
              <PaginationLink
                isActive={currentSection === 1}
                data-action={PaginationActions.set}
                data-section-value={1}
              >
                1
              </PaginationLink>
            </PaginationItem>

            {/* Эллипсис слева */}
            {currentSection > controlSizeL + 2 && (
              <PaginationItem key={"pagination-control-ellipsis-l"}>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {/* Центральные страницы */}
            {visibleSections.map((section) => (
              <PaginationItem key={`pagination-control-set-${section}`}>
                <PaginationLink
                  isActive={section === currentSection}
                  data-action={PaginationActions.set}
                  data-section-value={section}
                >
                  {section}
                </PaginationLink>
              </PaginationItem>
            ))}

            {/* Эллипсис справа */}
            {visibleSections[visibleSections.length - 1] <
              totalSections - 1 && (
              <PaginationItem key={"pagination-control-ellipsis-r"}>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {/* Последняя страница */}
            {totalSections > 1 && (
              <PaginationItem key={"pagination-control-set-last"}>
                <PaginationLink
                  isActive={currentSection === totalSections}
                  data-action={PaginationActions.set}
                  data-section-value={totalSections}
                >
                  {totalSections}
                </PaginationLink>
              </PaginationItem>
            )}

            {/* Вперёд */}
            <PaginationItem key={"pagination-control-next"}>
              <PaginationNext data-action={PaginationActions.next} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ),
    [visibleSections, currentSection, totalSections, controlSizeL, handleClick]
  );

  return {
    PaginationComponent,
    currentSection
  };
};

export default usePagination;
