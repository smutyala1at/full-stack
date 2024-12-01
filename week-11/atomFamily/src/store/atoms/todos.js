import { atomFamily, selector } from "recoil";
import axios from "axios";

// atomFamily -  Creates separate storage (atoms) for each todo, identified by its id
export const todosAtom = atomFamily({
    key: "todosAtomFamily",
    default: (id) => selector({
        // selector: Defines how to fetch or derive the data for each todo
        key:`todosAtomSelector_${id}`,
        // Ensures each todo’s data fetching is unique and separate, so Recoil can cache and manage each todo's data individually.
        get: async () => {
            const response = await axios.get(`http://localhost:3000/todos/${id}`);
            return response.data;
        }
    })
}) 