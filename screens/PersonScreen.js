import { View,Image, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image342 } from '../api/moviedb';

var {width,height} =Dimensions.get('window');
export default function PersonScreen() {
    const {params: item} = useRoute();
    const [isFavourite,toggleFavourite]=useState(false);
    const navigation=useNavigation();
    const [personMovies,setPersonMovies] = useState([])
    const [person,setPerson] = useState({})
    const [loading,setLoading]= useState(false)
    useEffect(()=>{
        setLoading(true);
        // console.log('person: ',item);
        getPersonDetails(item.id);
        getPersonMovies(item.id);
    },[])

    const getPersonDetails = async id=>{
        const data = await fetchPersonDetails(id);
        // console.log('got person details', data);
        if(data) setPerson(data);
        setLoading(false)
    }
    const getPersonMovies = async id=>{
        const data = await fetchPersonMovies(id);
        // console.log('got person movies', data);
        if(data && data.cast) setPersonMovies(data.cast);
        // setLoading(false)
    }
  return (
    <ScrollView
        style={{
            flex: 1,
            backgroundColor: '#1e1e1e',
        }}
        contentContainerStyle={{paddingBottom:20}}
    >
      {/* back button */}

      <SafeAreaView style={{
                // position: 'absolute',
                zIndex: 20,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 4,          
            }}>
                <TouchableOpacity 
                  onPress={()=>navigation.goBack()}
                  style={{
                     borderRadius: 10, // You can adjust the value based on your preference
                     padding: 1,
                     backgroundColor:'orange',
                     marginLeft:8
                }}>
                    <ChevronLeftIcon size='28' strokeWidth={2.5} color="white"/>
                </TouchableOpacity>
                <TouchableOpacity style={{marginRight:6}} onPress={()=>toggleFavourite(!isFavourite)}>
                    <HeartIcon size='35' color={isFavourite? 'red':'white'} />
                </TouchableOpacity>
            </SafeAreaView>
                {
                    loading ?(
                        <Loading/>
                    ) : (
                        <View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    shadowColor:'gray',
                    shadowRadius:40,
                    shadowOffset:{width:0,height:5},
                    shadowOpacity:1
                }}>
                    <View style={{
                    alignItems: 'center', // Equivalent to items-center
                    borderRadius: 999, // A large value to make it look like rounded-full
                    overflow: 'hidden',
                    height: 300,
                    width: 300,
                    borderWidth: 2,
                    borderColor: 'rgba(158, 158, 158, 1)', // Neutral color, you may need to replace this with
                    marginBottom:4
                }}>
                    <Image 
                    // source={require('../assets/keanu.jpeg')}
                    source={{uri:image342(person?.profile_path)||fallbackPersonImage}}
                    style={{
                        height:height*0.43,width:width*0.74
                    }}
                />
                </View>
            </View>
                <View style={{
                    marginTop:6,
                }}><Text style={{
                    fontSize: 24, // Equivalent to text-3xl in Tailwind CSS
                    color: 'white', // Equivalent to text-white
                    fontWeight: 'bold', // Equivalent to font-bold
                    textAlign: 'center', // Equivalent to text-center
                }}>
                    {
                        person?.name
                    }
                    </Text>
                    <Text style={{
                         fontSize: 16, // Equivalent to text-base in Tailwind CSS
                         color: 'rgba(158, 158, 158, 1)', // Equivalent to text-neutral-500
                         textAlign: 'center', // Equivalent to text-center
                         marginBottom:6
                    }}>{
                        person?.place_of_birth
                    }
                    </Text>
                </View>
                <View style={{
                    flexDirection: 'row', // Equivalent to flex-row
                    justifyContent: 'space-between', // Equivalent to justify-between
                    alignItems: 'center', // Equivalent to items-center
                    backgroundColor: 'rgba(158, 158, 158, 0.3)', // Equivalent to bg-neutral-700, replace with your actual color
                    borderRadius: 999, // A large value to make it look like rounded-full
                    marginHorizontal: 12, // Equivalent to mx-3
                    marginTop: 24, // Equivalent to mt-6
                    padding: 16, // Adjust padding as needed
                }}>
                    <View style={{
                        borderRightWidth: 2, // Equivalent to border-r-2
                        borderRightColor: 'rgba(158, 158, 158, 0.8)', // Equivalent to border-r-neutral-400, replace with your actual color
                        paddingHorizontal: 8, // Equivalent to px-2
                        alignItems: 'center', // Equivalent to items-center
                    }}>
                        <Text style={{
                        color: 'white', // Equivalent to text-white
                        fontWeight: '600', // Equivalent to font-semibold
                    }}>Gender</Text>
                    <Text style={{
                         color: 'rgba(158, 158, 158, 1)', // Equivalent to text-neutral-300
                         fontSize: 14, // Equivalent to text-sm
                    }}>{
                        person?.gender==1?'Female':'Male'
                    }</Text>
                    </View>
                    <View style={{
                        borderRightWidth: 2, // Equivalent to border-r-2
                        borderRightColor: 'rgba(158, 158, 158, 0.8)', // Equivalent to border-r-neutral-400, replace with your actual color
                        paddingHorizontal: 8, // Equivalent to px-2
                        alignItems: 'center', // Equivalent to items-center
                    }}>
                        <Text style={{
                        color: 'white', // Equivalent to text-white
                        fontWeight: '600', // Equivalent to font-semibold
                    }}>Birthday</Text>
                    <Text style={{
                         color: 'rgba(158, 158, 158, 1)', // Equivalent to text-neutral-300
                         fontSize: 14, // Equivalent to text-sm
                    }}>{person?.birthday}</Text>
                    </View>
                    <View style={{
                        borderRightWidth: 2, // Equivalent to border-r-2
                        borderRightColor: 'rgba(158, 158, 158, 0.8)', // Equivalent to border-r-neutral-400, replace with your actual color
                        paddingHorizontal: 8, // Equivalent to px-2
                        alignItems: 'center', // Equivalent to items-center
                    }}>
                        <Text style={{
                        color: 'white', // Equivalent to text-white
                        fontWeight: '600', // Equivalent to font-semibold
                    }}>Known for</Text>
                    <Text style={{
                         color: 'rgba(158, 158, 158, 1)', // Equivalent to text-neutral-300
                         fontSize: 14, // Equivalent to text-sm
                    }}>{
                        person?.known_for_department
                    }</Text>
                    </View>
                    <View style={{
                        paddingHorizontal: 8, // Equivalent to px-2
                        alignItems: 'center', // Equivalent to items-center
                    }}>
                        <Text style={{
                        color: 'white', // Equivalent to text-white
                        fontWeight: '600', // Equivalent to font-semibold
                    }}>Popularity</Text>
                    <Text style={{
                         color: 'rgba(158, 158, 158, 1)', // Equivalent to text-neutral-300
                         fontSize: 14, // Equivalent to text-sm
                    }}>{person?.popularity?.toFixed(2)} %</Text>
                    </View>
                </View>
                <View style={{
                     marginVertical: 12, // Equivalent to my-6
                     marginHorizontal: 8, // Equivalent to mx-4
                     paddingVertical: 2, // Equivalent to space-y-2
                }}>
                    <Text style={{
                        color: 'white', // Equivalent to text-white
                        fontSize: 18, // Equivalent to text-lg
                        marginBottom:6
                    }}>
                        Biography
                    </Text>
                    <Text style={{
                        color: 'rgba(158, 158, 158, 1)', // Equivalent to text-neutral-400
                        letterSpacing: 1, // Equivalent to tracking-wide
                    }}>
                        {
                            person?.biography || 'N/A'
                        }
                    </Text>
                </View>

                {/* movies */}
                <MovieList title={'Movies'} hideSeeAll={true} data={personMovies}/>
            </View>
                    )
                }
            {/* Person Details */}
            
    </ScrollView>
  )
}