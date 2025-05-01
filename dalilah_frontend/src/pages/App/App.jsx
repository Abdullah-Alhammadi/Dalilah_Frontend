import './App.css';
import { Route, Routes } from 'react-router-dom';
import AboutPage from '../AboutPage';
import HomePage from '../HomePage';
import CityPage from '../CityPage'; 
import Navbar from '../../components/NavBar/NavBar';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/explore" element={<CityPage onSelectCity={(city) => console.log('Selected city:', city)} />} />
        </Routes>
      </main>
    </>
  );
}
