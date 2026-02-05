/* == == == Popups == == == */
/*
    Exibe uma notificação temporária (Toast) na tela.
    @param {string} message - A mensagem secundária a ser exibida.
    @param {string} type - O tipo da notificação ('success' ou 'error'), define a cor e o ícone.
*/
function showToast(message, type = 'success') {
    const container = document.getElementById('toast_container'); // Seleciona o container pai onde as notificações serão empilhadas.
    const toast = document.createElement('div'); // Cria o elemento div do toast dinamicamente na memória.

    const isSuccess = type === 'success'; // Define se o estado atual é de sucesso para simplificar as condicionais abaixo.

    const iconPath = isSuccess // Armazena o "path" (caminho vetorial) do ícone SVG. Se for sucesso, usa um ícone de 'check', se não, um ícone de 'X'.
        ? "M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" 
        : "M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z";
    
    const title = isSuccess ? getTranslation('success_title') : getTranslation('error_title'); // Busca o título traduzido usando a função de tradução.

    toast.className = `toast_card ${type}`; // Atribui as classes CSS. O uso de template literals permite estilização dinâmica (toast_card success/error).
    // Define a estrutura interna do Toast usando SVG para onda de fundo e ícones.
    toast.innerHTML = ` 
        <svg class="wave" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,256L11.4,240C22.9,224,46,192,69,192C91.4,192,114,224,137,234.7C160,245,183,235,206,213.3C228.6,192,251,160,274,149.3C297.1,139,320,149,343,181.3C365.7,213,389,267,411,282.7C434.3,299,457,277,480,250.7C502.9,224,526,192,549,181.3C571.4,171,594,181,617,208C640,235,663,277,686,256C708.6,235,731,149,754,122.7C777.1,96,800,128,823,165.3C845.7,203,869,245,891,224C914.3,203,937,117,960,112C982.9,107,1006,181,1029,197.3C1051.4,213,1074,171,1097,144C1120,117,1143,107,1166,133.3C1188.6,160,1211,224,1234,218.7C1257.1,213,1280,139,1303,133.3C1325.7,128,1349,192,1371,192C1394.3,192,1417,128,1429,96L1440,64L1440,320L1428.6,320C1417.1,320,1394,320,1371,320C1348.6,320,1326,320,1303,320C1280,320,1257,320,1234,320C1211.4,320,1189,320,1166,320C1142.9,320,1120,320,1097,320C1074.3,320,1051,320,1029,320C1005.7,320,983,320,960,320C937.1,320,914,320,891,320C868.6,320,846,320,823,320C800,320,777,320,754,320C731.4,320,709,320,686,320C662.9,320,640,320,617,320C594.3,320,571,320,549,320C525.7,320,503,320,480,320C457.1,320,434,320,411,320C388.6,320,366,320,343,320C320,320,297,320,274,320C251.4,320,229,320,206,320C182.9,320,160,320,137,320C114.3,320,91,320,69,320C45.7,320,23,320,11,320L0,320Z"></path>
        </svg>
        <div class="icon_container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="icon">
                <path d="${iconPath}"></path>
            </svg>
        </div>
        <div class="message_text_container">
            <p class="message_text">${title}</p>
            <p class="sub_text">${message}</p>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" class="cross_icon">
            <path fill="currentColor" d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"></path>
        </svg>
    `;

    container.appendChild(toast); // Adiciona o elemento recém-criado ao container visível no DOM.

    const removeToast = () => {
        toast.classList.add('fade_out'); // Adiciona a classe de animação fade out.
        toast.addEventListener('animationend', () => toast.remove()); // Espera o fim da animação CSS para efetivamente deletar o elemento, evitando cortes bruscos.
    };

    toast.onclick = removeToast; // Permite fechar o toast ao clicar em qualquer parte dele.
    setTimeout(removeToast, 6000); // Define um timer de 6 segundos para auto-destruição, caso o usuário não interaja.
}

/* == == == Header == == == */
let lastScrollY = window.scrollY; // Armazena a última posição do scroll para comparação.
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > lastScrollY) { // Se a posição atual do scroll for maior que a anterior, o usuário está descendo a página.
        header.classList.add("header_hidden"); // Adiciona a classe que esconde o header via CSS transform.
    } else { // Se a posição atual for menor, o usuário está subindo, então o header reaparece.
        header.classList.remove("header_hidden");
    }
    
    lastScrollY = window.scrollY; // Atualiza a variável com o valor atual para a próxima comparação no próximo evento de scroll.
});

/* == == == Sistema de Internacionalização (i18n) == == == */
import { translations } from './translations.js'; // Importa o dicionário de traduções de um arquivo externo para manter o código limpo.

const langToggle = document.getElementById('lang_toggle');

/*
    Varre o DOM em busca de elementos com o atributo 'data-i18n' e aplica a tradução correspondente.
    @param {string} lang - O código do idioma ('pt' ou 'en').
*/
function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]'); // Seleciona todos os elementos que possuem o atributo de tradução.
    
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = translations[lang][key];

        if (translation) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') { // Tratamento especial para inputs: altera o placeholder em vez do texto interno.
                el.placeholder = translation;
            } else { // Para elementos comuns (p, h1, span), altera o conteúdo de texto.
                el.textContent = translation;
            }
        }
    });

    document.documentElement.lang = lang; // Atualiza o atributo 'lang' na tag <html> para boas práticas de SEO e acessibilidade.
}

const savedLang = localStorage.getItem('language') || 'pt'; // Inicialização: Tenta recuperar o idioma salvo pelo usuário ou define 'pt' como padrão.

// Sincroniza o estado visual do switch de idioma.
langToggle.checked = savedLang === 'en';
updateLanguage(savedLang);

langToggle.addEventListener('change', () => { // Ouvinte de evento para troca manual de idioma.
    const newLang = langToggle.checked ? 'en' : 'pt';
    localStorage.setItem('language', newLang); // Persiste a escolha do usuário no navegador (LocalStorage).
    
    updateLanguage(newLang); // Atualiza os textos estáticos marcados com data-i18n.
    renderDashboard(); // Recarrega o Dashboard para aplicar o símbolo monetário correto ($ ou R$) e datas.
    renderDeleteList(); // Atualiza a lista de exclusão caso o modal esteja aberto no momento da troca.
});

// Função utilitária para obter uma tradução específica dentro de scripts JS.
function getTranslation(key) {
    const lang = localStorage.getItem('language') || 'pt';
    return translations[lang][key] || key;
}

/* == == == Gestão de Temas (Dark/Light Mode) == == == */
const themeInput = document.getElementById('theme_input');
const body = document.body;

const savedTheme = localStorage.getItem('theme'); // Recupera a preferência de tema salva no navegador.

if (savedTheme === 'dark') {  // Aplica o tema salvo imediatamente ao carregar a página para evitar "piscadas" de cor branca.
    body.classList.add('dark_theme');
    themeInput.checked = true; // Sincroniza o switch para a posição da Lua.
} else {
    body.classList.remove('dark_theme');
    themeInput.checked = false; // Sincroniza para a posição do Sol.
}

themeInput.addEventListener('change', () => { // Listener para detectar a mudança manual do tema via switch.
    if (themeInput.checked) {
        body.classList.add('dark_theme');
        localStorage.setItem('theme', 'dark'); // Salva preferência.
    } else {
        body.classList.remove('dark_theme');
        localStorage.setItem('theme', 'light'); // Salva preferência.
    }
});

/* == == == Main (Lógica Principal e Formulário) == == == */
const dateInput = document.getElementsByClassName('date_input')[0]; // Inicialização do campo de data: busca o primeiro elemento com a classe 'date_input'.

/*
    Define automaticamente o valor do input de data para o dia atual.
    Utiliza o formato ISO (YYYY-MM-DD) exigido pelos navegadores.
*/
function setTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // getMonth() retorna 0-11, então somamos 1. padStart(2, '0') garante que '1' vire '01'.
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    dateInput.value = formattedDate;
}

setTodayDate(); // Executa a função imediatamente ao carregar o script.

/* == == == Componentes de Filtro == == == */
const allDropdowns = document.querySelectorAll('.custom_dropdown');

allDropdowns.forEach(dropdown => {
    const header = dropdown.querySelector('.dropdown_header');
    const content = dropdown.querySelector('.dropdown_content');
    const checkAll = dropdown.querySelector('.check_all');
    const options = dropdown.querySelectorAll('.option_item');

    // Abre/Fecha o dropdown clicado e fecha os outros que estiverem abertos.
    header.addEventListener('click', (e) => {
        allDropdowns.forEach(other => {
            if (other !== dropdown) {
                other.querySelector('.dropdown_content').classList.remove('show');
            }
        });
        
        content.classList.toggle('show');
        e.stopPropagation(); // Impede que o clique no cabeçalho feche o menu imediatamente através do listener da 'window'.
    });

    content.addEventListener('click', (e) => { // Impede o fechamento do menu ao clicar nas opções internas (checkboxes).
        e.stopPropagation();
    });

    // Lógica do "Selecionar Todos" dentro de cada categoria de filtro.
    if (checkAll) {
        checkAll.addEventListener('change', function() {
            options.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
            renderDashboard(); // Após marcar todos, o dashboard precisa ser atualizado.
        });
    }

    options.forEach(checkbox => { // Se o usuário desmarcar uma opção individual, desmarca automaticamente o "Selecionar Todos".
        checkbox.addEventListener('change', () => {
            const allChecked = Array.from(options).every(opt => opt.checked);
            if (checkAll) checkAll.checked = allChecked;
        });
    });
});

// Fecha qualquer dropdown aberto se o usuário clicar em uma área vazia da página.
window.addEventListener('click', () => {
    allDropdowns.forEach(dropdown => {
        dropdown.querySelector('.dropdown_content').classList.remove('show');
    });
});

/* == == == Geração de Filtros Dinâmicos == == == */
/*
    Analisa as transações existentes para criar as opções de filtro (anos, meses e dias).
    Isso evita que o usuário tente filtrar por datas onde não existem dados.
 */
function updateFilters() {
    // Cria listas únicas (Set) de Anos, Meses e Dias presentes no histórico.
    const years = [...new Set(transactions.map(t => t.date.split('-')[0]))].sort().reverse();
    const months = [...new Set(transactions.map(t => t.date.split('-')[1]))].sort();
    const days = [...new Set(transactions.map(t => t.date.split('-')[2]))].sort();

    const monthNames = {
        "01": "Janeiro", "02": "Fevereiro", "03": "Março", "04": "Abril",
        "05": "Maio", "06": "Junho", "07": "Julho", "08": "Agosto",
        "09": "Setembro", "10": "Outubro", "11": "Novembro", "12": "Dezembro"
    };

    const renderOptions = (containerId, dataArray, isMonth = false) => { // Helper para renderizar os checkboxes de filtro dinamicamente no HTML.
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = ''; 

        dataArray.forEach(value => {
            const label = document.createElement('label');
            label.className = 'cyberpunk_checkbox_label';
            const labelText = isMonth ? monthNames[value] : value;
            
            label.innerHTML = `
                <input type="checkbox" class="cyberpunk_checkbox option_item" value="${value}"> 
                ${labelText}
            `;
            container.appendChild(label);
        });
    };

    renderOptions('year_options', years);
    renderOptions('month_options', months, true);
    renderOptions('day_options', days);

    rebindCheckboxEvents(); // Vincula novamente os eventos, pois os novos elementos HTML foram criados.
}

/*
    Reatribui os eventos de clique e mudança aos checkboxes de filtro.
    Sempre que os filtros são atualizados dinamicamente, os elementos antigos são deletados e os novos precisam de novos "escutadores".
*/
function rebindCheckboxEvents() {
    allDropdowns.forEach(dropdown => { // Itera por todos os menus dropdown (Ano, Mês, Dia)
        const checkAll = dropdown.querySelector('.check_all');
        const options = dropdown.querySelectorAll('.option_item');

        // Lógica do Checkbox "Selecionar Todos"
        if (checkAll) {
            /*
                Truque de Memória: .replaceWith(cloneNode(true)) remove o elemento do DOM  e coloca uma cópia idêntica no lugar. Isso serve para "limpar"
                todos os EventListeners antigos e evitar que a mesma função seja executada várias vezes (duplicação de eventos) caso a função seja chamada repetidamente.
            */
            checkAll.replaceWith(checkAll.cloneNode(true));
            
            const newCheckAll = dropdown.querySelector('.check_all'); // Seleciona a nova cópia que acabou de ser inserida no DOM
            
            newCheckAll.addEventListener('change', function() {
                const currentOptions = dropdown.querySelectorAll('.option_item'); // Ao marcar/desmarcar o "Todos", busca as opções atuais daquele dropdown específico
                currentOptions.forEach(checkbox => {
                    checkbox.checked = this.checked; // Sincroniza o estado de todos os filhos com o estado do pai
                });

                renderDashboard(); // Atualiza os cálculos e gráficos do painel imediatamente
            });
        }

        // Lógica dos Checkboxes Individuais
        options.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const currentOptions = dropdown.querySelectorAll('.option_item');
                const allChecked = Array.from(currentOptions).every(opt => opt.checked); // Validação de Grupo: .every(opt => opt.checked) verifica se TODOS os checkboxes individuais estão marcados.
                const currentCheckAll = dropdown.querySelector('.check_all');
                if (currentCheckAll) currentCheckAll.checked = allChecked; // Se todos estiverem marcados individualmente, o "Selecionar Todos" também deve marcar.

                renderDashboard(); // Atualiza o painel com base no novo filtro selecionado
            });
        });
    });
}

/* == == == Renderização do Painel de Controle (Dashboard) == == == */
function renderDashboard() { // Função principal que processa os dados, calcula métricas e atualiza a interface.
    const container = document.getElementById('dashboard_cards');
    if (!container) return; // Segurança: encerra se o elemento não existir na página.

    /*
        Captura de filtros ativos.
        Transforma os checkboxes marcados em arrays de valores simples (ex: ["2024", "2025"]).
    */
    const selectedYears = Array.from(document.querySelectorAll('#year_options .option_item:checked')).map(el => el.value);
    const selectedMonths = Array.from(document.querySelectorAll('#month_options .option_item:checked')).map(el => el.value);
    const selectedDays = Array.from(document.querySelectorAll('#day_options .option_item:checked')).map(el => el.value);

    // Filtragem de dados.
    const filtered = transactions.filter(t => {
        const [y, m, d] = t.date.split('-'); // Divide a data 'YYYY-MM-DD' em partes para comparação individual

        /*
            Lógica de Filtro: 
            Se a lista de selecionados estiver vazia, o critério é ignorado (retorna true).
            Se houver seleção, verifica se o valor da transação está incluso na lista.
        */
        const matchYear = selectedYears.length === 0 || selectedYears.includes(y);
        const matchMonth = selectedMonths.length === 0 || selectedMonths.includes(m);
        const matchDay = selectedDays.length === 0 || selectedDays.includes(d);

        return matchYear && matchMonth && matchDay; // A transação só passa se atender aos três critérios de tempo simultaneamente
    });

    // Cálculos financeiros.
    const total = filtered.reduce((acc, t) => acc + t.amount, 0); // Soma Total: Acumula o valor de todas as transações que passaram pelo filtro.

    // Valores Extremos: Usa Math.max/min para encontrar o maior e menor gasto na lista filtrada.
    const highest = filtered.length ? Math.max(...filtered.map(t => t.amount)) : 0;
    const lowest = filtered.length ? Math.min(...filtered.map(t => t.amount)) : 0;
    
    // Média diária.
    const uniqueDays = [...new Set(filtered.map(t => t.date))].length; // Cria um Set (lista de valores únicos) com as datas para saber em quantos dias houve gastos reais.
    const dailyAvg = uniqueDays > 0 ? total / uniqueDays : 0;

    // Análise por categoria (Cards de Ranking).
    const catMap = {}; // Dicionário para agrupar totais por categoria.
    
    filtered.forEach(t => { // Agrupamento: { "Saúde": 150, "Lazer": 80 }.
        catMap[t.category] = (catMap[t.category] || 0) + t.amount;
    });

    // Ordenação: Transforma o objeto em array e ordena do maior gasto para o menor.
    const sortedCats = Object.entries(catMap).sort((a, b) => b[1] - a[1]);
    
    // Define os nomes das categorias de maior e menor impacto.
    const catMost = sortedCats.length ? sortedCats[0][0] : "---";
    const catLeast = sortedCats.length ? sortedCats[sortedCats.length - 1][0] : "---";

    // Helper para criar a estrutura HTML dos cards de forma padronizada.
    const createCard = (title, value, iconClass, isCurrency = true) => {
        const currentLang = localStorage.getItem('language') || 'pt';
        const currencySymbol = currentLang === 'en' ? '$' : 'R$';

        const formattedValue = isCurrency 
            ? `${currencySymbol} ${value.toFixed(2)}`
            : value; // Formata como moeda (R$ 10.00) ou texto simples baseado no tipo do card.

        return `
        <div class="card_analytics">
            <div class="card_header">
                <i class="fa-solid ${iconClass} card_icon"></i>
                <p class="title_text_card title">${title}</p>
            </div>
            <div class="card_body">
                <h3 class="value_text_card">${formattedValue}</h3>
            </div>
        </div>`;
    };

    // Atualiza o container com os 6 cards gerados dinamicamente.
    container.innerHTML = 
        createCard(getTranslation('total_title'), total, 'fa-wallet') +
        createCard(getTranslation('highest_title'), highest, 'fa-arrow-trend-up') +
        createCard(getTranslation('lowest_title'), lowest, 'fa-arrow-trend-down') +
        createCard(getTranslation('avg_title'), dailyAvg, 'fa-chart-line') +
        createCard(getTranslation('most_cat_title'), catMost, 'fa-tags', false) +
        createCard(getTranslation('least_cat_title'), catLeast, 'fa-tag', false);

    renderCharts(filtered); // Dispara a atualização dos gráficos visuais (Chart.js) com os dados filtrados.
}

/* == == == Gráficos Analíticos (Chart.js) == == == */
let categoryChartInstance = null; // Instâncias globais para permitir a destruição/limpeza dos gráficos.
let evolutionChartInstance = null;

function renderCharts(filteredData) {
    const ctxCat = document.getElementById('categoryChart').getContext('2d');
    const ctxEvo = document.getElementById('evolutionChart').getContext('2d');
    const currentLang = localStorage.getItem('language') || 'pt';

    // Se o gráfico já existe, ele é destruído para evitar que dados antigos "vazam" ao passar o mouse.
    if (categoryChartInstance) categoryChartInstance.destroy();
    if (evolutionChartInstance) evolutionChartInstance.destroy();

    // Dados de Categoria (Doughnut).
    const catData = {};
    filteredData.forEach(t => {
        const translatedCat = getTranslation(t.category); 
        catData[translatedCat] = (catData[translatedCat] || 0) + t.amount;
    });

    const timeData = {}; // Dados de Evolução Temporal (Line Chart).
    const sortedData = [...filteredData].sort((a, b) => new Date(a.date) - new Date(b.date)); // Garante que o gráfico siga a ordem cronológica correta.
    
    sortedData.forEach(t => {
        const dateObj = new Date(t.date + 'T00:00:00'); // Ajuste de fuso horário local para evitar que a data mude ao converter.
        
        // Formata a data para o eixo X (ex: "29 de jan" ou "Jan 29").
        const formattedDate = dateObj.toLocaleDateString(currentLang === 'en' ? 'en-US' : 'pt-BR', {
            day: '2-digit',
            month: 'short'
        });
        
        timeData[formattedDate] = (timeData[formattedDate] || 0) + t.amount;
    });

    // Gráfico de Rosca: Distribuição de gastos por categoria.
    categoryChartInstance = new Chart(ctxCat, {
        type: 'doughnut',
        data: {
            labels: Object.keys(catData),
            datasets: [{
                data: Object.values(catData),
                backgroundColor: ['#6366f1', '#a855f7', '#ec4899', '#f43f5e', '#eab308', '#22c55e'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: { 
                title: { 
                    display: true, 
                    text: getTranslation('chart_category_title'),
                    color: '#888',
                    font: { size: 16 }
                },
                legend: {
                    labels: { color: '#888' }
                }
            }
        }
    });

    // Gráfico de Linha: Evolução dos gastos ao longo do tempo.
    evolutionChartInstance = new Chart(ctxEvo, {
        type: 'line',
        data: {
            labels: Object.keys(timeData),
            datasets: [{
                label: getTranslation('value_label'),
                data: Object.values(timeData),
                borderColor: '#6366f1',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(99, 102, 241, 0.1)'
            }]
        },
        options: {
            responsive: true,
            plugins: { 
                title: { 
                    display: true, 
                    text: getTranslation('chart_evolution_title'),
                    color: '#888',
                    font: { size: 16 }
                }
            },
            scales: {
                x: { ticks: { color: '#888' } },
                y: { ticks: { color: '#888' } }
            }
        }
    });
}

/* == == == Lógica de Dados e Persistência == == == */
/*
    Tenta carregar os dados do LocalStorage. 
    Se não houver nada salvo, inicializa como um array vazio.
    JSON.parse converte a string do storage de volta para um objeto/array JS.
*/
let transactions = JSON.parse(localStorage.getItem('transactions_data')) || [];

// Chamada inicial: Garante que os filtros e o dashboard reflitam os dados salvos logo ao abrir a página.
updateFilters();
renderDashboard();

const transactionForm = document.getElementById('transaction_form'); // Evento de envio do formulário para nova transação.

transactionForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Impede o recarregamento da página (comportamento padrão de formulários HTML).

    // Captura os valores digitados pelo usuário.
    const category = document.getElementById('cat_input').value;
    const amount = document.getElementById('val_input').value;
    const date = document.getElementById('date_input').value;

    // Validação simples: impede valores negativos ou zero.
    if (parseFloat(amount) <= 0) {
        showToast(getTranslation('msg_error_value'), "error");
        return;
    }

    // Cria o objeto da nova transação.
    const newTransaction = {
        category: category,
        amount: parseFloat(amount),
        date: date
    };

    // Adiciona ao array principal e salva a versão atualizada no LocalStorage como String.
    transactions.push(newTransaction);
    localStorage.setItem('transactions_data', JSON.stringify(transactions));

    showToast(getTranslation('msg_success'), "success"); // Feedback visual de sucesso.
    
    // Limpa os campos do formulário e reseta a data para "hoje".
    transactionForm.reset();
    setTodayDate();
    
    // Força a atualização dos filtros (caso um novo ano/mês tenha surgido) e do dashboard.
    updateFilters();
    renderDashboard();
});

/* == == == Gerenciamento do Modal de Exclusão == == == */
const deleteBtn = document.querySelector('.noselect');
const modal = document.getElementById('delete_modal');
const closeModal = document.getElementById('close_modal');
const listContainer = document.getElementById('transactions_list_container');

// Abrir Modal: renderiza a lista atualizada antes de exibir o elemento.
deleteBtn.addEventListener('click', () => {
    renderDeleteList();
    modal.style.display = 'flex';
});

// Fechar Modal (botão X).
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Fechar ao clicar fora da caixa branca (no overlay escuro).
window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});

// Função para gerar dinamicamente a lista de transações dentro do Modal.
function renderDeleteList() {
    listContainer.innerHTML = ''; // Limpa a lista anterior.
    
    // Caso não existam dados, exibe uma mensagem.
    if (transactions.length === 0) {
        const noTrans = getTranslation('no_transactions_found'); 
        listContainer.innerHTML = `<p style="text-align:center; padding:20px;">${noTrans}</p>`;
        return;
    }

    // Define moeda e idioma com base nas preferências salvas.
    const currentLang = localStorage.getItem('language') || 'pt';
    const currencySymbol = currentLang === 'pt' ? 'R$' : '$';
    const deleteLabel = getTranslation('delete_label'); 

    // Cria um item de lista para cada transação no array.
    transactions.forEach((t, index) => {
        // Formatação de data respeitando o fuso horário local.
        const dateObj = new Date(t.date + 'T00:00:00');
        const locale = currentLang === 'pt' ? 'pt-BR' : 'en-US';
        const formattedDate = dateObj.toLocaleDateString(locale);

        const item = document.createElement('div');
        item.className = 'transaction_item';
        item.innerHTML = `
            <div class="trans_info">
                <strong>${getTranslation(t.category)}</strong>
                <span>${formattedDate}</span> </div>
            <div style="display: flex; align-items: center; gap: 15px;">
                <span class="trans_amount">${currencySymbol} ${t.amount.toFixed(2)}</span>
                
                <button class="delete_btn" data-label="${deleteLabel}" onclick="deleteTransaction(${index})">
                    <svg viewBox="0 0 448 512" class="svgIcon">
                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                    </svg>
                </button>
            </div>
        `;
        listContainer.appendChild(item);
    });
}

// Função para deletar um item específico. Anexada ao objeto 'window' para que o HTML gerado via string consiga acessá-la.
window.deleteTransaction = function(index) {
    transactions.splice(index, 1); // // Remove 1 elemento da posição 'index'.
    localStorage.setItem('transactions_data', JSON.stringify(transactions)); // Atualiza o storage com o array reduzido.
    
    // Sincronização em cascata: atualiza modal, filtros e dashboard.
    showToast(getTranslation('msg_removed'), "success");
    renderDeleteList();
    updateFilters();
    renderDashboard();
};