import React from "react";
import CustomText from "./CustomText";
import ProfileIcon from "./ProfileIcon";
import styled from "styled-components";
import { View } from "react-native";
import { Feather } from "@expo/vector-icons";

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

const Navbar = () => {
  return (
    <NavView>
      <ProfileIcon />
      <View style={{ display: "flex", flexDirection: "row" }}>
        <CustomText weight="700" style={{ fontSize: 32, color: "#007AFF" }}>
          List
        </CustomText>
        <CustomText weight="700" style={{ fontSize: 32 }}>
          ify
        </CustomText>
      </View>
      <View style={{ marginBottom: 3 }}>
        <Feather name="plus" size={35} color="#007AFF" />
      </View>
    </NavView>
  );
};

export default Navbar;
