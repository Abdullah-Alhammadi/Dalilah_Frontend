import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPlace, updatePlace } from '../../utilities/place-api';
import { index as getCities } from '../../utilities/city-api';
import { index as getCategories } from '../../utilities/category-api';
import './styles.css';

export default function EditPlacePage() {
    const { placeId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        location: '',
        city: '',
        category: '',
    });
    const [cities, setCities] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const place = await getPlace(placeId);
                setFormData({
                    name: place.name,
                    description: place.description,
                    location: place.location,
                    city: place.city,
                    category: place.category,
                });

                const citiesData = await getCities();
                const categoriesData = await getCategories();
                setCities(citiesData);
                setCategories(categoriesData);
            } catch (err) {
                console.error('Error loading data:', err);
            }
        }
        fetchData();
    }, [placeId]);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await updatePlace(formData, placeId);
            navigate('/recommendations');
        } catch (err) {
            console.error('Error updating place:', err);
        }
    }

    return (
        <section className="edit-place-page">
            <h1>Edit Place</h1>
            <form onSubmit={handleSubmit} className="form-container">
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>
                <label>
                    Description:
                    <textarea name="description" value={formData.description} onChange={handleChange} required />
                </label>
                <label>
                    Location:
                    <input type="text" name="location" value={formData.location} onChange={handleChange} required />
                </label>
                <label>
                    City:
                    <select name="city" value={formData.city} onChange={handleChange} required>
                        <option value="">Select a city</option>
                        {cities.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Category:
                    <select name="category" value={formData.category} onChange={handleChange} required>
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </label>
                <button type="submit" className="btn submit-btn">Update</button>
            </form>
        </section>
    );
}
