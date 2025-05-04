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
} from '../../utilities/review-api';
import './styles.css';



export default function PlaceDetailPage() {
    const { placeId } = useParams();
    const navigate = useNavigate();
    const [place, setPlace] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');

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

    if (!place) return <p>Loading place details...</p>;

    return (
        <section className="place-detail-page">
            <h1>{place.name}</h1>
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
                        {reviews.map((review) => (
                            <li key={review.id} className="review-item">
                                {review.content}
                                <button onClick={() => handleDeleteReview(review.id)} className="delete-review-btn">🗑️</button>
                            </li>
                        ))}
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
