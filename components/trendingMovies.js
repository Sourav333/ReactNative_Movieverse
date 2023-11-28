import { View, Text,TouchableWithoutFeedback, Dimensions,Image } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../api/moviedb';

var {width,height} = Dimensions.get('window');

export default function TrendingMovies({data}) {
    const navigation = useNavigation();
    const handelClick = (item)=>{
        navigation.navigate('Movie',item);
    }
  return (
    <View style={{marginBottom:8}}>
      <Text style={styles.text}>Trending</Text>
      <Carousel 
        data={data}
        renderItem={({item})=> <MovieCard item={item} handelClick={handelClick}/>}
        firstItem={1}
        inactiveSlideOpacity={0.60}
        sliderWidth={width}
        itemWidth={width*0.62}
        slideStyle={{display:'flex',alignItems:'center'}}
      />
    </View>
  )
}

const styles= StyleSheet.create(
    {
        text: {
            color: 'white',        // Equivalent to text-white
            fontSize: 20,          // Equivalent to text-3xl
            fontWeight: 'bold',    // Equivalent to font-bold
            marginHorizontal: 16,
            marginBottom:16
          },

    }
)

const MovieCard = ({item,handelClick}) => {
    // console.log('items.poster_path:', item.poster_path)
    return(
        <TouchableWithoutFeedback onPress={() =>handelClick(item)}>
            <Image
                // source={require('../assets/pathan.jpeg')}
                source={{uri:image500(item.poster_path)}}
                style={{
                    width: width*0.6,
                    height: height *0.4,
                    borderRadius: 24
                }}
            />
        </TouchableWithoutFeedback>
    )
}