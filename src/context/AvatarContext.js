import createDataContext from "./createDataContext";
import { navigate } from "../navigationRef";
import { Alert } from "react-native";

const avatarReducer = (state, action) => {
  switch (action.type) {
    case "change_name":
      return { ...state, warrior: { ...state.warrior, name: action.payload } };
    case "change_avatar_type":
      return { ...state, warrior: { ...state.warrior, type: action.payload } };
    case "change_attack":
      state.warrior.attacks[action.payload.attack] = action.payload.type;
      return {
        ...state,
        warrior: { ...state.warrior, attacks: state.warrior.attacks }
      };
    case "change_tournament_id":
      return { ...state, id: action.payload };
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

const onTournamentJoinResponse = dispatch => (ws, data, id, avatarId) => {
  if(avatarId !== id) {
    try {
      ws.send(data);
    } catch (error) {
      console.log(error);
    }
  }
  ws.onmessage = evt => {
    const response = JSON.parse(evt.data);
    console.log(response);
    if (response.type === 0) {
      Alert.alert("Error", response.message.message);
      navigate("TournamentList");
    } else if (response.message.event === "tournament.warrior.joined") {
      dispatch({ type: "change_tournament_id", payload: id });
    }
  };
};

export const { Provider, Context } = createDataContext(
  avatarReducer,
  { changeName, changeAvatarType, changeAttack, onTournamentJoinResponse },
  { id: 0, warrior: { name: "Name", type: 0, attacks: [1, 1, 1, 1, 1] } }
);
