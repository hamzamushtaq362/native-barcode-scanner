import React from "react";
import { View, Text, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";

const AgreementBarcode = ({ agreementCode }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agreement Barcode</Text>
      <QRCode
        value={agreementCode} // The unique agreement code from backend
        size={200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default AgreementBarcode;
