import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../../components/ui/SearchBar';
import AssociateCarModal from './AssociateCarModal';

const Parts = () => {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    purchasePrice: '',
    sellingPrice: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null);

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

  const filteredParts = parts.filter(part => 
    part.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    part.purchasePrice.toString().includes(searchTerm) ||
    part.sellingPrice.toString().includes(searchTerm)
  );

  return (
    <div className="container mt-4">
      <div className="card mb-4 shadow-sm border-primary">
        <div className="card-body">
          <h2 className="card-title mb-4 text-primary">Add New Part</h2>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="code" className="form-label text-primary">Part Code</label>
                <input
                  type="text"
                  className="form-control border-primary"
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value})}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="name" className="form-label text-primary">Part Name</label>
                <input
                  type="text"
                  className="form-control border-primary"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="purchasePrice" className="form-label text-primary">Purchase Price ($)</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    className="form-control border-primary"
                    id="purchasePrice"
                    value={formData.purchasePrice}
                    onChange={(e) => setFormData({...formData, purchasePrice: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <label htmlFor="sellingPrice" className="form-label text-primary">Selling Price ($)</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    className="form-control border-primary"
                    id="sellingPrice"
                    value={formData.sellingPrice}
                    onChange={(e) => setFormData({...formData, sellingPrice: e.target.value})}
                    required
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-3 text-white">
              Add Part
            </button>
          </form>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <h2 className="mb-3 mb-md-0 text-primary">Parts Inventory</h2>
        <div className="col-md-4">
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClear={() => setSearchTerm('')}
            placeholder="Search parts..."
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : filteredParts.length === 0 ? (
        <div className="alert alert-primary">
          {parts.length === 0 
            ? "No parts found. Add your first part!" 
            : "No parts match your search."}
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="bg-primary text-white">
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th className="text-end">Purchase</th>
                <th className="text-end">Selling</th>
                <th className="text-end">Profit</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredParts.map(part => {
                const profit = part.sellingPrice - part.purchasePrice;
                const profitClass = profit >= 0 ? 'text-success' : 'text-danger';
                
                return (
                  <tr key={part.id}>
                    <td className="text-primary">{part.code}</td>
                    <td className="text-primary">{part.name}</td>
                    <td className="text-end text-primary">${part.purchasePrice.toFixed(2)}</td>
                    <td className="text-end text-primary">${part.sellingPrice.toFixed(2)}</td>
                    <td className={`text-end ${profitClass}`}>
                      ${Math.abs(profit).toFixed(2)} {profit >= 0 ? '↑' : '↓'}
                    </td>
                    <td className="text-end">
                      <button 
                        className="btn btn-outline-primary btn-sm me-2"
                        onClick={() => {
                          setSelectedPart(part.id);
                          setShowModal(true);
                        }}
                      >
                        <i className="bi bi-plus"></i> Add Cars
                      </button>
                      <button 
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(part.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <AssociateCarModal 
        show={showModal}
        partId={selectedPart}
        onClose={() => setShowModal(false)}
        onSuccess={() => {
          setShowModal(false);
          fetchParts();
        }}
      />
    </div>
  );
};

export default Parts;