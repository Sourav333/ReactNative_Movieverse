import { View,Image, Text, ScrollView } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { fallbackPersonImage, image185 } from '../api/moviedb';

export default function cast({cast,navigation}) {
    let personName = 'Keanu Reevs';
    let characterName = 'John Wick';
  return (
    <View style={{marginVertical: 12}}>
      <Text style={{
         color: 'white',
         fontSize: 18, // Adjust the value based on your design
         marginHorizontal: 16,
         marginBottom: 10, // Adjust the value based on your design
      }}>Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 15}}
      >{
        cast && cast.map((person,index) => {
            return (
                <TouchableOpacity
                    key={index}
                    style={{
                        marginRight: 16, // Adjust the value based on your design
                        alignItems: 'center',
                    }}
                    onPress={()=>navigation.navigate('Person',person)}
                >   
                <View
                    style={{
                        overflow: 'hidden',
                        borderRadius: 80, // Half of the desired height/width for a full circle effect
                        height: 77,
                        width: 77,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: '#B8C2CC',
                    }}
                >
                    <Image 
                        style={{
                            borderRadius: 16, // Adjust the borderRadius as needed
                            height: 82,
                            width: 80,
                        }}
                        // source={require('../assets/keanu.jpeg')}
                        source={{uri:image185(person?.profile_path)|| fallbackPersonImage}}
                    />
                    </View>
                    <Text style={{
                         color: 'white',
                         fontSize: 14, // Adjust the value based on your design
                         marginTop: 1, // Adjust the value based on your design
                         marginBottom:3
                    }}>{
                        person?.character.length > 10 ? person?.character.slice(0,10)+'...':person?.character
                    }
                        </Text>
                    <Text style={{
                         color: '#A5A5A5',
                         fontSize: 14, // Adjust the value based on your design
                         marginTop: 1, // Adjust the value based on your design
                    }}>{
                        person?.original_name.length > 10 ? person?.original_name.slice(0,10)+'...':person?.original_name
                    }
                    </Text>
                </TouchableOpacity>
            )
        })
    }
      </ScrollView>
    </View>
  )
}