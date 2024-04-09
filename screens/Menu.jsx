import React, { useState, useEffect } from "react";
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
    ScrollView
} from "react-native";

import { useNavigation, useRoute } from '@react-navigation/native';
import { Backend } from "../config/backendconfig";


export default function Menu() {
    const navigation = useNavigation();
    const route = useRoute();
    const userData = route.params.userData;
    const { url } = Backend();





    const [categorias, setCategorias] = useState({});

    const [platillosSeleccionados, setPlatillosSeleccionados] = useState({});


    const [verModal, setVerModal] = useState(false);



    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await fetch(url + '/platillo/');
                if (!response.ok) {
                    throw new Error('Hubo un error en la petición');
                }
                const data = await response.json();
                const categorias = data.data.reduce((acc, platillo) => {
                    if (!acc[platillo.categoria]) {
                        acc[platillo.categoria] = [];
                    }
                    acc[platillo.categoria].push(platillo);
                    return acc;
                }, {});
                setCategorias(categorias);
            } catch (error) {
                console.error(error);
                Alert.alert('Error', 'Hubo un error al obtener las categorías. Por favor, intenta de nuevo más tarde.');
            }
        };

        fetchCategorias();

        const intervalId = setInterval(fetchCategorias, 10000);

        return () => clearInterval(intervalId);
    }, [userData.idUsuario]);


    const handleCategoriaPress = (categoria) => {
        const platillos = categorias[categoria].map(platillo => ({
            ...platillo,
            cantidad: platillosSeleccionados[categoria]?.find(p => p.id === platillo.id)?.cantidad || 0,
        }));
        setPlatillosSeleccionados(prevPlatillos => ({
            ...prevPlatillos,
            [categoria]: platillos
        }));
        setVerModal(true);
    };
    
    


    const cerrarModal = () => {
        setVerModal(false);
    };


    const [cantidad, setCantidad] = useState([{ data: [] }]);
    const [data, setData] = useState({});
    const [cantidades, setCantidades] = useState({});

    const aumentar = (item) => {
        setCantidades(prevCantidades => ({
            ...prevCantidades,
            [item.nombre]: (prevCantidades[item.nombre] || 0) + 1
        }));
    };

    const disminuir = (item) => {
        setCantidades(prevCantidades => ({
            ...prevCantidades,
            [item.nombre]: Math.max((prevCantidades[item.nombre] || 0) - 1, 0)
        }));
    };

    const handleLogout = () => {
        navigation.replace('Home', { userData: userData });
    };



    const cancelarPedido = () => {
        navigation.navigate('Home', { userData: data });
    }



    const handleButtonClick = () => {
        const platillosConCantidad = Object.keys(platillosSeleccionados).reduce((acc, categoria) => {
            const platillos = platillosSeleccionados[categoria].filter(platillo => cantidades[platillo.nombre] > 0);
            if (platillos.length > 0) {
                acc[categoria] = platillos;
            }
            return acc;
        }, {});
    

        // console.log('platillosConCantidad:', JSON.stringify(platillosConCantidad, null, 2));
        // console.log('cantidades:', JSON.stringify(cantidades, null, 2));
    navigation.navigate('VerificarP', { userData: userData, platillosSeleccionados: platillosConCantidad, cantidades: cantidades });
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
                            source={require("../assets/gastromanager3.png")}
                            style={styles.logo}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.container2}>
                <ScrollView>
                <View style={styles.row}>
    {categorias && Object.keys(categorias).map((categoria, index) => (
        <View key={index} style={{...styles.card, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => handleCategoriaPress(categoria)}>
                                <Text style={styles.cardtext}>{categoria}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
                    <View style={{ flexDirection: 'row', marginTop: '20%' }}>


                        <TouchableOpacity onPress={cancelarPedido}
                            style={styles.loginButton}
                        >
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>






                        <TouchableOpacity
                            style={styles.loginButton2}
                            onPress={() => {

                                const platillosArray = Object.values(platillosSeleccionados);

                              
                                platillosArray.forEach(platillos => {
                                    platillos.forEach(platillo => {
                                        platillo.cantidad = cantidades[platillo.nombre] || 0;
                                    });
                                });
                                
                                const platillosConCantidad = platillosArray.map(platillos =>
                                    platillos.filter(platillo => platillo.cantidad > 0)
                                ).filter(platillos => platillos.length > 0);
                                
                                // console.log('platillosConCantidad:', JSON.stringify(platillosConCantidad, null, 2));
                                // console.log('cantidades:', JSON.stringify(cantidades, null, 2));
                                navigation.navigate('VerificarP', { userData: userData, platillosSeleccionados: platillosConCantidad, cantidades: cantidades });   }}
                        >
                            <Text style={styles.buttonText}>Verificar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Modal
                visible={verModal}
                animationType="slide"
                onRequestClose={cerrarModal}
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modal}>
                        <View style={styles.closeModal}>
                            <Button title="X" color="black" onPress={cerrarModal} />
                        </View>
                        <SafeAreaView style={styles.container4}>




                            <SectionList
                                sections={Object.entries(platillosSeleccionados).map(([title, data]) => ({
                                    title,
                                    data
                                }))}
                                keyExtractor={(item, index) => item + index}
                                renderItem={({ item, section }) => (
                                    <View style={styles.cardModal}>
                                        <View style={styles.container3}>
                                            <View style={styles.column}>
                                                {item && item.nombre && (
                                                    <Text style={styles.titleNumMesa}>{item.nombre}</Text>
                                                )}
                                                {item && item.descripcion && (
                                                    <Text style={styles.titleNombreMesa}>{item.descripcion}</Text>
                                                )}
                                            </View>
                                            <View style={styles.column}>
                                                <View style={styles.row2}>
                                                    <TouchableOpacity
                                                        style={styles.botonCantidad}
                                                        onPress={() => {
                                                            disminuir(item);
                                                        }}
                                                    >
                                                        <Text style={styles.textBoton}>-</Text>
                                                    </TouchableOpacity>
                                                    <Text style={styles.inputForm}>
                                                        {cantidades[item.nombre] || 0}
                                                    </Text>
                                                    <TouchableOpacity
                                                        style={styles.botonCantidad}
                                                        onPress={() => {
                                                            aumentar(item);
                                                        }}
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
        color: "rgba(245, 133, 0, 1)",
        fontSize: 50,
        fontWeight: "bold",
        marginRight: "40%",

    },

    logo: {
        width: 60,
        height: 60,
        marginStart: 25,

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
        height: '15%',
        margin: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.33)',
        marginTop: 20,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: "center",
        borderWidth: 2,
        borderColor: "rgba(255, 0, 0, 1)",

    },

    cardtext: {
        color: "rgba(0, 0, 0, 1)",
        fontSize: 40,
        fontWeight: "bold",
    },

    loginButton: {
        marginRight: '35%',
        height: 50,
        width: 100,
        backgroundColor: "rgba(0, 0, 0, 1)",
        padding: 15,
        borderRadius: 10,
    },

    loginButton2: {
        height: 50,
        width: 100,
        backgroundColor: "rgba(0, 0, 0, 1)",
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
        backgroundColor: "rgba(245, 133, 0, 1)",
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
        backgroundColor: "rgba(0, 0, 0, 1)",
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