import * as React from 'react'

import { CurrencyStore } from '@/modules/Currencies/stores/CurrencyStore'


type Props = {
    address: string;
    children: React.ReactNode;
}


export const Context = React.createContext<CurrencyStore>(new CurrencyStore(''))

export function useCurrencyStore(): CurrencyStore {
    return React.useContext(Context)
}

export function CurrencyStoreProvider({ address, children }: Props): JSX.Element {
    const store = React.useMemo(() => new CurrencyStore(address), [address])

    return (
        <Context.Provider value={store}>
            {children}
        </Context.Provider>
    )
}
