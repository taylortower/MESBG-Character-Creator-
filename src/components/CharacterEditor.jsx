import { useState } from 'react';
import BasicInfoEditor from './editors/BasicInfoEditor';
import StatsEditor from './editors/StatsEditor';
import WargearEditor from './editors/WargearEditor';
import SpecialRulesEditor from './editors/SpecialRulesEditor';
import ImageEditor from './editors/ImageEditor';
import StyleEditor from './editors/StyleEditor';

const tabs = [
  { id: 'info', label: '📋 Info' },
  { id: 'stats', label: '⚔️ Stats' },
  { id: 'wargear', label: '🛡 Wargear' },
  { id: 'rules', label: '✨ Rules' },
  { id: 'image', label: '🖼 Image' },
  { id: 'style', label: '🎨 Style' },
];

export default function CharacterEditor({ character, onChange }) {
  const [activeTab, setActiveTab] = useState('info');

  const tabBarStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2px',
    marginBottom: '16px',
    borderBottom: '1px solid #444',
    paddingBottom: '8px',
  };

  const tabStyle = (isActive) => ({
    padding: '6px 10px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '12px',
    backgroundColor: isActive ? '#3a3a5c' : '#1e1e1e',
    color: isActive ? '#aaaaff' : '#888',
    fontWeight: isActive ? 'bold' : 'normal',
    transition: 'all 0.15s',
  });

  return (
    <div>
      <div style={tabBarStyle}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            style={tabStyle(activeTab === tab.id)}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>
        {activeTab === 'info' && (
          <BasicInfoEditor character={character} onChange={onChange} />
        )}
        {activeTab === 'stats' && (
          <StatsEditor character={character} onChange={onChange} />
        )}
        {activeTab === 'wargear' && (
          <WargearEditor character={character} onChange={onChange} />
        )}
        {activeTab === 'rules' && (
          <SpecialRulesEditor character={character} onChange={onChange} />
        )}
        {activeTab === 'image' && (
          <ImageEditor character={character} onChange={onChange} />
        )}
        {activeTab === 'style' && (
          <StyleEditor character={character} onChange={onChange} />
        )}
      </div>
    </div>
  );
}
