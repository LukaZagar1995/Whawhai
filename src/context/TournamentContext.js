import createDataContext from "./createDataContext";

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

const onTournamentsEventsResponse = dispatch => (ws, state) => {
  ws.onmessage = evt => {
    const response = JSON.parse(evt.data);
    let name = "";
    let id = "";
    console.log(response);
    if (response.message.event === "tournament.created") {
      name = response.message.data.name;
      id = response.message.data.id;
      dispatch({ type: "add_tournament", payload: { name, id } });
    } else if (
      response.message.event === "tournament.created" ||
      response.message.event === "tournament.timeout" ||
      response.message.event === "tournament.finished"
    ) {
      id = response.message.id;
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
  { tournaments: [] }
);
