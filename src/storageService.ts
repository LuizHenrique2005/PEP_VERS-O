// src/service/StorageService.ts

import { uploadData, getUrl, list } from "@aws-amplify/storage";

// Amplify v6 usa 'guest' como padrão (não precisa de autenticação)
export type AccessLevel = "guest" | "private" | "protected";

// UPLOAD --------------------------------------------------------
export async function uploadFile(
  file: File,
  level: AccessLevel = "guest"
) {
  try {
    const result = await uploadData({
      key: file.name,
      data: file,
      options: {
        accessLevel: level,
        contentType: file.type,
      },
    }).result;

    return result;
  } catch (error) {
    console.error('Erro no upload:', error);
    throw error;
  }
}

// GET URL -------------------------------------------------------
export async function getS3FileUrl(
  fileName: string,
  level: AccessLevel = "guest"
) {
  try {
    const result = await getUrl({
      key: fileName,
      options: { 
        accessLevel: level,
        validateObjectExistence: false
      }
    });

    return result.url.toString();
  } catch (error) {
    console.error('Erro ao gerar URL:', error);
    throw error;
  }
}

// LIST ----------------------------------------------------------
export async function listFiles(
  prefix = "",
  level: AccessLevel = "guest"
) {
  try {
    const result = await list({
      prefix: prefix,
      options: {
        accessLevel: level,
        listAll: true
      }
    });

    return result;
  } catch (error) {
    console.error('Erro ao listar arquivos:', error);
    throw error;
  }
}

