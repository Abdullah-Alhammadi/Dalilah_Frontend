import './App.css';
import { Route, Routes } from 'react-router-dom';
import AboutPage from '../AboutPage';
import HomePage from '../HomePage';
import Navbar from "../../components/NavBar/NavBar";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
    </>
  );
}
