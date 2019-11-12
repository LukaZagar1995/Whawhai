import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList
} from "react-native";
import { ListItem, Button } from "react-native-elements";
import { Context as AvatarContext } from "../../context/AvatarContext";
import * as Constants from "../../constants/avatarConstants";
import Image from "react-native-remote-svg";

const AvatarOverviewScreen = ({ navigation }) => {
  const { state, changeName } = useContext(AvatarContext);
  let buttonDisabled = true;
  if (
    state.name !== "" &&
    state.attacks[0] !== -1 &&
    state.attacks[1] !== -1 &&
    state.attacks[2] !== -1 &&
    state.attacks[3] !== -1 &&
    state.attacks[4] !== -1
  ) {
    buttonDisabled = false;
  }
  const avatarAttacks = [];
  for (i = 0; i < 5; i++) {
    avatarAttacks.push(i);
  }

  console.log(state.attacks);
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

      <FlatList
        data={avatarAttacks}
        keyExtractor={attack => `${attack}`}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AvatarAttack", { item });
              }}
            >
              {state.attacks[item] === -1 ? (
                <ListItem
                  chevron={{ size: 30 }}
                  title={`Selected Attack ${item + 1}`}
                  style={styles.listItemStyle}
                  titleStyle={{ color: "#989898" }}
                />
              ) : (
                <ListItem
                  chevron={{ size: 30 }}
                  title={
                    Constants.AVATAR[state.type].attacks[state.attacks[item]]
                  }
                  style={styles.listItemStyle}
                  titleStyle={{ color: "#989898" }}
                />
              )}
            </TouchableOpacity>
          );
        }}
      />
      <Button
        title="FIGHT"
        buttonStyle={styles.buttonStyle}
        disabled={buttonDisabled}
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
  },
  listItemStyle: {
    borderColor: "#E0E0E0",
    borderWidth: 1,
    marginHorizontal: 30
  },
  buttonStyle: {
    backgroundColor: "#32CD32",
    margin: 60
  }
});

export default AvatarOverviewScreen;
