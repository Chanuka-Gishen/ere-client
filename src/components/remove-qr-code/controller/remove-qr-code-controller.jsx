import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useSnackbar } from 'notistack';

import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import responseUtil from 'src/utils/responseUtil';
import ConfirmationDialog from 'src/components/confirmation-dialog/confirmation-dialog';

const RemoveQrCodeController = ({ unit, isOpen, setIsOpen, handleFetchWorkOrderDetails }) => {
  const { enqueueSnackbar } = useSnackbar();
  const cancelToken = axios.CancelToken.source();

  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleRemoveQrCode = async () => {
    setIsLoading(true);

    await backendAuthApi({
      url: BACKEND_API.CUSTOMER_UNIT_REMOVE_QR + unit._id,
      method: 'PUT',
      cancelToken: cancelToken.token,
    })
      .then((res) => {
        const data = res.data;

        if (responseUtil.isResponseSuccess(data.responseCode)) {
          enqueueSnackbar(data.responseMessage, {
            variant: responseUtil.findResponseType(data.responseCode),
          });
          handleFetchWorkOrderDetails();
          handleClose();
        }
      })
      .catch(() => {
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <ConfirmationDialog
      open={isOpen}
      contentText="Are you sure you want to unlink this QR Code from this unit?"
      handleClose={handleClose}
      isLoading={isLoading}
      handleSubmit={handleRemoveQrCode}
    />
  );
};

export default RemoveQrCodeController;

RemoveQrCodeController.PropTypes = {
  unit: PropTypes.object.isRequired,
};
