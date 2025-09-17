// QRShare.js
import React, { useRef, forwardRef, useImperativeHandle, useState } from "react";
import ActionSheet from "react-native-actions-sheet";
import QRCode from "react-native-qrcode-svg";
import Share from "react-native-share";
import styled from "styled-components/native";
import CustomText from "./CustomText";

const Button = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 10px;
  justify-content: center;
  border-radius: 10px;
  background-color: #007aff;
  width: 50%;
`;

const QRShare = forwardRef((props, ref) => {
  const actionSheetRef = useRef(null);
  const qrRef = useRef(null);
  const [qrValue] = useState("https://example.com");

  const shareQR = async () => {
    qrRef.current.toDataURL(async (data) => {
      const shareOptions = {
        title: "Share QR",
        url: `data:image/png;base64,${data}`,
        type: "image/png",
        message: "Scan this QR code!",
      };
      try {
        await Share.open(shareOptions);
      } catch (err) {
        console.log("Share error", err);
      }
    });
  };

  // expose methods to parent
  useImperativeHandle(ref, () => ({
    open: () => actionSheetRef.current?.show(),
    close: () => actionSheetRef.current?.hide(),
  }));

  return (
    <ActionSheet
      ref={actionSheetRef}
      gestureEnabled
      containerStyle={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
    >
      <SheetContent>
        <Title>Share</Title>
        <QRCode value={qrValue} size={180} getRef={(c) => (qrRef.current = c)} />
        <CodeText>
          CODE LIST: <Bold>XHD•RB•Z</Bold>
        </CodeText>
        <Button style={{ marginTop: 15 }} onPress={shareQR}>
          <CustomText style={{ color: "white", fontSize: 18 }}>Share QR</CustomText>
        </Button>
      </SheetContent>
    </ActionSheet>
  );
});

export default QRShare;

// styled
const SheetContent = styled.View`
  align-items: center;
  padding: 20px;
`;
const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
`;
const CodeText = styled.Text`
  margin-top: 12px;
  font-size: 14px;
  color: #333;
`;
const Bold = styled.Text`
  font-weight: 700;
`;
