import { useEffect, useState } from "react";
import { obterPacienteLogado } from "../service/storage";

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