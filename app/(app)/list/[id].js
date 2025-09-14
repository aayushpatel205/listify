import React, { useState } from "react";
import { View, TextInput, Text, Modal, TouchableOpacity } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import Entypo from "react-native-vector-icons/Entypo";
import EmojiSelector from "react-native-emoji-selector";
import { ColorPicker } from "reanimated-color-picker";
import ListItem from "../../../components/ListItem";
import QRShare from "../../../components/QRShare";

export default function MyInput() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  const [emoji, setEmoji] = useState("😀");
  const [bgColor, setBgColor] = useState("#7D4CDB"); // default purple
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [visible , setVisible] = useState(false)

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ marginTop: 10, padding: 10 }}>
        {/* Top Row Icons */}
        <View
          style={{
            marginBottom: 10,
            flexDirection: "row",
            gap: 15,
            alignSelf: "flex-end",
            alignItems: "center",
          }}
        >
          <Entypo name="add-to-list" size={30} color="#007AFF" />
          <Entypo onPress={() => setVisible(true)} name="share" size={30} color="#007AFF" />

          {/* Emoji Button */}
          {/* <TouchableOpacity onPress={() => setEmojiPickerVisible(true)}>
            <Text
              style={{
                fontSize: 28,
                borderWidth: 2,
                borderColor: "#A020F0",
                borderRadius: 20,
                padding: 3,
              }}
            >
              {emoji}
            </Text>
          </TouchableOpacity> */}

          {/* Color Button */}
          {/* <TouchableOpacity onPress={() => setColorPickerVisible(true)}>
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                borderWidth: 2,
                borderColor: "#A020F0",
                backgroundColor: bgColor,
              }}
            />
          </TouchableOpacity> */}
        </View>

        {/* Title Input */}
        <View>
          <TextInput
            maxLength={15}
            style={{
              fontSize: 32,
              fontWeight: "600",
              fontFamily: "Poppins_600SemiBold",
            }}
            placeholder="Enter list name..."
          />
        </View>

        {/* Items */}
        <View style={{ display: "flex", paddingLeft: 10 }}>
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
        </View>
      </View>

      {/* Emoji Picker Modal */}
      {/* Emoji Picker Modal */}

      {/* {emojiPickerVisible && (
        <EmojiSelector
          onEmojiSelected={(emoji) => {
            setEmoji(emoji);
            setTimeout(() => setEmojiPickerVisible(false), 0); // <-- fix loop crash
          }}
        />
      )} */}

      {/* Color Picker Modal */}
      {/* <Modal visible={colorPickerVisible} animationType="slide">
        <View style={{ flex: 1 }}>
          <ColorPicker
            style={{ flex: 1 }}
            value={bgColor}
            onComplete={(color) => {
              setBgColor(color.hex);
              setColorPickerVisible(false);
            }}
          />
        </View>
      </Modal> */}
      {/* <QRShare visible={visible} setVisible={setVisible}/> */}
    </View>
  );
}
