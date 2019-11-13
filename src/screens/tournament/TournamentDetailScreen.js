import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Context as AvatarContext } from "../../context/AvatarContext";
import * as ApiKeys from "../../constants/apiKeys";

const TournamentDetailScreen = ({ navigation }) => {
  const tournament = navigation.getParam("item");
  const { state } = useContext(AvatarContext);
  const data = JSON.stringify(state);

  useEffect(() => {
    ws = new WebSocket(
      ApiKeys.API_BASE_URL + "/tournament/" + tournament.id + "/join"
    );
    ws.onopen= () => {
      try {
        ws.send(data);
      } catch (error) {
        console.log(error); 
      }
      ws.onmessage = evt => {
        const response = JSON.parse(evt.data);
      }
    };
  }, []);

  return (
    <View>
      <Text>{tournament.name}</Text>
    </View>
  );
};

TournamentDetailScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleStyle: {
      textAlign: "center",
      flex: 1,
      marginRight: 70
    },
    headerTitle: navigation.getParam("item").name
  };
};

const styles = StyleSheet.create({});

export default TournamentDetailScreen;
