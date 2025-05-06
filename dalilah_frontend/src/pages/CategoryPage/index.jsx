import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { index as getCategories } from '../../utilities/category-api';
import './styles.css';

export default function CategoryPage({ selectedCity, onSelectCategory }) {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!selectedCity) {
            navigate('/explore');
            return;
        }

        async function fetchCategories() {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (err) {
                console.error('Error fetching categories:', err);
            }
        }

        fetchCategories();
    }, [selectedCity, navigate]);

    function getIcon(name) {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('restaurant')) return '🍽️';
        if (lowerName.includes('culture')) return '🏛️';
        if (lowerName.includes('secret')) return '🕵️‍♂️';
        if (lowerName.includes('nature')) return '🌿';
        return '📍';
    }

    function handleSelect(category) {
        onSelectCategory(category);
        navigate('/places');
    }

    return (
        <section className="category-page-vertical">
            <h1>Select a Category in {selectedCity?.name}</h1>
            <div className="category-list-vertical">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className={`category-card-vertical ${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                        onClick={() => handleSelect(category)}
                    >
                        <span className="emoji">{getIcon(category.name)}</span>
                        <h2>{category.name}</h2>
                    </div>
                ))}
            </div>
        </section>
    );
}
