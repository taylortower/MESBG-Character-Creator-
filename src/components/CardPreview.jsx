import { forwardRef } from 'react';
import { statLabels, statTooltips } from '../data/defaultCharacter';

const CardPreview = forwardRef(function CardPreview({ character }, ref) {
  const { colours, font } = character;

  const cardStyle = {
    fontFamily: font,
    backgroundColor: colours.background,
    color: colours.text,
    border: `3px solid ${colours.border}`,
    borderRadius: '8px',
    width: '380px',
    minWidth: '380px',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: `0 0 20px ${colours.border}88, inset 0 0 40px ${colours.background}`,
  };

  const headerStyle = {
    background: `linear-gradient(135deg, ${colours.headerBg}, ${colours.primary})`,
    borderBottom: `2px solid ${colours.border}`,
    padding: '12px 16px 8px',
    position: 'relative',
  };

  const sectionStyle = {
    backgroundColor: colours.sectionBg,
    border: `1px solid ${colours.border}`,
    borderRadius: '4px',
    margin: '8px',
    padding: '6px 10px',
  };

  const sectionTitleStyle = {
    color: colours.accent,
    fontSize: '11px',
    fontWeight: 'bold',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    borderBottom: `1px solid ${colours.border}`,
    paddingBottom: '4px',
    marginBottom: '6px',
  };

  const statBoxStyle = {
    backgroundColor: colours.statBg,
    border: `1px solid ${colours.border}`,
    borderRadius: '4px',
    textAlign: 'center',
    padding: '4px 2px',
    flex: 1,
  };

  const statKeys = Object.keys(statLabels);

  return (
    <div ref={ref} style={cardStyle} id="card-preview">
      {/* Corner decorations */}
      <CornerDecoration colour={colours.accent} position="top-left" />
      <CornerDecoration colour={colours.accent} position="top-right" />
      <CornerDecoration colour={colours.accent} position="bottom-left" />
      <CornerDecoration colour={colours.accent} position="bottom-right" />

      {/* Header with image */}
      <div style={headerStyle}>
        {character.image && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '110px',
              height: '100%',
              overflow: 'hidden',
              borderLeft: `2px solid ${colours.border}`,
            }}
          >
            <img
              src={character.image}
              alt="Character"
              style={{
                width: `${100 * character.imageScale}%`,
                height: '100%',
                objectFit: 'cover',
                objectPosition: `${character.imagePosition.x}% ${character.imagePosition.y}%`,
                display: 'block',
              }}
              crossOrigin="anonymous"
            />
          </div>
        )}
        <div style={{ paddingRight: character.image ? '120px' : '0' }}>
          <div
            style={{
              color: colours.accent,
              fontSize: '22px',
              fontWeight: 'bold',
              lineHeight: 1.2,
              textShadow: `1px 1px 2px ${colours.background}`,
              letterSpacing: '1px',
            }}
          >
            {character.name || 'Character Name'}
          </div>
          {character.title && (
            <div
              style={{
                color: colours.secondary,
                fontSize: '13px',
                fontStyle: 'italic',
                marginTop: '2px',
              }}
            >
              {character.title}
            </div>
          )}
          {character.description && (
            <div
              style={{
                color: colours.text,
                fontSize: '11px',
                marginTop: '4px',
                opacity: 0.85,
                lineHeight: 1.4,
              }}
            >
              {character.description}
            </div>
          )}
          <div
            style={{
              marginTop: '6px',
              display: 'inline-block',
              backgroundColor: colours.accent + '33',
              border: `1px solid ${colours.accent}`,
              borderRadius: '3px',
              padding: '1px 8px',
              fontSize: '11px',
              color: colours.accent,
            }}
          >
            {character.points} pts
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ margin: '8px', padding: '6px 10px', backgroundColor: colours.sectionBg, border: `1px solid ${colours.border}`, borderRadius: '4px' }}>
        <div style={sectionTitleStyle}>Stats</div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {statKeys.map((key) => (
            <div key={key} style={statBoxStyle} title={statTooltips[key]}>
              <div style={{ fontSize: '9px', color: colours.secondary, fontWeight: 'bold', letterSpacing: '0.5px' }}>
                {statLabels[key]}
              </div>
              <div style={{ fontSize: '13px', fontWeight: 'bold', color: colours.accent, marginTop: '1px' }}>
                {character.stats[key] ?? '-'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wargear */}
      {character.wargear.length > 0 && (
        <div style={sectionStyle}>
          <div style={sectionTitleStyle}>Wargear</div>
          <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', lineHeight: 1.6 }}>
            {character.wargear.map((item, i) => (
              <li key={i} style={{ color: colours.text }}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Heroic Actions */}
      {character.heroicActions.length > 0 && (
        <div style={sectionStyle}>
          <div style={sectionTitleStyle}>Heroic Actions</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {character.heroicActions.map((action, i) => (
              <span
                key={i}
                style={{
                  backgroundColor: colours.accent + '22',
                  border: `1px solid ${colours.accent}66`,
                  borderRadius: '3px',
                  padding: '2px 6px',
                  fontSize: '11px',
                  color: colours.accent,
                }}
              >
                {action}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Special Rules */}
      {character.specialRules.length > 0 && (
        <div style={sectionStyle}>
          <div style={sectionTitleStyle}>Special Rules</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
            <tbody>
              {character.specialRules.map((rule, i) => (
                <tr key={i} style={{ borderBottom: i < character.specialRules.length - 1 ? `1px solid ${colours.border}44` : 'none' }}>
                  <td style={{ padding: '3px 4px 3px 0', fontWeight: 'bold', color: colours.accent, whiteSpace: 'nowrap', verticalAlign: 'top' }}>
                    {rule.name}
                  </td>
                  {rule.range !== undefined && (
                    <td style={{ padding: '3px 4px', color: colours.secondary, textAlign: 'center', whiteSpace: 'nowrap', verticalAlign: 'top' }}>
                      {rule.range}
                    </td>
                  )}
                  <td style={{ padding: '3px 0 3px 4px', color: colours.text, lineHeight: 1.4, verticalAlign: 'top' }}>
                    {rule.description || rule.modifiers || ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Bottom border decoration */}
      <div
        style={{
          height: '6px',
          background: `linear-gradient(90deg, ${colours.background}, ${colours.accent}, ${colours.secondary}, ${colours.accent}, ${colours.background})`,
          margin: '8px 8px 4px',
          borderRadius: '3px',
          opacity: 0.7,
        }}
      />
    </div>
  );
});

function CornerDecoration({ colour, position }) {
  const size = 18;
  const posStyles = {
    'top-left': { top: 4, left: 4 },
    'top-right': { top: 4, right: 4, transform: 'rotate(90deg)' },
    'bottom-left': { bottom: 4, left: 4, transform: 'rotate(270deg)' },
    'bottom-right': { bottom: 4, right: 4, transform: 'rotate(180deg)' },
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      style={{ position: 'absolute', zIndex: 10, ...posStyles[position] }}
    >
      <path d="M2,2 L2,10 M2,2 L10,2" stroke={colour} strokeWidth="2" fill="none" />
      <circle cx="2" cy="2" r="2" fill={colour} />
    </svg>
  );
}

export default CardPreview;
