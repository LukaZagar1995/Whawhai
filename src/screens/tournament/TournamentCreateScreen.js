import React, { useContext, useState } from "react";
import { Context as AvatarContext } from "../../context/AvatarContext";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { Button } from "react-native-elements";

const TournamentCreateScreen = () => {
  const [tournamentName, setTournamentName] = useState("");
  const { state, addCreateTournamentId } = useContext(AvatarContext);
  const data = JSON.stringify(state.warrior);
  let disabled = true;
  if (
    tournamentName !== "" &&
    tournamentName.length >= 2 &&
    tournamentName.length < 50
  ) {
    disabled = false
  } else {
    disabled = true
  }

  return (
    <View>
      <TextInput
        placeholder="TournamentName"
        value={tournamentName}
        style={styles.inputStyle}
        onChangeText={newValue => setTournamentName(newValue)}
      />
      <Button
      disabled={disabled}
        title="Create"
        buttonStyle={styles.buttonStyle}
        onPress={() => addCreateTournamentId(tournamentName, data)}
      />
    </View>
  );
};

TournamentCreateScreen.navigationOptions = () => {
  return {
    headerTitleStyle: {
      textAlign: "center",
      flex: 1,
      marginRight: 70
    },
    headerTitle: "Create Tournament"
  };
};

const styles = StyleSheet.create({
  inputStyle: {
    marginHorizontal: 30,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    padding: 15
  },
  buttonStyle: {
    backgroundColor: "#32CD32",
    marginHorizontal: 60,
    marginVertical: 10
  }
});

export default TournamentCreateScreen;
