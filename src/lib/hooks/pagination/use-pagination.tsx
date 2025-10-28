"use client";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "../../../components/ui/pagination.tsx";
import {updateUrlParam} from "../../utils/utils.ts";
import React, {
    type FC,
    useCallback,
    useEffect,
    useMemo
} from "react";
import {
    PaginationActions,
    type PaginationLinkDataset,
    PaginationSParams,
    type SectionIsValid
} from "types/pagination.ts";

import usePaginationSection from "./use-pagination-section.ts";
import usePrevious from "../usePrevious.ts";
import usePaginationControl from "./use-pagination-control.ts";

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
        (section) => section > 0 && section <= totalSections,
        [totalSections]
    );

    // получить состояние и функцию управления текущей секции
    const {currentSection, handleSectionChange} = usePaginationSection(
        sectionIsValid,
        urlSection
    );

    // получить состояние и функцию управления панели управления
    const {paginationControlSizes, handleControlChange} = usePaginationControl(totalSections);

    // получить динамический список видимых номеров страниц между первой и последней
    const visibleSections = useMemo(() => {
        const start: number = Math.max(2, currentSection - paginationControlSizes.left);
        const end: number = Math.min(
            totalSections - 1,
            currentSection + paginationControlSizes.right
        );
        return Array.from({length: end - start + 1}, (_, i) => start + i);
    }, [currentSection, totalSections]);

    console.log("use-pagination");
    console.log(currentSection);

    // функция делегирования событий пагинации
    const handleClick = useCallback(
        (event: React.MouseEvent<HTMLUListElement>) => {
            // получить элемент(цифру страницы) на который кликнул пользователь
            const triggerElement: HTMLAnchorElement | null = (
                event.target as HTMLUListElement
            ).closest("a");

            if (triggerElement) {
                // получить набор данных который имеет элемент
                const elementDataset: PaginationLinkDataset = triggerElement.dataset;
                if (elementDataset) {
                    if (elementDataset.slot === "pagination-link") {
                        // получить тип действия элемента
                        const action: PaginationActions | undefined = elementDataset.action;
                        // получить выбранную страницу из набора данных самого элемента
                        const sectionValue: number = Number(
                            elementDataset.sectionValue
                        );
                        // выполнить соответствующее действие
                        switch (action) {
                            // действие - следующая страница
                            case PaginationActions.next:
                                // вызвать переключение страницы на следующую
                                handleSectionChange(PaginationActions.next);
                                // вызвать обновление панели управления
                                handleControlChange({
                                    type: PaginationActions.next,
                                    payload: {newSection: sectionValue}
                                });
                                break;
                            // действие - предыдущая страница
                            case PaginationActions.prev:
                                // вызываем переключение страницы на предыдущую
                                handleSectionChange(PaginationActions.prev);
                                // вызвать обновление панели управления
                                handleControlChange({
                                    type: PaginationActions.prev,
                                    payload: {newSection: sectionValue}
                                });
                                break;
                            // действие - выбранная страница
                            case PaginationActions.set: {
                                // вызываем переключение на выбранную страницу
                                handleSectionChange(PaginationActions.set, sectionValue);
                                // вызвать обновление панели управления
                                handleControlChange({
                                    type: PaginationActions.set,
                                    payload: {newSection: sectionValue}
                                });
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

    // сайд эффекты
    useEffect(() => {
        // обновить параметр номера страницы в url
        updateUrlParam(PaginationSParams.section, String(currentSection), true);
    }, [currentSection]);

    const PaginationComponent = useCallback(
        ({style}: { style?: string }) => (
            <Pagination className={style}>
                <PaginationContent onClick={handleClick}>
                    {/* Назад */}
                    <PaginationItem key={"pagination-control-prev"}>
                        <PaginationPrevious data-action={PaginationActions.prev}/>
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
                    {currentSection > paginationControlSizes.left + 2 && (
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
                        <PaginationNext data-action={PaginationActions.next}/>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        ),
        [visibleSections, currentSection, totalSections, handleClick]
    );

    // Компонент пагинации
    // const PaginationComponent = useMemo<FC<{ style?: string }>>(
    //     () =>
    //         ({style}) => (
    //             <Pagination className={style}>
    //                 <PaginationContent onClick={handleClick}>
    //                     {/* Назад */}
    //                     <PaginationItem key={"pagination-control-prev"}>
    //                         <PaginationPrevious data-action={PaginationActions.prev}/>
    //                     </PaginationItem>
    //
    //                     {/* Первая страница */}
    //                     <PaginationItem key={"pagination-control-set-first"}>
    //                         <PaginationLink
    //                             isActive={currentSection === 1}
    //                             data-action={PaginationActions.set}
    //                             data-section-value={1}
    //                         >
    //                             1
    //                         </PaginationLink>
    //                     </PaginationItem>
    //
    //                     {/* Эллипсис слева */}
    //                     {currentSection > controlSizeL + 2 && (
    //                         <PaginationItem key={"pagination-control-ellipsis-l"}>
    //                             <PaginationEllipsis/>
    //                         </PaginationItem>
    //                     )}
    //
    //                     {/* Центральные страницы */}
    //                     {visibleSections.map((section) => (
    //                         <PaginationItem key={`pagination-control-set-${section}`}>
    //                             <PaginationLink
    //                                 isActive={section === currentSection}
    //                                 data-action={PaginationActions.set}
    //                                 data-section-value={section}
    //                             >
    //                                 {section}
    //                             </PaginationLink>
    //                         </PaginationItem>
    //                     ))}
    //
    //                     {/* Эллипсис справа */}
    //                     {visibleSections[visibleSections.length - 1] <
    //                         totalSections - 1 && (
    //                             <PaginationItem key={"pagination-control-ellipsis-r"}>
    //                                 <PaginationEllipsis/>
    //                             </PaginationItem>
    //                         )}
    //
    //                     {/* Последняя страница */}
    //                     {totalSections > 1 && (
    //                         <PaginationItem key={"pagination-control-set-last"}>
    //                             <PaginationLink
    //                                 isActive={currentSection === totalSections}
    //                                 data-action={PaginationActions.set}
    //                                 data-section-value={totalSections}
    //                             >
    //                                 {totalSections}
    //                             </PaginationLink>
    //                         </PaginationItem>
    //                     )}
    //
    //                     {/* Вперёд */}
    //                     <PaginationItem key={"pagination-control-next"}>
    //                         <PaginationNext data-action={PaginationActions.next}/>
    //                     </PaginationItem>
    //                 </PaginationContent>
    //             </Pagination>
    //         ),
    //     [visibleSections, currentSection, totalSections, controlSizeL, handleClick]
    // );

    return {
        PaginationComponent,
        currentSection
    };
};

export default usePagination;
