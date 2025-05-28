import { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const AssociatePartModal = ({ show, carId, onClose, onSuccess }) => {
  const [parts, setParts] = useState([]);
  const [selectedPartId, setSelectedPartId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (show) {
      setError(null);
      setLoading(true);
      axios.get('http://localhost:8080/parts/allParts')
        .then(res => setParts(res.data))
        .catch(err => {
          console.error('Error fetching parts:', err);
          setError('Failed to load parts');
        })
        .finally(() => setLoading(false));
    }
  }, [show]);

  const handleSubmit = () => {
    if (!selectedPartId) return;
    
    setLoading(true);
    setError(null);
    
    axios.post(`http://localhost:8080/cars/${carId}/parts/${selectedPartId}`)
      .then(() => {
        onSuccess();
        onClose();
      })
      .catch(err => {
        console.error('Error associating part:', err);
        setError('Failed to associate part');
      })
      .finally(() => setLoading(false));
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Part to Car</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger mb-3">{error}</div>}
        <Form.Group>
          <Form.Label>Select Part</Form.Label>
          <Form.Control
            as="select"
            value={selectedPartId}
            onChange={(e) => setSelectedPartId(e.target.value)}
            disabled={loading}
          >
            <option value="">Choose a part...</option>
            {parts.map(part => (
              <option key={part.id} value={part.id}>
                {part.name} ({part.code})
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
          disabled={!selectedPartId || loading}
        >
          {loading ? 'Adding...' : 'Add Part'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AssociatePartModal;