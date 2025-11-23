"use client";

import { useState } from "react";
import { uploadFile, listFiles, getS3FileUrl } from "@/src/storageService";

export default function TesteS3() {
  const [files, setFiles] = useState<any[]>([]);
  const [url, setUrl] = useState("");

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await uploadFile(file, "guest");
      alert("Arquivo enviado com sucesso!");
      await carregarLista();
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar arquivo");
    }
  }

  async function carregarLista() {
    const lista = await listFiles("", "guest");
    setFiles(lista.items || []);
  }

  async function gerarUrl(key: string) {
    const u = await getS3FileUrl(key, "guest");
    setUrl(u);
  }

  return (
    <div className="p-10 flex flex-col gap-6 max-w-2xl mx-auto">

      <h1 className="text-3xl font-bold text-center text-[#07122D]">
        Teste de Upload S3
      </h1>

      <label className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-fit mx-auto">
        Selecionar arquivo
        <input type="file" className="hidden" onChange={handleUpload} />
      </label>

      <button
        onClick={carregarLista}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 w-fit mx-auto"
      >
        Listar arquivos no S3
      </button>

      <ul className="mt-4 space-y-2">
        {files.map((f) => (
          <li key={f.key} className="flex justify-between bg-gray-200 p-2 rounded">
            {f.key}
            <button
              className="bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700"
              onClick={() => gerarUrl(f.key)}
            >
              Gerar URL
            </button>
          </li>
        ))}
      </ul>

      {url && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-semibold">URL gerada:</h3>
          <a href={url} className="text-blue-600 underline break-all" target="_blank">
            {url}
          </a>
        </div>
      )}
    </div>
  );
}
