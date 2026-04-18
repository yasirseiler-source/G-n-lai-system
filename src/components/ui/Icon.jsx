/**
 * Consistent outline SVG icons — 16×16, stroke-width 1.75, no fill.
 * Usage: <Icon name="home" size={16} color="currentColor" />
 */
export default function Icon({ name, size = 16, color = 'currentColor', style }) {
  const s = { width: size, height: size, display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }
  const p = { stroke: color, strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' }

  const paths = {
    home: (
      <svg viewBox="0 0 24 24" style={s}><path {...p} d="M3 12L12 3l9 9"/><path {...p} d="M9 21V12h6v9"/><path {...p} d="M5 10v11h14V10"/></svg>
    ),
    activity: (
      <svg viewBox="0 0 24 24" style={s}><polyline {...p} points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
    ),
    building: (
      <svg viewBox="0 0 24 24" style={s}><rect {...p} x="3" y="3" width="18" height="18" rx="1"/><path {...p} d="M9 3v18M15 3v18M3 9h18M3 15h18"/></svg>
    ),
    factory: (
      <svg viewBox="0 0 24 24" style={s}><path {...p} d="M2 20V8l6 4V8l6 4V4h8v16H2z"/></svg>
    ),
    briefcase: (
      <svg viewBox="0 0 24 24" style={s}><rect {...p} x="2" y="7" width="20" height="14" rx="1"/><path {...p} d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line {...p} x1="12" y1="12" x2="12" y2="12"/></svg>
    ),
    users: (
      <svg viewBox="0 0 24 24" style={s}><path {...p} d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle {...p} cx="9" cy="7" r="4"/><path {...p} d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
    ),
    cpu: (
      <svg viewBox="0 0 24 24" style={s}><rect {...p} x="4" y="4" width="16" height="16" rx="2"/><rect {...p} x="9" y="9" width="6" height="6"/><path {...p} d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/></svg>
    ),
    wifi: (
      <svg viewBox="0 0 24 24" style={s}><path {...p} d="M5 12.55a11 11 0 0114.08 0"/><path {...p} d="M1.42 9a16 16 0 0121.16 0"/><path {...p} d="M8.53 16.11a6 6 0 016.95 0"/><circle cx="12" cy="20" r="1" fill={color}/></svg>
    ),
    settings: (
      <svg viewBox="0 0 24 24" style={s}><circle {...p} cx="12" cy="12" r="3"/><path {...p} d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
    ),
    layers: (
      <svg viewBox="0 0 24 24" style={s}><polygon {...p} points="12 2 2 7 12 12 22 7 12 2"/><polyline {...p} points="2 17 12 22 22 17"/><polyline {...p} points="2 12 12 17 22 12"/></svg>
    ),
    radio: (
      <svg viewBox="0 0 24 24" style={s}><circle {...p} cx="12" cy="12" r="2"/><path {...p} d="M16.24 7.76a6 6 0 010 8.49M7.76 16.24a6 6 0 010-8.49M19.07 4.93a10 10 0 010 14.14M4.93 19.07a10 10 0 010-14.14"/></svg>
    ),
    chart: (
      <svg viewBox="0 0 24 24" style={s}><line {...p} x1="18" y1="20" x2="18" y2="10"/><line {...p} x1="12" y1="20" x2="12" y2="4"/><line {...p} x1="6" y1="20" x2="6" y2="14"/><line {...p} x1="2" y1="20" x2="22" y2="20"/></svg>
    ),
    check: (
      <svg viewBox="0 0 24 24" style={s}><polyline {...p} points="20 6 9 17 4 12"/></svg>
    ),
    plus: (
      <svg viewBox="0 0 24 24" style={s}><line {...p} x1="12" y1="5" x2="12" y2="19"/><line {...p} x1="5" y1="12" x2="19" y2="12"/></svg>
    ),
    chevronDown: (
      <svg viewBox="0 0 24 24" style={s}><polyline {...p} points="6 9 12 15 18 9"/></svg>
    ),
    chevronUp: (
      <svg viewBox="0 0 24 24" style={s}><polyline {...p} points="18 15 12 9 6 15"/></svg>
    ),
    chevronRight: (
      <svg viewBox="0 0 24 24" style={s}><polyline {...p} points="9 18 15 12 9 6"/></svg>
    ),
    arrowRight: (
      <svg viewBox="0 0 24 24" style={s}><line {...p} x1="5" y1="12" x2="19" y2="12"/><polyline {...p} points="12 5 19 12 12 19"/></svg>
    ),
    send: (
      <svg viewBox="0 0 24 24" style={s}><line {...p} x1="22" y1="2" x2="11" y2="13"/><polygon {...p} points="22 2 15 22 11 13 2 9 22 2"/></svg>
    ),
    file: (
      <svg viewBox="0 0 24 24" style={s}><path {...p} d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline {...p} points="14 2 14 8 20 8"/></svg>
    ),
    info: (
      <svg viewBox="0 0 24 24" style={s}><circle {...p} cx="12" cy="12" r="10"/><line {...p} x1="12" y1="8" x2="12" y2="12"/><line {...p} x1="12" y1="16" x2="12.01" y2="16"/></svg>
    ),
    alert: (
      <svg viewBox="0 0 24 24" style={s}><path {...p} d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line {...p} x1="12" y1="9" x2="12" y2="13"/><line {...p} x1="12" y1="17" x2="12.01" y2="17"/></svg>
    ),
    camera: (
      <svg viewBox="0 0 24 24" style={s}><path {...p} d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle {...p} cx="12" cy="13" r="4"/></svg>
    ),
    mapPin: (
      <svg viewBox="0 0 24 24" style={s}><path {...p} d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle {...p} cx="12" cy="10" r="3"/></svg>
    ),
    dollar: (
      <svg viewBox="0 0 24 24" style={s}><line {...p} x1="12" y1="1" x2="12" y2="23"/><path {...p} d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
    ),
    target: (
      <svg viewBox="0 0 24 24" style={s}><circle {...p} cx="12" cy="12" r="10"/><circle {...p} cx="12" cy="12" r="6"/><circle {...p} cx="12" cy="12" r="2"/></svg>
    ),
    tool: (
      <svg viewBox="0 0 24 24" style={s}><path {...p} d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>
    ),
    power: (
      <svg viewBox="0 0 24 24" style={s}><path {...p} d="M18.36 6.64a9 9 0 11-12.73 0"/><line {...p} x1="12" y1="2" x2="12" y2="12"/></svg>
    ),
    shield: (
      <svg viewBox="0 0 24 24" style={s}><path {...p} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    ),
    box: (
      <svg viewBox="0 0 24 24" style={s}><path {...p} d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline {...p} points="3.27 6.96 12 12.01 20.73 6.96"/><line {...p} x1="12" y1="22.08" x2="12" y2="12"/></svg>
    ),
    zap: (
      <svg viewBox="0 0 24 24" style={s}><polygon {...p} points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
    ),
    clock: (
      <svg viewBox="0 0 24 24" style={s}><circle {...p} cx="12" cy="12" r="10"/><polyline {...p} points="12 6 12 12 16 14"/></svg>
    ),
    grid: (
      <svg viewBox="0 0 24 24" style={s}><rect {...p} x="3" y="3" width="7" height="7"/><rect {...p} x="14" y="3" width="7" height="7"/><rect {...p} x="3" y="14" width="7" height="7"/><rect {...p} x="14" y="14" width="7" height="7"/></svg>
    ),
    tag: (
      <svg viewBox="0 0 24 24" style={s}><path {...p} d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line {...p} x1="7" y1="7" x2="7.01" y2="7"/></svg>
    ),
    list: (
      <svg viewBox="0 0 24 24" style={s}><line {...p} x1="8" y1="6" x2="21" y2="6"/><line {...p} x1="8" y1="12" x2="21" y2="12"/><line {...p} x1="8" y1="18" x2="21" y2="18"/><line {...p} x1="3" y1="6" x2="3.01" y2="6"/><line {...p} x1="3" y1="12" x2="3.01" y2="12"/><line {...p} x1="3" y1="18" x2="3.01" y2="18"/></svg>
    ),
    x: (
      <svg viewBox="0 0 24 24" style={s}><line {...p} x1="18" y1="6" x2="6" y2="18"/><line {...p} x1="6" y1="6" x2="18" y2="18"/></svg>
    ),
    messageSquare: (
      <svg viewBox="0 0 24 24" style={s}><path {...p} d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
    ),
    eye: (
      <svg viewBox="0 0 24 24" style={s}><path {...p} d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle {...p} cx="12" cy="12" r="3"/></svg>
    ),
    eyeOff: (
      <svg viewBox="0 0 24 24" style={s}><path {...p} d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line {...p} x1="1" y1="1" x2="23" y2="23"/></svg>
    ),
  }

  return paths[name] || <svg viewBox="0 0 24 24" style={s}><circle {...p} cx="12" cy="12" r="9"/></svg>
}
