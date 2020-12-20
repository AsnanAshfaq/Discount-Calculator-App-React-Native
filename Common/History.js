import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  Alert,
  BackHandler,
} from "react-native";
// delete icon
import { AntDesign } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const History = ({ navigation, route }) => {
  const [History, setHistory] = useState(route.params.history);

  const alertMessage = (title, message, button1, button2) => {
    Alert.alert(title, message, [button1, button2]);
  };

  const toast = (message, duration) => ToastAndroid.show(message, duration);

  const handleClearHistory = () => {
    if (History.length > 0) {
      alertMessage(
        "Clear History",
        "Do you want to clear the History?",
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            setHistory((prev) => ({ ...prev, History: [] }));
            toast("Your History has been cleared", 1000);
          },
        }
      );
    } else {
      toast("History is already cleared", 1000);
    }
  };

  const handleConfirmDeleting = (index) => {
    alertMessage(
      "Deleting Item",
      `Do you really want to delete the item ${index + 1}`,
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          handleDeleteItem(index);
          toast("Item has been deleted", 1000);
        },
      }
    );
  };

  const handleDeleteItem = (index) => {
    const newHistory = History.filter((_, i) => i != index);
    setHistory(newHistory);
  };

  //   useEffect(() => {
  //       BackHandler.addEventListener("hardwareBackPress",() => {

  //         toast("You are going back, GEt lost",1000)
  //         navigation.goBack("Home",{
  //             history : History
  //           })
  //       })
  //   }, [])

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", marginVertical: 5 }}>
        <TouchableOpacity
          style={{ flex: 0.8, justifyContent: "center", alignItems: "center" }}
          onPress={() => {
            navigation.navigate("Home", {
              history: History,
            });
          }}
        >
          <Text style={[styles.headerText, styles.yellowColor]}>
            Go to Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 0.2,
            justifyContent: "center",
            alignItems: "flex-start",
          }}
          onPress={() => handleClearHistory()}
        >
          <Text style={[styles.textSmall - 2, styles.whiteColor]}>
            Clear History
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {History.length > 0 ? (
          History.map((history, index) => (
            
              <View style={styles.card} key={index}>
                {/* details  */}
                <View>
                  <View style={{ flexDirection: "row", marginBottom: 4 }}>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.textNormal, styles.whiteColor]}>
                        Original Price
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={[styles.textLarge, styles.yellowColor]}>
                        {history.OriginalPrice}
                      </Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: "row", marginBottom: 4 }}>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.textNormal, styles.whiteColor]}>
                        Discount Percentage
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={[styles.textLarge, styles.yellowColor]}>
                        {history.DiscountedPrice}%
                      </Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: "row", marginBottom: 4 }}>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.textNormal, styles.whiteColor]}>
                        Final Price
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={[styles.textLarge, styles.yellowColor]}>
                        {history.FinalPice}
                      </Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: "row", marginBottom: 4 }}>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.textNormal, styles.whiteColor]}>
                        You Saved
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={[styles.textLarge, styles.yellowColor]}>
                        {history.YouSaved}
                      </Text>
                    </View>
                  </View>
                </View>
                {/* icon */}
                <View style={{ alignItems: "flex-end" }}>
                  <TouchableWithoutFeedback
                    onPress={() => handleConfirmDeleting(index)}
                  >
                    <AntDesign name="delete" size={24} color="#f7bf02" />
                  </TouchableWithoutFeedback>
                </View>
              </View>
            
          ))
        ) : (
          <View style={{ marginTop: 300, marginHorizontal: 70 }}>
            <Text style={[styles.textLarge, styles.whiteColor]}>
              Nothing to show in the History
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b1b1b",
    marginTop: Platform.OS === "android" ? 18 : null,
  },
  card: {
    width: "100%",
    borderWidth: 5,
    borderRadius: 20,
    borderColor: "#f7bf02",
    marginVertical: 10,
    padding: 20,
  },
  heading: {
    flex: 1,
    flexDirection: "row",
  },
  yellowColor: {
    color: "#f7bf02",
  },
  whiteColor: {
    color: "#f6f8f9",
  },
  textSmall: {
    fontSize: 15,
  },
  textNormal: {
    fontSize: 17,
  },
  textLarge: {
    fontSize: 19,
  },
  bold: {
    fontWeight: "bold",
  },
  headerText: {
    fontSize: 24,
  },
});
