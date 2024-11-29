import { atom, selector } from "recoil";


export const networkAtom = atom({
    key: "networkAtom",
    default: 104
})

export const jobsAtom = atom({
    key: "jobsAtom",
    default: 0
})

export const notificationAtom = atom({
    key: "notificationAtom",
    default: 12
})

export const messagingAtom = atom({
    key: "messagingAtom",
    default: 0
})

export const totalNotificationCount = selector({
    key: "totalNotificationCount",
    get: function({get}){
        const totalCount = get(networkAtom) + get(jobsAtom) + get(notificationAtom) + get(messagingAtom)
        return totalCount
    }
})