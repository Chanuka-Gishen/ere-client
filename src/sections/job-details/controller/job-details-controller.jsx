import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useParams } from 'react-router-dom';
import { JobDetailsView } from '../view/job-details-view';

import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import responseUtil from 'src/utils/responseUtil';
import { useSnackbar } from 'notistack';
import { SNACKBAR_MESSAGE, SNACKBAR_VARIANT } from 'src/constants/snackbar-constants';
import { useRouter } from 'src/routes/hooks';

//---------------------------------------

const validationSchema = Yup.object().shape({
  workOrderInvoiceNumber: Yup.string(),
  workOrderScheduledDate: Yup.string().required('Next Service Date is required'),
});

const JobDetailsController = () => {
  const { jobId } = useParams();
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();
  const cancelToken = axios.CancelToken.source();

  const formik = useFormik({
    initialValues: {
      workOrderInvoiceNumber: '',
      workOrderScheduledDate: null,
    },
    validationSchema,
    onSubmit: () => {
      null;
    },
  });

  const [isLoading, setIsLoading] = useState(true);
  const [workOrder, setWorkOrder] = useState(null);

  const [employees, setEmployees] = useState([]);
  const [defaultEmployees, setDefaultEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [files, setFiles] = useState([]);
  const [deletedFiles, setDeletedFiles] = useState([]);
  const [totalTip, setTotalTip] = useState(0);

  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openCompleteDialog, setOpenCompleteDialog] = useState(false);
  const [openAssignDialog, setOpenAssignDialog] = useState(false);
  const [openAddTipDialog, setOpenAddTipDialog] = useState(false);

  const [isLoadingAssign, setIsLoadingAssign] = useState(false);
  const [isLoadingPhotoAdd, setIsLoadingPhotoAdd] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [isLoadingAddTip, setIsLoadingAddTip] = useState(false);
  const [isLoadingDeleteFiles, setIsLoadingDeleteFiles] = useState(false);

  const handleSelectEmployee = (employee) => {
    setSelectedEmployees(employee);
  };

  const handleSelectDeleteFile = (file) => {
    if (file) {
      setDeletedFiles((prevDeletedFiles) => [...prevDeletedFiles, file]);
    } else {
      setDeletedFiles([]);
    }
  };

  const handleOpenCloseUploadDialog = () => {
    setFiles([]);
    setOpenUploadDialog(!openUploadDialog);
  };

  const handleOpenCloseAssignDialog = () => {
    setOpenAssignDialog(!openAssignDialog);

    if (!openAssignDialog) {
      setSelectedEmployees([]);
    }
  };

  const handleOpenCloseUpdateDialog = () => {
    setOpenUpdateDialog(!openUpdateDialog);

    if (!openUpdateDialog) {
      formik.setFieldValue('workOrderScheduledDate', new Date(workOrder.workOrderScheduledDate));
      if (workOrder.workOrderInvoiceNumber) {
        formik.setFieldValue('workOrderInvoiceNumber', workOrder.workOrderInvoiceNumber);
      }
    }
  };

  const handleOpenCloseCompleteDialog = () => {
    setOpenCompleteDialog(!openCompleteDialog);
  };

  const handleOpenCloseAddTipDialog = () => {
    setOpenAddTipDialog(!openAddTipDialog);

    if (!openAddTipDialog) {
      setTotalTip(workOrder.workOrderEmployeeTip);
    }
  };

  const handleOnClickBreadCrumb = (screen) => {
    router.replace(screen);
  };

  const handleChangeTotalTip = (amount) => {
    setTotalTip(amount);
  };

  const handleUpdateEmployeeTip = async () => {
    if (totalTip > 0) {
      setIsLoadingAddTip(true);

      await backendAuthApi({
        url: BACKEND_API.WORK_ORDR_TIP,
        method: 'PUT',
        cancelToken: cancelToken.token,
        data: {
          id: workOrder._id,
          amount: totalTip,
        },
      })
        .then((res) => {
          const data = res.data;

          if (responseUtil.isResponseSuccess(data.responseCode)) {
            handleFetchWorkOrderDetails();
            handleOpenCloseAddTipDialog();
          }
        })
        .catch(() => {
          setIsLoadingAddTip(false);
        })
        .finally(() => {
          setIsLoadingAddTip(false);
        });
    }
  };

  const handleUploadImages = async () => {
    if (files.length !== 0) {
      setIsLoadingPhotoAdd(true);

      const formData = new FormData();

      files.forEach((file) => {
        formData.append('files', file.image);
      });

      await backendAuthApi({
        url: BACKEND_API.WORK_ORDR_UPLOAD + workOrder._id,
        method: 'POST',
        cancelToken: cancelToken.token,
        headers: {
          'Content-Type': 'multipart/form-data',
        },

        data: formData,
      })
        .then((res) => {
          const data = res.data;

          if (responseUtil.isResponseSuccess(data.responseCode)) {
            handleOpenCloseUploadDialog();
            handleFetchWorkOrderDetails();
          } else {
            enqueueSnackbar(data.responseMessage, {
              variant: responseUtil.findResponseType(data.responseCode),
            });
          }
        })
        .catch(() => {
          setIsLoadingPhotoAdd(false);
        })
        .finally(() => {
          setIsLoadingPhotoAdd(false);
        });
    }
  };

  const handleDeleteFiles = async () => {
    if (deletedFiles.length > 0) {
      setIsLoadingDeleteFiles(true);

      await backendAuthApi({
        url: BACKEND_API.WORK_ORDR_DELETE_IMAGES,
        method: 'DELETE',
        cancelToken: cancelToken.token,
        data: {
          workOrderId: workOrder._id,
          idList: deletedFiles,
        },
      })
        .then((res) => {
          const data = res.data;

          if (responseUtil.isResponseSuccess(data.responseCode)) {
            handleFetchWorkOrderDetails();
            setDeletedFiles([]);
          } else {
            enqueueSnackbar(data.responseMessage, {
              variant: responseUtil.findResponseType(data.responseCode),
            });
          }
        })
        .catch(() => {
          setIsLoadingDeleteFiles(false);
        })
        .finally(() => {
          setIsLoadingDeleteFiles(false);
        });
    }
  };

  const handleAssignEmployees = async () => {
    if (selectedEmployees.length != 0) {
      setIsLoadingAssign(true);

      await backendAuthApi({
        url: BACKEND_API.WORK_ORDR_ASSIGN,
        method: 'POST',
        cancelToken: cancelToken.token,
        data: {
          id: jobId,
          workOrderAssignedEmployees: selectedEmployees,
        },
      })
        .then((res) => {
          const data = res.data;

          if (responseUtil.isResponseSuccess(data.responseCode)) {
            handleFetchWorkOrderDetails();
          }
        })
        .finally(() => {
          handleOpenCloseAssignDialog();
          setIsLoadingAssign(false);
        });
    } else {
      enqueueSnackbar(SNACKBAR_MESSAGE.EMPTY_ASSIGNIES, { variant: SNACKBAR_VARIANT.WARNING });
    }
  };

  const handleUpadteWorkOrder = async () => {
    if (formik.isValid && formik.dirty) {
      setIsLoadingUpdate(true);

      await backendAuthApi({
        url: BACKEND_API.WORK_ORDR_UPDATE,
        method: 'PUT',
        cancelToken: cancelToken.token,
        data: {
          _id: workOrder._id,
          workOrderType: workOrder.workOrderType,
          workOrderStatus: workOrder.workOrderStatus,
          workOrderScheduledDate: formik.values.workOrderScheduledDate,
          workOrderInvoiceNumber: formik.values.workOrderInvoiceNumber
            ? formik.values.workOrderInvoiceNumber
            : null,
        },
      })
        .then((res) => {
          const data = res.data;

          if (responseUtil.isResponseSuccess(data.responseCode)) {
            handleFetchWorkOrderDetails();
          }
        })
        .finally(() => {
          setIsLoading(false);
          handleOpenCloseUpdateDialog();
        });
    } else {
      enqueueSnackbar(SNACKBAR_MESSAGE.FILL_REQUIRED_FIELDS, {
        variant: SNACKBAR_VARIANT.WARNING,
      });
    }
  };

  const handleFinishJob = async () => {
    setIsLoadingComplete(true);

    await backendAuthApi({
      url: BACKEND_API.WORK_ORDR_FINISH + workOrder._id,
      method: 'PUT',
      cancelToken: cancelToken.token,
    })
      .then((res) => {
        const data = res.data;

        if (responseUtil.isResponseSuccess(data.responseCode)) {
          handleFetchWorkOrderDetails();
        }
      })
      .finally(() => {
        setIsLoadingComplete(false);
        handleOpenCloseCompleteDialog();
      });
  };

  const handleFetchEmployeeList = async () => {
    await backendAuthApi({
      url: BACKEND_API.EMPLOYEE_SELECT,
      method: 'GET',
      cancelToken: cancelToken.token,
    }).then((res) => {
      const data = res.data;

      if (responseUtil.isResponseSuccess(data.responseCode)) {
        setEmployees(data.responseData);
      }
    });
  };

  const handleFetchWorkOrderDetails = async () => {
    setIsLoading(true);
    await backendAuthApi({
      url: BACKEND_API.WORK_ORDR + jobId,
      method: 'GET',
      cancelToken: cancelToken.token,
    })
      .then((res) => {
        const data = res.data;

        if (responseUtil.isResponseSuccess(data.responseCode)) {
          setWorkOrder(data.responseData);
          formik.setFieldValue(
            'workOrderScheduledDate',
            new Date(data.responseData.workOrderScheduledDate)
          );
          if (data.responseData.workOrderInvoiceNumber) {
            formik.setFieldValue(
              'workOrderInvoiceNumber',
              data.responseData.workOrderInvoiceNumber
                ? data.responseData.workOrderInvoiceNumber
                : ''
            );
          }

          const employees = data.responseData.workOrderAssignedEmployees.map(
            (assignedEmployee) => assignedEmployee.employee
          );

          setDefaultEmployees(employees);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    handleFetchWorkOrderDetails();
    handleFetchEmployeeList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <JobDetailsView
      jobId={jobId}
      isLoading={isLoading}
      isLoadingPhotoAdd={isLoadingPhotoAdd}
      workOrder={workOrder}
      files={files}
      setFiles={setFiles}
      deletedFiles={deletedFiles}
      handleSelectDeleteFile={handleSelectDeleteFile}
      handleOnClickBreadCrumb={handleOnClickBreadCrumb}
      openUploadDialog={openUploadDialog}
      handleOpenCloseUploadDialog={handleOpenCloseUploadDialog}
      handleUploadImages={handleUploadImages}
      openAssignDialog={openAssignDialog}
      employees={employees}
      defaultEmployees={defaultEmployees}
      handleOpenCloseAssignDialog={handleOpenCloseAssignDialog}
      handleSelectEmployee={handleSelectEmployee}
      isLoadingAssign={isLoadingAssign}
      handleAssignEmployees={handleAssignEmployees}
      formik={formik}
      isLoadingUpdate={isLoadingUpdate}
      openUpdateDialog={openUpdateDialog}
      handleOpenCloseUpdateDialog={handleOpenCloseUpdateDialog}
      handleUpadteWorkOrder={handleUpadteWorkOrder}
      openCompleteDialog={openCompleteDialog}
      handleOpenCloseCompleteDialog={handleOpenCloseCompleteDialog}
      handleFinishJob={handleFinishJob}
      isLoadingComplete={isLoadingComplete}
      openAddTipDialog={openAddTipDialog}
      handleOpenCloseAddTipDialog={handleOpenCloseAddTipDialog}
      totalTip={totalTip}
      isLoadingAddTip={isLoadingAddTip}
      handleChangeTotalTip={handleChangeTotalTip}
      handleUpdateEmployeeTip={handleUpdateEmployeeTip}
      isLoadingDeleteFiles={isLoadingDeleteFiles}
      handleDeleteFiles={handleDeleteFiles}
    />
  );
};

export default JobDetailsController;
