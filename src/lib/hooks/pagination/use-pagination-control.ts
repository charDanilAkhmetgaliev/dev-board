import {useMemo, useReducer} from "react";
import {
    PaginationActionProps,
    PaginationActions,
    PaginationNavigationSizes,
    PaginationNavigationTypes
} from "types/pagination.ts";
import {
    PAGINATION_VISUAL_SIZE_BASE,
    PAGINATION_VISUAL_SIZE_ACTIVE
} from "lib/constants.ts";

const setNextVisual = (sizes: PaginationNavigationSizes): PaginationNavigationSizes => ({
    ...sizes,
    [PaginationNavigationTypes.left]: PAGINATION_VISUAL_SIZE_BASE,
    [PaginationNavigationTypes.right]: PAGINATION_VISUAL_SIZE_ACTIVE
});

const setPrevVisual = (sizes: PaginationNavigationSizes): PaginationNavigationSizes => ({
    ...sizes,
    [PaginationNavigationTypes.left]: PAGINATION_VISUAL_SIZE_ACTIVE,
    [PaginationNavigationTypes.right]: PAGINATION_VISUAL_SIZE_BASE
});

function paginationVisualsReducer(
    state: PaginationNavigationSizes,
    action: PaginationActionProps & { totalSections: number; currentSection: number }
): PaginationNavigationSizes {
    try {
        const {type, payload, totalSections, currentSection} = action;
        const newSection = payload.newSection;

        if (!newSection) return state;

        let updated = state;

        if (newSection === 1) updated = setNextVisual(state);
        else if (newSection === totalSections) updated = setPrevVisual(state);
        else {
            switch (type) {
                case PaginationActions.next:
                    updated = setNextVisual(state);
                    break;
                case PaginationActions.prev:
                    updated = setPrevVisual(state);
                    break;
                case PaginationActions.set:
                    updated =
                        newSection > currentSection
                            ? setNextVisual(state)
                            : newSection < currentSection
                                ? setPrevVisual(state)
                                : state;
                    break;
            }
        }

        if (
            updated[PaginationNavigationTypes.left] !== state[PaginationNavigationTypes.left] ||
            updated[PaginationNavigationTypes.right] !== state[PaginationNavigationTypes.right]
        ) {
            return updated;
        }

        return state;
    } catch (error) {
        console.warn("Ошибка изменения состояния отображаемых страниц пагинации! Используются значения по умолчанию.", error);
        return state;
    }
}

export default function usePaginationNavigationVisuals(
    totalSections: number,
    currentSection: number
) {
    const initialState: PaginationNavigationSizes = useMemo(
        () => ({
            [PaginationNavigationTypes.left]: PAGINATION_VISUAL_SIZE_BASE,
            [PaginationNavigationTypes.right]: PAGINATION_VISUAL_SIZE_BASE
        }),
        []
    );

    const [pgnNavigationVisuals, dispatchBase] = useReducer(paginationVisualsReducer, initialState);

    const pgnNavigationVisualsDispatch = useMemo(
        () => (action: PaginationActionProps) =>
            dispatchBase({...action, totalSections, currentSection}),
        [totalSections, currentSection]
    );

    return useMemo(
        () => ({pgnNavigationVisuals, pgnNavigationVisualsDispatch}),
        [pgnNavigationVisuals, pgnNavigationVisualsDispatch]
    );
}
