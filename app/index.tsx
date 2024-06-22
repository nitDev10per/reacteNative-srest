import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";

interface Product {
  product: string;
  "interest rate": number;
  "minimum Deposit": number;
  "interest type": string;
}

export default function Index() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayIndex, setIndex] = useState(0);

  useEffect(() => {
    axios.get('https://srest.in/accounts.json')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const item = data[displayIndex];

  return (
    <View style={{ flex: 1 }}>
    <Text style={{ alignSelf: 'center', fontSize: 24, fontWeight: 'bold' }}>Savings Account</Text>
   
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        item ? (
          <View>
             <View style={[styles.item]}>
              <Text style={styles.title}>{item.product}</Text>
              <Text>Interest Rate: {item["interest rate"]}%</Text>
              <Text>Minimum Deposit: ${item["minimum Deposit"]}</Text>
              <Text>Interest Type: {item["interest type"]}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', padding: 10 }}>
              <Text onPress={() => { setIndex((displayIndex + 2) % data.length) }} style={{ color: 'blue', textDecorationLine: 'underline' }}>
                {'<'} {data[(displayIndex + 2) % data.length].product}
              </Text>
              <Text onPress={() => { setIndex((displayIndex + 1) % data.length) }} style={{ color: 'blue', textDecorationLine: 'underline' }}>
                {data[(displayIndex + 1) % data.length].product} {'>'}
              </Text>
            </View>
          </View>
        ) : (
          <Text>No item found at index {displayIndex}</Text>
        )
      )}
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
  },
  item: {
    alignItems: 'center',
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
