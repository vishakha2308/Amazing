import React,{useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
const Home = props => {
    const loggedInUser = useSelector(state => state.loggedInUser);
        // const { email } = loggedInUser

    useEffect(()=>{
        console.log(loggedInUser, 'loggedInUser')

    })

    return (
        <View style ={styles.container}>
            <Text>Welcome</Text>
            <View style ={styles.nameContainer}>
                <Text style ={styles.text}>Hi </Text>
                <Text style ={[styles.text,{color:'red'}]}>{loggedInUser?.email} </Text>
            </View>

        </View>
    )
}
export default Home
export const styles = StyleSheet.create({
    nameContainer:{
        flexDirection:'row'
    },
    container:{
        paddingHorizontal:20,
        paddingVertical:40
    },
    text:{
     fontSize:18,
     fontWeight:'bold'

    }

})