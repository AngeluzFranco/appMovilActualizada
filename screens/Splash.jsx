import { useNavigation , useRoute} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';


const Splash = () => {
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    console.log('platillosSeleccionados:', route.params?.platillosSeleccionados);
    console.log('userData:', route.params?.userData);
    console.log('total:', route.params?.total);

    const timeoutId = setTimeout(() => {
        navigation.replace('Pedido',  {
            userData: route.params?.userData,
            platillosSeleccionados: route.params?.platillosSeleccionados,
            total: route.params?.total
        });
    }, 1000);

    return () => clearTimeout(timeoutId);
}, [navigation, route]);

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