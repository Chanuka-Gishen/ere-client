import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, AccordionSummary, Chip, Container, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';
import { WORK_TYPE } from 'src/constants/common-constants';

export const UnitCompletedWork = ({ data }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [expandedId, setExpandedId] = React.useState(null);

  const handleExpansion = (id) => {
    setExpanded(!expanded);
    setExpandedId(id);
  };
  return (
    <>
      {data.length === 0 ? (
        <Container>
          <Typography align="center">No completed jobs for this unit</Typography>
        </Container>
      ) : (
        <>
          {data
            .sort((a, b) => new Date(a.workOrderScheduledDate) - new Date(b.workOrderScheduledDate))
            .map((item, index) => (
              <Accordion
                key={index}
                expanded={expandedId === item._id && expanded}
                onChange={() => handleExpansion(item._id)}
                slots={{ transition: Fade }}
                slotProps={{ transition: { timeout: 400, unmountOnExit: true } }}
                sx={{
                  '& .MuiAccordion-region': { height: expanded ? 'auto' : 0 },
                  '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none' },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Stack
                    direction={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    sx={{ width: '100%', pr: 5 }}
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
                </AccordionSummary>
              </Accordion>
            ))}
        </>
      )}
    </>
  );
};
