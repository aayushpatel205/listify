import { Redirect } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { Text, View, ActivityIndicator, ScrollView } from "react-native";
import CustomText from "../../components/CustomText";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components";
import ProfileIcon from "../../components/ProfileIcon";
import ListCard from "../../components/ListCard";
import Navbar from "../../components/Navbar";

const NavView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 10px 5px 10px;
  border-bottom-color: #e0e0e0;
  border-bottom-width: 1px;
  background-color: #fff;

  /* Shadow */
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  shadow-offset: 0px 2px;
  elevation: 3;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

export default function Index() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size={50} color="#007AFF" />
      </View>
    );
  }

  if (!isSignedIn) {
    return <Redirect href="/login" />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Fixed Nav */}
      <Navbar/>

      {/* Scrollable content */}
      <ScrollView
        contentContainerStyle={{
          paddingTop: 70, // same height as NavView to avoid overlap
          paddingBottom: 20,
          alignItems: "center",
        }}
      >
        <CustomText
          weight="600"
          style={{
            alignSelf: "flex-start",
            fontSize: 35,
            margin: 15,
          }}
        >
          Shopping List
        </CustomText>

        <View style={{ flexDirection: "column", gap: 20 }}>
          <ListCard />
          <ListCard />
          <ListCard />
          <ListCard />
          <ListCard />
        </View>
      </ScrollView>
    </View>
  );
}
