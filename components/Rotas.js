import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Alterar from '../components/Alterar';
import Cadastro from '../components/Cadastro';
import Home from '../components/Home';

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
