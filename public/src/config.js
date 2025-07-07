// Módulo para gerenciar configurações do ambiente
let config = null;

// Função para carregar configurações do servidor
async function loadConfig() {
    if (config) {
        return config;
    }

    try {
        const response = await fetch('/api/config');
        if (!response.ok) {
            throw new Error('Falha ao carregar configurações');
        }
        config = await response.json();
        return config;
    } catch (error) {
        console.warn('Erro ao carregar configurações do servidor, usando valores padrão:', error);
        // Fallback para valores padrão se não conseguir carregar do servidor
        config = {
            ENDERECO_API: 'http://localhost:8080/'
        };
        return config;
    }
}

// Função para obter uma configuração específica
export async function getConfig(key) {
    const configs = await loadConfig();
    return configs[key];
}

// Função para obter o endereço da API
export async function getApiUrl() {
    return await getConfig('ENDERECO_API');
}

// Exportar a função principal para compatibilidade
export { loadConfig };
