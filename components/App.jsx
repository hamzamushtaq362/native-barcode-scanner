import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";
import AgreementBarcode from "./AgreementBarcode"; // Import the barcode component
import AgreementScanner from "./AgreementScanner"; // Import the scanner component

export default function App() {
  const [showScanner, setShowScanner] = useState(false);
  const [agreementCode, setAgreementCode] = useState("AGREEMENT12345"); // Example code, you can fetch this from backend

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>React Native Barcode Scanner and Generator</Text>

        {!showScanner ? (
          <>
            {/* Display the Barcode */}
            <AgreementBarcode agreementCode={agreementCode} />
            <Button title="Scan Barcode" onPress={() => setShowScanner(true)} />
          </>
        ) : (
          <>
            {/* Display the Barcode Scanner */}
            <AgreementScanner />
            <Button title="Go Back" onPress={() => setShowScanner(false)} />
          </>
        )}

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
  },
});
