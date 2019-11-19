import { createAppContainer, createSwitchNavigator } from "react-navigation";
import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import AvatarOverviewScreen from "./src/screens/avatar/AvatarOverviewScreen";
import AvatarSetupScreen from "./src/screens/avatar/AvatarSetupScreen";
import AvatarAttackScreen from "./src/screens/avatar/AvatarAttackScreen";
import { Provider as AvatarProvider } from "./src/context/AvatarContext";
import { Provider as TournamentProvider } from "./src/context/TournamentContext";
import TournamentListScreen from "./src/screens/tournament/TournamentListScreen";
import TournamentDetailScreen from "./src/screens/tournament/TournamentDetailScreen";
import TournamentResultScreen from "./src/screens/tournament/TournamentResultScreen";
import { setNavigator } from "./src/navigationRef";
import TournamentCreateScreen from "./src/screens/tournament/TournamentCreateScreen";

const navigator = createSwitchNavigator(
  {
    avatarFlow: createStackNavigator({
      AvatarOverview: AvatarOverviewScreen,
      AvatarSetup: AvatarSetupScreen,
      AvatarAttack: AvatarAttackScreen
    }),
    tournamentFlow: createStackNavigator({
      TournamentList: TournamentListScreen,
      TournamentDetail: TournamentDetailScreen,
      TournamentCreate: TournamentCreateScreen,
      TournamentResult: TournamentResultScreen
    })
  },
  {
    initialRouteName: "avatarFlow",
    defaultNavigationOptions: {
      title: "Whawhai"
    }
  }
);
const App = createAppContainer(navigator);

export default () => {
  return (
    <AvatarProvider>
      <TournamentProvider>
        <App
          ref={navigator => {
            setNavigator(navigator);
          }}
        />
      </TournamentProvider>
    </AvatarProvider>
  );
};
