import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserPlaces, deletePlace } from '../../utilities/place-api';
import './styles.css';

export default function YourRecommendationsPage() {
    const [places, setPlaces] = useState([]);
    const navigate = useNavigate();

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

    async function handleDelete(placeId) {
        const confirmed = window.confirm('Are you sure you want to delete this place?');
        if (!confirmed) return;

        try {
            await deletePlace(placeId);  
            window.location.reload();    
        } catch (err) {
            console.error('Error deleting place:', err);
        }
    }



    return (
        <section className="recommendations-page">
            <h1 className='reco'>Your Recommendations</h1>
            <div className="place-list">
                {places.length ? (
                    places.map((place) => (
                        <div key={place.id} className="place-card">

                            <Link to={`/places/${place.id}`}>
                                <h2>{place.name}</h2>
                                <p className='category'><strong>Category:</strong> {place.category_name}</p>
                            </Link>

                            <div className="place-actions">
                                <Link to={`/places/edit/${place.id}`} className="btn edit-btn">Edit</Link>
                                <button onClick={() => handleDelete(place.id)} className="btn delete-btn">Delete</button>
                            </div>

                        </div>
                    ))
                ) : (
                    <p className='no_reco'>No recommendations yet.</p>
                )}
            </div>
        </section>
    );
}
