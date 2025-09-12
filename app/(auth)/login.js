import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components";
import { Link } from "expo-router";
import CustomText from "../../components/CustomText";

const Container = styled.View`
    flex: 1;
    background-color: #fff;
    padding: 30px 20px;
`;

const LoginPage = () => {
  return (
      <Container>
        <CustomText weight="600" style={{fontSize: 45}}>Login</CustomText>
        <Link href={"/signup"}/>
      </Container>
  );
};

export default LoginPage;
