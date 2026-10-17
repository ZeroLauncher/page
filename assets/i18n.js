/* Zero Launcher — language system
 * - auto-detects the visitor's language (saved choice > ?lang= > browser language > English)
 * - language packs live in assets/lang/<code>.js and are loaded on demand
 * - every pack is an array of strings in the exact order of KEYS below */
(function(){
  var KEYS = [
    'overview','features','loaders','download',
    'eyebrow','h1','lede','cta','src','m1','m2','m3',
    'noticeA','noticeB',
    'fEyebrow','fTitle','fDesc',
    'f1t','f1d','f2t','f2d','f3t','f3d','f4t','f4d','f5t','f5d','f6t','f6d','f7t','f7d','f8t','f8d','f9t','f9d','f10t','f10d',
    'lEyebrow','lTitle','l1','l2','l3','l4','l5',
    'dTitle','dDesc','dDescWin','dDescLinux','badge','winPd','dlWin','menuLabel','winInst','winPort','linPd','dlLinux','linInst','linApp',
    'footer','bug','inBeta',
    'lnTag','lnTitle','lnDesc','lnS1','lnS2','lnCopy','lnCopied','lnWait','lnOk','lnHint',
    'c1','c2','c3','c4','c5',
    'title','metaDesc','langLabel','langNote'
  ];

  // c = code, n = native name, f = flag file (assets/flags/<f>.svg)
  var LANGS = [
    {c:'en', n:'English',            f:'gb'},
    {c:'nl', n:'Nederlands',         f:'nl'},
    {c:'de', n:'Deutsch',            f:'de'},
    {c:'fr', n:'Français',           f:'fr'},
    {c:'es', n:'Español',            f:'es'},
    {c:'pt', n:'Português (Brasil)', f:'br'},
    {c:'it', n:'Italiano',           f:'it'},
    {c:'pl', n:'Polski',             f:'pl'},
    {c:'uk', n:'Українська',         f:'ua'},
    {c:'ru', n:'Русский',            f:'ru'},
    {c:'tr', n:'Türkçe',             f:'tr'},
    {c:'ar', n:'العربية',            f:'sa', rtl:true},
    {c:'hi', n:'हिन्दी',              f:'in'},
    {c:'zh', n:'简体中文',            f:'cn', html:'zh-Hans'},
    {c:'ja', n:'日本語',              f:'jp'},
    {c:'ko', n:'한국어',              f:'kr'}
  ];

  var dict = {}, cur = 'en', waiting = {};

  function find(c){ for (var i=0;i<LANGS.length;i++) if (LANGS[i].c === c) return LANGS[i]; return null; }

  var ZL = window.ZL = {
    langs: LANGS,
    add: function(c, arr){
      var o = {};
      for (var i=0;i<KEYS.length;i++) o[KEYS[i]] = arr[i];
      dict[c] = o;
    },
    t: function(k, vars){
      var s = (dict[cur] && dict[cur][k] != null) ? dict[cur][k] : (dict.en && dict.en[k] != null ? dict.en[k] : k);
      if (vars) for (var v in vars) s = s.split('{'+v+'}').join(vars[v]);
      return s;
    },
    current: function(){ return cur; },
    set: setLang
  };

  /* ───────── English (default / fallback) ───────── */
  ZL.add('en', [
    "Overview","Features","Loaders","Download",
    "Still in beta — expect a few bugs",
    "A Minecraft launcher<br>built to be <span class='grad'>easy, fast, simple,<br>and lightweight</span>.",
    "Zero Launcher strips away the bloat of a typical launcher. It's a fast, open-source app for Windows and Linux that stays light on your system, so more of your CPU and RAM go to the game instead of the launcher. Swap loaders, tune instances, and reshape the interface itself — all running on a native Rust core instead of an Electron shell.",
    "Get Zero Launcher","View source on GitHub",
    "Built with Rust + Tauri","Free & open source","Active beta development",
    "<b>This project is still in beta</b> — bugs are expected while things stabilize.",
    "Performance is currently best on Windows, since Windows WebView2 is more optimized than Linux's WebKitGTK right now. That gap should close as the Linux build matures. Skeptical of a random launcher binary? Fair — run it through VirusTotal yourself, or just skip it, no hard feelings.",
    "Under the hood","Everything a launcher should do, none of the bloat.",
    "Zero Launcher trades an Electron shell for a native Rust core, and spends the savings on features you'll actually use.",
    "Every major loader","Vanilla, Fabric, Forge, NeoForge, and Quilt are all supported out of the box — pick one per instance, no separate tools required.",
    "Custom instances & presets","Save a full setup — loader, mods, memory, Java version — as a preset, then spin up new instances from it in seconds.",
    "Built-in mod discovery","Browse and install mods without leaving the launcher, then manage them per-instance from one place.",
    "Play & download modpacks","Browse and install modpacks straight from CurseForge and Modrinth, or import your own — .mrpack and .zip files are all supported.",
    "Skin & cape management","Switch between saved skins and capes right from the launcher, and swap your active look before you hit play.",
    "Microsoft or offline accounts","Sign in with a Microsoft account via device code, or play offline with a free local account — your call.",
    "Automatic Java management","Zero Launcher detects and fetches the right Java runtime per instance, so version mismatches stop being your problem.",
    "Discord Rich Presence","Show what you're playing — instance, version, and loader — right in your Discord status while you launch.",
    "Crash analysis","When something breaks, the launcher reads the crash log and points you toward what actually went wrong.",
    "A UI you can reshape","Custom backgrounds, accent colors, and layout touches — the “customizable” in the name is meant literally.",
    "Compatibility","Runs whatever you throw at it.",
    "Mojang default","Lightweight modding","The long-standing standard","Modern Forge fork","Fabric-compatible",
    "Pick your platform.",
    "Two builds, one launcher. Windows is the most polished today — Linux works great and keeps closing the gap.",
    "Looks like you're on Windows — grab the build below, or scroll to Linux if that's not right.",
    "Looks like you're on Linux — grab the AppImage below, or scroll to Windows if that's not right.",
    "Recommended for you",
    "The recommended way to run Zero Launcher right now — Windows WebView2 gives it the smoothest experience.",
    "Download for Windows","Other downloads","Windows installer","Windows portable",
    "Run Zero Launcher natively on your favorite distro. Grab the installer, or pick the portable AppImage from the menu — no install needed.",
    "Download for Linux","Linux installer","Linux AppImage",
    "Zero Launcher — an independent, unofficial Minecraft launcher.","Report a bug","IN BETA",
    "⚠ Important note",
    "Your download won't open until you give it permission",
    "On Linux, downloaded apps aren't allowed to run by default. To open {file} you need to make it executable first:",
    "Open a terminal (console).","Run these commands, one after the other:",
    "Copy commands","Copied ✓","Please read the note… ({n})","I understand — I'll run these commands",
    "If you saved the file somewhere other than Downloads, change the folder in the first command.",
    "Instances — loader details and player profile","Mods management","Discover & Download New mods","Custom instance Presets For Performance & fixes and PvP","Customizable Themes and Settings",
    "Zero Launcher — a Minecraft launcher you can actually customize",
    "Zero Launcher is a lightweight, highly customizable Minecraft launcher built with Rust and Tauri. Currently in beta for Windows and Linux.",
    "Language",
    "Most languages are auto-generated"
  ]);

  /* ───────── loading ───────── */
  function load(c, done){
    if (dict[c]) return done();
    var s = document.createElement('script');
    s.src = 'assets/lang/' + c + '.js';
    s.onload = s.onerror = function(){ done(); };
    document.head.appendChild(s);
  }

  /* ───────── applying ───────── */
  function apply(){
    var L = find(cur) || LANGS[0];
    var root = document.documentElement;
    root.lang = L.html || L.c;
    root.dir = L.rtl ? 'rtl' : 'ltr';

    var els = document.querySelectorAll('[data-i18n]');
    for (var i=0;i<els.length;i++) els[i].innerHTML = ZL.t(els[i].getAttribute('data-i18n'));

    document.title = ZL.t('title');
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute('content', ZL.t('metaDesc'));
    var mt = document.querySelector('meta[name="title"]');
    if (mt) mt.setAttribute('content', ZL.t('title'));

    renderPicker();
  }

  function setLang(c, persist){
    if (!find(c)) c = 'en';
    load(c, function(){
      cur = dict[c] ? c : 'en';
      apply();
      if (persist){ try { localStorage.setItem('zl-lang', cur); } catch(e){} }
      try { document.dispatchEvent(new CustomEvent('zl:change', {detail:cur})); } catch(e){}
    });
  }

  /* ───────── detection ─────────
   * priority: ?lang= > saved choice > browser language > time-zone (rough location) > English
   * `ask` is true when we guessed (nothing saved / forced), so we offer a one-time choice. */
  var TZ = {
    ar:['Africa/Algiers','Africa/Cairo','Africa/Tunis','Africa/Tripoli','Africa/Casablanca','Africa/Khartoum','Asia/Riyadh','Asia/Dubai','Asia/Baghdad','Asia/Amman','Asia/Beirut','Asia/Damascus','Asia/Kuwait','Asia/Qatar','Asia/Muscat','Asia/Aden','Asia/Bahrain','Asia/Gaza','Asia/Hebron'],
    fr:['Europe/Paris','Europe/Brussels','Africa/Dakar','Africa/Abidjan'],
    de:['Europe/Berlin','Europe/Vienna','Europe/Zurich'],
    es:['Europe/Madrid','America/Mexico_City','America/Bogota','America/Argentina/Buenos_Aires','America/Lima','America/Santiago'],
    pt:['America/Sao_Paulo','Europe/Lisbon'],
    it:['Europe/Rome'], nl:['Europe/Amsterdam'], pl:['Europe/Warsaw'], uk:['Europe/Kyiv','Europe/Kiev'],
    ru:['Europe/Moscow'], tr:['Europe/Istanbul'], hi:['Asia/Kolkata','Asia/Calcutta'],
    zh:['Asia/Shanghai','Asia/Chongqing','Asia/Urumqi'], ja:['Asia/Tokyo'], ko:['Asia/Seoul']
  };
  function fromTimeZone(){
    var tz = '';
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch(e){}
    if (!tz) return null;
    for (var c in TZ) if (TZ[c].indexOf(tz) > -1) return c;
    return null;
  }
  function detect(){
    var m = location.search.match(/[?&]lang=([a-zA-Z-]+)/);
    if (m){ var q = m[1].toLowerCase().split('-')[0]; if (find(q)) return {c:q, ask:false}; }
    try { var saved = localStorage.getItem('zl-lang'); if (saved && find(saved)) return {c:saved, ask:false}; } catch(e){}
    var list = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || navigator.userLanguage || 'en'];
    var guess = null;
    for (var i=0;i<list.length;i++){
      var b = String(list[i]).toLowerCase().split('-')[0];
      if (b !== 'en' && find(b)){ guess = b; break; }
    }
    if (!guess) guess = fromTimeZone();
    return {c: guess || 'en', ask: !!guess};
  }

  /* ───────── first-visit language prompt ───────── */
  function showPrompt(guess){
    var G = find(guess);
    if (!G || guess === 'en' || document.getElementById('zl-ask')) return;
    var st = document.createElement('style');
    st.textContent =
      '#zl-ask{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(5,8,14,.72);backdrop-filter:blur(8px);animation:zlAskIn .25s ease both}'+
      '@keyframes zlAskIn{from{opacity:0}to{opacity:1}}'+
      '#zl-ask .box{width:min(420px,100%);background:var(--bg-darker,#0d1117);border:1px solid var(--panel-border-strong,rgba(255,255,255,.15));border-radius:18px;padding:26px 22px 22px;box-shadow:0 30px 80px -20px rgba(0,0,0,.8);text-align:center;color:var(--text,#e6edf3)}'+
      '#zl-ask h2{margin:0 0 4px;font-size:19px;font-weight:800;color:#fff}'+
      '#zl-ask p{margin:0 0 18px;font-size:13px;color:var(--text-muted,#9aa4b2)}'+
      '#zl-ask .opts{display:grid;gap:10px}'+
      '#zl-ask button{display:flex;align-items:center;justify-content:center;gap:10px;padding:13px 16px;border-radius:12px;border:1px solid var(--panel-border-strong,rgba(255,255,255,.15));background:rgba(255,255,255,.05);color:#fff;font:inherit;font-size:15px;font-weight:700;cursor:pointer;transition:.18s ease}'+
      '#zl-ask button:hover{background:rgba(255,255,255,.1);border-color:var(--blue-a,#3ec6ff)}'+
      '#zl-ask button.main{background:rgba(62,198,255,.14);border-color:var(--blue-a,#3ec6ff)}'+
      '#zl-ask button:focus-visible{outline:2px solid var(--blue-a,#3ec6ff);outline-offset:2px}'+
      '#zl-ask img{width:22px;height:16px;border-radius:2px;object-fit:cover}';
    document.head.appendChild(st);

    var o = document.createElement('div');
    o.id = 'zl-ask'; o.setAttribute('role','dialog'); o.setAttribute('aria-modal','true');
    o.innerHTML =
      '<div class="box"><h2>Choose your language</h2><p></p><div class="opts"></div></div>';
    o.querySelector('p').textContent = ZL.t('langLabel') + ' · Language';
    var opts = o.querySelector('.opts');
    function done(c, persist){
      if (st.parentNode) st.parentNode.removeChild(st);
      if (o.parentNode) o.parentNode.removeChild(o);
      document.removeEventListener('keydown', onKey);
      setLang(c, persist);
    }
    function mk(L, main){
      var b = document.createElement('button');
      b.type = 'button'; if (main) b.className = 'main'; b.lang = L.html || L.c;
      b.innerHTML = flag(L) + '<span>' + L.n + '</span>';
      b.addEventListener('click', function(){ done(L.c, true); });
      opts.appendChild(b); return b;
    }
    var first = mk(G, true); mk(find('en'), false);
    function onKey(e){ if (e.key === 'Escape') done(guess, false); }
    document.addEventListener('keydown', onKey);
    document.body.appendChild(o);
    first.focus();
  }

  /* ───────── dropdown ───────── */
  var picker, btn, menu, note;
  var CARET = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
  var TICK  = '<svg class="tick" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="14" height="14"><path d="M5 12l5 5L20 7"/></svg>';

  function flag(L){ return '<img class="flag" src="assets/flags/' + L.f + '.svg" alt="" width="20" height="15" loading="lazy" draggable="false">'; }

  function renderPicker(){
    if (!picker) return;
    var L = find(cur) || LANGS[0];
    btn.innerHTML = flag(L) + '<span class="lang-code">' + L.c.toUpperCase() + '</span>' + CARET;
    btn.setAttribute('aria-label', ZL.t('langLabel') + ': ' + L.n);
    menu.setAttribute('aria-label', ZL.t('langLabel'));
    if (note) note.textContent = ZL.t('langNote');
    var items = menu.querySelectorAll('button');
    for (var i=0;i<items.length;i++) items[i].setAttribute('aria-selected', items[i].dataset.c === cur ? 'true' : 'false');
  }

  function openMenu(){ picker.classList.add('open'); btn.setAttribute('aria-expanded','true'); }
  function closeMenu(){ picker.classList.remove('open'); btn.setAttribute('aria-expanded','false'); }

  function buildPicker(){
    picker = document.getElementById('lang');
    if (!picker) return;
    btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'lang-btn';
    btn.setAttribute('aria-haspopup','listbox'); btn.setAttribute('aria-expanded','false');
    menu = document.createElement('div');
    menu.className = 'lang-menu'; menu.setAttribute('role','listbox');
    LANGS.forEach(function(L){
      var b = document.createElement('button');
      b.type = 'button'; b.setAttribute('role','option'); b.dataset.c = L.c; b.lang = L.html || L.c;
      b.innerHTML = flag(L) + '<span>' + L.n + '</span>' + TICK;
      b.addEventListener('click', function(){ setLang(L.c, true); closeMenu(); btn.focus(); });
      menu.appendChild(b);
    });
    note = document.createElement('span');
    note.className = 'lang-note';
    picker.appendChild(btn); picker.appendChild(note); picker.appendChild(menu);

    btn.addEventListener('click', function(e){
      e.stopPropagation();
      if (picker.classList.contains('open')) closeMenu(); else openMenu();
    });
    document.addEventListener('click', function(e){ if (!picker.contains(e.target)) closeMenu(); });
    picker.addEventListener('keydown', function(e){
      var items = Array.prototype.slice.call(menu.querySelectorAll('button'));
      var i = items.indexOf(document.activeElement);
      if (e.key === 'Escape'){ if (picker.classList.contains('open')){ closeMenu(); btn.focus(); e.stopPropagation(); } }
      else if (e.key === 'ArrowDown'){ e.preventDefault(); openMenu(); (items[i+1] || items[0]).focus(); }
      else if (e.key === 'ArrowUp'){ e.preventDefault(); openMenu(); (items[i-1] || items[items.length-1]).focus(); }
      else if (e.key === 'Home' && i > -1){ e.preventDefault(); items[0].focus(); }
      else if (e.key === 'End'  && i > -1){ e.preventDefault(); items[items.length-1].focus(); }
    });
  }

  buildPicker();
  var d = detect();
  setLang(d.c, false);
  if (d.ask){
    var go = function(){ showPrompt(d.c); };
    if (document.body) go(); else document.addEventListener('DOMContentLoaded', go);
  }
})();
