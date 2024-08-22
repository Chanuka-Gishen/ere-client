import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { CustomerDetailsView } from '../view/customer-details-view';
import { useRouter } from 'src/routes/hooks';
import itemAction from 'src/store/action/itemAction';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import responseUtil from 'src/utils/responseUtil';

const CustomerDetailsController = () => {
  const { id } = useParams();
  const router = useRouter();

  const sourceToken = axios.CancelToken.source();

  const dispatch = useDispatch();
  const item = useSelector((state) => state.item.unit);

  const [isLoadingUnit, setIsLoadingUnit] = useState(true);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedUnitId, setSelectedUnitId] = useState(null);

  const handleSelectUnitId = (unit) => {
    const isUnitSelected = unit._id === selectedUnitId;
    setSelectedUnitId(isUnitSelected ? null : unit._id);
    setSelectedUnit(isUnitSelected ? null : unit);

    dispatch(
      itemAction.selectCustomerUnit({
        selectedUnit: isUnitSelected ? null : unit._id,
        selectedJob: id,
      })
    );
  };

  const handleOnClickBreadCrumb = (screen) => {
    router.replace(screen);
  };

  useEffect(() => {
    const fetchUnit = async () => {
      if (selectedUnitId) {
        setIsLoadingUnit(true);
        await backendAuthApi({
          url: BACKEND_API.CUSTOMER_UNIT + selectedUnitId,
          method: 'GET',
          cancelToken: sourceToken.token,
        })
          .then((res) => {
            if (responseUtil.isResponseSuccess(res.data.responseCode)) {
              setSelectedUnit(res.data.responseData);
            }
          })
          .catch(() => {
            setIsLoadingUnit(false);
          })
          .finally(() => {
            setIsLoadingUnit(false);
          });
      }
    };

    if (item.selectedJob === id) {
      if (item.selectedUnit) {
        setSelectedUnitId(item.selectedUnit);
      }
    } else {
      dispatch(itemAction.selectCustomerUnit({ selectedUnit: null, selectedJob: id }));
    }

    if (selectedUnitId) {
      fetchUnit();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUnitId]);

  return (
    <CustomerDetailsView
      id={id}
      isLoadingUnit={isLoadingUnit}
      selectedUnit={selectedUnit}
      selectedUnitId={selectedUnitId}
      handleSelectUnit={handleSelectUnitId}
      handleOnClickBreadCrumb={handleOnClickBreadCrumb}
    />
  );
};

export default CustomerDetailsController;
