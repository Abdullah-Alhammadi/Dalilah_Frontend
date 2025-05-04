import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import AboutPage from '../AboutPage';
import HomePage from '../HomePage';
import CityPage from '../CityPage';
import CategoryPage from '../CategoryPage';
import PlacesPage from '../PlacePage';
import Navbar from '../../components/NavBar/NavBar';
import AddPlacePage from '../AddPlacePage';
import YourRecommendationsPage from '../YourRecommendationsPage';
import PlaceDetailPage from '../PlaceDetailPage';
import EditPlacePage from '../EditPlacePage';



export default function App() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/explore"
            element={
              <CityPage onSelectCity={(city) => setSelectedCity(city)} />
            }
          />
          <Route
            path="/categories"
            element={
              <CategoryPage
                selectedCity={selectedCity}
                onSelectCategory={(category) =>
                  setSelectedCategory(category)
                }
              />
            }
          />
          <Route
            path="/places"
            element={
              <PlacesPage
                selectedCity={selectedCity}
                selectedCategory={selectedCategory}
              />
            }
          />
          <Route path="/places/add" element={<AddPlacePage />} />
          <Route path="/recommendations" element={<YourRecommendationsPage />} /> 
          <Route path="/places/:placeId" element={<PlaceDetailPage />} />
          <Route path="/places/edit/:placeId" element={<EditPlacePage />} />

        </Routes>
      </main>
    </>
  );
}
