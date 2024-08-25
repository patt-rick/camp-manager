import { apiGet } from "@/_helpers/apiService";
import { Endpoints } from "@/_helpers/constants";

export async function getLisOfCampers(campId: number) {
    try {
        let resp: any = await apiGet(Endpoints.CAMPERS);
        return resp;
    } catch (error) {
        return { error: "Something went wrong. Please contact administrator" };
    }
}
