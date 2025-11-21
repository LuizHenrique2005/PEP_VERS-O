import { PatienteType } from '@/types/patientType';
import api from './api';

const pacientes: PatienteType[] = [
    {
    id: 1,
    nome: "Ana Clara Mendes",
    dataNascimento: "1992-08-14",
    cpf: "123.456.789-01",
    diagnostico: "Ansiedade generalizada",
    obs: "Paciente iniciou atendimento há 3 meses."
  },
  {
    id: 2,
    nome: "Bruno Henrique Alves",
    dataNascimento: "1987-03-22",
    cpf: "987.654.321-00",
    diagnostico: "Depressão leve",
    obs: "Recomendada atividade física contínua."
  },
  {
    id: 3,
    nome: "Camila Souza Pereira",
    dataNascimento: "2001-12-01",
    cpf: "456.789.123-98",
    diagnostico: "TOC",
    obs: "Em fase de reavaliação."
  }
]

export async function obterPacientes() {
    try {
        // const resposta = await api.get("/pacientes")
        // return resposta.data
        return pacientes;
    } catch (erro) {
        throw erro;
    }
}

export async function obterPacienteNome(nome: string) {
    try {
        // const resposta = await api.get(`/pacientes/${nome}`)
        // return resposta.data
        return pacientes.filter(p => p.nome.toLowerCase() === nome.toLowerCase());
    } catch (erro) {
        throw erro;
    }
}

export async function obterPacienteId(id: number) {
    try {
        // const resposta = await api.get(`/pacientes/${id}`)
        // return resposta.data
        return pacientes.filter(p => p.id === id);
    } catch (erro) {
        throw erro;
    }
}

export async function adicionaPaciente(paciente: PatienteType) {
    try {
        const resposta = await api.post(`/pacientes`, paciente)
        return resposta.data
    } catch (erro) {
        throw erro;
    }
}

export async function editarPaciente(id:number) {
     try {
        const resposta = await api.put(`/pacientes/${id}`)
        return resposta.data
    } catch (erro) {
        throw erro;
    }
}

export async function deletarPaciente(id:number) {
     try {
        const resposta = await api.delete(`/pacientes/${id}`)
        return resposta.data
    } catch (erro) {
        throw erro;
    }
}