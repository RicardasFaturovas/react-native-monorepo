import { observable } from "mobx";
import { createContext } from "react";

export interface ICounterStore {
    count: number;
}

class CounterStore {
    @observable count = 0;
}

export const CounterStoreContext = createContext(new CounterStore());