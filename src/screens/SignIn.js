import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import { TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { useIsFocused } from '@react-navigation/native';


const SignIn = props => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailErr, setEmailErr] = useState('')
    const [passwordErr, setPasswordErr] = useState('')
    const signUp = () => {
        if (email == '') {
            setEmailErr('Please enter email')
            return;
        }
        if (password == '' || password.length < 6) {
            setPasswordErr('Please enter password')
            return;
        }
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User account created & signed in!');
                props.navigation.navigate('Login')
                ToastAndroid.show("Account created successfully, please login", ToastAndroid.SHORT);

            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                    ToastAndroid.show("That email address is already in use!", ToastAndroid.SHORT);
                }
                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                    ToastAndroid.show('That email address is invalid!', ToastAndroid.SHORT);

                }
                console.error(error);
            });

    }
    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>Welcome!</Text>
            <TextInput
                label="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
                onBlur ={()=>setEmailErr('')}
            />
            <Text style={styles.err}>{emailErr}</Text>
            <TextInput
                label="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                onBlur ={()=>setPasswordErr('')}
            />
            <Text style ={styles.err}>{passwordErr}</Text>
            <TouchableOpacity style={styles.loginBtn}
                onPress={signUp}>
                <Text style={styles.loginText}>Sign up</Text>
            </TouchableOpacity>
            <View style={styles.signUpBox}>
                <Text style={styles.otherText}>Want to</Text>
                <Text style={styles.signupText}
                    onPress={() => props.navigation.navigate('Login')}>Login</Text>
            </View>
        </View>
    )
}
export default SignIn
export const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent: 'center',
        // alignItems:'center',
        flex: 1
    },
    welcome: {
        fontSize: 18,
        color: 'black',
        // marginTop: 30
    },
    input: {
        marginVertical: 10
    },
    loginText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        alignSelf: 'center',
        paddingVertical: 8
    },
    loginBtn: {
        backgroundColor: 'black',
        marginTop: 40,
        borderRadius: 8
    },
    signUpBox: {
        flexDirection: 'row', marginTop: 10
    },
    signupText: {
        color: 'black',
        fontWeight: 'bold',
        marginLeft: 4
    },
    err:{
        fontSize:10,
        color:'red'
    }
})