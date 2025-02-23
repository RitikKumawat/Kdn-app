import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useGetAllCustomers} from '../hooks/customer/useGetAllCustomer.query';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const CustomerList = () => {
  const [search, setSearch] = useState('');
  const {data, isLoading, isError} = useGetAllCustomers({
    search,
  });
  const navigation =
    useNavigation<NativeStackNavigationProp<TProtectedNavigation>>();
  // const customerData = data?.status === 'success' ? data.data : [];
  const customerData: ICustomer[] = useMemo(() => {
    if (data?.status === 'success') {
      return data.data;
    }
    return [];
  }, [data]);

  // Render each customer item
  const renderItem = ({item}: {item: ICustomer}) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('CustomerDetails', {id: item?._id as string});
      }}
      style={styles.item}>
      <Text style={styles.name}>
        {item.firstName} {item.lastName}
      </Text>
      <Text style={styles.details}>Address: {item.address}</Text>
      <Text style={styles.details}>Contact: {item.contactNumber}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search customers..."
        placeholderTextColor="#888"
        value={search}
        onChangeText={setSearch}
        // autoFocus
      />

      {/* Loader */}
      {isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text>Loading customers...</Text>
        </View>
      )}

      {/* Error */}
      {isError && (
        <Text style={styles.error}>
          Failed to fetch customers. Try again later.
        </Text>
      )}

      {/* Customer List */}
      <FlatList
        keyboardShouldPersistTaps="handled"
        data={customerData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          isLoading ? null : (
            <Text style={styles.emptyMessage}>No customers found</Text>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  details: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});

export default CustomerList;
