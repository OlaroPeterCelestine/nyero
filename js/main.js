(function () {
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav-toggle");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
  }
  document.querySelectorAll(".has-sub > a").forEach(function (link) {
    link.addEventListener("click", function (e) {
      if (window.matchMedia("(max-width: 1023px)").matches) {
        e.preventDefault();
        link.parentElement.classList.toggle("open");
      }
    });
  });

  const slides = document.querySelectorAll(".hero-bg img");
  const panels = document.querySelectorAll(".hero-panel");
  const dots = document.querySelectorAll(".hero-dots button");
  let index = 0;
  let timer;

  function show(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach(function (el, n) { el.classList.toggle("is-active", n === index); });
    panels.forEach(function (el, n) { el.classList.toggle("is-active", n === index); });
    dots.forEach(function (el, n) { el.classList.toggle("is-active", n === index); });
  }
  function start() {
    stop();
    if (slides.length < 2) return;
    timer = setInterval(function () { show(index + 1); }, 7000);
  }
  function stop() { if (timer) clearInterval(timer); }
  dots.forEach(function (dot, n) {
    dot.addEventListener("click", function () { show(n); start(); });
  });
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.addEventListener("mouseenter", stop);
    hero.addEventListener("mouseleave", start);
    start();
  }

  document.querySelectorAll(".read-more").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const story = btn.closest(".story, .invest, .partner");
      if (!story) return;
      story.classList.toggle("is-open");
      const open = story.classList.contains("is-open");
      btn.textContent = open ? "Read Less" : (btn.dataset.label || "Read More...");
    });
  });

  const quotes = document.querySelectorAll(".testimonial");
  const tDots = document.querySelectorAll(".t-nav button");
  let tIndex = 0;
  function showQuote(i) {
    if (!quotes.length) return;
    tIndex = (i + quotes.length) % quotes.length;
    quotes.forEach(function (el, n) { el.hidden = n !== tIndex; });
    tDots.forEach(function (el, n) { el.classList.toggle("is-active", n === tIndex); });
  }
  tDots.forEach(function (dot, n) {
    dot.addEventListener("click", function () { showQuote(n); });
  });
  if (quotes.length) {
    showQuote(0);
    setInterval(function () { showQuote(tIndex + 1); }, 8000);
  }

  document.querySelectorAll("[data-filter]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const group = btn.parentElement;
      group.querySelectorAll("button").forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      const value = btn.dataset.filter;
      document.querySelectorAll("[data-status]").forEach(function (card) {
        card.hidden = value !== "all" && card.dataset.status !== value;
      });
    });
  });

  const form = document.querySelector(".inquiry");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const note = form.querySelector(".form-note");
      const data = new FormData(form);
      const name = (data.get("name") || "").toString().trim();
      const email = (data.get("email") || "").toString().trim();
      const topic = data.get("topic");
      if (!name || !email || !email.includes("@") || !topic || topic === "placeholder") {
        note.textContent = "Please add your name, a valid email, and an inquiry type.";
        note.classList.add("show");
        return;
      }
      note.textContent = "Thank you, " + name + ". Your message has been recorded in this demo. SCF can be reached at (213) 342-6708.";
      note.classList.add("show");
      form.reset();
    });
  }

  const pages = [
    ["Home", "index.html", "investing to empower communities"],
    ["Mission & Priorities", "mission.html", "poverty financial inclusion housing"],
    ["History & Founders", "history.html", "deborah la franchi belden daniels"],
    ["Board & Staff", "board.html", "board directors staff"],
    ["Documents", "documents.html", "taxes audit 990"],
    ["Portfolio & Investment Partners", "portfolio.html", "partners cdfi portfolio"],
    ["Our Investments", "investments.html", "loans investments grameen liftfund runway self help oikocredit northern initiatives"],
    ["Investment Criteria", "criteria.html", "criteria debt equity"],
    ["FAQ", "faq.html", "cdfi impact investments"],
    ["Support SCF", "support.html", "donate support campaign"],
    ["Contact Us", "contact.html", "phone email los angeles"],
    ["Privacy", "privacy.html", "privacy terms"],
    ["Melissa McDonald", "melissa-mcdonald.html", "board chair raza development fund"],
    ["Kenneth Mayne", "kenneth-mayne.html", "treasurer chief investment officer"],
    ["Ashlee Barker", "ashlee-barker.html", "board secretary cinnaire"],
    ["Deborah La Franchi", "deborah-la-franchi.html", "co-founder president ceo"],
    ["Wil Jacobs", "wil-jacobs.html", "board member bankplus"],
    ["Kim LaFranchi", "kim-la-franchi.html", "chief executive officer"],
    ["Laura Baron", "laura-baron.html", "chief financial officer"],
    ["Belden Hull Daniels", "belden-hull-daniels.html", "co-founder economic innovation"],
    ["Asteria Steinberger", "asteria-steinberger.html", "senior asset manager"]
  ];
  const overlay = document.querySelector(".search-overlay");
  const searchInput = document.querySelector(".search-box input");
  const results = document.querySelector(".search-results");
  function render(q) {
    if (!results) return;
    const query = q.trim().toLowerCase();
    const hits = pages.filter(function (p) {
      return !query || (p[0] + " " + p[2]).toLowerCase().includes(query);
    });
    results.innerHTML = hits.map(function (p) {
      return '<li><a href="' + p[1] + '">' + p[0] + "</a></li>";
    }).join("");
  }
  document.querySelectorAll(".search-open").forEach(function (btn) {
    btn.addEventListener("click", function () {
      overlay.classList.add("open");
      searchInput.focus();
      render("");
    });
  });
  if (overlay) {
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) overlay.classList.remove("open");
    });
    searchInput.addEventListener("input", function () { render(searchInput.value); });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && overlay) overlay.classList.remove("open");
  });

  function revealInvestment(el) {
    if (!el || !el.classList.contains("invest")) return;
    el.hidden = false;
    el.classList.add("is-open");
    const btn = el.querySelector(".read-more");
    if (btn) btn.textContent = "Read Less";
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  const params = new URLSearchParams(location.search);
  const invId = params.get("investment");
  let target = invId ? document.querySelector('[data-wp="' + invId + '"]') : null;
  if (!target && location.hash.length > 1) {
    try { target = document.querySelector(location.hash); } catch (err) { target = null; }
  }
  if (target) revealInvestment(target);
})();
