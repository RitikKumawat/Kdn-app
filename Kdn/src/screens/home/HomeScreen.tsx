import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useAppDispatch} from '../../app/hooks';
import {logout} from '../../app/reducers/login/login-reducer';
import {IMAGES} from '../../assets/images/index.images';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import CustomerList from '../../components/CustomerList';
const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    dispatch(logout());
  };
  const navigator =
    useNavigation<NativeStackNavigationProp<TProtectedNavigation>>();
  const addNewCustomer = () => {
    navigator.push('AddCustomer');
  };
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <TouchableOpacity style={styles.btn} onPress={addNewCustomer}>
          <Text style={styles.txt}>ADD NEW CUSTOMER</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Image style={styles.img} source={IMAGES.logout} />
        </TouchableOpacity>
      </View>
      <CustomerList />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: 30,
    height: 30,
  },
  logoContainer: {
    flexDirection: 'row',
    padding: 14,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: 'black',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
  },
  txt: {
    color: 'white',
  },
});
