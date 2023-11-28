import { View, Text } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';

var {width,height} =Dimensions.get('window');

export default function loading() {
  return (
    <View style={{
        position: 'absolute', // Equivalent to absolute
    flexDirection: 'row', // Equivalent to flex-row
    justifyContent: 'center', // Equivalent to justify-center
    alignItems: 'center', // Equivalent to items-center
    height,
    width
    }}>
      <Progress.CircleSnail thickness={12} size={160} color={['red', 'green', 'blue']} />
    </View>
  )
}