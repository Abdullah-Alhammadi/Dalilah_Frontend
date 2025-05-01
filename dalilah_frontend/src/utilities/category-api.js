import sendRequest from "./sendRequest";

const url = "/api/categories/";

export async function index() {
  return sendRequest(url); 
}
