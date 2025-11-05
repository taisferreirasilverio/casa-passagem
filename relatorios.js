// ============================================
// SISTEMA DE RELATÓRIOS
// ============================================

// Função para gerar relatório semanal/mensal
async function gerarRelatorio() {
    const tipoRelatorio = document.getElementById('tipo-relatorio').value;
    const dataInicio = new Date(document.getElementById('data-inicio-relatorio').value);
    const dataFim = new Date(document.getElementById('data-fim-relatorio').value);

    if (dataInicio > dataFim) {
        mostrarFeedback('relatorio-content', 'Data inicial não pode ser maior que data final', 'error');
        return;
    }

    try {
        const movimentacoesPeriodo = await obterMovimentacoesPorPeriodo(dataInicio, dataFim);
        
        // Calcular estatísticas
        const entradas = movimentacoesPeriodo.filter(m => m.tipo === 'entrada').length;
        const saidas = movimentacoesPeriodo.filter(m => m.tipo === 'saida').length;
        
        // Agrupar por usuário
        const usuariosUnicos = {};
        movimentacoesPeriodo.forEach(mov => {
            if (!usuariosUnicos[mov.usuarioId]) {
                usuariosUnicos[mov.usuarioId] = {
                    id: mov.usuarioId,
                    nome: mov.usuarioNome,
                    cpf: mov.usuarioCPF,
                    movimentacoes: []
                };
            }
            usuariosUnicos[mov.usuarioId].movimentacoes.push(mov);
        });

        const usuarios = Object.values(usuariosUnicos);

        // Gerar HTML do relatório
        let html = `
            <div class="relatorio-header">
                <h3>Relatório ${tipoRelatorio === 'semanal' ? 'Semanal' : 'Mensal'}</h3>
                <p>Período: ${formatarData(dataInicio)} a ${formatarData(dataFim)}</p>
            </div>

            <div class="relatorio-stats">
                <div class="stat-card">
                    <div class="stat-number">${entradas}</div>
                    <div class="stat-label">Entradas</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${saidas}</div>
                    <div class="stat-label">Saídas</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${usuarios.length}</div>
                    <div class="stat-label">Usuários Únicos</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${movimentacoesPeriodo.length}</div>
                    <div class="stat-label">Total de Movimentações</div>
                </div>
            </div>

            <h4>Detalhamento por Usuário</h4>
            <table class="relatorio-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Data/Hora</th>
                        <th>Tipo</th>
                        <th>Cuidador</th>
                    </tr>
                </thead>
                <tbody>
        `;

        movimentacoesPeriodo.forEach(mov => {
            const tipo = mov.tipo === 'entrada' ? '↓ ENTRADA' : '↑ SAÍDA';
            const classe = mov.tipo === 'entrada' ? 'status-entrada' : 'status-saida';
            html += `
                <tr>
                    <td>${mov.usuarioNome}</td>
                    <td>${formatarCPF(mov.usuarioCPF)}</td>
                    <td>${formatarDataHora(new Date(mov.dataHora))}</td>
                    <td><span class="${classe}">${tipo}</span></td>
                    <td>${mov.cuidador}</td>
                </tr>
            `;
        });

        html += `
                </tbody>
            </table>

            <hr class="divider">

            <h4>Lista de Usuários</h4>
            <table class="relatorio-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Movimentações</th>
                    </tr>
                </thead>
                <tbody>
        `;

        usuarios.forEach(usuario => {
            html += `
                <tr>
                    <td>${usuario.nome}</td>
                    <td>${formatarCPF(usuario.cpf)}</td>
                    <td>${usuario.movimentacoes.length}</td>
                </tr>
            `;
        });

        html += `
                </tbody>
            </table>
        `;

        document.getElementById('relatorio-content').innerHTML = html;
        document.getElementById('relatorio-content').classList.add('relatorio-content');
    } catch (error) {
        console.error('Erro ao gerar relatório:', error);
        document.getElementById('relatorio-content').innerHTML = '<p class="empty-state">Erro ao gerar relatório</p>';
    }
}

// Função para imprimir relatório
function imprimirRelatorio() {
    const conteudo = document.getElementById('relatorio-content').innerHTML;
    if (conteudo.includes('empty-state') || conteudo === '') {
        alert('Gere um relatório primeiro');
        return;
    }
    abrirModalImpressao(conteudo);
    setTimeout(() => window.print(), 100);
}

// Função para gerar PDF do relatório
async function gerarPDFRelatorio() {
    const conteudo = document.getElementById('relatorio-content').innerHTML;
    if (conteudo.includes('empty-state') || conteudo === '') {
        alert('Gere um relatório primeiro');
        return;
    }

    try {
        // Usar biblioteca html2pdf se disponível, senão usar print
        if (typeof html2pdf !== 'undefined') {
            const element = document.getElementById('relatorio-content');
            const opt = {
                margin: 10,
                filename: `relatorio-${new Date().toISOString().split('T')[0]}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
            };
            html2pdf().set(opt).from(element).save();
        } else {
            // Fallback: usar print
            abrirModalImpressao(conteudo);
            setTimeout(() => window.print(), 100);
        }
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        alert('Erro ao gerar PDF');
    }
}

// ============================================
// RELATÓRIO DIÁRIO DE PRESENÇA
// ============================================

async function gerarRelatorioDiario() {
    const data = new Date(document.getElementById('data-relatorio-diario').value);

    try {
        const usuariosPresentes = await obterUsuariosPresentes(data);

        if (usuariosPresentes.length === 0) {
            document.getElementById('relatorio-diario-content').innerHTML = 
                '<p class="empty-state">Nenhum usuário presente nesta data</p>';
            return;
        }

        let html = `
            <div class="relatorio-header">
                <h3>Relatório Diário de Presença</h3>
                <p>Data: ${formatarData(data)}</p>
                <p>Total de Presentes: ${usuariosPresentes.length}</p>
            </div>

            <div class="presenca-list">
        `;

        usuariosPresentes.forEach((usuario, index) => {
            html += `
                <div class="presenca-item">
                    <div class="presenca-info">
                        <strong>${index + 1}. ${usuario.nome}</strong>
                        <p>CPF: ${formatarCPF(usuario.cpf)}</p>
                    </div>
                    <div class="presenca-assinatura">Assinatura</div>
                </div>
            `;
        });

        html += `
            </div>

            <div style="margin-top: 2rem; text-align: center; font-size: 0.9rem; color: #7f8c8d;">
                <p>Responsável pela Verificação: _________________________</p>
                <p>Data: ${formatarData(data)}</p>
            </div>
        `;

        document.getElementById('relatorio-diario-content').innerHTML = html;
    } catch (error) {
        console.error('Erro ao gerar relatório diário:', error);
        document.getElementById('relatorio-diario-content').innerHTML = 
            '<p class="empty-state">Erro ao gerar relatório</p>';
    }
}

// Função para imprimir relatório diário
function imprimirRelatorioDiario() {
    const conteudo = document.getElementById('relatorio-diario-content').innerHTML;
    if (conteudo.includes('empty-state') || conteudo === '') {
        alert('Gere um relatório primeiro');
        return;
    }
    abrirModalImpressao(conteudo);
    setTimeout(() => window.print(), 100);
}

// Função para gerar PDF do relatório diário
async function gerarPDFRelatorioDiario() {
    const conteudo = document.getElementById('relatorio-diario-content').innerHTML;
    if (conteudo.includes('empty-state') || conteudo === '') {
        alert('Gere um relatório primeiro');
        return;
    }

    try {
        if (typeof html2pdf !== 'undefined') {
            const element = document.getElementById('relatorio-diario-content');
            const opt = {
                margin: 10,
                filename: `presenca-${new Date().toISOString().split('T')[0]}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
            };
            html2pdf().set(opt).from(element).save();
        } else {
            abrirModalImpressao(conteudo);
            setTimeout(() => window.print(), 100);
        }
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        alert('Erro ao gerar PDF');
    }
}

// ============================================
// FUNÇÕES AUXILIARES PARA RELATÓRIOS
// ============================================

// Função para exportar relatório como CSV
function exportarCSV(dados, nomeArquivo) {
    const csv = convertToCSV(dados);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', nomeArquivo);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function convertToCSV(dados) {
    const keys = Object.keys(dados[0]);
    const csv = [keys.join(',')];
    
    dados.forEach(item => {
        const values = keys.map(key => {
            const value = item[key];
            return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
        });
        csv.push(values.join(','));
    });
    
    return csv.join('\n');
}
