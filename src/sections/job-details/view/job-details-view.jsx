import React from 'react';
import PropTypes from 'prop-types';

import { emphasize, styled } from '@mui/material/styles';
import {
  Breadcrumbs,
  Button,
  Card,
  Chip,
  Collapse,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { ImageUpload } from 'src/components/upload';
import { account } from 'src/_mock/account';
import { Edit } from '@mui/icons-material';

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

export const JobDetailsView = ({
  selectedFiles,
  setSelectedFiles,
  isUploaderOpen,
  handleOpenImageUploader,
  handleCloseImageUploader,
  handleUploadImages,
  jobList,
  handleExpand,
  openedItem,
}) => {
  return (
    <Container maxWidth={'xl'}>
      <Stack direction={'column'} spacing={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledBreadcrumb
            component="a"
            href="/dashboard"
            label="Overview"
            icon={<HomeIcon fontSize="small" />}
          />
          <StyledBreadcrumb component="a" href="#" label="Job-Details" disabled />
        </Breadcrumbs>
        <Grid container spacing={2}>
          <Grid xs={12} md={6} style={{ margin: '10px' }}>
            <GridItem>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <CustomCell>Customer Name</CustomCell>
                      <CustomCell>{account.displayName}</CustomCell>
                    </TableRow>
                    <TableRow>
                      <CustomCell>Email</CustomCell>
                      <CustomCell>{account.email}</CustomCell>
                    </TableRow>
                    <TableRow>
                      <CustomCell> Mobile Number</CustomCell>
                      <CustomCell>{account.mobileNo}</CustomCell>
                    </TableRow>
                    <TableRow>
                      <CustomCell>Address</CustomCell>
                      <CustomCell>{account.address}</CustomCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </GridItem>
          </Grid>
          <Grid xs={12} md={5} style={{ margin: '10px' }}>
            <GridItem>Location</GridItem>
          </Grid>

          {jobList.map((job, index) => (
            <>
              <Grid xs={12} md={12} style={{ margin: '10px' }}>
                <GridItem>
                  <List component="div" disablePadding>
                    <ListItem key={index} onClick={() => handleExpand(index)}>
                      <ListItemText
                        primary={Date()}
                        secondary={<Typography>Customer: Mr. Silva, Employee: Sanath</Typography>}
                      />
                      <ExpandMoreIcon />
                    </ListItem>
                  </List>
                </GridItem>
              </Grid>
              {openedItem === index && (
                <>
                  <Grid xs={12} md={4} style={{ margin: '10px' }}>
                    <GridItem>
                      <TableContainer>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <CustomCell colSpan={2} component={'th'}>
                                Assignees
                              </CustomCell>
                            </TableRow>
                            <TableRow>
                              <CustomCell>Sajith</CustomCell>
                              <CustomCell align={'right'}>
                                <Chip label={'Technician'} color="primary" />
                              </CustomCell>
                            </TableRow>
                            <TableRow>
                              <CustomCell>Shan</CustomCell>
                              <CustomCell align={'right'}>
                                <Chip label={'Helper'} />
                              </CustomCell>
                            </TableRow>
                            <TableRow>
                              <CustomCell>Sunil</CustomCell>
                              <CustomCell align={'right'}>
                                <Chip label={'Helper'} />
                              </CustomCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </GridItem>
                  </Grid>
                  <Grid xs={12} md={4} sx={{ m: '10px' }}>
                    <GridItem>
                      <Stack direction="column" spacing={2}>
                        <FormControl>
                          <FormLabel id="demo-row-radio-buttons-group-label">
                            <Stack
                              direction={'row'}
                              alignItems={'center'}
                              justifyContent={'space-between'}
                            >
                              <Typography>Final inspection result</Typography>
                              <IconButton onClick={null}>
                                <Edit />
                              </IconButton>
                            </Stack>
                          </FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel value="PASS" control={<Radio />} label="Pass" />
                            <FormControlLabel value="FAIL" control={<Radio />} label="Fail" />
                          </RadioGroup>
                        </FormControl>
                        <Button
                          onClick={handleOpenImageUploader}
                          variant="contained"
                          color="secondary"
                        >
                          Upload images
                        </Button>
                      </Stack>
                    </GridItem>
                  </Grid>
                </>
              )}
            </>
          ))}
        </Grid>

        {isUploaderOpen && (
          <ImageUpload
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            isOpen={isUploaderOpen}
            handleClose={handleCloseImageUploader}
            handleSubmit={handleUploadImages}
          />
        )}
      </Stack>
    </Container>
  );
};

JobDetailsView.PropTypes = {
  selectedFiles: PropTypes.array.isRequired,
  setSelectedFiles: PropTypes.array.isRequired,
  isUploaderOpen: PropTypes.bool.isRequired,
  handleOpenImageUploader: PropTypes.func.isRequired,
  handleCloseImageUploader: PropTypes.func.isRequired,
  handleUploadImages: PropTypes.func.isRequired,
  jobList: PropTypes.array,
  handleExpand: PropTypes.func.isRequired,
};
