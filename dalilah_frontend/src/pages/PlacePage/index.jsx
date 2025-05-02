import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPlacesByCityAndCategory } from '../../utilities/place-api';
import './styles.css';

export default function PlacesPage({ selectedCity, selectedCategory }) {
    const [places, setPlaces] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!selectedCity || !selectedCategory) {
            navigate('/explore'); 
            return;
        }

        async function fetchPlaces() {
            try {
                const data = await getPlacesByCityAndCategory(
                    selectedCity.id,
                    selectedCategory.id
                );
                setPlaces(data);
            } catch (err) {
                console.error('Error fetching places:', err);
            }
        }

        fetchPlaces();
    }, [selectedCity, selectedCategory, navigate]);

    return (
        <section className="places-page">
            <h1>
                Places in {selectedCity.name} - {selectedCategory.name}
            </h1>
            <div className="place-list">
                {places.length ? (
                    places.map((place) => (
                        <div key={place.id} className="place-card">
                            <h2>{place.name}</h2>
                            <p>{place.description}</p>
                            <p>
                                <strong>Location:</strong> {place.location}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No places found in this category.</p>
                )}
            </div>
        </section>
    );
}
