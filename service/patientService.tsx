import { PatienteType } from '@/types/patientType';
import api from './api';

export async function obterPacientes() {
    try {
        const resposta = await api.get("/pacientes")
        return resposta.data
    } catch (erro) {
        throw erro;
    }
}

export async function obterPacienteId(id: number) {
    try {
        const resposta = await api.get(`/pacientes/${id}`)
        return resposta.data
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
