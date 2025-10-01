import AsyncStorage from '@react-native-async-storage/async-storage';
import { Produto } from './Produto';

// Função para salvar um produto no AsyncStorage
const salvarProduto = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error("Erro ao salvar produto:", e);
  }
};

// Função para remover um produto pelo código (chave)
const removerProduto = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error("Erro ao remover produto:", e);
  }
};

// Função para obter todos os itens do AsyncStorage em formato JSON
const obterProdutosJSON = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys(); // pega todas as chaves direto
    return await AsyncStorage.multiGet(keys);
  } catch (e) {
    console.error("Erro ao obter produtos JSON:", e);
    return [];
  }
};


// Função para transformar JSON em objetos Produto
const obterProdutos = async () => {
  try {
    let objetos: Produto[] = [];
    let objJSON = await obterProdutosJSON();
    if (objJSON != null && objJSON.length > 0) {
      objJSON.forEach(element => {
        if (element[1]) {
          let produto: Produto = JSON.parse(element[1]);
          objetos.push(produto);
        }
      });
    }
    return objetos;
  } catch (e) {
    console.error("Erro ao obter produtos:", e);
    return [];
  }
};

// Classe que encapsula a lógica acima
class GestorDados {
  public async remover(chave: number) {
    await removerProduto(chave.toString());
  }

  public async adicionar(produto: Produto) {
    await salvarProduto(produto.codigo.toString(), produto);
  }

  public async obterTodos(): Promise<Array<Produto>> {
    let lista: Array<Produto> = await obterProdutos();
    return lista;
  }
}

export default GestorDados;
