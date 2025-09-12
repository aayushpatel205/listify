import React from "react";
import { Text } from "react-native";

// Map numeric weights to Poppins font family names
const fontWeights = {
  100: "Poppins_100Thin",
  200: "Poppins_200ExtraLight",
  300: "Poppins_300Light",
  400: "Poppins_400Regular",
  500: "Poppins_500Medium",
  600: "Poppins_600SemiBold",
  700: "Poppins_700Bold",
  800: "Poppins_800ExtraBold",
  900: "Poppins_900Black",
};

const CustomText = ({ children, weight = "400", style, ...props }) => {
  return (
    <Text
      style={[{ fontFamily: fontWeights[weight] || fontWeights["400"] }, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default CustomText;
