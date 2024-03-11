import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import PropTypes from 'prop-types';
import { CustomerWorkView } from '../view/customer-work-view';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import responseUtil from 'src/utils/responseUtil';
import { useRouter } from 'src/routes/hooks';
import { useSnackbar } from 'notistack';
import { SNACKBAR_MESSAGE, SNACKBAR_VARIANT } from 'src/constants/snackbar-constants';
import { WORK_TYPE } from 'src/constants/common-constants';

//------------------------------------------------------

const validationSchema = Yup.object().shape({
  workOrderScheduledDate: Yup.string().required('Scheduled Date is required'),
});

const CustomerWorkController = ({ id, selectedUnit, fetchUnitDetails }) => {
  const headerLabels = [
    'Word Order Id',
    'Company',
    'Scheduled Date',
    'Type',
    'Status',
    'Completed Date',
    'Invoice Number',
  ];

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const cancelToken = axios.CancelToken.source();

  const [workOrders, setWorkOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAddJob, setIsLoadingAddJob] = useState(false);

  const [isOpenAddJobDialog, setIsOpenAddJobDialog] = useState(false);

  const formik = useFormik({
    initialValues: {
      workOrderScheduledDate: new Date(),
    },
    validationSchema,
    onSubmit: () => {
      null;
    },
  });

  const handleRowClick = (jobId) => {
    router.push(`customers/details/job/${jobId}`);
  };

  const handleOpenCloseAddJobDialog = () => {
    setIsOpenAddJobDialog(!isOpenAddJobDialog);

    if (!isOpenAddJobDialog) {
      formik.resetForm();
    }
  };

  const handleAddJobDialog = async () => {
    if (formik.isValid && formik.dirty) {
      setIsLoadingAddJob(true);

      await backendAuthApi({
        url: BACKEND_API.WORK_ORDR_ADD,
        method: 'POST',
        cancelToken: cancelToken.token,
        data: {
          workOrderType: WORK_TYPE.REPAIR,
          workOrderUnit: selectedUnit._id,
          workOrderScheduledDate: formik.values.workOrderScheduledDate,
        },
      })
        .then((res) => {
          const data = res.data;

          if (responseUtil.isResponseSuccess(data.responseCode)) {
            handleFetchWorkOrders();
          }
        })
        .catch(() => {
          setIsLoadingAddJob(false);
        })
        .finally(() => {
          handleOpenCloseAddJobDialog();
          setIsLoadingAddJob(false);
        });
    } else {
      enqueueSnackbar(SNACKBAR_MESSAGE.FILL_REQUIRED_FIELDS, {
        variant: SNACKBAR_VARIANT.WARNING,
      });
    }
  };

  const handleFetchWorkOrders = async () => {
    setIsLoading(true);

    await backendAuthApi({
      url: BACKEND_API.WORK_ORDRS_BY_UNIT + selectedUnit._id,
      method: 'GET',
      cancelToken: cancelToken.token,
    })
      .then((res) => {
        const data = res.data;

        if (responseUtil.isResponseSuccess(data.responseCode)) {
          setWorkOrders(data.responseData);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    handleFetchWorkOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUnit]);

  return (
    <CustomerWorkView
      headerLabels={headerLabels}
      selectedUnit={selectedUnit}
      isLoading={isLoading}
      workOrders={workOrders}
      handleRowClick={handleRowClick}
      isOpenAddJobDialog={isOpenAddJobDialog}
      handleOpenCloseAddJobDialog={handleOpenCloseAddJobDialog}
      formik={formik}
      isLoadingAddJob={isLoadingAddJob}
      handleAddJobDialog={handleAddJobDialog}
    />
  );
};

export default CustomerWorkController;

CustomerWorkController.propTypes = {
  id: PropTypes.string.isRequired,
  selectedUnit: PropTypes.object.isRequired,
};
