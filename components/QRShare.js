import React, { useRef } from "react";
import { View, Button, Modal, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import Share from "react-native-share";

export default function QRShare({ visible , setVisible }) {
  const qrRef = useRef(null);
  //   const [visible, setVisible] = React.useState(false);

  const shareQR = async () => {
    qrRef.current.toDataURL(async (data) => {
      const base64Image = `data:image/png;base64,${data}`; // 👈 add prefix
      const shareOptions = {
        title: "Share via",
        url: base64Image, // now valid
        message: "Scan this QR code!",
      };
      try {
        await Share.open(shareOptions);
      } catch (err) {
        console.log("Error =>", err);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Show QR & Share" onPress={() => setVisible(true)} />

      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <QRCode
            value="https://example.com"
            size={200}
            getRef={(c) => (qrRef.current = c)}
          />

          <View style={{ marginTop: 20 }}>
            <Button title="Share QR" onPress={shareQR} />
          </View>

          <View style={{ marginTop: 20 }}>
            <Button title="Close" onPress={() => setVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
