import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Alert,
  TextInput,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {Backend} from "../config/backendconfig";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const Navigation = useNavigation();
  const navigation = ()=>{
    Navigation.navigate("Home");
  }
  //declaramos las variables que vamos a utilizar en el formulario de login.
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  //declaramos constante para conectar a firebase y a la ruta del backend
  //const { appFirebase } = Firebase();
  const { url } = Backend();

  //declaramos una funcion que nos permitira verificar si el usuario existe en nuestra base de datos
  const chekUser = async () => {
    if (user === "" || password === "") {
      Alert.alert("Error", "Usuario o Contraseña vacíos");
    } else {
    const payload = { user:user, password :password };
    const response = await fetch(url + "/usuario/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (response.ok && response.status === 200) {
      const data = await response.json();
      console.log(data);      
      Alert.alert(`Bienvenido ${data.name}`, undefined, [
        { text: "OK", onPress:()=>navigation() }
      ])
    };
  }
  }

    //declaramos una funcion que nos permitira iniciar sesion

    return (

      //asignamos una imagen de fondo
      <ImageBackground
        source={require("../assets/fondo.png")}
        style={styles.backgroundImage}
      >

        {/*declaramos el contenedor principal*/}
        <View
          style={{ flex: 1, flexDirection: "row", marginTop: '10%' }}
        >
          <Text style={styles.titleGastromanager}>Gastromanager</Text>
          <Image
            source={require("../assets/gastromanager2.png")}
            style={styles.logo}
          />
        </View>

        {/*declaramos el contenedor del formulario*/}
        <View style={styles.container}>
          {
            <View style={styles.container}>
              <View style={styles.formContainer}>
                <Text style={styles.titleLogin}>Sign in</Text>
                <Text style={styles.TextLogin}>
                  Inicie session para poder acceder a las funciones del sistema
                </Text>
                <View style={styles.inputContainer}>
                  <Icon name="user" size={20} color="green" style={styles.icon} />
                  <TextInput
                    placeholder="User"
                    value={user}
                    onChangeText={setUser}
                    style={styles.inputForm}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Icon name="lock" size={20} color="green" style={styles.icon} />
                  <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.inputForm}
                    secureTextEntry
                  />
                </View>
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={chekUser}
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

  //declaramos los estilos que vamos a utilizar
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
    },

    titleGastromanager: {
      color: "rgba(255, 255, 255, 100)",
      fontSize: 35,
      fontWeight: "bold",
      marginLeft: 15,
      marginRight: "20%",
      marginTop: 5,
    },
  });

//Este es el bueno