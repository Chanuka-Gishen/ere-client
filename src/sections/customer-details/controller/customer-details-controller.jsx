import React, { useState } from 'react';
import { CustomerDetailsView } from '../view/customer-details-view';
import { useParams } from 'react-router-dom';

const CustomerDetailsController = () => {
  const { id } = useParams();

  const headerLabels = [
    'Word Order Id',
    'Scheduled Date',
    'Status',
    'Completed Date',
    'Invoice Number',
  ];

  const [selectedUnit, setSelectedUnit] = useState(null);

  const handleSelectUnit = (unit) => {
    setSelectedUnit(unit === selectedUnit ? null : unit);
  };

  return (
    <CustomerDetailsView id={id} selectedUnit={selectedUnit} handleSelectUnit={handleSelectUnit} />
  );
};

export default CustomerDetailsController;
