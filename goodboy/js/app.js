(() => {
  const G = window.GB, $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const fmt = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' MT';
  const byId = id => G.products.find(p => p.id === id);
  const base = () => G.site || location.href.split('#')[0];
  const wl = 'https://wa.me/' + G.wa;
  $('#fw').href = wl;

  /* ---------- Estado do carrinho (guardado no navegador) ---------- */
  let cart = [], pay = '';
  try { cart = JSON.parse(localStorage.getItem('gb-cart') || '[]').filter(i => byId(i.id)); } catch (e) {}
  const save = () => { try { localStorage.setItem('gb-cart', JSON.stringify(cart)); } catch (e) {} };
  const total = () => cart.reduce((s, i) => s + byId(i.id).p * i.q, 0);

  /* ---------- Banner: modelos em rotação; o fundo do banner assume a cor da foto ---------- */
  const hero = $('#hero'), st = $('#stage'), cap = $('#cap');
  st.innerHTML = G.slides.map((s, i) => `<figure class="sl${i ? '' : ' on'}"><img src="${s.img}" alt="${s.alt}"></figure>`).join('');
  $('#bars').innerHTML = G.slides.map(() => '<i></i>').join('');
  const sl = $$('.sl'), br = $$('#bars i'); let cur = 0;
  const lum = h => { const n = parseInt(h.slice(1), 16); return .2126 * (n >> 16) + .7152 * (n >> 8 & 255) + .0722 * (n & 255); };
  const show = i => {
    cur = i; const s = G.slides[i], p = byId(s.id);
    hero.style.setProperty('--hb', s.bg); hero.style.setProperty('--hf', lum(s.bg) > 140 ? '#0a0a0a' : '#ffffff');
    sl.forEach((e, j) => e.classList.toggle('on', j === i));
    br.forEach((e, j) => e.className = j < i ? 'done' : j === i ? 'run' : '');
    cap.innerHTML = `<span><b>${p.n} ${p.c}</b><br>${fmt(p.p)}</span><a class="btn sm" href="#${p.id}">Ver peça</a>`;
  };
  show(0);
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) setInterval(() => show((cur + 1) % sl.length), 5500);

  /* ---------- Catálogo + filtro de preço ---------- */
  const lo = $('#lo'), hi = $('#hi'), grid = $('#grid');
  function render() {
    const a = +lo.value, b = +hi.value, L = G.products.filter(p => p.p >= a && p.p <= b);
    $('#lov').textContent = fmt(a); $('#hiv').textContent = fmt(b);
    $('#cnt').textContent = L.length + (L.length === 1 ? ' peça' : ' peças');
    $('#empty').hidden = L.length > 0;
    grid.innerHTML = L.map(p => `<button class="card" data-id="${p.id}"><div class="ph"><img src="${p.img}" alt="${p.n} ${p.c}" loading="lazy"></div><div class="info"><div><b>${p.n}</b><span>${p.c}</span></div><span class="pr">${fmt(p.p)}</span></div></button>`).join('');
  }
  lo.oninput = () => { if (+lo.value > +hi.value) hi.value = lo.value; render(); };
  hi.oninput = () => { if (+hi.value < +lo.value) lo.value = hi.value; render(); };
  $('#rs').onclick = () => { lo.value = 0; hi.value = 2000; render(); };
  grid.onclick = e => { const c = e.target.closest('.card'); if (c) location.hash = c.dataset.id; };

  /* ---------- Janela da peça ---------- */
  const dlg = $('#dlg');
  const chips = (name, arr, sel) => arr.map(v => `<label class="chip"><input type="radio" name="${name}" value="${v}"${v === sel ? ' checked' : ''}><span>${v}</span></label>`).join('');
  function openProduct(p) {
    const cap = p.t === 'cap';
    dlg.innerHTML = `<div class="m"><div class="gal"><img src="${p.img}" alt="${p.n} ${p.c}"></div>
    <form class="det" id="f" onsubmit="return false"><div class="top"><div><h3>${p.n}</h3><p class="tag">${G.drop} · ${p.c}</p></div><button type="button" class="x" data-x aria-label="Fechar">×</button></div>
    <div class="price">${fmt(p.p)}</div><p style="margin:0">${p.d}</p>
    <fieldset><legend>Tamanho</legend><div class="chips">${chips('sz', cap ? ['Único'] : G.sizes, cap ? 'Único' : '')}</div></fieldset>
    <p class="err" id="er" role="alert"></p>
    <button type="button" class="btn" id="add" data-id="${p.id}">Adicionar ao carrinho</button></form></div>`;
    if (!dlg.open) dlg.showModal();
  }
  dlg.addEventListener('click', e => {
    if (e.target === dlg || e.target.closest('[data-x]')) return dlg.close();
    const b = e.target.closest('#add'); if (!b) return;
    const sz = new FormData($('#f')).get('sz');
    if (!sz) return void ($('#er').textContent = 'Escolhe o tamanho antes de adicionar.');
    const id = b.dataset.id, k = id + '|' + sz, it = cart.find(i => i.k === k);
    it ? it.q++ : cart.push({ k, id, sz, q: 1 });
    save(); dlg.close(); drawCart(); $('#cart').showModal();
  });
  dlg.addEventListener('close', () => { if (byId(location.hash.slice(1))) location.hash = ''; });

  /* ---------- Carrinho ---------- */
  const cd = $('#cart');
  function waLink() {
    const L = cart.map((i, n) => { const p = byId(i.id); return `${n + 1}. ${p.n} (${p.c}) · ${i.sz} · ${i.q}x · ${fmt(p.p * i.q)}\n   ${base()}#${p.id}`; });
    const m = `Olá, Goodboy! Quero fazer um pedido do drop ${G.drop}:\n\n${L.join('\n')}\n\n*Total:* ${fmt(total())}\n*Pagamento:* ${pay || '—'}\n\nAguardo a confirmação. Obrigado!`;
    return wl + '?text=' + encodeURIComponent(m);
  }
  function drawCart() {
    const n = cart.reduce((s, i) => s + i.q, 0); $('#cc').textContent = n;
    const items = cart.map(i => { const p = byId(i.id); return `<li class="it"><img src="${p.img}" alt=""><div><b>${p.n}</b><small>${p.c} · ${i.sz}</small><div class="qr"><div class="q"><button data-a="-" data-k="${i.k}" aria-label="Menos">−</button><span>${i.q}</span><button data-a="+" data-k="${i.k}" aria-label="Mais">+</button></div><b>${fmt(p.p * i.q)}</b></div><button class="lnk note" data-a="x" data-k="${i.k}">Remover</button></div></li>`; }).join('');
    cd.innerHTML = `<div class="cart"><div class="top"><h3>Carrinho</h3><button type="button" class="x" data-x aria-label="Fechar">×</button></div>` + (cart.length
      ? `<ul class="items">${items}</ul><div class="tot"><span>Total</span><span>${fmt(total())}</span></div>
      <fieldset><legend>Como queres pagar?</legend><div class="chips">${chips('pay', G.pay, pay)}</div></fieldset>
      <p class="err" id="ce" role="alert"></p><a class="btn" id="go" href="${waLink()}" target="_blank" rel="noopener">Finalizar no WhatsApp</a>
      <p class="note">Confirmamos o valor e enviamos os dados de pagamento no WhatsApp.</p>`
      : `<p class="empty">O carrinho está vazio. Escolhe uma peça no drop.</p><a class="btn" href="#drop" data-x>Ver o drop</a>`) + `</div>`;
  }
  $('#cb').onclick = () => { drawCart(); cd.showModal(); };
  cd.addEventListener('change', e => { if (e.target.name === 'pay') { pay = e.target.value; $('#go').href = waLink(); } });
  cd.addEventListener('click', e => {
    if (e.target === cd || e.target.closest('[data-x]')) return cd.close();
    const a = e.target.closest('[data-a]');
    if (a) {
      const i = cart.find(x => x.k === a.dataset.k), t = a.dataset.a;
      if (t === '+') i.q++; else if (t === '-') i.q--;
      if (t === 'x' || i.q < 1) cart = cart.filter(x => x !== i);
      save(); return drawCart();
    }
    if (e.target.closest('#go') && !pay) { e.preventDefault(); $('#ce').textContent = 'Escolhe o método de pagamento antes de enviar.'; }
  });

  /* ---------- Link direto para cada peça (#tee-preta, etc.) ---------- */
  function route() {
    const p = byId(location.hash.slice(1));
    if (p) openProduct(p); else if (dlg.open) dlg.close();
  }
  addEventListener('hashchange', route);
  render(); drawCart(); route();
})();
