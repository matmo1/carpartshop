import { useState, useEffect } from 'react';
import axios from 'axios';
import Input from '../components/ui/Input';
import Label from '../components/ui/Label';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: ''
  });

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

  return (
    <div className="container mt-4">
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title mb-4">Add New Car</h2>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-4">
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => setFormData({...formData, brand: e.target.value})}
                  required
                />
              </div>
              <div className="col-md-4">
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  value={formData.model}
                  onChange={(e) => setFormData({...formData, model: e.target.value})}
                  required
                />
              </div>
              <div className="col-md-4">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
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

      <h2 className="mb-3">Car Inventory</h2>
      {loading ? (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : cars.length === 0 ? (
        <div className="alert alert-info">No cars found. Add your first car!</div>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {cars.map(car => (
            <div key={car.id} className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{car.brand} {car.model}</h5>
                  <p className="card-text">Year: {car.year}</p>
                </div>
                <div className="card-footer">
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(car.id)}
                  >
                    Delete
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