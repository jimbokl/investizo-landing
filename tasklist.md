# Investizo Landing Page

## Основной функционал

### 1. Лендинг страница (index.html)
- Отображение информации о PropTrading продукте
- Отслеживание кликов по кнопкам
- Передача UTM-меток в Telegram мини-приложение
- Поддержка многоязычности (локализация)

### 2. Отслеживание конверсии и UTM
- Сохранение UTM-меток в localStorage при загрузке страницы
- Сохранение информации о реферере при отсутствии UTM-меток
- Логирование каждого клика в облачное хранилище (Cloudflare KV)
- Отправка событий в Google Analytics

### 3. Редиректы
- Редирект с коротких ссылок `/r/<code>` на Telegram бот
- Перенаправление после клика на кнопки основной страницы

## Важные ссылки и URL

### Telegram мини-приложение
```
https://t.me/InvestizoAppBot?start=pid-779350_<code>
```

### Короткие ссылки (редиректы)
```
/r/<code> -> https://t.me/InvestizoAppBot?start=pid-779350_<code>
```

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

## Развертывание

1. Настройка Cloudflare KV namespace:
   ```
   npm i -g wrangler
   ```
   
2. В Cloudflare создать KV namespace и скопировать ID

3. Заполнить ID в wrangler.toml:
   ```toml
   name = "investizo-landing"
   compatibility_date = "2024-06-03"

   [env.production]
   kv_namespaces = [
     { binding = "CLICKS", id = "f9da548450e34d97a4dede757fdc3a34" }
   ]
   ```

4. Деплой через Git:
   ```
   git push
   ```
   Pages автоматически соберет и опубликует проект.

## Структура кода

### index.html
- HTML разметка лендинга
- JavaScript для обработки UTM-меток
- JavaScript для логирования кликов и перенаправления
- Обработчики мобильного меню и FAQ аккордеона

### functions/api/clk.js
- Принимает запросы с параметрами
- Логирует клик в Cloudflare KV
- Возвращает статус 204

### functions/r/[code].js
- Обрабатывает короткие ссылки
- Логирует редирект в Cloudflare KV
- Перенаправляет на Telegram бот

### Локализация
- `locales/ru.js` - Русская локализация
- `locales/en.js` - Английская локализация