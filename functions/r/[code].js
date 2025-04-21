// GET /r/<code>
// Логирует редирект и отправляет пользователя в Telegram‑бот
// с payload = pid-779350_<code>

export const onRequestGet = async ({ params, env, waitUntil }) => {
    const code = params.code || 'web';
  
    waitUntil(
      env.CLICKS.put(
        Date.now() + "_" + crypto.randomUUID(),
        JSON.stringify({ ts: Date.now(), code })
      )
    );
  
    const payload = code ? `pid-779350_${code}` : 'pid-779350';
    return Response.redirect(
      `https://t.me/InvestizoAppBot?start=${payload}`,
      302
    );
  };