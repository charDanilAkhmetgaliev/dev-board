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
import {updateUrlParam} from "lib/utils/utils.ts";
import React, {type FC, useCallback, useEffect, useMemo} from "react";
import {
    PaginationActions,
    type PaginationLinkDataset,
    PaginationSParams,
    type SectionIsValid
} from "types/pagination.ts";

import usePaginationSection from "./use-pagination-section.ts";
import usePaginationNavigationVisuals from "./use-pagination-control.ts";

interface UsePaginationReturn {
    PaginationComponent: FC<{ style?: string }>;
    currentSection: number;
}

const usePagination = (
    totalItems: number,
    itemsPerSection: number,
    urlSection?: number
): UsePaginationReturn => {
    // получить общее кол-во секции и номер последней страницы
    const totalSections = useMemo(
        () => Math.ceil(totalItems / itemsPerSection),
        [totalItems, itemsPerSection]
    );

    // проверка секции на валидность
    const sectionIsValid: SectionIsValid = useCallback(
        (section: number) => section > 0 && section <= totalSections,
        [totalSections]
    );

    // получить состояние и функцию управления текущей секции
    const {currentSection, currentSectionDispatch} = usePaginationSection(
        sectionIsValid,
        urlSection
    );

    // получить состояние и функцию управления отображаемыми страницами пагинации
    const {
        pgnNavigationVisuals,
        pgnNavigationVisualsDispatch
    } = usePaginationNavigationVisuals(totalSections, currentSection);

    // получить динамический список видимых номеров страниц между первой и последней
    const visibleSections = useMemo(() => {
        if (totalSections <= 1) return [];

        const start = Math.max(2, currentSection - pgnNavigationVisuals.left);
        const end = Math.min(totalSections - 1, currentSection + pgnNavigationVisuals.right);

        return Array.from({length: end - start + 1}, (_, i) => start + i);
    }, [currentSection, totalSections, pgnNavigationVisuals]);

    console.log("use-pagination");
    console.log(currentSection);

    // функция делегирования событий пагинации
    const handleClick = useCallback(
        (event: React.MouseEvent<HTMLUListElement>) => {
            try {
                // получить элемент(цифру страницы) на который кликнул пользователь
                const triggerElement: HTMLAnchorElement | null = (
                    event.target as HTMLUListElement
                ).closest("a");

                if (triggerElement) {
                    // получить набор данных который имеет элемент
                    const elementDataset: PaginationLinkDataset = triggerElement.dataset;

                    if (elementDataset.slot === "pagination-link") {
                        // получить тип действия элемента
                        const action: PaginationActions | undefined = elementDataset.action;
                        // получить выбранную страницу из набора данных самого элемента
                        const sectionValue: number = Number(
                            elementDataset.sectionValue
                        );
                        // выполнить соответствующее действие
                        if (action && sectionIsValid(sectionValue)) {
                            currentSectionDispatch({
                                type: action,
                                payload: {newSection: sectionValue}
                            });
                            pgnNavigationVisualsDispatch({
                                type: action,
                                payload: {newSection: sectionValue}
                            });
                        }
                    }
                }
            } catch (error) {
                console.error(`Ошибка делегирования событий пагинации!`);
                console.error(error);
            }
        },
        [currentSectionDispatch, pgnNavigationVisualsDispatch, sectionIsValid, currentSection, totalSections]
    );

    // функция возвращающая базовые элементы блока навигации
    const renderPaginationItems = () => (
        <>
            {/* Назад */}
            <PaginationItem key={"pagination-control-prev"}>
                <PaginationPrevious data-action={PaginationActions.prev}
                                    data-section-value={currentSection - 1}
                                    className={`${currentSection === 1 && 'opacity-50 hover:bg-auto  cursor-auto'}`}
                />
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
            {currentSection > pgnNavigationVisuals.left + 2 && (
                <PaginationItem key={"pagination-control-ellipsis-l"}>
                    <PaginationEllipsis/>
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
                        <PaginationEllipsis/>
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
                <PaginationNext data-action={PaginationActions.next} data-section-value={currentSection + 1}
                                className={`${currentSection === totalSections && 'opacity-50 hover:bg-auto cursor-auto'}`}/>
            </PaginationItem></>);

    const PaginationComponent: FC<{ style?: string }> = useMemo(() => {
        return ({style}) => (
            <Pagination className={style}>
                <PaginationContent onClick={handleClick}>
                    {renderPaginationItems()}
                </PaginationContent>
            </Pagination>
        );
    }, [visibleSections, totalSections, currentSection, handleClick, pgnNavigationVisuals]);

    // сайд эффекты
    useEffect(() => {
        // обновить параметр номера страницы в url
        updateUrlParam(PaginationSParams.section, String(currentSection), true);
    }, [currentSection]);

    return {
        PaginationComponent,
        currentSection
    };
};

export default usePagination;
