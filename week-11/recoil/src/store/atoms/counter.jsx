import { atom, selector } from "recoil";

export const counterAtom = atom({
    key: "counter",
    default: 0
})

// why we need selectors? for derived values, subscribing to particular particular state given a big atom with many states
export const evenSelector = selector({
    key: "isEvenSelector",
    get: function({get}){ // no default value has it derived from an atom, that's why we use get property.
        // The get property in the selector configuration object takes a function. This function has access to a special utility function, also called get, which Recoil provides. This get utility is passed to your function as part of a single object argument, using destructuring syntax.
        const currentCount = get(counterAtom); // The get function allows you to access the current value of an atom or another selector.
        return currentCount % 2 == 0;
    }
})