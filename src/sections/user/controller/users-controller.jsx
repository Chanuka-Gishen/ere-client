import React, { useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { UsersView } from '../view/users-view';

//---------------------------------------------------------

const validationSchema = Yup.object().shape({
  userName: Yup.string().required('User Name is required'),
  userRole: Yup.string().required('User role required'),
  userPassword: Yup.string()
    .required('Password is required')
    .min(4, 'Password must be at least 4 characters'),
  userConfirmPassword: Yup.string()
    .oneOf([Yup.ref('userPassword'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const UsersController = () => {
  const headerLables = ['Employee Name', 'Role'];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [employees, setEmployees] = useState([]);

  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      userName: '',
      userRole: '',
      userPassword: '',
      userConfirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      null;
    },
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    formik.resetForm();
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleSubmitAddUser = async () => {};

  return (
    <UsersView
      headerLables={headerLables}
      employees={employees}
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      open={open}
      handleOpen={handleOpen}
      handleClose={handleClose}
      formik={formik}
      handleSubmitAddUser={handleSubmitAddUser}
    />
  );
};

export default UsersController;
