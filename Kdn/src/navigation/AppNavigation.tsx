import React from 'react';
import {useAppSelector} from '../app/hooks';
import SplashScreen from '../screens/splashscreen/SplashScreen';
import SignInScreen from '../screens/signIn-screen/SignInScreen';
import ProtectedNavigation from './ProtectedNavigation';

const AppNavigation = () => {
  const status = useAppSelector(e => e.login.status);
  console.log('status', status);

  switch (status) {
    case 'authenticating':
      return <SplashScreen />;
    case 'logout':
      return <SignInScreen />;
    case 'loggedIn':
      return <ProtectedNavigation />;
    default:
      <SplashScreen />;
  }
};

export default AppNavigation;
