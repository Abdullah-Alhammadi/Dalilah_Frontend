import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { index as getCities } from "../../utilities/city-api";
import { index as getCategories } from "../../utilities/category-api";
import { createPlace } from "../../utilities/place-api";
import "./styles.css";

export default function AddPlacePage() {
    const [cities, setCities] = useState([]);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        location: "",
        city: "",
        category: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const citiesData = await getCities();
                const categoriesData = await getCategories();
                setCities(citiesData);
                setCategories(categoriesData);
            } catch (err) {
                console.error("Error fetching cities or categories:", err);
            }
        }
        fetchData();
    }, []);

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            await createPlace(formData);
            navigate("/places");  
        } catch (err) {
            console.error("Error adding place:", err);
        }
    }

    return (
        <section className="add-place-page">
            <h1>Add a New Place</h1>
            <form onSubmit={handleSubmit} className="add-place-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Place Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Google Maps Link"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />

                <select name="city" value={formData.city} onChange={handleChange} required>
                    <option value="">Select a City</option>
                    {cities.map((city) => (
                        <option key={city.id} value={city.id}>
                            {city.name}
                        </option>
                    ))}
                </select>

                <select name="category" value={formData.category} onChange={handleChange} required>
                    <option value="">Select a Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <button type="submit">Add Place</button>
            </form>
        </section>
    );
}
