import React, { useState, useRef } from "react";
import { Text, View, TextInput } from "react-native";
import styled from "styled-components";
import { Link } from "expo-router";
import CustomText from "../../components/CustomText";
import { Feather } from "@expo/vector-icons";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

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
`;

const SmallInputBox = styled(InputBox)`
  width: 55px;
  height: 60px;
  justify-content: center;
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
`;

const SignUpPage = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isPendingVerification, setIsPendingVerification] = useState(true); // toggle for testing
  const [code, setCode] = useState(["", "", "", "", "", ""]); // 6 boxes

  const inputs = Array.from({ length: 6 }, () => useRef(null));

  const handleChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      inputs[index + 1].current.focus();
    }
  };

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        username: userDetails.username,
        emailAddress: userDetails.email,
        password: userDetails.password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setIsPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    const joinedCode = code.join("");

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: joinedCode
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/second");
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (isPendingVerification) {
    return (
      <Container>
        <CustomText weight="600" style={{ fontSize: 40, marginTop: 10 }}>
          Enter Verification Code
        </CustomText>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
            gap: 10,
          }}
        >
          {code.map((digit, index) => (
            <SmallInputBox key={index}>
              <TextInput
                ref={inputs[index]}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                style={{
                  fontSize: 24,
                  textAlign: "center",
                  width: "100%",
                }}
                maxLength={1}
                keyboardType="numeric"
              />
            </SmallInputBox>
          ))}
        </View>

        <Button onPress={onVerifyPress} style={{ marginTop: 30 }}>
          <Text style={{ color: "#fff", fontSize: 18 }}>Verify</Text>
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <CustomText
        weight="600"
        style={{ fontSize: 45, marginBottom: 20, marginTop: 10 }}
      >
        SignUp
      </CustomText>

      <View style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <InputBox>
          <TextInput
            onChangeText={(text) =>
              setUserDetails({ ...userDetails, username: text })
            }
            placeholder="Enter username..."
            style={{ fontSize: 17, width: "90%" }}
          />
          <Feather name="user" size={26} color="black" />
        </InputBox>

        <InputBox>
          <TextInput
            onChangeText={(text) =>
              setUserDetails({ ...userDetails, email: text })
            }
            placeholder="Enter email..."
            style={{ fontSize: 17, width: "90%" }}
          />
          <Feather name="mail" size={24} color="black" />
        </InputBox>

        <InputBox>
          <TextInput
            onChangeText={(text) =>
              setUserDetails({ ...userDetails, password: text })
            }
            placeholder="Enter password..."
            secureTextEntry
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
            Already have an account?
          </CustomText>
          <Link href="/login">
            <CustomText weight="600" style={{ fontSize: 14, color: "#007aff" }}>
              Login
            </CustomText>
          </Link>
        </View>
      </View>

      <Button onPress={onSignUpPress} style={{ marginTop: 20 }}>
        <Text style={{ color: "#fff", fontSize: 18 }}>Create Account</Text>
      </Button>
    </Container>
  );
};

export default SignUpPage;
