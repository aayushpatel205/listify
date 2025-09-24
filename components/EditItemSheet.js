import React, { useState } from "react";
import { TextInput, View } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import styled from "styled-components/native";
import CustomText from "./CustomText";
// import Entypo from "react-native-vector-icons/Entypo";

const EditItemSheet = React.forwardRef((props, ref) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <ActionSheet containerStyle={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 , paddingBottom: 20 }} ref={ref} gestureEnabled>
      <Container>
        <Header>
          <CustomText weight="600" style={{ fontSize: 22 }}>Edit Item</CustomText>
          {/* <Entypo style={{ position: "absolute", right: 0 , top: 0}} name="cross" size={25} color="black"/> */}
        </Header>

        <View style={{ display: "flex", gap: 20 }}>
          <View>
            <CustomText weight="600" style={{ fontSize: 20, marginBottom: 5 }}>
              Name
            </CustomText>
            <StyledInput value="Milk" editable={true} />
          </View>

          <View>
            <CustomText weight="600" style={{ fontSize: 20, marginBottom: 5 }}>
              Units
            </CustomText>
            <StyledInput placeholder="e.g. oz" />
          </View>

          <CustomText weight="600" style={{ fontSize: 20, marginBottom: 5 }}>
            Quantity
          </CustomText>
        </View>

        <QuantityRow>
          <CustomText weight="600" style={{ marginLeft: 5, fontSize: 22 }}>
            x{quantity}
          </CustomText>
          <QuantityControls>
            <QuantityButton
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <QuantityButtonText>−</QuantityButtonText>
            </QuantityButton>
            <QuantityButton onPress={() => setQuantity(quantity + 1)}>
              <QuantityButtonText>+</QuantityButtonText>
            </QuantityButton>
          </QuantityControls>
        </QuantityRow>

        <View style={{ marginTop: 20 }}>
          <CustomText weight="600" style={{ fontSize: 20 }}>
            Notes
          </CustomText>
          <NotesInput multiline placeholder="Write a note here..." />
        </View>
      </Container>
    </ActionSheet>
  );
});

export default EditItemSheet;

// Styled Components
const Container = styled.View`
  padding: 20px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  top: 2px;
`;

const CloseText = styled.Text`
  font-size: 20px;
  color: #555;
`;

const Label = styled.Text`
  font-size: 14px;
  margin-bottom: 6px;
  margin-top: 10px;
  color: #333;
`;

const StyledInput = styled.TextInput`
  border-radius: 10px;
  padding: 12px;
  background-color: #f6f6f8;
  font-size: 16px;
`;

const QuantityRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
`;

const QuantityText = styled.Text`
  font-size: 16px;
`;

const QuantityControls = styled.View`
  flex-direction: row;
`;

const QuantityButton = styled.TouchableOpacity`
  background-color: #f6f6f8;
  padding: 8px 16px;
  border-radius: 8px;
  margin-left: 8px;
`;

const QuantityButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const NotesInput = styled(TextInput)`
  border-radius: 10px;
  padding: 12px;
  background-color: #f6f6f8;
  font-size: 16px;
  min-height: 120px;
  text-align-vertical: top;
  margin-top: 8px;
`;
