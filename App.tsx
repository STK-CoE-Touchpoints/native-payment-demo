import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { PaymentScreenNative } from '@shared-payment-platform/payment-ui-native';

export default function App() {
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Native Payment Demo</Text>
        <Text style={styles.subtitle}>
          Consumidor Expo usando shared-payment-platform como Git Submodule
        </Text>
      </View>

      <PaymentScreenNative
        currency="MXN"
        cardHolder="Demo Customer"
        onSuccess={(result) => {
          console.log('Pago exitoso:', result);
        }}
        onError={(result) => {
          console.error('Pago fallido:', result);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#eef2ff',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#334155',
  },
});
