import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Consulta } from "../interfaces/consulta"; // ← import do type GLOBAL

// Type LOCAL (usado apenas aqui)
type ConsultaCardProps = {
  consulta: Consulta;
  onConfirmar?: () => void;
  onCancelar?: () => void;
};

export default function ConsultaCard({
  consulta,
  onConfirmar,
  onCancelar,
}: ConsultaCardProps) {

  function formatarValor(valor: number): string {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }
  function formatarData(data: Date): string {
    return data.toLocaleDateString("pt-BR");
  }
  return (
    <View style={styles.card}>
      <Text>{consulta.paciente.nome}</Text>
      <Text>{formatarData(consulta.data)}</Text>
      <Text>{formatarValor(consulta.valor)}</Text>
    </View>
  );
}

// Estilos LOCAIS (encapsulados no componente)
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
  },
});