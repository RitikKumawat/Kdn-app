import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useGetCustomerDetails} from '../../hooks/customer/useGetCustomerDetails.mutation';
import PaymentModal from '../../components/PaymentModal';
import {useAddTransactionMutation} from '../../hooks/transaction/useAddTransaction.mutation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const CustomerDetails = () => {
  const route = useRoute<RouteProp<TProtectedNavigation, 'CustomerDetails'>>();
  const {id} = route.params;
  const {mutateAsync} = useGetCustomerDetails();
  const {mutateAsync: collectPayment, isPending} = useAddTransactionMutation();
  const [customerData, setCustomerData] = useState<ICustomer>();
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<TProtectedNavigation>>();
  useEffect(() => {
    const fetchData = async () => {
      const res = await mutateAsync(id);
      if (res.status === 'success') {
        setCustomerData(res.data);
      }
    };
    fetchData();
  }, [id, mutateAsync]);
  const handleCollectPayment = async ({
    paymentMode,
    amount,
  }: {
    paymentMode: string;
    amount: string;
  }) => {
    const response = await collectPayment({
      customerId: id,
      amount: amount,
      paymentMode: paymentMode,
    });
    if (response.status === 'success') {
      console.log('response', response);
      setModalVisible(false);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.customerDetails}>
        <Text style={styles.headingText}>Customer Details</Text>
        <Text style={styles.textStyle}>
          <Text style={styles.label}>Full Name:</Text> {customerData?.firstName}{' '}
          {customerData?.lastName}
        </Text>
        <Text style={styles.textStyle}>
          <Text style={styles.label}>Phone Number: </Text>
          {customerData?.contactNumber}
        </Text>
        <Text style={styles.textStyle}>
          <Text style={styles.label}>Address: </Text>
          {customerData?.address}
        </Text>
      </View>
      <View style={styles.paymentContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            navigation.navigate('CustomerTransactions', {id: id as string})
          }>
          <Text style={styles.txt}>View All Transactions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.txt}>Collect Payment</Text>
        </TouchableOpacity>
      </View>
      <PaymentModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleCollectPayment}
        isPending={isPending}
      />
    </View>
  );
};

export default CustomerDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  customerDetails: {
    padding: 20,
    gap: 8,
  },
  headingText: {
    fontSize: 30,
    fontWeight: '500',
  },
  textStyle: {
    fontSize: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
  },
  paymentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 10,
  },
  btn: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  txt: {
    color: 'white',
    fontSize: 14,
  },
});
