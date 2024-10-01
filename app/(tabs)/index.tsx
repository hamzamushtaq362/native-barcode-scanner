import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Linking } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import AgreementBarcode from "../../components/AgreementBarcode";
import axios from "axios";

export default function App() {
  const [hasPermission, setHasPermission] = useState<any>(null);
  const [scanned, setScanned] = useState<any>(false);
  const [showScanner, setShowScanner] = useState(false);
  const [agreementCode, setAgreementCode] = useState(
    "AGREEMENT-Hamza-1727770819062"
  ); // Example code, you can fetch this from backend

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }: any) => {
    setScanned(true);

    try {
      // Make a request to verify the agreement code using Axios
      const response = await axios.get(
        `http://192.168.0.112:5000/api/client-agreement/verify-code/${data}`
      );

      if (response.status === 200) {
        alert(`Agreement code ${data} is valid! Redirecting...`);
        // You can redirect the user to your website here
        // For example, use Linking to open the URL
        Linking.openURL("https://yourwebsite.com");
      }
    } catch (error) {
      alert(`Invalid agreement code: ${data}`);
      console.error("Error verifying agreement code:", error);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!showScanner ? (
        <>
          {/* Display the Barcode */}
          <AgreementBarcode agreementCode={agreementCode} />
          <Button title="Scan Barcode" onPress={() => setShowScanner(true)} />
        </>
      ) : (
        <>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          {scanned && (
            <Button
              title={"Tap to Scan Again"}
              onPress={() => setScanned(false)}
            />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
