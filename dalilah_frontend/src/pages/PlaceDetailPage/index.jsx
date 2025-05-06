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
import DisplayReview from '../../components/DisplayReview/DisplayReview';


export default function PlaceDetailPage({ user }) {
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
            const created = await createReview(placeId, { content: newReview, place_id: placeId });
            console.log('Review created:', created);
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

    async function handleUpdateReview(reviewId, formData) {
        if (!formData.trim()) return;

        try {
            await updateReview(reviewId, { content: formData });
            const updatedReviews = reviews.map(r => r.id === reviewId ? { ...r, content: formData } : r);
            setReviews(updatedReviews);
        } catch (err) {
            console.error('Error updating review:', err);
        }
    }

    if (!place) return <p>Loading place details...</p>;

    return (
        <section className="place-detail-page">
            <div className="place-header">
                <span className="added-by">Added by: {place.username}</span>
                <span className="city">City: {place.city_name}</span>
            </div>

            <h1 className="place-name">{place.name}</h1>

            <div className="place-info">
                <p><strong>Description:</strong> {place.description}</p>
                <p>
                    <strong>Location:</strong>{" "}
                    <a href={place.location} target="_blank" rel="noopener noreferrer">
                        Google Maps
                    </a>
                </p>
                <p><strong>Category:</strong> {place.category_name}</p>
            </div>

            <hr />

            <section className="reviews-section">
                <h2>Reviews</h2>
                {reviews.length ? (
                    <ul className="review-list">
                        {reviews.map((review) => (
                            <DisplayReview
                                key={review.id}
                                review={review}
                                user={user}
                                handleUpdateReview={handleUpdateReview}
                                handleDeleteReview={handleDeleteReview}
                            />
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
