// ============================================
// INTEGRAÇÃO COM GOOGLE SHEETS API
// ============================================

class GoogleSheetsAPI {
    constructor(spreadsheetId, apiKey) {
        this.spreadsheetId = spreadsheetId;
        this.apiKey = apiKey;
        this.baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets';
    }

    // Obter dados de uma aba
    async obterDados(sheetName) {
        if (!this.spreadsheetId || !this.apiKey) {
            throw new Error('Spreadsheet ID ou API Key não configurados');
        }

        try {
            const url = `${this.baseUrl}/${this.spreadsheetId}/values/${sheetName}?key=${this.apiKey}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Erro ao obter dados: ${response.statusText}`);
            }

            const data = await response.json();
            return data.values || [];
        } catch (error) {
            console.error('Erro ao obter dados do Google Sheets:', error);
            throw error;
        }
    }

    // Adicionar dados à planilha
    async adicionarDados(sheetName, valores) {
        if (!this.spreadsheetId || !this.apiKey) {
            throw new Error('Spreadsheet ID ou API Key não configurados');
        }

        try {
            const url = `${this.baseUrl}/${this.spreadsheetId}/values/${sheetName}:append?valueInputOption=USER_ENTERED&key=${this.apiKey}`;
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    values: [valores]
                })
            });

            if (!response.ok) {
                throw new Error(`Erro ao adicionar dados: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Erro ao adicionar dados ao Google Sheets:', error);
            throw error;
        }
    }

    // Atualizar dados na planilha
    async atualizarDados(sheetName, range, valores) {
        if (!this.spreadsheetId || !this.apiKey) {
            throw new Error('Spreadsheet ID ou API Key não configurados');
        }

        try {
            const url = `${this.baseUrl}/${this.spreadsheetId}/values/${sheetName}!${range}?valueInputOption=USER_ENTERED&key=${this.apiKey}`;
            
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    values: [valores]
                })
            });

            if (!response.ok) {
                throw new Error(`Erro ao atualizar dados: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Erro ao atualizar dados no Google Sheets:', error);
            throw error;
        }
    }

    // Limpar dados
    async limparDados(sheetName, range) {
        if (!this.spreadsheetId || !this.apiKey) {
            throw new Error('Spreadsheet ID ou API Key não configurados');
        }

        try {
            const url = `${this.baseUrl}/${this.spreadsheetId}/values/${sheetName}!${range}:clear?key=${this.apiKey}`;
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`Erro ao limpar dados: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Erro ao limpar dados no Google Sheets:', error);
            throw error;
        }
    }

    // Testar conexão
    async testarConexao() {
        try {
            await this.obterDados(CONFIG.sheets.usuarios);
            return true;
        } catch (error) {
            console.error('Erro ao testar conexão:', error);
            return false;
        }
    }
}

// Instância global da API
let sheetsAPI = null;

// Função para inicializar API
function inicializarAPI() {
    if (CONFIG.spreadsheetId && CONFIG.apiKey) {
        sheetsAPI = new GoogleSheetsAPI(CONFIG.spreadsheetId, CONFIG.apiKey);
        return true;
    }
    return false;
}

// Função para obter usuários cadastrados
async function obterUsuarios() {
    if (!sheetsAPI) {
        throw new Error('API não inicializada');
    }

    try {
        const dados = await sheetsAPI.obterDados(CONFIG.sheets.usuarios);
        
        // Pula o cabeçalho
        if (dados.length > 1) {
            return dados.slice(1).map(row => ({
                id: row[0] || '',
                nome: row[1] || '',
                cpf: row[2] || '',
                responsavel: row[3] || '',
                observacoes: row[4] || '',
                dataCadastro: row[5] || '',
                status: row[6] || 'Ativo'
            }));
        }
        return [];
    } catch (error) {
        console.error('Erro ao obter usuários:', error);
        throw error;
    }
}

// Função para cadastrar novo usuário
async function cadastrarUsuario(nome, cpf, responsavel, observacoes) {
    if (!sheetsAPI) {
        throw new Error('API não inicializada');
    }

    try {
        const id = Date.now().toString();
        const dataCadastro = new Date().toISOString();
        
        const valores = [
            id,
            nome,
            cpf,
            responsavel,
            observacoes,
            dataCadastro,
            'Ativo'
        ];

        await sheetsAPI.adicionarDados(CONFIG.sheets.usuarios, valores);
        return { id, nome, cpf, responsavel, observacoes, dataCadastro };
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        throw error;
    }
}

// Função para obter movimentações
async function obterMovimentacoes() {
    if (!sheetsAPI) {
        throw new Error('API não inicializada');
    }

    try {
        const dados = await sheetsAPI.obterDados(CONFIG.sheets.movimentacoes);
        
        // Pula o cabeçalho
        if (dados.length > 1) {
            return dados.slice(1).map(row => ({
                id: row[0] || '',
                usuarioId: row[1] || '',
                usuarioNome: row[2] || '',
                usuarioCPF: row[3] || '',
                tipo: row[4] || '', // 'entrada' ou 'saida'
                dataHora: row[5] || '',
                cuidador: row[6] || ''
            }));
        }
        return [];
    } catch (error) {
        console.error('Erro ao obter movimentações:', error);
        throw error;
    }
}

// Função para registrar entrada
async function registrarEntrada(usuarioId, usuarioNome, usuarioCPF, cuidador) {
    if (!sheetsAPI) {
        throw new Error('API não inicializada');
    }

    try {
        const id = Date.now().toString();
        const dataHora = new Date().toISOString();
        
        const valores = [
            id,
            usuarioId,
            usuarioNome,
            usuarioCPF,
            'entrada',
            dataHora,
            cuidador
        ];

        await sheetsAPI.adicionarDados(CONFIG.sheets.movimentacoes, valores);
        return { id, usuarioId, usuarioNome, usuarioCPF, tipo: 'entrada', dataHora, cuidador };
    } catch (error) {
        console.error('Erro ao registrar entrada:', error);
        throw error;
    }
}

// Função para registrar saída
async function registrarSaida(usuarioId, usuarioNome, usuarioCPF, cuidador) {
    if (!sheetsAPI) {
        throw new Error('API não inicializada');
    }

    try {
        const id = Date.now().toString();
        const dataHora = new Date().toISOString();
        
        const valores = [
            id,
            usuarioId,
            usuarioNome,
            usuarioCPF,
            'saida',
            dataHora,
            cuidador
        ];

        await sheetsAPI.adicionarDados(CONFIG.sheets.movimentacoes, valores);
        return { id, usuarioId, usuarioNome, usuarioCPF, tipo: 'saida', dataHora, cuidador };
    } catch (error) {
        console.error('Erro ao registrar saída:', error);
        throw error;
    }
}

// Função para buscar usuário por nome ou CPF
async function buscarUsuario(termo) {
    if (!sheetsAPI) {
        throw new Error('API não inicializada');
    }

    try {
        const usuarios = await obterUsuarios();
        const movimentacoes = await obterMovimentacoes();

        const termoLower = termo.toLowerCase();
        const usuariosEncontrados = usuarios.filter(u => 
            u.nome.toLowerCase().includes(termoLower) || 
            u.cpf.includes(termo)
        );

        // Adicionar histórico de movimentações
        return usuariosEncontrados.map(usuario => {
            const movs = movimentacoes.filter(m => m.usuarioId === usuario.id);
            return {
                ...usuario,
                movimentacoes: movs
            };
        });
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        throw error;
    }
}

// Função para obter usuários presentes na casa
async function obterUsuariosPresentes(data) {
    if (!sheetsAPI) {
        throw new Error('API não inicializada');
    }

    try {
        const usuarios = await obterUsuarios();
        const movimentacoes = await obterMovimentacoes();

        const dataStr = formatarData(data);
        const usuariosPresentes = [];

        for (const usuario of usuarios) {
            const movsUsuario = movimentacoes.filter(m => m.usuarioId === usuario.id);
            
            // Filtrar movimentações do dia
            const movsDodia = movsUsuario.filter(m => {
                const dataMov = formatarData(new Date(m.dataHora));
                return dataMov === dataStr;
            });

            if (movsDodia.length > 0) {
                // Verificar última movimentação do dia
                const ultimaMov = movsDodia[movsDodia.length - 1];
                if (ultimaMov.tipo === 'entrada') {
                    usuariosPresentes.push({
                        ...usuario,
                        ultimaMovimentacao: ultimaMov
                    });
                }
            }
        }

        return usuariosPresentes;
    } catch (error) {
        console.error('Erro ao obter usuários presentes:', error);
        throw error;
    }
}

// Função para obter movimentações por período
async function obterMovimentacoesPorPeriodo(dataInicio, dataFim) {
    if (!sheetsAPI) {
        throw new Error('API não inicializada');
    }

    try {
        const movimentacoes = await obterMovimentacoes();
        
        return movimentacoes.filter(m => {
            const dataMov = new Date(m.dataHora);
            return dataEntrePeriodo(dataMov, dataInicio, dataFim);
        });
    } catch (error) {
        console.error('Erro ao obter movimentações por período:', error);
        throw error;
    }
}
