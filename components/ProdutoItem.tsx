import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "@/CommonStyles";

export default function ProdutoItem({ produto, onDelete }: any) {
  return (
    <View style={styles.container} key={produto.codigo}>
      <Text style={styles.textItem}>
        {produto.codigo} - {produto.nome}
      </Text>
      <Text style={styles.textItem}>Quantidade: {produto.quantidade}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.buttonText}>X</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
