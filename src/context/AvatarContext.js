import createDataContext from "./createDataContext";

const avatarReducer = (state, action) => {
  switch (action.type) {
    case "change_name":
      return { ...state, name: action.payload };
    case "change_avatar_type":
      return { ...state, type: action.payload };
    case "change_attack":
      state.attacks[action.payload.attack] = action.payload.type;
      return { ...state, attacks: state.attacks };
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
  dispatch({ type: "change_attack", payload: {type, attack} });
};

export const { Provider, Context } = createDataContext(
  avatarReducer,
  { changeName, changeAvatarType, changeAttack },
  { name: "", type: 0, attacks: [-1, -1, -1, -1, -1] }
);
