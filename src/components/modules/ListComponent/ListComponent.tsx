import React, {memo} from 'react';
import {ListProps} from "types";

interface ListComponentProps<T extends { id: React.Key }> {
    dataList: ListProps<T>,
    Element: React.FC<T>,
    listStyles?: string,
    elStyles?: string
}

const ListComponent = memo(<T extends { id: React.Key }>({
                                                             dataList,
                                                             Element,
                                                             listStyles,
                                                             elStyles
                                                         }: ListComponentProps<T>) => {
    return (
        <ul className={listStyles}>
            {dataList.map((data) => <li key={data.id} className={elStyles}><Element {...data}/></li>)}
        </ul>
    );
});

export default ListComponent;