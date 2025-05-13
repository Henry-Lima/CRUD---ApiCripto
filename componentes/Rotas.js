import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Alterar from '../componentes/Alterar';
import Cadastro from '../componentes/Cadastro';
import Home from '../componentes/Home';

const Stack = createStackNavigator();

export default function Rotas() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName = "Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Cadastro" component={Cadastro} />
                <Stack.Screen name="Alterar" component={Alterar} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
