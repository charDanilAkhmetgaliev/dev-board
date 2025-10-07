export enum PaginationSParams {
    section = "page"
}

export enum PaginationActions {
    next = "next",
    prev = "prev",
    set = "set"
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
