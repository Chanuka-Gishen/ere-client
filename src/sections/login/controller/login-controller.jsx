import React from 'react';
import { LoginView } from '../view/login-view';
import { useDispatch } from 'react-redux';
import authAction from 'src/store/action/authAction';
import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';
import { useRouter } from 'src/routes/hooks';

const LoginController = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(authAction.updateLoginStatus());
    router.push(NAVIGATION_ROUTES.dashboard);
  };

  return <LoginView handleLogin={handleLogin} />;
};

export default LoginController;
