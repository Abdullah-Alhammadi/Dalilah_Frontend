import sendRequest from "./sendRequest";

const url = "/api/cities/";

export async function index() {
  return sendRequest(url);
}


export async function show(cityId) {
  return sendRequest(`${url}${cityId}/`);
}
