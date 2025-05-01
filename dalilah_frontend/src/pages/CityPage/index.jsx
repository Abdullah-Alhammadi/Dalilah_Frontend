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
                console.log('Fetched cities:', data); 
                setCities(data);
            } catch (err) {
                console.error('Error fetching cities:', err);
            }
        }
        fetchCities();
    }, []);

    function handleCityClick(city) {
        console.log('Clicked city:', city); 
        onSelectCity(city); 
        navigate('/categories'); 
    }

    return (
        <section className="city-page">
            <h1>Select a City</h1>
            <div className="city-list">
                {cities.map((city) => (
                    <div
                        key={city.id}
                        className="city-card"
                        onClick={() => handleCityClick(city)}
                        style={{ border: '1px solid #ccc', padding: '1rem', cursor: 'pointer' }} // ✅ بس للتجربة
                    >
                        <h2>{city.name}</h2>
                        <p>{city.description.slice(0, 150)}...</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
