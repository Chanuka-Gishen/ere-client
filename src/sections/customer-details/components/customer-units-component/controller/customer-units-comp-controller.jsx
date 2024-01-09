import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { CustomerUnitsComponentView } from '../view/customer-units-comp-view';
import { addMonths } from 'date-fns';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import axios from 'axios';
import responseUtil from 'src/utils/responseUtil';
import { UNIT_STATUS } from 'src/constants/common-constants';
import { useSnackbar } from 'notistack';
import { SNACKBAR_MESSAGE, SNACKBAR_VARIANT } from 'src/constants/snackbar-constants';

// -----------------------------------------------

const validationSchema = Yup.object().shape({
  unitModel: Yup.string().required('Model is required'),
  unitSerialNo: Yup.string().required('Serial number is required'),
  unitInstalledDate: Yup.string().required('Installation Date is required'),
  unitNextMaintenanceDate: Yup.string().required('Next Maintenance Date is required'),
});

const validationUpdateSchema = Yup.object().shape({
  unitModel: Yup.string().required('Model is required'),
  unitSerialNo: Yup.string().required('Serial number is required'),
  unitInstalledDate: Yup.string().required('Installation Date is required'),
  unitLastMaintenanceDate: Yup.string().required('Last Maintenance Date is required'),
  unitNextMaintenanceDate: Yup.string().required('Next Maintenance Date is required'),
  unitStatus: Yup.string()
    .required('Unit status required')
    .oneOf([UNIT_STATUS.ACTIVE, UNIT_STATUS.INACTIVE]),
});

const CustomerUnitsComponentController = ({ id, handleSelectUnit, selectedUnit }) => {
  const cancelToken = axios.CancelToken.source();
  const { enqueueSnackbar } = useSnackbar();

  const [isAdd, setIsAdd] = useState(true);
  const [open, setOpen] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const [units, setUnits] = useState([]);

  const formik = useFormik({
    initialValues: {
      unitModel: '',
      unitSerialNo: '',
      unitInstalledDate: new Date(),
      unitNextMaintenanceDate: addMonths(new Date(), 3),
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      null;
    },
  });

  const formikUpdateUnit = useFormik({
    initialValues: {
      unitModel: '',
      unitSerialNo: '',
      unitInstalledDate: new Date(),
      unitLastMaintenanceDate: addMonths(new Date(), 3),
      unitNextMaintenanceDate: addMonths(new Date(), 3),
      unitStatus: UNIT_STATUS.ACTIVE,
    },
    validationSchema: validationUpdateSchema,
    onSubmit: () => {
      null;
    },
  });

  const handleOpenMenu = (event, item) => {
    setSelectedItem(item);
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setSelectedItem(null);
    setOpen(null);
  };

  const handleOpenCloseAddDialog = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      formik.resetForm();
    } else {
      setIsAdd(true);
    }
  };

  const handleOpenUpdateDialog = () => {
    setIsOpen(!isOpen);
    setIsAdd(false);
    formikUpdateUnit.setValues({
      unitModel: selectedItem.unitModel,
      unitSerialNo: selectedItem.unitSerialNo,
      unitInstalledDate: new Date(selectedItem.unitInstalledDate),
      unitLastMaintenanceDate: new Date(selectedItem.unitLastMaintenanceDate),
      unitNextMaintenanceDate: new Date(selectedItem.unitNextMaintenanceDate),
      unitStatus: selectedItem.unitStatus,
    });
    if (!isOpen) {
      formik.resetForm();
    }
  };

  const handleInstallationDateChange = (date) => {
    formik.setFieldValue('unitInstalledDate', date);

    // Recalculate and update unitNextMaintenanceDate
    formik.setFieldValue('unitNextMaintenanceDate', addMonths(date, 3));
  };

  const handleLastMaintainenceDateChange = (date) => {
    formik.setFieldValue('unitLastMaintenanceDate', date);

    // Recalculate and update unitNextMaintenanceDate
    formik.setFieldValue('unitNextMaintenanceDate', addMonths(date, 3));
  };

  const handleSubmitAddUnit = async () => {
    if (formik.isValid && formik.dirty) {
      setIsLoadingAdd(true);

      await backendAuthApi({
        url: BACKEND_API.CUSTOMER_UNIT_ADD,
        method: 'POST',
        cancelToken: cancelToken.token,
        data: {
          customerId: id,
          ...formik.values,
        },
      })
        .then((res) => {
          const data = res.data;

          if (responseUtil.isResponseSuccess(data.responseCode)) {
            handleFetchCustomerUnits();
          } else {
            enqueueSnackbar(data.responseMessage, {
              variant: responseUtil.findResponseType(data.responseCode),
            });
          }
        })
        .finally(() => {
          setIsLoadingAdd(false);
          handleCloseMenu();
          handleOpenCloseAddDialog();
        });
    } else {
      enqueueSnackbar(SNACKBAR_MESSAGE.FILL_REQUIRED_FIELDS, {
        variant: SNACKBAR_VARIANT.WARNING,
      });
    }
  };

  const handleSubmitUpdateUnit = async () => {
    if (formikUpdateUnit.isValid && formikUpdateUnit.dirty) {
      setIsLoadingUpdate(true);

      await backendAuthApi({
        url: BACKEND_API.CUSTOMER_UNIT_UPDATE,
        method: 'PUT',
        cancelToken: cancelToken.token,
        data: {
          _id: selectedItem._id,
          ...formikUpdateUnit.values,
        },
      })
        .then((res) => {
          const data = res.data;

          if (responseUtil.isResponseSuccess(data.responseCode)) {
            handleFetchCustomerUnits();
          } else {
            enqueueSnackbar(data.responseMessage, {
              variant: responseUtil.findResponseType(data.responseCode),
            });
          }
        })
        .finally(() => {
          setIsLoadingUpdate(false);
          handleCloseMenu();
          handleOpenCloseAddDialog();
        });
    } else {
      enqueueSnackbar(SNACKBAR_MESSAGE.FILL_REQUIRED_FIELDS, {
        variant: SNACKBAR_VARIANT.WARNING,
      });
    }
  };

  const handleFetchCustomerUnits = async () => {
    setIsLoading(true);

    await backendAuthApi({
      url: BACKEND_API.CUSTOMER_UNITS + id,
      method: 'GET',
      cancelToken: cancelToken.token,
    })
      .then((res) => {
        const data = res.data;

        if (responseUtil.isResponseSuccess(data.responseCode)) {
          setUnits(data.responseData);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    handleFetchCustomerUnits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CustomerUnitsComponentView
      open={open}
      handleOpenMenu={handleOpenMenu}
      handleCloseMenu={handleCloseMenu}
      handleSelectUnit={handleSelectUnit}
      selectedUnit={selectedUnit}
      isAdd={isAdd}
      isLoading={isLoading}
      units={units}
      isOpen={isOpen}
      handleOpenCloseAddDialog={handleOpenCloseAddDialog}
      formik={formik}
      handleInstallationDateChange={handleInstallationDateChange}
      handleLastMaintainenceDateChange={handleLastMaintainenceDateChange}
      isLoadingAdd={isLoadingAdd}
      handleSubmitAddUnit={handleSubmitAddUnit}
      isLoadingUpdate={isLoadingUpdate}
      formikUpdateUnit={formikUpdateUnit}
      handleOpenUpdateDialog={handleOpenUpdateDialog}
      handleSubmitUpdateUnit={handleSubmitUpdateUnit}
    />
  );
};

export default CustomerUnitsComponentController;

CustomerUnitsComponentController.propTypes = {
  id: PropTypes.string.isRequired,
  handleSelectUnit: PropTypes.func.isRequired,
  selectedUnit: PropTypes.object,
};
