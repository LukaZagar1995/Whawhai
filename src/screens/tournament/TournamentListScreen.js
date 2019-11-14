import React, { useContext, useEffect } from "react";
import * as ApiKeys from "../../constants/apiKeys";
import { Context as TournamentContext } from "../../context/TournamentContext";
import { Context as AvatarContext } from "../../context/AvatarContext";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";

const TournamentListScreen = ({ navigation }) => {
  const { state: tournamentState, onTournamentsEventsResponse } = useContext(TournamentContext);
  const { state: avatarState } = useContext(AvatarContext);

  useEffect(() => {
    ws = new WebSocket(ApiKeys.API_BASE_URL + ApiKeys.API_TOURNAMENT_EVENTS);
    ws.onopen = () => {
      onTournamentsEventsResponse(ws, avatarState, tournamentState);
    };
  }, []);

  

 
  return (
    <View>
      <FlatList
        data={tournamentState.tournaments}
        keyExtractor={tournament => `${tournament.id}`}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("TournamentDetail", { item });
              }}
            >
              <ListItem
                chevron={{ size: 30 }}
                title={item.name}
                rightTitle="Waiting for players"
                style={styles.listItemStyle}
                titleStyle={{ color: "#989898" }}
              />
            </TouchableOpacity>
           
          );
        }}
      />
    </View>
  );
};

TournamentListScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleStyle: {
      textAlign: "center",
      marginRight: 70,
      flex: 1
    },
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.navigate("AvatarOverview")}>
        <MaterialIcons name="arrow-back" size={25} style={{ marginLeft: 10 }} />
      </TouchableOpacity>
    ),
    title: "Tournaments"
  };
};

const styles = StyleSheet.create({
  listItemStyle: {
    borderColor: "#E0E0E0",
    borderBottomWidth: 1
  }
});

export default TournamentListScreen;
