(() => {
  const PAGE_DATA = {
    "diyet-kahvalti.html": [
      { kcal: 440, min: 15, tags: ["yuksek-protein", "ekonomik"] },
      { kcal: 420, min: 15, tags: ["yuksek-protein", "hizli"] },
      { kcal: 480, min: 12, tags: ["lifli", "hizli"] },
      { kcal: 390, min: 10, tags: ["hizli", "ekonomik"] },
      { kcal: 410, min: 15, tags: ["yuksek-protein", "dusuk-karbonhidrat"] },
      { kcal: 360, min: 8, tags: ["hizli", "dusuk-karbonhidrat"] },
      { kcal: 350, min: 6, tags: ["hizli", "lifli"] },
      { kcal: 430, min: 10, tags: ["hizli", "ekonomik"] },
      { kcal: 370, min: 25, tags: ["yuksek-protein", "ekonomik"] },
      { kcal: 440, min: 15, tags: ["yuksek-protein", "hizli"] },
      { kcal: 410, min: 20, tags: ["yuksek-protein", "lifli"] },
      { kcal: 460, min: 25, tags: ["ekonomik", "lifli"] },
      { kcal: 340, min: 5, tags: ["hizli", "lifli"] },
      { kcal: 390, min: 10, tags: ["yuksek-protein", "hizli"] },
      { kcal: 420, min: 7, tags: ["hizli", "ekonomik"] },
      { kcal: 430, min: 15, tags: ["yuksek-protein", "hizli"] },
      { kcal: 330, min: 6, tags: ["hizli", "dusuk-karbonhidrat"] },
      { kcal: 360, min: 20, tags: ["ekonomik", "lifli"] },
      { kcal: 390, min: 8, tags: ["hizli", "yuksek-protein"] },
      { kcal: 320, min: 4, tags: ["hizli", "lifli"] },
    ],
    "diyet-aksam.html": [
      { kcal: 590, min: 35, tags: ["yuksek-protein", "lifli"] },
      { kcal: 560, min: 30, tags: ["yuksek-protein", "ekonomik"] },
      { kcal: 540, min: 25, tags: ["ekonomik", "lifli"] },
      { kcal: 500, min: 35, tags: ["ekonomik", "lifli"] },
      { kcal: 600, min: 40, tags: ["yuksek-protein", "ekonomik"] },
      { kcal: 520, min: 30, tags: ["yuksek-protein", "lifli"] },
      { kcal: 570, min: 35, tags: ["ekonomik", "lifli"] },
      { kcal: 540, min: 35, tags: ["yuksek-protein", "dusuk-karbonhidrat"] },
      { kcal: 560, min: 30, tags: ["yuksek-protein", "lifli"] },
      { kcal: 510, min: 25, tags: ["ekonomik", "lifli"] },
      { kcal: 530, min: 30, tags: ["yuksek-protein", "dusuk-karbonhidrat"] },
      { kcal: 500, min: 35, tags: ["yuksek-protein", "lifli"] },
      { kcal: 610, min: 25, tags: ["yuksek-protein", "hizli"] },
      { kcal: 520, min: 12, tags: ["hizli", "yuksek-protein"] },
      { kcal: 560, min: 25, tags: ["yuksek-protein", "hizli"] },
      { kcal: 500, min: 35, tags: ["yuksek-protein", "lifli"] },
      { kcal: 540, min: 25, tags: ["yuksek-protein", "lifli"] },
      { kcal: 520, min: 20, tags: ["hizli", "yuksek-protein"] },
      { kcal: 600, min: 30, tags: ["yuksek-protein", "hizli"] },
      { kcal: 560, min: 40, tags: ["ekonomik", "yuksek-protein"] },
    ],
    "diyet-smoothie.html": [
      { kcal: 130, min: 5, tags: ["hizli", "dusuk-karbonhidrat"] },
      { kcal: 320, min: 5, tags: ["hizli", "yuksek-protein"] },
      { kcal: 180, min: 1, tags: ["hizli", "ekonomik"] },
      { kcal: 190, min: 3, tags: ["hizli", "lifli"] },
      { kcal: 210, min: 5, tags: ["hizli", "lifli"] },
      { kcal: 240, min: 5, tags: ["hizli", "toparlanma"] },
      { kcal: 80, min: 4, tags: ["hizli", "dusuk-karbonhidrat"] },
      { kcal: 220, min: 3, tags: ["hizli", "lifli"] },
      { kcal: 200, min: 4, tags: ["hizli", "ekonomik"] },
      { kcal: 170, min: 4, tags: ["hizli", "toparlanma"] },
      { kcal: 160, min: 3, tags: ["hizli", "ekonomik"] },
      { kcal: 140, min: 4, tags: ["hizli", "lifli"] },
      { kcal: 210, min: 3, tags: ["hizli", "toparlanma"] },
      { kcal: 180, min: 5, tags: ["hizli", "lifli"] },
      { kcal: 130, min: 1, tags: ["hizli", "ekonomik"] },
      { kcal: 190, min: 2, tags: ["hizli", "toparlanma"] },
      { kcal: 170, min: 20, tags: ["lifli", "hizli"] },
      { kcal: 110, min: 5, tags: ["hizli", "dusuk-karbonhidrat"] },
      { kcal: 95, min: 2, tags: ["hizli", "dusuk-karbonhidrat"] },
      { kcal: 200, min: 3, tags: ["hizli", "lifli"] },
    ],
  };

  const TAG_LABELS = {
    "yuksek-protein": "Yüksek Protein",
    "ekonomik": "Ekonomik",
    "hizli": "Hızlı",
    "dusuk-karbonhidrat": "Düşük Karb",
    "lifli": "Lifli",
    "toparlanma": "Toparlanma",
  };

  const path = window.location.pathname.split("/").pop();
  const data = PAGE_DATA[path];
  if (!data) return;

  const grid = document.querySelector(".recipe-grid");
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll(".recipe-card"));
  const items = cards.map((el, idx) => ({
    el,
    idx,
    meta: data[idx] || { kcal: 0, min: 0, tags: [] },
    text: el.textContent.toLowerCase(),
  }));

  items.forEach((item) => {
    item.el.dataset.kcal = String(item.meta.kcal);
    item.el.dataset.min = String(item.meta.min);
    item.el.dataset.tags = item.meta.tags.join(",");

    const title = item.el.querySelector(".recipe-title");
    const anchor = item.el.querySelector(".recipe-macros") || title;
    const metaRow = document.createElement("div");
    metaRow.className = "recipe-meta";
    metaRow.innerHTML = `
      <span class="meta-pill">~ ${item.meta.kcal} kcal</span>
      <span class="meta-pill">~ ${item.meta.min} dk</span>
      ${item.meta.tags.slice(0, 2).map((t) => `<span class="meta-pill">${TAG_LABELS[t] || t}</span>`).join("")}
    `;
    anchor.insertAdjacentElement("afterend", metaRow);
  });

  const filterHost = document.createElement("div");
  filterHost.className = "filters-panel";
  filterHost.innerHTML = `
    <div class="filters-grid">
      <div class="filter-field">
        <label for="filter-search">Ara</label>
        <input id="filter-search" type="search" placeholder="Örn: omlet, tavuk, kefir..." />
      </div>
      <div class="filter-field">
        <label for="filter-calorie">Kalori</label>
        <select id="filter-calorie">
          <option value="all">Tümü</option>
          <option value="lt200">200 altı</option>
          <option value="200-350">200 - 350</option>
          <option value="350-500">350 - 500</option>
          <option value="gt500">500 üstü</option>
        </select>
      </div>
      <div class="filter-field">
        <label for="filter-time">Hazırlık Süresi</label>
        <select id="filter-time">
          <option value="all">Tümü</option>
          <option value="quick">10 dk altı</option>
          <option value="normal">10 - 25 dk</option>
          <option value="long">25 dk üstü</option>
        </select>
      </div>
      <div class="filter-field">
        <label for="filter-sort">Sıralama</label>
        <select id="filter-sort">
          <option value="default">Varsayılan</option>
          <option value="kcal-asc">Kalori artan</option>
          <option value="kcal-desc">Kalori azalan</option>
          <option value="time-asc">Süre artan</option>
        </select>
      </div>
    </div>
    <div class="filter-tags" id="filter-tags"></div>
    <div class="filters-footer">
      <span id="filter-count"></span>
      <button id="filter-reset" type="button" class="back-link" style="padding:6px 10px;">Sıfırla</button>
    </div>
  `;

  const sectionTitle = document.querySelector(".section-title");
  sectionTitle.insertAdjacentElement("afterend", filterHost);

  const activeTags = new Set();
  const tagsContainer = document.getElementById("filter-tags");
  Object.entries(TAG_LABELS).forEach(([key, label]) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = label;
    btn.dataset.tag = key;
    btn.addEventListener("click", () => {
      if (activeTags.has(key)) activeTags.delete(key);
      else activeTags.add(key);
      btn.classList.toggle("active");
      render();
    });
    tagsContainer.appendChild(btn);
  });

  const searchInput = document.getElementById("filter-search");
  const calorieSelect = document.getElementById("filter-calorie");
  const timeSelect = document.getElementById("filter-time");
  const sortSelect = document.getElementById("filter-sort");
  const countText = document.getElementById("filter-count");
  const resetBtn = document.getElementById("filter-reset");

  function matchCalorie(val, kcal) {
    if (val === "all") return true;
    if (val === "lt200") return kcal < 200;
    if (val === "200-350") return kcal >= 200 && kcal <= 350;
    if (val === "350-500") return kcal > 350 && kcal <= 500;
    if (val === "gt500") return kcal > 500;
    return true;
  }

  function matchTime(val, min) {
    if (val === "all") return true;
    if (val === "quick") return min < 10;
    if (val === "normal") return min >= 10 && min <= 25;
    if (val === "long") return min > 25;
    return true;
  }

  function render() {
    const q = searchInput.value.trim().toLowerCase();
    const c = calorieSelect.value;
    const t = timeSelect.value;
    const s = sortSelect.value;

    let filtered = items.filter((item) => {
      const tags = item.meta.tags || [];
      const tagOk = Array.from(activeTags).every((tag) => tags.includes(tag));
      const qOk = !q || item.text.includes(q);
      const cOk = matchCalorie(c, item.meta.kcal);
      const tOk = matchTime(t, item.meta.min);
      return tagOk && qOk && cOk && tOk;
    });

    if (s === "kcal-asc") filtered = filtered.slice().sort((a, b) => a.meta.kcal - b.meta.kcal);
    else if (s === "kcal-desc") filtered = filtered.slice().sort((a, b) => b.meta.kcal - a.meta.kcal);
    else if (s === "time-asc") filtered = filtered.slice().sort((a, b) => a.meta.min - b.meta.min);
    else filtered = filtered.slice().sort((a, b) => a.idx - b.idx);

    items.forEach((item) => (item.el.style.display = "none"));
    filtered.forEach((item) => {
      item.el.style.display = "";
      grid.appendChild(item.el);
    });

    countText.textContent = `${filtered.length} / ${items.length} menü gösteriliyor`;
  }

  [searchInput, calorieSelect, timeSelect, sortSelect].forEach((el) => {
    el.addEventListener("input", render);
    el.addEventListener("change", render);
  });

  resetBtn.addEventListener("click", () => {
    searchInput.value = "";
    calorieSelect.value = "all";
    timeSelect.value = "all";
    sortSelect.value = "default";
    activeTags.clear();
    tagsContainer.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
    render();
  });

  render();
})();
