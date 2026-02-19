import { useCallback, useState } from 'react';

function ListEditor({ items, onChange, placeholder = 'Add item...' }) {
  const [newItem, setNewItem] = useState('');

  const addItem = useCallback(() => {
    const trimmed = newItem.trim();
    if (!trimmed) return;
    onChange([...items, trimmed]);
    setNewItem('');
  }, [newItem, items, onChange]);

  const removeItem = useCallback(
    (i) => onChange(items.filter((_, idx) => idx !== i)),
    [items, onChange]
  );

  const editItem = useCallback(
    (i, value) => onChange(items.map((item, idx) => (idx === i ? value : item))),
    [items, onChange]
  );

  const inputStyle = {
    flex: 1,
    padding: '5px 8px',
    borderRadius: '4px',
    border: '1px solid #555',
    backgroundColor: '#1e1e1e',
    color: '#eee',
    fontSize: '12px',
  };

  const btnStyle = (variant = 'normal') => ({
    padding: '5px 10px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '12px',
    backgroundColor: variant === 'danger' ? '#5c2020' : variant === 'add' ? '#1a4a1a' : '#2a2a2a',
    color: variant === 'danger' ? '#ff8888' : variant === 'add' ? '#88ff88' : '#ccc',
  });

  return (
    <div>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}>
          <input
            style={inputStyle}
            value={item}
            onChange={(e) => editItem(i, e.target.value)}
          />
          <button style={btnStyle('danger')} onClick={() => removeItem(i)} title="Remove">
            ✕
          </button>
        </div>
      ))}
      <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
        <input
          style={inputStyle}
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addItem()}
          placeholder={placeholder}
        />
        <button style={btnStyle('add')} onClick={addItem}>
          + Add
        </button>
      </div>
    </div>
  );
}

export default function WargearEditor({ character, onChange }) {
  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '6px', fontWeight: 'bold' }}>
          Wargear / Equipment
        </div>
        <ListEditor
          items={character.wargear}
          onChange={(wargear) => onChange({ ...character, wargear })}
          placeholder="e.g. Sword (hand weapon)"
        />
      </div>
      <div>
        <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '6px', fontWeight: 'bold' }}>
          Heroic Actions
        </div>
        <ListEditor
          items={character.heroicActions}
          onChange={(heroicActions) => onChange({ ...character, heroicActions })}
          placeholder="e.g. Heroic Strike"
        />
      </div>
    </div>
  );
}
