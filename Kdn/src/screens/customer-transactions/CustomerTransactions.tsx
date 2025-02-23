import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useGetTransactionMutation} from '../../hooks/transaction/useGetTransaction.mutation';
import {ITransaction} from '../../Types/transaction/transaction';

const CustomerTransactions = () => {
  const route =
    useRoute<RouteProp<TProtectedNavigation, 'CustomerTransactions'>>();
  const {id} = route.params;
  const {mutateAsync} = useGetTransactionMutation();
  const [transactionData, setTransactionData] = useState<ITransaction[]>([]);
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await mutateAsync({customerId: id});
        if (res.status === 'success') {
          setTransactionData(res.data);
        }
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchdata();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>CustomerTransactions</Text>
      {transactionData.length > 0 ? (
        transactionData.map((item, index) => (
          <View style={styles.details} key={index}>
            <Text style={styles.txt}>
              <Text style={styles.detailTxt}>Payment Mode:</Text>{' '}
              {item.paymentMode}
            </Text>
            <Text style={styles.txt}>
              <Text style={styles.detailTxt}>Amount:</Text> {item.amount}₹
            </Text>
            <Text style={styles.txt}>
              <Text style={styles.detailTxt}>Payment Date:</Text>{' '}
              {formatDate(item.createdAt)}
            </Text>
          </View>
        ))
      ) : (
        <Text>No transactions found</Text>
      )}
    </View>
  );
};

export default CustomerTransactions;

const styles = StyleSheet.create({
  headingText: {
    fontSize: 30,
    fontWeight: '500',
  },
  container: {
    padding: 13,
  },
  details: {
    padding: 8,
  },
  txt: {
    fontSize: 15,
  },
  detailTxt: {
    fontSize: 18,
    fontWeight: '500',
  },
});
