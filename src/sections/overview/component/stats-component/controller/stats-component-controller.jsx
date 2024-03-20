import React, { useEffect, useState } from 'react';
import { StatsComponentView } from '../view/stats-component-view';
import axios from 'axios';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import responseUtil from 'src/utils/responseUtil';
import { useSnackbar } from 'notistack';

const StatsComponentController = ({}) => {
  const { enqueueSnackbar } = useSnackbar();
  const cancelToken = axios.CancelToken.source();

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const [isOpenQrConfirmation, setIsOpenQrConfirmation] = useState(false);
  const [isLoadingQrCount, setIsLoadingQrCount] = useState(true);
  const [isLoadingQrGenerate, setIsLoadingQrGenerate] = useState(false);
  const [isLoadingWorkCount, setIsLoadingWorkCount] = useState(false);

  const [qrCount, setQrCount] = useState(0);
  const [workCount, setWorkCount] = useState(0);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenCloseQrConfirmationDialog = () => {
    setIsOpenQrConfirmation(!isOpenQrConfirmation);

    if (!isOpenQrConfirmation) {
      handleClose();
    }
  };

  const handleGenerateQr = async () => {
    setIsLoadingQrGenerate(true);

    await backendAuthApi({
      url: BACKEND_API.QR_CODE_GENERATE,
      method: 'GET',
      cancelToken: cancelToken.token,
    })
      .then((res) => {
        const data = res.data;

        if (responseUtil.isResponseSuccess(data.responseCode)) {
          handleFetchQrCount();
        }

        enqueueSnackbar(data.responseMessage, {
          variant: responseUtil.findResponseType(data.responseCode),
        });
      })
      .catch(() => {
        setIsLoadingQrGenerate(false);
      })
      .finally(() => {
        handleOpenCloseQrConfirmationDialog();
        setIsLoadingQrGenerate(false);
      });
  };

  const handleFetchQrCount = async () => {
    setIsLoadingQrCount(true);

    await backendAuthApi({
      url: BACKEND_API.QR_CODE_COUNT,
      method: 'GET',
      cancelToken: cancelToken.token,
    })
      .then((res) => {
        const data = res.data;

        if (responseUtil.isResponseSuccess(data.responseCode)) {
          setQrCount(data.responseData);
        }
      })
      .catch(() => {
        setIsLoadingQrCount(false);
      })
      .finally(() => {
        setIsLoadingQrCount(false);
      });
  };

  const handleFetchWorkCount = async () => {
    setIsLoadingWorkCount(true);

    await backendAuthApi({
      url: BACKEND_API.WORK_ORDR_TODAYS_COUNT,
      method: 'POST',
      cancelToken: cancelToken.token,
    })
      .then((res) => {
        const data = res.data;

        if (responseUtil.isResponseSuccess(data.responseCode)) {
          setWorkCount(data.responseData);
        }
      })
      .catch(() => {
        setIsLoadingWorkCount(false);
      })
      .finally(() => {
        setIsLoadingWorkCount(false);
      });
  };

  useEffect(() => {
    handleFetchQrCount();
    handleFetchWorkCount();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StatsComponentView
      anchorEl={anchorEl}
      open={open}
      handleClick={handleClick}
      handleClose={handleClose}
      isLoadingQrCount={isLoadingQrCount}
      qrCount={qrCount}
      isLoadingQrGenerate={isLoadingQrGenerate}
      handleGenerateQr={handleGenerateQr}
      isOpenQrConfirmation={isOpenQrConfirmation}
      handleOpenCloseQrConfirmationDialog={handleOpenCloseQrConfirmationDialog}
      isLoadingWorkCount={isLoadingWorkCount}
      workCount={workCount}
    />
  );
};

export default StatsComponentController;
