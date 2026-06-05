'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Reveal,
  SectionHeader,
  IcCheck,
  IcSparkles,
  PLATFORMS,
  type Platform,
} from './shared';

function ActionRow({
  platform,
  label,
  priority,
  index,
  isDragging,
  isOver,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: {
  platform: Platform;
  label: string;
  priority: string;
  index: number;
  isDragging: boolean;
  isOver: boolean;
  onDragStart: (i: number) => void;
  onDragOver: (i: number) => void;
  onDrop: (i: number) => void;
  onDragEnd: () => void;
}) {
  const Icon = platform.Icon;
  return (
    <li
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = 'move';
        onDragStart(index);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        onDragOver(index);
      }}
      onDrop={(e) => {
        e.preventDefault();
        onDrop(index);
      }}
      onDragEnd={onDragEnd}
      className={`fn-action-tile ${isDragging ? 'is-dragging' : ''} ${
        isOver ? 'drag-over' : ''
      }`}
      style={{ listStyle: 'none' }}
    >
      <span className="fn-prio-num">{index + 1}</span>
      <span
        className="fn-action-icon"
        style={{
          background: platform.bg,
          border: platform.border ? '1px solid var(--border-default)' : 'none',
        }}
      >
        <Icon size={20} />
      </span>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 15,
            color: 'var(--text-primary)',
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 11,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginTop: 2,
          }}
        >
          {priority}
        </div>
      </div>
      <span
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          color: 'var(--text-muted)',
          lineHeight: 0.6,
          fontSize: 14,
          cursor: 'grab',
          padding: '0 4px',
        }}
        aria-hidden
      >
        ⋮⋮
      </span>
    </li>
  );
}

export const Section2Actions = () => {
  const t = useTranslations('features.actions');
  const initial = [
    'google',
    'instagram',
    'trip',
    'facebook',
    'newsletter',
    'tiktok',
    'trust',
  ];
  const [order, setOrder] = useState(initial);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);
  const orderRef = useRef(initial);

  const bullets = t.raw('bullets') as string[];
  const priorities = t.raw('priorities') as string[];

  const platformById = (id: string) => PLATFORMS.find((p) => p.id === id);
  const labelFor = (id: string) => t(`platforms.${id}`);
  const priorityFor = (i: number) =>
    i === 0 ? priorities[0] : i === 1 ? priorities[1] : priorities[2];

  const reorder = (from: number | null, to: number | null) => {
    if (from === to || from == null || to == null) return;
    const next = [...orderRef.current];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    orderRef.current = next;
    setOrder(next);
  };

  return (
    <section
      className="fn-section"
      id="actions"
      style={{ background: 'var(--bg-elevated)' }}
    >
      <div className="fn-container">
        <div className="fn-twocol">
          {/* LEFT — copy */}
          <div>
            <SectionHeader
              title={
                <>
                  {t('title')}
                  <br />
                  <span className="hl-orange">{t('titleGradient')}</span>
                </>
              }
              lead={t('lead')}
              maxLead={520}
            />

            <Reveal delay={2}>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  maxWidth: 460,
                }}
              >
                {bullets.map((text, i) => (
                  <li
                    key={i}
                    style={{ display: 'flex', gap: 12, alignItems: 'center' }}
                  >
                    <span
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: '50%',
                        background: 'var(--gradient-primary)',
                        color: '#fff',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <IcCheck size={12} />
                    </span>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: 15,
                        color: 'var(--text-primary)',
                      }}
                    >
                      {text}
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* RIGHT — interactive priority list */}
          <Reveal delay={2}>
            <div
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-default)',
                borderRadius: 24,
                padding: '26px 26px 22px',
                boxShadow: '0 14px 36px rgba(15,23,42,0.06)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 18,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: 16,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {t('card.title')}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                    {t('card.subtitle')}
                  </div>
                </div>
                <button
                  onClick={() => {
                    orderRef.current = initial;
                    setOrder(initial);
                  }}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 11,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    padding: '8px 14px',
                    borderRadius: 9999,
                    border: '1px solid var(--border-default)',
                    background: 'var(--bg-surface)',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                  }}
                >
                  {t('card.reset')}
                </button>
              </div>

              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                {order.map((id, i) => {
                  const p = platformById(id);
                  if (!p) return null;
                  return (
                    <ActionRow
                      key={id}
                      platform={p}
                      label={labelFor(id)}
                      priority={priorityFor(i)}
                      index={i}
                      isDragging={dragIdx === i}
                      isOver={overIdx === i && dragIdx !== i}
                      onDragStart={(idx) => setDragIdx(idx)}
                      onDragOver={(idx) => setOverIdx(idx)}
                      onDrop={(idx) => {
                        reorder(dragIdx, idx);
                        setDragIdx(null);
                        setOverIdx(null);
                      }}
                      onDragEnd={() => {
                        setDragIdx(null);
                        setOverIdx(null);
                      }}
                    />
                  );
                })}
              </ul>

              <div
                style={{
                  marginTop: 16,
                  paddingTop: 14,
                  borderTop: '1px dashed var(--border-default)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 12,
                  color: 'var(--text-muted)',
                }}
              >
                <IcSparkles size={14} />
                {t('card.tip')}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
