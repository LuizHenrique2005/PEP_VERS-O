import { NavBar } from "@/components/NavBar";
import { SideBar } from "@/components/SideBar";

export default function Home() {
  return (
    <div className="w-full h-auto flex">
      <SideBar />
      <div className="ml-[18%] flex-1">
        <NavBar />
        <div className="flex w-full pt-30 justify-evenly flex-wrap">
          <div className="w-[40%] shadow-2xl shadow-black flex flex-col p-10 transition-transform duration-200 hover:scale-105">
            <div className="grid grid-cols-[20%_80%] grid-rows-2">
              <div>
                <img src="/Images/agenda-icone.png" alt="" />
              </div>
              <div className="flex items-center text-[#07122D] text-3xl font-medium">
                <p>Agenda</p>
              </div>
              <div></div>
              <div>
                <p>Verificar atendimentos agendados</p>
              </div>
            </div>
            <p className="text-[#888585] text-2xl cursor-pointer pt-5">
              Minha Agenda
            </p>
          </div>

          <div className="w-[40%] shadow-2xl shadow-black flex flex-col p-10 transition-transform duration-200 hover:scale-105">
            <div className="grid grid-cols-[20%_80%] grid-rows-2">
              <div>
                <img src="/Images/relatorio-icone.png" alt="" />
              </div>
              <div className="flex items-center text-[#07122D] text-3xl font-medium">
                <p>Relatórios</p>
              </div>
              <div></div>
              <div>
                <p>Verificar relatório dos atendimentos </p>
              </div>
            </div>
            <p className="text-[#888585] text-2xl cursor-pointer pt-5">
              Atendimentos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
