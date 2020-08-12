import React from 'react';
import { Text, Image, View } from 'react-native';

const App = () => {
  return (
    <View style={{padding: 10, alignItems: "center"}}>
      <Image
        source={{
          uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
        }}
        style={{ width: 200, height: 200 }}
      />
      <Text>최치환</Text>
      <Text>iOS 앱을 출시해봅시다!!!</Text>
    </View>
  );
}

export default App;
