# Deploy Contínuo - AWS Amplify S3 Integration

## 🚀 Configuração Inicial

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente

Copie o arquivo `.env.local.example` para `.env.local`:
```bash
cp .env.local.example .env.local
```

As variáveis já estão configuradas com os valores do seu projeto.

### 3. Testar localmente
```bash
npm run dev
```

Acesse http://localhost:3000 e teste o upload de arquivos S3.

---

## 🔄 Deploy Contínuo

### Opção 1: AWS Amplify Hosting (Recomendado)

1. **Conectar repositório:**
   ```bash
   # Se ainda não inicializou o Amplify
   amplify init
   
   # Publicar aplicação
   amplify publish
   ```

2. **Configurar variáveis de ambiente no Console AWS:**
   - Acesse: AWS Amplify Console > Seu App > Environment variables
   - Adicione todas as variáveis do `.env.local.example`

3. **Deploy automático:**
   - Cada push para `main` fará deploy automaticamente
   - O Amplify detecta mudanças e reconstrói

### Opção 2: Vercel

1. **Instalar Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Configurar variáveis de ambiente:**
   ```bash
   vercel env add NEXT_PUBLIC_AWS_PROJECT_REGION
   vercel env add NEXT_PUBLIC_AWS_COGNITO_IDENTITY_POOL_ID
   # ... adicione todas as outras
   ```

4. **Deploy de produção:**
   ```bash
   vercel --prod
   ```

### Opção 3: AWS Amplify CI/CD via GitHub

1. **No Console AWS Amplify:**
   - Choose "Host web app"
   - Connect your GitHub repository
   - Select branch: `main`
   - Build settings (detectado automaticamente)

2. **Adicionar variáveis de ambiente:**
   - App settings > Environment variables
   - Adicione todas do `.env.local.example`

3. **Configurar build:**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

---

## 🔧 Troubleshooting

### Erro: "NoCredentials: Credentials should not be empty"

**Solução:**
1. Verifique se o Cognito Identity Pool permite acesso não autenticado (guest):
   ```bash
   aws cognito-identity describe-identity-pool \
     --identity-pool-id sa-east-1:40e2865b-c5ee-46dc-abaa-5cf6e25d2895
   ```

2. Habilite acesso não autenticado:
   ```bash
   aws cognito-identity update-identity-pool \
     --identity-pool-id sa-east-1:40e2865b-c5ee-46dc-abaa-5cf6e25d2895 \
     --allow-unauthenticated-identities
   ```

### Erro: "Access Denied" no S3

**Solução:**
Verifique as políticas do bucket S3:
```bash
amplify update storage
# Selecione: Auth and guest users
# Permissões guest: create/update, read, delete
```

### CORS Issues

Se tiver problemas de CORS, configure no S3:
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": ["ETag"]
  }
]
```

---

## 📦 Estrutura de Arquivos S3

```
pep8109e785a-dev/
├── public/          # Arquivos com accessLevel: "guest"
├── protected/       # Arquivos com accessLevel: "protected"
└── private/         # Arquivos com accessLevel: "private"
```

---

## 🔐 Segurança

Para produção, considere:

1. **Autenticação obrigatória:**
   - Remova acesso guest
   - Use apenas `accessLevel: "private"` ou `"protected"`

2. **Limite de tamanho:**
   - Configure no API Gateway ou Lambda
   - Adicione validação no frontend

3. **Tipos de arquivo permitidos:**
   - Valide `file.type` antes do upload
   - Configure políticas no S3

---

## 📝 Comandos Úteis

```bash
# Verificar status do Amplify
amplify status

# Atualizar backend
amplify push

# Ver logs
amplify console

# Remover recurso
amplify remove storage

# Adicionar autenticação
amplify add auth
```

---

## 🎯 Próximos Passos

1. ✅ S3 configurado e funcionando
2. ⬜ Adicionar autenticação de usuários
3. ⬜ Implementar upload com progresso
4. ⬜ Adicionar preview de imagens
5. ⬜ Implementar exclusão de arquivos
