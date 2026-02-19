import { useCallback, useState } from 'react';

const emptyRule = () => ({ name: '', description: '', range: '', modifiers: '' });

export default function SpecialRulesEditor({ character, onChange }) {
  const [newRule, setNewRule] = useState(emptyRule());

  const addRule = useCallback(() => {
    if (!newRule.name.trim()) return;
    onChange({ ...character, specialRules: [...character.specialRules, { ...newRule }] });
    setNewRule(emptyRule());
  }, [newRule, character, onChange]);

  const removeRule = useCallback(
    (i) =>
      onChange({
        ...character,
        specialRules: character.specialRules.filter((_, idx) => idx !== i),
      }),
    [character, onChange]
  );

  const editRule = useCallback(
    (i, field, value) =>
      onChange({
        ...character,
        specialRules: character.specialRules.map((r, idx) =>
          idx === i ? { ...r, [field]: value } : r
        ),
      }),
    [character, onChange]
  );

  const inputStyle = {
    padding: '5px 8px',
    borderRadius: '4px',
    border: '1px solid #c9a84c',
    backgroundColor: '#ffffff',
    color: '#3b1e08',
    fontSize: '12px',
    boxSizing: 'border-box',
    width: '100%',
  };

  const btnStyle = (variant = 'normal') => ({
    padding: '5px 10px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '12px',
    backgroundColor: variant === 'danger' ? '#fce8e8' : variant === 'add' ? '#e8f4e8' : '#faf4ea',
    color: variant === 'danger' ? '#8b1414' : variant === 'add' ? '#1a6a1a' : '#5a3010',
  });

  const ruleCardStyle = {
    backgroundColor: '#faf8f5',
    border: '1px solid #e8d8c0',
    borderRadius: '6px',
    padding: '10px',
    marginBottom: '10px',
  };

  const fieldLabel = (text) => (
    <div style={{ fontSize: '10px', color: '#8b6914', marginBottom: '2px', marginTop: '6px' }}>{text}</div>
  );

  return (
    <div>
      <div style={{ fontSize: '12px', color: '#5a3010', marginBottom: '10px', fontWeight: 'bold' }}>
        Special Rules / Abilities
      </div>

      {character.specialRules.map((rule, i) => (
        <div key={i} style={ruleCardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#3b1e08', fontWeight: 'bold' }}>{rule.name || '(unnamed)'}</span>
            <button style={btnStyle('danger')} onClick={() => removeRule(i)}>✕ Remove</button>
          </div>
          {fieldLabel('Name')}
          <input style={inputStyle} value={rule.name} onChange={(e) => editRule(i, 'name', e.target.value)} />
          {fieldLabel('Range (optional)')}
          <input style={inputStyle} value={rule.range || ''} onChange={(e) => editRule(i, 'range', e.target.value)} placeholder='e.g. 12"' />
          {fieldLabel('Description')}
          <textarea
            style={{ ...inputStyle, resize: 'vertical', minHeight: '50px' }}
            value={rule.description || rule.modifiers || ''}
            onChange={(e) => editRule(i, 'description', e.target.value)}
          />
        </div>
      ))}

      <div style={{ ...ruleCardStyle, border: '1px dashed #c9a84c' }}>
        <div style={{ fontSize: '11px', color: '#8b6914', marginBottom: '8px' }}>Add New Rule</div>
        {fieldLabel('Name *')}
        <input style={inputStyle} value={newRule.name} onChange={(e) => setNewRule({ ...newRule, name: e.target.value })} placeholder="e.g. Kingly Presence" />
        {fieldLabel('Range (optional)')}
        <input style={inputStyle} value={newRule.range} onChange={(e) => setNewRule({ ...newRule, range: e.target.value })} placeholder='e.g. 12"' />
        {fieldLabel('Description')}
        <textarea
          style={{ ...inputStyle, resize: 'vertical', minHeight: '50px' }}
          value={newRule.description}
          onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
          placeholder="Effect description..."
        />
        <button style={{ ...btnStyle('add'), marginTop: '8px', width: '100%' }} onClick={addRule}>
          + Add Special Rule
        </button>
      </div>
    </div>
  );
}
