"use client";

import { NavBar } from "@/components/NavBar";
import { SideBar } from "@/components/SideBar";
import { useState } from "react";
import { PatienteType } from "@/types/patientType";
import { adicionaPaciente } from "@/service/patientService";

export default function Adicionar() {
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [diagnostico, setDiagnostico] = useState("");
  const [obs, setObs] = useState("");
  const handleAdicionar = (event: React.FormEvent) => {
    event.preventDefault();
    const novoPaciente: PatienteType = {
      id: 0,
      nome,
      dataNascimento,
      cpf,
      diagnostico,
      obs,
    };
    adicionaPaciente(novoPaciente);
    alert("Paciente adicionado com sucesso!");
    setNome("");
    setDataNascimento("");
    setCpf("");
    setDiagnostico("");
    setObs("");
  };
  return (
    <div className="w-full h-auto flex">
      <SideBar />
      <div className="ml-[18%] flex-1">
        <NavBar />
        <div className="w-full flex flex-col items-center mt-10 px-10 pb-10">
          <h1 className="text-3xl font-bold mb-10 text-[#07122D]">
            Adicionar Paciente
          </h1>
          <form className="w-[60%] space-y-6" onSubmit={handleAdicionar}>
            <div>
              <label className="font-bold mb-1 text-[#07122D]">
                Nome
              </label>
              <input
                type="text"
                className="w-full border border-gray-400 p-2 shadow-sm outline-none focus:border-[#0f172a]"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                onInvalid={(e) =>
                  e.currentTarget.setCustomValidity(
                    "Por favor, preencha com o nome do paciente."
                  )
                }
                onInput={(e) => e.currentTarget.setCustomValidity("")}
              />
            </div>
            <div>
                <label className="font-bold mb-1 text-[#07122D]">
                    Data de Nascimento
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-400 p-2 shadow-sm outline-none focus:border-[#0f172a]"
                  required
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                  onInvalid={(e) =>
                    e.currentTarget.setCustomValidity(
                      "Por favor, preencha com a data de nascimento do paciente."
                    )
                  }
                  onInput={(e) => e.currentTarget.setCustomValidity("")}
                />
            </div>
            <div>
                <label className="font-bold mb-1 text-[#07122D]">  
                    CPF (Sem caracteres especiais)
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-400 p-2 shadow-sm outline-none focus:border-[#0f172a]"
                  required
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  onInvalid={(e) =>
                    e.currentTarget.setCustomValidity(
                      "Por favor, preencha com o CPF do paciente."
                    )
                  }
                  onInput={(e) => e.currentTarget.setCustomValidity("")}
                />
            </div>
            <div>
                <label className="font-bold mb-1 text-[#07122D]">
                    Diagnóstico
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-400 p-2 shadow-sm outline-none focus:border-[#0f172a]"
                  required
                  value={diagnostico}
                  onChange={(e) => setDiagnostico(e.target.value)}
                  onInvalid={(e) =>
                    e.currentTarget.setCustomValidity(
                      "Por favor, preencha com o diagnóstico do paciente."
                    )
                  }
                  onInput={(e) => e.currentTarget.setCustomValidity("")}
                />
            </div>
            <div>
                <label className="font-bold mb-1 text-[#07122D]">
                    Observações
                </label>
                <textarea
                  className="w-full border border-gray-400 p-2 shadow-sm outline-none focus:border-[#0f172a]"
                  required
                  value={obs}
                  onChange={(e) => setObs(e.target.value)}
                  onInvalid={(e) =>
                    e.currentTarget.setCustomValidity(
                      "Por favor, preencha com as observações do paciente."
                    )
                  }
                  onInput={(e) => e.currentTarget.setCustomValidity("")}
                />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#07122D] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#1b4fca] transition-colors duration-200 cursor-pointer"
              >
                Adicionar Paciente
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
