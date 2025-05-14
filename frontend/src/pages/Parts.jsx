import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/ui/Card';
import CardContent from '../components/ui/CardContent';
import Button from '../components/ui/Button';

const Parts = () => {
  const [parts, setParts] = useState([]);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    purchasePrice: '',
    sellingPrice: ''
  });

  useEffect(() => {
    fetchParts();
  }, []);

  const fetchParts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/parts/allParts');
      setParts(response.data);
    } catch (error) {
      console.error('Error fetching parts:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/parts/addPart', {
        ...formData,
        purchasePrice: parseFloat(formData.purchasePrice),
        sellingPrice: parseFloat(formData.sellingPrice)
      });
      fetchParts();
      setFormData({ code: '', name: '', purchasePrice: '', sellingPrice: '' });
    } catch (error) {
      console.error('Error adding part:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/parts/deletePart/${id}`);
      fetchParts();
    } catch (error) {
      console.error('Error deleting part:', error);
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
              name="code"
              placeholder="Part Code"
              value={formData.code}
              onChange={(e) => setFormData({...formData, code: e.target.value})}
              required
            />
            <input
              className="w-full p-2 border rounded"
              type="text"
              name="name"
              placeholder="Part Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
            <input
              className="w-full p-2 border rounded"
              type="number"
              name="purchasePrice"
              placeholder="Purchase Price"
              value={formData.purchasePrice}
              onChange={(e) => setFormData({...formData, purchasePrice: e.target.value})}
              step="0.01"
              required
            />
            <input
              className="w-full p-2 border rounded"
              type="number"
              name="sellingPrice"
              placeholder="Selling Price"
              value={formData.sellingPrice}
              onChange={(e) => setFormData({...formData, sellingPrice: e.target.value})}
              step="0.01"
              required
            />
            <Button type="submit">Add Part</Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {parts.map(part => (
          <Card key={part.id}>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{part.name} ({part.code})</h3>
                  <p>Purchase: ${part.purchasePrice}</p>
                  <p>Selling: ${part.sellingPrice}</p>
                </div>
                <Button 
                  variant="destructive" 
                  onClick={() => handleDelete(part.id)}
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

export default Parts;