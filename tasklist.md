# Investizo Landing Page

## Основной функционал

### 1. Лендинг страница (index.html)
- [x] Отображение информации о PropTrading продукте
- [x] Отслеживание кликов по кнопкам
- [x] Передача UTM-меток в Telegram мини-приложение
- [x] Поддержка многоязычности (локализация)
- [x] Унифицированный дизайн карточек во всех разделах
- [x] FAQ секция с интерактивным аккордеоном

### 2. Отслеживание конверсии и UTM
- [x] Сохранение UTM-меток в localStorage при загрузке страницы
- [x] Сохранение информации о реферере при отсутствии UTM-меток
- [x] Логирование каждого клика в облачное хранилище (Cloudflare KV)
- [x] Отправка событий в Google Analytics

### 3. Редиректы
- [x] Редирект с коротких ссылок `/r/<code>` на Telegram бот
- [x] Перенаправление после клика на кнопки основной страницы

## Важные ссылки и URL

### Telegram мини-приложение
```
https://t.me/InvestizoAppBot?start=pid-779350_<code>
```

### Веб-версия приложения
```
https://web.telegram.org/k/#@InvestizoAppBot?start=pid-779350_web
```

### Короткие ссылки (редиректы)
```
/r/<code> -> https://t.me/InvestizoAppBot?start=pid-779350_<code>
```

## Функционирование кнопок

### Глобальная функция logClick
```javascript
// Глобальная функция для обработки кликов на кнопки
window.logClick = function(type = 'default') {
    // Получаем код из URL, если он есть, иначе используем 'web'
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('c') || 'web';
    
    // Собираем UTM-метки для добавления в payload
    const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    const utmData = {};
    
    UTM_KEYS.forEach(k => {
        const val = localStorage.getItem(k);
        if (val) utmData[k] = val;
    });
    
    // Отправляем событие в Google Analytics
    if (window.gtag) {
        gtag('event', 'prop_trading_click', {
            event_category: 'engagement',
            event_label: type,
            custom_data: JSON.stringify(utmData)
        });
    }
    
    // Формируем расширенный payload с UTM-данными
    let utmString = '';
    if (Object.keys(utmData).length > 0) {
        utmString = '_' + btoa(JSON.stringify(utmData)).substring(0, 32);
    }
    
    // Отправляем запрос на /api/clk для логирования клика
    fetch(`/api/clk?c=${code}_${type}${Object.keys(utmData).map(k => `&${k}=${encodeURIComponent(utmData[k])}`).join('')}`)
        .then(() => {
            // Редирект на Telegram
            const payload = `pid-779350_${code}_${type}${utmString}`;
            redirectToTelegram(payload);
        })
        .catch(error => {
            console.error("Error logging click", error);
            // Редирект при ошибке
            const payload = `pid-779350_${code}_${type}${utmString}`;
            redirectToTelegram(payload);
        });
        
    // Функция редиректа в зависимости от устройства
    function redirectToTelegram(payload) {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        if (isMobile) {
            // На мобильных используем tg:// протокол
            window.location.href = `tg://resolve?domain=InvestizoAppBot&startapp=${payload}`;
        } else {
            // На десктопе используем стандартный url
            window.location.href = `https://t.me/InvestizoAppBot?start=${payload}`;
        }
    }
}
```

### Виды кнопок и их тип клика
1. **Header**: `onclick="logClick('header')"` - Кнопка "Start" в шапке сайта
2. **Hero**: `onclick="logClick('hero')"` - Главная CTA кнопка в первом экране
3. **Testimonials**: `onclick="logClick('testimonials')"` - Кнопка после отзывов трейдеров
4. **Steps**: `onclick="logClick('steps')"` - Кнопка после секции "Как начать" (3 шага)
5. **Telegram**: `onclick="logClick('telegram')"` - Кнопка в секции с QR-кодом и ботом
6. **Final**: `onclick="logClick('final')"` - Кнопка в финальном CTA внизу страницы
7. **Sticky**: `onclick="logClick('sticky')"` - Фиксированная кнопка снизу на мобильных
8. **Popup**: `onclick="logClick('popup')"` - Кнопка в всплывающем окне лид-магнита

### Механизм работы кнопок
1. **Клик пользователя** → вызов `logClick(type)` с соответствующим типом
2. **Сбор данных**:
   - Код страницы из URL параметра `c` или 'web' по умолчанию
   - UTM-метки из localStorage
3. **Аналитика**: отправка события в Google Analytics
4. **Логирование**: запрос к API `/api/clk` для сохранения в Cloudflare KV
5. **Формирование payload**: `pid-779350_${code}_${type}_${utmBase64}`
6. **Адаптивный редирект**:
   - На мобильных: `tg://resolve?domain=InvestizoAppBot&startapp=...`
   - На десктопе: `https://t.me/InvestizoAppBot?start=...`

### Особенности реализации
- [x] Функция определена как глобальная (`window.logClick`) для доступа из атрибутов `onclick`
- [x] Корректная работа на мобильных устройствах через deep linking (tg:// протокол)
- [x] Обработка ошибок при логировании кликов с исполнением редиректа в любом случае
- [x] Проверка на наличие Google Analytics перед отправкой событий
- [x] Лимит длины UTM-данных (до 32 символов в base64) для совместимости с Telegram
- [x] Все типы кликов сохраняются в логах для последующего анализа конверсии

## Обработка UTM-меток

### Сохранение UTM
```javascript
// Поддерживаемые UTM-метки
const UTM_KEYS = [
  'utm_source', 'utm_medium', 'utm_campaign',
  'utm_content', 'utm_term'
];

// 1. Сохранение UTM из URL в localStorage
UTM_KEYS.forEach(k => {
  const v = SEARCH.get(k);
  if (v) localStorage.setItem(k, v);
});

// 2. Сохранение реферера при отсутствии UTM
if (!localStorage.getItem('utm_source') && document.referrer) {
  try {
    const url = new URL(document.referrer);
    localStorage.setItem('utm_source', url.hostname);
    localStorage.setItem('utm_medium', 'referral');
  } catch(e) {}
}
```

### Формирование payload для Telegram
```javascript
// В функции logClick()
// 1. Сбор сохраненных UTM меток
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
const utmData = {};

UTM_KEYS.forEach(k => {
  const val = localStorage.getItem(k);
  if (val) utmData[k] = val;
});

// 2. Формирование расширенного payload с UTM-данными
let utmString = '';
if (Object.keys(utmData).length > 0) {
  utmString = '_' + btoa(JSON.stringify(utmData)).substring(0, 32);
}

// 3. Формирование финального payload для Telegram
const payload = `pid-779350_${code}_${type}${utmString}`;
```

### Механизм логирования кликов
1. Кнопки на сайте вызывают функцию `logClick(type)` с типом клика
2. Функция отправляет данные на `/api/clk` с параметрами:
   - `c` - код страницы из URL или 'web' по умолчанию
   - UTM-метки из localStorage
3. Функция `/api/clk.js` сохраняет информацию в Cloudflare KV
4. После логирования происходит редирект на Telegram бот с payload

## Дизайн и верстка

### Унифицированный дизайн разделов
- [x] Все ключевые разделы используют единый стиль карточек:
  - "Success Stories of Our Traders"
  - "How to Start"
  - "Connect with Us on Telegram" 
- [x] Карточки имеют следующую структуру:
  - Круглая иконка/инициалы вверху (`.initials`)
  - Заголовок (`.name`)
  - Подзаголовок (`.role`)
  - Основной текст (`.quote`)
  - Дополнительная информация (`.key-metrics` или другие элементы)

### Особенности верстки секций
- [x] Telegram секция: Центрированный QR-код, выровненный по центру текст
- [x] FAQ секция: Интерактивный аккордеон с 4 вопросами и ответами
- [x] Все ссылки содержат параметры для корректного открытия бота
- [x] Всем элементам добавлены классы для соответствия общему стилю

### Адаптивность
- [x] Верстка адаптирована для мобильных устройств и планшетов
- [x] Карточки в мобильной версии занимают 100% ширины
- [x] При размере экрана 576-992px карточки занимают 50% ширины

## Локализация

### Файлы локализации
- [x] `locales/ru.js` - Русская локализация
- [x] `locales/en.js` - Английская локализация 
- [x] `locales/fa.js` - Персидская локализация
- [x] Все текстовые поля хранятся отдельно от HTML в файлах локализации
- [x] Структура файлов локализации соответствует структуре элементов на странице
- [x] Для каждой секции сайта создан отдельный объект с локализуемыми строками

### Механизм многоязычности
- [x] Текстовые константы подключаются динамически в зависимости от выбранного языка
- [x] Переключение между языками (английский, фарси, русский) с сохранением предпочтений в localStorage
- [x] RTL-поддержка для персидского языка (направление текста справа налево)
- [x] Загрузка языковых модулей по умолчанию при старте страницы

## Развертывание

1. [x] Настройка Cloudflare KV namespace:
   ```
   npm i -g wrangler
   ```
   
2. [x] В Cloudflare создан KV namespace и скопирован ID

3. [x] Заполнен ID в wrangler.toml:
   ```toml
   name = "investizo-landing"
   compatibility_date = "2024-06-03"

   [env.production]
   kv_namespaces = [
     { binding = "CLICKS", id = "f9da548450e34d97a4dede757fdc3a34" }
   ]
   ```

4. [x] Деплой через Git:
   ```
   git push
   ```
   Pages автоматически соберет и опубликует проект.

## Структура кода

### index.html
- [x] HTML разметка лендинга
- [x] JavaScript для обработки UTM-меток
- [x] JavaScript для логирования кликов и перенаправления
- [x] Обработчики мобильного меню и FAQ аккордеона
- [x] Модульный скрипт для управления локализацией

### functions/api/clk.js
- [x] Принимает запросы с параметрами
- [x] Логирует клик в Cloudflare KV
- [x] Возвращает статус 204

### functions/r/[code].js
- [x] Обрабатывает короткие ссылки
- [x] Логирует редирект в Cloudflare KV
- [x] Перенаправляет на Telegram бот

## Выполненные улучшения (21.04.2025)

- [x] Исправление механизма переключения языков (замена динамического импорта статическим)
- [x] Синхронизация структуры локализационных файлов для всех языков
- [x] Добавление всех недостающих полей в EN и RU локализации
- [x] Улучшение логирования загрузки языковых файлов для отладки
- [x] Кэширование языковых файлов для быстрой работы переключателя
- [x] Восстановление отсутствующей FAQ секции
- [x] Добавление переводов для FAQ вопросов и ответов на трех языках
- [x] Интеграция аккордеона с системой локализации
- [x] Исправление работы кнопок (вынос функции logClick в глобальную область видимости)
- [x] Улучшение обработки ошибок при логировании кликов и редиректе
- [x] Исправлен перевод подзаголовков в секции "How to Start" для персидского языка
- [x] Добавлен перевод подзаголовков "Initial Evaluation", "Proving Consistency" и "Funded Account" на русский язык
- [x] Улучшена система применения переводов к ролевым элементам в карточках шагов

## Задачи на будущее

- [ ] A/B тестирование разных вариантов призывов к действию
- [ ] Добавление support формы для обратной связи
- [ ] Улучшение SEO оптимизации (мета-теги, микроразметка для FAQ)
- [ ] Оптимизация загрузки изображений (lazy loading для QR-кодов)
- [ ] Добавление статистической панели для анализа конверсии
- [ ] Интеграция с другими мессенджерами (WhatsApp, WeChat)