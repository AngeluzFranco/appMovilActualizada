import React, { useState } from "react";
import {
    View,
    Image,
    Button,
    StyleSheet,
    Modal,
    Alert,
    TextInput,
    ImageBackground,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    SafeAreaView,
    SectionList,
    StatusBar,
} from "react-native";

import { useNavigation , useRoute } from '@react-navigation/native';
import { Backend } from "../config/backendconfig";


export default function Menu() {
    const navigation = useNavigation();
    const route = useRoute();
    const userData = route.params.userData;

        console.log("Menu" +userData);

    const Data = [
        {
            title: '1',
            data: [{ name: 'coca-cola', description: 'Refresco de cola', cantidad: 0 }],
        },
        {
            title: '2',
            data: [{ name: 'Fanta', cantidad: 0 }],
        },
        {
            title: '3',
            data: [{ name: 'Mirinda', description: 'Refresco de cola', cantidad: 0 }],
        },
        {
            title: '4',
            data: [{ name: 'Fanta', cantidad: 0 }],
        },
        {
            title: '5',
            data: [{ name: 'Fanta', cantidad: 0 }],
        },
        {
            title: '6',
            data: [{ name: 'Fanta', cantidad: 0 }],
        },
    ];



    

    const [cantidadH, setCantidad] = useState(Data);
    const [data, setData] = useState(Data);

    const aumentar = (item) => {
        setCantidad(prevCantidad => 
          prevCantidad.map(section => ({
            ...section,
            data: section.data.map(i => 
              i.name === item.name ? {...i, cantidad: i.cantidad + 1} : i
            )
          }))
        );
      }
      
      const disminuir = (item) => {
        setCantidad(prevCantidad => 
          prevCantidad.map(section => ({
            ...section,
            data: section.data.map(i => 
              i.name === item.name && i.cantidad > 0 ? {...i, cantidad: i.cantidad - 1} : i
            )
          }))
        );
      }

    const [verModal, setModalVisible] = useState(false);

    const cerrarModal = () => {
        setModalVisible(false);
    };

    const handleLogout = () => {
        navigation.replace("Login");
    };

    const cancelarPedido = () => {
        navigation.navigate("Home", { userData: userData });
    }
    
    const handleButtonClick = () => {
        navigation.navigate('VerificarP', { data: cantidadH, userData: userData });
    }
    

    return (
        <ImageBackground
            source={require("../assets/fondo2.png")}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <View style={{ flex: 1, flexDirection: "row", padding: 10 }}>
                    <Text style={styles.titleMesas}>Menu</Text>
                    <TouchableOpacity onPress={handleLogout}>
                        <Image
                            source={require("../assets/gastromanager2.png")}
                            style={styles.logo}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.container2}>
                    <View style={styles.row}>
                        <View style={styles.card}>
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <Text style={styles.cardtext}>Bebidas</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.card}>
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <Text style={styles.cardtext}>Postres</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.card}>
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <Text style={styles.cardtext}> Plato Fuerte</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.card}>
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <Text style={styles.cardtext}>Ensalada</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: '20%' }} >
                            <TouchableOpacity onPress={cancelarPedido}
                                style={styles.loginButton}
                            >
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.loginButton2}
                                onPress={handleButtonClick}
                            >
                                <Text style={styles.buttonText}>Verificar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <Modal
                visible={verModal}
                animationType="slide"
                onRequestClose={() => setModalVisible(true)}
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modal}>
                        <View style={styles.closeModal}>
                            <Button title="X" color="black" onPress={cerrarModal} />
                        </View>
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
                        <SafeAreaView style={styles.container4}>
                        <SectionList
  sections={cantidadH}
  keyExtractor={(item, index) => item + index}
  renderItem={({ section, item, index }) => (
                                    <View style={styles.cardModal}>
                                        <View style={styles.container3}>
                                            <View style={styles.column}>
                                                {item && item.name && (
                                                    <Text style={styles.titleNumMesa}>{item.name}</Text>
                                                )}
                                                {item && item.description && (
                                                    <Text style={styles.titleNombreMesa}>{item.description}</Text>
                                                )}
                                            </View>
                                            <View style={styles.column}>
                                                <View style={styles.row2}>
                                                    <TouchableOpacity
                                                        style={styles.botonCantidad}
                                                        onPress={() => disminuir(item)}
                                                    >
                                                        <Text style={styles.textBoton}>-</Text>
                                                    </TouchableOpacity>
                                                    <Text style={styles.inputForm}>
                                                    {item.cantidad}
                                                    </Text>
                                                    <TouchableOpacity
                                                        style={styles.botonCantidad}
                                                        onPress={() => aumentar(item)}
                                                    >
                                                        <Text style={styles.textBoton}>+</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                )}
                            />
                        </SafeAreaView>










                        <TouchableOpacity style={styles.botonConfirmar} onPress={cerrarModal}>
                            <Text style={styles.textBoton2}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
    },

    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "rgba(255,255,255,0.01)",
    },

    titleMesas: {
        color: "rgba(255, 255, 255, 100)",
        fontSize: 35,
        fontWeight: "bold",
        marginRight: "40%",
        marginTop: 5,
    },

    logo: {
        width: 60,
        height: 60,
        marginStart: 10,

    },

    container2: {
        marginTop: '-2%',
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 20,
        height: "90%",
        justifyContent: "top",
    },

    row: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },

    row2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },

    card: {
        width: '85%',
        padding: 20,
        height: '17%',
        margin: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.33)',
        marginTop: 20,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: "center"
    },

    cardtext: {
        color: "rgba(255, 255, 255, 100)",
        fontSize: 40,
        fontWeight: "bold",
    },

    loginButton: {
        marginRight: '35%',
        height: 50,
        width: 100,
        backgroundColor: "rgba(9,43,90,100)",
        padding: 15,
        borderRadius: 10,
    },

    loginButton2: {
        height: 50,
        width: 100,
        backgroundColor: "rgba(9,43,90,100)",
        padding: 15,
        borderRadius: 10,
    },

    buttonText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
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
        height: '70%',
        width: '90%',
    },

    closeModal: {
        position: "relative",
        right: -170,
        top: -7,
    },

    cardModal: {
        borderColor: "black",
        borderWidth: 1,
        marginTop: 5,
        marginBottom: 5,
        padding: 10,
        backgroundColor: "grayLight",
        borderRadius: 15,
        height: "auto",
        justifyContent: "center",
        width: '90%',
    },

    container3: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    botonCantidad: {
        alignContent: "center",
        alignItems: "center",
        backgroundColor: "gray",
        padding: 10,
        borderRadius: 50,
        width: 40,
    },

    textBoton: {
        color: 'white',
        fontSize: 15,
    },

    textBoton2: {
        color: 'white',
        fontSize: 15,
    },

    inputForm: {
        textAlign: "center",
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 5,
        padding: 5,
        marginLeft: 5,
        marginRight: 5,
    },

    botonConfirmar: {
        height: 50,
        width: 100,
        backgroundColor: "rgba(9,43,90,100)",
        padding: 15,
        borderRadius: 10,
        marginTop: 30,
    },

    container4: {
        height: "78%",
        width: "100%",
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