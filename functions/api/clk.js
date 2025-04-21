// GET /api/clk?c=<code>
// Пишет событие «клик на кнопку» в KV и возвращает 204

export const onRequestGet = async ({ request, env, waitUntil }) => {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('c') || 'web';
  
    waitUntil(
      env.CLICKS.put(
        Date.now() + "_" + crypto.randomUUID(),
        JSON.stringify({
          ts: Date.now(),
          code,
          ua: request.headers.get("User-Agent")
        })
      )
    );
  
    return new Response(null, {
      status: 204,
      headers: { "Access-Control-Allow-Origin": "*" }
    });
  };