# 🔧 Solução para Erro de IAM Role no Amplify

## Erro Atual:
```
Unable to assume specified IAM Role. Please ensure the selected IAM Role has sufficient permissions and the Trust Relationship is configured correctly.
```

## ✅ Solução Definitiva (Escolha UMA das opções):

### Opção 1: Criar Service Role via Console (RECOMENDADO - 2 minutos)

1. **Acesse o console do Amplify:**
   - https://sa-east-1.console.aws.amazon.com/amplify/home?region=sa-east-1#/d1vyvveab88elb/settings/general

2. **Na seção "Service role":**
   - Clique em **Edit**
   - Clique em **Create new role** (abrirá nova aba do IAM)

3. **No IAM Console (nova aba):**
   - **Trusted entity type:** Já estará como "AWS service"
   - **Service or use case:** Já estará como "Amplify - Backend Deployment"
   - Clique em **Next**
   - As permissões já estarão selecionadas automaticamente
   - Clique em **Next**
   - **Role name:** Deixe o padrão ou use `amplify-pep-service-role`
   - Clique em **Create role**

4. **Volte para a aba do Amplify:**
   - Clique no botão de refresh (🔄) ao lado de "Service role"
   - Selecione a role que você acabou de criar
   - Clique em **Save**

5. **Refazer o deploy:**
   - Vá em **Hosting > main**
   - Clique em **Redeploy this version**

---

### Opção 2: Desabilitar Backend Build (Se não usar Auth/API no build)

Se você não precisa de recursos do backend durante o build:

1. **No console do Amplify:**
   - https://sa-east-1.console.aws.amazon.com/amplify/home?region=sa-east-1#/d1vyvveab88elb/settings/general

2. **Desmarque:**
   - ☐ "Enable full-stack continuous deployments"

3. **Salve e refaça o deploy**

---

### Opção 3: Criar Role Manualmente via IAM (Avançado)

Se as opções acima não funcionarem:

1. **Acesse IAM Console:**
   - https://console.aws.amazon.com/iam/home?region=sa-east-1#/roles

2. **Create role:**
   - **Trusted entity type:** AWS service
   - **Use case:** Amplify (procure por "Amplify" na lista)
   - Click **Next**

3. **Add permissions:**
   - Selecione estas policies:
     - `AdministratorAccess-Amplify`
     - `AWSLambda_FullAccess` (se usar functions)
   - Clique em **Next**

4. **Name, review, and create:**
   - **Role name:** `amplify-backend-deployment-role`
   - **Description:** Role for Amplify backend deployment
   - Clique em **Create role**

5. **Edite o Trust Relationship:**
   - Na lista de roles, clique na role criada
   - Vá na aba **Trust relationships**
   - Clique em **Edit trust policy**
   - Cole este JSON:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "amplify.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

   - Clique em **Update policy**

6. **Configure no Amplify:**
   - Volte ao Amplify Console
   - App settings > General > Service role
   - Selecione a role criada
   - Salve

---

## 🎯 Após Configurar a Role:

1. Vá em: https://sa-east-1.console.aws.amazon.com/amplify/home?region=sa-east-1#/d1vyvveab88elb/main/deployments

2. Clique em **"Redeploy this version"**

3. O build deve funcionar agora! ✅

---

## ⚡ Verificar se funcionou:

Após refazer o deploy, você verá:
- ✅ Build bem-sucedido (sem erro de IAM)
- ✅ URL da aplicação funcionando
- ✅ S3 uploads funcionando

---

**Recomendação:** Use a **Opção 1** - é a mais rápida e segura!
