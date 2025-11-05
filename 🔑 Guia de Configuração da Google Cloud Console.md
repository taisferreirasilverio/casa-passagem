# 🔑 Guia de Configuração da Google Cloud Console

Este documento fornece um guia passo a passo para configurar a Google Cloud Console e obter as credenciais necessárias para o sistema.

## Passo 1: Acessar Google Cloud Console

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Se for a primeira vez, você pode ser solicitado a aceitar os termos de serviço
3. Clique em **"Aceitar"**

## Passo 2: Criar um Projeto

Se você não tem um projeto criado:

1. Clique em **"Selecionar um projeto"** (no topo, ao lado do logo do Google Cloud)
2. Clique em **"Novo projeto"**
3. Preencha os dados:
   - **Nome do projeto:** `Casa Passagem`
   - **ID do projeto:** Será preenchido automaticamente
   - **Organização:** Deixe em branco (ou selecione se tiver)
4. Clique em **"Criar"**
5. Aguarde alguns segundos até o projeto ser criado

## Passo 3: Ativar Google Sheets API

### Encontrar a API

1. Na barra de pesquisa do topo (onde está escrito "Pesquisar produtos e recursos")
2. Digite **"Google Sheets API"**
3. Clique no resultado que aparecer

### Ativar a API

1. Você será levado à página da API
2. Clique no botão **"ATIVAR"** (azul, no topo da página)
3. Aguarde alguns segundos até a ativação ser concluída
4. Você verá uma mensagem "A API foi ativada"

## Passo 4: Criar Credenciais (Chave de API)

### Acessar Credenciais

1. Na página da API, clique em **"Criar credenciais"** (botão azul)
2. Você será levado para a página de criação de credenciais

### Selecionar Tipo de Credencial

1. Você verá uma pergunta: "Qual tipo de credencial você precisa?"
2. Selecione:
   - **Tipo de dados que você vai acessar:** "Dados de aplicação"
   - **De onde você vai chamar a API:** "Navegador da web (JavaScript)"
   - **Você vai usar dados de usuário?** "Não, estou acessando dados que não requerem autorização do usuário"
3. Clique em **"Qual credencial eu preciso?"**

### Criar Chave de API

1. Você verá a opção "Criar uma chave de API"
2. Clique em **"Criar chave de API"**
3. Uma janela vai aparecer com sua chave de API
4. **Copie a chave** (clique no ícone de cópia)
5. **Guarde esta chave em um local seguro** - você vai precisar dela
6. Clique em **"Fechar"**

## Passo 5: Restringir a Chave de API (Recomendado)

Para maior segurança, você pode restringir sua chave de API para usar apenas Google Sheets API.

### Acessar Configurações da Chave

1. Na página de credenciais, você verá sua chave listada
2. Clique no nome da chave para abrir as configurações
3. Você será levado para a página de detalhes da chave

### Restringir a API

1. Procure por **"Restrições de API"**
2. Selecione **"Restrição de HTTP referrer"** (ou outra opção apropriada)
3. Selecione **"Google Sheets API"** na lista
4. Clique em **"Salvar"**

## Passo 6: Criar Conta de Serviço (Avançado)

Se você quer maior segurança, pode criar uma conta de serviço em vez de usar uma chave de API simples.

### Criar Conta de Serviço

1. Na barra lateral, clique em **"Contas de serviço"**
2. Clique em **"Criar conta de serviço"**
3. Preencha os dados:
   - **Nome da conta de serviço:** `Casa Passagem`
   - **ID da conta de serviço:** Será preenchido automaticamente
   - **Descrição:** `Conta para acesso ao Google Sheets`
4. Clique em **"Criar e continuar"**

### Conceder Permissões

1. Na seção "Conceder acesso a esta conta de serviço":
   - Clique em **"Continuar"** (você pode deixar em branco por enquanto)
2. Clique em **"Concluído"**

### Obter Chave JSON

1. Você será levado para a lista de contas de serviço
2. Clique na conta que você acabou de criar
3. Vá para a aba **"Chaves"**
4. Clique em **"Adicionar chave"** → **"Criar nova chave"**
5. Selecione **"JSON"**
6. Clique em **"Criar"**
7. Um arquivo JSON será baixado automaticamente
8. **Guarde este arquivo em um local seguro**

### Obter Email da Conta de Serviço

1. Na página da conta de serviço, copie o **"Email da conta de serviço"**
2. Este email tem o formato: `casa-passagem@seu-projeto.iam.gserviceaccount.com`
3. **Você vai usar este email para compartilhar a planilha Google Sheets**

## Resumo das Credenciais

Após seguir estes passos, você terá:

| Informação | Onde Encontrar | Para Quê |
|-----------|----------------|---------|
| **ID da Planilha** | URL do Google Sheets | Configurar no sistema |
| **Chave de API** | Google Cloud Console → Credenciais | Configurar no sistema |
| **Email da Conta de Serviço** | Google Cloud Console → Contas de Serviço | Compartilhar a planilha |

## Próximos Passos

1. Guarde a chave de API em um local seguro
2. Vá para o [Google Sheets](https://sheets.google.com)
3. Abra a planilha que você criou
4. Clique em **"Compartilhar"**
5. Cole o email da conta de serviço (ou use a chave de API)
6. Selecione **"Editor"** como permissão
7. Clique em **"Compartilhar"**

Depois, configure o sistema com a chave de API e o ID da planilha.

## Dicas de Segurança

**Nunca compartilhe sua chave de API:** Mantenha a chave segura e privada

**Use HTTPS:** Certifique-se de que o sistema está sendo acessado via HTTPS

**Regenere a chave se necessário:** Se alguém vir sua chave, regenere-a na Google Cloud Console

**Use conta de serviço:** Para maior segurança, use uma conta de serviço em vez de chave de API simples

**Monitore o uso:** Verifique regularmente o uso da API na Google Cloud Console

## Troubleshooting

### "Erro ao ativar a API"
- Certifique-se de que você está no projeto correto
- Tente novamente em alguns segundos
- Verifique se sua conta Google tem permissão para criar projetos

### "Não consigo criar credenciais"
- Certifique-se de que a API foi ativada
- Verifique se você está no projeto correto
- Tente novamente em alguns segundos

### "Erro ao compartilhar a planilha"
- Certifique-se de que o email está correto
- Tente novamente em alguns segundos
- Verifique se a planilha foi criada corretamente

---

**Pronto!** Você tem as credenciais necessárias para configurar o sistema.

Próximo passo: [CONFIGURACAO_GOOGLE_SHEETS.md](CONFIGURACAO_GOOGLE_SHEETS.md)
