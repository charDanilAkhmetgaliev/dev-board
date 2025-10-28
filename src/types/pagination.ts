export enum PaginationSParams {
    section = "page"
}

export enum PaginationActions {
    next = "next",
    prev = "prev",
    set = "set"
}

export enum PaginationControlTypes {
    left = 'left',
    right = 'right'
}

export type SectionIsValid = (section: number) => boolean;

export type PaginationActionProps =
    | {
    type: PaginationActions.next;
    payload: { validator: SectionIsValid };
}
    | {
    type: PaginationActions.prev;
    payload: { validator: SectionIsValid };
}
    | {
    type: PaginationActions.set;
    payload: {
        validator: SectionIsValid;
        newSection: number;
    };
};

export type PaginationComponentProps = {
    currentSection: number;
    visibleSections: number[];
    handleSectionChange: HandleSectionChangeProps;
    style?: string;
};

export type HandleSectionChangeProps = {
    (action: PaginationActions.set, newSection: number): void;
    (action: PaginationActions.next | PaginationActions.prev): void;
};

export interface PaginationLinkDataset extends DOMStringMap {
    slot?: "pagination-link";
    action?: PaginationActions;
    sectionValue?: string;
}

export type PaginationControlSizes = {
    [K in PaginationControlTypes]: number
}

export type pgnControlActions = {
    type: PaginationActions.next,
    payload: { newSection: number }
} | {
    type: PaginationActions.prev,
    payload: { newSection: number }
} | {
    type: PaginationActions.set,
    payload: { newSection: number }
}