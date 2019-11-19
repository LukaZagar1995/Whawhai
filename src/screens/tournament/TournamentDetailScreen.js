import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { Context as AvatarContext } from "../../context/AvatarContext";
import {Button} from 'react-native-elements'
import * as ApiKeys from "../../constants/apiKeys";

const TournamentDetailScreen = ({ navigation }) => {
  const tournament = navigation.getParam("item");
  const { state, onTournamentJoinResponse, startTournament } = useContext(AvatarContext);
  const data = JSON.stringify(state.warrior);
  const id = tournament.id;

  useEffect(() => {
    ws = new WebSocket(
      ApiKeys.API_BASE_URL +
        ApiKeys.API_TOURNAMENT +
        tournament.id +
        ApiKeys.API_TOURNAMENT_JOIN
    );
    ws.onopen = () => {
      onTournamentJoinResponse(ws, data, id, state.joinedIds);
    };
  }, []);

  let joined = true
  let created = false

  for(let joinedId of state.joinedIds) {
    if(joinedId === tournament.id) {
        joined = false
    }
  }

  for(let createdId of state.createdIds) {
    if(createdId.id === tournament.id) {
      created = true
    }
  }

  if(joined){
    return <ActivityIndicator size="large" style={{marginTop: 200}}/>
  }

  return (
    <View>
      <Text style={styles.titleStyle}>Joined tournament {tournament.name}</Text>
      {created ? <Button title="Start Tournament" buttonStyle={styles.buttonStyle} onPress={() => startTournament(id, state)}/> : null}
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

const styles = StyleSheet.create({
  titleStyle: {
    alignSelf: "center",
    justifyContent: 'center',
    fontSize: 20
  }, buttonStyle: {
    backgroundColor: "#32CD32",
    marginHorizontal: 60,
    marginVertical: 10
  }
});

export default TournamentDetailScreen;
