class SteamPlayerApp {
    constructor() {
        this.apiBaseUrl = 'https://localhost:7267'; // Ваш backend URL
        this.init();
    }
    
    parsePlayerData(data) {
    console.log('Парсинг данных:', data);
    
    // Если ответ содержит поле response
    if (data.response && data.response.players) {
        return data.response.players[0];
    }
    
    // Если данные напрямую в массиве players
    if (data.players && Array.isArray(data.players)) {
        return data.players[0];
    }
    
    // Если это массив игроков
    if (Array.isArray(data) && data.length > 0) {
        return data[0];
    }
    
    // Если это одиночный объект игрока
    if (data.steamid) {
        return data;
    }
    
    return null;
}

    init() {
        document.getElementById('searchForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.searchPlayer();
        });
    }

    async searchPlayer() {
        const steamId = document.getElementById('steamId').value.trim();
        const resultDiv = document.getElementById('result');
        
        // Валидация
        if (!this.validateSteamId(steamId)) {
            this.showError('Пожалуйста, введите корректный SteamID (17 цифр)');
            return;
        }

        this.setLoading(true);

        try {
            debugger;
            const response = await fetch(`${this.apiBaseUrl}/Steam/PlayerData?playerId=${steamId}`);
            
            if (!response.ok) {
                throw new Error(`Ошибка сервера: ${response.status}`);
            }

            const data = await response.json();
            this.displayResult(data);
            
        } catch (error) {
            console.error('Error:', error);
            this.showError(`Не удалось получить данные: ${error.message}`);
        } finally {
            this.setLoading(false);
        }
    }

    validateSteamId(steamId) {
        return /^\d{17}$/.test(steamId);
    }

    setLoading(isLoading) {
        const searchText = document.getElementById('searchText');
        const searchSpinner = document.getElementById('searchSpinner');
        const searchButton = document.querySelector('#searchForm button');
        
        if (isLoading) {
            searchText.textContent = 'Поиск...';
            searchSpinner.classList.remove('d-none');
            searchButton.disabled = true;
        } else {
            searchText.textContent = 'Найти игрока';
            searchSpinner.classList.add('d-none');
            searchButton.disabled = false;
        }
    }

displayResult(data) {
    const resultDiv = document.getElementById('result');
    
     console.log('Raw data:', data);

      const player = this.parsePlayerData(data);
    
    // Универсальная проверка на пустые данные
    if (!player) {
        this.showError('Игрок не найден или неверная структура данных');
        console.log('Player data is null or undefined');
        return;
    }
     this.renderPlayerCard(player);
}

// Новый метод для отображения карточки
renderPlayerCard(player) {
    const resultDiv = document.getElementById('result');
    
    resultDiv.innerHTML = `
        <div class="card shadow">
            <div class="card-header bg-primary text-white">
                <h4 class="mb-0">Информация об игроке</h4>
            </div>
            <div class="card-body">
                <div class="row">
                    <!-- Аватар -->
                    <div class="col-md-3 text-center">
                        <img src="${player.avatarfull || player.avatar || 'https://via.placeholder.com/184x184?text=No+Image'}" 
                             alt="Аватар" 
                             class="img-fluid rounded mb-3"
                             onerror="this.src='https://via.placeholder.com/184x184?text=No+Image'">
                        <h5>${player.personaname || player.personename || 'Не указано'}</h5>
                        ${player.realname ? `<p class="text-muted">${player.realname}</p>` : ''}
                    </div>
                    
                    <!-- Информация -->
                    <div class="col-md-9">
                        <div class="row">
                            <div class="col-6">
                                <strong>SteamID:</strong>
                                <p class="text-break">${player.steamid}</p>
                            </div>
                            <div class="col-6">
                                <strong>Статус:</strong>
                                <p>${this.getPersonaStateText(player.personastate)}</p>
                            </div>
                            <div class="col-6">
                                <strong>Страна:</strong>
                                <p>${player.loccountrycode || player.countrycode || 'Не указана'}</p>
                            </div>
                            <div class="col-6">
                                <strong>Профиль:</strong>
                                <p>${player.profilestate === 1 ? 'Настроен' : 'Не настроен'}</p>
                            </div>
                        </div>
                        
                        ${player.profileurl ? `
                            <div class="mt-3">
                                <a href="${player.profileurl}" target="_blank" class="btn btn-outline-primary">
                                    Открыть профиль Steam
                                </a>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
}

    getPersonaStateText(state) {
        const states = {
            0: 'Оффлайн',
            1: 'Онлайн',
            2: 'Занят',
            3: 'Нет на месте',
            4: 'Спит',
            5: 'В торговле',
            6: 'Хочет поиграть'
        };
        return states[state] || 'Неизвестно';
    }

    formatTimestamp(timestamp) {
        return new Date(timestamp * 1000).toLocaleDateString('ru-RU');
    }

    showError(message) {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Ошибка!</strong> ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
    }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    new SteamPlayerApp();
});