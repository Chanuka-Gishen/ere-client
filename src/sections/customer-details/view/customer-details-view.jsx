import React from 'react';
import PropTypes from 'prop-types';

import {
  Avatar,
  Breadcrumbs,
  Button,
  Card,
  Chip,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  emphasize,
  styled,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Add } from '@mui/icons-material';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import DeleteIcon from '@mui/icons-material/Delete';
import { CustomerUnits } from '../components/customer-units-component';
import { CustomerDetailsComponent } from '../components/customer-details-component';

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

const CustomCell = ({ children, ...props }) => {
  return (
    <TableCell sx={{ borderBottom: 'none' }} {...props}>
      {children}
    </TableCell>
  );
};

export const CustomerDetailsView = ({ id, selectedUnit, handleSelectUnit }) => {
  return (
    <Container maxWidth={'xl'}>
      <Stack direction={'column'} spacing={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledBreadcrumb
            component="a"
            href="/customers"
            label="Customers"
            icon={<HomeIcon fontSize="small" />}
          />
          <StyledBreadcrumb component="a" href="#" label="Customer-Details" disabled />
        </Breadcrumbs>
        <Grid container spacing={2} alignItems={'start'} justifyContent={'space-between'}>
          <Grid item xs={12} md={6}>
            <GridItem>
              <CustomerDetailsComponent id={id} />
            </GridItem>
          </Grid>
          <Grid item xs={12} md={6}>
            <GridItem>
              <CustomerUnits
                id={id}
                handleSelectUnit={handleSelectUnit}
                selectedUnit={selectedUnit}
              />
            </GridItem>
          </Grid>
          {selectedUnit && (
            <Grid item xs={12} md={12}>
              <GridItem>
                <Stack
                  direction={'column'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  spacing={1}
                >
                  <Typography variant="h6">{`${selectedUnit.unitModel} - ${selectedUnit.unitSerialNo}`}</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Installed Date: {new Date(selectedUnit.unitInstalledDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Last Maintenance Date:{' '}
                    {new Date(selectedUnit.unitLastMaintenanceDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Next Maintenance Date:{' '}
                    {new Date(selectedUnit.unitNextMaintenanceDate).toLocaleDateString()}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color={selectedUnit.unitStatus === 'Active' ? 'success.main' : 'error'}
                  >
                    Status: {selectedUnit.unitStatus}
                  </Typography>
                </Stack>
              </GridItem>
            </Grid>
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
};
