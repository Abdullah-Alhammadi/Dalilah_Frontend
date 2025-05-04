import sendRequest from "./sendRequest";

export async function getReviewsForPlace(placeId) {
    return sendRequest(`/api/places/${placeId}/reviews/`);
}

export async function createReview(placeId, data) {
    return sendRequest(`/api/places/${placeId}/reviews/`, "POST", data);
}

export async function updateReview(reviewId, data) {
    return sendRequest(`/api/reviews/${reviewId}/`, "PUT", data);
}

export async function deleteReview(reviewId) {
    return sendRequest(`/api/reviews/${reviewId}/`, "DELETE");
}

export async function getReview(reviewId) {
    return sendRequest(`/api/reviews/${reviewId}/`);
}
