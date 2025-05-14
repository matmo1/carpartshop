import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/ui/Card';
import CardContent from '../components/ui/CardContent';
import Button from '../components/ui/Button';

const Manufacturers = () => {
  const [manufacturers, setManufacturers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    address: '',
    phone: ''
  });

  useEffect(() => {
    fetchManufacturers();
  }, []);

  const fetchManufacturers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/manufacturers/allManufacturers');
      setManufacturers(response.data);
    } catch (error) {
      console.error('Error fetching manufacturers:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/manufacturers/addManufacturers', formData);
      fetchManufacturers();
      setFormData({ name: '', country: '', address: '', phone: '' });
    } catch (error) {
      console.error('Error adding manufacturer:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/manufacturers/deleteManufacturer/${id}`);
      fetchManufacturers();
    } catch (error) {
      console.error('Error deleting manufacturer:', error);
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
              name="name"
              placeholder="Manufacturer Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
            <input
              className="w-full p-2 border rounded"
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={(e) => setFormData({...formData, country: e.target.value})}
            />
            <input
              className="w-full p-2 border rounded"
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
            <input
              className="w-full p-2 border rounded"
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
            <Button type="submit">Add Manufacturer</Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {manufacturers.map(manufacturer => (
          <Card key={manufacturer.id}>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{manufacturer.name}</h3>
                  <p>Country: {manufacturer.country}</p>
                  <p>Address: {manufacturer.address}</p>
                  <p>Phone: {manufacturer.phone}</p>
                </div>
                <Button 
                  variant="destructive" 
                  onClick={() => handleDelete(manufacturer.id)}
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

export default Manufacturers;