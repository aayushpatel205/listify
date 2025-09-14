import React from "react";
import { Text, View, Pressable } from "react-native";
import CustomText from "./CustomText";
import Feather from "react-native-vector-icons/Feather";
import styled from "styled-components";
import { Link } from "expo-router";

const MainCard = styled(Pressable)`
  width: 95%;
  padding: 15px 10px;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LeftRow = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const TextColumn = styled.View`
  flex: 1;
`;

const ListCard = () => {
  return (
    <Link href={"/list/123"} asChild>
      <MainCard>
        <LeftRow>
          <Feather
            name="home"
            size={22}
            color="#4a4a4a"
            style={{ marginRight: 12 }}
          />
          <TextColumn>
            <CustomText weight="600" style={{ fontSize: 18 }}>
              Home
            </CustomText>
            <CustomText style={{ color: "#a9a9a9", fontSize: 14 }}>
              10 products
            </CustomText>
          </TextColumn>
        </LeftRow>
        <Feather name="chevron-right" size={25} color="#a9a9a9" />
      </MainCard>
    </Link>
  );
};

export default ListCard;
