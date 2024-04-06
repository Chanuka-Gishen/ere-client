import { ITEM_CONSTANT_REDUX } from '../constant/itemConstant';

const initialState = {
  selectedUnit: null,
};

const itemReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ITEM_CONSTANT_REDUX.SELECT_CUSTOMER_UNIT:
      return {
        selectedUnit: payload,
      };
    default:
      return state;
  }
};

export default itemReducer;
