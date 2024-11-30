import { atom, selector } from "recoil";
import axios from "axios";


export const notificationsAtom = atom({
    key: "notificationsAtom",
    default: selector({
        key: "notificationsAtomSelector",
        get: async () => {
            const response = await axios.get("http://localhost:3000/notifications")
            return response.data;
        }
    })
})

export const totalNotificationSelector = selector({
    key: "totalNotificationSelector",
    get: function({get}){
        const totalCount = get(notificationsAtom)
        let res = 0
        for(const [key , val] of Object.entries(totalCount)){
            res += val
        }
        return res;
    }
})