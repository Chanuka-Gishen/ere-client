import React, { useState } from 'react';

import * as Yup from 'yup';

import { CustomerView } from '../view/customer-view';
import { useFormik } from 'formik';

// -----------------------------------------------------

const validationSchemaAddCust = Yup.object().shape({
  customerFullName: Yup.string().required('Full Name is required'),
  customerAddress: Yup.string().required('Address is required'),
  customerMobile: Yup.string().required('Mobile is required'),
  customerEmail: Yup.string().email('Invalid email format'),
  customerUnits: Yup.array().of(
    Yup.object().shape({
      unitBrand: Yup.string().required('Brand is required'),
      unitModel: Yup.string().required('Model is required'),
      unitInstallationDate: Yup.string().required('Installation Date is required'),
      unitNextMaintenanceDate: Yup.string().required('Next Maintenance Date is required'),
    })
  ),
});

const CustomerController = () => {
  const headerLabels = ['Customer name', 'Address', 'Mobile No', 'Email'];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openAddCust, setOpenAddCust] = useState(false);

  const formik = useFormik({
    initialValues: {
      customerFullName: '',
      customerAddress: '',
      customerMobile: '',
      customerEmail: '',
      customerUnits: [
        { unitBrand: '', unitModel: '', unitInstallationDate: '', unitNextMaintenanceDate: '' },
      ],
    },
    validationSchema: validationSchemaAddCust,
    onSubmit: (values) => {
      handleSubmitNewCust(values);
    },
  });

  const handleOpenAddCustomer = () => {
    setOpenAddCust(true);
  };

  const handleCloseAddCustomer = () => {
    setOpenAddCust(false);
    formik.resetForm();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleSubmitNewCust = async (values) => {
    formik.resetForm();
  };

  return (
    <CustomerView
      openAddCust={openAddCust}
      handleOpenAddCustomer={handleOpenAddCustomer}
      handleCloseAddCustomer={handleCloseAddCustomer}
      formik={formik}
      headerLabels={headerLabels}
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default CustomerController;
