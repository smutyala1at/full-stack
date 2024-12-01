import { atomFamily, selectorFamily } from "recoil";
import axios from "axios";

// atomFamily -  Creates separate storage (atoms) for each todo, identified by its id
export const todosAtom = atomFamily({
    key: "todoAtomFamily",
    default: selectorFamily({
        // selector: Defines how to fetch or derive the data for each todo
        key: "todoSelectorFamily",
        // Ensures each todo’s data fetching is unique and separate, so Recoil can cache and manage each todo's data individually.
        get: (id) => async () => {
            const response = await axios.get(`http://localhost:3000/todos/${id}`);
            return response.data;
        }
    })
}) 