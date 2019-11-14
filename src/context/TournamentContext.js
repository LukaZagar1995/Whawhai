import createDataContext from "./createDataContext";
import { navigate } from "../navigationRef";
import { Alert } from "react-native";
import * as ApiKeys from "../constants/apiKeys";

const tournamentReducer = (state, action) => {
  switch (action.type) {
    case "add_tournament":
      for (let tournament of state.tournaments) {
        if (tournament.id === action.payload.id) {
          return state;
        }
      }
      return {
        tournaments: [
          ...state.tournaments,
          { name: action.payload.name, id: action.payload.id }
        ]
      };
    case "reset_tournament_list":
      return {
        tournaments: []
      };
    case "remove_tournament":
      return {
        tournaments: state.tournaments.filter(
          tournament => tournament.id !== action.payload
        )
      };
    default:
      return state;
  }
};

const onTournamentsEventsResponse = dispatch => (
  ws,
  avatarState,
  tournamentState
) => {
  ws.onmessage = evt => {
    const response = JSON.parse(evt.data);
    let name = "";
    let id = "";
    if (response.message.event === "tournament.created") {
      name = response.message.data.name;
      id = response.message.data.id;
      dispatch({ type: "add_tournament", payload: { name, id } });
    } else if (response.message.event === "tournament.timeout") {
      id = response.message.id;
      if (avatarState.id === id) {
        for (let tournament of tournamentState.tournaments) {
          if (tournament.id === id) {
            name = tournament.name;
          }
        }
        Alert.alert("Timeout", `Tournament ${name} timeouted.`);
        navigate("TournamentList");
      }
      dispatch({ type: "remove_tournament", payload: id });
    } else if (response.message.event === "tournament.finished") {
      id = response.message.id;
      if (avatarState.id === id) {
        for (let tournament of tournamentState.tournaments) {
          if (tournament.id === id) {
            name = tournament.name;
          }
        }
        navigate("TournamentResult", { response });
      }
      dispatch({ type: "remove_tournament", payload: id });
    }
  };
};

const reset = dispatch => () => {
  dispatch({ type: "reset_tournament_list" });
};

export const { Provider, Context } = createDataContext(
  tournamentReducer,
  { onTournamentsEventsResponse, reset },
  { tournament: [] }
);
