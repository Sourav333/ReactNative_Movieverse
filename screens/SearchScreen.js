import { View,Image, Text, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { useCallback } from 'react'
import { Dimensions } from 'react-native';
import { TextInput } from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { useState } from 'react';
import Loading from '../components/loading';
import { debounce } from 'lodash'
import { fallbackMoviePoster, fallbackPersonImage, image185, searchMovies } from '../api/moviedb';


var {width,height} =Dimensions.get('window');

export default function SearchScreen() {
    const navigation = useNavigation();
    const [results,setResults]=useState([])
    const [loading,setLoading]= useState(false)
    let movieName = 'Pathan meri jan meri jab ban jayga'
    const handleSearch = value =>{
        // console.log('value',value)
        if(value && value.length>2){
            setLoading(true);
            searchMovies({
                query: value, //value should not be in bracket
                include_adult: 'false', 
                language: 'en-US', 
                page: '1'
            }).then(data=>{
                setLoading(false);
                // console.log('got movies ',data);
                if(data && data.results) setResults(data.results)
            })
        }else{
            setLoading(false)
            setResults([])
        }
    }// this search will print all characters while typing so we need to debounce
    const handelTextDebounce = useCallback(debounce(handleSearch, 400), []);
  return (
    <SafeAreaView style={{
        flex: 1, // Equivalent to flex-1
    backgroundColor: 'rgba(28, 28, 30, 1)',
    }}>
      <View style={{
        marginHorizontal: 16, // Equivalent to mx-4
        marginBottom: 12, // Equivalent to mb-3
        flexDirection: 'row', // Equivalent to flex-row
        justifyContent: 'space-between', // Equivalent to justify-between
        alignItems: 'center', // Equivalent to items-center
        borderWidth: 1, // Equivalent to border
        borderColor: 'rgba(158, 158, 158, 1)', // Equivalent to border-neutral-500
        borderRadius: 999, // A large value to make it look like rounded-full
      }}>
        <TextInput
            onChangeText={handelTextDebounce}
            placeholder='Search Movie'
            placeholderTextColor={'lightgray'}
            style={{
                paddingBottom: 2, // Equivalent to pb-1
                paddingLeft: 24, // Equivalent to pl-6
                flex: 1, // Equivalent to flex-1
                fontSize: 16, // Equivalent to text-base
                fontWeight: 'bold', // Equivalent to font-semibold
                color: 'white', // Equivalent to text-white
                letterSpacing: 1, // Equivalent to tracking-wider
            }}
        />
        <TouchableOpacity
            onPress={()=>navigation.navigate('Home')}
            style={{
                borderRadius: 999, // A large value to make it look like rounded-full
                padding: 12, // Equivalent to p-3
                margin: 4, // Equivalent to m-1
                backgroundColor: 'rgba(158, 158, 158, 1)', // Equivalent to bg-neutral-500, replace with your actual color
            }}
        >
            <XMarkIcon size='25' color='white'/>
        </TouchableOpacity>
      </View>
      {/* result */}
      {
        loading ? (
            <Loading/>
        ) : 
        results.length>0 ? (
            <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 15}}
            style={{
                marginBottom: 12,
            }}
          >
            <Text style={{
                color: 'white', // Equivalent to text-white
                fontWeight: 'bold', // Equivalent to font-semibold
                marginLeft: 4, // Equivalent to ml-1
                marginBottom:8
            }}>Results ({results.length})</Text>
            <View style={{
                flexDirection: 'row', // Equivalent to flex-row
                justifyContent: 'space-between', // Equivalent to justify-between
                flexWrap: 'wrap', // Equivalent to flex-wrap
            }}>
                {
                    results.map((item,index)=>{
                        return(
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={()=>navigation.push("Movie",item)}
                            >
                                <View style={{
                                    marginBottom: 8,
                                    marginTop:8
                                }}>
                                <Image
                                    style={{
                                        borderRadius: 24,
                                        width:width*0.44,
                                        height:height*0.3,
                                        marginBottom:6
                                    }}
                                    // source={require('../assets/pathan.jpeg')}
                                    source={{uri:image185(item?.poster_path) || fallbackMoviePoster}}
                                />
                                <Text
                                style={{
                                    color: 'rgba(158, 158, 158, 1)', // Equivalent to text-neutral-400
                                    marginLeft: 4, // Equivalent to ml-1
                                }}>
                                    {
                                        item?.title.length>22 ? item?.title.slice(0,22)+'...' : item?.title
                                    }
                                </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })
                }
            </View>
          </ScrollView>
        ) :
        (
            <View style={{
                flexDirection: 'row', // Equivalent to flex-row
                justifyContent: 'center', // Equivalent to justify-center
                marginTop:20
            }}
            >
                <Image source={require('../assets/movietime.png')}/>
            </View>
        )
      }
   
    </SafeAreaView>
  )
}