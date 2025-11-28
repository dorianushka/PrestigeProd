// src/App.jsx
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  useParams,
} from 'react-router-dom';
import { useEffect } from 'react'; // Ajoutez cet import
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgress from './components/ScrollProgress';
import Particles from './components/Particles';
import Analytics from './components/Analytics';
import { useTranslation } from 'react-i18next';

// pages
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import Contact from './pages/Contact';
import SmiProject from './pages/SmiProject';
import PenthouseZurichProject from './pages/PenthouseZurichProject';
import WhyUs from './pages/WhyUs';
import Privacy from './pages/Privacy';

/* ---- composant fond ---- */
const Background = () => {
  const { pathname } = useLocation();
  if (pathname !== '/why-us') return null; // n’affiche rien ailleurs

  return (
    <div className='pointer-events-none fixed inset-0 -z-10 w-full h-full'>
      <Particles
        particleColors={['#ffffff', '#ffffff']}
        particleCount={200}
        particleSpread={10}
      />
    </div>
  );
};

const AppContent = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  return (
    <>
      <Analytics />
      <ScrollProgress />
      <Navbar />
      <Background />
      <main className='pt-[72px] lg:pt-[88px]'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='portfolio' element={<Portfolio />} />
        <Route path='services' element={<Services />} />
        <Route path='contact' element={<Contact />} />
        <Route path='why-us' element={<WhyUs />} />
        <Route path='privacy' element={<Privacy />} />
        <Route path='portfolio/smi' element={<SmiProject />} />
        <Route
          path='portfolio/penthouse-zurich'
          element={<PenthouseZurichProject />}
        />
      </Routes>
      </main>
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/:lang/*' element={<AppWithLanguage />} />
        <Route path='*' element={<Navigate to='/en' replace />} />
      </Routes>
    </BrowserRouter>
  );
};

const AppWithLanguage = () => {
  const { i18n } = useTranslation();
  const { lang } = useParams();

  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return <AppContent />;
};

export default App;
