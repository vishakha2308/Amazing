import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet,TouchableOpacity,ToastAndroid} from 'react-native';
import { TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { login } from '../store/action';
import { useIsFocused } from '@react-navigation/native';

const Login = props => {
    const [email,setEmail] = useState('')
    const [password,setPassword] =useState('')
    const [emailErr, setEmailErr] = useState('')
    const [passwordErr, setPasswordErr] = useState('')
    const [nameErr,setNameErr] =useState('')
    const [name,setName]=useState('')
    const dispatch =useDispatch()
    const isFocused = useIsFocused();
    useEffect(()=>{
        setEmail('')
        setName('')
        setPassword('')
        setEmailErr('')
        setPasswordErr('')
        setNameErr('')
    },[isFocused])

    const onLogin =()=>{
        if (name == '') {
            setNameErr('Please enter your name')
            return;
        }
        if (email == '') {
            setEmailErr('Please enter email')
            return;
        }
        if (password == '' || password.length < 6) {
            setPasswordErr('Please enter password')
            return;
        }
         auth().signInWithEmailAndPassword(email,password)
        .then((response) => {
            if(response &&response.user){
                props.navigation.navigate('Home')
                dispatch(login(name))
            }
            console.log('User account created & signed in!',response);
        })
        .catch(error => {
            if (error.code === 'auth/wrong-password') {
                console.log('That email address is already in use!');
                ToastAndroid.show("Wrong Password!", ToastAndroid.SHORT);
            }
            if (error.code === 'auth/user-not-found') {
                console.log('That email address is invalid!');
                ToastAndroid.show('User not found!', ToastAndroid.SHORT);

            }
            console.error(error,'error');
        });

        // console.log('res',res)


    }
    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>Welcome Back!</Text>
            <TextInput
                label="name"
                value={name}
                onChangeText={text => setName(text)}
                style ={styles.input}
                onBlur ={()=>setNameErr('')}
            />
            <Text style ={styles.err}>{nameErr}</Text>
            <TextInput
                label="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                style ={styles.input}
                onBlur ={()=>setEmailErr('')}
            />
            <Text style ={styles.err}>{emailErr}</Text>
            <TextInput
                label="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                style ={styles.input}
                onBlur ={()=>setPasswordErr('')}
            />
            <Text style ={styles.err}>{passwordErr}</Text>
            <TouchableOpacity style ={styles.loginBtn}
            onPress ={onLogin}>
                <Text style ={styles.loginText}>Login</Text>
            </TouchableOpacity>
            <View style ={styles.signUpBox}>
                <Text style={styles.otherText}>New to amazing?</Text>
                <Text style={styles.signupText}
                onPress={()=>props.navigation.navigate('SignIn')}>Signup</Text>
            </View>
        </View>
    )
}
export default Login
export const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent:'center',
        // alignItems:'center',
        flex:1
    },
    welcome: {
        fontSize: 18,
        color: 'black',
        // marginTop: 30
    },
    input:{
        marginVertical:10
    },
    loginText:{
    color:'white',
    fontWeight:'bold',
    fontSize:16,
    alignSelf:'center',
    paddingVertical:8
    },
    loginBtn:{
        backgroundColor:'black',
        marginTop:40,
        borderRadius:8
    },
    signUpBox:{
        flexDirection:'row',marginTop:10
    },
    signupText:{
        color:'black',
        fontWeight:'bold',
        marginLeft:4
    },
    err:{
        fontSize:10,
        color:'red'
    }
})