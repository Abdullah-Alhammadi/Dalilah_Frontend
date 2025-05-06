import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { index as getCities } from '../../utilities/city-api';
import './styles.css';

export default function CityPage({ onSelectCity }) {
    const [cities, setCities] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCities() {
            try {
                const data = await getCities();
                setCities(data);
            } catch (err) {
                console.error('Error fetching cities:', err);
            }
        }
        fetchCities();
    }, []);

    function handleCityClick(city) {
        onSelectCity(city);
        navigate('/categories');
    }

    return (
        <section className="city-page-vertical">
            {cities.map((city) => (
                <div
                    key={city.id}
                    className={`card ${city.name.toLowerCase() === 'riyadh' ? 'riyadh-card' : 'abha-card'}`}
                    onClick={() => handleCityClick(city)}
                >
                    <div className="first-content">
                        <span>{city.name}</span>
                    </div>
                    <div className="second-content">
                        <p>{city.description}</p>
                    </div>
                </div>
            ))}
        </section>
    );
}
