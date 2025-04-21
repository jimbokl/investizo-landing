// GET /api/clk?c=<code>&utm_source=<source>&utm_medium=<medium>...
// Пишет событие «клик на кнопку» в KV и возвращает 204

export const onRequestGet = async ({ request, env, waitUntil }) => {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('c') || 'web';
  
    // Собираем UTM-метки
    const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    const utmData = {};
    
    UTM_KEYS.forEach(k => {
      const val = searchParams.get(k);
      if (val) utmData[k] = val;
    });
  
    waitUntil(
      env.CLICKS.put(
        Date.now() + "_" + crypto.randomUUID(),
        JSON.stringify({
          ts: Date.now(),
          code,
          utm: utmData,
          ua: request.headers.get("User-Agent")
        })
      )
    );
  
    return new Response(null, {
      status: 204,
      headers: { "Access-Control-Allow-Origin": "*" }
    });
  };