import { useNavigation , useRoute} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Backend } from "../config/backendconfig";

const Splash = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {url} = Backend();
  
  useEffect(() => {
    const platillosSeleccionados = route.params?.platillosSeleccionados.flat();       
    console.log('idPedido:', route.params?.idPedido);
   
    const postPedido = (platillo) => {
      const detallesPedidoBean = {
          platillo: {
              idPlatillo: platillo.idPlatillo
          },
          cantidad: platillo.cantidad,
          pedido: {
              idPedido: route.params?.idPedido
          },
          precio_total: platillo.precio * platillo.cantidad
      };
    
      console.log('Datos antes de la petición:', detallesPedidoBean);
    
      fetch(url + '/detallepedido/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + route.params?.userData.data.token,
        },
        body: JSON.stringify(detallesPedidoBean)
      })

      .then(response => {
          if (!response.ok) {
              console.error('Error status:', response.status);
              return response.text().then(text => {
                  throw new Error('Error response text: ' + text);
              });
          }
          return response.json();
      })
      .then(data => {
          console.log('Datos después de la petición:', data);
      })
      .catch((error) => {
          console.error('Error:', error);
          Alert.alert('Error', 'Hubo un error al enviar el pedido. Por favor, intenta de nuevo más tarde.');
      });
    };
    
    platillosSeleccionados.forEach(postPedido);

    const timeoutId = setTimeout(() => {
        navigation.replace('Home',  {
            userData: route.params?.userData,
            platillosSeleccionados: platillosSeleccionados,
            total: route.params?.total,
            mesa: route.params?.mesa,
            idPedido: route.params?.idPedido
        });
    }, 1000);

    return () => clearTimeout(timeoutId);
}, [navigation, route, url]);


  return (
    <View style={style.container}>
      <LottieView
        source={require('../assets/pedidolisto.json')}
        autoPlay={true}
        loop={true}
        style={style.loadingAnimation}
      />
      <Text
        style={{
          fontWeight: 'bold',
          marginTop: 20,
          color: '#002e60'
        }}>
        Pedido realizado!!
      </Text>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  loadingAnimation: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
  },
  imageLogo: {
    width: 200,
    height: 200,
    resizeMode: 'contain'
  },
});

export default Splash;