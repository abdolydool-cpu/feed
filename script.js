:root {
  --bg-1: #0b1020;
  --bg-2: #151d36;
  --bg-3: #2b1d46;
  --panel: rgba(19, 26, 42, 0.84);
  --panel-2: rgba(255, 255, 255, 0.06);
  --line: rgba(255, 255, 255, 0.12);
  --text: #f8faff;
  --muted: #bfd0ff;
  --pink: #ff7ae6;
  --cyan: #73f0ff;
  --lime: #8ef7a8;
  --amber: #ffd166;
  --red: #ff6b7d;
  --shadow: rgba(3, 6, 17, 0.45);
}

* {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

html, body {
  margin: 0;
  min-height: 100%;
  background: radial-gradient(circle at top, rgba(133, 94, 255, 0.35), transparent 26%),
    linear-gradient(180deg, var(--bg-3), var(--bg-2) 32%, var(--bg-1) 100%);
  color: var(--text);
  font-family: 'Fredoka', sans-serif;
}

body {
  min-height: 100vh;
}

button, input {
  font: inherit;
}

button {
  border: none;
  cursor: pointer;
}

.hidden {
  display: none !important;
}

.app-shell {
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px 16px 36px;
}

.panel {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 26px;
  box-shadow: 0 18px 36px var(--shadow);
  backdrop-filter: blur(10px);
}

.topbar,
.top-actions,
.brand-wrap,
.main-header,
.score-row,
.status-row,
.hero-card,
.hero-metrics,
.layout {
  display: flex;
  align-items: center;
}

.topbar {
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 20px;
}

.brand-wrap {
  gap: 12px;
}

.brand-badge {
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--pink), #7c5cff);
  font-weight: 700;
  box-shadow: 0 12px 20px rgba(255, 122, 230, 0.26);
}

.kicker {
  margin: 0 0 6px;
  color: var(--muted);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 11px;
}

h1, h2, h3, h4, p {
  margin: 0;
}

h1 {
  font-size: clamp(2rem, 4vw, 3rem);
}

.top-actions {
  gap: 10px;
  flex-wrap: wrap;
}

.mini-btn,
.primary-btn,
.game-btn,
.memory-card,
.tic-cell,
.choice-btn,
.simon-btn,
.reaction-btn {
  transition: transform 0.18s ease, box-shadow 0.18s ease, opacity 0.18s ease;
}

.mini-btn,
.primary-btn {
  border-radius: 12px;
  min-height: 42px;
  padding: 10px 14px;
  color: var(--text);
  background: rgba(255,255,255,0.06);
}

.mini-btn.accent,
.primary-btn {
  background: linear-gradient(135deg, var(--pink), #ff9d6c);
  color: #201124;
  font-weight: 700;
  box-shadow: 0 12px 18px rgba(255, 122, 230, 0.22);
}

.mini-btn.clear {
  width: 100%;
  margin-top: 8px;
}

.offline-badge {
  display: inline-block;
  padding: 8px 10px;
  border-radius: 999px;
  background: rgba(142, 247, 168, 0.15);
  color: var(--lime);
  border: 1px solid rgba(142, 247, 168, 0.25);
  font-size: 0.76rem;
}

.offline-badge.offline {
  background: rgba(255, 107, 125, 0.14);
  color: #ffc2c8;
  border-color: rgba(255, 107, 125, 0.25);
}

.hero-card {
  justify-content: space-between;
  gap: 18px;
  padding: 22px 20px;
  margin-bottom: 22px;
}

.hero-copy {
  flex: 1 1 320px;
}

.eyebrow {
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 8px;
}

.hero-copy h2 {
  font-size: clamp(1.7rem, 4vw, 2.5rem);
  margin-bottom: 8px;
}

.subtitle {
  color: var(--muted);
  max-width: 52ch;
}

.hero-metrics {
  gap: 12px;
  flex-wrap: wrap;
}

.metric-box {
  min-width: 110px;
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 12px 14px;
}

.metric-box span {
  display: block;
  color: var(--muted);
  font-size: 0.73rem;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.metric-box strong {
  font-size: 1.5rem;
}

.layout {
  align-items: flex-start;
  gap: 20px;
}

.sidebar {
  width: min(100%, 320px);
  padding: 18px 16px;
}

.sidebar h3,
.score-panel h4 {
  margin-bottom: 14px;
  font-size: 1.2rem;
}

.game-menu {
  display: grid;
  gap: 10px;
}

.game-btn {
  width: 100%;
  padding: 12px 14px;
  border-radius: 14px;
  background: rgba(255,255,255,0.05);
  color: var(--text);
  text-align: left;
  border: 1px solid transparent;
}

.game-btn.active {
  background: linear-gradient(135deg, rgba(255,122,230,0.16), rgba(116,240,255,0.12));
  border-color: rgba(255,255,255,0.1);
}

.score-panel {
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px solid var(--line);
}

.score-row {
  justify-content: space-between;
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 10px 12px;
  margin-bottom: 8px;
  color: var(--muted);
}

.score-row strong {
  color: var(--text);
  font-size: 1.08rem;
}

.main-panel {
  flex: 1;
  padding: 18px 18px 22px;
  min-height: 540px;
}

.main-header {
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--line);
}

.main-header h2 {
  font-size: clamp(1.5rem, 3vw, 2.2rem);
}

#gameContent {
  padding-top: 16px;
}

.game-panel {
  padding: 10px 2px 0;
}

.game-panel h3 {
  font-size: 1.45rem;
  margin-bottom: 8px;
}

.game-panel p {
  color: var(--muted);
}

.status-row {
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 18px;
  color: var(--muted);
}

.memory-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(60px, 1fr));
  gap: 12px;
  margin-top: 18px;
}

.memory-card {
  aspect-ratio: 1;
  border-radius: 18px;
  background: linear-gradient(135deg, #4f3d8d, #202847);
  border: 1px solid var(--line);
  color: var(--text);
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  display: grid;
  place-items: center;
  user-select: none;
}

.memory-card span {
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.memory-card.revealed span,
.memory-card.matched span {
  opacity: 1;
  transform: scale(1);
}

.memory-card.revealed {
  background: linear-gradient(135deg, rgba(116,240,255,0.25), rgba(255,122,230,0.18));
}

.memory-card.matched {
  background: linear-gradient(135deg, rgba(142,247,168,0.24), rgba(116,240,255,0.12));
}

.tic-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(80px, 100px));
  gap: 10px;
  justify-content: center;
  margin-top: 18px;
}

.tic-cell {
  width: 100%;
  height: 100px;
  border-radius: 18px;
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--line);
  color: var(--text);
  font-size: clamp(2rem, 5vw, 2.8rem);
  font-weight: 700;
}

.reaction-area {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  margin-top: 20px;
}

.reaction-btn {
  width: min(100%, 350px);
  min-height: 130px;
  border-radius: 26px;
  color: #102033;
  font-size: clamp(1.3rem, 3vw, 2.1rem);
  font-weight: 700;
}

.reaction-btn.waiting {
  background: linear-gradient(135deg, var(--amber), #ff9d6c);
}

.reaction-btn.ready {
  background: linear-gradient(135deg, var(--lime), var(--cyan));
}

.guess-box {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 18px;
}

.guess-box input {
  flex: 1 1 180px;
  min-height: 52px;
  border-radius: 14px;
  background: rgba(255,255,255,0.04);
  color: var(--text);
  border: 1px solid var(--line);
  padding: 0 14px;
}

.guess-box button {
  min-width: 120px;
}

.notice {
  margin-top: 18px;
  color: var(--muted);
}

.rps-grid,
.simon-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 1fr));
  gap: 12px;
  margin-top: 18px;
}

.choice-btn,
.simon-btn {
  min-height: 80px;
  border-radius: 18px;
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--line);
  color: var(--text);
  font-size: 1.2rem;
}

.simon-grid {
  grid-template-columns: repeat(2, minmax(120px, 1fr));
}

.simon-btn {
  min-height: 110px;
  font-size: 2rem;
}

.simon-btn.red { background: linear-gradient(135deg, #ff6b7d, #ff3d66); }
.simon-btn.blue { background: linear-gradient(135deg, #59c3ff, #3d75ff); }
.simon-btn.green { background: linear-gradient(135deg, #71f0b6, #10b981); }
.simon-btn.yellow { background: linear-gradient(135deg, #ffd75f, #ffb703); }

.simon-btn.active {
  box-shadow: 0 0 0 3px rgba(255,255,255,0.18);
  filter: brightness(1.08);
}

@media (max-width: 860px) {
  .layout {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
  }
}

@media (max-width: 560px) {
  .app-shell {
    padding-inline: 12px;
  }

  .hero-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .hero-metrics {
    width: 100%;
  }

  .metric-box {
    flex: 1 1 90px;
  }

  .topbar,
  .main-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .topbar {
    margin-bottom: 16px;
  }

  .main-panel {
    min-height: 0;
  }
}
