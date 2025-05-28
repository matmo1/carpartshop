import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Cars from './pages/Cars/Cars';
import Parts from './pages/Parts/Parts';
import Manufacturers from './pages/Manufacturers';
import CarDetails from './pages/Cars/CarDetails';
import PartDetails from './pages/Parts/PartDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="cars" element={<Cars />} />
          <Route path="cars/:carId" element={<CarDetails />} />
          <Route path="parts" element={<Parts />} />
          <Route path="parts/:partId" element={<PartDetails />} />
          <Route path="manufacturers" element={<Manufacturers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;