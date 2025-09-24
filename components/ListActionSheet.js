import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { TextInput } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import styled from "styled-components/native";
import { Ionicons as Icon } from "@expo/vector-icons";
import CustomText from "./CustomText";

const ListActionSheet = forwardRef(({ onCreateNew, onJoinList }, ref) => {
  const actionSheetRef = useRef(null);
  const [code, setCode] = useState("");

  // expose methods to parent
  useImperativeHandle(ref, () => ({
    open: () => actionSheetRef.current?.show(),
    close: () => actionSheetRef.current?.hide(),
  }));

  return (
    <ActionSheet
      ref={actionSheetRef}
      gestureEnabled
      containerStyle={{ borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 20 , paddingBottom: 25}}
    >
      <SheetContent>
        <CustomText weight="600" style={{ fontSize: 22, marginVertical: 10 }}>Create a new list</CustomText>

        {/* Shopping Cart Icon */}
        <Icon name="cart-outline" size={60} color="#007AFF" style={{ marginBottom: 20 }} />

        {/* Create Button */}
        <PrimaryButton onPress={onCreateNew}>
          <CustomText style={{ color: "white", fontSize: 17 }}>Create list</CustomText>
        </PrimaryButton>

        <CustomText style={{ fontSize: 18, marginVertical: 10 }}>Or</CustomText>

        {/* Join Input */}
        <CodeInput
          value={code}
          onChangeText={setCode}
          placeholder="Enter a list code"
          placeholderTextColor="#aaa"
        />

        {/* Join Button */}
        <SecondaryButton onPress={() => onJoinList?.(code)}>
          <CustomText style={{ color: "#007aff", fontSize: 17 }}>Join list</CustomText>
        </SecondaryButton>
      </SheetContent>
    </ActionSheet>
  );
});

export default ListActionSheet;

//
// Styled Components
//
const SheetContent = styled.View`
  align-items: center;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const PrimaryButton = styled.TouchableOpacity`
  background-color: #007aff;
  padding-vertical: 12px;
  padding-horizontal: 30px;
  border-radius: 10px;
  margin-bottom: 16px;
  width: 100%;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;

const OrText = styled.Text`
  margin: 8px 0;
  font-size: 14px;
  color: #888;
`;

const CodeInput = styled(TextInput)`
  border: 1px solid #ddd;
  border-radius: 10px;
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  font-size: 16px;
`;

const SecondaryButton = styled.TouchableOpacity`
  border: 1px solid #007aff;
  border-radius: 10px;
  margin-vertical: 10px;
  padding-vertical: 12px;
  padding-horizontal: 30px;
  width: 100%;
  align-items: center;
`;

const SecondaryText = styled.Text`
  color: #007aff;
  font-size: 16px;
  font-weight: 600;
`;
