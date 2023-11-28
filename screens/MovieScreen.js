import { View, Image,Text,ScrollView,SafeAreaView, Platform } from 'react-native'
import React, { useEffect,useState } from 'react'
import { useNavigation, useRoute} from '@react-navigation/native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { HeartIcon } from 'react-native-heroicons/solid';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/cast';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovie, image500 } from '../api/moviedb';

var {width,height} =Dimensions.get('window');

export default function MovieScreen() {
    const {params:item} = useRoute();
    const navigation = useNavigation();
    const [isFavourite,toggleFavourite]=useState(false);
    const [cast,setcast] = useState([]);
    const [similarMovies,setSimilarMovies] = useState([]);
    const [loading,setLoading]= useState(false)
    const [movie,setMovie] = useState({});
    useEffect(()=>{
        //call the movie details api
        // console.log('itemid: ',item.id)
        setLoading(true);
        getMovieDetails(item.id);
        getMovieCredits(item.id);
        getSimilarMovies(item.id);
    },[item])
    let movieName = 'Pathan meri jan meri jab ban jayga'
    const getMovieDetails = async id=>{
        const data = await fetchMovieDetails(id);
        // console.log('got movie details: ',data);
        if(data) setMovie(data);
        setLoading(false);
    }
    const getMovieCredits = async id=>{
        const data =await fetchMovieCredits(id);
        // console.log('got credits:',data)
        if(data && data.cast) setcast(data.cast)
    }
    const getSimilarMovies = async id=>{
        const data =await fetchSimilarMovie(id);
        // console.log('got similar movies:',data)
         if(data && data.results) setSimilarMovies(data.results)
    }
  return (
    <ScrollView
        contentContainerStyle={{paddingBottom: 20}}
        style={{flex:1,backgroundColor:'#1e1e1e'}}
    >
        {/* back button and movie poster */}
        <View style={{width:'100%'}}>
            <SafeAreaView style={{
                position: 'absolute',
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
                loading ? (
                    <Loading/>
                ) : (
                    <View>
                <Image
                    // source={require('../assets/pathan.jpeg')}
                    source={{uri:image500(movie?.poster_path) || fallbackMoviePoster}}
                    style={{width,height: height*0.55}}
                />
                <LinearGradient
                     colors={['transparent','rgba(23,23,23,0.8)','rgba(23,23,23,1)']}
                     style={{width,height:height*0.40,
                        position: 'absolute',
                        bottom: 0
                    }}
                     start={{x:0.5,y:0}}
                     end={{x:0.5,y:1}}
                     />
            </View>
                )
            }
            
        </View>

        {/* Movie details view */}
        <View style={{marginTop: -(height*0.09),marginVertical: 12}}>
            {/* title */}
            <Text style={{
                color: 'white',
                textAlign: 'center',
                fontSize: 24,
                fontWeight: 'bold',
                letterSpacing: 2,
                marginBottom:6
            }}>
                {
                    movie?.title
                }
            </Text>

            {/* status,release,runtime */}
            {
                movie?.id?(
                    <Text style={{
                        color: '#8B8B8B', // Adjust the color based on your design system
                        fontWeight: '600', // Equivalent to font-semibold
                        fontSize: 16, // Equivalent to text-base
                        textAlign: 'center',
                        marginBottom:8
                    }}> {movie?.status} · {movie?.release_date?.split('-')[0]} · {movie?.runtime} min</Text>
                ):null
            }
            {/* genres */}
            <View style={{
                flexDirection: 'row', // Equivalent to flex-row
                justifyContent: 'center', // Equivalent to justify-center
                marginHorizontal: 16, // Equivalent to mx-4
                marginBottom:10
            }}>{
                movie?.genres?.map((genre,index)=>{
                    let showDot = index+1 !=movie.genres.length; //logic to remove genres dot at the end
                    return(
                    <Text 
                        key={index}
                    style={{
                        color: '#8B8B8B', // Adjust the color based on your design system
                        fontWeight: '600', // Equivalent to font-semibold
                        fontSize: 16, // Equivalent to text-base
                        textAlign: 'center',
                   }}>
                       {genre?.name} {showDot?"·":null}
                   </Text>
                )}
                )
            }
                {/* this are dummy ones------------ */}
                {/* <Text style={{
                     color: '#8B8B8B', // Adjust the color based on your design system
                     fontWeight: '600', // Equivalent to font-semibold
                     fontSize: 16, // Equivalent to text-base
                     textAlign: 'center',
                }}>
                    Thrill ·
                </Text>
                <Text style={{
                     color: '#8B8B8B', // Adjust the color based on your design system
                     fontWeight: '600', // Equivalent to font-semibold
                     fontSize: 16, // Equivalent to text-base
                     textAlign: 'center',
                }}>
                    Comdey ·
                </Text> */}
            </View>
            {/* description */}
            <Text style={{
                color: '#ccc', // Adjust the color based on your design
                marginHorizontal: 16, // Equivalent to mx-4
                letterSpacing: 1,
            }}>
                {
                    movie?.overview
                }
           </Text>
        </View>
        {/* cast */}
        {cast.length>0 && <Cast navigation={navigation} cast={cast}/>}

        {/* MovieList */}
        {/* hideSeeAll={true} will hide the Seall for Movie list and to do it will pass it as prop */}
        {similarMovies.length>0 && <MovieList title="similar Movies" hideSeeAll={true} data={similarMovies}/>}
    </ScrollView>
  )
}