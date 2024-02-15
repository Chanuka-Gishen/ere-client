import React from 'react';
import { EmptyQrView } from '../component/empty-qr-view';
import {
  AppBar,
  Box,
  Card,
  Container,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
  styled,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { QrViewLoading } from '../component/qr-view-loading';
import commonUtil from 'src/utils/common-util';
import { UnitScheduledWork } from '../component/unit-scheduled-work';
import SwipeableViews from 'react-swipeable-views';
import { UnitCreatedWork } from '../component/unit-created-work';
import { UnitCompletedWork } from '../component/unit-completed';
import { WORK_STATUS } from 'src/constants/common-constants';
import Footer from 'src/components/footer/footer';

// ----------------------------------------------------------------------

const GridItem = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(5),
  color: theme.palette.text.secondary,
  border: '3px solid #2e1534',
}));

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    centered
  />
))({
  backgroundColor: '#2e1534',
  padding: 5,
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: '#635ee7',
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  color: 'rgba(255, 255, 255, 0.7)',
  '&.Mui-selected': {
    color: '#fff',
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
}));

export const CustomerUnitView = ({ isLoading, data }) => {
  const theme = useTheme();

  const workOrdersScheduled = data
    ? data.workOrders.filter((order) => order.workOrderStatus === WORK_STATUS.SCHEDULED)
    : [];

  const workOrdersCreated = data
    ? data.workOrders.filter((order) => order.workOrderStatus === WORK_STATUS.CREATED)
    : [];

  const workOrdersCompleted = data
    ? data.workOrders.filter((order) => order.workOrderStatus === WORK_STATUS.COMPLETED)
    : [];

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const a11yProps = (index) => {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  };

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ mt: 3 }}>{children}</Box>}
      </div>
    );
  };

  return (
    <Container>
      {isLoading ? (
        <QrViewLoading />
      ) : (
        <>
          {commonUtil.isUndefinedOrNull(data) ? (
            <EmptyQrView />
          ) : (
            <Grid container spacing={2} sx={{ p: 1 }}>
              <Grid item xs={12} md={12}>
                <GridItem>
                  <Stack
                    direction={'column'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    spacing={1}
                  >
                    <Typography
                      variant="h6"
                      align="center"
                    >{`${data.unit.unitBrand} - ${data.unit.unitModel} - ${data.unit.unitSerialNo}`}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      Installed Date: {new Date(data.unit.unitInstalledDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      Last Maintenance Date:{' '}
                      {new Date(data.unit.unitLastMaintenanceDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      Next Maintenance Date:{' '}
                      {new Date(data.unit.unitNextMaintenanceDate).toLocaleDateString()}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color={data.unit.unitStatus === 'Active' ? 'success.main' : 'error'}
                    >
                      Status: {data.unit.unitStatus}
                    </Typography>
                  </Stack>
                </GridItem>
              </Grid>
              <Grid item xs={12} md={12}>
                <Box sx={{ width: '100%' }}>
                  <AppBar position="static">
                    <StyledTabs value={value} onChange={handleChange} variant="fullWidth">
                      <StyledTab label="Scheduled" {...a11yProps(0)} />
                      <StyledTab label="Created" {...a11yProps(1)} />
                      <StyledTab label="Completed" {...a11yProps(2)} />
                    </StyledTabs>
                  </AppBar>
                  <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                  >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                      <UnitScheduledWork data={workOrdersScheduled} />
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                      <UnitCreatedWork data={workOrdersCreated} />
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                      <UnitCompletedWork data={workOrdersCompleted} />
                    </TabPanel>
                  </SwipeableViews>
                </Box>
              </Grid>
            </Grid>
          )}
        </>
      )}
    </Container>
  );
};
