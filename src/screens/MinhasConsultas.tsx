import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import styles from "../styles/cadastroPaciente.styles";
type CadastroPacienteProps = {
  navigation: any;
};

export default function CadastroPaciente({ navigation }: CadastroPacienteProps) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.content}>
        <Text style={styles.icone}>📝</Text>
        <Text style={styles.titulo}>Cadastro de Paciente</Text>
        <Text style={styles.descricao}>
          Aqui você poderá criar sua conta no sistema
        </Text>

        <View style={styles.botoesContainer}>
          <TouchableOpacity
            style={[styles.botao, styles.botaoPrimario]}
            onPress={() => {
              // Simula cadastro bem-sucedido e redireciona para Home
              navigation.navigate("Home");
            }}
          >
            <Text style={styles.botaoTexto}>Criar Conta</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botao, styles.botaoSecundario]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.botaoTextoSecundario}>Voltar ao Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}