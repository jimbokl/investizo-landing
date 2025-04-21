Ниже приведён «минимальный рабочий» сценарий, который решает сразу две задачи:
1) фиксирует, откуда человек пришёл на landing (UTM‑метки или referrer) и отправляет эти данные в систему аналитики;
2) передаёт те же данные дальше — в start‑параметр Telegram‑мини‑приложения, чтобы вы могли увидеть источник трафика уже внутри Web‑App или на своей backend‑стороне.

Инструменты
• любая страничная аналитика (GA 4, Яндекс Метрика, Mixpanel, PostHog и т. д.);
• Cloudflare Pages + нативный скрипт (или Zaraz/GTM, если удобнее).

Шаг 1. Подключаем аналитику к лендингу
(пример для GA 4, в Метрике будет аналогично)

html Скопировать Закрыть блок
<!-- Head вашего лендинга -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXX', { send_page_view: true });
</script>
Шаг 2. Сохраняем UTM‑метки / referrer в localStorage
(делаем это один раз при загрузке страницы)

html Скопировать Закрыть блок
<script>
(function() {
  const SEARCH = new URLSearchParams(location.search);
  const UTM_KEYS = [
    'utm_source', 'utm_medium', 'utm_campaign',
    'utm_content', 'utm_term'
  ];

  // 1. если пришли с метками – кладём в localStorage
  UTM_KEYS.forEach(k => {
    const v = SEARCH.get(k);
    if (v) localStorage.setItem(k, v);
  });

  // 2. если меток нет – пытаемся запомнить referrer
  if (!localStorage.getItem('utm_source') && document.referrer) {
    try {
      const url = new URL(document.referrer);
      localStorage.setItem('utm_source', url.hostname);
      localStorage.setItem('utm_medium', 'referral');
    } catch(e) {}
  }
})();
</script>
Шаг 3. Формируем ссылку на мини‑приложение «на лету»
(подставляем UTM‑сведения, шифруем в base64 и прикручиваем обработчик клика, чтобы отправить событие в аналитику)

html Скопировать Закрыть блок
<!-- Кнопка перехода -->
<a id="tg-btn" class="btn" href="#">Запустить в Telegram</a>

<script>
(function() {
  const BTN = document.getElementById('tg-btn');
  if (!BTN) return;

  BTN.addEventListener('click', () => {
    // Собираем все хранимые ключи
    const UTM_KEYS = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'];
    const pairs = [];

    UTM_KEYS.forEach(k => {
      const val = localStorage.getItem(k);
      if (val) pairs.push(`${k}=${encodeURIComponent(val)}`);
    });

    // Добавляем вашу рефку (обязательно!)
    pairs.unshift('ref=MY_REF_CODE');

    // Кодируем payload в base64, Telegram допускает до 64 символов
    const payload = btoa(pairs.join('&')).substring(0, 64);

    // Формируем итоговую ссылку
    const TG_URL = `https://t.me/YourBot/AppName?startapp=${payload}`;
    BTN.href = TG_URL;

    // Отправляем ивент в GA или другую систему
    gtag('event', 'tg_miniapp_click', {
      event_category: 'engagement',
      event_label: pairs.join('&')
    });
  });
})();
</script>
Что произойдёт:
• Человек кликает на кнопку → в GA/Метрике фиксируется событие tg_miniapp_click с метками.
• Он переходит в URL вида
  https://t.me/YourBot/AppName?startapp=...
• Внутри мини‑приложения вы читаете параметр:

javascript Скопировать Закрыть блок
const tg = window.Telegram.WebApp; 
const payloadB64 = tg.initDataUnsafe.start_param;       // ref=...&utm_...
const payload = atob(payloadB64 || '');
const params = new URLSearchParams(payload);
// пример: params.get('utm_source') -> "facebook"
Шаг 4. Храним источник уже внутри вашего сервера/аналитики мини‑приложения
Если мини‑app имеет собственный backend, достаточно один раз отправить данные при первом открытии (userId + utm_*), и вы сможете строить сквозную аналитику «клик → регистрация/действие».

Варианты без кода
Если писать JavaScript не хочется, используйте:
• Cloudflare Zaraz — там настраивается «снять UTM» + «событие при клике» кликом мыши;
• Tally/Plausible — аналогично.

На что обратить внимание

Параметр startapp у Telegram ограничен 64 символами (после base64). Если UTM‑меток много/длинные, урезайте их (или храните в базе ключ hash → полный набор UTM).
Если применяете сквозную аналитику, синхронизируйте user_id GA/Метки с Telegram‑user‑id.
Проверяйте, что Cloudflare Pages не кэширует вашу страницу так, что для всех отдаётся одна и та же сформированная href; поэтому делаем подстановку через JS на стороне клиента.
В результате:
• Видите, из какого источника пришёл пользователь в Google Analytics/Метрике на кнопке.
• Получаете те же UTM‑данные внутри Telegram‑WebApp и можете связать клик → действие (регистрация, сделка и т. д.).