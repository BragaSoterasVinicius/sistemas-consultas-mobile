import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import styles from "../styles/login.styles";
type LoginProps = {
  navigation: any;
};

export default function Login({ navigation }: LoginProps) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.content}>
        <Text style={styles.icone}>🔑</Text>
        <Text style={styles.titulo}>Tela de Login</Text>
        <Text style={styles.subtitulo}>Sistema de Consultas Médicas</Text>
        
        <View style={styles.botoesContainer}>
          <TouchableOpacity
            style={[styles.botao, styles.botaoPrimario]}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.botaoTexto}>Entrar como Paciente</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botao, styles.botaoSecundario]}
            onPress={() => navigation.navigate("Admin")}
          >
            <Text style={styles.botaoTexto}>Entrar como Admin</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botao, styles.botaoTerciario]}
            onPress={() => navigation.navigate("CadastroPaciente")}
          >
            <Text style={styles.botaoTextoSecundario}>Criar Conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}