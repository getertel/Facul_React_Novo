import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import GestorDados from "@/models/GestorDados";
import ProdutoItem from "@/components/ProdutoItem"; // vamos criar já
import { styles } from "@/CommonStyles";
import { useIsFocused, useRouter } from "expo-router";

export default function ProdutoLista() {
  const gestor = new GestorDados();
  const [produtos, setProdutos] = useState<any[]>([]);
  const isFocused = useIsFocused();
  const router = useRouter();

  useEffect(() => {
    gestor.obterTodos().then((objs) => setProdutos(objs));
  }, [isFocused]);

  function excluirProduto(codigo: number) {
    gestor.remover(codigo).then(() => {
      gestor.obterTodos().then((objs) => setProdutos(objs));
    });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/ProdutoForm")}
      >
        <Text style={styles.buttonTextBig}>Novo Produto</Text>
      </TouchableOpacity>

      <FlatList
        style={styles.scrollContainer}
        data={produtos}
        contentContainerStyle={styles.itemsContainer}
        keyExtractor={(item) => item.codigo.toString()}
        renderItem={({ item }) => (
          <ProdutoItem
            onDelete={() => excluirProduto(item.codigo)}
            produto={item}
          />
        )}
      />
    </View>
  );
}
