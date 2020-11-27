import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Platform, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Starting to work on Discount Calculator App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
});
