import { useCallback } from 'react';
import { presetTemplates, fontOptions } from '../../data/defaultCharacter';

const colourFields = [
  { key: 'primary', label: 'Primary Background' },
  { key: 'secondary', label: 'Secondary Colour' },
  { key: 'accent', label: 'Accent / Gold' },
  { key: 'text', label: 'Text Colour' },
  { key: 'background', label: 'Card Background' },
  { key: 'headerBg', label: 'Header Background' },
  { key: 'sectionBg', label: 'Section Background' },
  { key: 'border', label: 'Border Colour' },
  { key: 'statBg', label: 'Stat Box Background' },
];

export default function StyleEditor({ character, onChange }) {
  const updateColour = useCallback(
    (key, value) =>
      onChange({ ...character, colours: { ...character.colours, [key]: value } }),
    [character, onChange]
  );

  const applyPreset = useCallback(
    (preset) => onChange({ ...character, colours: { ...preset.colours } }),
    [character, onChange]
  );

  const updateFont = useCallback(
    (font) => onChange({ ...character, font }),
    [character, onChange]
  );

  const inputStyle = {
    marginLeft: '8px',
    borderRadius: '4px',
    border: '1px solid #555',
    cursor: 'pointer',
    height: '28px',
    width: '44px',
    padding: '2px',
    backgroundColor: 'transparent',
  };

  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '12px',
    color: '#aaa',
    marginBottom: '8px',
  };

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '8px', fontWeight: 'bold' }}>
          Presets
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {presetTemplates.map((preset) => (
            <button
              key={preset.id}
              title={preset.name}
              onClick={() => applyPreset(preset)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '2px solid #666',
                backgroundColor: preset.preview,
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              <span style={{
                position: 'absolute',
                bottom: '-18px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '9px',
                color: '#888',
                whiteSpace: 'nowrap',
              }}>
                {preset.name}
              </span>
            </button>
          ))}
        </div>
        <div style={{ height: '20px' }} />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '8px', fontWeight: 'bold' }}>
          Font
        </div>
        <select
          value={character.font}
          onChange={(e) => updateFont(e.target.value)}
          style={{
            width: '100%',
            padding: '6px 8px',
            borderRadius: '4px',
            border: '1px solid #555',
            backgroundColor: '#1e1e1e',
            color: '#eee',
            fontSize: '12px',
          }}
        >
          {fontOptions.map((opt) => (
            <option key={opt.value} value={opt.value} style={{ fontFamily: opt.value }}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '8px', fontWeight: 'bold' }}>
          Colours
        </div>
        {colourFields.map(({ key, label }) => (
          <div key={key} style={labelStyle}>
            <span>{label}</span>
            <input
              type="color"
              style={inputStyle}
              value={character.colours[key]}
              onChange={(e) => updateColour(key, e.target.value)}
              title={label}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
