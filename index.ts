;import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  HomeScreen,
  ConsultasListScreen,
  ConsultaDetalhesScreen,
  NovaConsultaScreen,
  LoginScreen,
  CadastroPacienteScreen,
  MinhasConsultasScreen,
  AdminScreen,
  AgendamentoScreen,
} from "./src/screens";

// Tipagem das rotas (boas práticas de TypeScript)
export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  ConsultasList: undefined;
  ConsultaDetalhes: { consultaId: number };
  NovaConsulta: undefined;
  CadastroPaciente: undefined;
  MinhasConsultas: undefined;
  Admin: undefined;
  Agendamento: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#79059C",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        {/* Tela de Login - Ponto de entrada */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: "Login",
            headerShown: false,
          }}
        />
         {/* Tela Principal - Home */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Sistema de Consultas",
            headerShown: true,
          }}
        />

        {/* Lista de Consultas */}
        <Stack.Screen
          name="ConsultasList"
          component={ConsultasListScreen}
          options={{
            title: "Minhas Consultas",
          }}
        />
         {/* Detalhes de uma Consulta Específica */}
        <Stack.Screen
          name="ConsultaDetalhes"
          component={ConsultaDetalhesScreen}
          options={{
            title: "Detalhes da Consulta",
          }}
        />

        {/* Agendar Nova Consulta */}
        <Stack.Screen
          name="NovaConsulta"
          component={NovaConsultaScreen}
          options={{
            title: "Agendar Consulta",
          }}
        />
         {/* Cadastro de Paciente */}
        <Stack.Screen
          name="CadastroPaciente"
          component={CadastroPacienteScreen}
          options={{
            title: "Cadastro de Paciente",
          }}
        />

        {/* Minhas Consultas (Alternativa) */}
        <Stack.Screen
          name="MinhasConsultas"
          component={MinhasConsultasScreen}
          options={{
            title: "Minhas Consultas",
          }}
        />
 {/* Painel Administrativo */}
        <Stack.Screen
          name="Admin"
          component={AdminScreen}
          options={{
            title: "Painel Admin",
          }}
        />

        {/* Agendamento de Consultas */}
        <Stack.Screen
          name="Agendamento"
          component={AgendamentoScreen}
          options={{
            title: "Agendamento",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}