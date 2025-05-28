import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import AssociateCarModal from './AssociateCarModal';

const PartDetails = () => {
  const { id } = useParams();
  const [part, setPart] = useState(null);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [partRes, carsRes] = await Promise.all([
          axios.get(`http://localhost:8080/parts/${id}`),
          axios.get(`http://localhost:8080/parts/${id}/cars`)
        ]);
        setPart(partRes.data);
        setCars(carsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="text-center my-5">Loading...</div>;
  if (!part) return <div className="alert alert-danger">Part not found</div>;

  return (
    <div className="container mt-4">
      <div className="card mb-4">
        <div className="card-body">
          <h2>{part.name} ({part.code})</h2>
          <div className="row mt-3">
            <div className="col-md-6">
              <p><strong>Purchase Price:</strong> ${part.purchasePrice.toFixed(2)}</p>
              <p><strong>Selling Price:</strong> ${part.sellingPrice.toFixed(2)}</p>
              <p className={part.sellingPrice - part.purchasePrice >= 0 ? 'text-success' : 'text-danger'}>
                <strong>Profit:</strong> ${Math.abs(part.sellingPrice - part.purchasePrice).toFixed(2)}
                {part.sellingPrice - part.purchasePrice >= 0 ? ' ↑' : ' ↓'}
              </p>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
            <h4>Compatible Cars</h4>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => setShowModal(true)}
            >
              Add Car
            </button>
          </div>

          {cars.length === 0 ? (
            <div className="alert alert-info">No cars assigned to this part</div>
          ) : (
            <div className="list-group">
              {cars.map(car => (
                <Link 
                  key={car.id}
                  to={`/cars/${car.id}`}
                  className="list-group-item list-group-item-action"
                >
                  {car.brand} {car.model} ({car.year})
                </Link>
              ))}
            </div>
          )}

          <Link to="/parts" className="btn btn-outline-primary mt-3">
            Back to Parts
          </Link>
        </div>
      </div>

      <AssociateCarModal 
        show={showModal}
        partId={id}
        onClose={() => setShowModal(false)}
        onSuccess={() => {
          setShowModal(false);
          axios.get(`http://localhost:8080/parts/${id}/cars`)
            .then(res => setCars(res.data))
            .catch(err => console.error(err));
        }}
      />
    </div>
  );
};

export default PartDetails;