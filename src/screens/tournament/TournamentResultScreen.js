import React, { useContext, useState } from "react";
import { Context as AvatarContext } from "../../context/AvatarContext";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Image from "react-native-remote-svg";
import * as Constants from "../../constants/avatarConstants";

const TournamentResultScreen = ({ navigation }) => {
 
  const { state } = useContext(AvatarContext);
  const dataI = navigation.state.params.response.message.data.length - 1;
  const dataJ = navigation.state.params.response.message.data[dataI].length - 1;
  const winnerName =
    navigation.state.params.response.message.data[dataI][dataJ].winner.name;
    const winnerType =
    navigation.state.params.response.message.data[dataI][dataJ].winner.type;


  return (
    <View >
      {winnerName === state.warrior.name ? (
        <Text style={styles.titleStyle}>You win!</Text>
      ) : 
        <View>
          <Text style={styles.titleStyle}>You lose!</Text>
      <Text style={styles.titleStyle}>Winner {winnerName}</Text>
      <Image
          source={Constants.AVATAR[winnerType].image}
          style={styles.imageStyle}
        />
        </View>
        
      }
    </View>
  );
};

TournamentResultScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleStyle: {
      textAlign: "center",
      flex: 1,
      marginRight: 70
    },
    headerTitle: "Results",
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.navigate("TournamentList")}>
        <MaterialIcons name="arrow-back" size={25} style={{ marginLeft: 10 }} />
      </TouchableOpacity>
    )
  };
};

const styles = StyleSheet.create({
  titleStyle: {
    alignSelf: "center",
    fontSize: 20
  },
  imageStyle: {
    height: 200,
    alignSelf: "center",
    margin: 20
  },
});

export default TournamentResultScreen;
