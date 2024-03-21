import React from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  Fade,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { grey } from '@mui/material/colors';
import ConfirmationDialog from 'src/components/confirmation-dialog/confirmation-dialog';

export const StatsComponentView = ({
  anchorEl,
  open,
  handleClick,
  handleClose,
  isLoadingQrCount,
  qrCount,
  isOpenQrConfirmation,
  handleOpenCloseQrConfirmationDialog,
  isLoadingQrGenerate,
  handleGenerateQr,
  isLoadingWorkCount,
  workCount,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <Card elevation={2} sx={{ p: 2, height: 150 }}>
          <Stack direction="column" spacing={2}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <Typography variant="title" color={grey[700]}>
                Available QR Code Count
              </Typography>
              <Tooltip title="More Settings">
                <IconButton aria-haspopup="true" onClick={handleClick}>
                  <MoreVertIcon />
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'long-button',
                }}
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                TransitionComponent={Fade}
              >
                <MenuItem onClick={handleOpenCloseQrConfirmationDialog}>Generate</MenuItem>
              </Menu>
            </Stack>
            <Typography variant={isLoadingQrCount ? 'h6' : 'h2'}>
              {isLoadingQrCount ? 'Loading...' : qrCount}
            </Typography>
          </Stack>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card elevation={2} sx={{ p: 2, pt: 3, height: 150 }}>
          <Stack direction="column" spacing={2}>
            <Typography variant="title" color={grey[700]}>
              Today's Work Orders Count
            </Typography>
            <Typography variant={isLoadingWorkCount ? 'h6' : 'h2'}>
              {isLoadingWorkCount ? 'Loading...' : workCount}
            </Typography>
          </Stack>
        </Card>
      </Grid>
      {isOpenQrConfirmation && (
        <ConfirmationDialog
          open={isOpenQrConfirmation}
          contentText="Are you sure that you want to generate another batch of QR codes ?"
          handleClose={handleOpenCloseQrConfirmationDialog}
          isLoading={isLoadingQrGenerate}
          handleSubmit={handleGenerateQr}
        />
      )}
    </Grid>
  );
};

StatsComponentView.propTypes = {
  anchorEl: PropTypes.any,
  open: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  isLoadingQrCount: PropTypes.bool.isRequired,
  qrCount: PropTypes.any.isRequired,
  isOpenQrConfirmation: PropTypes.bool.isRequired,
  handleOpenCloseQrConfirmationDialog: PropTypes.func.isRequired,
  isLoadingQrGenerate: PropTypes.bool.isRequired,
  handleGenerateQr: PropTypes.func.isRequired,
  isLoadingWorkCount: PropTypes.bool.isRequired,
  workCount: PropTypes.any.isRequired,
};
