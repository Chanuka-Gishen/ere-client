import { ITEM_CONSTANT_REDUX } from '../constant/itemConstant';

const initialState = {
  unit: {
    selectedUnit: null,
    selectedJob: null,
  },
};

const itemReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ITEM_CONSTANT_REDUX.SELECT_CUSTOMER_UNIT:
      return {
        unit: {
          selectedUnit: payload.selectedUnit,
          selectedJob: payload.selectedJob,
        },
      };
    default:
      return state;
  }
};

export default itemReducer;
