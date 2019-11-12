import React from "react";
import Image from "react-native-remote-svg";
import { View, StyleSheet, Text } from "react-native";

const Avatar = ({ name, imageSource }) => {
  
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.nameStyle}>{name}</Text>
      <Image source={imageSource} style={styles.imageStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle:{
    borderColor: '#E0E0E0',
    borderBottomWidth: 1
  },
  imageStyle: {
    height: 200,
    alignSelf: "center",
    marginBottom: 20
  },
  nameStyle: {
    //fontFamily: "bangers-regular"
    alignSelf: 'center',
    margin: 20
  }
});

export default Avatar;
