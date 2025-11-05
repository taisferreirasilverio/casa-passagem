# 🏠 Casa Passagem - Sistema de Gestão de Acolhimento

Um sistema web completo, intuitivo e responsivo para gerenciar o acolhimento de pessoas em situação de rua.

## ✨ Características

- **Cadastro de Usuários**: Registre nome, CPF, responsável e observações
- **Entrada/Saída**: Registre automaticamente data e hora de entradas e saídas
- **Relatórios Diários**: Gere listas de presença com espaço para assinatura
- **Relatórios Semanais/Mensais**: Analise dados de movimentação por período
- **Busca de Usuários**: Procure por nome ou CPF e veja histórico completo
- **Google Sheets Integration**: Dados sincronizados com sua planilha Google
- **Responsivo**: Funciona perfeitamente em desktop, tablet e smartphone
- **Impressão e PDF**: Gere relatórios em PDF ou imprima diretamente
- **Sem Instalação**: Acesse direto do navegador, em qualquer lugar

## 🚀 Quick Start

### 1. Preparar Google Sheets
- Crie uma planilha em [Google Sheets](https://sheets.google.com)
- Crie 3 abas: "Usuários", "Movimentações", "Relatórios"
- Adicione os cabeçalhos conforme o guia

### 2. Configurar Google Cloud
- Ative Google Sheets API em [Google Cloud Console](https://console.cloud.google.com/)
- Crie uma chave de API
- Compartilhe a planilha com a conta de serviço

### 3. Hospedar no GitHub
- Crie um repositório no [GitHub](https://github.com)
- Faça upload dos arquivos
- Ative GitHub Pages nas configurações

### 4. Usar o Sistema
- Acesse `https://seu-usuario.github.io/casa-passagem`
- Configure a conexão com Google Sheets
- Comece a usar!

## 📖 Documentação Completa

Para um guia passo a passo detalhado, veja [GUIA_IMPLEMENTACAO.md](GUIA_IMPLEMENTACAO.md)

## 🎯 Funcionalidades Principais

### 📝 Cadastro
- Registre novos usuários com nome, CPF, responsável e observações
- Validação automática de CPF
- Histórico de cadastros recentes

### 🚪 Entrada/Saída
- Registre entradas e saídas com data/hora automática
- Selecione usuário e cuidador responsável
- Histórico de últimas movimentações

### 📋 Presença Diária
- Gere relatório diário de quem está na casa
- Espaço para assinatura de cada pessoa
- Imprima ou baixe como PDF

### 📊 Relatórios
- Relatórios semanais e mensais
- Estatísticas de entradas e saídas
- Lista completa de usuários e movimentações
- Exportar como PDF

### 🔍 Busca
- Procure por nome ou CPF
- Veja histórico completo de movimentações
- Informações cadastrais completas

## 💾 Armazenamento de Dados

- **Google Sheets**: Armazenamento principal e sincronizado
- **LocalStorage**: Backup local no navegador
- **Seguro**: Dados protegidos pela segurança do Google

## 📱 Compatibilidade

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Navegadores móveis
- ✅ Tablets

## 🔒 Segurança

- Chave de API protegida nas configurações
- Dados sincronizados com Google Sheets
- Sem servidor externo necessário
- Hospedagem segura no GitHub Pages

## 📋 Requisitos

- Conta Google (Gmail)
- Conta GitHub
- Navegador web moderno
- Conexão com internet

## 🛠️ Tecnologias

- HTML5
- CSS3 (Responsive Design)
- JavaScript Vanilla
- Google Sheets API
- GitHub Pages

## 📂 Estrutura de Arquivos

```
casa-passagem/
├── index.html              # Página principal
├── README.md              # Este arquivo
├── GUIA_IMPLEMENTACAO.md  # Guia completo
├── css/
│   └── style.css          # Estilos responsivos
└── js/
    ├── config.js          # Configurações
    ├── googlesheets.js    # Integração com API
    ├── app.js             # Lógica principal
    └── relatorios.js      # Sistema de relatórios
```

## 🎨 Design

- Interface limpa e intuitiva
- Cores profissionais
- Responsivo para todos os tamanhos
- Ícones FontAwesome
- Animações suaves

## 📈 Estatísticas

- Suporta ilimitados usuários
- Suporta ilimitadas movimentações
- Relatórios em tempo real
- Sem limite de armazenamento (Google Sheets)

## 🐛 Troubleshooting

### Erro de conexão com Google Sheets
- Verifique ID da planilha
- Verifique chave de API
- Certifique-se que a planilha foi compartilhada

### Dados não aparecem
- Aguarde alguns segundos
- Atualize a página (F5)
- Verifique conexão de internet

### Problemas com impressão
- Tente usar "Baixar PDF"
- Tente outro navegador
- Verifique configurações de impressora

## 📞 Suporte

Para dúvidas ou problemas, consulte o [GUIA_IMPLEMENTACAO.md](GUIA_IMPLEMENTACAO.md) na seção de Troubleshooting.

## 📄 Licença

Este projeto é fornecido como está para uso em organizações sem fins lucrativos.

## 🙏 Agradecimentos

Desenvolvido com ❤️ para ajudar pessoas em situação de rua.

---

**Versão 1.0.0** | Última atualização: 2025

**Acesse agora:** `https://seu-usuario.github.io/casa-passagem`
