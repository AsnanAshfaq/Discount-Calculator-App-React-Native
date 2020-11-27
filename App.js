import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Platform, Text, View, TextInput } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontSize:30,fontFamily:'Times New Roman'}}>Discount Calculator App</Text>
      </View>
      <View style={{flex:3,justifyContent:'center',alignItems:'center'}}>
        <TextInput defaultValue={0} style={{fontSize:20}} placeholder="Original Price:" keyboardType="numeric" /> 
        <TextInput defaultValue={0} style={{fontSize:20}} placeholder="Discount Percentage:"  keyboardType="numeric" maxLength={3}/> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
});
