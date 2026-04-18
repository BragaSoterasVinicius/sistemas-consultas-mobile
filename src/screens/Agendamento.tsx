import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
// Componente não utilizado na versão simplificada
import { styles } from "../styles/agendamento.style";
type AgendamentoProps = {
  onAgendamentoSuccess: () => void;
};

export default function Agendamento({
  onAgendamentoSuccess,
}: AgendamentoProps) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.titulo}>📅 Agendar Consulta</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.etapa}>
          <Text style={styles.etapaTitulo}>Componente não utilizado</Text>
          <View style={styles.card}>
            <Text style={styles.cardDesc}>
              Este componente não está ativo na versão simplificada.
              Use a tela Admin para criar consultas de teste.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


