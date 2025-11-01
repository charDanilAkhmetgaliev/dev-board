"use client";

import usePagination from "lib/hooks/pagination/use-pagination.tsx";
import React from "react";
import ListComponent from "../ListComponent/ListComponent.tsx";
import {genId, getDataByCurrentSection} from "lib/utils/utils.ts";
import {ListItemProps} from "../../../types";

interface GridBoardProps<T extends { id: React.Key }> {
    dataList: T[],
    dataPerSection: number,
    urlSection?: string
}

const GridBoard = <T extends { id: React.Key }>({urlSection, dataList, dataPerSection}: GridBoardProps<T>) => {
    const urlSectionNumber: number | undefined = Number(urlSection) || undefined;
    const totalItems: number = dataList.length;

    console.log('Grid');

    const {PaginationComponent, currentSection} = usePagination(
        totalItems,
        dataPerSection,
        urlSectionNumber
    );

    // TODO: удалить
    const TempElement: React.FC<T | { id: React.Key }> = ({id}) => {

        return <div>{id}</div>
    }

    const currentDataList: T[] = getDataByCurrentSection(dataList, currentSection, dataPerSection);

    return (
        <div className={"w-full h-full flex flex-col gap-2 pb-1"}>
            <ListComponent dataList={currentDataList} Element={TempElement}
                           listStyles={"w-full h-full grid grid-cols-4 grid-rows-2"}
                           elStyles={"border-r-1 border-b-1"}
            />
            <PaginationComponent style="mt-auto"/>
        </div>
    );
    11
};

export default GridBoard;
