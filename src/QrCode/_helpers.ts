import { apiPost } from "@/_helpers/apiService";
import { Endpoints } from "@/_helpers/constants";

export async function uploadCampersListFromCSV(data: any) {
    try {
        let resp: any = await apiPost(Endpoints.CAMPERS_CREATE_BULK, {
            data,
        });
        return resp;
    } catch (error) {
        return { error: "Something went wrong. Please contact administrator" };
    }
}

export async function uploadSingleCamper(data: any) {
    try {
        let resp: any = await apiPost(Endpoints.CAMPER_CREATE, {
            data,
        });
        return resp;
    } catch (error) {
        return { error: "Something went wrong. Please contact administrator" };
    }
}
