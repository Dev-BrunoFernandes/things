/* == == == Popups == == == */
function showToast(message, type = 'success') {
    const container = document.getElementById('toast_container');
    const toast = document.createElement('div');
    
    // Defines the icon and text based on the type.
    const isSuccess = type === 'success';
    const iconPath = isSuccess 
        ? "M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" 
        : "M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z";

    const title = isSuccess ? getTranslation('success_title') : getTranslation('error_title');

    toast.className = `toast_card ${type}`;
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

    container.appendChild(toast);

    const removeToast = () => {
        toast.classList.add('fade_out');
        toast.addEventListener('animationend', () => toast.remove());
    };

    toast.onclick = removeToast;
    setTimeout(removeToast, 6000);
}

/* == == == Header == == == */
let lastScrollY = window.scrollY;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    // If the current scroll is greater than the previous one, we are scrolling down.
    if (window.scrollY > lastScrollY) {
        header.classList.add("header_hidden");
    } else {
        // If it's lower, we're going up
        header.classList.remove("header_hidden");
    }
    
    // Update the position for the next comparison
    lastScrollY = window.scrollY;
});

// Language toggle
// Import the dictionary from the exclusive file.
import { translations } from './translations.js';

const langToggle = document.getElementById('lang_toggle');

// Function that applies the translations
function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = translations[lang][key];

        if (translation) {
            // If it's an input or textarea, translate the placeholder.
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translation;
            } else {
                // For the other elements translate the inner text
                el.textContent = translation;
            }
        }
    });

    // Changes the 'lang' attribute in HTML for SEO.
    document.documentElement.lang = lang;
}

// Initialization: checks storage or uses PT as default.
const savedLang = localStorage.getItem('language') || 'pt';
langToggle.checked = savedLang === 'en';
updateLanguage(savedLang);

// Listener for the language toggle
langToggle.addEventListener('change', () => {
    const newLang = langToggle.checked ? 'en' : 'pt';
    localStorage.setItem('language', newLang);
    
    // Updates static texts that use data-i18n.
    updateLanguage(newLang);
    
    // Forces updating of dashboard cards. This will cause the renderDashboard() function to read the new 'language' from localStorage.
    // and apply the correct currency symbol ($ or R$) immediately.
    renderDashboard();

    // If the delete modal is open, update it as well.
    renderDeleteList();
});

// Function to quickly retrieve the current translation in JS.
function getTranslation(key) {
    const lang = localStorage.getItem('language') || 'pt';
    return translations[lang][key] || key;
}

// Theme toggle
const themeInput = document.getElementById('theme_input');
const body = document.body;

// Get the saved theme
const savedTheme = localStorage.getItem('theme');

// Apply the theme and synchronize the checkbox.
if (savedTheme === 'dark') {
    body.classList.add('dark_theme');
    themeInput.checked = true; // Right button (moon)
} else {
    body.classList.remove('dark_theme');
    themeInput.checked = false; // Button to the left (sun)
}

// Listen to the changes
themeInput.addEventListener('change', () => {
    if (themeInput.checked) {
        body.classList.add('dark_theme');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark_theme');
        localStorage.setItem('theme', 'light');
    }
});

/* == == == Main == == == */
// New transaction form
const dateInput = document.getElementsByClassName('date_input')[0]; // Date input initialization

// Function to retrieve today's date in YYYY-MM-DD format.
function setTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months begin at 0
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    dateInput.value = formattedDate;
}

// Executes when page loads.
setTodayDate();

// Filter
const allDropdowns = document.querySelectorAll('.custom_dropdown');

allDropdowns.forEach(dropdown => {
    const header = dropdown.querySelector('.dropdown_header');
    const content = dropdown.querySelector('.dropdown_content');
    const checkAll = dropdown.querySelector('.check_all');
    const options = dropdown.querySelectorAll('.option_item');

    // Opens/Closes the clicked dropdown
    header.addEventListener('click', (e) => {
        // Opens/Closes the clicked dropdown
        allDropdowns.forEach(other => {
            if (other !== dropdown) {
                other.querySelector('.dropdown_content').classList.remove('show');
            }
        });
        
        content.classList.toggle('show');
        e.stopPropagation(); 
    });

    // Prevents closing when clicking inside the options.
    content.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Logic for "Select All" (specific to this dropdown)
    if (checkAll) {
        checkAll.addEventListener('change', function() {
            options.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
        });
    }

    // Uncheck "All" if an individual option is unchecked.
    options.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const allChecked = Array.from(options).every(opt => opt.checked);
            if (checkAll) checkAll.checked = allChecked;
        });
    });
});

// Close any dropdown menu if you click anywhere empty on the page.
window.addEventListener('click', () => {
    allDropdowns.forEach(dropdown => {
        dropdown.querySelector('.dropdown_content').classList.remove('show');
    });
});

// Dynamic filters
function updateFilters() {
    // Extract unique years, months, and days from transactions.
    const years = [...new Set(transactions.map(t => t.date.split('-')[0]))].sort().reverse();
    const months = [...new Set(transactions.map(t => t.date.split('-')[1]))].sort();
    const days = [...new Set(transactions.map(t => t.date.split('-')[2]))].sort();

    const monthNames = {
        "01": "Janeiro", "02": "Fevereiro", "03": "Março", "04": "Abril",
        "05": "Maio", "06": "Junho", "07": "Julho", "08": "Agosto",
        "09": "Setembro", "10": "Outubro", "11": "Novembro", "12": "Dezembro"
    };

    const renderOptions = (containerId, dataArray, isMonth = false) => {
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

    // Reassign the events to the new checkboxes.
    rebindCheckboxEvents();
}

function rebindCheckboxEvents() {
    allDropdowns.forEach(dropdown => {
        const checkAll = dropdown.querySelector('.check_all');
        const options = dropdown.querySelectorAll('.option_item');

        // Logic Select All
        if (checkAll) {
            // Remove old event to avoid duplication.
            checkAll.replaceWith(checkAll.cloneNode(true));
            const newCheckAll = dropdown.querySelector('.check_all');
            
            newCheckAll.addEventListener('change', function() {
                const currentOptions = dropdown.querySelectorAll('.option_item');
                currentOptions.forEach(checkbox => {
                    checkbox.checked = this.checked;
                });
                renderDashboard();
            });
        }

        // Individual logic
        options.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const currentOptions = dropdown.querySelectorAll('.option_item');
                const allChecked = Array.from(currentOptions).every(opt => opt.checked);
                const currentCheckAll = dropdown.querySelector('.check_all');
                if (currentCheckAll) currentCheckAll.checked = allChecked;

                renderDashboard();
            });
        });
    });
}

// Display of data
function renderDashboard() {
    const container = document.getElementById('dashboard_cards');
    if (!container) return;

    // Capturing active filters
    // Transforms checked checkboxes into lists (arrays) of simple values
    const selectedYears = Array.from(document.querySelectorAll('#year_options .option_item:checked')).map(el => el.value);
    const selectedMonths = Array.from(document.querySelectorAll('#month_options .option_item:checked')).map(el => el.value);
    const selectedDays = Array.from(document.querySelectorAll('#day_options .option_item:checked')).map(el => el.value);

    // Data filtering
    const filtered = transactions.filter(t => {
        // Divide the date 'YYYY-MM-DD' into parts for individual comparison
        const [y, m, d] = t.date.split('-');

        // Logic: If the filter is empty (length === 0), it ignores that criterion (returns true)
        // If any items are selected, check if the transaction value is in the list of selected items
        const matchYear = selectedYears.length === 0 || selectedYears.includes(y);
        const matchMonth = selectedMonths.length === 0 || selectedMonths.includes(m);
        const matchDay = selectedDays.length === 0 || selectedDays.includes(d);

        // The transaction will only go through if it meets all three criteria simultaneously.
        return matchYear && matchMonth && matchDay;
    });

    // Financial calculations
    // Soma total: Acumula o valor de cada transação filtrada
    const total = filtered.reduce((acc, t) => acc + t.amount, 0);

    // Extreme values: Math.max/min extract the largest/smallest number from the list generated by .map
    const highest = filtered.length ? Math.max(...filtered.map(t => t.amount)) : 0;
    const lowest = filtered.length ? Math.min(...filtered.map(t => t.amount)) : 0;
    
    // Daily Average:
    // They create a Set (list of unique values) with the dates to know over how many days expenses occurred
    const uniqueDays = [...new Set(filtered.map(t => t.date))].length;
    const dailyAvg = uniqueDays > 0 ? total / uniqueDays : 0;

    // Analysis by category (Logic of the last cards)
    const catMap = {};
    
    // Grouping: Creates an object where the key is the category name and the value is the total sum of its categories
    // Example: { "Health": 150.00, "Leisure": 80.00 }
    filtered.forEach(t => {
        catMap[t.category] = (catMap[t.category] || 0) + t.amount;
    });

    // Sorting: Transforms the object into an array of arrays and sorts it from highest cost to lowest cost
    // Ex: [ ["Health", 150], ["Leisure", 80] ]
    const sortedCats = Object.entries(catMap).sort((a, b) => b[1] - a[1]);
    
    // Get the category name (index [0] of the pair) of the first and last item in the sorted list.
    const catMost = sortedCats.length ? sortedCats[0][0] : "---";
    const catLeast = sortedCats.length ? sortedCats[sortedCats.length - 1][0] : "---";

    // Auxiliary function for creating HTML for cards
    const createCard = (title, value, iconClass, isCurrency = true) => {
        // Search for the saved language. If there isn't one, the default is 'pt'
        const currentLang = localStorage.getItem('language') || 'pt';
        
        // Define the symbol based on the current language
        const currencySymbol = currentLang === 'en' ? '$' : 'R$';

        const formattedValue = isCurrency 
            ? `${currencySymbol} ${value.toFixed(2)}`
            : value;

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

    // HTML injection into the container
    // We combined the creation of each of the 6 cards
    container.innerHTML = 
        createCard(getTranslation('total_title'), total, 'fa-wallet') +
        createCard(getTranslation('highest_title'), highest, 'fa-arrow-trend-up') +
        createCard(getTranslation('lowest_title'), lowest, 'fa-arrow-trend-down') +
        createCard(getTranslation('avg_title'), dailyAvg, 'fa-chart-line') +
        createCard(getTranslation('most_cat_title'), catMost, 'fa-tags', false) +
        createCard(getTranslation('least_cat_title'), catLeast, 'fa-tag', false);

    renderCharts(filtered);
}

// Analytic charts
let categoryChartInstance = null;
let evolutionChartInstance = null;

function renderCharts(filteredData) {
    const ctxCat = document.getElementById('categoryChart').getContext('2d');
    const ctxEvo = document.getElementById('evolutionChart').getContext('2d');
    const currentLang = localStorage.getItem('language') || 'pt';

    if (categoryChartInstance) categoryChartInstance.destroy();
    if (evolutionChartInstance) evolutionChartInstance.destroy();

    // Category Data
    const catData = {};
    filteredData.forEach(t => {
        // If the categories in JS are in a dictionary key, translate them here.
        const translatedCat = getTranslation(t.category); 
        catData[translatedCat] = (catData[translatedCat] || 0) + t.amount;
    });

    // Evolution Data (Time)
    const timeData = {};
    // Sort dates
    const sortedData = [...filteredData].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    sortedData.forEach(t => {
        // Format the date to something more language-friendly.
        const dateObj = new Date(t.date + 'T00:00:00');
        const formattedDate = dateObj.toLocaleDateString(currentLang === 'en' ? 'en-US' : 'pt-BR', {
            day: '2-digit',
            month: 'short'
        });
        
        timeData[formattedDate] = (timeData[formattedDate] || 0) + t.amount;
    });

    // Category Chart
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

    // Evolution Chart
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

/* == == == Data Logic == == == */
let transactions = JSON.parse(localStorage.getItem('transactions_data')) || [];

// Initial call: Ensures that filters appear when the page loads.
updateFilters();
renderDashboard();

const transactionForm = document.getElementById('transaction_form');

transactionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const category = document.getElementById('cat_input').value;
    const amount = document.getElementById('val_input').value;
    const date = document.getElementById('date_input').value;

    if (parseFloat(amount) <= 0) {
        showToast(getTranslation('msg_error_value'), "error");
        return;
    }

    const newTransaction = {
        category: category,
        amount: parseFloat(amount),
        date: date
    };

    transactions.push(newTransaction);
    localStorage.setItem('transactions_data', JSON.stringify(transactions));

    showToast(getTranslation('msg_success'), "success");
    
    transactionForm.reset();
    setTodayDate();
    
    // Update the filters after entering a new expense
    updateFilters();
    renderDashboard();
});

/* == == == Delete Modal == == == */
const deleteBtn = document.querySelector('.noselect');
const modal = document.getElementById('delete_modal');
const closeModal = document.getElementById('close_modal');
const listContainer = document.getElementById('transactions_list_container');

// Open Modal
deleteBtn.addEventListener('click', () => {
    renderDeleteList();
    modal.style.display = 'flex';
});

// Close Modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close by clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});

// Function to list transactions within the Modal.
function renderDeleteList() {
    listContainer.innerHTML = '';
    
    if (transactions.length === 0) {
        const noTrans = getTranslation('no_transactions_found'); 
        listContainer.innerHTML = `<p style="text-align:center; padding:20px;">${noTrans}</p>`;
        return;
    }

    // Identify the language to set the currency.
    const currentLang = localStorage.getItem('language') || 'pt';
    const currencySymbol = currentLang === 'pt' ? 'R$' : '$';
    const deleteLabel = getTranslation('delete_label'); 

    transactions.forEach((t, index) => {
        const item = document.createElement('div');
        item.className = 'transaction_item';
        item.innerHTML = `
            <div class="trans_info">
                <strong>${t.category}</strong>
                <span>${t.date}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 15px;">
                <span class="trans_amount">${currencySymbol} ${t.amount.toFixed(2)}</span>
                
                <button class="delete_btn" data-label="${deleteLabel}" onclick="deleteTransaction(${index})">
                    <svg viewBox="0 0 448 512" class="svgIcon">
                        <path
                            d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z">
                        </path>
                    </svg>
                </button>
            </div>
        `;
        listContainer.appendChild(item);
    });
}

// Function to delete a specific item.
window.deleteTransaction = function(index) {
    transactions.splice(index, 1); // Remove from array
    localStorage.setItem('transactions_data', JSON.stringify(transactions)); // Save
    
    showToast(getTranslation('msg_removed'), "success");
    renderDeleteList(); // Update the modal list.
    updateFilters();    // Update the filters on the main page.
    renderDashboard();
};