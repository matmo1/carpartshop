import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../../components/ui/SearchBar';
import AssociatePartModal from './AssociatePartModal';
import CarPartsModal from './CarPartsModal';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showAssociateModal, setShowAssociateModal] = useState(false);
  const [showPartsModal, setShowPartsModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [carParts, setCarParts] = useState([]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/cars/allCars');
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCarParts = async (carId) => {
    try {
      const response = await axios.get(`http://localhost:8080/cars/${carId}/parts`);
      setCarParts(response.data);
    } catch (error) {
      console.error('Error fetching car parts:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/cars/addCar', formData);
      fetchCars();
      setFormData({ brand: '', model: '', year: '' });
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this car?')) return;
    try {
      await axios.delete(`http://localhost:8080/cars/deleteCar/${id}`);
      fetchCars();
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  const handleShowParts = async (carId) => {
    setSelectedCar(carId);
    await fetchCarParts(carId);
    setShowPartsModal(true);
  };

  const filteredCars = cars.filter(car => 
    car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.year.toString().includes(searchTerm)
  );

  return (
    <div className="container mt-4">
      <div className="card mb-4 shadow-sm border-primary">
        <div className="card-body">
          <h2 className="card-title mb-4 text-primary">Add New Car</h2>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-4">
                <label htmlFor="brand" className="form-label text-primary">Brand</label>
                <input
                  type="text"
                  className="form-control border-primary"
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => setFormData({...formData, brand: e.target.value})}
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="model" className="form-label text-primary">Model</label>
                <input
                  type="text"
                  className="form-control border-primary"
                  id="model"
                  value={formData.model}
                  onChange={(e) => setFormData({...formData, model: e.target.value})}
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="year" className="form-label text-primary">Year</label>
                <input
                  type="number"
                  className="form-control border-primary"
                  id="year"
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: e.target.value})}
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-3 text-white">
              Add Car
            </button>
          </form>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <h2 className="mb-3 mb-md-0 text-primary">Car Inventory</h2>
        <div className="col-md-4">
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClear={() => setSearchTerm('')}
            placeholder="Search cars..."
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : filteredCars.length === 0 ? (
        <div className="alert alert-primary">
          {cars.length === 0 
            ? "No cars found. Add your first car!" 
            : "No cars match your search."}
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredCars.map(car => (
            <div key={car.id} className="col">
              <div className="card h-100 shadow-sm border-primary">
                <div className="card-body">
                  <h5 className="card-title text-primary">
                    {car.brand} {car.model}
                  </h5>
                  <div className="card-text">
                    <p className="mb-1"><strong className="text-primary">Year:</strong> {car.year}</p>
                  </div>
                </div>
                <div className="card-footer bg-transparent d-flex justify-content-between">
                  <div className="btn-group" role="group">
                    <button 
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => {
                        setSelectedCar(car.id);
                        setShowAssociateModal(true);
                      }}
                    >
                      <i className="bi bi-plus"></i> Add Parts
                    </button>
                    <button 
                      className="btn btn-outline-info btn-sm"
                      onClick={() => handleShowParts(car.id)}
                    >
                      <i className="bi bi-list"></i> View Parts
                    </button>
                  </div>
                  <button 
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(car.id)}
                  >
                    <i className="bi bi-trash"></i> Delete Car
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AssociatePartModal 
        show={showAssociateModal}
        carId={selectedCar}
        onClose={() => setShowAssociateModal(false)}
        onSuccess={() => {
          setShowAssociateModal(false);
          fetchCars();
        }}
      />

      <CarPartsModal
        show={showPartsModal}
        onHide={() => setShowPartsModal(false)}
        parts={carParts}
        carId={selectedCar}
        onPartsRemoved={() => fetchCarParts(selectedCar)}
      />
    </div>
  );
};

export default Cars;