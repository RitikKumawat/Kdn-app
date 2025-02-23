import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import TabNavigator from './TabNavigator';
import AddCustomer from '../screens/add-customer/AddCustomer';
import CustomerDetails from '../screens/customer-details/CustomerDetails';
import CustomerTransactions from '../screens/customer-transactions/CustomerTransactions';

const Stack = createNativeStackNavigator();

const ProtectedNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="TabNavigator"
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      {/* Bottom Tabs (Dashboard & Home) */}
      <Stack.Screen name="TabNavigator" component={TabNavigator} />

      {/* Other Screens (Non-tab Screens) */}
      <Stack.Screen name="AddCustomer" component={AddCustomer} />
      <Stack.Screen name="CustomerDetails" component={CustomerDetails} />
      <Stack.Screen
        name="CustomerTransactions"
        component={CustomerTransactions}
      />
    </Stack.Navigator>
  );
};

export default ProtectedNavigation;
