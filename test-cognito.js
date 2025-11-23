// Script para testar credenciais do Cognito Identity Pool
// Execute: node test-cognito.js

const { CognitoIdentityClient, GetIdCommand, GetCredentialsForIdentityCommand } = require('@aws-sdk/client-cognito-identity');

const client = new CognitoIdentityClient({ region: 'sa-east-1' });

async function testGuestAccess() {
  try {
    console.log('🔍 Testando acesso guest ao Cognito Identity Pool...\n');

    // 1. Obter Identity ID
    const getIdCommand = new GetIdCommand({
      IdentityPoolId: 'sa-east-1:40e2865b-c5ee-46dc-abaa-5cf6e25d2895',
    });

    const idResponse = await client.send(getIdCommand);
    console.log('✅ Identity ID obtido:', idResponse.IdentityId);

    // 2. Obter credenciais temporárias
    const getCredsCommand = new GetCredentialsForIdentityCommand({
      IdentityId: idResponse.IdentityId,
    });

    const credsResponse = await client.send(getCredsCommand);
    console.log('✅ Credenciais obtidas:');
    console.log('   - AccessKeyId:', credsResponse.Credentials.AccessKeyId);
    console.log('   - Expiration:', credsResponse.Credentials.Expiration);

    console.log('\n✅ Acesso guest está funcionando corretamente!');
    console.log('   O problema pode estar na configuração do Amplify no código.\n');

  } catch (error) {
    console.error('❌ Erro ao testar acesso guest:');
    console.error('   Mensagem:', error.message);
    console.error('   Código:', error.name);
    
    if (error.name === 'NotAuthorizedException') {
      console.log('\n💡 Solução: Habilite "Enable access to unauthenticated identities" no Cognito Identity Pool');
      console.log('   AWS Console > Cognito > Identity pools > sua-identity-pool > Edit identity pool');
    }
  }
}

testGuestAccess();
