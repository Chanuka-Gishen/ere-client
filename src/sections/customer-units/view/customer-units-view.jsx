import {
  Alert,
  AlertTitle,
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Paper,
  Skeleton,
  Typography,
} from '@mui/material';
import QrCodeIcon from '@mui/icons-material/QrCode';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

import { fDate } from 'src/utils/format-time';

export const CustomerUnitsView = ({ units, isError, isLoading }) => {
  if (isError) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" variant="filled" sx={{ borderRadius: 2 }}>
          <AlertTitle>Error</AlertTitle>
          Failed to load customer units. Please try again later.
        </Alert>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Skeleton variant="text" width="60%" height={40} />
          <Skeleton variant="text" width="80%" height={60} />
        </Box>
        <Grid container spacing={3}>
          {[1, 2, 3].map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item}>
              <Skeleton variant="rounded" height={200} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  if (!units || units.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: 'center',
            bgcolor: '#f8f9fa',
            borderRadius: 2,
          }}
        >
          <AcUnitIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No Units Found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This customer hasn't registered any air conditioning units yet.
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          bgcolor: '#e3f2fd',
          borderRadius: 2,
          border: '1px solid #bbdefb',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <QrCodeIcon sx={{ fontSize: 40, color: '#1976d2' }} />
          <Box>
            <Typography variant="h6" color="#1976d2" gutterBottom>
              Scan QR Code for Unit Details
            </Typography>
            <Typography variant="body1" color="text.primary">
              For detailed information about your air conditioning units, please scan the QR code
              sticker provided on your AC unit.
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 500 }}>
        Your Air Conditioning Units ({units.length})
      </Typography>

      <Grid container spacing={3}>
        {units.map((unit, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Card
              elevation={2}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <CardHeader
                avatar={<AcUnitIcon sx={{ color: '#1976d2' }} />}
                title={
                  <Typography variant="h6" noWrap>
                    {unit.unitBrand} {unit.unitModel}
                  </Typography>
                }
                subheader={`Serial: ${unit.unitSerialNo || 'N/A'}`}
                sx={{
                  bgcolor: '#f5f5f5',
                  borderBottom: '1px solid #e0e0e0',
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarTodayIcon fontSize="small" sx={{ color: '#757575' }} />
                    <Typography variant="body2" color="text.secondary">
                      <strong>Installed:</strong>{' '}
                      {unit.unitInstalledDate ? fDate(unit.unitInstalledDate) : 'Not recorded'}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarTodayIcon fontSize="small" sx={{ color: '#757575' }} />
                    <Typography variant="body2" color="text.secondary">
                      <strong>Last Maintenance:</strong>{' '}
                      {unit.unitLastMaintenanceDate
                        ? fDate(unit.unitLastMaintenanceDate)
                        : 'Not recorded'}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarTodayIcon fontSize="small" sx={{ color: '#757575' }} />
                    <Typography variant="body2" color="text.secondary">
                      <strong>Next Maintenance:</strong>{' '}
                      {unit.unitNextMaintenanceDate
                        ? fDate(unit.unitNextMaintenanceDate)
                        : 'Not scheduled'}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ConfirmationNumberIcon fontSize="small" sx={{ color: '#4caf50' }} />
                    <Typography variant="body2" color="text.secondary">
                      <strong>QR Code:</strong>{' '}
                      {unit.unitQrCode ? unit.unitQrCode.qrCodeName : 'Not assigned'}
                    </Typography>
                  </Box>

                  {unit.unitQrCode && (
                    <Alert
                      severity="info"
                      sx={{ mt: 1, py: 0 }}
                      icon={<QrCodeIcon fontSize="small" />}
                    >
                      <Typography variant="caption">Scan QR code on AC for details</Typography>
                    </Alert>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {units.length > 0 && (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            For maintenance requests or inquiries, please contact us.
          </Typography>
        </Box>
      )}
    </Container>
  );
};
