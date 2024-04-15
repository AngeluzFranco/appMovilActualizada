import { useNavigation, useRoute } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Backend } from "../config/backendconfig";

const Splash = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { url } = Backend();




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
        console.log('Token:', route.params?.userData.data.token);
        console.log('URL:', url + '/detallepedido/');

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

    
            const notificacionesDto = {
              tipo: "Urgente",
              descripcion: "Comanda Actualizada",
              fecha: new Date().toLocaleString('en-CA', { timeZone: 'America/Mexico_City' }).split(' ')[0].replace(/,/g, ''), 
              status: "Activo",
              usuarioId: 3
          };
          
          console.log('Datos antes de la segunda petición:', notificacionesDto);
          console.log('URL:', url + '/notificacion/');
          console.log('Token2:', 'Bearer ' + route.params?.userData.data.token); 
          
          return fetch(url + '/notificacion/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + route.params?.userData.data.token,
              },
              body: JSON.stringify(notificacionesDto)
          });
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
     
            console.log('Datos después de la segunda petición:', data);
            navigation.replace('Home', { userData: route.params?.userData });
           
        })
    
        .catch((error) => {
            console.error('Error:', error);
            Alert.alert('Error', 'Hubo un error al enviar el pedido. Por favor, intenta de nuevo más tarde.');
        });
    };

    platillosSeleccionados.forEach(postPedido);
}, []);

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