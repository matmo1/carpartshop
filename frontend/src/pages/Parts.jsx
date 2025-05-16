import { useState, useEffect } from 'react';
import axios from 'axios';

const Parts = () => {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/parts/allParts');
      setParts(response.data);
    } catch (error) {
      console.error('Error fetching parts:', error);
    } finally {
      setLoading(false);
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
    if (!window.confirm('Are you sure you want to delete this part?')) return;
    try {
      await axios.delete(`http://localhost:8080/parts/deletePart/${id}`);
      fetchParts();
    } catch (error) {
      console.error('Error deleting part:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title mb-4">Add New Part</h2>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="code" className="form-label">Part Code</label>
                <input
                  type="text"
                  className="form-control"
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value})}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">Part Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="purchasePrice" className="form-label">Purchase Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="form-control"
                  id="purchasePrice"
                  value={formData.purchasePrice}
                  onChange={(e) => setFormData({...formData, purchasePrice: e.target.value})}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="sellingPrice" className="form-label">Selling Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="form-control"
                  id="sellingPrice"
                  value={formData.sellingPrice}
                  onChange={(e) => setFormData({...formData, sellingPrice: e.target.value})}
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Add Part
            </button>
          </form>
        </div>
      </div>

      <h2 className="mb-3">Parts Inventory</h2>
      {loading ? (
        <div className="text-center my-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : parts.length === 0 ? (
        <div className="alert alert-info">No parts found. Add your first part!</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th className="text-end">Purchase</th>
                <th className="text-end">Selling</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {parts.map(part => (
                <tr key={part.id}>
                  <td>{part.code}</td>
                  <td>{part.name}</td>
                  <td className="text-end">${part.purchasePrice.toFixed(2)}</td>
                  <td className="text-end">${part.sellingPrice.toFixed(2)}</td>
                  <td className="text-end">
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(part.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Parts;