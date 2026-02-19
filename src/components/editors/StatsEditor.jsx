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
    border: '1px solid #c9a84c',
    backgroundColor: '#ffffff',
    color: '#3b1e08',
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
              style={{ display: 'block', fontSize: '11px', color: '#5a3010', textAlign: 'center' }}
              title={statTooltips[key]}
            >
              {statLabels[key]}
              <br />
              <span style={{ fontSize: '9px', color: '#8b6914' }}>{statTooltips[key]}</span>
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
      <p style={{ fontSize: '11px', color: '#8b6914', margin: '4px 0 0' }}>
        Tip: Enter values like <code style={{ color: '#6b4e1f' }}>6&quot;</code> for Move,{' '}
        <code style={{ color: '#6b4e1f' }}>5/4+</code> for Fight/Shoot.
      </p>
    </div>
  );
}
