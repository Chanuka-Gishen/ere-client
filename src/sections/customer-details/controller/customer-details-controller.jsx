import React, { useState } from 'react';
import { CustomerDetailsView } from '../view/customer-details-view';
import { useParams } from 'react-router-dom';
import { useRouter } from 'src/routes/hooks';

const CustomerDetailsController = () => {
  const { id } = useParams();
  const router = useRouter();

  const [selectedUnit, setSelectedUnit] = useState(null);

  const handleSelectUnit = (unit) => {
    setSelectedUnit(unit === selectedUnit ? null : unit);
  };

  const handleOnClickBreadCrumb = (screen) => {
    router.replace(screen);
  };

  return (
    <CustomerDetailsView
      id={id}
      selectedUnit={selectedUnit}
      handleSelectUnit={handleSelectUnit}
      handleOnClickBreadCrumb={handleOnClickBreadCrumb}
    />
  );
};

export default CustomerDetailsController;
