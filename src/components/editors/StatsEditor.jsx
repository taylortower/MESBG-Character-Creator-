import { useCallback } from 'react';
import { statLabels, statTooltips } from '../../data/defaultCharacter';

export default function StatsEditor({ character, onChange }) {
  const updateStat = useCallback(
    (key, value) =>
      onChange({ ...character, stats: { ...character.stats, [key]: value } }),
    [character, onChange]
  );

  const inputStyle = {
    width: '100%',
    padding: '5px 6px',
    borderRadius: '4px',
    border: '1px solid #555',
    backgroundColor: '#1e1e1e',
    color: '#eee',
    fontSize: '13px',
    textAlign: 'center',
    boxSizing: 'border-box',
    marginTop: '3px',
  };

  const statGroups = [
    ['Mv', 'F', 'S', 'D', 'A', 'W', 'C'],
    ['M', 'W2', 'F2'],
  ];

  return (
    <div>
      {statGroups.map((group, gi) => (
        <div
          key={gi}
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${group.length}, 1fr)`,
            gap: '8px',
            marginBottom: '12px',
          }}
        >
          {group.map((key) => (
            <label
              key={key}
              style={{ display: 'block', fontSize: '11px', color: '#aaa', textAlign: 'center' }}
              title={statTooltips[key]}
            >
              {statLabels[key]}
              <br />
              <span style={{ fontSize: '9px', color: '#666' }}>{statTooltips[key]}</span>
              <input
                style={inputStyle}
                value={character.stats[key] ?? ''}
                onChange={(e) => updateStat(key, e.target.value)}
                placeholder="-"
              />
            </label>
          ))}
        </div>
      ))}
      <p style={{ fontSize: '11px', color: '#666', margin: '4px 0 0' }}>
        Tip: Enter values like <code style={{ color: '#888' }}>6&quot;</code> for Move,{' '}
        <code style={{ color: '#888' }}>5/4+</code> for Fight/Shoot.
      </p>
    </div>
  );
}
