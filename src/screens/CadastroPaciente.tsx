import { useEffect, useState } from "react";
import { obterPacienteLogado, obterPacientes, salvarPacienteLogado } from "../service/storage";
import { Alert } from "react-native";

export default function CadastroPaciente({ navigation }: any) {
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [etapa, setEtapa] = useState<"cpf" | "cadastro">("cpf");
  const [verificando, setVerificando] = useState(false);
  const [erro, setErro] = useState("");

  // Reseta o formulário quando a tela é focada
useEffect(() => {
  const unsubscribe = navigation.addListener('focus', async () => {
    console.log("Tela de Login focada - verificando sessão");
    
    // Primeiro verifica se há um paciente logado
    try {
      const pacienteLogado = await obterPacienteLogado();
      if (pacienteLogado) {
        console.log("Paciente já está logado:", pacienteLogado.nome);
        console.log("Redirecionando para Home...");
        navigation.replace("Home");
        return; // Importante: sai da função
      }
      console.log("Nenhum paciente logado - mostrando tela de login");
    } catch (e) {
      console.error("Erro ao verificar paciente logado:", e);
    }
    
    // Se não há paciente logado, reseta o estado
    setEtapa("cpf");
    setCpf("");
    setNome("");
    setEmail("");
    setTelefone("");
    setErro("");
    setVerificando(false);
  });
  return unsubscribe;
}, [navigation]);

function validarCPF(cpf: string): boolean {
  const cpfLimpo = cpf.replace(/\D/g, "");
  return cpfLimpo.length === 11;
}

async function verificarCPF() {
  setErro(""); // Limpa erro anterior
  
  if (!cpf.trim()) {
    Alert.alert("Erro", "Por favor, preencha seu CPF");
    return;
  }
  if (!validarCPF(cpf)) {
    Alert.alert("Erro", "CPF deve ter 11 dígitos");
    return;
  }
  try {
    setVerificando(true);
    const pacientes = await obterPacientes();
    
    // Logs de debug (podem ser removidos em produção)
    console.log("Total de pacientes no storage:", pacientes.length);
    console.log("CPF buscado (sem formatação):", cpf.replace(/\D/g, ""));
    
    // Verifica se já existe um paciente com este CPF
    // Remove formatação de ambos os lados para garantir match
    const pacienteExistente = pacientes.find(
      (p) => p.cpf.replace(/\D/g, "") === cpf.replace(/\D/g, "")
    );
    if (pacienteExistente) {
      console.log("Paciente encontrado:", pacienteExistente.nome);
      // Paciente já cadastrado - faz login automaticamente
      await salvarPacienteLogado(pacienteExistente);
      console.log("Login realizado! Navegando para Home...");
      navigation.replace("Home");
    } else {
      console.log("Paciente NÃO encontrado");
      // CPF não encontrado - exibe mensagem de erro
      setErro("CPF não encontrado no cadastro. Verifique se digitou corretamente.");
    }
  } catch (erro) {
    console.error("Erro ao verificar CPF:", erro);
    Alert.alert("Erro", "Não foi possível verificar o CPF");
  } finally {
    setVerificando(false);
  }
}
}