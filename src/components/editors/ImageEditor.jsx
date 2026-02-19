import { useCallback, useRef } from 'react';

export default function ImageEditor({ character, onChange }) {
  const fileInputRef = useRef();

  const handleFileChange = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => onChange({ ...character, image: ev.target.result });
      reader.readAsDataURL(file);
    },
    [character, onChange]
  );

  const removeImage = useCallback(
    () => onChange({ ...character, image: null }),
    [character, onChange]
  );

  const updatePos = useCallback(
    (axis, value) =>
      onChange({
        ...character,
        imagePosition: { ...character.imagePosition, [axis]: Number(value) },
      }),
    [character, onChange]
  );

  const updateScale = useCallback(
    (value) => onChange({ ...character, imageScale: Number(value) }),
    [character, onChange]
  );

  const inputStyle = {
    width: '100%',
    padding: '5px 8px',
    borderRadius: '4px',
    border: '1px solid #555',
    backgroundColor: '#1e1e1e',
    color: '#eee',
    fontSize: '12px',
    boxSizing: 'border-box',
    marginTop: '3px',
  };

  const labelStyle = { display: 'block', fontSize: '12px', color: '#aaa', marginBottom: '10px' };

  return (
    <div>
      <div style={{ marginBottom: '12px' }}>
        <button
          style={{
            width: '100%',
            padding: '10px',
            border: '2px dashed #555',
            borderRadius: '6px',
            backgroundColor: '#1a1a1a',
            color: '#aaa',
            cursor: 'pointer',
            fontSize: '13px',
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          {character.image ? '🖼 Change Image' : '📁 Upload Character Image'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>

      {character.image && (
        <>
          <div style={{ marginBottom: '12px', textAlign: 'center' }}>
            <img
              src={character.image}
              alt="Preview"
              style={{ maxWidth: '100%', maxHeight: '120px', borderRadius: '4px', border: '1px solid #555' }}
            />
          </div>

          <label style={labelStyle}>
            Horizontal Position: {character.imagePosition.x}%
            <input
              type="range"
              style={{ ...inputStyle, padding: '0' }}
              min={0}
              max={100}
              value={character.imagePosition.x}
              onChange={(e) => updatePos('x', e.target.value)}
            />
          </label>

          <label style={labelStyle}>
            Vertical Position: {character.imagePosition.y}%
            <input
              type="range"
              style={{ ...inputStyle, padding: '0' }}
              min={0}
              max={100}
              value={character.imagePosition.y}
              onChange={(e) => updatePos('y', e.target.value)}
            />
          </label>

          <label style={labelStyle}>
            Scale: {character.imageScale.toFixed(1)}x
            <input
              type="range"
              style={{ ...inputStyle, padding: '0' }}
              min={0.5}
              max={2}
              step={0.1}
              value={character.imageScale}
              onChange={(e) => updateScale(e.target.value)}
            />
          </label>

          <button
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: '#5c2020',
              color: '#ff8888',
              cursor: 'pointer',
              fontSize: '12px',
            }}
            onClick={removeImage}
          >
            ✕ Remove Image
          </button>
        </>
      )}
    </div>
  );
}
