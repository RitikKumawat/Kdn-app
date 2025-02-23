import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {store} from '../../app/store';
import {login} from '../../app/reducers/login/login-reducer';
import {useLoginMutation} from '../../hooks/auth/useLogin.mutation';
interface FormData {
  username: string;
  password: string;
}
const SignInScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const {mutateAsync} = useLoginMutation();
  const onSubmit = async (data: FormData) => {
    console.log('Form Data:', data);
    const res = await mutateAsync({
      username: data.username,
      password: data.password,
    });
    console.log('re', res);

    if (res.status === 'success') {
      console.log('Response', res.data);
      store.dispatch(login(res.data.token));
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.inputContainer}>
          <Text>Username</Text>
          <Controller
            control={control}
            name="username"
            rules={{
              required: 'Username is required',
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Enter Username"
                keyboardType="default"
                style={[styles.input, errors.username && styles.errorInput]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholderTextColor={'black'}
              />
            )}
          />
          {errors.username && (
            <Text style={styles.errorText}>{errors.username.message}</Text>
          )}
        </View>

        {/* Password Field */}
        <View style={styles.inputContainer}>
          <Text>Password</Text>
          <Controller
            control={control}
            name="password"
            rules={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Enter Password"
                secureTextEntry
                style={[styles.input, errors.password && styles.errorInput]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholderTextColor={'black'}
              />
            )}
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.btn} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.btnText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    color: 'black',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  btn: {
    backgroundColor: 'black',
    color: 'white',
    alignItems: 'center',
    padding: 12,
    borderRadius: 4,
  },
  btnText: {
    color: 'white',
    fontSize: 15,
  },
});

export default SignInScreen;
