import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

//importamos las pantallas que vamos a utilizar
import Login from "./screens/Login";
import Home from "./screens/Home";
import Menu from "./screens/Menu";
// import Pedido from './screens/Pedido';
import Splash from "./screens/Splash";
import VerificarP from "./screens/VerificarP";
import MesasPedidos from "./screens/MesasPedidos";

export default function App() {
  //declaramos una constante stack para poder navegar entre las pantallas
  const Stack = createStackNavigator();

  //declaramos una funcion que nos permitira navegar entre las pantallas
  function MyStack() {
    return (
      //declaramos las pantallas que vamos a utilizar
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: "Login",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Home",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{
            title: "Menu",
            headerShown: false,
          }}
        />
        {/* <Stack.Screen name="Pedido" component={Pedido}
        options={{
          title: "Pedido",
          headerShown: false
        }}
        /> */}
        <Stack.Screen
          name="VerificarP"
          component={VerificarP}
          options={{
            title: "VerificarP",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            title: "Splash",
            headerShown: false,
          }}
        />
        <Stack.Screen name="MesasPedidos" component={MesasPedidos} />
      </Stack.Navigator>
    );
  }

  return (
    //retornamos la funcion que nos permitira navegar entre las pantallas
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
