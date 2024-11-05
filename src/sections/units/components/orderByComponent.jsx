import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/material';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { UNIT_ORDER_BY } from 'src/constants/orderByConstants';

export const OrderByComponent = ({ filters, setFilters, handleSelect }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (orderType) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      orderBy: orderType,
    }));

    handleClose();
  };

  return (
    <Box>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="outlined"
        endIcon={<UnfoldMoreIcon />}
        onClick={handleClick}
      >
        Order By
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem
          onClick={() => handleChange(UNIT_ORDER_BY.DATE)}
          selected={filters.orderBy === UNIT_ORDER_BY.DATE ? true : false}
        >
          {UNIT_ORDER_BY.DATE}
        </MenuItem>
        <MenuItem
          onClick={() => handleChange(UNIT_ORDER_BY.QR_CODE)}
          selected={filters.orderBy === UNIT_ORDER_BY.QR_CODE ? true : false}
        >
          {UNIT_ORDER_BY.QR_CODE}
        </MenuItem>
      </Menu>
    </Box>
  );
};
