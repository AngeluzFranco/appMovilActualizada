import React, { useState , useEffect } from "react";
import {
    View,
    Image,
    Button,
    StyleSheet,
    Modal,
    Alert,
    ImageBackground,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    SafeAreaView,
    SectionList,
    StatusBar,
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { Backend } from "../config/backendconfig";



function MesasDisponibles({ userData }) {
    const {url} = Backend();
    const navigation = useNavigation();
    const [data, setData] = useState(null);
    console.log('userData en Mesas Disponibles:', userData); 
  



  
    useEffect(() => {
      const fetchMesas = () => {
          fetch(url + '/mesas/active/')
              .then(response => {
                  if (!response.ok) {
                      throw new Error('Hubo un error en la petición');
                  }
                  return response.json();
              })
              .then(data => {
                  console.log(data);  
                  setData(data.data);
              })
              .catch(error => {
                  console.error(error);
                  Alert.alert('Error', 'Hubo un error al obtener las mesas. Por favor, intenta de nuevo más tarde.');
              });
      };
  
      fetchMesas(); 
  
      const intervalId = setInterval(fetchMesas, 10000); 
  
      return () => clearInterval(intervalId); 
  }, []);
  

  const handleAbrirModal = (item) => { 
    Alert.alert(
        'Confirmación',
        '¿Estás seguro de que deseas atender esta mesa?',
        [
            {
                text: 'Cancelar',
                onPress: () => console.log('Cancelado'),
                style: 'cancel',
            },
            {
                text: 'Aceptar',
                onPress: () => {
                    console.log('Aceptado');
                    fetch(url + '/pedidos/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            estado: 'En proceso',
                            usuario: {
                                idUsuario: userData.data.idUsuario,
                            },
                            mesa: {
                                idMesa: item.numeroMesa,
                            },
                        }),
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Hubo un error en la petición');
                            }
                            return response.json();
                        })
                        .then(data => {
                            console.log('Respuesta de /pedidos/:', data);
                            
                            return fetch(url + '/mesas/' + item.numeroMesa, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    ...item, 
                                    estado: 'Ocupada', 
                                }),
                            });
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Hubo un error en la petición');
                            }
                            return response.json();
                        })
                        .then(data => console.log('Respuesta de /mesas/:', data))
                        .catch(error => console.error(error));
                },
                style: 'cancel',
            },
        ],
        { cancelable: false }
    );
};



  
      const handleLogout = () => {
          navigation.replace("Login");
      };
  
  
      return (
  
          <ImageBackground
              source={require('../assets/fondo2.png')}
              style={styles.backgroundImage} >
              <SafeAreaView style={styles.container4}>
              <SectionList
    sections={data ? data.map((item, index) => ({ title: 'Mesa ' + (index + 1), data: [item] })) : []}
    keyExtractor={(item, index) => item + index}
    renderItem={({ item }) => (
        <View style={styles.formContainer}>
            <View style={styles.container3}>
                <View style={styles.column}>
                    <Text style={styles.titleNumMesa}>Mesa {item.numeroMesa}</Text>
                    <Text style={styles.titleNombreMesa}>Estado: {item.estado}</Text>
                    <Text style={styles.titleNombreMesa}>Número de sillas: {item.numeroSillas}</Text>
                </View>
                <View style={styles.column}>
                    <Image
                        source={require("../assets/mesa.png")}
                        style={styles.mesa} />
                  <TouchableHighlight
    style={styles.button}
    activeOpacity={0.6}
    underlayColor="#DDDDDD" onPress={() => handleAbrirModal(item)}>
    <Text></Text>
</TouchableHighlight>
                </View>
            </View>
        </View>
    )}
/>
              </SafeAreaView>
          </ImageBackground>
      );
  }
  

  
  function MisMesas({ userData }) {
    const { url } = Backend();
    const navigation = useNavigation();
    const [data, setData] = useState(null);
    console.log('userData en Mis Mesas:', userData); 
   



    

    useEffect(() => {
        const fetchMesas = () => {
            fetch(url + '/mesas/usuario/' + userData.data.idUsuario)
            .then(response => {
                if (!response.ok) {
                    console.log('Status code:', response.status);
                    throw new Error('Hubo un error en la petición');
                }
                return response.json();
            })
                .then(data => {
                    console.log("Respuesta de mis mesas"+ JSON.stringify(data));
                    setData(data);
                }) 
                .catch(error => {
                    console.error(error);
                    Alert.alert('Error', 'Hubo un error al obtener las mesas. Por favor, intenta de nuevo más tarde.');
                });
        };

        fetchMesas();

        const intervalId = setInterval(fetchMesas, 10000);

        return () => clearInterval(intervalId);
    }, [userData.idUsuario]); 

    const IrMenu = () => navigation.navigate("Menu", { userData: userData });
    const IrPedido = () => navigation.navigate("Pedido", { userData: userData });
    return (
        <ImageBackground
            source={require("../assets/fondo2.png")}
            style={styles.backgroundImage}
        >
            <SafeAreaView style={styles.container4}>
                <SectionList
                    sections={data ? data.map((item, index) => ({ title: 'Mesa ' + (index + 1), data: [item] })) : []}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => (
                        <View style={styles.formContainer2}>
                            <View style={styles.container3}>
                                <View style={styles.column}>
                                    <Text style={styles.titleNumMesa}>Mesa {item.numeroMesa}</Text>
                                    <Text style={styles.titleNombreMesa}>Estado: {item.estado}</Text>
                                    <Text style={styles.titleNombreMesa}>Número de sillas: {item.numeroSillas}</Text>
                                </View>
                                <View style={styles.column}>
                                    <TouchableOpacity onPress={IrPedido}>
                                        <Image
                                            source={require("../assets/mesa.png")}
                                            style={styles.mesa} />
                                    </TouchableOpacity>
                                    <TouchableHighlight
                                        style={styles.button}
                                        activeOpacity={0.6}
                                        underlayColor="#DDDDDD" onPress={IrMenu}>
                                        <Text></Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </SafeAreaView>
        </ImageBackground>
    );
};




const Tab = createMaterialTopTabNavigator();
  


export default function Home({ route }) {
    const navigation = useNavigation();
    const { userData } = route.params ? route.params : {};

    const handleLogout = () => {
        navigation.replace("Login");
    };

    return (
        <ImageBackground
            source={require("../assets/fondo2.png")}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <View style={{ flex: 1, flexDirection: "row", padding: 10 }}>
                    <Text style={styles.titleMesas}>Mesas</Text>
                    <TouchableOpacity onPress={handleLogout}>
                        <Image
                            source={require("../assets/gastromanager3.png")}
                            style={styles.logo}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.container2}>
                    <Tab.Navigator
                        screenOptions={{
                            tabBarActiveTintColor: 'black',
                            tabBarInactiveTintColor: 'black',
                            tabBarStyle: { backgroundColor: 'transparent' },
                            
                        }}
                    >
                       <Tab.Screen name="Mesas Disponibles" children={() => <MesasDisponibles userData={userData} />} />
                       <Tab.Screen name="Mis Mesas" children={(props) => userData ? <MisMesas {...props} userData={userData} /> : null} />
                    </Tab.Navigator>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: wp('100%'),
        height: hp('100%'),
    },
    container: {
        flex: 1,
        justifyContent: "center",
        padding: wp('5%'),
        backgroundColor: "rgba(255,255,255,0.01)",
    },

    container2: {
        marginTop: '-2%',
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 20,
        height: "90%",
        justifyContent: "top",
    },

    logo: {
        width: wp('16%'),
        height: hp('10%'),
        marginEnd: wp('5%'),
        flex: 1,
    },
    titleMesas: {
        color: "black", 
        fontSize: wp('10%'),
        fontWeight: "bold",
        marginRight: wp('45%'),
    },

    formContainer: {
        marginTop: 5,
        marginBottom: 20,
        padding: 10,
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        borderRadius: 20,
        height: "auto",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: '#fff',
    },

    formContainer2: {
        marginTop: 5,
        marginBottom: 20,
        padding: 10,
        backgroundColor: "rgba(234, 255, 221, .5)",
        borderRadius: 20,
        height: "auto",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: '#fff',
    },

    titleNumMesa: {
        color: "black",
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 20,
    },

    titleNombreMesa: {
        color: "black", 
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 10,
    },

    container3: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    column: {
        flex: 1,
        padding: 10,
    },

    mesa: {
        marginLeft: "35%",
        width: 90,
        height: 70,
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    modal: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        width: '90%',
    },

    closeModal: {
        position: "relative",
        right: -170,
        top: -7,
    },

    button: {
        marginTop: 10,
        marginLeft: '53%',
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 5,
        width: 40,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    card: {
        width: '48%',
        backgroundColor: 'lightgray',
        padding: 20,
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    container4: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 16,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
    },
    header: {
        fontSize: 32,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
    },
});
