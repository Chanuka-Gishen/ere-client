import PropTypes from 'prop-types';

import Toolbar from '@mui/material/Toolbar';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UnitSearchInput({ filterName, onFilterName }) {
  return (
    <OutlinedInput
      value={filterName}
      onChange={onFilterName}
      placeholder="Search serial no..."
      startAdornment={
        <InputAdornment position="start">
          <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
        </InputAdornment>
      }
    />
  );
}

UnitSearchInput.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};
