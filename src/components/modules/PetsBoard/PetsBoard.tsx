"use client";

import {PETS_PER_SECTION} from "lib/constants.ts";
import usePagination from "../../../lib/hooks/pagination/use-pagination.tsx";
import {PETS_DATA} from "mock/pets.ts";

const PetsBoard = ({urlSection}: { urlSection?: string }) => {
    const urlSectionNumber: number | undefined = Number(urlSection) || undefined;

    const {PaginationComponent, currentSection} = usePagination(
        PETS_DATA.length,
        PETS_PER_SECTION,
        urlSectionNumber
    );

    return (
        <div className={"w-full h-full flex flex-col"}>
            <div className={"w-full"}>{currentSection}</div>
            <PaginationComponent style="mt-auto"/>
        </div>
    );
};

export default PetsBoard;
