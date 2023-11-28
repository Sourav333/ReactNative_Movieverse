import { View,Image, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { fallbackMoviePoster, image185 } from '../api/moviedb';

var {width,height} =Dimensions.get('window');

export default function movieList({title,data,hideSeeAll}) {
    let movieName = 'Pathan meri jan meri jab ban jayga'
    const navigation= useNavigation();
  return (
    <View style={{marginBottom:8,marginVertical: 16}}>
      <View style={{marginHorizontal: 16, flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',marginBottom:8}}>
        <Text style={{color:'white', fontSize: 20,}}>{title}</Text>
        {
            !hideSeeAll && (
                <TouchableOpacity>
                <Text style={{color:'yellow'}}>See All</Text>
            </TouchableOpacity>
            )
        }
       
      </View>
      {/* movie row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 15}}
      >
        {
            data.map((item,index)=>
            {
                return(
                    <TouchableWithoutFeedback
                        key={index}
                        onPress={()=>navigation.push('Movie',item)}
                        // push insted of navigate will open it to new page
                    >

                        <View style={{marginVertical: 4,marginRight: 16}}>
                            <Image
                                source={{uri:image185(item.poster_path) || fallbackMoviePoster}} 
                                // source={require('../assets/pathan.jpeg')}
                                style={{width: width*0.33,height:height*0.22,borderRadius: 24,marginBottom:6}}
                            />
                            <Text style={{color:'#d1d5db',marginLeft: 4}}>
                            {item.title && item.title.length > 14? item.title.slice(0,14)+'...': item.title}
                        </Text>
                        </View>
                        
                    </TouchableWithoutFeedback>
                )
            })
        }
        </ScrollView>
    </View>
  )
}