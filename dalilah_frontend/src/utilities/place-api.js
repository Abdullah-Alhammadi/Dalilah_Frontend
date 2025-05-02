import sendRequest from "./sendRequest";
const url = "/api/places/";

export async function getPlacesByCityAndCategory(cityId, categoryId) {
  return sendRequest(`${url}?city_id=${cityId}&category_id=${categoryId}`);
}

export async function createPlace(data) {
  return sendRequest(url, "POST", data);
}
