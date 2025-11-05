// ============================================
// CONFIGURAÇÃO DO SISTEMA
// ============================================

const CONFIG = {
    // IDs das planilhas Google Sheets
    spreadsheetId: localStorage.getItem('spreadsheetId') || '',
    apiKey: localStorage.getItem('apiKey') || '',
    
    // Nomes das abas da planilha
    sheets: {
        usuarios: 'Usuários',
        movimentacoes: 'Movimentações',
        relatorios: 'Relatórios'
    },

    // Configurações de data
    dateFormat: 'dd/mm/yyyy',
    timeFormat: 'hh:mm',

    // Mensagens do sistema
    messages: {
        success: 'Operação realizada com sucesso!',
        error: 'Erro ao processar a solicitação',
        loading: 'Carregando...',
        noData: 'Nenhum dado encontrado'
    }
};

// Função para salvar configurações
function saveConfig(spreadsheetId, apiKey) {
    localStorage.setItem('spreadsheetId', spreadsheetId);
    localStorage.setItem('apiKey', apiKey);
    CONFIG.spreadsheetId = spreadsheetId;
    CONFIG.apiKey = apiKey;
}

// Função para validar CPF
function validarCPF(cpf) {
    // Remove caracteres especiais
    cpf = cpf.replace(/[^\d]/g, '');

    // Verifica se tem 11 dígitos
    if (cpf.length !== 11) return false;

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    // Calcula primeiro dígito verificador
    let sum = 0;
    let remainder;
    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    // Calcula segundo dígito verificador
    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}

// Função para formatar CPF
function formatarCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    if (cpf.length !== 11) return cpf;
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

// Função para formatar data
function formatarData(data) {
    if (!data) return '';
    const d = new Date(data);
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const ano = d.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

// Função para formatar hora
function formatarHora(data) {
    if (!data) return '';
    const d = new Date(data);
    const horas = String(d.getHours()).padStart(2, '0');
    const minutos = String(d.getMinutes()).padStart(2, '0');
    return `${horas}:${minutos}`;
}

// Função para formatar data e hora
function formatarDataHora(data) {
    return `${formatarData(data)} ${formatarHora(data)}`;
}

// Função para converter data do formato dd/mm/yyyy para Date
function parseData(dataStr) {
    if (!dataStr) return new Date();
    const [dia, mes, ano] = dataStr.split('/');
    return new Date(ano, mes - 1, dia);
}

// Função para obter data atual formatada
function getDataAtual() {
    const hoje = new Date();
    return formatarData(hoje);
}

// Função para obter hora atual formatada
function getHoraAtual() {
    const agora = new Date();
    return formatarHora(agora);
}

// Função para mostrar feedback
function mostrarFeedback(elementId, mensagem, tipo = 'success') {
    const elemento = document.getElementById(elementId);
    if (!elemento) return;

    elemento.textContent = mensagem;
    elemento.className = `feedback show ${tipo}`;

    // Auto-remover após 5 segundos
    setTimeout(() => {
        elemento.classList.remove('show');
    }, 5000);
}

// Função para limpar formulário
function limparFormulario(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.reset();
    }
}

// Função para obter semana atual
function getSemanaPorData(data) {
    const d = new Date(data);
    const dia = d.getDay();
    const diff = d.getDate() - dia + (dia === 0 ? -6 : 1);
    const inicio = new Date(d.setDate(diff));
    const fim = new Date(inicio);
    fim.setDate(fim.getDate() + 6);
    return { inicio, fim };
}

// Função para obter mês atual
function getMesPorData(data) {
    const d = new Date(data);
    const inicio = new Date(d.getFullYear(), d.getMonth(), 1);
    const fim = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    return { inicio, fim };
}

// Função para verificar se data está entre intervalo
function dataEntrePeriodo(data, dataInicio, dataFim) {
    const d = new Date(data);
    const di = new Date(dataInicio);
    const df = new Date(dataFim);
    return d >= di && d <= df;
}
