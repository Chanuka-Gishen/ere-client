import React from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import {
  Avatar,
  Badge,
  Card,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { DayCalendarSkeleton, PickersDay } from '@mui/x-date-pickers';

import WorkIcon from '@mui/icons-material/Work';
import { fDate } from 'src/utils/format-time';

const ServerDay = (props) => {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  // Check if day is a Date object before accessing its properties
  const isSelected =
    !props.outsideCurrentMonth &&
    day instanceof Date &&
    highlightedDays.some((highlightedDay) => highlightedDay.toDateString() === day.toDateString());

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      color="success"
      badgeContent={isSelected ? ' ' : null}
      variant={isSelected ? 'dot' : 'standard'}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
};

export const CalendarView = ({
  handleDateChange,
  handleMonthChange,
  isLoading,
  data,
  selectedDate,
  selectedMonth,
  selectedDateData,
  isLoadingSelectedData,
}) => {
  // Filter the data for the selected month
  const filteredData = data.filter((item) => {
    const date = new Date(item.unitNextMaintenanceDate);
    return (
      date.getMonth() === selectedMonth.getMonth() &&
      date.getFullYear() === selectedMonth.getFullYear()
    );
  });

  const highlightedDays = filteredData.map((item) => new Date(item.unitNextMaintenanceDate));

  return (
    <Grid container spacing={2} alignItems="start" justifyContent="center">
      <Grid item xs={12} sm={6}>
        <Card>
          <DateCalendar
            loading={isLoading}
            onMonthChange={(value) => handleMonthChange(value)}
            onChange={(newValue) => handleDateChange(newValue)}
            renderLoading={() => <DayCalendarSkeleton />}
            slots={{
              day: ServerDay,
            }}
            slotProps={{
              day: {
                highlightedDays,
              },
            }}
          />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card sx={{ p: 2 }}>
          <Typography textAlign="center" fontWeight="bold">
            Units Due for Maintenance on {fDate(selectedDate)}
          </Typography>
          {isLoadingSelectedData && <Typography textAlign="center">Loading Data...</Typography>}
          {selectedDateData.length > 0 ? (
            <List sx={{ maxHeight: 308, overflow: 'auto' }}>
              {selectedDateData.map((item, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor: '#007d41',
                      }}
                    >
                      <WorkIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Stack direction={'row'} justifyContent={'space-between'}>
                        <Typography>{item.unitCustomerId.customerName}</Typography>
                        <Typography>{item.unitCustomerId.customerTel.mobile}</Typography>
                      </Stack>
                    }
                    secondary={
                      <Stack direction="column">
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {`${item.unitBrand} - ${item.unitModel} - ${item.unitSerialNo}`}
                        </Typography>
                        <Typography variant="body2" color="text.primary">
                          {item.unitQrCode ? `${item.unitQrCode.qrCodeName}` : 'QR not assigned'}
                        </Typography>
                      </Stack>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography textAlign="center" variant="body2">
              No units available
            </Typography>
          )}
        </Card>
      </Grid>
    </Grid>
  );
};
