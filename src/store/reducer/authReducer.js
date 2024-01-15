import { AUTH_CONSTANT_REDUX } from '../constant/authConstant';

const initialState = {
  isLoggedIn: false,
  user: {
    id: '',
    token: '',
    name: '',
    userName: '',
    userRole: '',
    userNewPwd: true,
  },
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_CONSTANT_REDUX.LOGIN_USER:
      return {
        isLoggedIn: false,
        user: {
          id: payload._id,
          token: payload.userToken,
          name: payload.userFullName,
          userName: payload.userName,
          userRole: payload.userRole,
          userNewPwd: payload.userNewPwd,
        },
      };
    case AUTH_CONSTANT_REDUX.LOGGED_IN_USER:
      return {
        isLoggedIn: true,
        user: state.user,
      };
    case AUTH_CONSTANT_REDUX.LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
