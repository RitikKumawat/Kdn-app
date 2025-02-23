import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {IMAGES} from '../../assets/images/index.images';
import {useGetProfileQuery} from '../../hooks/auth/useGetProfilequery';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import {updateUserData} from '../../app/reducers/user/user-reducer';
import {store} from '../../app/store';
import {login} from '../../app/reducers/login/login-reducer';

const SplashScreen = () => {
  const {data} = useGetProfileQuery();
  console.log('data', data);

  useEffect(() => {
    const fetchData = async () => {
      if (data?.status === 'success') {
        const token = await AsyncStorage.getItem(
          `${Config.REACT_APP_SECRET_KEY}`,
        );
        console.log('token', token);
        store.dispatch(updateUserData(data.data));
        store.dispatch(login(`${token}`));
      }
    };
    fetchData();
  }, [data?.data, data?.status]);

  return (
    <View style={styles.container}>
      <View style={styles.bottom}>
        <Image style={styles.img} source={IMAGES.logo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  img: {
    height: 200,
    width: 200,
  },
  bottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
