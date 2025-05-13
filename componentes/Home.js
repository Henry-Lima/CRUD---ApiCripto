import { useEffect, useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { FlatList, View } from "react-native-web";
import { deleteCripto, fetchCripto } from './Api';

export default function Home({ navigation }) {
    const [registro, setRegistros] = useState([]);

    useEffect(() => {
        fetchCripto(setRegistros);
    }, []);

    const handleDelete = (id) => {
        Alert.alert(
            'Confirmação',
            'Tem certeza de que deeseja deletar esta Cripto?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Deletar',
                    onPress: () => deleteCripto(id, setRegistros),
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={registro}
                keyExtractor={(item) => item.codigo.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemText}>
                            Cripto: {item.sigla} - Sigla: {item.nome}
                        </Text>
                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                style={[styles.button, styles.deleteButton]}
                                onPress={() => handleDelete(item.codigo)}
                            >
                                <Icon name="trash" size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
            <FloatingActionButton 
            onPress={() => navigation.navigate('Cadastro')}
            icon='plus'
            />
            </View>
    );
}

const style = StyleSheet.create ({
    container: {
        flex: 1,
        padding: 10,
    },
    itemContainer: {
        marginBottom: 12,
        padding: 10,
        BackgroundColor: '#f1f1f1',
        borderRadius: 6,
    },
    itemText: {
        marginBottom: 8,
        fontSize: 14,
        color: '#333',
    },
    buttonRow: {
        flexDirectiom: 'row',
        justfyContent: 'flex-end',
        gap:10,
    },
    button: {
        paddingVertical:6,
        paddingHorizontal: 12,
        borderRadius: 4,
    },
    deleteButton: {
        BackgroundColor: '#e74c3c',
    },
    editButton: {
        BackgroundColor: '#3498db',
    },
    buttonText: { 
        color: '#fff',
        fontWeight: 'bold',
    },
});
    
