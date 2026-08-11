const grid = document.getElementById('principleGrid');
const progressValue = document.getElementById('progressValue');
const dailyDhikr = document.getElementById('dailyDhikr');
const prayerList = document.getElementById('prayerList');
const themeToggle = document.getElementById('themeToggle');

const saved = JSON.parse(localStorage.getItem('suluk-progress') || '{}');
const completedCount = saved.completedCount || 0;
progressValue.textContent = Math.round((completedCount / 10) * 100) + '%';

document.getElementById('saveExperience').addEventListener('click', () => {
  const text = document.getElementById('experience').value.trim();
  const experiences = JSON.parse(localStorage.getItem('suluk-experiences') || '[]');
  if (text) {
    experiences.unshift({ text, at: new Date().toISOString() });
    localStorage.setItem('suluk-experiences', JSON.stringify(experiences));
    alert('تجربه شما ثبت شد.');
  }
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('suluk-theme', document.body.classList.contains('light') ? 'light' : 'dark');
});

if (localStorage.getItem('suluk-theme') === 'light') {
  document.body.classList.add('light');
}

const renderPrinciples = () => {
  if (!grid || !window.PRINCIPLES) return;
  grid.innerHTML = window.PRINCIPLES.map((p, i) => `
    <article class="card">
      <div class="meta">
        <span class="pill">اصل ${i + 1}</span>
        <span class="pill">${p.name}</span>
      </div>
      <h4>${p.name}</h4>
      <p class="muted">${p.desc}</p>
      <p><strong>تمرین روزانه:</strong> ${p.daily}</p>
      <p><strong>چالش هفتگی:</strong> ${p.weekly}</p>
      <button class="secondary" data-principle="${i}">تکمیل شد</button>
    </article>
  `).join('');

  grid.querySelectorAll('button[data-principle]').forEach(btn => {
    btn.addEventListener('click', e => {
      const current = JSON.parse(localStorage.getItem('suluk-progress') || '{"completed":[]}');
      const idx = Number(e.currentTarget.dataset.principle);
      current.completed = Array.from(new Set([...(current.completed || []), idx]));
      current.completedCount = current.completed.length;
      localStorage.setItem('suluk-progress', JSON.stringify(current));
      location.reload();
    });
  });
};

const prayers = [
  { title: 'دعای سحر', text: 'خدایا دل ما را به نور حضور خود روشن کن.' },
  { title: 'مناجات مراقبه', text: 'ما را به سکوتی برسان که در آن صدای حقیقت شنیده شود.' },
  { title: 'دعای پایان روز', text: 'آنچه کردیم به رحمت تو بسپار و آنچه نقص داشت به فضل خود بپوشان.' }
];

if (dailyDhikr) dailyDhikr.textContent = 'لا اله الا الله';
if (prayerList) prayerList.innerHTML = prayers.map(p => `
  <div class="list-item">
    <h4>${p.title}</h4>
    <p>${p.text}</p>
  </div>
`).join('');

renderPrinciples();