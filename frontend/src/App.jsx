import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Cars from './pages/Cars';
import Parts from './pages/Parts';
import Manufacturers from './pages/Manufacturers';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Cars />} />
          <Route path="cars" element={<Cars />} />
          <Route path="parts" element={<Parts />} />
          <Route path="manufacturers" element={<Manufacturers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;