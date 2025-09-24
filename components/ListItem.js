import React, { useState, useRef } from "react";
import { TouchableOpacity, View } from "react-native";
import CustomText from "./CustomText";
import Checkbox from "expo-checkbox";
import styled from "styled-components";
import EditItemSheet from "./EditItemSheet";

const ListItemContainer = styled.View`
  display: flex;
  border-bottom-color: #e0e0e0;
  width: 95%;
  border-bottom-width: 1px;
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
`;

const ListItem = () => {
  const [isChecked, setIsChecked] = useState(false);
  const sheetRef = useRef(null);

  return (
    <>
      <TouchableOpacity onLongPress={() => sheetRef.current?.show()}>
        <View>
          <ListItemContainer>
            <Checkbox
              color={"#007AFF"}
              value={isChecked}
              onValueChange={() => setIsChecked(!isChecked)}
            />

            <CustomText
              style={{
                padding: 7,
                fontSize: 21,
                color: isChecked ? "#A9A9A9" : "#000", // gray if checked
                textDecorationLine: isChecked ? "line-through" : "none", // strike if checked
              }}
            >
              Milk
            </CustomText>
          </ListItemContainer>
        </View>
      </TouchableOpacity>
      <EditItemSheet ref={sheetRef} />
    </>
  );
};

export default ListItem;
