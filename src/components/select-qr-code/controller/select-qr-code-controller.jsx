import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import { backendAuthApi } from 'src/axios/instance/backend-axios-instance.js';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import responseUtil from 'src/utils/responseUtil';
import { SelectQrCodeView } from '../view/select-qr-code-view';

const SelectQrCodeController = ({ isOpen, setIsOpen, unit, handleFetchWorkOrderDetails }) => {
  const cancelToken = axios.CancelToken.source();

  const [qrCodes, setQrCodes] = useState([]);
  const [selectedQrCodeValue, setSelectedQrCodeValue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAddQr, setIsLoadingAddQr] = useState(false);

  const handleSelectQrCode = (value) => {
    setSelectedQrCodeValue(value);
  };

  const handleOpenCloseSelectQrCode = () => {
    setIsOpen(!isOpen);

    if (!isOpen) {
      setSelectedQrCodeValue(null);
    }
  };

  const handleAddQrCode = async () => {
    if (selectedQrCodeValue) {
      setIsLoadingAddQr(true);

      await backendAuthApi({
        url: BACKEND_API.CUSTOMER_UNIT_ADD_QR,
        method: 'PUT',
        cancelToken: cancelToken.token,
        data: {
          unitId: unit._id,
          qrCodeName: selectedQrCodeValue,
        },
      })
        .then((res) => {
          const data = res.data;

          if (responseUtil.isResponseSuccess(data.responseCode)) {
            handleFetchWorkOrderDetails();
            handleOpenCloseSelectQrCode();
          }
        })
        .catch(() => {
          setIsLoadingAddQr(false);
        })
        .finally(() => {
          setIsLoadingAddQr(false);
        });
    }
  };

  const handleFetchAvailableQrCodes = async () => {
    setQrCodes([]);
    setIsLoading(true);
    await backendAuthApi({
      url: BACKEND_API.QR_CODE_AVAILABLES,
      method: 'GET',
      cancelToken: cancelToken.token,
    })
      .then((res) => {
        const data = res.data;

        if (responseUtil.isResponseSuccess(data.responseCode)) {
          setQrCodes(data.responseData);
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
    handleFetchAvailableQrCodes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SelectQrCodeView
      isOpen={isOpen}
      handleClose={handleOpenCloseSelectQrCode}
      isLoading={isLoading}
      isLoadingAddQr={isLoadingAddQr}
      handleSubmit={handleAddQrCode}
      codes={qrCodes}
      value={selectedQrCodeValue}
      handleSelect={handleSelectQrCode}
    />
  );
};

export default SelectQrCodeController;

SelectQrCodeController.PropTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  unit: PropTypes.object.isRequired,
  handleFetchWorkOrderDetails: PropTypes.func.isRequired,
};
