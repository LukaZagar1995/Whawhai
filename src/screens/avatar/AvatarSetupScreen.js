import React, { useContext } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Avatar from "../../components/Avatar";
import { Context as AvatarContext } from "../../context/AvatarContext";
import * as Constants from "../../constants/avatarConstants";

const AvatarSetupScreen = ({ navigation }) => {
  const { changeAvatarType } = useContext(AvatarContext);

  const avatars = [];
  for (i = 0; i < 5; i++) {
    avatars.push(i);
  }

  return (
    <View style={styles.containerStyle}>
      <FlatList
        data={avatars}
        keyExtractor={avatar => `${avatar}`}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                changeAvatarType(item);
                navigation.navigate("AvatarOverview");
              }}
            >
              <Avatar
                name={Constants.AVATAR[item].name}
                imageSource={Constants.AVATAR[item].image}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

AvatarSetupScreen.navigationOptions = () => {
  return {
    headerTitleStyle: {
      textAlign: "center",
      flex: 1,
      marginRight: 70 
    },
    headerTitle: "Warriors",
  };
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1
  }
});

export default AvatarSetupScreen;
