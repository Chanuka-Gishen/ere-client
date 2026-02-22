import React from 'react';
import PropTypes from 'prop-types';

import {
  Breadcrumbs,
  Card,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
  emphasize,
  styled,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { CustomerUnits } from '../components/customer-units-component';
import { CustomerDetailsComponent } from '../components/customer-details-component';
import { CustomerWorkOrders } from '../components/customer-work-component';
import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';
import { fDate } from 'src/utils/format-time';
import { CustomerLogsComponent } from '../components/customer-logs-component';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const GridItem = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export const CustomerDetailsView = ({
  id,
  customer,
  setCustomer,
  isLoadingUnit,
  selectedUnit,
  selectedUnitId,
  handleSelectUnit,
  handleOnClickBreadCrumb,
}) => {
  return (
    <Container maxWidth={'xl'}>
      <Stack direction={'column'} spacing={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledBreadcrumb
            onClick={() => handleOnClickBreadCrumb(NAVIGATION_ROUTES.customers)}
            label="Customers"
            icon={<HomeIcon fontSize="small" />}
          />
          <StyledBreadcrumb component="a" href="#" label="Customer-Details" disabled />
        </Breadcrumbs>
        <Grid container spacing={2} alignItems={'start'} justifyContent={'space-between'}>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <GridItem>
              <CustomerDetailsComponent
                id={id}
                customerInfo={customer}
                setCustomerInfo={setCustomer}
              />
            </GridItem>
          </Grid>
          {customer ? (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <CustomerLogsComponent customer={customer} />
            </Grid>
          ) : null}
          <Grid size={{ xs: 12, lg: 4 }}>
            <GridItem>
              <CustomerUnits
                id={id}
                handleSelectUnit={handleSelectUnit}
                selectedUnitId={selectedUnitId}
                selectedUnit={selectedUnit}
              />
            </GridItem>
          </Grid>
          {selectedUnit && (
            <>
              <Grid size={{ xs: 12, md: 12 }}>
                <GridItem>
                  {isLoadingUnit ? (
                    <Typography align="center">Loading unit info...</Typography>
                  ) : (
                    <Stack
                      direction={'column'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      spacing={1}
                    >
                      <Typography
                        variant="h6"
                        align="center"
                      >{`${selectedUnit.unitBrand} - ${selectedUnit.unitModel} - ${selectedUnit.unitSerialNo}`}</Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        Installed Date: {fDate(selectedUnit.unitInstalledDate)}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        Last Service Date: {fDate(selectedUnit.unitLastMaintenanceDate)}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        Next Service Date: {fDate(selectedUnit.unitNextMaintenanceDate)}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color={selectedUnit.unitStatus === 'Active' ? 'success.main' : 'error'}
                      >
                        Status: {selectedUnit.unitStatus}
                      </Typography>
                    </Stack>
                  )}
                </GridItem>
              </Grid>
              <Grid size={{ xs: 12, md: 12 }}>
                <CustomerWorkOrders
                  id={id}
                  isLoadingUnit={isLoadingUnit}
                  selectedUnit={selectedUnit}
                />
              </Grid>
            </>
          )}
        </Grid>
      </Stack>
    </Container>
  );
};

CustomerDetailsView.propTypes = {
  id: PropTypes.string.isRequired,
  selectedUnit: PropTypes.object,
  handleSelectUnit: PropTypes.func.isRequired,
  handleOnClickBreadCrumb: PropTypes.func.isRequired,
};
