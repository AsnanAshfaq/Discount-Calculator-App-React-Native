import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Platform, Text, View, TextInput } from "react-native";

export default function App() {
  const [FinalPrice, setFinalPrice] = useState(null);
  const [OriginalPrice, setOriginalPrice] = useState(null);
  const [DiscountPercentage, setDiscountPercentage] = useState(null);

  useEffect(() => {
    console.log(OriginalPrice);
    if (OriginalPrice == "" || DiscountPercentage == "") {
      setFinalPrice(null);
    } else if (OriginalPrice != null && DiscountPercentage != null) {
      if (OriginalPrice > -1) {
        if (DiscountPercentage > -1 && DiscountPercentage < 101) {
          let finalprice =
            OriginalPrice - (DiscountPercentage / 100) * OriginalPrice;
          console.log(finalprice);
          setFinalPrice(finalprice);
        }
      }
    }
  }, [OriginalPrice, DiscountPercentage]);
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 30 }}>Discount Calculator App</Text>
      </View>
      <View style={{ flex: 3, justifyContent: "center", alignItems: "center" }}>
        <TextInput
          defaultValue={0}
          style={{ fontSize: 20, textAlign: "center", paddingBottom: 10 }}
          placeholder="Original Price:"
          keyboardType="numeric"
          onChangeText={(e) => setOriginalPrice(e)}
        />
        <TextInput
          defaultValue={0}
          style={{ fontSize: 20, textAlign: "center" }}
          placeholder="Discount Percentage:"
          keyboardType="numeric"
          maxLength={3}
          onChangeText={(e) => setDiscountPercentage(e)}
        />
      </View>
      {FinalPrice != null && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 20 }}>
            You Saved{"    "}{" "}
            {Math.round(
              Math.max(OriginalPrice, FinalPrice) -
                Math.min(OriginalPrice, FinalPrice)
            )}
          </Text>
          <Text style={{ fontSize: 20 }}>
            Final Price {"    "}
            {Math.round((FinalPrice * 100) / 100)}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
});
