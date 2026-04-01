import { useEffect, useState } from "react";
import { Especialidade } from "../types/especialidade";
import { Medico } from "../interfaces/medico";
import { obterEspecialidades, obterMedicos } from "../service/storage";

export default function Agendamento({ navigation }: any) {
  const [especialidades, setEspecialidades] = useState<Especialidade[]>([]);
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [medicosFiltrados, setMedicosFiltrados] = useState<Medico[]>([]);
  const [especialidadeSelecionada, setEspecialidadeSelecionada] =
    useState<Especialidade | null>(null);
  const [medicoSelecionado, setMedicoSelecionado] = useState<Medico | null>(null);
  const [dataConsulta, setDataConsulta] = useState("");
  useEffect(() => {
    carregarDados();
  }, []);
  async function carregarDados() {
    const esps = await obterEspecialidades();
    const meds = await obterMedicos();
    setEspecialidades(esps);
    setMedicos(meds);
  }
// Filtra médicos quando uma especialidade é selecionada
function selecionarEspecialidade(esp: Especialidade) {
  setEspecialidadeSelecionada(esp);
  setMedicoSelecionado(null); // Reseta médico ao mudar especialidade
  // Filtra médicos da especialidade
  const medicosEsp = medicos.filter((m) => m.especialidade.id === esp.id);
  setMedicosFiltrados(medicosEsp);
}

}