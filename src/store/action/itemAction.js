import { ITEM_CONSTANT_REDUX } from '../constant/itemConstant';

const selectCustomerUnit = (payload) => {
  return {
    type: ITEM_CONSTANT_REDUX.SELECT_CUSTOMER_UNIT,
    payload,
  };
};

const itemAction = {
  selectCustomerUnit,
};

export default itemAction;
