import React, { useState, useEffect } from "react";
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
  ScrollView,
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


  const updatePedidoEstado = async (pedidoId, nuevoEstado) => {
    try {
      const token = userData.data.token;
      const response = await fetch(`${url}/pedidos/${pedidoId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ estado: nuevoEstado })
      });
      if (!response.ok) {
        throw new Error('Hubo un error al actualizar el estado del pedido');
      }
      // Actualiza los pedidos después de la actualización del estado

    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      headerBackTitle: () => null,
      headerTitle: () => null,
      headerShown: false,
    });
  }, []);


  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = () => {
      fetch(`${url}/pedidos/mesa/${idMesa}`, {
        headers: {
          'Authorization': 'Bearer ' + userData.data.token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setPedidos(data);
          console.log('Pedidos:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };
  

    fetchPedidos();
  
  
    const intervalId = setInterval(fetchPedidos, 5000);
  
 
    return () => clearInterval(intervalId);
  }, [idMesa, userData]);


  return (
    <ImageBackground
      source={require("../assets/fondo2.png")}
      style={styles.backgroundImage}
    >
      <ScrollView>
    
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
                    <Text style={styles.titleNombreMesa}>Para la mesa: {pedido.mesa && pedido.mesa.idMesa}</Text>
                    <Text style={styles.titleNombreMesa}>Estado: {pedido.estado}</Text>
                  </View>
                  <View style={styles.column}>
                    <Image
                      source={require("../assets/pedido.png")}
                      style={styles.mesa} />



                    <View style={{ flexDirection: 'row' }}>
                      <TouchableHighlight
                        style={styles.buttonPagar}
                        activeOpacity={0.6}
                        underlayColor="#DDDDDD"
                        onPress={() => {
                          if (pedido.estado === 'Pagar') {
                            Alert.alert('Aviso', 'El pedido ya está listo para pagar.');
                            return;
                          }
                          Alert.alert(
                            'Confirmar pago',
                            '¿Estás seguro de que quieres levantar el pedido?',
                            [
                              {
                                text: 'Cancelar',
                                style: 'cancel',
                              },
                              {
                                text: 'Aceptar',
                                onPress: async () => {
                                  if (pedido.estado === 'Terminado') {
                                    await updatePedidoEstado(pedido.idPedido, 'Pagar');
                                    Alert.alert('Exito', 'El pedido ha sido liberado para pagar"');
                                  } else {
                                    // Mostrar un mensaje o alerta indicando que el pedido no está en estado "Terminado"
                                    Alert.alert('Aviso', 'El pedido no ha sido terminado.');
                                  }
                                }
                              }
                            ],
                            { cancelable: false }
                          );
                        }}>
                        <Text style={{ color: '#fff' }}> Pagar</Text>
                      </TouchableHighlight>
                      <TouchableHighlight
                        style={styles.button}
                        activeOpacity={0.6}
                        underlayColor="#DDDDDD"
                        onPress={() => {
                          setSelectedPedido(pedido);
                          setModalVisible(true);
                        }}>
                        <Text style={{ color: '#fff' }}> Ver</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>

              </View>

            ))}

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  {/* <Text style={styles.modalText}>Pedido: {selectedPedido?.idPedido}</Text>
                <Text style={styles.modalText}>Para la mesa: {selectedPedido?.mesa.idMesa}</Text>
                <Text style={styles.modalText}>Estado: {selectedPedido?.estado}</Text> */}

                  <View style={styles.headerRow}>
                    <View style={styles.cell}>
                      <Text style={styles.headerText}>Platillo</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text style={styles.headerText}>Precio</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text style={styles.headerText}>Cantidad</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text style={styles.headerText}>Total</Text>
                    </View>
                  </View>

                  {selectedPedido?.detallesPedidoBean.length > 0 ? (
                    selectedPedido?.detallesPedidoBean.map((detalle, index) => (
                      <View key={index} style={styles.row}>
                        <View style={styles.cell}>
                          <Text style={styles.cellText}>{detalle.platillo.nombre}</Text>
                        </View>
                        <View style={styles.cell}>
                          <Text style={styles.cellText}>{detalle.platillo.precio}</Text>
                        </View>
                        <View style={styles.cell}>
                          <Text style={styles.cellText}>{detalle.cantidad}</Text>
                        </View>
                        <View style={styles.cell}>
                          <Text style={styles.cellText}>{(detalle.platillo.precio) * (detalle.cantidad)}</Text>
                        </View>
                      </View>
                    ))
                  ) : (
                    <Text>No se ha ordenado ningún platillo.</Text>
                  )}




                  <Pressable
                    style={styles.buttonClose}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Cerrar</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>
        </View>
       </ScrollView>
    </ImageBackground>
  );
}




const styles = StyleSheet.create({

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  cell: {
    flex: 1,
  },

  cellText: {
    fontSize: 14,
    textAlign: 'center',
  },


  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    marginBottom: 0,
    marginTop: 0,
    backgroundColor: "rgba(255,255,255,0.01)",
  },

  titleMesas: {
    color: "rgba(245, 133, 0, 1)",
    fontSize: 50,
    fontWeight: "bold",
    textAlign: 'center',
    flex: 1,
    marginRight: 100,
  },

  logo: {
    width: 60,
    height: 60,
    marginRight: 0,
    marginTop: 10,
    marginLeft: 100,
  },

  container3: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  titleNumMesa: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgba(245, 133, 0, 1)',
  },

  platilloContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'rgba(248, 233, 215, 0.1)',
    borderRadius: 10,
  },

  platilloNombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  platilloDetalle: {
    fontSize: 14,
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
    marginLeft: "45%",
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
    marginLeft: '0%',
    backgroundColor: 'rgba(245, 133, 0, 1)',
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignSelf: 'center',
    height: 40,
    alignItems: 'center',
  },
  buttonPagar: {
    marginTop: 10,
    backgroundColor: '#ff1736',
    padding: 10,
    borderRadius: 5,
    width: 100,
    height: 40,
    marginRight: 10,
    alignItems: 'center',
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
    backgroundColor: "rgba(245, 133, 0, 1)",
    width: 100,
    height: 40,
    marginTop: 15,
    borderRadius: 10,
    alignContent: 'center',
    justifyContent: 'center',
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