import { useState, useCallback } from 'react';
import { saveTemplate, loadAllTemplates, deleteTemplate } from '../utils/storage';

export default function TemplatesPanel({ character, onLoad }) {
  const [templates, setTemplates] = useState(() => loadAllTemplates());
  const [saveName, setSaveName] = useState('');
  const [showSave, setShowSave] = useState(false);

  const refresh = () => setTemplates(loadAllTemplates());

  const handleSave = useCallback(() => {
    const name = saveName.trim() || character.name || 'My Template';
    saveTemplate(character, name);
    setSaveName('');
    setShowSave(false);
    refresh();
  }, [saveName, character]);

  const handleDelete = useCallback((id) => {
    deleteTemplate(id);
    refresh();
  }, []);

  const inputStyle = {
    flex: 1,
    padding: '5px 8px',
    borderRadius: '4px',
    border: '1px solid #c9a84c',
    backgroundColor: '#ffffff',
    color: '#3b1e08',
    fontSize: '12px',
  };

  const templateList = Object.values(templates).sort(
    (a, b) => new Date(b.savedAt) - new Date(a.savedAt)
  );

  return (
    <div>
      <div style={{ marginBottom: '12px' }}>
        {!showSave ? (
          <button
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #c9a84c',
              backgroundColor: '#e8f4e8',
              color: '#1a5a1a',
              cursor: 'pointer',
              fontSize: '13px',
            }}
            onClick={() => setShowSave(true)}
          >
            💾 Save Current Template
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '6px' }}>
            <input
              style={inputStyle}
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              placeholder={character.name || 'Template name'}
              autoFocus
            />
            <button
              style={{ padding: '5px 12px', borderRadius: '4px', border: 'none', backgroundColor: '#e8f4e8', color: '#1a5a1a', cursor: 'pointer' }}
              onClick={handleSave}
            >
              Save
            </button>
            <button
              style={{ padding: '5px 8px', borderRadius: '4px', border: 'none', backgroundColor: '#faf4ea', color: '#5a3010', cursor: 'pointer' }}
              onClick={() => setShowSave(false)}
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {templateList.length === 0 ? (
        <p style={{ fontSize: '12px', color: '#8b6914', textAlign: 'center', padding: '16px 0' }}>
          No saved templates yet.
        </p>
      ) : (
        <div>
          {templateList.map((t) => (
            <div
              key={t.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #e8d8c0',
                backgroundColor: '#faf8f5',
                marginBottom: '6px',
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', color: '#3b1e08', fontWeight: 'bold' }}>{t.name}</div>
                <div style={{ fontSize: '10px', color: '#8b6914' }}>
                  {new Date(t.savedAt).toLocaleDateString()}
                </div>
              </div>
              <button
                style={{ padding: '4px 10px', borderRadius: '4px', border: 'none', backgroundColor: '#e8f0f8', color: '#1a3a6a', cursor: 'pointer', fontSize: '11px' }}
                onClick={() => onLoad(t.character)}
              >
                Load
              </button>
              <button
                style={{ padding: '4px 8px', borderRadius: '4px', border: 'none', backgroundColor: '#fce8e8', color: '#8b1414', cursor: 'pointer', fontSize: '11px' }}
                onClick={() => handleDelete(t.id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
