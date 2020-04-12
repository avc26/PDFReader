/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import { Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Pdf from 'react-native-pdf';

const App: () => React$Node = () => {
  const [source, setSource] = React.useState(null);

  const open = React.useCallback(() => {
    const filePicker = async () => {
      const file = await DocumentPicker.pick({ type: ['application/pdf', 'kUTTypePDF', 'com.adobe.pdf', '.pdf'] });
      setSource({ uri: file.uri });
    };

    filePicker();
  }, []);

  const close = React.useCallback(() => {
    setSource(null);
  }, [setSource]);

  const pdf = source ?
    <>
      <Pdf
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          console.log(`Link press: ${uri}`);
        }}
        style={styles.pdf}
      />
      <View style={{ position: 'absolute', bottom: 50 }}>
        <TouchableOpacity onPress={close} style={styles.button}>
          <Text style={styles.buttonText}>Închide PDF</Text>
        </TouchableOpacity>
      </View>
    </>
    :
    <>
      <TouchableOpacity onPress={open} style={styles.button}>
        <Text style={styles.buttonText}>Deschide PDF</Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 10 }}>Elaborat de Anastasia Croitor</Text>
    </>
    ;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {pdf}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 250,
    height: 60,
    borderRadius: 10,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});

export default App;
