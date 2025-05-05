import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserPlaces } from '../../utilities/place-api';
import './styles.css';

export default function YourRecommendationsPage() {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        async function fetchPlaces() {
            try {
                const data = await getUserPlaces();
                setPlaces(data);
            } catch (err) {
                console.error('Error fetching places:', err);
            }
        }
        fetchPlaces();
    }, []);

    return (
        <section className="recommendations-page">
            <h1>Your Recommendations</h1>
            <div className="place-list">
                {places.length ? (
                    places.map((place) => (
                        <Link to={`/places/${place.id}`} key={place.id} className="place-card">
                            <h2>{place.name}</h2>
                            <p>{place.description}</p>
                            <p><strong>Location:</strong> {place.location}</p>
                            <p><strong>City:</strong> {place.city_name}</p>
                            <p><strong>Category:</strong> {place.category_name}</p>
                        </Link>
                    ))
                ) : (
                    <p>No recommendations yet.</p>
                )}
            </div>
        </section>
    );
}
