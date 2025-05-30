import { useState } from 'react';
import { Modal, Table, Button } from 'react-bootstrap';
import axios from 'axios';

const CarPartsModal = ({ show, onHide, parts, carId, onPartsRemoved }) => {
  const [selectedParts, setSelectedParts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = (partId) => {
    setSelectedParts(prev => 
      prev.includes(partId) 
        ? prev.filter(id => id !== partId) 
        : [...prev, partId]
    );
  };

  const handleRemoveParts = async () => {
    if (selectedParts.length === 0) return;
    
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8080/cars/${carId}/parts`, {
        data: selectedParts
      });
      onPartsRemoved();
      onHide();
    } catch (error) {
      console.error('Error removing parts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Parts for this Car</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {parts.length === 0 ? (
          <p>No parts assigned to this car</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th></th>
                <th>Code</th>
                <th>Name</th>
                <th>Purchase Price</th>
                <th>Selling Price</th>
              </tr>
            </thead>
            <tbody>
              {parts.map(part => (
                <tr key={part.id}>
                  <td>
                    <input 
                      type="checkbox"
                      checked={selectedParts.includes(part.id)}
                      onChange={() => handleCheckboxChange(part.id)}
                    />
                  </td>
                  <td>{part.code}</td>
                  <td>{part.name}</td>
                  <td>${part.purchasePrice.toFixed(2)}</td>
                  <td>${part.sellingPrice.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Modal.Body>
      <Modal.Footer>
        {parts.length > 0 && (
          <Button 
            variant="danger" 
            onClick={handleRemoveParts}
            disabled={selectedParts.length === 0 || loading}
          >
            {loading ? 'Removing...' : 'Remove Selected'}
          </Button>
        )}
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CarPartsModal;