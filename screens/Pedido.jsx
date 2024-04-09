import React, { useState, useEffect } from "react";
import { BlurView } from 'expo-blur';

import { useNavigation, useRoute } from '@react-navigation/native';
import {
    View,
    Image,
    Button,
    StyleSheet,
    Modal,
    Alert,
    TextInput,
    ScrollView,
    ImageBackground,
    Text,
    TouchableOpacity,
    TouchableHighlight
} from "react-native";
import { Backend } from "../config/backendconfig";

import Icon from 'react-native-vector-icons/Ionicons';

export default function Pedido({ navigation }) {

    console.log('Pedido');

    const { url } = Backend();


    const route = useRoute();
    const userData = route.params?.userData;
    const platillosSeleccionados = route.params?.platillosSeleccionados;
    const total = route.params?.total;
    const mesa = route.params?.mesa;

    console.log('userData:', userData);
    console.log('platillosSeleccionados:', platillosSeleccionados);
    console.log('total:', total);
    console.log('mesa:', mesa);


    const [pedido, setPedido] = useState(null);

    const handleLogout = () => {
        navigation.navigate("Home", { userData: userData });
    };

    const [modalVisible, setModalVisible] = useState(false);

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const [detailsVisible, setDetailsVisible] = useState(false);

    const obtenerPedidos = async () => {
        try {
            const response = await fetch(url + '/pedidos/');

            if (!response.ok) {
                throw new Error('Error al obtener los pedidos: ' + response.status);
            }

            const data = await response.json();
            console.log('Recibido los siguientes datos de la respuesta:', data);

            const pedidoUsuarioMesa = data.data.find(pedido =>
                pedido.usuario.idUsuario === userData.data.idUsuario &&
                pedido.mesa.idMesa === mesa
            );

            console.log('Pedido para el usuario y mesa especificados:', pedidoUsuarioMesa);

            setPedido(pedidoUsuarioMesa);

        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Hubo un error al obtener los pedidos. Por favor, intenta de nuevo más tarde.');
        }
    };

    useEffect(() => {
        obtenerPedidos();
    }, []);


    return (
        <ImageBackground
            source={require("../assets/fondo2.png")}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <View style={{ flex: 1, flexDirection: "row", padding: 10 }}>
                    <Text style={styles.titleMesas}>Pedidos</Text>
                    <TouchableOpacity onPress={handleLogout}>
                        <Image
                            source={require("../assets/gastromanager3.png")}
                            style={styles.logo}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.container2}>
                    <View style={styles.formContainer2}>
                        <View style={styles.container3}>
                            <View style={styles.column}>
                                <Text style={styles.titleNumMesa}>Pedido: {pedido?.idPedido}</Text>
                                <Text style={styles.titleNombreMesa}>Para la mesa: {pedido?.mesa?.numeroMesa}</Text>
                                <Text style={styles.titleNombreMesa}>Estado: {pedido?.estado}</Text>
                            </View>
                            <View style={styles.column}>
                                <View style={{ alignItems: 'center' }}>
                                    <Image
                                        source={require("../assets/pedido.png")}
                                        style={styles.mesa} />


                                    <View style={{ alignItems: 'center' }}>
                                        <TouchableOpacity
                                            style={{
                                                backgroundColor: 'rgba(105,105,105,0.5)',
                                                padding: 4,
                                                marginStart: 35,
                                                borderRadius: 5,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginTop: 10,
                                                width: 50,
                                            }}
                                            onPress={handleOpenModal}
                                        >
                                            <Icon name="ellipsis-vertical" size={24} color="white" />
                                        </TouchableOpacity>


                                    </View>

                                </View>
                                <Text style={{ color: 'white' }}>Ver detalles del pedido</Text>
                            </View>
                        </View>
                    </View>
                </View>



                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={handleCloseModal}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: 'white', width: '80%', borderColor: 'black', borderWidth: 1, borderRadius: 10, padding: 20 }}>
                            <TouchableHighlight
                                style={{ position: 'absolute', top: 10, right: 10 }}
                                onPress={handleCloseModal}
                            >
                                <Text style={{ fontSize: 24 }}>X</Text>
                            </TouchableHighlight>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 10 }}>Detalles del pedido:</Text>
                            <ScrollView style={{ borderWidth: 1, borderColor: '#000', margin: 10, width: '90%' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderColor: '#000' }}>
                                    <Text style={{ flex: 1, textAlign: 'center' }}>Nombre</Text>
                                    <Text style={{ flex: 1, textAlign: 'center' }}>Cantidad</Text>
                                    <Text style={{ flex: 1, textAlign: 'center' }}>Total</Text>
                                </View>
                                {platillosSeleccionados.flat().map((dish, index) => (
                                    <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                                        <Text style={{ flex: 2, textAlign: 'center' }}>{dish.nombre}</Text>
                                        <Text style={{ flex: 1, textAlign: 'center' }}>{dish.cantidad}</Text>
                                        <Text style={{ flex: 1, textAlign: 'center' }}>{dish.cantidad * dish.precio}</Text>
                                    </View>
                                ))}
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10, borderTopWidth: 1, borderColor: '#000' }}>
                                    <Text>Total a pagar: {total}</Text>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>



            </View>
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
        marginRight: "35%",
    },

    logo: {
        width: 60,
        height: 60,
    },

    container3: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    titleNumMesa: {
        color: "rgba(0, 0, 0, 1)",
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 20,
    },

    titleNombreMesa: {
        color: "rgba(0, 0, 0, 1)",
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 10,
    },

    container2: {
        padding: 10,
        marginTop: '-2%',
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 20,
        height: "90%",
        justifyContent: "top",
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

    formContainer2: {
        marginTop: 5,
        marginBottom: 20,
        padding: 10,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: 20,
        height: "auto",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: 'rgba(245, 133, 0, 1)',
    },

});