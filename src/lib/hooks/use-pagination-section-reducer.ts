import {
  PAGINATION_CONTROL_SIZE,
  PAGINATION_CONTROL_SIZE_STEP,
  PAGINATION_DEFAULT_SECTION
} from "lib/constants.ts";
import { useReducer } from "react";
import {
  type HandleSectionChangeProps,
  type PaginationActionProps,
  PaginationActions,
  type SectionIsValid
} from "types/pagination.ts";

type SectionParamsProps = {
  currentSection: number;
  controlSizeL: number;
  controlSizeR: number;
};

const usePaginationSectionReducer = (
  sectionIsValid: SectionIsValid,
  defSection?: number
) => {
  const initialSectionParams: SectionParamsProps = {
    currentSection: defSection || PAGINATION_DEFAULT_SECTION,
    controlSizeL: PAGINATION_CONTROL_SIZE,
    controlSizeR: PAGINATION_CONTROL_SIZE
  };

  // редьюсер для текущей страницы
  const [sectionParams, sectionParamsDispatch] = useReducer(
    sectionParamsReducer,
    initialSectionParams,
    // функция, которая обработает начальное значение(если оно взято из url)
    (init) =>
      sectionIsValid(init.currentSection)
        ? init
        : { ...init, currentSection: PAGINATION_DEFAULT_SECTION }
  );

  // функция редьюсер(чистая)
  function sectionParamsReducer(
    sectionParams: SectionParamsProps,
    sectionParamsAction: PaginationActionProps
  ) {
    const { validator: sectionIsValid } = sectionParamsAction.payload;
    const { currentSection } = sectionParams;
    let updatedSection: number;
    let updatedControlSizeL: number;
    let updatedControlSizeR: number;

    switch (sectionParamsAction.type) {
      case PaginationActions.next:
        updatedSection = currentSection + 1;
        updatedControlSizeR = PAGINATION_CONTROL_SIZE_STEP;
        updatedControlSizeL = PAGINATION_CONTROL_SIZE;
        break;
      case PaginationActions.prev:
        updatedSection = currentSection - 1;
        updatedControlSizeR = PAGINATION_CONTROL_SIZE;
        updatedControlSizeL = PAGINATION_CONTROL_SIZE_STEP;
        break;
      case PaginationActions.set: {
        updatedSection = sectionParamsAction.payload.newSection;

        if (updatedSection > currentSection) {
          updatedControlSizeR = PAGINATION_CONTROL_SIZE_STEP;
          updatedControlSizeL = PAGINATION_CONTROL_SIZE;
        } else {
          updatedControlSizeR = PAGINATION_CONTROL_SIZE;
          updatedControlSizeL = PAGINATION_CONTROL_SIZE_STEP;
        }

        break;
      }
    }

    if (sectionIsValid(updatedSection)) {
      return {
        currentSection: updatedSection,
        controlSizeL: updatedControlSizeL,
        controlSizeR: updatedControlSizeR
      };
    }

    return sectionParams;
  }

  // хендлер изменения секции
  const handleSectionChange: HandleSectionChangeProps = (
    action: PaginationActions,
    newSection?: number
  ) => {
    if (action === PaginationActions.set) {
      if (newSection) {
        sectionParamsDispatch({
          type: action,
          payload: { validator: sectionIsValid, newSection }
        });
      }
    } else {
      sectionParamsDispatch({
        type: action,
        payload: { validator: sectionIsValid }
      });
    }
  };

  return {
    currentSection: sectionParams.currentSection,
    controlSizeR: sectionParams.controlSizeR,
    controlSizeL: sectionParams.controlSizeL,
    handleSectionChange
  };
};

export default usePaginationSectionReducer;
