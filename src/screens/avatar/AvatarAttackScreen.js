import React, { useContext } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Context as AvatarContext } from "../../context/AvatarContext";
import * as Constants from "../../constants/avatarConstants";
import Avatar from "../../components/Avatar";
import { ListItem } from "react-native-elements";

const AvatarAttackScreen = ({navigation}) => {
  const { state, changeAttack } = useContext(AvatarContext);
  const attackNumber = navigation.getParam('item') 
  const avatarAttack = [];
  for (i = 0; i < 3; i++) {
    avatarAttack.push(i);
  }

  return (
    <View>
      <Avatar
        name={Constants.AVATAR[state.warrior.type].name}
        imageSource={Constants.AVATAR[state.warrior.type].image}
      />
      <FlatList
        data={avatarAttack}
        keyExtractor={attack => `${attack}`}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                changeAttack( attackNumber, item);
                navigation.navigate("AvatarOverview");
              }}
            >
              <ListItem
                chevron={{ size: 30 }}
                title={Constants.AVATAR[state.warrior.type].attacks[item]}
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

AvatarAttackScreen.navigationOptions = () => {
  return {
    headerTitleStyle: {
      textAlign: "center",
      flex: 1,
      marginRight: 70 
    },
    headerTitle: "Attacks",
  };
};

const styles = StyleSheet.create({
  listItemStyle: {
    borderColor: "#E0E0E0",
    borderWidth: 1,
    marginHorizontal: 30
  }
});

export default AvatarAttackScreen;
