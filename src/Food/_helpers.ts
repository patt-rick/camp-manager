import { apiGet, apiPost } from "@/_helpers/apiService";
import { Endpoints } from "@/_helpers/constants";

export async function getFoodSuppliesForToday(date: any, foodType: string, campId: number) {
    let resp: any = await apiGet(
        Endpoints.FOOD_STORAGE + `?date_taken=${date}&food_type=${foodType}&camp_id=${campId}`
    );
    return resp;
}

export async function sendFoodAllocationToServer(data: any) {
    try {
        let resp: any = await apiPost(Endpoints.FOOD_ALLOCATION, { data });
        return resp;
    } catch (error: any) {
        if (error.response.status === 419) {
            return { error: error.response.data.message };
        }
        if (error.response.status === 430) {
            return { error: error.response.data.message };
        }
        return { error: "Something went wrong. Please contact administrator" };
    }
}

export async function saveFoodStorageToServer(data: any) {
    try {
        let resp: any = await apiPost(Endpoints.FOOD_STORAGE, { data });
        return resp;
    } catch (error: any) {
        return { error: error.response.data.message };
    }
}

export async function getFoodSupplies(date: any, campId: number) {
    let resp: any = await apiGet(Endpoints.FOOD_STORAGE + `?date_taken=${date}&camp_id=${campId}`);
    return resp;
}
