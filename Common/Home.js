import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Alert,
  ToastAndroid,
  Button,
} from "react-native";

const Home = ({ navigation, route }) => {
  const [Data, setData] = useState({
    OriginalPrice: "",
    DiscountedPrice: "",
    FinalPice: null,
    YouSaved: null,
    isDisabled: true,
    History: [],
  });


  const toast = (message, duration) => ToastAndroid.show(message, duration);


  const handleOriginalValue = (value) => {
    if (value < 0) {
      //  set the original value to empty string
      setData((prev) => ({ ...prev, OriginalPrice: "" }));
    } else {
      setData((prev) => ({ ...prev, OriginalPrice: value }));
    }
  };

  const handleDiscountValue = (value) => {
    if (value < 0)
      //  set the original value to empty string
      setData((prev) => ({ ...prev, DiscountedPrice: "" }));
    else if (value <= 100) {
      // set the discount value
      setData((prev) => ({ ...prev, DiscountedPrice: value }));
    }
  };

  const handleResults = () => {
    if (Data.OriginalPrice != "" && Data.DiscountedPrice != "") {
      let original_price = Number.parseInt(Data.OriginalPrice);
      let discount_price = Number.parseInt(Data.DiscountedPrice);
      const saved_price = (discount_price / 100) * original_price;
      const final_price = original_price - saved_price;
      // set the final and saved prices and set the disable property of button to false
      setData((prev) => ({
        ...prev,
        FinalPice: Math.floor(final_price),
        YouSaved: Math.floor(saved_price),
        isDisabled: false,
      }));
    }
  };

  const handleSave = () => {
    //   save the results in the history
    setData((prev) => {
      return {
        ...prev,
        isDisabled: true,
        History: [
          ...prev.History,
          {
            OriginalPrice: prev.OriginalPrice,
            DiscountedPrice: prev.DiscountedPrice,
            FinalPice: prev.FinalPice,
            YouSaved: prev.YouSaved,
          },
        ],
      };
    });
    toast("Data has been stored",1000)
  };

  useEffect(() => {
    if (Data.OriginalPrice == "" || Data.DiscountedPrice == "")
      setData((prev) => ({ ...prev, isDisabled: true }));
    // handle the results
    handleResults();
  }, [Data.OriginalPrice, Data.DiscountedPrice]);

  useEffect(() => {
      if(route.params != undefined)
      setData(prev => ({
          OriginalPrice:"",
          DiscountedPrice:"",
          History:route.params.history
      }))
  },[route.params])
  return (
    <View style={styles.container}>
      {/* Start of Heading ⚫ */}
      <View style={headingStyles.heading}>
        <View style={headingStyles.logoContainer}>
          <Text style={[headingStyles.appName, styles.whiteColor]}>
            Discount Application
          </Text>
        </View>
        <View style={headingStyles.historyContainer}>
          <TouchableOpacity
            onPress={() => {
              if (Data.History.length > 0) {
                navigation.navigate("History", {
                  history: Data.History,
                });
              } else {
                ToastAndroid.show("No History to be viewed", 1000);
              }
            }}
          >
            <Text
              style={[styles.textNormal, { padding: 2 }, styles.yellowColor]}
            >
              History
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* End of Heading ⚫ */}

      {/* Start of Text Fields 🔴 */}
      <View style={textFieldStyles.container}>
        <View style={textFieldStyles.textFieldContainer}>
          <TextInput
            onChangeText={(value) => handleOriginalValue(value)}
            value={Data.OriginalPrice}
            placeholder={"Enter Original Value"}
            style={[styles.textSmall, styles.whiteColor]}
            keyboardType="decimal-pad"
            maxLength={8}
            placeholderTextColor={"#f6f8f9"}
          />
        </View>
        <View style={textFieldStyles.textFieldContainer}>
          <TextInput
            onChangeText={(value) => handleDiscountValue(value)}
            value={Data.DiscountedPrice}
            placeholder={"Enter Discount Value"}
            style={[styles.textSmall, styles.whiteColor]}
            keyboardType="numeric"
            maxLength={3}
            placeholderTextColor={"#f6f8f9"}
          />
        </View>
      </View>
      {/* End of Text Fields 🔴 */}
      <View style={{ flex: 0.5, width: "90%" }}>
        <Button
          title="Save"
          color={"#f7bf02"}
          disabled={Data.isDisabled}
          onPress={() => handleSave()}
        />
      </View>

      {/* Start  of Result 🔵 */}
      {Data.OriginalPrice != "" && Data.DiscountedPrice != "" ? (
        <View style={resultStyles.container}>
          <View style={resultStyles.view}>
            <Text style={[styles.textNormal, styles.whiteColor]}>
              Final Price :{" "}
              <Text style={[styles.textLarge, styles.yellowColor, styles.bold]}>
                {Data.FinalPice}
              </Text>
            </Text>
          </View>
          <View style={resultStyles.view}>
            <Text style={[styles.textNormal, styles.whiteColor]}>
              You Saved :{" "}
              <Text style={[styles.textLarge, styles.yellowColor, styles.bold]}>
                {Data.YouSaved}
              </Text>
            </Text>
          </View>
        </View>
      ) : (
        <View style={resultStyles.container}></View>
      )}
      {/* End  of Result 🔵 */}
    </View>
  );
};

export default Home;

const headingStyles = StyleSheet.create({
  heading: {
    flex: 1,
    flexDirection: "row",
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  logoContainer: {
    flex: 0.7,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    marginTop: 17,
  },
  historyContainer: {
    flex: 0.3,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    marginRight: 10,
    marginTop: 5,
  },
});

const resultStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
  },
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#f7bf02",
    maxHeight: 60,
    margin: 5,
  },
});

const textFieldStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    // justifyContent: "",
  },
  textFieldContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#f7bf02",
    maxHeight: 60,
    padding: 10,
    margin: 5,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: Platform.OS === "android" ? 18 : null,
    alignItems: "center",
    backgroundColor: "#1b1b1b",
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
});
