const API_URL = 'https://criptos.webapptech.cloud/api/cripto';
import { Alert } from 'react-native';

export const fetchCripto = async (setRegistros) => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Erro ao buscar Criptos');
    }
    const data = await response.json();
    setRegistros(data);
  } catch (error) {
    console.error('Erro ao buscar Criptos:', error);
    throw error;
  }
};

export const createCripto = async (CriptoData) => {
  try {
    const response = await fetch('https://criptos.webapptech.cloud/api/cripto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(CriptoData),
    });

    // Verifica se a API retornou status 204 (sem conteúdo)
    if (response.status === 204) {
      Alert.alert('Sucesso!', 'Cadastro realizado com sucesso!');
      return {}; // Retorna um objeto vazio para evitar erro
    }

    // Caso a API retorne conteúdo, tentamos converter para JSON
    const textResponse = await response.text();
    console.log('Resposta bruta da API:', textResponse);

    let responseData;
    try {
      responseData = JSON.parse(textResponse);
    } catch (error) {
      console.warn('A resposta não é um JSON válido.', error);
      responseData = null;
    }

    if (!response.ok || !responseData) {
      throw new Error(responseData?.message || 'Erro desconhecido na API');
    }

    return responseData;
  } catch (error) {
    console.error('Erro ao cadastrar Cripto:', error.message);
    Alert.alert('Erro ao cadastrar', `Detalhes: ${error.message}`);
    return null;
  }
};

export const deleteCripto = async (CriptoId, setRegistros) => {
  try {
    const response = await fetch(`https://criptos.webapptech.cloud/api/cripto${CriptoId}`, {
      method: 'DELETE',
    });

    // Verifica se a resposta foi bem-sucedida
    if (response.ok) {
      const responseData = await response.json(); // Obtém o JSON da resposta

      if (responseData.success) {
        Alert.alert('Sucesso!', responseData.message);
        // Atualiza a lista localmente, removendo o Cripto excluído
        setRegistros((prevRegistros) => {
          const novaLista = prevRegistros.filter((cripto) => cripto.codigo !== CriptoId);
          console.log('Nova lista de Criptos:', novaLista);
          return novaLista;
        });
      }
    }
  } catch (error) {
    console.error('Erro ao excluir Cripto:', error.message);
    Alert.alert('Erro ao excluir', `Detalhes: ${error.message}`);
  }
};

export const updateCripto = async (CriptoId, updatedData, navigation) => {
  try {
    const response = await fetch(`https://criptos.webapptech.cloud/api/cripto${CriptoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    console.log('Dados enviados:', updatedData);

    if (response.status === 200) {
      Alert.alert('Sucesso!', 'Cripto atualizada com sucesso!');
      navigation.navigate('Home'); // Volta para a tela principal
    } else {
      const textResponse = await response.text();
      let responseData;
      try {
        responseData = JSON.parse(textResponse);
      } catch (error) {
        console.warn('A resposta não é um JSON válido.');
        responseData = null;
      }

      throw new Error(responseData?.message || 'Erro desconhecido ao atualizar o Cripto');
    }
  } catch (error) {
    console.error('Erro ao atualizar Cripto:', error.message);
    Alert.alert('Erro ao atualizar', `Detalhes: ${error.message}`);
  }
};