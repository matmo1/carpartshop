import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/ui/Card';
import CardContent from '../components/ui/CardContent';
import Button from '../components/ui/Button';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: ''
  });

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get('http://localhost:8080/cars/allCars');
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
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
    try {
      await axios.delete(`http://localhost:8080/cars/deleteCar/${id}`);
      fetchCars();
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  return (
    <div>
      <Card className="mb-6">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              className="w-full p-2 border rounded"
              type="text"
              name="brand"
              placeholder="Car Brand"
              value={formData.brand}
              onChange={(e) => setFormData({...formData, brand: e.target.value})}
            />
            {/* Add other fields similarly */}
            <Button type="submit">Add Car</Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {cars.map(car => (
          <Card key={car.id}>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{car.brand} {car.model}</h3>
                  <p>Year: {car.year}</p>
                </div>
                <Button 
                  variant="destructive" 
                  onClick={() => handleDelete(car.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Cars;