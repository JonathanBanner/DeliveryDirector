const scenes = [...document.querySelectorAll('.scene')];
const progress = document.getElementById('progressFill');
const counter = document.getElementById('sceneCounter');
const previous = document.getElementById('previous');
const next = document.getElementById('next');
const practice = document.getElementById('practiceButton');
let current = 0;

function showScene(index) {
  current = Math.max(0, Math.min(index, scenes.length - 1));
  scenes.forEach((scene, i) => scene.classList.toggle('active', i === current));
  progress.style.width = `${((current + 1) / scenes.length) * 100}%`;
  counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(scenes.length).padStart(2, '0')}`;
  previous.disabled = current === 0;
  next.disabled = current === scenes.length - 1;
  document.title = `${scenes[current].dataset.label} | Delivery at Race Pace`;
}

previous.addEventListener('click', () => showScene(current - 1));
next.addEventListener('click', () => showScene(current + 1));
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight' || event.key === ' ') { event.preventDefault(); showScene(current + 1); }
  if (event.key === 'ArrowLeft') { event.preventDefault(); showScene(current - 1); }
  if (event.key.toLowerCase() === 'p') practice.click();
});
practice.addEventListener('click', () => {
  const enabled = document.body.classList.toggle('practice');
  practice.classList.toggle('active', enabled);
  practice.setAttribute('aria-pressed', enabled);
  practice.textContent = enabled ? 'Hide notes' : 'Practice mode';
});
showScene(0);

const evidencePanel = document.getElementById('evidencePanel');
const evidenceTitle = document.getElementById('evidenceTitle');
const evidenceCopy = document.getElementById('evidenceCopy');
const closeEvidence = document.getElementById('closeEvidence');

document.querySelectorAll('.evidence-trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    evidenceTitle.innerHTML = trigger.dataset.title;
    evidenceCopy.textContent = trigger.dataset.evidence;
    evidencePanel.hidden = false;
  });
});

closeEvidence.addEventListener('click', () => { evidencePanel.hidden = true; });