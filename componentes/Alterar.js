import { useState } from "react";
import { Alert } from "react-native";
import { Button, TextInput, View } from "react-native-web";
import { updateCripto } from "./Api";

export default function Alterar({ route, navigation }) {
    const { cripto } = route.params;
    const [nomeCripto, setNomeCripto] = useState(cripto.nomeCripto);
    const [siglaCripto, setSiglaCripto] = useState(cripto.siglaCripto); 

const handleUpdate = ( ) => {
    const updatedData = {
        nomeCripto,
        siglaCripto
    };

    Alert.alert(
        'Confirmação',
        'Tem certeza de que deseja alterar está Cripto ?',
        [
            {text: 'Cancelar', style: 'cancel'},
            {
                text: 'Alterar',
                onPress: ( ) => updateCripto(cripto.codigo, updateData, navigation),
            },
        ]
    );
};

return (
    <View>
        <TextInput
        placeholder="Nome da Cripto"
        value={nomeCripto}
        onChangeText={setNomeCripto}
        />
        <TextInput
        placeholder="Sigla da Cripto"
        value={siglaCripto}
        onChangeText={setSiglaCripto}
        />

        <Button tittle="Alterar" onPress={handleUpdate} />
    </View>
);
}



