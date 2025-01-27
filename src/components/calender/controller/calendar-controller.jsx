import React, { useEffect, useState } from 'react';
import { CalendarView } from '../view/calendar-view';
import axios from 'axios';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import responseUtil from 'src/utils/responseUtil';

const CalendarController = () => {
  const cancelToken = axios.CancelToken.source();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const [data, setData] = useState([]);
  const [selectedDateData, setSelectedDateData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSelectedData, setIsLoadingSelectedData] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(new Date(date));
  };

  const handleMonthChange = (date) => {
    setSelectedMonth(new Date(date));
  };

  const fetchUnitsDetails = async () => {
    setIsLoadingSelectedData(true);

    const date = new Date(selectedDate);
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const isoDate = utcDate.toISOString().split('T')[0];

    await backendAuthApi({
      url: BACKEND_API.SELECTED_CALENDER_DATE_JOBS + isoDate,
      method: 'GET',
      cancelToken: cancelToken.token,
    })
      .then((res) => {
        const data = res.data.responseData;

        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setSelectedDateData(data);
        }
      })
      .catch(() => {
        setIsLoadingSelectedData(false);
      })
      .finally(() => {
        setIsLoadingSelectedData(false);
      });
  };

  const fetchNextMaintenanceDates = async () => {
    setIsLoading(true);

    const date = new Date(selectedMonth);
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const isoDate = utcDate.toISOString().split('T')[0];

    await backendAuthApi({
      url: BACKEND_API.CUSTOMER_UNITS_FOR_CALENDER,
      method: 'GET',
      cancelToken: cancelToken.token,
      params: {
        filteredMonth: isoDate,
      },
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          if (res.data.responseData) {
            setData(res.data.responseData);
          }
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
    fetchUnitsDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  useEffect(() => {
    fetchNextMaintenanceDates();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMonth]);

  return (
    <CalendarView
      handleDateChange={handleDateChange}
      handleMonthChange={handleMonthChange}
      isLoading={isLoading}
      data={data}
      selectedDate={selectedDate}
      selectedMonth={selectedMonth}
      selectedDateData={selectedDateData}
      isLoadingSelectedData={isLoadingSelectedData}
    />
  );
};
export default CalendarController;
