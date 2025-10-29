import {PAGINATION_DEFAULT_SECTION} from "lib/constants.ts";
import {useReducer} from "react";
import {
    type PaginationActionProps,
    PaginationActions,
    type SectionIsValid
} from "types/pagination.ts";

// функция редьюсер(чистая)
function sectionParamsReducer(
    currentSection: number,
    sectionParamsAction: PaginationActionProps
): number {
    try {
        let updatedSection: number | null = null;

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

        return updatedSection ?? currentSection;
    } catch (error) {
        console.error('Ошибка изменения состояния секции! Страница не изменилась!')
        console.error(error);
        return currentSection;
    }
}

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

    return {
        currentSection,
        currentSectionDispatch
    };
};

export default usePaginationSection;
