import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  NativeModules,
  Image
} from 'react-native';
import ZebraScanners from 'react-native-zebra-scanners'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  state = {
    resetBarcode: null,
    btleSsiBarcode: null
  }

  componentDidMount() {
    console.log(ZebraScanners)
        
    ZebraScanners.getResetFactoryDefaultsBarcode({
      width: 300,
      height: 100
    })
      .then((data) => this.setState({ resetBarcode: data }))
      .catch(() => console.log('error'))

    ZebraScanners.getBtleSsiBarcode({
      width: 300,
      height: 100
    })
      .then((data) => this.setState({ btleSsiBarcode: data }))
      .catch(() => console.log('error'))

    ZebraScanners.addEventListener('SCANNER_APPEARED', this.handleScannerAppeared)
  }

  componentWillUnmount() {
    ZebraScanners.removeEventListener('SCANNER_APPEARED', this.handleScannerAppeared)
  }

  handleScannerAppeared = (scanner) => {
    console.log(scanner)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
        {this.state.resetBarcode ? (
          <Image style={{width: 300, height: 100, borderWidth: 1, borderColor: 'red'}} source={{uri: `data:image/png;base64,${this.state.resetBarcode}`}}/>
        ) : null}
        {this.state.btleSsiBarcode ? (
          <Image style={{width: 300, height: 100, borderWidth: 1, borderColor: 'red'}} source={{uri: `data:image/png;base64,${this.state.btleSsiBarcode}`}}/>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'purple',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
