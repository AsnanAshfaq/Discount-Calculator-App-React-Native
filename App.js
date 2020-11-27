import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Platform,
  Text,
  View,
  TextInput,
  Modal,
  Button,
  TouchableWithoutFeedback,
  ToastAndroid,
} from "react-native";

export default function App() {
  const [FinalPrice, setFinalPrice] = useState(null);
  const [OriginalPrice, setOriginalPrice] = useState(null);
  const [DiscountPercentage, setDiscountPercentage] = useState(null);
  const [isSaveButtonEnabled, setisSaveButtonEnabled] = useState(false);
  const [History, setHistory] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const saveCalculations = () => {
    ToastAndroid.show("Saving in History", 1000);
    setHistory((prev) => [
      ...prev,
      {
        OriginalPrice: OriginalPrice,
        DiscountPercentage: DiscountPercentage,
        Saving: Math.round(OriginalPrice - FinalPrice),
        FinalPrice: Math.round(FinalPrice),
      },
    ]);
    setisSaveButtonEnabled(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const HistoryModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        
      >
       <View>
         <Text>Modal</Text>
       </View>
      </Modal>
    );
  };

  useEffect(() => {
    if (OriginalPrice == "" || DiscountPercentage == "") {
      setFinalPrice(null);
      setisSaveButtonEnabled(false);
    } else if (OriginalPrice != null && DiscountPercentage != null) {
      if (
        DiscountPercentage >= 0 &&
        DiscountPercentage < 101 &&
        OriginalPrice >= 0
      ) {
        let finalprice =
          OriginalPrice - (DiscountPercentage / 100) * OriginalPrice;
        setFinalPrice(finalprice);
        setisSaveButtonEnabled(true);
      } else {
        setisSaveButtonEnabled(false);
      }
    }
  }, [OriginalPrice, DiscountPercentage]);
  return (
    <View style={styles.container}>
      <HistoryModal/>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 30 }}>Discount Calculator App</Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "flex-end",
          padding: 10,
        }}
      >
        <TouchableWithoutFeedback
          style={{ fontSize: 14, color: "black" }}
          onPress={openModal}
        >
          <Text> View History</Text>
        </TouchableWithoutFeedback>
      </View>
      {FinalPrice != null && (
        <View
          style={{ flex: 2, justifyContent: "center", alignItems: "center" }}
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
      <View style={{ flex: 5, justifyContent: "center", alignItems: "center" }}>
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

      <Button
        disabled={!isSaveButtonEnabled}
        title="Save"
        color="#841584"
        onPress={saveCalculations}
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
});
