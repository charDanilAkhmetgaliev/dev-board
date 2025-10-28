import {PAGINATION_DEFAULT_SECTION} from "lib/constants.ts";
import {useReducer} from "react";
import {
    type HandleSectionChangeProps,
    type PaginationActionProps,
    PaginationActions,
    type SectionIsValid
} from "types/pagination.ts";

const usePaginationSection = (
    sectionIsValid: SectionIsValid,
    defSection?: number
) => {
    const defineInitSection = (init: number): number => {
        if (defSection && sectionIsValid(defSection)) {
            return defSection;
        }
        return init;
    };

    // редьюсер для текущей страницы
    const [currentSection, currentSectionDispatch] = useReducer(
        sectionParamsReducer,
        PAGINATION_DEFAULT_SECTION,
        // функция, которая обработает начальное значение(если оно взято из url)
        defineInitSection
    );

    // функция редьюсер(чистая)
    function sectionParamsReducer(
        currentSection: number,
        sectionParamsAction: PaginationActionProps
    ): number {
        const {validator: sectionIsValid} = sectionParamsAction.payload;
        let updatedSection: number;

        switch (sectionParamsAction.type) {
            case PaginationActions.next:
                updatedSection = currentSection + 1;
                break;
            case PaginationActions.prev:
                updatedSection = currentSection - 1;
                break;
            case PaginationActions.set: {
                updatedSection = sectionParamsAction.payload.newSection;
                break;
            }
        }

        if (sectionIsValid(updatedSection)) {
            return updatedSection;
        }

        return currentSection;
    }

    // хендлер изменения секции
    const handleSectionChange: HandleSectionChangeProps = (
        action: PaginationActions,
        newSection?: number
    ) => {
        if (action === PaginationActions.set) {
            if (newSection) {
                currentSectionDispatch({
                    type: action,
                    payload: {validator: sectionIsValid, newSection}
                });
            }
        } else {
            currentSectionDispatch({
                type: action,
                payload: {validator: sectionIsValid}
            });
        }
    };

    return {
        currentSection,
        handleSectionChange
    };
};

export default usePaginationSection;
