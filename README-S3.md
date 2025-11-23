# 🚀 Guia Rápido - S3 Conectado e Funcionando

## ✅ O que foi configurado

1. **AWS Amplify** - Configurado com acesso guest (não autenticado)
2. **Amazon S3** - Bucket `pep8109e785a-dev` configurado para uploads
3. **Cognito Identity Pool** - Fornece credenciais temporárias para acesso guest
4. **Storage Service** - Funções de upload, listagem e geração de URLs

## 🧪 Testar Agora

1. **Abra o navegador:** http://localhost:3000

2. **Você verá o componente "Teste de Upload S3":**
   - Botão "Selecionar arquivo" - para fazer upload
   - Botão "Listar arquivos no S3" - para ver todos os arquivos
   - Botão "Gerar URL" - para cada arquivo listado

3. **Teste o upload:**
   - Clique em "Selecionar arquivo"
   - Escolha uma imagem ou documento
   - Aguarde o alert "Arquivo enviado com sucesso!"

4. **Veja os arquivos:**
   - Clique em "Listar arquivos no S3"
   - Seus arquivos aparecerão na lista

5. **Gere URLs de acesso:**
   - Clique em "Gerar URL" ao lado de qualquer arquivo
   - Uma URL temporária será gerada
   - Clique na URL para ver/baixar o arquivo

## 📁 Estrutura de Código

```
src/
├── amplify-config.ts          # Configuração do Amplify (SSR)
├── storageService.ts          # Funções de S3 (upload, list, getUrl)
└── aws-exports.js             # Credenciais AWS (auto-gerado)

components/
├── AmplifyConfigProvider.tsx  # Provider que configura Amplify no client
└── TesteS3.tsx               # Componente de teste de upload

app/
└── layout.tsx                # Layout principal com provider
```

## 🔧 Funções Disponíveis

### Upload de Arquivo
```typescript
import { uploadFile } from '@/src/storageService';

const handleUpload = async (file: File) => {
  const result = await uploadFile(file, 'guest');
  console.log('Upload concluído:', result);
};
```

### Listar Arquivos
```typescript
import { listFiles } from '@/src/storageService';

const files = await listFiles('', 'guest');
console.log('Arquivos no S3:', files.items);
```

### Gerar URL de Acesso
```typescript
import { getS3FileUrl } from '@/src/storageService';

const url = await getS3FileUrl('nome-do-arquivo.jpg', 'guest');
console.log('URL temporária:', url);
```

## 🌐 Deploy Contínuo

### Vercel (Recomendado para Next.js)

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Configurar variáveis de ambiente
vercel env add NEXT_PUBLIC_AWS_PROJECT_REGION
# ... adicione todas as variáveis do .env.local.example

# 4. Deploy de produção
vercel --prod
```

### AWS Amplify Hosting

```bash
# 1. Publicar no Amplify
amplify publish

# 2. Deploy automático
# Cada push para main fará deploy automaticamente
git push origin main
```

### Variáveis de Ambiente Necessárias

Copie essas variáveis para seu ambiente de produção:

```env
NEXT_PUBLIC_AWS_PROJECT_REGION=sa-east-1
NEXT_PUBLIC_AWS_COGNITO_IDENTITY_POOL_ID=sa-east-1:40e2865b-c5ee-46dc-abaa-5cf6e25d2895
NEXT_PUBLIC_AWS_COGNITO_REGION=sa-east-1
NEXT_PUBLIC_AWS_USER_POOLS_ID=sa-east-1_KBxr6Cc3t
NEXT_PUBLIC_AWS_USER_POOLS_WEB_CLIENT_ID=2msrdfos7em3jehkrlvojlcatn
NEXT_PUBLIC_AWS_USER_FILES_S3_BUCKET=pep8109e785a-dev
NEXT_PUBLIC_AWS_USER_FILES_S3_BUCKET_REGION=sa-east-1
```

## 🔐 Níveis de Acesso

O Storage suporta 3 níveis de acesso:

- **`guest`** - Acesso público (não precisa login)
- **`protected`** - Outros usuários podem ler, mas só o dono pode escrever
- **`private`** - Apenas o usuário autenticado pode acessar

Para usar `protected` ou `private`, você precisa autenticar o usuário primeiro.

## 🎯 Próximas Melhorias

### 1. Adicionar Autenticação
```typescript
import { signIn, signUp } from 'aws-amplify/auth';

// Registrar usuário
await signUp({
  username: email,
  password: password,
  attributes: { email }
});

// Fazer login
await signIn({ username: email, password });
```

### 2. Upload com Progresso
```typescript
import { uploadData } from '@aws-amplify/storage';

const upload = uploadData({
  key: file.name,
  data: file,
  options: {
    onProgress: (progress) => {
      const percent = (progress.loaded / progress.total) * 100;
      console.log(`Upload: ${percent}%`);
    }
  }
});

await upload.result;
```

### 3. Excluir Arquivos
```typescript
import { remove } from '@aws-amplify/storage';

await remove({ key: 'nome-arquivo.jpg' });
```

### 4. Download de Arquivos
```typescript
import { getUrl } from '@aws-amplify/storage';

const { url } = await getUrl({ key: 'arquivo.pdf' });
window.open(url.toString(), '_blank');
```

## ❓ Troubleshooting

### Erro: "NoCredentials"
- ✅ Já resolvido! O Cognito Identity Pool está configurado para acesso guest

### Erro: "Access Denied"
- Verifique as permissões do bucket S3
- Execute: `amplify update storage` e configure permissões guest

### Erro: "CORS"
- Configure CORS no bucket S3
- Veja instruções em `DEPLOY.md`

## 📞 Suporte

- AWS Amplify Docs: https://docs.amplify.aws/
- Next.js Docs: https://nextjs.org/docs
- S3 Storage: https://docs.amplify.aws/lib/storage/getting-started/

---

**Status:** ✅ **S3 TOTALMENTE FUNCIONAL**

Teste agora em http://localhost:3000 🚀
