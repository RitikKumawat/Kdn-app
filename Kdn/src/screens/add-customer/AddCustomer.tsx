import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {IMAGES} from '../../assets/images/index.images';
import {useAddCustomerMutation} from '../../hooks/customer/useAddCustomer.mutation';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import DocumentPicker from 'react-native-document-picker';
import {useUploadCustomers} from '../../hooks/customer/useUploadCustomers.mutation';
import {io} from 'socket.io-client';
import Config from 'react-native-config';

// Define the type for the form data
type FormData = {
  firstName: string;
  lastName: string;
  contactNumber: string;
  address: string;
};

const AddCustomer = () => {
  const [progress, setProgress] = useState(0);
  const navigator =
    useNavigation<NativeStackNavigationProp<TProtectedNavigation>>();
  const [disabledExcel, setDisabled] = useState(false);
  useEffect(() => {
    const socket = io(Config.REACT_APP_BASE_URL);

    socket.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    // Remove the disabledExcel condition since we want to track progress regardless
    socket.on('progress-socketToken', data => {
      setProgress(data.percentage);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<FormData>();
  const {mutateAsync, isPending} = useAddCustomerMutation();

  const {mutateAsync: uploadCustomers, isPending: uploading} =
    useUploadCustomers();
  const handleExcelUpload = async () => {
    try {
      setDisabled(true);
      setProgress(0.1);
      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      const formData = new FormData();
      formData.append('uploadFile', {
        uri: file[0].uri,
        type: file[0].type,
        name: file[0].name,
      });

      const res = await uploadCustomers(formData);
      if (res.status === 'success') {
        Alert.alert('Success', 'File uploaded successfully!');
      } else {
        Alert.alert('Error', 'Failed to upload the file.');
      }
    } catch (error) {
      console.error('Error uploading Excel file:', error);
      Alert.alert('Error', 'Failed to process the file.');
    } finally {
      // Reset both states in finally block
      setProgress(0);
      setDisabled(false);
    }
  };

  const submitHandler = handleSubmit(async data => {
    try {
      const res = await mutateAsync(data);
      if (res.status === 'success') {
        Alert.alert('Success', 'Customer details submitted successfully!');
        navigator.navigate('HomeScreen');
        reset();
      } else {
        Alert.alert('Something went wrong');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error occurred during submission');
    }
  });

  return (
    <KeyboardAvoidingView
      // style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        // contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Text style={styles.heading}>Add Customer</Text>

          <Text style={styles.label}>First Name</Text>
          <Controller
            name="firstName"
            control={control}
            rules={{required: 'First name is required'}}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={[styles.input, errors.firstName && styles.errorInput]}
                placeholder="First Name"
                placeholderTextColor={'black'}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.firstName && (
            <Text style={styles.errorText}>
              {String(errors.firstName.message)}
            </Text>
          )}

          <Text style={styles.label}>Last Name</Text>
          <Controller
            name="lastName"
            control={control}
            rules={{required: 'Last name is required'}}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={[styles.input, errors.lastName && styles.errorInput]}
                placeholder="Last Name"
                placeholderTextColor={'black'}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.lastName && (
            <Text style={styles.errorText}>
              {String(errors.lastName.message)}
            </Text>
          )}

          <Text style={styles.label}>Contact Number</Text>
          <Controller
            name="contactNumber"
            control={control}
            rules={{
              required: 'Contact number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Contact number must be 10 digits',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={[
                  styles.input,
                  errors.contactNumber && styles.errorInput,
                ]}
                placeholder="Contact Number"
                placeholderTextColor={'black'}
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.contactNumber && (
            <Text style={styles.errorText}>
              {String(errors.contactNumber.message)}
            </Text>
          )}

          <Text style={styles.label}>Address</Text>
          <Controller
            name="address"
            control={control}
            rules={{required: 'Address is required'}}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={[styles.input, errors.address && styles.errorInput]}
                placeholder="Address"
                placeholderTextColor={'black'}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.address && (
            <Text style={styles.errorText}>
              {String(errors.address.message)}
            </Text>
          )}

          <View style={styles.btnContainer}>
            <TouchableOpacity
              disabled={disabledExcel}
              style={styles.btn}
              onPressIn={submitHandler}
              delayPressIn={0}
              delayPressOut={0}>
              {isPending ? (
                <ActivityIndicator color={'white'} />
              ) : (
                <Text style={styles.txt}>Submit</Text>
              )}
            </TouchableOpacity>
            <Text>Or</Text>
            <TouchableOpacity
              style={styles.excelButton}
              onPress={handleExcelUpload}
              disabled={disabledExcel || uploading}>
              {uploading && progress > 0 ? (
                <Text style={styles.percentageText}>
                  {progress === 0.1
                    ? 'Starting Upload...'
                    : `${progress}% Uploaded`}{' '}
                </Text>
              ) : (
                <>
                  <Text style={styles.excelTxt}>Upload Excel File</Text>
                  <Image style={styles.excelImage} source={IMAGES.excel_icon} />
                </>
              )}
            </TouchableOpacity>
            {/* {progress > 0 && (
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, {width: `${progress}%`}]} />
              </View>
            )} */}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  txt: {
    color: 'white',
    fontSize: 16,
  },
  btnContainer: {
    alignItems: 'center',
    gap: 15,
    // justifyContent: 'center',
  },
  excelButton: {
    backgroundColor: '#1D6F42',
    width: '100%',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  excelTxt: {
    color: 'white',
    fontSize: 16,
  },
  excelImage: {
    width: 24,
    height: 24,
  },
  percentageText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddCustomer;
