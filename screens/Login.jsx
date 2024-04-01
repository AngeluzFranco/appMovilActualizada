import { useNavigation } from '@react-navigation/native';
import { Card, Image, Button } from '@rneui/themed';
import { useState } from 'react';
import { StyleSheet, View,   Alert,
    TextInput,
    ImageBackground,
    Text,
    TouchableOpacity, } from 'react-native';
import { Backend } from '../config/backendconfig';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


  import Icon from "react-native-vector-icons/FontAwesome";

const Login = () => {

    const navigation = useNavigation();

    let [user, setUser] = useState('');
    let [password, setPassword] = useState('');
    let intentos = 0;
    const {url} = Backend();


  

    const checkUser = async () => {
        try {
            const payload = {user: user, password: password };
            console.log(payload);
            const response = await fetch(url + "/usuario/login",{
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload),
  
            })
            console.log('Response:', response); 
            if(response.ok && response.status === 200){
              const data = await response.json();
              console.log(data);
              Alert.alert(`Bienvenido!`,undefined,[
                  {
                      text: 'Gracias', onPress: () => navigation.replace('Home', { userData: data })
                  }
              ])
          }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Hubo un problema al intentar iniciar sesión. Por favor, inténtalo de nuevo.');
        }
    }

    return (


      
        <ImageBackground
          source={require("../assets/fondo.png")}
          style={styles.backgroundImage}
        >
  
        
          <View
            style={{ flex: 1, flexDirection: "row", marginTop: '10%' , justifyContent: 'space-around'}}
          >
            <Text style={styles.titleGastromanager}>Gastromanager</Text>
            <Image
              source={require("../assets/gastromanager2.png")}
              style={styles.logo}
            />
          </View>
  
  


          <View style={styles.container}>
            {
              <View style={styles.container}>
                <View style={styles.formContainer}>
             
                  <Text style={styles.titleLogin}>Bienvenido</Text>
                  <Text style={styles.TextLogin}>
                    Inicie sesión para poder acceder a las funciones del sistema
                  </Text>
                  <View style={styles.inputContainer}>
                    <Icon name="user" size={20} color="green" style={styles.icon} />
                    <TextInput
                      placeholder="User"
                      placeholderTextColor={'white'}
                      value={user}
                      onChangeText={setUser}
                      style={styles.inputForm}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Icon name="lock" size={20} color="green" style={styles.icon} />
                    <TextInput
                      placeholder="Password"
                      placeholderTextColor={'white'}
                      value={password}
                      onChangeText={setPassword}
                      style={styles.inputForm}
                      secureTextEntry
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.loginButton}
                    onPress={checkUser}
                  >
                    <Text style={styles.buttonText}>Iniciar Sesión</Text>
                  </TouchableOpacity>
                </View>
              </View>
            }
          </View>
        </ImageBackground>
      );
    }
  

    const styles = StyleSheet.create({
      loginButton: {
        backgroundColor: "rgba(9,43,90,100)",
        padding: hp('2%'),
        borderRadius: hp('1.5%'),
        marginTop: hp('10%'),
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        padding: wp('5%'),
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: hp('2.5%'),
    },
    icon: {
        marginRight: wp('2%'),
    },
    inputForm: {
        flex: 1,
        borderBottomColor: "rgba(255, 255, 255, 100)",
        borderBottomWidth: wp('0.5%'),
        borderRadius: wp('1%'),
        padding: wp('2%'),
        marginVertical: hp('0.5%'),
        color: "rgba(255, 255, 255, 100)",
    },
    formContainer: {
        marginTop: -hp('45%'),
        padding: wp('2%'),
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        borderRadius: wp('5%'),
        height: hp('65%'),
        justifyContent: "center",
    },
    titleLogin: {
        color: "rgba(120, 168, 144, 100)",
        fontSize: wp('13%'),
        fontWeight: "bold",
    },
    TextLogin: {
        color: "rgba(120, 168, 144, 100)",
        fontSize: wp('5%'),
        marginBottom: hp('5%'),
        marginTop: hp('2.5%'),
    },
    logo: {
        width: wp('18%'),
        height: hp('8%'),
        marginRight: wp('2%'),
        marginStart: wp('3%'),
    },
    titleGastromanager: {
        color: "rgba(255, 255, 255, 100)",
        fontSize: wp('9%'),
        fontWeight: "bold",
        marginTop: hp('0.5%'),
    },
    });

export default Login;