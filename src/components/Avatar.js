import React,{useState} from "react";
import Image from "react-native-remote-svg";
import { View, StyleSheet, Text } from "react-native";
import * as Font from "expo-font";

const Avatar = ({ name, imageSource }) => {
   
  const [fontLoaded, setFontLoaded] = useState(false)
    loadFont = async () => {
      await Font.loadAsync({
        "bangers-regular": require("../../assets/fonts/Bangers-Regular.ttf")
      });
      setFontLoaded(true)
    };
    loadFont()

  if(!fontLoaded) {
    return null
  }
  
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
    fontFamily: "bangers-regular",
    alignSelf: 'center',
    fontSize: 20,
    color: 'grey',
    margin: 20
  }
});

export default Avatar;
