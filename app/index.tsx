import { useEffect, useState } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { Produto } from "@/models/Produto";
import GestorDados from "@/models/GestorDados";

export default function Index() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const gestor = new GestorDados();

  // Carrega os produtos quando o app inicia
  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    const lista = await gestor.obterTodos();
    setProdutos(lista);
  };

  const adicionarProduto = async () => {
    // Criando um produto aleatório para testar
    const novo = new Produto(
      Math.floor(Math.random() * 1000), // código aleatório
      "Produto " + (produtos.length + 1),
      Math.floor(Math.random() * 50) + 1
    );

    await gestor.adicionar(novo);
    await carregarProdutos(); // recarrega a lista
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>📦 Lista de Produtos</Text>

      <Button title="Adicionar Produto" onPress={adicionarProduto} />

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.codigo.toString()}
        renderItem={({ item }) => (
          <View style={{ marginTop: 10, padding: 10, borderWidth: 1, borderRadius: 8, width: 250 }}>
            <Text>Código: {item.codigo}</Text>
            <Text>Nome: {item.nome}</Text>
            <Text>Quantidade: {item.quantidade}</Text>
          </View>
        )}
      />
    </View>
  );
}
