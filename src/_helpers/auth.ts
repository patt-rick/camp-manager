import { API_SERVICE, Endpoints } from "./constants";
import axios from "axios";

export const makeLoginRequest = async (data: { email: string; password: string }): Promise<any> => {
    try {
        const url = API_SERVICE + Endpoints.WORKFORCE_LOGIN;
        const response: any = await axios.post(url, { data });
        return response.data as any;
    } catch (err) {
        return (err as any).response.data as any;
    }
};
