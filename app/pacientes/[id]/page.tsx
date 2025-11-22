"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PatienteType } from "@/types/patientType";
import { obterPacienteId } from "@/service/patientService";
import { SideBar } from "@/components/SideBar";
import { NavBar } from "@/components/NavBar";

export default function PacientePagina() {
  const { id } = useParams<{ id: string }>();
  const [paciente, setPaciente] = useState<PatienteType>();

  const auxObterPaciente = () => {
    const pacienteId = parseInt(id);
    obterPacienteId(pacienteId)
      .then((resposta) =>
        setPaciente(resposta)
      )
      .catch((erro) => console.log(erro));
  };

  useEffect(() => {
    auxObterPaciente();
  });
  return (
    <div className="w-full h-auto flex">
      <SideBar />
      <div className="ml-[18%] flex-1">
        <NavBar />
        {paciente && (
          <div className="flex w-full pt-10 px-5 justify-evenly flex-wrap flex-col">
            <div className="flex w-full">
              <img src="/Images/Placeholder.png" alt="" />
              <div className="flex flex-1 flex-col ml-2 justify-between">
                <p className="text-[#1E1E1E] text-4xl font-bold">{paciente.nome}</p>
                <div>
                  <p className="text-[#07122D] text-xl font-medium">Data de Nascimento:</p>
                  <p className="text-[#1E1E1E] text-3xl font-bold">{paciente.dataNascimento.replaceAll("-", "/")}</p>
                </div>
                <div>
                  <p className="text-[#07122D] text-xl font-medium">CPF:</p>
                  <p className="text-[#1E1E1E] text-3xl font-bold">{paciente.cpf}</p>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col pt-5 gap-10">
                <div>
                    <p className="text-[#07122D] text-2xl font-bold">Diagnóstico:</p>
                    <p className="text-[#1E1E1E] text-xl font-semibold">{paciente.diagnostico}</p>
                </div>
                <div>
                    <p className="text-[#07122D] text-2xl font-bold">Observações:</p>
                    <p className="text-[#1E1E1E] text-xl font-semibold">{paciente.obs}</p>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
