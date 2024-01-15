import React, { useEffect, useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { UsersView } from '../view/users-view';
import { USER_ROLE } from 'src/constants/user-role';
import axios from 'axios';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import responseUtil from 'src/utils/responseUtil';
import { useSnackbar } from 'notistack';
import { SNACKBAR_MESSAGE, SNACKBAR_VARIANT } from 'src/constants/snackbar-constants';

//---------------------------------------------------------

const validationSchema = Yup.object().shape({
  userFirstName: Yup.string().required('User first name is required'),
  userLastName: Yup.string().required('User last name is required'),
  userRole: Yup.string()
    .required('User role required')
    .oneOf([USER_ROLE.ADMIN, USER_ROLE.TECHNICIAN, USER_ROLE.HELPER], 'Invalid user role'),
});

const validationSchemaOnUpdate = Yup.object().shape({
  userFirstName: Yup.string().required('User first name is required'),
  userLastName: Yup.string().required('User last name is required'),
  userRole: Yup.string()
    .required('User role required')
    .oneOf([USER_ROLE.ADMIN, USER_ROLE.TECHNICIAN, USER_ROLE.HELPER], 'Invalid user role'),
});

const UsersController = () => {
  const headerLables = ['Employee Name', 'User name', 'Role', 'Status'];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openResetConfirmation, setOpenResetConfirmation] = useState(false);

  const [isLoadingRegister, setIsLoadingRegister] = useState(false);
  const [isLoadingFetch, setIsLoadingFectch] = useState(false); // change to true
  const [isLoadingUpdate, setIsLodingUpdate] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoadingReset, setIsLoadingReset] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const sourceToken = axios.CancelToken.source();

  const formik = useFormik({
    initialValues: {
      userFirstName: '',
      userLastName: '',
      userRole: '',
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      null;
    },
  });

  const updateFormik = useFormik({
    initialValues: {
      userFirstName: '',
      userLastName: '',
      userRole: '',
    },
    validationSchema: validationSchemaOnUpdate,
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

  const handleOpenEmployeeUpdateDialog = (employee) => {
    updateFormik.setValues({
      userFirstName: employee.userFullName.split(' ')[0],
      userLastName: employee.userFullName.split(' ')[1],
      userRole: employee.userRole,
    });
    setSelectedEmployee(employee);
    setOpenUpdate(true);
  };

  const handleCloseEmployeeUpdateDialog = () => {
    setOpenUpdate(false);
    setOpen(false);
    updateFormik.resetForm();
    setSelectedEmployee(null);
  };

  const handleOpenDeleteDialog = (employee) => {
    setSelectedEmployee(employee);
    setOpenDelete(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDelete(false);
    setOpen(false);
    setSelectedEmployee(null);
  };

  const handleOpenResetConfirmation = (employee) => {
    setSelectedEmployee(employee);
    setOpenResetConfirmation(true);
  };

  const handleCloseResetConfirmation = () => {
    setOpenResetConfirmation(false);
    setOpen(false);
    setSelectedEmployee(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleSubmitAddUser = async () => {
    if (formik.isValid && formik.dirty) {
      setIsLoadingRegister(true);

      await backendAuthApi({
        url: BACKEND_API.REGISTER,
        method: 'POST',
        cancelToken: sourceToken.token,
        data: formik.values,
      })
        .then((res) => {
          const data = res.data;

          enqueueSnackbar(data.responseMessage, {
            variant: responseUtil.findResponseType(data.responseCode),
          });
        })
        .finally(() => {
          setIsLoadingRegister(false);
          handleClose();
          handleFetchEmployees();
        });
    } else {
      enqueueSnackbar(SNACKBAR_MESSAGE.FILL_REQUIRED_FIELDS, {
        variant: SNACKBAR_VARIANT.WARNING,
      });
    }
  };

  const handleFetchEmployees = async () => {
    setIsLoadingFectch(true);

    await backendAuthApi({
      url: BACKEND_API.EMPLOYEES_ALL,
      method: 'GET',
      cancelToken: sourceToken.token,
    })
      .then((res) => {
        const data = res.data;

        if (responseUtil.isResponseSuccess(data.responseCode)) {
          if (data.responseData) {
            setEmployees(data.responseData);
          }
        }
      })
      .finally(() => {
        setIsLoadingFectch(false);
      });
  };

  const handleUpdateEmployee = async () => {
    if (updateFormik.isValid && updateFormik.dirty) {
      setIsLodingUpdate(true);

      await backendAuthApi({
        url: BACKEND_API.EMPLOYEE_UPDATE,
        method: 'PUT',
        cancelToken: sourceToken.token,
        data: {
          _id: selectedEmployee._id,
          ...updateFormik.values,
        },
      })
        .then((res) => {
          const data = res.data;

          enqueueSnackbar(data.responseMessage, {
            variant: responseUtil.findResponseType(data.responseCode),
          });
        })
        .finally(() => {
          setIsLodingUpdate(false);
          handleCloseEmployeeUpdateDialog();
          handleFetchEmployees();
        });
    } else {
      enqueueSnackbar(SNACKBAR_MESSAGE.FILL_REQUIRED_FIELDS, {
        variant: SNACKBAR_VARIANT.WARNING,
      });
    }
  };

  const handleDeleteEmployee = async () => {
    setIsLoadingDelete(true);

    await backendAuthApi({
      url: BACKEND_API.EMPLOYEE_DELETE + selectedEmployee._id,
      method: 'DELETE',
      cancelToken: sourceToken.token,
    })
      .then((res) => {
        const data = res.data;

        if (responseUtil.isResponseSuccess(data.responseCode)) {
          handleFetchEmployees();
        } else {
          enqueueSnackbar(data.responseMessage, {
            variant: responseUtil.findResponseType(data.responseCode),
          });
        }
      })
      .finally(() => {
        setIsLoadingDelete(false);
        handleCloseDeleteDialog();
      });
  };

  const handleResetPassword = async () => {
    setIsLoadingReset(true);
    console.log(selectedEmployee);
    await backendAuthApi({
      url: BACKEND_API.EMPLOYEES_RESET_PWD + selectedEmployee._id,
      method: 'PUT',
      cancelToken: sourceToken.token,
    })
      .then((res) => {
        const data = res.data;

        if (responseUtil.isResponseSuccess(data.responseCode)) {
          handleCloseResetConfirmation();
          handleFetchEmployees();
        } else {
          enqueueSnackbar(data.responseMessage, {
            variant: responseUtil.findResponseType(data.responseCode),
          });
        }
      })
      .catch(() => {
        setIsLoadingReset(false);
      })
      .finally(() => {
        setIsLoadingReset(false);
      });
  };

  useEffect(() => {
    handleFetchEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UsersView
      isLoadingFetch={isLoadingFetch}
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
      isLoadingRegister={isLoadingRegister}
      updateFormik={updateFormik}
      openUpdate={openUpdate}
      handleOpenEmployeeUpdateDialog={handleOpenEmployeeUpdateDialog}
      handleCloseEmployeeUpdateDialog={handleCloseEmployeeUpdateDialog}
      handleUpdateEmployee={handleUpdateEmployee}
      isLoadingUpdate={isLoadingUpdate}
      openDelete={openDelete}
      handleOpenDeleteDialog={handleOpenDeleteDialog}
      handleCloseDeleteDialog={handleCloseDeleteDialog}
      handleDeleteEmployee={handleDeleteEmployee}
      isLoadingDelete={isLoadingDelete}
      openResetConfirmation={openResetConfirmation}
      handleOpenResetConfirmation={handleOpenResetConfirmation}
      handleCloseResetConfirmation={handleCloseResetConfirmation}
      handleResetPassword={handleResetPassword}
      isLoadingReset={isLoadingReset}
    />
  );
};

export default UsersController;
