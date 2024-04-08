import React, { useState , useEffect} from "react";
import { useNavigation, useRoute } from '@react-navigation/native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
    Pressable
} from "react-native";
import { Backend } from "../config/backendconfig";


export default function MesasPedidos({ navigation }) {
    const route = useRoute();
    const data = route.params?.data;
    const userData = route.params?.userData; 
    const idMesa = route.params?.idMesa;

    const [modalVisible, setModalVisible] = useState(false);
const [selectedPedido, setSelectedPedido] = useState(null);
    console.log('idMesa', JSON.stringify(idMesa, null, 2));



    const { url } = Backend();



    const handleLogout = () => {
        navigation.navigate("Home", { userData: userData });
    };


    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        fetch(`${url}/pedidos/mesa/${idMesa}`)
            .then((response) => response.json())
            .then((data) => {
                setPedidos(data);
                console.log('Pedidos:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
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
                {pedidos.length > 0 && pedidos.map((pedido, index) => (
  <View key={index} style={styles.formContainer2}>
    <View style={styles.container3}>
      <View style={styles.column}>
        <Text style={styles.titleNumMesa}>Pedido: {pedido.idPedido}</Text>
        <Text style={styles.titleNombreMesa}>Para la mesa: {pedido.mesa.idMesa}</Text>
        <Text style={styles.titleNombreMesa}>Estado: {pedido.estado}</Text>
      </View>
      <View style={styles.column}>
        <Image
          source={require("../assets/pedido.png")}
          style={styles.mesa} />
        <TouchableHighlight
          style={styles.button}
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={() => {
            setSelectedPedido(pedido);
            setModalVisible(true);
          }}>
          <Text></Text>
        </TouchableHighlight>
      </View>
    </View>
  </View>
    ))}
    <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    Alert.alert("Modal cerrado.");
    setModalVisible(!modalVisible);
  }}
>
<View style={styles.centeredView}>
    <View style={styles.modalView}>
      <Text style={styles.modalText}>Pedido: {selectedPedido?.idPedido}</Text>
      <Text style={styles.modalText}>Para la mesa: {selectedPedido?.mesa.idMesa}</Text>
      <Text style={styles.modalText}>Estado: {selectedPedido?.estado}</Text>
      {selectedPedido?.detallesPedidoBean.map((detalle, index) => (
        <Text key={index} style={styles.modalText}>Platillo: {detalle.platillo.nombre}</Text>
      ))}
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text style={styles.textStyle}>Cerrar</Text>
      </Pressable>
    </View>
  </View>
</Modal>
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
        width: wp('16%'),
        height: hp('10%'),
        marginEnd: wp('5%'),
        flex: 1,
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
        padding: 5,
    },

    mesa: {
        marginLeft: "20%",
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
    button: {
        marginTop: 10,
        marginLeft: '32%',
        backgroundColor: 'rgba(245, 133, 0, 1)',
        padding: 10,
        borderRadius: 5,
        width: 40,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
       
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        width: 'auto',
        height: 'auto',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      buttonClose: {
        backgroundColor: "#2196F3",
        width: 100,
        height: 40,
        marginTop: 15,
        borderRadius: 10,

      
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }

});