import sendRequest from "./sendRequest";
const url = "/api/places/";

export async function getPlacesByCityAndCategory(cityId, categoryId) {
    return sendRequest(`${url}?city_id=${cityId}&category_id=${categoryId}`);
}

export async function createPlace(data) {
    return sendRequest(url, "POST", data);
}

export async function getAllPlaces() {
    return sendRequest("/api/places/all/");
}

export async function getPlace(placeId) {
    return sendRequest(`${url}${placeId}/`);
}

export async function updatePlace(data, placeId) {
    return sendRequest(`${url}${placeId}/`, "PUT", data);
}

export async function deletePlace(placeId) {
    return sendRequest(`${url}${placeId}/`, "DELETE");
}

export async function getUserPlaces() {
    return sendRequest("/api/places/recommendations/");
}
