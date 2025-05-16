import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/ui/SearchBar';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredCars = cars.filter(car => 
    car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.year.toString().includes(searchTerm)
  );

  return (
    <div className="container mt-4">
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4">Add New Car</h2>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-4">
                <label htmlFor="brand" className="form-label">Brand</label>
                <input
                  type="text"
                  className="form-control"
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => setFormData({...formData, brand: e.target.value})}
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="model" className="form-label">Model</label>
                <input
                  type="text"
                  className="form-control"
                  id="model"
                  value={formData.model}
                  onChange={(e) => setFormData({...formData, model: e.target.value})}
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="year" className="form-label">Year</label>
                <input
                  type="number"
                  className="form-control"
                  id="year"
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: e.target.value})}
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Add Car
            </button>
          </form>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <h2 className="mb-3 mb-md-0">Car Inventory</h2>
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
        <div className="alert alert-info">
          {cars.length === 0 
            ? "No cars found. Add your first car!" 
            : "No cars match your search."}
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredCars.map(car => (
            <div key={car.id} className="col">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">
                    {car.brand} {car.model}
                  </h5>
                  <div className="card-text">
                    <p className="mb-1"><strong>Year:</strong> {car.year}</p>
                  </div>
                </div>
                <div className="card-footer bg-transparent d-flex justify-content-end">
                  <button 
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(car.id)}
                  >
                    <i className="bi bi-trash"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cars;