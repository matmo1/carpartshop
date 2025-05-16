import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/ui/SearchBar';

const Manufacturers = () => {
  const [manufacturers, setManufacturers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    address: '',
    phone: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchManufacturers();
  }, []);

  const fetchManufacturers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/manufacturers/allManufacturers');
      setManufacturers(response.data);
    } catch (error) {
      console.error('Error fetching manufacturers:', error);
    } finally {
      setLoading(false);
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
    if (!window.confirm('Are you sure you want to delete this manufacturer?')) return;
    try {
      await axios.delete(`http://localhost:8080/manufacturers/deleteManufacturer/${id}`);
      fetchManufacturers();
    } catch (error) {
      console.error('Error deleting manufacturer:', error);
    }
  };

  const filteredManufacturers = manufacturers.filter(manufacturer => 
    manufacturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (manufacturer.country && manufacturer.country.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (manufacturer.address && manufacturer.address.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (manufacturer.phone && manufacturer.phone.includes(searchTerm))
  );

  return (
    <div className="container mt-4">
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4">Add New Manufacturer</h2>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">Name*</label>
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
                <label htmlFor="country" className="form-label">Country</label>
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                />
              </div>
              <div className="col-12">
                <label htmlFor="address" className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Add Manufacturer
            </button>
          </form>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <h2 className="mb-3 mb-md-0">Manufacturers</h2>
        <div className="col-md-4">
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClear={() => setSearchTerm('')}
            placeholder="Search manufacturers..."
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : filteredManufacturers.length === 0 ? (
        <div className="alert alert-info">
          {manufacturers.length === 0 
            ? "No manufacturers found. Add your first manufacturer!" 
            : "No manufacturers match your search."}
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredManufacturers.map(manufacturer => (
            <div key={manufacturer.id} className="col">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-building me-2"></i>
                    {manufacturer.name}
                  </h5>
                  <div className="card-text">
                    {manufacturer.country && (
                      <p className="mb-1">
                        <i className="bi bi-globe me-2"></i>
                        {manufacturer.country}
                      </p>
                    )}
                    {manufacturer.address && (
                      <p className="mb-1">
                        <i className="bi bi-geo-alt me-2"></i>
                        {manufacturer.address}
                      </p>
                    )}
                    {manufacturer.phone && (
                      <p className="mb-0">
                        <i className="bi bi-telephone me-2"></i>
                        {manufacturer.phone}
                      </p>
                    )}
                  </div>
                </div>
                <div className="card-footer bg-transparent d-flex justify-content-end">
                  <button 
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(manufacturer.id)}
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

export default Manufacturers;