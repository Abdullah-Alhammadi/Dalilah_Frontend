import { useEffect, useState } from 'react';
import { index as getCities } from '../../utilities/city-api'; 
import './styles.css';

export default function CityPage({ onSelectCity }) {
    const [cities, setCities] = useState([]);

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

    return (
        <section className="city-page">
            <h1>Select a City</h1>
            <div className="city-list">
                {cities.map((city) => (
                    <div key={city.id} className="city-card" onClick={() => onSelectCity(city)}>
                        <h2>{city.name}</h2>
                        <p>{city.description.slice(0, 150)}...</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
