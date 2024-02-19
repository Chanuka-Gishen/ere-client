import React from 'react';
import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';

export const CurrencyInput = React.forwardRef(function CurrencyInput(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
      prefix="Rs. "
    />
  );
});

CurrencyInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
