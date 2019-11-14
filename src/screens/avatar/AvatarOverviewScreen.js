import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView
} from "react-native";
import { ListItem, Button } from "react-native-elements";
import { Context as AvatarContext } from "../../context/AvatarContext";
import * as Constants from "../../constants/avatarConstants";
import { NavigationEvents } from "react-navigation";
import { Context as TournamentContext } from "../../context/TournamentContext";
import Image from "react-native-remote-svg";

const AvatarOverviewScreen = ({ navigation }) => {
 
  const { state, changeName } = useContext(AvatarContext);
  const { reset } = useContext(TournamentContext);
  let buttonDisabled = true;
  if (
    state.warrior.name !== "" &&
    state.warrior.name.length < 25 &&
    state.warrior.attacks[0] !== -1 &&
    state.warrior.attacks[1] !== -1 &&
    state.warrior.attacks[2] !== -1 &&
    state.warrior.attacks[3] !== -1 &&
    state.warrior.attacks[4] !== -1
  ) {
    buttonDisabled = false;
  }
  const avatarAttacks = [];
  for (i = 0; i < 5; i++) {
    avatarAttacks.push(i);
  }

  return (
    <View>
      <NavigationEvents onWillFocus={() => reset()} />
      <ScrollView>
        <TouchableOpacity onPress={() => navigation.navigate("AvatarSetup")}>
          <Image
            source={Constants.AVATAR[state.warrior.type].image}
            style={styles.imageStyle}
          />
        </TouchableOpacity>
        <TextInput
          placeholder="Name"
          style={styles.inputStyle}
          value={state.warrior.name}
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
                {state.warrior.attacks[item] === -1 ? (
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
                      Constants.AVATAR[state.warrior.type].attacks[
                        state.warrior.attacks[item]
                      ]
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
          onPress={() => navigation.navigate("TournamentList")}
          buttonStyle={styles.buttonStyle}
          disabled={buttonDisabled}
        />
      </ScrollView>
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
