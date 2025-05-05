import sendRequest from "./sendRequest";
const url = "/api/users";

export async function signup(formData) {
    try {
        const response = await sendRequest(`${url}/signup/`, "POST", formData);
        localStorage.setItem("accessToken", response.access);
        localStorage.setItem("refreshToken", response.refresh);
        return response.user;
    } catch (err) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return null;
    }
}

export async function login(formData) {
    try {
        const response = await sendRequest(`${url}/login/`, "POST", formData);
        localStorage.setItem("accessToken", response.access);
        localStorage.setItem("refreshToken", response.refresh);
        console.log(response, "login check response");
        return response.user;
    } catch (err) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return null;
    }
}

export async function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
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
        console.log(err, "Error refreshing user");
        return null;
    }
}
