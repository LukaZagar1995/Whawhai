import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { Context as AvatarContext } from "../../context/AvatarContext";
import * as Constants from "../../constants/avatarConstants";
import Image from "react-native-remote-svg";

const AvatarOverviewScreen = ({ navigation }) => {
  const { state, changeName } = useContext(AvatarContext);
  console.log(state.name);
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("AvatarSetup")}>
        <Image
          source={Constants.AVATAR[state.type].image}
          style={styles.imageStyle}
        />
      </TouchableOpacity>
      <TextInput
        placeholder="Name"
        style={styles.inputStyle}
        value={state.name}
        onChangeText={newValue => changeName(newValue)}
      />
    </View>
  );
};

AvatarOverviewScreen.navigationOptions = () => {
  return {
    headerTitleStyle: {
      textAlign: "center",
      flex: 1
    },
    title: "Whawhai"
  };
};

const styles = StyleSheet.create({
  imageStyle: {
    height: 200,
    alignSelf: "center",
    margin: 20
  },
  inputStyle: {
    marginHorizontal: 30,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    padding: 15
  }
});

export default AvatarOverviewScreen;
