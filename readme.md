Investizo Landing + Cloudflare Pages
====================================

- фиксируем клики `/api/clk`
- короткие ссылки `/r/<code>`
- каждый переход ведёт на https://t.me/InvestizoAppBot?start=pid-779350_<code>

Развёртывание
-------------
1. `npm i -g wrangler`
2. Cloudflare → KV → Create namespace → скопировать ID
3. заменить `TO_BE_FILLED` в wrangler.toml
4. `git push` — Pages соберёт и задеплоит.