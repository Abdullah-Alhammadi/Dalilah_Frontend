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
                console.log('Fetched categories:', data); 
                setCategories(data);
            } catch (err) {
                console.error('Error fetching categories:', err);
            }
        }

        fetchCategories();
    }, [selectedCity, navigate]);

    function handleSelect(category) {
        onSelectCategory(category);
        navigate('/places');  
    }

    return (
        <section className="category-page">
            <h1>Select a Category in {selectedCity?.name}</h1>
            <div className="category-list">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="category-card"
                        onClick={() => handleSelect(category)}
                        style={{ border: '1px solid #ccc', padding: '1rem', cursor: 'pointer' }} // فقط لتجربة البصرية
                    >
                        <h2>
                            {category.name === 'Secret Places' && '😉 '}
                            {category.name}
                        </h2>
                    </div>
                ))}
            </div>
        </section>
    );
}
