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

export default function VerificarP({ route, navigation }) {
    const { platillosSeleccionados, userData } = route.params;

    console.log('platillosSeleccionados:', JSON.stringify(platillosSeleccionados, null, 2));
    console.log("userData"+JSON.stringify(userData));


    const handleLogout = () => {
        navigation.navigate("Home");
    };

    const editarP = () => {
        navigation.navigate("Menu", { userData: userData, platillosSeleccionados: platillosSeleccionados });
    }
    const confirmarP = () => {
        navigation.replace("Splash");
    }
 
    const filteredData = platillosSeleccionados ? platillosSeleccionados.map(section => {
        const data = Object.keys(section)
            .filter(key => key !== 'data' && section[key].cantidad > 0)
            .map(key => section[key]);
        return {
            ...section,
            data: data
        };
    }) : [];
    console.log('filteredData:', JSON.stringify(filteredData, null, 2));


    const calcularTotal = () => {
        let total = 0;
        filteredData.forEach(section => {
            section.data.forEach(item => {
                total += item.precio * item.cantidad;
            });
        });
        return total;
    }
    
    const total = calcularTotal();

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
                    <SafeAreaView style={styles.container4}>
                    <SectionList
  sections={filteredData}
  keyExtractor={(item, index) => item + index}
  renderItem={({ item }) => (
    <View style={styles.container5}>
      <View style={styles.container6}>
        <Text style={styles.item}>{item.nombre}</Text>
        <Text style={styles.item}>Cantidad: {item.cantidad}</Text>
      </View>
      <View style={styles.container6}>
        <Text style={styles.item}>{item.menu.descripcion}</Text>
        <Text style={styles.item}>Precio: ${item.precio}</Text>
      </View>
    </View>
  )}
/>

                    </SafeAreaView>
                    <View style={styles.container5}>
                        <View style={styles.container6}>
                            <Text style={styles.item}>Pedido Mesa: 1</Text>
                            <Text style={styles.item}>Total: ${total}</Text>
                        </View>
                        <View style={styles.container6}>
                            <Text style={styles.item}>A Nombre de: Miranda</Text>
                        </View>
                    </View>
                    <View style={styles.container3}>
                        <TouchableOpacity onPress={editarP} style={styles.loginButton}>
                            <Text style={styles.buttonText}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={confirmarP} style={styles.loginButton}>
                            <Text style={styles.buttonText}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
    },

    container3: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    container4: {
        height: "83%",
        width: "100%",
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 16,
    },

    container5: {
        justifyContent: "flex-start",
        width: "92%",
        marginBottom: 25,
        borderBottomColor: "rgba(0, 0, 0, 100)",
        borderBottomWidth: 2,
    },

    container6: {
        flexDirection: "row",
        justifyContent: "space-between",
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

    container2: {
        padding: 10,
        marginTop: '-2%',
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 20,
        height: "90%",
        justifyContent: "top",
    },


    loginButton: {
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

    item: {
        fontSize: 14,
        color: "rgba(0, 0, 0, 1)",
    },

});