import { useState, useRef, useEffect, useCallback } from 'react';
import CardPreview from './components/CardPreview';
import CharacterEditor from './components/CharacterEditor';
import TemplatesPanel from './components/TemplatesPanel';
import ActionBar from './components/ActionBar';
import { defaultCharacter } from './data/defaultCharacter';
import { decodeCharacterFromURL } from './utils/share';
import './App.css';

function App() {
  const [character, setCharacter] = useState(() => {
    const fromUrl = decodeCharacterFromURL();
    return fromUrl || defaultCharacter;
  });
  const [showTemplates, setShowTemplates] = useState(false);
  const cardRef = useRef(null);

  const handleReset = useCallback(() => {
    if (window.confirm('Reset to default character? All unsaved changes will be lost.')) {
      setCharacter(defaultCharacter);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('card')) {
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-title">
          <span className="header-icon">⚔️</span>
          <h1>MESBG Character Card Creator</h1>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => setShowTemplates(!showTemplates)}>
            {showTemplates ? '✕ Close Templates' : '📂 Templates'}
          </button>
          <button className="btn-secondary" onClick={handleReset}>
            🔄 Reset
          </button>
        </div>
      </header>

      <main className="app-main">
        <aside className="editor-panel">
          <div className="panel-section">
            <h2 className="panel-title">Edit Character</h2>
            <CharacterEditor character={character} onChange={setCharacter} />
          </div>

          <div className="panel-section">
            <h2 className="panel-title">Export &amp; Share</h2>
            <ActionBar cardRef={cardRef} character={character} />
          </div>

          {showTemplates && (
            <div className="panel-section">
              <h2 className="panel-title">Saved Templates</h2>
              <TemplatesPanel
                character={character}
                onLoad={(c) => { setCharacter(c); setShowTemplates(false); }}
              />
            </div>
          )}
        </aside>

        <section className="preview-panel">
          <h2 className="panel-title preview-label">Live Preview</h2>
          <div className="preview-wrapper">
            <CardPreview ref={cardRef} character={character} />
          </div>
          <p className="preview-hint">
            Changes update in real time. Use Export to download your card.
          </p>
        </section>
      </main>

      <footer className="app-footer">
        <p>MESBG Character Card Creator — Client-side only, no data is uploaded.</p>
      </footer>
    </div>
  );
}

export default App;
