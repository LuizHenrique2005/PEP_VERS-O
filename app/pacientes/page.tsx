"use client";

import { NavBar } from "@/components/NavBar";
import { SideBar } from "@/components/SideBar";
import { useEffect, useState } from "react";
import { PatienteType } from "@/types/patientType";
import { obterPacientes } from "@/service/patientService";

export default function Pacientes() {
  const [pacientes, setPacientes] = useState<PatienteType[]>([]);

  const lidarPaciente = () => {
    obterPacientes()
      .then((resposta) => {
        console.log('Pacientes carregados:', resposta);
        setPacientes(resposta);
      })
      .catch((erro) => {
        console.error('Erro ao carregar pacientes:', erro);
        alert('Erro ao carregar pacientes. Verifique o console para mais detalhes.');
      });
  };

  useEffect(() => {
    lidarPaciente();
  }, []);
  return (
    <div className="w-full h-auto flex">
      <SideBar />
      <div className="ml-[18%] flex-1">
        <NavBar />
        <div className="w-full flex my-10 px-20 items-center justify-end">
            <a href="pacientes/adicionar" className="bg-[#07122D] py-3 px-8 text-white font-bold text-2xl transition-transform duration-200 hover:scale-105">
                + Adicionar Paciente
            </a>
        </div>
        <div className="grid grid-cols-2 w-full flex-wrap justify-items-center gap-10">
          {pacientes.map((paciente) => (
            <a key={paciente.id} href={`/pacientes/${paciente.id}`} className="w-[70%] shadow-2xl border-2 border-gray-200 p-5 transition-transform duration-200 hover:scale-105 cursor-pointer">
              <p>{paciente.nome}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
