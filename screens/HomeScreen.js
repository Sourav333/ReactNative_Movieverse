import { View, Text,Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import TrendingMovies from '../components/trendingMovies'
import MovieList from '../components/movieList'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/loading'
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb'

export default function HomeScreen() {
    const [trending, setTrending] = useState([1,2,3])
    const [upcoming, setUpcoming] = useState([1,2,3])
    const [topRated, settopRated] = useState([1,2,3])
    const navigation=useNavigation()
    const [loading,setLoading]= useState(true)

    useEffect(()=>{
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    },[])

    const getTrendingMovies = async ()=>{
        const data = await fetchTrendingMovies();
        // console.log('got trending movies: ',data);
        if(data && data.results) setTrending(data.results);
        {
            setLoading(false);
        }
    }
    const getUpcomingMovies = async ()=>{
        const data = await fetchUpcomingMovies();
        // console.log('got upcoming movies: ',data);
        if(data && data.results) setUpcoming(data.results);
        {
            setLoading(false);
        }
    }
    const getTopRatedMovies = async ()=>{
        const data = await fetchTopRatedMovies();
        // console.log('got topRated movies: ',data);
        if(data && data.results) settopRated(data.results);
        {
            setLoading(false);
        }
    }
  return (
    <View style={{flex:1, backgroundColor:'#333'}}>
      {/* Search bar and logo */}
      <SafeAreaView style={{marginBottom:10}}>
        <StatusBar style='light'></StatusBar>
        <View style={styles.viewstyle}>
            <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white"/>
            <Text style={styles.text}>
            <Text style={{color:'orange'}}>M</Text>
            <Text style={{color:'violet'}}>O</Text>
            <Text style={{ color: 'green' }}>V</Text>
            <Text style={{ color: 'aqua' }}>I</Text>
            <Text style={{ color: 'purple' }}>E</Text>
            <Text style={{ color: 'red' }}>V</Text>
            <Text style={{ color: 'orange' }}>E</Text>
            <Text style={{ color: 'yellow' }}>R</Text>
            <Text style={{ color: 'green' }}>S</Text>
            <Text style={{ color: 'lightblue' }}>E</Text>
            <Image
            source={require('../assets/movie.png')} // Replace with the actual path to your logo
            style={styles.logo}
          />
            </Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
                <MagnifyingGlassIcon size="30" strokeWidth={2} color="white"/>
            </TouchableOpacity>
        </View>
      </SafeAreaView>
      {
        loading ? (
            <Loading/>
        ) : (
            <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom:10}}  
      >
        {/* Trending movies carousel */}
       {trending.length>0 && <TrendingMovies data={trending}/>}

        {/* Upcoming movies row */}
        <MovieList title="Upcoming" data={upcoming}/>

        {/* top rated movies row */}
        <MovieList title="Top Rated" data={topRated}/>

      </ScrollView>
        )
      }
      
    </View>
  )
}

const styles= StyleSheet.create(
    {
        viewstyle:{
            // flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between', // Similar to justify-between
            alignItems: 'center', // Similar to items-center
            marginHorizontal: 8, // Similar to mx-4
        },
        text: {
            color: 'white',        // Equivalent to text-white
            fontSize: 24,          // Equivalent to text-3xl
            fontWeight: 'bold',    // Equivalent to font-bold
            // flex:1,
          },
          logo: {
            width: 30,
            height: 30,
            // Additional styling for the logo as needed
          },
    }
)