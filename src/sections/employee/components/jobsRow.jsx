import React from 'react';
import { TableCell, TableRow } from '@mui/material';

import { WORK_STATUS, WORK_TYPE } from 'src/constants/common-constants';
import commonUtil from 'src/utils/common-util';
import { fDate } from 'src/utils/format-time';
import Label from 'src/components/label';

const CustomCell = ({ children, ...props }) => {
  return (
    <TableCell sx={{ borderBottom: 'none' }} {...props}>
      {children}
    </TableCell>
  );
};

export const JobsRow = ({ item }) => {
  return (
    <TableRow hover>
      <CustomCell component={'th'}>{item.workOrderCode}</CustomCell>
      <CustomCell>{item.workOrderFrom}</CustomCell>
      <CustomCell sx={{ width: 200 }}>{item.workOrderCustomerId.customerName}</CustomCell>
      <CustomCell>
        {item.workOrderUnitReference.unitQrCode
          ? item.workOrderUnitReference.unitQrCode.qrCodeName
          : '-'}
      </CustomCell>
      <CustomCell
        sx={{
          color:
            commonUtil.calculateMonthDifference(item.workOrderScheduledDate) &&
            item.workOrderStatus === WORK_STATUS.CREATED
              ? 'red'
              : 'black',
        }}
      >
        {fDate(item.workOrderScheduledDate)}
      </CustomCell>
      <CustomCell>{fDate(item.workOrderCompletedDate)}</CustomCell>
      <CustomCell>
        <Label color={item.workOrderType === WORK_TYPE.SERVICE ? 'success' : 'warning'}>
          {item.workOrderType}
        </Label>
      </CustomCell>
      <CustomCell>
        <Label
          color={
            item.workOrderStatus === WORK_STATUS.CREATED
              ? 'default'
              : item.workOrderStatus === WORK_STATUS.COMPLETED
                ? 'success'
                : 'warning'
          }
        >
          {item.workOrderStatus}
        </Label>
      </CustomCell>
      <CustomCell>{item.workOrderEmployeeTip}</CustomCell>
      <CustomCell>{item.workOrderInvoice ? item.workOrderInvoice.invoiceNumber : '--'}</CustomCell>
    </TableRow>
  );
};
