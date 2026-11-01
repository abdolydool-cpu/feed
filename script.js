:root {
  --bg-1: #130f2f;
  --bg-2: #20163d;
  --bg-3: #2a1d4f;
  --panel: rgba(18, 24, 48, 0.82);
  --panel-soft: rgba(255, 255, 255, 0.06);
  --border: rgba(255, 255, 255, 0.14);
  --text: #f7f5ff;
  --muted: #cec5f7;
  --accent: #ff7ae6;
  --accent-2: #74f0ff;
  --accent-3: #ffd166;
  --success: #6ee7a8;
  --danger: #ff6a7d;
  --shadow: rgba(13, 8, 24, 0.45);
}

* {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: 'Fredoka', sans-serif;
  background: radial-gradient(circle at top, rgba(127, 102, 255, 0.38), transparent 25%),
    linear-gradient(180deg, var(--bg-3), var(--bg-2) 35%, var(--bg-1) 100%);
  color: var(--text);
}

button,
input {
  font: inherit;
}

button {
  border: none;
}

.page-shell {
  max-width: 1320px;
  margin: 0 auto;
  padding: 22px 18px 42px;
}

.topbar,
.stage-header,
.score-row,
.game-btn,
.primary-btn,
.secondary-btn,
.ghost-btn,
.topbar-actions,
.status-row,
.stats-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topbar {
  gap: 16px;
  margin-bottom: 20px;
}

.topbar-actions {
  gap: 10px;
  flex-wrap: wrap;
}

.eyebrow {
  margin: 0 0 6px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.72rem;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1 {
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  margin-bottom: 0;
}

.stats-row {
  gap: 14px;
  margin-bottom: 22px;
  flex-wrap: wrap;
}

.stat-card {
  flex: 1 1 170px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 18px 20px;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.12);
}

.stat-label {
  display: block;
  color: var(--muted);
  font-size: 0.76rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 8px;
}

.stat-card strong {
  font-size: clamp(1.5rem, 3vw, 2.1rem);
}

.main-layout {
  display: grid;
  grid-template-columns: minmax(270px, 320px) 1fr;
  gap: 22px;
}

.panel {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 26px;
  box-shadow: 0 18px 40px var(--shadow);
  backdrop-filter: blur(16px);
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.sidebar .panel,
.game-stage .panel {
  padding: 22px 18px;
}

.game-list {
  display: grid;
  gap: 12px;
  margin-top: 16px;
}

.game-btn,
.primary-btn,
.secondary-btn,
.ghost-btn,
.choice-btn,
.simon-btn,
.tic-cell,
.memory-card {
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
}

.game-btn,
.primary-btn,
.secondary-btn,
.ghost-btn {
  border-radius: 14px;
  background: var(--panel-soft);
  color: var(--text);
  padding: 12px 14px;
  min-height: 48px;
}

.game-btn:hover,
.primary-btn:hover,
.secondary-btn:hover,
.ghost-btn:hover,
.choice-btn:hover,
.simon-btn:hover,
.tic-cell:hover,
.memory-card:hover {
  transform: translateY(-1px);
}

.game-btn.active {
  background: linear-gradient(135deg, rgba(255,122,230,0.32), rgba(116,240,255,0.24));
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.14);
}

.score-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.score-row {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px 14px;
  color: var(--muted);
}

.score-row strong {
  color: var(--text);
  font-size: 1.2rem;
}

.ghost-btn {
  justify-content: center;
  background: rgba(255, 255, 255, 0.06);
  color: var(--muted);
}

.game-stage {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.stage-header {
  gap: 16px;
}

.primary-btn {
  background: linear-gradient(135deg, var(--accent), #ff9d6c);
  color: #1d102a;
  font-weight: 700;
  box-shadow: 0 12px 22px rgba(255, 122, 230, 0.25);
}

.secondary-btn {
  background: rgba(255, 255, 255, 0.08);
}

.game-panel {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border);
  border-radius: 22px;
  padding: 22px 18px;
}

.game-panel h3 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 1.5rem;
}

.game-panel p {
  color: var(--muted);
}

.status-row {
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
  color: var(--muted);
}

.memory-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(70px, 1fr));
  gap: 12px;
  margin-top: 18px;
}

.memory-card {
  position: relative;
  aspect-ratio: 1 / 1;
  border-radius: 18px;
  border: 1px solid var(--border);
  background: linear-gradient(135deg, #4f3d8d, #232847);
  color: var(--text);
  font-size: clamp(2rem, 4vw, 2.6rem);
  display: grid;
  place-items: center;
  user-select: none;
}

.memory-card span {
  opacity: 0;
  transform: scale(0.75);
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.memory-card.revealed span,
.memory-card.matched span {
  opacity: 1;
  transform: scale(1);
}

.memory-card.revealed {
  background: linear-gradient(135deg, rgba(116,240,255,0.26), rgba(255,122,230,0.2));
}

.memory-card.matched {
  background: linear-gradient(135deg, rgba(110,231,168,0.26), rgba(116,240,255,0.18));
}

.tic-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(70px, 100px));
  gap: 10px;
  justify-content: center;
  margin: 18px auto 0;
}

.tic-cell {
  width: min(100%, 100px);
  height: min(100px, 25vw);
  border-radius: 18px;
  border: 1px solid var(--border);
  background: rgba(255,255,255,0.04);
  color: var(--text);
  font-size: clamp(2rem, 6vw, 2.8rem);
  font-weight: 700;
}

.reaction-area {
  display: grid;
  place-items: center;
  min-height: 200px;
  margin-top: 18px;
}

.reaction-btn {
  width: min(100%, 360px);
  min-height: 140px;
  border-radius: 26px;
  border: none;
  font-size: clamp(1.15rem, 3vw, 2rem);
  font-weight: 700;
  cursor: pointer;
  color: #091224;
}

.reaction-btn.waiting {
  background: linear-gradient(135deg, #ffd166, #ff9d6c);
}

.reaction-btn.ready {
  background: linear-gradient(135deg, #6ee7a8, #57d4ff);
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
  border-radius: 12px;
  border: 1px solid var(--border);
  background: rgba(255,255,255,0.04);
  color: var(--text);
  padding: 0 14px;
  font-size: 1.05rem;
}

.guess-box button {
  min-width: 124px;
}

.notice {
  margin-top: 18px;
  color: var(--muted);
}

.rps-grid,
.simon-grid {
  display: grid;
  gap: 12px;
  margin-top: 18px;
}

.rps-grid {
  grid-template-columns: repeat(3, minmax(90px, 1fr));
}

.choice-btn,
.simon-btn {
  border-radius: 18px;
  min-height: 74px;
  color: var(--text);
  border: 1px solid var(--border);
  background: rgba(255,255,255,0.04);
  font-weight: 600;
}

.choice-btn {
  font-size: 1.1rem;
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
  filter: brightness(1.25);
  box-shadow: 0 0 0 3px rgba(255,255,255,0.14), 0 10px 24px rgba(255,255,255,0.12);
}

.hidden {
  display: none !important;
}

@media (max-width: 860px) {
  .main-layout {
    grid-template-columns: 1fr;
  }

  .topbar,
  .stage-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .topbar-actions {
    width: 100%;
  }

  .topbar-actions .secondary-btn {
    flex: 1;
  }
}

@media (max-width: 480px) {
  .page-shell {
    padding-inline: 12px;
  }

  .stat-card {
    flex-basis: 100%;
  }

  .game-list {
    gap: 10px;
  }

  .game-btn,
  .primary-btn,
  .secondary-btn,
  .ghost-btn {
    min-height: 46px;
    padding: 10px 12px;
    font-size: 0.96rem;
  }

  .memory-grid {
    gap: 10px;
  }

  .tic-grid {
    gap: 8px;
  }

  .rps-grid,
  .simon-grid {
    grid-template-columns: repeat(2, minmax(120px, 1fr));
  }
}
