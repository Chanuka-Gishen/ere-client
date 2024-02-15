import React from 'react';
import PropTypes from 'prop-types';
import { Box, Chip, Container, Stack, Typography } from '@mui/material';
import { WORK_TYPE } from 'src/constants/common-constants';

export const UnitCreatedWork = ({ data }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };
  return (
    <>
      {data.length === 0 ? (
        <Container>
          <Typography align="center">No created jobs for this unit</Typography>
        </Container>
      ) : (
        <>
          {data
            .sort((a, b) => new Date(a.workOrderScheduledDate) - new Date(b.workOrderScheduledDate))
            .map((item, index) => (
              <Box key={index} sx={{ p: 2 }}>
                <Stack
                  direction={'row'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  sx={{ width: '100%' }}
                  spacing={2}
                >
                  <Typography>
                    {new Date(item.workOrderScheduledDate).toLocaleDateString({
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </Typography>
                  <Chip
                    color={
                      item.workOrderType === WORK_TYPE.SERVICE
                        ? 'success'
                        : item.workOrderType === WORK_TYPE.REPAIR
                          ? 'warning'
                          : 'info'
                    }
                    size="medium"
                    label={item.workOrderType}
                    sx={{ width: 100 }}
                  />
                </Stack>
              </Box>
            ))}
        </>
      )}
    </>
  );
};
