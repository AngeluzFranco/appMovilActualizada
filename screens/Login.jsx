import { useNavigation } from '@react-navigation/native';
import { Card, Image, Button } from '@rneui/themed';
import { useState } from 'react';
import { StyleSheet, View,   Alert,
    TextInput,
    ImageBackground,
    Text,
    TouchableOpacity, } from 'react-native';
import { Backend } from '../config/backendconfig';


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
                        text: 'Gracias', onPress: () => navigation.replace('Home')
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
            style={{ flex: 1, flexDirection: "row", marginTop: '10%' }}
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
                  <Text style={styles.titleLogin}>Sign in</Text>
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
        padding: 15,
        borderRadius: 10,
        marginTop: 80,
      },
  
      buttonText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
      },
  
      container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        

      },
  
      backgroundImage: {
        flex: 1,
        resizeMode: "cover",
      },
  
      inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
      },
  
      icon: {
        marginRight: 10,
      },
  
      inputForm: {
        flex: 1,
        borderBottomColor: "rgba(255, 255, 255, 100)",
        borderBottomWidth: 3,
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
        color: "rgba(255, 255, 255, 100)",
      },
  
      formContainer: {
        marginTop: -350,
        padding: 10,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        borderRadius: 20,
        height: 500,
        justifyContent: "center",
      },
  
      titleLogin: {
        color: "rgba(120, 168, 144, 100)",
        fontSize: 50,
        fontWeight: "bold",
      },
  
      TextLogin: {
        color: "rgba(120, 168, 144, 100)",
        fontSize: 20,
        marginBottom: 40,
        marginTop: 20,
      },
  
      logo: {
        width: 60,
        height: 60,
        marginRight: 10,
        marginStart: 30,
      },
  
      titleGastromanager: {
        color: "rgba(255, 255, 255, 100)",
        fontSize: 35,
        fontWeight: "bold",
        marginTop: 5,
      },
    });

export default Login;