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
    imageBase64: null
  }

  componentDidMount() {
    ZebraScanners.hello('world')
    console.log(ZebraScanners)
    ZebraScanners.getPairingBarCode({
      protocol: 'STC_SSI_BLE',
      width: 300,
      height: 100
    })
      .then((data) => {
        this.setState({ imageBase64: data })
        console.log(data)
      })
      .catch(() => console.log('error'))
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
        {this.state.imageBase64 ? (
          <Image style={{width: 300, height: 100, borderWidth: 1, borderColor: 'red'}} source={{uri: `data:image/png;base64,${this.state.imageBase64}`}}/>
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
