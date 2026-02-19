import { useState, useCallback } from 'react';
import { exportAsPNG, exportAsPDF } from '../utils/export';
import { encodeCharacterToURL } from '../utils/share';

export default function ActionBar({ cardRef, character }) {
  const [exporting, setExporting] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const handleExportPNG = useCallback(async () => {
    if (!cardRef.current) return;
    setExporting(true);
    try {
      await exportAsPNG(cardRef.current, `${character.name || 'card'}.png`);
    } catch (err) {
      alert('Export failed: ' + err.message);
    }
    setExporting(false);
  }, [cardRef, character.name]);

  const handleExportPDF = useCallback(async () => {
    if (!cardRef.current) return;
    setExporting(true);
    try {
      await exportAsPDF(cardRef.current, `${character.name || 'card'}.pdf`);
    } catch (err) {
      alert('Export failed: ' + err.message);
    }
    setExporting(false);
  }, [cardRef, character.name]);

  const handleShare = useCallback(() => {
    const url = encodeCharacterToURL(character);
    setShareUrl(url);
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }, [character]);

  const btnStyle = (colour = '#2a2a2a', textColour = '#ccc') => ({
    padding: '8px 14px',
    borderRadius: '4px',
    border: 'none',
    cursor: exporting ? 'not-allowed' : 'pointer',
    fontSize: '13px',
    backgroundColor: colour,
    color: textColour,
    opacity: exporting ? 0.7 : 1,
    transition: 'opacity 0.2s',
  });

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
        <button style={btnStyle('#1a3a4a', '#88ccff')} onClick={handleExportPNG} disabled={exporting}>
          {exporting ? '⏳ Exporting...' : '🖼 Export PNG'}
        </button>
        <button style={btnStyle('#1a2a3a', '#6699cc')} onClick={handleExportPDF} disabled={exporting}>
          {exporting ? '⏳ Exporting...' : '📄 Export PDF'}
        </button>
        <button style={btnStyle('#2a1a3a', '#aa88cc')} onClick={handleShare}>
          {copied ? '✅ Copied!' : '🔗 Share Link'}
        </button>
      </div>
      {shareUrl && (
        <div
          style={{
            backgroundColor: '#1a1a2a',
            border: '1px solid #444',
            borderRadius: '4px',
            padding: '8px',
            fontSize: '11px',
            color: '#888',
            wordBreak: 'break-all',
          }}
        >
          {shareUrl}
        </div>
      )}
    </div>
  );
}
