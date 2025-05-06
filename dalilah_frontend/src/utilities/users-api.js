import sendRequest from "./sendRequest";
const url = "/api/users";

export async function signup(formData) {
    try {
        const response = await sendRequest(`${url}/signup/`, "POST", formData);
        storeTokens(response);
        return response.user;
    } catch (err) {
        clearTokens();
        return null;
    }
}

export async function login(formData) {
    try {
        const response = await sendRequest(`${url}/login/`, "POST", formData);
        storeTokens(response);
        return response.user;
    } catch (err) {
        clearTokens();
        return null;
    }
}

export async function logout() {
    clearTokens();
}

export async function getUser() {
    try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
            const response = await sendRequest(`${url}/token/refresh/`, "POST", { refresh: refreshToken });
            localStorage.setItem("accessToken", response.access);
            const verified = await sendRequest(`${url}/verify/`, "GET");
            return verified.user;
        }
        return null;
    } catch (err) {
        clearTokens();
        return null;
    }
}

function storeTokens({ access, refresh }) {
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
}

function clearTokens() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
}
