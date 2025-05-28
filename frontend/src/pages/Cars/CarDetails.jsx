import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import AssociatePartModal from './AssociatePartModal';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carRes, partsRes] = await Promise.all([
          axios.get(`http://localhost:8080/cars/${id}`),
          axios.get(`http://localhost:8080/cars/${id}/parts`)
        ]);
        setCar(carRes.data);
        setParts(partsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="text-center my-5">Loading...</div>;
  if (!car) return <div className="alert alert-danger">Car not found</div>;

  return (
    <div className="container mt-4">
      <div className="card mb-4">
        <div className="card-body">
          <h2>{car.brand} {car.model} ({car.year})</h2>
          
          <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
            <h4>Compatible Parts</h4>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => setShowModal(true)}
            >
              Add Part
            </button>
          </div>

          {parts.length === 0 ? (
            <div className="alert alert-info">No parts assigned to this car</div>
          ) : (
            <div className="list-group">
              {parts.map(part => (
                <Link 
                  key={part.id}
                  to={`/parts/${part.id}`}
                  className="list-group-item list-group-item-action"
                >
                  {part.name} ({part.code})
                </Link>
              ))}
            </div>
          )}

          <Link to="/cars" className="btn btn-outline-primary mt-3">
            Back to Cars
          </Link>
        </div>
      </div>

      <AssociatePartModal 
        show={showModal}
        carId={id}
        onClose={() => setShowModal(false)}
        onSuccess={() => {
          setShowModal(false);
          axios.get(`http://localhost:8080/cars/${id}/parts`)
            .then(res => setParts(res.data))
            .catch(err => console.error(err));
        }}
      />
    </div>
  );
};

export default CarDetails;