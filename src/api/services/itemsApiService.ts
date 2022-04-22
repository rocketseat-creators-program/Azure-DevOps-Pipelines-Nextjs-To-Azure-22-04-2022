import IItem from "../../models/IItem";
import apiService from "../apiService";

const itemsApiService = {
    async getList(): Promise<Array<IItem>> {
        const { data } = await apiService.get<Array<IItem>>("/movies");
        return data;
    },

    async getDetail(id: number): Promise<IItem> {
        const { data } = await apiService.get<IItem>(`/movies/${id}`);
        return data;
    }
}

export default itemsApiService;
