const { ITEM_CONSTANT_REDUX } = require('../constant/itemConstant');

const selectCustomerUnit = (payload) => {
  return {
    type: ITEM_CONSTANT_REDUX.SELECT_CUSTOMER_UNIT,
    payload,
  };
};
