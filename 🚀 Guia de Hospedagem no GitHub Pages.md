# 🚀 Guia de Hospedagem no GitHub Pages

Este documento fornece um guia passo a passo para hospedar o sistema no GitHub Pages.

## Passo 1: Criar uma Conta GitHub

Se você ainda não tem uma conta GitHub:

1. Acesse [GitHub](https://github.com)
2. Clique em **"Sign up"** (canto superior direito)
3. Preencha os dados:
   - **Email:** Seu email
   - **Password:** Uma senha segura
   - **Username:** Um nome de usuário único
4. Clique em **"Create account"**
5. Siga o processo de verificação
6. Confirme seu email

## Passo 2: Criar um Repositório

### Acessar Novo Repositório

1. Faça login no GitHub
2. Clique no ícone **"+"** (canto superior direito)
3. Selecione **"New repository"**

### Configurar o Repositório

Preencha os dados:

| Campo | Valor |
|-------|-------|
| **Repository name** | `casa-passagem` |
| **Description** | `Sistema de Gestão de Acolhimento` |
| **Public** | ✓ Marque (necessário para GitHub Pages) |
| **Add a README file** | ✓ Marque |
| **Add .gitignore** | Deixe em branco (usaremos o nosso) |
| **Choose a license** | Deixe em branco |

Clique em **"Create repository"**

## Passo 3: Fazer Upload dos Arquivos

### Opção A: Usando GitHub Web Interface (Recomendado para Iniciantes)

#### 1. Acessar o Repositório

1. Você será levado para o repositório que acabou de criar
2. Você verá uma página com alguns arquivos

#### 2. Fazer Upload dos Arquivos

1. Clique em **"Add file"** → **"Upload files"**
2. Você pode:
   - **Arrastar e soltar:** Arraste os arquivos para a área de upload
   - **Clicar para selecionar:** Clique na área para selecionar arquivos

#### 3. Selecionar os Arquivos

Você precisa fazer upload dos seguintes arquivos e pastas:

```
index.html
css/
  └── style.css
js/
  ├── config.js
  ├── googlesheets.js
  ├── app.js
  └── relatorios.js
README.md
GUIA_IMPLEMENTACAO.md
CONFIGURACAO_GOOGLE_SHEETS.md
CONFIGURACAO_GOOGLE_CLOUD.md
HOSPEDAGEM_GITHUB.md
.gitignore
_config.yml
```

#### 4. Confirmar Upload

1. Após selecionar os arquivos, clique em **"Commit changes"**
2. Você pode deixar a mensagem padrão ou escrever uma personalizada
3. Clique em **"Commit changes"** novamente

### Opção B: Usando Git (Para Usuários Avançados)

Se você tem Git instalado no seu computador:

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/casa-passagem.git
cd casa-passagem

# 2. Copie os arquivos do projeto para este diretório
# (Copie manualmente os arquivos)

# 3. Adicione os arquivos
git add .

# 4. Faça commit
git commit -m "Adicionar sistema de gestão Casa Passagem"

# 5. Faça push
git push origin main
```

## Passo 4: Ativar GitHub Pages

### Acessar Configurações

1. No repositório, clique na aba **"Settings"** (engrenagem)
2. Na barra lateral esquerda, clique em **"Pages"**

### Configurar GitHub Pages

1. Em **"Source"**, selecione:
   - **Branch:** `main`
   - **Folder:** `/ (root)`
2. Clique em **"Save"**

### Aguardar Publicação

1. Aguarde alguns minutos (geralmente 1-5 minutos)
2. Você verá uma mensagem verde: "Your site is published at: `https://seu-usuario.github.io/casa-passagem`"
3. Clique no link para acessar seu site

## Passo 5: Acessar o Sistema

### URL do Sistema

Seu sistema estará disponível em:

```
https://seu-usuario.github.io/casa-passagem
```

Substitua `seu-usuario` pelo seu nome de usuário do GitHub.

### Testar o Acesso

1. Abra o navegador
2. Acesse a URL acima
3. Uma tela de login deve aparecer
4. Digite seu nome e clique em **"Entrar"**

## Passo 6: Compartilhar o Link

Você pode compartilhar o link com outras pessoas:

```
https://seu-usuario.github.io/casa-passagem
```

Qualquer pessoa com este link pode acessar o sistema de qualquer lugar, em qualquer dispositivo.

## Atualizar o Sistema

Se você precisar fazer mudanças no sistema:

### Opção A: GitHub Web Interface

1. Acesse o repositório no GitHub
2. Clique no arquivo que deseja editar
3. Clique no ícone de lápis (editar)
4. Faça as alterações
5. Clique em **"Commit changes"**

### Opção B: Git

```bash
# 1. Faça as alterações nos arquivos locais

# 2. Adicione as alterações
git add .

# 3. Faça commit
git commit -m "Descrever as mudanças"

# 4. Faça push
git push origin main
```

## Estrutura do Repositório

Após fazer upload, seu repositório deve ter esta estrutura:

```
casa-passagem/
├── index.html
├── README.md
├── GUIA_IMPLEMENTACAO.md
├── CONFIGURACAO_GOOGLE_SHEETS.md
├── CONFIGURACAO_GOOGLE_CLOUD.md
├── HOSPEDAGEM_GITHUB.md
├── .gitignore
├── _config.yml
├── css/
│   └── style.css
└── js/
    ├── config.js
    ├── googlesheets.js
    ├── app.js
    └── relatorios.js
```

## Dicas Importantes

**Sempre use o branch `main`:** GitHub Pages usa o branch main por padrão

**Não delete o arquivo index.html:** Este é o arquivo principal do site

**Mantenha a estrutura de pastas:** As pastas `css/` e `js/` devem estar no raiz

**Faça backup:** Periodicamente, faça backup do seu repositório

**Teste as mudanças:** Sempre teste o site após fazer alterações

## Troubleshooting

### "Site não está sendo publicado"

**Solução:**
1. Verifique se o repositório é público
2. Verifique se GitHub Pages está ativado nas configurações
3. Aguarde alguns minutos
4. Atualize a página do navegador (Ctrl+F5)

### "Erro 404 - Página não encontrada"

**Solução:**
1. Verifique se o arquivo `index.html` está no raiz do repositório
2. Verifique se o nome do arquivo está correto (case-sensitive)
3. Verifique a URL (deve ser `https://seu-usuario.github.io/casa-passagem`)

### "Estilos ou scripts não estão carregando"

**Solução:**
1. Verifique se as pastas `css/` e `js/` estão no raiz
2. Verifique os caminhos nos arquivos HTML
3. Atualize a página (Ctrl+F5)
4. Abra o console do navegador (F12) para ver erros

### "Mudanças não aparecem no site"

**Solução:**
1. Aguarde alguns minutos para o GitHub Pages atualizar
2. Atualize a página (Ctrl+F5)
3. Limpe o cache do navegador
4. Tente em outro navegador

## Próximos Passos

1. Acesse o sistema em `https://seu-usuario.github.io/casa-passagem`
2. Configure a conexão com Google Sheets (veja [GUIA_IMPLEMENTACAO.md](GUIA_IMPLEMENTACAO.md))
3. Comece a usar o sistema!

## Segurança

**Nunca compartilhe sua chave de API:** Se alguém vir sua chave no navegador, regenere-a na Google Cloud Console

**Use HTTPS:** GitHub Pages usa HTTPS por padrão (seguro)

**Não commit credenciais:** Nunca faça commit de arquivos com credenciais sensíveis

---

**Pronto!** Seu sistema está hospedado e acessível online.

Próximo passo: [GUIA_IMPLEMENTACAO.md](GUIA_IMPLEMENTACAO.md) - Seção "Configuração do Sistema"
