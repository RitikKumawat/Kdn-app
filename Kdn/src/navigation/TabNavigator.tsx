import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useAppSelector} from '../app/hooks';
import Dashboard from '../screens/dashboard/Dashboard';
import HomeScreen from '../screens/home/HomeScreen';
import {calculateResponsiveFontSize} from '../utils/calculateResonsiveFontSize';
import {Image, StyleSheet} from 'react-native';
import {ICONS} from '../assets/icons';
import {calculateResponsiveWidth} from '../utils/calculateResponsiveWidth';
import {calculateResponsiveHeight} from '../utils/calculateResponsiveHeight';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const role = useAppSelector(state => state.user?.user?.role);

  return (
    <Tab.Navigator
      initialRouteName={role === 'super-admin' ? 'Dashboard' : 'HomeScreen'}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: 'black',
          paddingBottom: 5,
          height: 60,
          position: 'absolute',
          zIndex: 100,
        },
        tabBarLabelStyle: {
          fontSize: calculateResponsiveFontSize(14),
          fontWeight: 'bold',
          color: 'white',
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#dad6d6',
      }}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused ? ICONS.dashboard_filled : ICONS.dashboard_outline
              }
              style={styles.icon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={focused ? ICONS.home_filled : ICONS.home_outlined}
              style={styles.icon}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  icon: {
    width: calculateResponsiveWidth(22),
    height: calculateResponsiveHeight(22),
  },
});
