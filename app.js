// ============================================
// APLICAÇÃO PRINCIPAL
// ============================================

// Estado global
let usuarioLogado = null;
let usuariosCadastrados = [];
let movimentacoes = [];

// ============================================
// INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Verificar login
    const usuarioSalvo = localStorage.getItem('usuarioLogado');
    if (usuarioSalvo) {
        usuarioLogado = usuarioSalvo;
        document.getElementById('login-modal').classList.remove('show');
        document.getElementById('current-user').textContent = usuarioLogado;
        inicializarSistema();
    } else {
        mostrarLoginModal();
    }

    // Event listeners
    setupEventListeners();
});

// ============================================
// LOGIN
// ============================================

function mostrarLoginModal() {
    const modal = document.getElementById('login-modal');
    modal.classList.add('show');
}

function fecharLoginModal() {
    const modal = document.getElementById('login-modal');
    modal.classList.remove('show');
}

document.getElementById('form-login')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('login-name').value.trim();
    
    if (nome) {
        usuarioLogado = nome;
        localStorage.setItem('usuarioLogado', nome);
        document.getElementById('current-user').textContent = nome;
        fecharLoginModal();
        inicializarSistema();
    }
});

document.getElementById('logout-btn')?.addEventListener('click', () => {
    localStorage.removeItem('usuarioLogado');
    usuarioLogado = null;
    mostrarLoginModal();
});

// ============================================
// INICIALIZAÇÃO DO SISTEMA
// ============================================

async function inicializarSistema() {
    // Tentar inicializar API se configurada
    if (inicializarAPI()) {
        await carregarDados();
        atualizarStatusConexao(true);
    } else {
        atualizarStatusConexao(false);
    }

    // Carregar dados locais
    carregarDadosLocais();
}

async function carregarDados() {
    try {
        usuariosCadastrados = await obterUsuarios();
        movimentacoes = await obterMovimentacoes();
        atualizarSelectsUsuarios();
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
}

function carregarDadosLocais() {
    const usuariosLocal = localStorage.getItem('usuariosCadastrados');
    const movimentacoesLocal = localStorage.getItem('movimentacoes');

    if (usuariosLocal) {
        usuariosCadastrados = JSON.parse(usuariosLocal);
    }
    if (movimentacoesLocal) {
        movimentacoes = JSON.parse(movimentacoesLocal);
    }

    atualizarSelectsUsuarios();
}

function salvarDadosLocais() {
    localStorage.setItem('usuariosCadastrados', JSON.stringify(usuariosCadastrados));
    localStorage.setItem('movimentacoes', JSON.stringify(movimentacoes));
}

// ============================================
// SETUP DE EVENT LISTENERS
// ============================================

function setupEventListeners() {
    // Navegação de abas
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tabName = e.currentTarget.dataset.tab;
            abrirAba(tabName);
        });
    });

    // Formulário de cadastro
    document.getElementById('form-cadastro')?.addEventListener('submit', handleCadastro);

    // Formulário de entrada
    document.getElementById('form-entrada')?.addEventListener('submit', handleEntrada);

    // Formulário de saída
    document.getElementById('form-saida')?.addEventListener('submit', handleSaida);

    // Busca de usuário
    document.getElementById('btn-buscar')?.addEventListener('click', handleBusca);
    document.getElementById('busca-input')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleBusca();
    });

    // Relatórios
    document.getElementById('btn-gerar-relatorio')?.addEventListener('click', gerarRelatorio);
    document.getElementById('btn-imprimir-relatorio')?.addEventListener('click', imprimirRelatorio);
    document.getElementById('btn-pdf-relatorio')?.addEventListener('click', gerarPDFRelatorio);

    // Relatório diário
    document.getElementById('btn-gerar-relatorio-diario')?.addEventListener('click', gerarRelatorioDiario);
    document.getElementById('btn-imprimir-diario')?.addEventListener('click', imprimirRelatorioDiario);
    document.getElementById('btn-pdf-diario')?.addEventListener('click', gerarPDFRelatorioDiario);

    // Configurações
    document.getElementById('btn-salvar-config')?.addEventListener('click', salvarConfiguracao);

    // Definir datas padrão
    const hoje = new Date();
    document.getElementById('data-relatorio-diario').valueAsDate = hoje;
    document.getElementById('data-inicio-relatorio').valueAsDate = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    document.getElementById('data-fim-relatorio').valueAsDate = hoje;
}

// ============================================
// NAVEGAÇÃO DE ABAS
// ============================================

function abrirAba(tabName) {
    // Remover classe active de todos os botões e panes
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));

    // Adicionar classe active ao botão e pane clicado
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(tabName).classList.add('active');

    // Atualizar dados ao abrir aba
    if (tabName === 'cadastro') {
        atualizarListaCadastros();
    } else if (tabName === 'entrada-saida') {
        atualizarListaMovimentacoes();
    }
}

// ============================================
// CADASTRO DE USUÁRIO
// ============================================

async function handleCadastro(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const responsavel = document.getElementById('responsavel').value.trim();
    const observacoes = document.getElementById('observacoes').value.trim();

    // Validar CPF
    if (!validarCPF(cpf)) {
        mostrarFeedback('cadastro-feedback', 'CPF inválido', 'error');
        return;
    }

    // Verificar se usuário já existe
    if (usuariosCadastrados.some(u => u.cpf === cpf)) {
        mostrarFeedback('cadastro-feedback', 'Este CPF já está cadastrado', 'error');
        return;
    }

    try {
        const usuario = await cadastrarUsuario(nome, cpf, responsavel, observacoes);
        usuariosCadastrados.push(usuario);
        salvarDadosLocais();
        atualizarSelectsUsuarios();
        atualizarListaCadastros();
        
        mostrarFeedback('cadastro-feedback', 'Usuário cadastrado com sucesso!', 'success');
        limparFormulario('form-cadastro');
    } catch (error) {
        console.error('Erro ao cadastrar:', error);
        mostrarFeedback('cadastro-feedback', 'Erro ao cadastrar usuário', 'error');
    }
}

function atualizarListaCadastros() {
    const lista = document.getElementById('lista-cadastros');
    
    if (usuariosCadastrados.length === 0) {
        lista.innerHTML = '<p class="empty-state">Nenhum usuário cadastrado ainda</p>';
        return;
    }

    // Mostrar últimos 10 cadastros
    const ultimos = usuariosCadastrados.slice(-10).reverse();
    
    lista.innerHTML = ultimos.map(usuario => `
        <div class="usuario-item">
            <strong>${usuario.nome}</strong>
            <p><strong>CPF:</strong> ${formatarCPF(usuario.cpf)}</p>
            <p><strong>Responsável:</strong> ${usuario.responsavel}</p>
            ${usuario.observacoes ? `<p><strong>Observações:</strong> ${usuario.observacoes}</p>` : ''}
            <p><strong>Data de Cadastro:</strong> ${formatarData(new Date(usuario.dataCadastro))}</p>
        </div>
    `).join('');
}

function atualizarSelectsUsuarios() {
    const selectEntrada = document.getElementById('entrada-usuario');
    const selectSaida = document.getElementById('saida-usuario');

    const opcoes = usuariosCadastrados.map(u => 
        `<option value="${u.id}">${u.nome} - ${formatarCPF(u.cpf)}</option>`
    ).join('');

    if (selectEntrada) {
        selectEntrada.innerHTML = '<option value="">-- Selecione um usuário --</option>' + opcoes;
    }
    if (selectSaida) {
        selectSaida.innerHTML = '<option value="">-- Selecione um usuário --</option>' + opcoes;
    }
}

// ============================================
// ENTRADA/SAÍDA
// ============================================

async function handleEntrada(e) {
    e.preventDefault();

    const usuarioId = document.getElementById('entrada-usuario').value;
    const cuidador = document.getElementById('entrada-cuidador').value.trim();

    if (!usuarioId || !cuidador) {
        mostrarFeedback('entrada-feedback', 'Preencha todos os campos', 'error');
        return;
    }

    const usuario = usuariosCadastrados.find(u => u.id === usuarioId);
    if (!usuario) {
        mostrarFeedback('entrada-feedback', 'Usuário não encontrado', 'error');
        return;
    }

    try {
        const movimentacao = await registrarEntrada(usuario.id, usuario.nome, usuario.cpf, cuidador);
        movimentacoes.push(movimentacao);
        salvarDadosLocais();
        atualizarListaMovimentacoes();
        
        mostrarFeedback('entrada-feedback', `Entrada registrada para ${usuario.nome}`, 'success');
        limparFormulario('form-entrada');
    } catch (error) {
        console.error('Erro ao registrar entrada:', error);
        mostrarFeedback('entrada-feedback', 'Erro ao registrar entrada', 'error');
    }
}

async function handleSaida(e) {
    e.preventDefault();

    const usuarioId = document.getElementById('saida-usuario').value;
    const cuidador = document.getElementById('saida-cuidador').value.trim();

    if (!usuarioId || !cuidador) {
        mostrarFeedback('saida-feedback', 'Preencha todos os campos', 'error');
        return;
    }

    const usuario = usuariosCadastrados.find(u => u.id === usuarioId);
    if (!usuario) {
        mostrarFeedback('saida-feedback', 'Usuário não encontrado', 'error');
        return;
    }

    try {
        const movimentacao = await registrarSaida(usuario.id, usuario.nome, usuario.cpf, cuidador);
        movimentacoes.push(movimentacao);
        salvarDadosLocais();
        atualizarListaMovimentacoes();
        
        mostrarFeedback('saida-feedback', `Saída registrada para ${usuario.nome}`, 'success');
        limparFormulario('form-saida');
    } catch (error) {
        console.error('Erro ao registrar saída:', error);
        mostrarFeedback('saida-feedback', 'Erro ao registrar saída', 'error');
    }
}

function atualizarListaMovimentacoes() {
    const lista = document.getElementById('lista-movimentacoes');
    
    if (movimentacoes.length === 0) {
        lista.innerHTML = '<p class="empty-state">Nenhum registro de entrada/saída ainda</p>';
        return;
    }

    // Mostrar últimas 10 movimentações
    const ultimas = movimentacoes.slice(-10).reverse();
    
    lista.innerHTML = ultimas.map(mov => {
        const classe = mov.tipo === 'entrada' ? 'status-entrada' : 'status-saida';
        const icone = mov.tipo === 'entrada' ? '↓' : '↑';
        const tipo = mov.tipo === 'entrada' ? 'ENTRADA' : 'SAÍDA';
        
        return `
            <div class="movimentacao-item">
                <strong>${mov.usuarioNome}</strong>
                <p><strong>CPF:</strong> ${formatarCPF(mov.usuarioCPF)}</p>
                <p><strong>Tipo:</strong> <span class="${classe}">${icone} ${tipo}</span></p>
                <p><strong>Data/Hora:</strong> ${formatarDataHora(new Date(mov.dataHora))}</p>
                <p><strong>Cuidador:</strong> ${mov.cuidador}</p>
            </div>
        `;
    }).join('');
}

// ============================================
// BUSCA DE USUÁRIO
// ============================================

async function handleBusca() {
    const termo = document.getElementById('busca-input').value.trim();
    const resultado = document.getElementById('resultado-busca');

    if (!termo) {
        resultado.innerHTML = '<p class="empty-state">Digite um nome ou CPF para buscar</p>';
        return;
    }

    try {
        const usuariosEncontrados = await buscarUsuario(termo);

        if (usuariosEncontrados.length === 0) {
            resultado.innerHTML = '<p class="empty-state">Nenhum usuário encontrado</p>';
            return;
        }

        resultado.innerHTML = usuariosEncontrados.map(usuario => {
            const movsUsuario = movimentacoes.filter(m => m.usuarioId === usuario.id);
            const ultimaMov = movsUsuario[movsUsuario.length - 1];

            return `
                <div class="busca-resultado">
                    <strong>${usuario.nome}</strong>
                    <p><strong>CPF:</strong> ${formatarCPF(usuario.cpf)}</p>
                    <p><strong>Responsável Cadastro:</strong> ${usuario.responsavel}</p>
                    ${usuario.observacoes ? `<p><strong>Observações:</strong> ${usuario.observacoes}</p>` : ''}
                    <p><strong>Data de Cadastro:</strong> ${formatarData(new Date(usuario.dataCadastro))}</p>
                    <hr class="divider">
                    <p><strong>Histórico de Movimentações (${movsUsuario.length}):</strong></p>
                    ${movsUsuario.length > 0 ? `
                        <ul style="margin-left: 1rem; margin-top: 0.5rem;">
                            ${movsUsuario.reverse().map(mov => `
                                <li>${mov.tipo === 'entrada' ? '↓ ENTRADA' : '↑ SAÍDA'} - ${formatarDataHora(new Date(mov.dataHora))} (${mov.cuidador})</li>
                            `).join('')}
                        </ul>
                    ` : '<p style="color: #7f8c8d;">Sem movimentações registradas</p>'}
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        resultado.innerHTML = '<p class="empty-state">Erro ao buscar usuário</p>';
    }
}

// ============================================
// CONFIGURAÇÕES
// ============================================

async function salvarConfiguracao() {
    const spreadsheetId = document.getElementById('spreadsheet-id').value.trim();
    const apiKey = document.getElementById('api-key').value.trim();

    if (!spreadsheetId || !apiKey) {
        mostrarFeedback('config-feedback', 'Preencha todos os campos', 'error');
        return;
    }

    try {
        saveConfig(spreadsheetId, apiKey);
        inicializarAPI();

        // Testar conexão
        const conectado = await sheetsAPI.testarConexao();
        
        if (conectado) {
            mostrarFeedback('config-feedback', 'Configuração salva e conexão testada com sucesso!', 'success');
            atualizarStatusConexao(true);
            await carregarDados();
        } else {
            mostrarFeedback('config-feedback', 'Configuração salva, mas conexão falhou', 'warning');
            atualizarStatusConexao(false);
        }
    } catch (error) {
        console.error('Erro ao salvar configuração:', error);
        mostrarFeedback('config-feedback', 'Erro ao salvar configuração', 'error');
        atualizarStatusConexao(false);
    }
}

function atualizarStatusConexao(conectado) {
    const statusElement = document.getElementById('status-conexao');
    if (statusElement) {
        if (conectado) {
            statusElement.textContent = 'Conectado';
            statusElement.className = 'status-conectado';
        } else {
            statusElement.textContent = 'Desconectado';
            statusElement.className = 'status-desconectado';
        }
    }
}

// ============================================
// MODAL DE IMPRESSÃO
// ============================================

function abrirModalImpressao(conteudo) {
    const modal = document.getElementById('print-modal');
    const printContent = document.getElementById('print-content');
    
    printContent.innerHTML = conteudo;
    modal.classList.add('show');
}

function closePrintModal() {
    const modal = document.getElementById('print-modal');
    modal.classList.remove('show');
}

document.getElementById('print-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'print-modal') {
        closePrintModal();
    }
});
