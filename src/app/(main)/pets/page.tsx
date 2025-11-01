import GridBoard from "../../../components/modules/GridBoard/GridBoard.tsx";
import {PetsPageParams, ShortPetProps} from "types";
import {PaginationSParams} from "types/pagination.ts";
import {PETS_DATA} from "mock/pets.ts";
import {PETS_PER_SECTION} from "lib/constants.ts";

const PetsPage = async ({searchParams}: {
    searchParams: Promise<PetsPageParams>;
}) => {
    console.log("pets-page");
    const params: PetsPageParams = await searchParams;
    const urlSection: string | undefined = params[PaginationSParams.section] || undefined;

    return (
        <>
            <GridBoard<ShortPetProps> dataList={PETS_DATA} dataPerSection={PETS_PER_SECTION} urlSection={urlSection}/>
        </>
    );
};

export default PetsPage;
