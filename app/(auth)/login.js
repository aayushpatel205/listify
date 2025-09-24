import React, { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components";
import { Link } from "expo-router";
import CustomText from "../../components/CustomText";
import { Feather } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 30px 20px;
`;

const InputBox = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 15px;
  justify-content: space-between;
  border-radius: 10px;
  background-color: #f2f2f7;
  width: 100%;
  font-size: 17px;
`;

const Button = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 15px;
  justify-content: center;
  border-radius: 10px;
  background-color: #007aff;
  width: 100%;
  font-size: 17px;
`;

const LoginPage = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const { isSignedIn } = useAuth();
  const [error, setError] = useState(null);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  if (!isLoaded) return null;

  if(isSignedIn) return <Redirect href="/"/>


  const userLogin = async () => {
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: userDetails.email,
        password: userDetails.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        console.log("Login successful ✅");
        return <Redirect href={"/list"} />;
      } else {
        console.log("Additional steps required:", result);
      }
    } catch (err) {
      console.log(err);
      setError(err.errors[0]?.message || "Login failed");
    }
  };

  return (
    <Container>
      <CustomText
        weight="600"
        style={{ fontSize: 45, marginBottom: 20, marginTop: 10 }}
      >
        Login
      </CustomText>

      <View style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <InputBox>
          <TextInput
            onChangeText={(text) => {
              setUserDetails({ ...userDetails, email: text });
            }}
            placeholder="Enter email..."
            style={{ fontSize: 17, width: "90%" }}
          />
          <Feather name="mail" size={24} color="black" />
        </InputBox>

        <InputBox>
          <TextInput
            onChangeText={(text) => {
              setUserDetails({ ...userDetails, password: text });
            }}
            placeholder="Enter password..."
            style={{ fontSize: 17, width: "90%" }}
          />
          <Feather name="lock" size={24} color="black" />
        </InputBox>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "flex-end",
            gap: 5,
          }}
        >
          <CustomText style={{ fontSize: 14 }}>
            Don't have an account?
          </CustomText>
          <Link href="/signup">
            <CustomText weight="600" style={{ fontSize: 14, color: "#007aff" }}>
              Signup
            </CustomText>
          </Link>
        </View>
      </View>

      <Button onPress={userLogin} style={{ marginTop: 20 }}>
        <Text style={{ color: "#fff", fontSize: 18 }}>Login</Text>
      </Button>

      <Link href={"/signup"} />
    </Container>
  );
};

export default LoginPage;
