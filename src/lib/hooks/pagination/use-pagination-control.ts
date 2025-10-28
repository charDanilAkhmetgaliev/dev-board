import {useReducer} from "react";
import {
    PaginationActions,
    PaginationControlSizes,
    PaginationControlTypes,
    pgnControlActions
} from "types/pagination.ts";
import {PAGINATION_CONTROL_SIZE, PAGINATION_CONTROL_SIZE_ACTIVE} from "lib/constants.ts";

const usePaginationControl = (totalSections: number) => {
    const initialControlSizes: PaginationControlSizes = {
        [PaginationControlTypes.left]: PAGINATION_CONTROL_SIZE,
        [PaginationControlTypes.right]: PAGINATION_CONTROL_SIZE
    };

    const [paginationControlSizes, paginationControlSizesDispatch] = useReducer(pgnControlSizeReducer, initialControlSizes);

    function pgnControlSizeReducer(pgnControlSizes: PaginationControlSizes, pgnControlActions: pgnControlActions) {
        const updatedPgnControlSizes: PaginationControlSizes = {...pgnControlSizes};
        const {type, payload} = pgnControlActions;

        const handlePgnControlNext = () => {
            updatedPgnControlSizes[PaginationControlTypes.left] = PAGINATION_CONTROL_SIZE;
            updatedPgnControlSizes[PaginationControlTypes.right] = PAGINATION_CONTROL_SIZE_ACTIVE;
        }

        const handlePgnControlPrev = () => {
            updatedPgnControlSizes[PaginationControlTypes.left] = PAGINATION_CONTROL_SIZE_ACTIVE;
            updatedPgnControlSizes[PaginationControlTypes.right] = PAGINATION_CONTROL_SIZE;
        }

        const handlePgnControlSet = () => {
            updatedPgnControlSizes[PaginationControlTypes.left] = PAGINATION_CONTROL_SIZE;
            updatedPgnControlSizes[PaginationControlTypes.right] = PAGINATION_CONTROL_SIZE;
        }

        switch (payload.newSection) {
            case 1:
                handlePgnControlNext();
                break;
            case totalSections:
                handlePgnControlPrev();
                break;
            default:
                switch (type) {
                    case PaginationActions.next:
                        handlePgnControlNext();
                        break;
                    case PaginationActions.prev:
                        handlePgnControlPrev();
                        break;
                    case PaginationActions.set:
                        handlePgnControlSet();
                        break;
                }
                break;
        }


        return updatedPgnControlSizes;
    }

    return {paginationControlSizes, handleControlChange: paginationControlSizesDispatch};
}

export default usePaginationControl;