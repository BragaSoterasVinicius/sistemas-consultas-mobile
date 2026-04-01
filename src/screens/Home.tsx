import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Button, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Consulta } from "../interfaces/consulta";
import { styles } from "../styles/app.styles";
// Importa funções do service layer
import { obterConsultas, obterPacienteLogado, salvarConsultas } from "../service/storage";
import ConsultaCard from "../components/ConsultaCard";

// Recebe navigation como prop (injetado pelo React Navigation)
export default function Home({ navigation }: any) {
  // Estado agora é um ARRAY de consultas
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [nomePaciente, setNomePaciente] = useState("");
  // Carrega dados sempre que a tela ganhar foco
  useFocusEffect(
    React.useCallback(() => {
      carregarDados();
    }, [])
  );
  // Carrega dados ao montar o componente
  useEffect(() => {
    carregarConsultas();
  }, []);

  // Função que busca consultas do AsyncStorage
  async function carregarConsultas() {
    const consultasSalvas = await obterConsultas();
    setConsultas(consultasSalvas);
  }

  async function confirmarConsulta(consultaId: number) {
  // Atualiza estado local
  const consultasAtualizadas = consultas.map((c) =>
    c.id === consultaId ? { ...c, status: "confirmada" as const } : c
  );
  setConsultas(consultasAtualizadas);
  
  // Atualiza todas as consultas no storage
  const todasConsultas = await obterConsultas();
  const consultasAtualizadasCompletas = todasConsultas.map((c) =>
    c.id === consultaId ? { ...c, status: "confirmada" as const } : c
  );
  await salvarConsultas(consultasAtualizadasCompletas);
}

  async function cancelarConsulta(consultaId: number) {
  // Atualiza estado local
  const consultasAtualizadas = consultas.map((c) =>
    c.id === consultaId ? { ...c, status: "cancelada" as const } : c
  );
  setConsultas(consultasAtualizadas);
  
  // Atualiza todas as consultas no storage
  const todasConsultas = await obterConsultas();
  const consultasAtualizadasCompletas = todasConsultas.map((c) =>
    c.id === consultaId ? { ...c, status: "cancelada" as const } : c
  );
  await salvarConsultas(consultasAtualizadasCompletas);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Minhas Consultas</Text>
          <Text style={styles.subtitulo}>
            {consultas.length} consulta(s) agendada(s)
          </Text>
        </View>

        {/* Renderização condicional: vazio ou lista */}
        {consultas.length === 0 ? (
          <View style={{ padding: 20, alignItems: "center" }}>
            <Text style={{ color: "#666", marginBottom: 20 }}>
              Nenhuma consulta agendada ainda
            </Text>
            {/* Botão para navegar para Admin */}
            <Button
              title="Ir para Admin"
              onPress={() => navigation.navigate("Admin")}
            />
          </View>
        ) : (
          // map renderiza um componente para cada consulta
          consultas.map((consulta) => (
            <ConsultaCard
              key={consulta.id}
              consulta={consulta}
              onConfirmar={() => confirmarConsulta(consulta.id)}
              onCancelar={() => cancelarConsulta(consulta.id)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
  async function carregarDados() {
    // Verifica se há paciente logado
    const paciente = await obterPacienteLogado();
    if (!paciente) {
      // Se não houver, redireciona para login
      navigation.replace("Login");
      return;
    }
    setNomePaciente(paciente.nome);
    // Carrega consultas do paciente
    const todasConsultas = await obterConsultas();
    const consultasDoPaciente = todasConsultas.filter(
      (c) => c.paciente.id === paciente.id
    );
    setConsultas(consultasDoPaciente);
  }
}

function useFocusEffect(arg0: () => void) {
  throw new Error("Function not implemented.");
}
