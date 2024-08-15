import { atom, selector } from "recoil";
import axios from "axios";


export const dataSelector = selector({
    key: "dataSelector",
    get: async () => {
        try {
            const response = await axios.get("/data.json");
            return response.data.categories;
        } catch (error) {
            throw error;
        }
    },
});

export const datatom = atom({
    key: "datatom",
    default: dataSelector,
});


export const searchAtom = atom<string>({
    key: "searchAtom",
    default: "",
});


