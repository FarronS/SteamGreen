class SteamPlayerApp {
    constructor() {
        this.apiBaseUrl = 'https://localhost:7267'; 
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

    // init() {
    //     document.getElementById('searchForm').addEventListener('submit', (e) => {
    //         e.preventDefault();
    //         this.searchPlayer();
    //     });
    // }

   

   
}


document.addEventListener('DOMContentLoaded', () => {
    new SteamPlayerApp();
});



class NewsForApp{

    parseGameNews(data) {
    console.log('Парсинг данных:', data);
    
    // Если ответ содержит поле response
    if (data.response && data.response.games) {
        return data.response.game[0];
    }
    
    // Если данные напрямую в массиве players
    if (data.games && Array.isArray(data.games)) {
        return data.game[0];
    }
    
    // Если это массив игроков
    if (Array.isArray(data) && data.length > 0) {
        return data[0];
    }
    
    // Если это одиночный объект игрока
    if (data.gameId) {
        return data;
    }
    
    return null;
}

//  init() {
//         document.getElementById('searchForm').addEventListener('submit', (e) => {
//             e.preventDefault();
//             this.searchGame();
//         });
//     }

    async searchGame() {
        const gameId = document.getElementById('gameId').value.trim();
        const resultDiv = document.getElementById('result');
        
        // Валидация
        if (!this.validategameId(gameId)) {
            this.showError('Пожалуйста, введите корректный GameID');
            return;
        }

        this.setLoading(true);

        try {
            debugger;
            const response = await fetch(`${this.apiBaseUrl}/Steam/Newscity?gameId=${gameId}`);
            
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

    validateSteamId(gameId) {
        return /^\d{17}$/.test(gameId);
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
            searchText.textContent = 'Найти игру';
            searchSpinner.classList.add('d-none');
            searchButton.disabled = false;
        }
    }

    displayResult(news) {
    const resultDiv = document.getElementById('result');
    
     console.log('Raw data:', news);

      const game = this.parseGameData(news);
    
    // Универсальная проверка на пустые данные
    if (!game) {
        this.showError('Игра не найдена или неверная структура данных');
        console.log('Game data is null or undefined');
        return;
    }
     this.renderGameCard(game);
}

renderPlayerCard(game) {
    const resultDiv = document.getElementById('result');
    
    resultDiv.innerHTML = `
        <div class="card shadow">
            <div class="card-header bg-primary text-white">
                <h4 class="mb-0">Новости игры</h4>
            </div>
            <div class="card-body">
                <div class="row">
                    <!-- Аватар -->
                    <div class="col-md-3 text-center">
                        <img src="${game.avatarfull || game.avatar || 'https://via.placeholder.com/184x184?text=No+Image'}" 
                             alt="Аватар" 
                             class="img-fluid rounded mb-3"
                             onerror="this.src='https://via.placeholder.com/184x184?text=No+Image'">
                    </div>
                    
                    <!-- Информация -->
                    <div class="col-md-9">
                        <div class="row">
                            <div class="col-6">
                                <strong>GameID:</strong>
                                <p class="text-break">${game.gameId}</p>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    new SteamNewsForApp();
});

}
}

function fillElementById(elementId, setFunc){
    const element = document.getElementById('elementId');
    if(element){
        setFunc(element);
    }else{
        console.log(`${elementId} not found`);
    }
}


const apiBaseUrl = 'https://localhost:7267';

function onLoad() {
    debugger;
    alert('Я загружен')
    document.getElementById('searchPlayer').onclick =  async () => {
        await searchPlayer();
        alert('Нажми меня'); 
    };
};

async function searchPlayer()  {
    debugger;
    const steamId = document.getElementById('steamId').value.trim();

    // Валидация
    if (!_validateSteamId(steamId)) {
        _showError('Пожалуйста, введите корректный SteamID (17 цифр)');
        return;
    }
    _setLoading(true);
    try {
        debugger;
        const response = await fetch(`${apiBaseUrl}/Steam/PlayerData?playerId=${steamId}`);
        
        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status}`);
        }
        console.log(response);
        const data = await response.json();
        /*_displayResult(data);*/
        const player = data?.response?.players.length > 0 ? data?.response?.players[0] : undefined;

        if(!player){
            console.log('player is undefined');
            return;
        }
        fillElementById('cardBodyAvatarId', (element) => {
            element.setAttribute('src', player.avatarfull || player.avatar || 'https://via.placeholder.com/184x184?text=No+Image');
        });

        fillElementById('cardBodyRealNameId', (element) => {
            element.innerText  = player.personaname || player.personename || 'Не указано';
        });
        fillElementById('cardBodySteamId', (element) => {
            element.innerText = player.steamid
        });
         fillElementById('cardBodyPersonaState', (element) => {
            element.innerText = _getPersonaStateText(player.personastate)
        });
         fillElementById('cardBodyPersonaState', (element) => {
            element.innerText = player.loccountrycode || player.countrycode || 'Не указана'
        });  
         fillElementById('cardBodyPersonaState', (element) => {
            element.innerText = player.profilestate === 1 ? 'Настроен' : 'Не настроен'
        });

        const cardBodyProfileUrl = document.getElementById('cardBodyProfileUrlId');
        if (player.profileurl && cardBodyProfileUrl) {
            cardBodyProfileUrl.remove('display-none');
            const a = cardBodyProfileUrl.getElementsByTagName('a');
            if(a && a.length > 0){
                a[0].setAttribute('href', player.profileurl);
            }
        }
        else{
            cardBodyProfileUrl.add('display-none');
        }
        

        
    } catch (error) {
        console.error('Error:', error);
        _showError(`Не удалось получить данные: ${error.message}`);
    } finally {
        _setLoading(false);
    }
}

function _validateSteamId(steamId) {
    return /^\d{17}$/.test(steamId);
}

 function _showError(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Ошибка!</strong> ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>`;
}


function _setLoading(isLoading) {
    const searchText = document.getElementById('searchText');
    const searchSpinner = document.getElementById('searchSpinner');
    const searchButton = document.getElementById('searchPlayer');
    
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


function _displayResult(data) {
    console.log('Raw data:', data);
    const player = data?.response?.players.length > 0 ? data?.response?.players[0] : undefined;
    // Универсальная проверка на пустые данные
    if (!player) {
        _showError('Игрок не найден или неверная структура данных');
        console.log('Player data is null or undefined');
        return;
    }
    _renderPlayerCard(player);
}

function _renderPlayerCard(player) {
    const resultDiv = document.getElementById('result');
    debugger;

   
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
                        ${player.realname ? `
                        <p class="text-muted">${player.realname}</p>` : ''}
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
                                <p>${_getPersonaStateText(player.personastate)}</p>
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

function  _getPersonaStateText(state) {
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

function _formatTimestamp(timestamp) {
    return new Date(timestamp * 1000).toLocaleDateString('ru-RU');
}


