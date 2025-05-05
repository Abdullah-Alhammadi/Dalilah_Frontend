import './App.css';

import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';

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
import SignupPage from '../SignUpPage/SignUpPage';
import LoginPage from '../LoginPage/LoginPage';

import * as usersAPI from '../../utilities/users-api';

export default function App() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const currentUser = await usersAPI.getUser();
      setUser(currentUser);
    }
    loadUser();
  }, []);

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/explore"
            element={<CityPage onSelectCity={setSelectedCity} />}
          />
          <Route
            path="/categories"
            element={
              <CategoryPage
                selectedCity={selectedCity}
                onSelectCategory={setSelectedCategory}
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
          <Route path="/signup" element={<SignupPage setUser={setUser} />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
        </Routes>
      </main>
    </>
  );
}
