import React from "react";
import { BarCodeScanner } from 'expo-barcode-scanner';
import {Text, View, StyleSheet, Alert } from "react-native";

styles = StyleSheet.create({
    cameraContainer: {
        margin:0,
        height: '115%',
        padding: 0
    }
})

const CalfificarComponent = props => {

    const { hasCameraPermission, scanned } = props;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
           <View style={{flex:1}}>
                
                { !props.ok && !props.hasQrCode && (
                   <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : props.handleBarCodeScanned}
                    style={[StyleSheet.absoluteFillObject, styles.cameraContainer]}
                    />
                )}
                {props.ok && props.valid && (<Text>{props.code}</Text>)}
                {props.ok && !props.valid && (Alert.alert('Codigo invalido', 
                'El cosigo QR escaneado no es valido', 
                [{text: 'Scanear', onPress: () => props.scanear()}]))}
           </View>
    )
}

export default CalfificarComponent