import {View, Text, StyleSheet} from 'react-native';
import React, {useMemo} from 'react';
import {useGetAnalyticData} from '../../hooks/transaction/useGetAnalytics.query';

const Dashboard = () => {
  const {data} = useGetAnalyticData();

  const analyticData = useMemo(() => {
    if (data?.status === 'success') {
      return data.data;
    }
    return {};
  }, [data]);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.dailyContainer}>
          <Text style={styles.heading}>Daily Collection</Text>
          <Text style={styles.content}>
            {analyticData?.totalDailyCollection} Rs
          </Text>
        </View>
        <View style={styles.monthlyContainer}>
          <Text style={styles.heading}>Monthly Collection </Text>
          <Text style={styles.content}>
            {analyticData?.totalMonthlyCollection} Rs
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    // backgroundColor:"red",
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 20,
    gap: 10,
  },
  heading: {
    color: 'white',
    fontSize: 16,
    fontWeight: 600,
  },
  content: {
    color: 'white',
    fontSize: 15,
    fontWeight: 400,
  },
  dailyContainer: {
    flex: 1,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 12,
  },
  monthlyContainer: {
    flex: 1,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 12,
  },
});
