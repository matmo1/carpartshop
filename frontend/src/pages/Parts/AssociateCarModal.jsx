import { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const AssociateCarModal = ({ show, partId, onClose, onSuccess }) => {
  const [cars, setCars] = useState([]);
  const [selectedCarId, setSelectedCarId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (show) {
      setError(null);
      setLoading(true);
      axios.get('http://localhost:8080/cars/allCars')
        .then(res => setCars(res.data))
        .catch(err => {
          console.error('Error fetching cars:', err);
          setError('Failed to load cars');
        })
        .finally(() => setLoading(false));
    }
  }, [show]);

  const handleSubmit = () => {
    if (!selectedCarId) return;
    
    setLoading(true);
    setError(null);
    
    axios.post(`http://localhost:8080/parts/${partId}/cars/${selectedCarId}`)
      .then(() => {
        onSuccess();
        onClose();
      })
      .catch(err => {
        console.error('Error associating car:', err);
        setError('Failed to associate car');
      })
      .finally(() => setLoading(false));
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Car to Part</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger mb-3">{error}</div>}
        <Form.Group>
          <Form.Label>Select Car</Form.Label>
          <Form.Control
            as="select"
            value={selectedCarId}
            onChange={(e) => setSelectedCarId(e.target.value)}
            disabled={loading}
          >
            <option value="">Choose a car...</option>
            {cars.map(car => (
              <option key={car.id} value={car.id}>
                {car.brand} {car.model} ({car.year})
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSubmit}
          disabled={!selectedCarId || loading}
        >
          {loading ? 'Adding...' : 'Add Car'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AssociateCarModal;