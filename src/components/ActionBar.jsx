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

  const btnStyle = (colour = '#faf4ea', textColour = '#5a3010') => ({
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
        <button style={btnStyle('#e8f0f8', '#1a3a6a')} onClick={handleExportPNG} disabled={exporting}>
          {exporting ? '⏳ Exporting...' : '🖼 Export PNG'}
        </button>
        <button style={btnStyle('#e0e8f5', '#1a306a')} onClick={handleExportPDF} disabled={exporting}>
          {exporting ? '⏳ Exporting...' : '📄 Export PDF'}
        </button>
        <button style={btnStyle('#f0e8f8', '#5a1a8b')} onClick={handleShare}>
          {copied ? '✅ Copied!' : '🔗 Share Link'}
        </button>
      </div>
      {shareUrl && (
        <div
          style={{
            backgroundColor: '#faf8f5',
            border: '1px solid #e8d8c0',
            borderRadius: '4px',
            padding: '8px',
            fontSize: '11px',
            color: '#5a3010',
            wordBreak: 'break-all',
          }}
        >
          {shareUrl}
        </div>
      )}
    </div>
  );
}
