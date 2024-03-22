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

export default function VerificarP(props) {
    const data = props.route.params.data;

    const handleLogout = () => {
        props.navigation.navigate("Home");
    };

    const editarP = () => {
        props.navigation.navigate("Menu");
    }

    const confirmarP = () => {
        props.navigation.replace("Splash");
    }
    const filteredData = data.map(section => ({
        ...section,
        data: section.data.filter(item => item.cantidad > 0)
    }));
  

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
                            source={require("../assets/gastromanager2.png")}
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
                <Text style={styles.item}>{item.name}</Text>
                <Text style={styles.item}>Cantidad: {item.cantidad}</Text>
            </View>
            <View style={styles.container6}>
                <Text style={styles.item}>{item.description}</Text>
                <Text style={styles.item}>Precio: ${item.precio}</Text>
            </View>
        </View>
    )}
/>
                    </SafeAreaView>
                    <View style={styles.container5}>
                        <View style={styles.container6}>
                            <Text style={styles.item}>Pedido Mesa: 1</Text>
                            <Text style={styles.item}>Total: 5,000</Text>
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
        color: "rgba(255, 255, 255, 100)",
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
        backgroundColor: "rgba(9,43,90,100)",
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
        color: "rgba(255, 255, 255, 100)",
    },

});