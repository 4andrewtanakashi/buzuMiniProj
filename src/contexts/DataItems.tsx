import React, {createContext, useState} from 'react';
import {DataItem, dataItemNew} from '../utils/Utils';

type PropsDataItemsContext = {
    state: DataItem;
    setState: React.Dispatch<React.SetStateAction<DataItem>>;
};

const DEFAULT_VALUE = {
    state: dataItemNew(),
    setState: () => {}
};

interface Props {
    children?: React.ReactNode;
};

export const DataItemsContext = createContext<PropsDataItemsContext>(DEFAULT_VALUE);

export function DataItemsContextProvider  ({ children } :  Props )  {
    const [state, setState] = useState(DEFAULT_VALUE.state);

    return (
        <DataItemsContext.Provider
            value={
                {
                    state,
                    setState
                }
            }
        >
            {children}
        </DataItemsContext.Provider>
    );
}

