import createDataContext from "./createDataContext";
import { navigate } from "../navigationRef";
import tournamentApi from "../api/tournamentApi";
import { Alert } from "react-native";
import * as apiKeys from "../constants/apiKeys";

const avatarReducer = (state, action) => {
  switch (action.type) {
    case "change_name":
      return { ...state, warrior: { ...state.warrior, name: action.payload } };
    case "change_avatar_type":
      return { ...state, warrior: { ...state.warrior, type: action.payload } };
    case "add_created_tournament_id":
      return { ...state, createdIds: [...state.createdIds, action.payload] };
    case "removed_joined_tournament_id":
      return {
        ...state,
        joinedIds: state.joinedIds.filter(
          joinedId => joinedId !== action.payload
        )
      };
    case "change_attack":
      state.warrior.attacks[action.payload.attack] = action.payload.type;
      return {
        ...state,
        warrior: { ...state.warrior, attacks: state.warrior.attacks }
      };
    case "add_joined_tournament_id":
      for (let joinedId of state.joinedIds) {
        if (joinedId === action.payload) {
          return state;
        }
      }
      return { ...state, joinedIds: [...state.joinedIds, action.payload] };
    default:
      return state;
  }
};

const changeName = dispatch => name => {
  dispatch({ type: "change_name", payload: name });
};

const changeAvatarType = dispatch => type => {
  dispatch({ type: "change_avatar_type", payload: type });
};

const changeAttack = dispatch => (attack, type) => {
  dispatch({ type: "change_attack", payload: { type, attack } });
};

const startTournament = dispatch => async (id, createdTournamentData) => {
  for(let createdTournament of createdTournamentData.createdIds ){
    if(createdTournament.id === id ){
      try {
        await tournamentApi.patch(`/tournament/${id}/start`, createdTournament);
      } catch (err) {
        Alert.alert(err.response.data.message);
      }
    }
  }
};

const removeJoinedTournamentId = dispatch => id => {
  dispatch({ type: "removed_joined_tournament_id", payload: id });
};

const addCreateTournamentId = dispatch => async (name, data) => {
  try {
    const response = await tournamentApi.post("/tournament", { name });
    dispatch({ type: "add_created_tournament_id", payload: response.data });
    ws = new WebSocket(
      apiKeys.API_BASE_URL +
        apiKeys.API_TOURNAMENT +
        response.data.id +
        apiKeys.API_TOURNAMENT_JOIN
    );
    ws.onopen = () => {
      try {
        ws.send(data);
        dispatch({ type: "add_joined_tournament_id", payload: response.data.id });
      } catch (error) {
        console.log(error);
      }
    }
    ws.close()
    navigate("TournamentList");
  } catch (err) {
    Alert.alert(`Tournament ${name} already exists!`);
  }
};

const onTournamentJoinResponse = dispatch => (
  ws,
  data,
  id,
  avatarJoinedIds
) => {
  ws.onmessage = evt => {
    const response = JSON.parse(evt.data);
    if (response.type === 0) {
      Alert.alert("Error", response.message.message);
      navigate("TournamentList");
    } else if (response.message.event === "tournament.warrior.joined") {
      dispatch({ type: "add_joined_tournament_id", payload: id });
    }
  };
  let joined = false;
  for (let joinedId of avatarJoinedIds) {
    if (joinedId === id) {
      joined = true;
    }
  }
  if (!joined) {
    try {
      ws.send(data);
    } catch (error) {
      console.log(error);
    }
  }
};

export const { Provider, Context } = createDataContext(
  avatarReducer,
  {
    changeName,
    changeAvatarType,
    changeAttack,
    onTournamentJoinResponse,
    removeJoinedTournamentId,
    addCreateTournamentId,
    startTournament
  },
  {
    joinedIds: [],
    createdIds: [],
    warrior: { name: "", type: 0, attacks: [-1, -1, -1, -1, -1] }
  }
);
