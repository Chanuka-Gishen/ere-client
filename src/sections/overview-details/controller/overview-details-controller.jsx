import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { OverviewDetailsView } from '../view/overview-details-view';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import responseUtil from 'src/utils/responseUtil';
import { useRouter } from 'src/routes/hooks';

const validationSchema = Yup.object().shape({
  unitSerialNo: Yup.string(),
});

const OverviewDetailsController = () => {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const cancelToken = axios.CancelToken.source();

  const [workOrder, setWorkOrder] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [isUnitUpdateOpen, setIsUnitUpdateOpen] = useState(false);
  const [isQrSelectOpen, setIsQrSelectOpen] = useState(false);
  const [isQrRemoveOpen, setisQrRemoveOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      unitSerialNo: '',
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      null;
    },
  });

  const handleOpenImageUploader = () => {
    setIsUploaderOpen(true);
  };

  const handleCloseImageUploader = () => {
    setSelectedFiles([]);
    setIsUploaderOpen(false);
  };

  const onClickBreadCrumb = (screen) => {
    router.replace(screen);
  };

  const handleOpenCloseUnitUpdateDialog = () => {
    setIsUnitUpdateOpen(!isUnitUpdateOpen);

    if (!isUnitUpdateOpen) {
      formik.setValues({ unitSerialNo: workOrder.workOrderUnitReference.unitSerialNo });
    } else {
      formik.resetForm();
    }
  };

  const handleOpenCloseSelectQrCode = () => {
    setIsQrSelectOpen(!isQrSelectOpen);
  };

  const handleOpenCloseRemoveQrCode = () => {
    setisQrRemoveOpen(!isQrRemoveOpen);
  };

  const handleUploadImages = async () => {
    if (selectedFiles.length !== 0) {
      setIsUploading(true);

      const formData = new FormData();

      selectedFiles.forEach((file) => {
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
            handleCloseImageUploader();
            handleFetchWorkOrderDetails();
          } else {
            enqueueSnackbar(data.responseMessage, {
              variant: responseUtil.findResponseType(data.responseCode),
            });
          }
        })
        .catch(() => {
          setIsUploading(false);
        })
        .finally(() => {
          setIsUploading(false);
        });
    }
  };

  const handleSubmitUnitUpdate = async () => {
    if (formik.isValid && formik.dirty) {
      setIsLoadingUpdate(true);
      await backendAuthApi({
        url: BACKEND_API.CUSTOMER_UNIT_DETAILS_UPDATE,
        method: 'PUT',
        cancelToken: cancelToken.token,
        data: {
          _id: workOrder.workOrderUnitReference._id,
          ...formik.values,
        },
      })
        .then((res) => {
          const data = res.data;

          if (responseUtil.isResponseSuccess(data.responseCode)) {
            handleFetchWorkOrderDetails();
            handleOpenCloseUnitUpdateDialog();
          }
        })
        .catch(() => {
          setIsLoadingUpdate(false);
        })
        .finally(() => {
          setIsLoadingUpdate(false);
        });
    }
  };

  const handleFetchWorkOrderDetails = async () => {
    setIsLoading(true);

    await backendAuthApi({
      url: BACKEND_API.WORK_ORDR + id,
      method: 'GET',
      cancelToken: cancelToken.token,
    })
      .then((res) => {
        const data = res.data;

        if (responseUtil.isResponseSuccess(data.responseCode)) {
          setWorkOrder(data.responseData);
        }
      })
      .catch(() => {
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    handleFetchWorkOrderDetails();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <OverviewDetailsView
      onClickBreadCrumb={onClickBreadCrumb}
      selectedFiles={selectedFiles}
      setSelectedFiles={setSelectedFiles}
      isUploaderOpen={isUploaderOpen}
      handleOpenImageUploader={handleOpenImageUploader}
      handleCloseImageUploader={handleCloseImageUploader}
      handleUploadImages={handleUploadImages}
      isLoading={isLoading}
      workOrder={workOrder}
      isUploading={isUploading}
      isLoadingUpdate={isLoadingUpdate}
      isUnitUpdateOpen={isUnitUpdateOpen}
      formik={formik}
      handleOpenCloseUnitUpdateDialog={handleOpenCloseUnitUpdateDialog}
      handleSubmitUnitUpdate={handleSubmitUnitUpdate}
      isQrSelectOpen={isQrSelectOpen}
      setIsQrSelectOpen={setIsQrSelectOpen}
      isQrRemoveOpen={isQrRemoveOpen}
      setisQrRemoveOpen={setisQrRemoveOpen}
      handleOpenCloseSelectQrCode={handleOpenCloseSelectQrCode}
      handleOpenCloseRemoveQrCode={handleOpenCloseRemoveQrCode}
      handleFetchWorkOrderDetails={handleFetchWorkOrderDetails}
    />
  );
};

export default OverviewDetailsController;
