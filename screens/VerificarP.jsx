import React, { useState , useEffect} from "react";
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
import { Backend } from "../config/backendconfig";


export default function VerificarP({ route, navigation }) {

  const { url } = Backend();



    const { platillosSeleccionados, userData, numeroMesa } = route.params;


    const handleLogout = () => {
        navigation.navigate("Home", { userData: userData });
    };

    const editarP = () => {
        navigation.navigate("Menu", { userData: userData, platillosSeleccionados: platillosSeleccionados, idPedido: idPedido, numeroMesa: numeroMesa  });
    }


    const confirmarP = () => {
        console.log('ConfirmarP :');
        console.log({
          platillosSeleccionados: platillosSeleccionados,
          userData: userData,
          total: total,
          numeroMesa: numeroMesa,
          idPedido: idPedido
        });
        
        if (navigation && typeof navigation.replace === 'function') {
          navigation.replace("Splash", {
            platillosSeleccionados: platillosSeleccionados,
            userData: userData,
            total: total,
            numeroMesa: numeroMesa,
            idPedido: idPedido
          });
        }else {
          console.error('navigation or navigation.replace is not defined');
        }
      }

    const filteredData = platillosSeleccionados ? platillosSeleccionados.map(section => {
        const data = Object.keys(section)
        .filter(key => key !== 'data' && section[key].cantidad > 0)
        .map(key => ({...section[key], idPlatillo: key}));
        return {
            ...section,
            data: data
        };
    }) : [];

    const calcularTotal = () => {
        let total = 0;
        filteredData.forEach(section => {
            section.data.forEach(item => {
                total += item.precio * item.cantidad;
            });
        });
        return total;
    }




console.log('userData wasasd:', userData.data.user.idUsuario);
    
    const [pedidos, setPedidos] = useState(null);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [idPedido, setIdPedido] = useState(null);
    
    useEffect(() => {
      const getPedidos = async () => {
        if (userData && userData.data.user.idUsuario) {
          try {
            const requestUrl = `${url}/pedidos/`;
            console.log('Sending request to:', requestUrl);
            const response = await fetch(requestUrl, {
              headers: {
                Authorization: `Bearer ${userData.data.token}`,
              },
            });
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const responseJson = await response.json();
            console.log('Response from /pedidos/ endpoint:', responseJson);
    
            const currentOrder = responseJson.data.find(
              pedido =>
                pedido.usuario.idUsuario === userData.data.user.idUsuario &&
                pedido.mesa.idMesa === numeroMesa &&
                pedido.estado === "En proceso"
            );
    
            if (currentOrder) {
              console.log(`Found order with idPedido: ${currentOrder.idPedido}`);
              setCurrentOrder(currentOrder);
              setIdPedido(currentOrder.idPedido);
            } else {
              console.log('No matching order found');
            }
          } catch (error) {
            console.error(error);
          }
        } else {
          console.log('userData, userData.data, userData.data.user, or userData.data.user.idUsuario is undefined');
        }
      };
    
      getPedidos();
    }, [userData]);
    
const total = calcularTotal();
const mesa = userData?.data?.user.pedidosBean?.[0]?.mesa?.numeroMesa;



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
      {
        filteredData && filteredData.length > 0 ? (
          <SectionList
            sections={filteredData}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
              <View style={styles.container5}>
                <View style={styles.container6}>
                  <Text style={styles.item}>{item.nombre}</Text>
                  <Text style={styles.item}>Precio Unitario: ${item.precio}</Text>
                </View>
                <View style={styles.container6}>
                  <Text style={styles.item}>{item.menu.descripcion}</Text>
                  <Text style={styles.item}>Cantidad: {item.cantidad}</Text>
                </View>
              </View>
            )}
          />
        ) : (
          <Text>No has elegido nada</Text>
        )
      }
    </SafeAreaView>
    <View style={styles.container5}>
  <View style={styles.container6}>
  <Text>{idPedido ? `Pedido Mesa: ${idPedido}` : 'Cargando pedido...'}</Text>
    <Text style={styles.item}>Total: ${total}</Text>
  </View>
  <View style={styles.container6}>
    <Text style={styles.item}>A Nombre de: {userData.data.user.user}</Text>
  </View>
</View>
                    <View style={styles.container3}>
                        <TouchableOpacity onPress={editarP} style={styles.loginButton}>
                            <Text style={styles.buttonText}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
  onPress={confirmarP} 
  style={[
    styles.loginButton,
    (!platillosSeleccionados || Object.keys(platillosSeleccionados).length === 0) ? styles.disabledButton : {}
  ]}
  disabled={!platillosSeleccionados || Object.keys(platillosSeleccionados).length === 0}
>
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
    disabledButton: {
        backgroundColor: 'gray',
      },
});