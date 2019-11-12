import { createAppContainer } from "react-navigation";
import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import AvatarOverviewScreen from "./src/screens/avatar/AvatarOverviewScreen";
import AvatarSetupScreen from "./src/screens/avatar/AvatarSetupScreen";
import AvatarAttackScreen from "./src/screens/avatar/AvatarAttackScreen";
import {Provider as AvatarProvider} from "./src/context/AvatarContext"

const navigator = createStackNavigator(
  {
    AvatarOverview: AvatarOverviewScreen,
    AvatarSetup: AvatarSetupScreen,
    AvatarAttack: AvatarAttackScreen
  },
  {
    initialRouteName: "AvatarOverview",
    defaultNavigationOptions: {
      title: "WhaWhai"
    }
  }
);
const App = createAppContainer(navigator);

export default () => {
  return (
    <AvatarProvider>
      <App />
      </AvatarProvider>
  );
};
