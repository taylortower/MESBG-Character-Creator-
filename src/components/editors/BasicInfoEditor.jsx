import { useCallback } from 'react';

export default function BasicInfoEditor({ character, onChange }) {
  const update = useCallback(
    (field, value) => onChange({ ...character, [field]: value }),
    [character, onChange]
  );

  const inputStyle = {
    width: '100%',
    padding: '6px 8px',
    borderRadius: '4px',
    border: '1px solid #555',
    backgroundColor: '#1e1e1e',
    color: '#eee',
    fontSize: '13px',
    boxSizing: 'border-box',
    marginTop: '3px',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '12px',
    color: '#aaa',
    marginBottom: '10px',
  };

  return (
    <div>
      <label style={labelStyle}>
        Character Name
        <input
          style={inputStyle}
          value={character.name}
          onChange={(e) => update('name', e.target.value)}
          placeholder="e.g. Aragorn"
        />
      </label>
      <label style={labelStyle}>
        Title / Subtitle
        <input
          style={inputStyle}
          value={character.title}
          onChange={(e) => update('title', e.target.value)}
          placeholder="e.g. King Elessar"
        />
      </label>
      <label style={labelStyle}>
        Description
        <textarea
          style={{ ...inputStyle, resize: 'vertical', minHeight: '60px' }}
          value={character.description}
          onChange={(e) => update('description', e.target.value)}
          placeholder="A short character description..."
        />
      </label>
      <label style={labelStyle}>
        Points Cost
        <input
          style={inputStyle}
          type="number"
          min={0}
          value={character.points}
          onChange={(e) => update('points', Number(e.target.value))}
        />
      </label>
    </div>
  );
}
