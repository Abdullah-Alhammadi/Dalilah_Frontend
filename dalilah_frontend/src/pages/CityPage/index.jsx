import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { index as getCities } from '../../utilities/city-api';
import riyadhImage from '../../assets/Riyadh_card.jpg';  
import abhaImage from '../../assets/Abha_card.jpg';  

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
            {cities.map((city) => {
                const isRiyadh = city.name.toLowerCase() === 'riyadh';
                const cardStyle = isRiyadh
                    ? { backgroundImage: `url(${riyadhImage})` }
                    : {backgroundImage: `url(${abhaImage})`}; 

                return (
                    <div
                        key={city.id}
                        className={`card ${isRiyadh ? 'riyadh-card' : 'abha-card'}`}
                        style={cardStyle}
                        onClick={() => handleCityClick(city)}
                    >
                        <div className="first-content">
                            <span>{city.name}</span>
                        </div>
                        <div className="second-content">
                            <p>{city.description}</p>
                        </div>
                    </div>
                );
            })}
        </section>
    );
}
