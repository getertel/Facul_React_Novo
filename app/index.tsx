import { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { Produto } from "@/models/Produto";
import GestorDados from "@/models/GestorDados";

export default function Index() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const gestor = new GestorDados();

  // Carregar produtos ao iniciar
  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    const lista = await gestor.obterTodos();
    setProdutos(lista);
  };

  const adicionarProduto = async () => {
    const novo = new Produto(Date.now(), "Produto " + (produtos.length + 1), 1);
    await gestor.adicionar(novo);
    carregarProdutos();
  };

  const removerProduto = async (codigo: number) => {
    await gestor.remover(codigo);
    carregarProdutos();
  };

  const removerTodos = async () => {
    // Apenas para simplificar, limpamos todos manualmente
    for (const p of produtos) {
      await gestor.remover(p.codigo);
    }
    setProdutos([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📦 Lista de Produtos</Text>

      <Button title="➕ Adicionar Produto" color="blue" onPress={adicionarProduto} />
      <Button title="🗑️ Remover Todos" color="red" onPress={removerTodos} />

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.codigo.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{`${item.nome} (Qtd: ${item.quantidade})`}</Text>
            <Button
              title="Remover"
              color="orange"
              onPress={() => removerProduto(item.codigo)}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 40 },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
});
