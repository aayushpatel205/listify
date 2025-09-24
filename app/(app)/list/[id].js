import React, { useState, useRef } from "react";
import { View, TextInput, Text, Modal, TouchableOpacity } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { Entypo } from "@expo/vector-icons";
import { ColorPicker } from "reanimated-color-picker";
import ListItem from "../../../components/ListItem";
import ListActionSheet from "../../../components/ListActionSheet";
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
  const qrSheetRef = useRef(null);
  const listSheetRef = useRef(null);

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ marginTop: 10, padding: 10 }}>
        {/* Top Row Icons */}
        <View
          style={{
            marginBottom: 5,
            flexDirection: "row",
            gap: 15,
            alignSelf: "flex-end",
            alignItems: "center",
          }}
        >
          <Entypo
            onPress={() => listSheetRef.current?.open()}
            name="add-to-list"
            size={30}
            color="#007AFF"
          />
          <Entypo
            onPress={() => qrSheetRef.current?.open()}
            name="share"
            size={30}
            color="#007AFF"
          />

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

        <TextInput
          maxLength={12}
          style={{ fontSize: 34, fontFamily: "Poppins_600SemiBold" }}
          placeholder="Enter list name..."
        />

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
      <QRShare ref={qrSheetRef} />
      <ListActionSheet ref={listSheetRef} />
    </View>
  );
}
