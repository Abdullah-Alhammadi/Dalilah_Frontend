import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
                        <Link
                            to={`/places/${place.id}`}
                            key={place.id}
                            className="place-card-link"
                        >
                            <div className="place-card">
                                <div className="blob"></div>
                                <div className="bg">
                                    <h2>{place.name}</h2>
                                </div>
                                <div className="pin">📍</div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No places found in this category.</p>
                )}
            </div>
        </section>
    );
}
