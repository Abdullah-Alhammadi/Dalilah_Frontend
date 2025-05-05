import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    getPlace,
    deletePlace,
} from '../../utilities/place-api';
import {
    getReviewsForPlace,
    createReview,
    deleteReview,
    updateReview,
} from '../../utilities/review-api';
import './styles.css';

export default function PlaceDetailPage() {
    const { placeId } = useParams();
    const navigate = useNavigate();
    const [place, setPlace] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [editedContent, setEditedContent] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const placeData = await getPlace(placeId);
                const reviewsData = await getReviewsForPlace(placeId);
                setPlace(placeData);
                setReviews(reviewsData);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        }
        fetchData();
    }, [placeId]);

    async function handleDelete() {
        const confirmed = window.confirm('Are you sure you want to delete this place?');
        if (!confirmed) return;

        try {
            const result = await deletePlace(placeId);
            if (result.success) {
                navigate('/recommendations');
            }
        } catch (err) {
            console.error('Error deleting place:', err);
        }
    }

    async function handleAddReview(e) {
        e.preventDefault();
        if (!newReview.trim()) return;

        try {
            const created = await createReview(placeId, { content: newReview });
            setReviews([...reviews, created]);
            setNewReview('');
        } catch (err) {
            console.error('Error creating review:', err);
        }
    }

    async function handleDeleteReview(reviewId) {
        const confirmed = window.confirm('Delete this review?');
        if (!confirmed) return;

        try {
            await deleteReview(reviewId);
            setReviews(reviews.filter((r) => r.id !== reviewId));
        } catch (err) {
            console.error('Error deleting review:', err);
        }
    }

    function handleEditClick(review) {
        setEditingReviewId(review.id);
        setEditedContent(review.content);
    }

    async function handleUpdateReview(reviewId) {
        if (!editedContent.trim()) return;

        try {
            const updated = await updateReview(reviewId, {
                content: editedContent,
                place: placeId,
            });
            const updatedReviews = reviews.map(r => r.id === reviewId ? updated : r);
            setReviews(updatedReviews);
            setEditingReviewId(null);
            setEditedContent('');
        } catch (err) {
            console.error('Error updating review:', err);
        }
    }

    if (!place) return <p>Loading place details...</p>;

    return (
        <section className="place-detail-page">
            <h1>{place.name}</h1>
            <p><strong>Added by:</strong> {place.username}</p>
            <p><strong>Description:</strong> {place.description}</p>
            <p><strong>Location:</strong> {place.location}</p>
            <p><strong>City:</strong> {place.city_name}</p>
            <p><strong>Category:</strong> {place.category_name}</p>

            <div className="place-detail-actions">
                <Link to={`/places/edit/${place.id}`} className="btn edit-btn">Edit</Link>
                <button onClick={handleDelete} className="btn delete-btn">Delete</button>
            </div>

            <hr />

            <section className="reviews-section">
                <h2>Reviews</h2>
                {reviews.length ? (
                    <ul className="review-list">
                        {reviews.map((review) =>
                            review && (
                                <li key={review.id} className="review-item">
                                    {editingReviewId === review.id ? (
                                        <>
                                            <input
                                                type="text"
                                                value={editedContent}
                                                onChange={(e) => setEditedContent(e.target.value)}
                                            />
                                            <button onClick={() => handleUpdateReview(review.id)} className="save-review-btn">💾</button>
                                            <button onClick={() => setEditingReviewId(null)} className="cancel-review-btn">✖️</button>
                                        </>
                                    ) : (
                                        <>
                                            <span><strong>{review.username}:</strong> {review.content}</span>
                                            <button onClick={() => handleEditClick(review)} className="edit-review-btn">✏️</button>
                                            <button onClick={() => handleDeleteReview(review.id)} className="delete-review-btn">🗑️</button>
                                        </>
                                    )}
                                </li>
                            )
                        )}
                    </ul>
                ) : (
                    <p>No reviews yet.</p>
                )}

                <form onSubmit={handleAddReview} className="review-form">
                    <textarea
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                        placeholder="Write your review..."
                        required
                    />
                    <button type="submit" className="btn submit-btn">Add Review</button>
                </form>
            </section>
        </section>
    );
}
