# 📊 Guia de Configuração do Google Sheets

Este documento fornece um guia passo a passo para configurar o Google Sheets que será usado como banco de dados do sistema.

## Passo 1: Criar a Planilha

1. Acesse [Google Sheets](https://sheets.google.com)
2. Clique em **"+ Planilha em branco"**
3. Nomeie como **"Casa Passagem - Gestão"**
4. Clique em **"Criar"**

## Passo 2: Configurar a Aba "Usuários"

A primeira aba já vem criada como "Planilha1". Vamos renomeá-la e adicionar os cabeçalhos.

### Renomear a Aba

1. Clique com botão direito na aba "Planilha1" (abaixo da planilha)
2. Selecione **"Renomear"**
3. Digite **"Usuários"**
4. Pressione Enter

### Adicionar Cabeçalhos

Na primeira linha, adicione os seguintes cabeçalhos:

| Coluna | Conteúdo |
|--------|----------|
| A1 | ID |
| B1 | Nome |
| C1 | CPF |
| D1 | Responsável |
| E1 | Observações |
| F1 | Data Cadastro |
| G1 | Status |

**Como fazer:**
1. Clique na célula A1
2. Digite `ID` e pressione Tab (vai para B1)
3. Digite `Nome` e pressione Tab
4. Continue com os outros cabeçalhos
5. Quando terminar, pressione Enter

### Formatar os Cabeçalhos (Opcional)

Para deixar mais bonito:
1. Selecione a primeira linha (A1:G1)
2. Clique em **"Formato"** → **"Formato de célula"**
3. Vá para a aba **"Preenchimento"**
4. Escolha uma cor (azul ou cinza)
5. Clique em **"Aplicar"**

## Passo 3: Configurar a Aba "Movimentações"

### Criar Nova Aba

1. Clique no ícone **"+"** (canto inferior esquerdo)
2. Uma nova aba será criada
3. Clique com botão direito na aba
4. Selecione **"Renomear"**
5. Digite **"Movimentações"**
6. Pressione Enter

### Adicionar Cabeçalhos

Na primeira linha, adicione:

| Coluna | Conteúdo |
|--------|----------|
| A1 | ID |
| B1 | Usuário ID |
| C1 | Nome |
| D1 | CPF |
| E1 | Tipo |
| F1 | Data/Hora |
| G1 | Cuidador |

**Como fazer:**
1. Clique na célula A1
2. Digite `ID` e pressione Tab
3. Continue com os outros cabeçalhos
4. Quando terminar, pressione Enter

## Passo 4: Configurar a Aba "Relatórios" (Opcional)

Esta aba será preenchida automaticamente pelo sistema, mas você pode criar uma estrutura básica.

### Criar Nova Aba

1. Clique no ícone **"+"**
2. Renomeie para **"Relatórios"**

### Adicionar Cabeçalhos

| Coluna | Conteúdo |
|--------|----------|
| A1 | Data |
| B1 | Tipo Relatório |
| C1 | Entradas |
| D1 | Saídas |
| E1 | Usuários Únicos |

## Passo 5: Obter o ID da Planilha

Este ID é necessário para configurar o sistema.

1. Abra a planilha
2. Observe a URL na barra de endereço
3. Procure por este padrão:
   ```
   https://docs.google.com/spreadsheets/d/[ID_AQUI]/edit
   ```
4. Copie o ID (a parte entre `/d/` e `/edit`)
5. **Guarde este ID** - você vai precisar dele

## Passo 6: Compartilhar a Planilha

Você precisará compartilhar a planilha com a conta de serviço do Google Cloud.

**Nota:** Você só fará isso após criar a chave de API (veja o guia principal).

1. Clique em **"Compartilhar"** (canto superior direito)
2. Na caixa de email, cole o email da conta de serviço
3. Selecione **"Editor"** como permissão
4. Clique em **"Compartilhar"**

## Estrutura Completa da Planilha

Após seguir todos os passos, sua planilha deve ter esta estrutura:

### Aba "Usuários"
```
ID | Nome | CPF | Responsável | Observações | Data Cadastro | Status
---|------|-----|-------------|-------------|---------------|-------
   |      |     |             |             |               |
```

### Aba "Movimentações"
```
ID | Usuário ID | Nome | CPF | Tipo | Data/Hora | Cuidador
---|------------|------|-----|------|-----------|----------
   |            |      |     |      |           |
```

### Aba "Relatórios"
```
Data | Tipo Relatório | Entradas | Saídas | Usuários Únicos
-----|----------------|----------|--------|----------------
     |                |          |        |
```

## Dicas Importantes

**Não delete as abas:** O sistema depende das abas "Usuários" e "Movimentações"

**Não altere os nomes das abas:** Use exatamente "Usuários" e "Movimentações"

**Não delete os cabeçalhos:** O sistema lê os dados a partir da linha 2

**Faça backup:** Periodicamente, faça download da planilha como backup

**Compartilhamento:** Certifique-se de que a planilha foi compartilhada com a conta de serviço

## Próximos Passos

Após configurar o Google Sheets:

1. Vá para [Google Cloud Console](https://console.cloud.google.com/)
2. Ative a Google Sheets API
3. Crie uma chave de API
4. Volte aqui e compartilhe a planilha com a conta de serviço
5. Configure o sistema com o ID e a chave de API

Para instruções detalhadas, veja o [GUIA_IMPLEMENTACAO.md](GUIA_IMPLEMENTACAO.md).

---

**Pronto!** Sua planilha está configurada e pronta para uso.
