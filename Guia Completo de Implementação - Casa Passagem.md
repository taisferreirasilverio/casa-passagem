# Guia Completo de Implementação - Casa Passagem

## Sistema de Gestão de Acolhimento

Bem-vindo ao Sistema de Gestão Casa Passagem! Este guia passo a passo vai ajudá-lo a configurar e colocar o sistema em funcionamento.

---

## 📋 Índice

1. [Pré-requisitos](#pré-requisitos)
2. [Preparação do Google Sheets](#preparação-do-google-sheets)
3. [Configuração da Google Cloud Console](#configuração-da-google-cloud-console)
4. [Hospedagem no GitHub Pages](#hospedagem-no-github-pages)
5. [Configuração do Sistema](#configuração-do-sistema)
6. [Uso do Sistema](#uso-do-sistema)
7. [Suporte e Troubleshooting](#suporte-e-troubleshooting)

---

## 🔧 Pré-requisitos

Você vai precisar de:

- Uma conta Google (Gmail)
- Uma conta GitHub (gratuita)
- Um navegador web moderno (Chrome, Firefox, Safari, Edge)
- Acesso à internet

---

## 📊 Preparação do Google Sheets

### Passo 1: Criar a Planilha

1. Acesse [Google Sheets](https://sheets.google.com)
2. Clique em **"+ Planilha em branco"**
3. Nomeie a planilha como **"Casa Passagem - Gestão"**
4. Clique em **"Criar"**

### Passo 2: Criar as Abas

Você precisa criar 3 abas na planilha. Por padrão, há uma aba chamada "Planilha1". Vamos renomeá-la e criar as outras.

#### Aba 1: Usuários

1. Clique com botão direito na aba "Planilha1"
2. Selecione **"Renomear"**
3. Digite **"Usuários"** e pressione Enter
4. Adicione os seguintes cabeçalhos na primeira linha:
   - A1: `ID`
   - B1: `Nome`
   - C1: `CPF`
   - D1: `Responsável`
   - E1: `Observações`
   - F1: `Data Cadastro`
   - G1: `Status`

#### Aba 2: Movimentações

1. Clique no ícone **"+"** para adicionar uma nova aba
2. Nomeie como **"Movimentações"**
3. Adicione os seguintes cabeçalhos:
   - A1: `ID`
   - B1: `Usuário ID`
   - C1: `Nome`
   - D1: `CPF`
   - E1: `Tipo`
   - F1: `Data/Hora`
   - G1: `Cuidador`

#### Aba 3: Relatórios (Opcional)

1. Clique no ícone **"+"** para adicionar uma nova aba
2. Nomeie como **"Relatórios"**
3. Esta aba será preenchida automaticamente pelo sistema

### Passo 3: Obter o ID da Planilha

1. Abra a planilha no Google Sheets
2. Observe a URL na barra de endereço
3. O ID está entre `/d/` e `/edit`:
   ```
   https://docs.google.com/spreadsheets/d/[ID_AQUI]/edit
   ```
4. **Copie este ID** - você vai precisar dele depois

---

## 🔑 Configuração da Google Cloud Console

### Passo 1: Criar um Projeto

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Se for a primeira vez, clique em **"Selecionar um projeto"** → **"Novo projeto"**
3. Digite o nome: **"Casa Passagem"**
4. Clique em **"Criar"**
5. Aguarde alguns segundos até o projeto ser criado

### Passo 2: Ativar a Google Sheets API

1. Na barra de pesquisa do topo, procure por **"Google Sheets API"**
2. Clique no resultado
3. Clique no botão **"ATIVAR"** (azul, no topo)
4. Aguarde a ativação

### Passo 3: Criar Chave de API

1. Clique em **"Criar credenciais"** (botão azul)
2. Selecione **"Chave de API"**
3. Uma janela vai aparecer com sua chave de API
4. Clique no ícone de cópia para copiar a chave
5. **Guarde esta chave em um local seguro** - você vai precisar dela

### Passo 4: Compartilhar a Planilha

1. Abra a planilha no Google Sheets
2. Clique em **"Compartilhar"** (canto superior direito)
3. Na caixa de email, cole sua chave de API (ela terá o formato: `xxxxx@xxxxx.iam.gserviceaccount.com`)
4. Selecione **"Editor"** como permissão
5. Clique em **"Compartilhar"**

---

## 🚀 Hospedagem no GitHub Pages

### Passo 1: Criar uma Conta GitHub

1. Acesse [GitHub](https://github.com)
2. Clique em **"Sign up"**
3. Siga o processo de criação de conta
4. Confirme seu email

### Passo 2: Criar um Repositório

1. Faça login no GitHub
2. Clique no ícone **"+"** (canto superior direito)
3. Selecione **"New repository"**
4. Preencha os dados:
   - **Repository name:** `casa-passagem`
   - **Description:** `Sistema de Gestão de Acolhimento`
   - **Public:** Selecione esta opção
   - **Add a README file:** Marque esta opção
5. Clique em **"Create repository"**

### Passo 3: Fazer Upload dos Arquivos

#### Opção A: Usando GitHub Web Interface (Mais Fácil)

1. No repositório, clique em **"Add file"** → **"Upload files"**
2. Arraste os arquivos do projeto para a área de upload:
   - `index.html`
   - Pasta `css/` (com `style.css`)
   - Pasta `js/` (com `config.js`, `googlesheets.js`, `app.js`, `relatorios.js`)
3. Clique em **"Commit changes"**

#### Opção B: Usando Git (Avançado)

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/casa-passagem.git
cd casa-passagem

# Copie os arquivos do projeto para este diretório
# Depois execute:
git add .
git commit -m "Adicionar sistema de gestão Casa Passagem"
git push origin main
```

### Passo 4: Ativar GitHub Pages

1. Vá para as **Configurações** do repositório (aba "Settings")
2. Na barra lateral, clique em **"Pages"**
3. Em "Source", selecione **"main"** como branch
4. Clique em **"Save"**
5. Aguarde alguns minutos
6. Você verá uma mensagem: "Your site is published at: `https://seu-usuario.github.io/casa-passagem`"

---

## ⚙️ Configuração do Sistema

### Passo 1: Acessar o Sistema

1. Abra o navegador
2. Acesse: `https://seu-usuario.github.io/casa-passagem`
3. Uma tela de login vai aparecer
4. Digite seu nome e clique em **"Entrar"**

### Passo 2: Configurar Conexão com Google Sheets

1. Clique na aba **"Configurações"** (engrenagem)
2. Preencha os campos:
   - **ID da Planilha Google Sheets:** Cole o ID que você copiou anteriormente
   - **Chave de API do Google:** Cole a chave de API que você criou
3. Clique em **"Salvar Configurações"**
4. Se aparecer uma mensagem de sucesso, a conexão está funcionando!

---

## 📖 Uso do Sistema

### Aba 1: Cadastro

Use esta aba para registrar novos usuários que chegam à casa.

**Como usar:**
1. Clique na aba **"Cadastro"**
2. Preencha os campos:
   - **Nome Completo:** Nome da pessoa
   - **CPF:** Número do CPF (com ou sem pontos)
   - **Responsável pelo Cadastro:** Seu nome
   - **Observações:** Qualquer informação relevante (opcional)
3. Clique em **"Cadastrar Usuário"**
4. Uma mensagem de confirmação vai aparecer

### Aba 2: Entrada/Saída

Use esta aba para registrar quando uma pessoa entra ou sai da casa.

**Como usar:**
1. Clique na aba **"Entrada/Saída"**
2. Para **ENTRADA:**
   - Selecione o usuário na lista
   - Digite o nome do cuidador responsável
   - Clique em **"Registrar Entrada"**
   - O sistema registra automaticamente data e hora
3. Para **SAÍDA:**
   - Selecione o usuário na lista
   - Digite o nome do cuidador responsável
   - Clique em **"Registrar Saída"**

### Aba 3: Presença Diária

Use esta aba para gerar um relatório diário com espaço para assinatura.

**Como usar:**
1. Clique na aba **"Presença Diária"**
2. A data padrão é hoje (você pode mudar se necessário)
3. Clique em **"Gerar Relatório"**
4. O sistema mostra todos os usuários presentes naquele dia
5. Você pode:
   - **Imprimir:** Clique em "Imprimir" para abrir a visualização de impressão
   - **Baixar PDF:** Clique em "Baixar PDF" para salvar como arquivo

### Aba 4: Relatórios

Use esta aba para gerar relatórios semanais ou mensais.

**Como usar:**
1. Clique na aba **"Relatórios"**
2. Selecione o tipo:
   - **Semanal:** Para uma semana
   - **Mensal:** Para um mês
3. Defina as datas inicial e final
4. Clique em **"Gerar Relatório"**
5. O sistema mostra:
   - Número total de entradas e saídas
   - Lista de todos os usuários
   - Detalhes de cada movimentação
6. Você pode:
   - **Imprimir:** Clique em "Imprimir"
   - **Baixar PDF:** Clique em "Baixar PDF"

### Aba 5: Buscar Usuário

Use esta aba para procurar informações sobre um usuário específico.

**Como usar:**
1. Clique na aba **"Buscar Usuário"**
2. Digite o nome ou CPF da pessoa
3. Clique em **"Buscar"**
4. O sistema mostra:
   - Dados cadastrais da pessoa
   - Histórico completo de entradas e saídas
   - Datas e horários de cada movimentação

---

## 🖨️ Impressão e PDF

### Imprimir Relatórios

1. Gere o relatório desejado
2. Clique em **"Imprimir"**
3. Uma janela de visualização vai aparecer
4. Clique em **"Imprimir"** (ou pressione Ctrl+P)
5. Selecione sua impressora e clique em **"Imprimir"**

### Salvar como PDF

1. Gere o relatório desejado
2. Clique em **"Baixar PDF"**
3. O arquivo será baixado automaticamente
4. Você pode abrir, salvar ou compartilhar o PDF

---

## 🔒 Segurança e Privacidade

### Informações Importantes

1. **Dados Locais:** O sistema armazena dados localmente no navegador (localStorage) como backup
2. **Google Sheets:** Os dados principais são armazenados na sua planilha Google Sheets
3. **Compartilhamento:** Não compartilhe sua chave de API com outras pessoas
4. **Backup:** Faça backup regular da sua planilha Google Sheets

### Protegendo sua Chave de API

1. Nunca compartilhe sua chave de API
2. Se alguém vir sua chave, regenere-a na Google Cloud Console
3. Considere usar uma conta de serviço para maior segurança

---

## 🐛 Suporte e Troubleshooting

### Problema: "Erro ao conectar com Google Sheets"

**Solução:**
1. Verifique se o ID da planilha está correto
2. Verifique se a chave de API está correta
3. Certifique-se de que a planilha foi compartilhada com o email da chave de API
4. Aguarde alguns minutos e tente novamente

### Problema: "Erro ao cadastrar usuário"

**Solução:**
1. Verifique se o CPF é válido
2. Certifique-se de que o CPF não está duplicado
3. Tente novamente em alguns segundos

### Problema: "Dados não aparecem no relatório"

**Solução:**
1. Certifique-se de que registrou entradas/saídas
2. Verifique se as datas estão corretas
3. Tente atualizar a página (F5)

### Problema: "Não consigo imprimir o relatório"

**Solução:**
1. Tente usar a opção "Baixar PDF" em vez de imprimir
2. Verifique as configurações de impressão do navegador
3. Tente em outro navegador

### Problema: "Sistema muito lento"

**Solução:**
1. Limpe o cache do navegador
2. Feche outras abas/programas
3. Tente em outro navegador
4. Verifique sua conexão de internet

---

## 📱 Acesso em Dispositivos Móveis

O sistema funciona perfeitamente em smartphones e tablets!

### Para Acessar:

1. Abra o navegador do seu celular
2. Digite: `https://seu-usuario.github.io/casa-passagem`
3. O sistema se adapta automaticamente ao tamanho da tela

### Dicas para Celular:

- Use em modo paisagem para melhor visualização de tabelas
- Toque nos campos para preencher
- Use o teclado do celular para digitar

---

## 🔄 Atualizações e Manutenção

### Fazer Backup dos Dados

1. Abra sua planilha Google Sheets
2. Clique em **"Arquivo"** → **"Fazer download"** → **"Microsoft Excel (.xlsx)"**
3. Salve o arquivo em um local seguro

### Atualizar o Sistema

Se houver atualizações do sistema:

1. Vá para o repositório GitHub
2. Clique em **"Code"** → **"Download ZIP"**
3. Extraia os arquivos
4. Faça upload dos novos arquivos no repositório

---

## 📞 Contato e Suporte

Se tiver dúvidas ou problemas:

1. Verifique este guia novamente
2. Consulte a seção "Troubleshooting"
3. Verifique a documentação do Google Sheets
4. Verifique a documentação do GitHub Pages

---

## ✅ Checklist de Implementação

Antes de começar a usar o sistema, certifique-se de:

- [ ] Criar planilha Google Sheets
- [ ] Criar as 3 abas (Usuários, Movimentações, Relatórios)
- [ ] Ativar Google Sheets API
- [ ] Criar chave de API
- [ ] Compartilhar planilha com a chave de API
- [ ] Criar repositório GitHub
- [ ] Fazer upload dos arquivos
- [ ] Ativar GitHub Pages
- [ ] Acessar o sistema
- [ ] Configurar conexão com Google Sheets
- [ ] Testar cadastro de usuário
- [ ] Testar entrada/saída
- [ ] Testar geração de relatórios

---

## 🎉 Pronto!

Seu sistema está pronto para uso! Comece a cadastrar usuários e registrar entradas/saídas.

**Obrigado por usar o Sistema de Gestão Casa Passagem!**

---

*Versão 1.0.0 - Última atualização: 2025*



1Tha4s29MRpYmvTapvw28m3dmCAxqBjJoapK7BGJpdXg  id planilha


Chave API
AIzaSyBDlDIv-d1DUcNteyLvgYnbrJzYHREMPz0