/** Small decorative effects. All are skipped for visitors who prefer reduced motion. */

const reduced = () => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** A short burst of rose petals from a point on screen (e.g. the button just tapped). */
export function burstPetals(x: number, y: number, count = 16) {
  if (reduced() || typeof document === 'undefined') return;
  const layer = document.createElement('div');
  layer.className = 'petal-burst';
  layer.setAttribute('aria-hidden', 'true');
  document.body.appendChild(layer);
  const colors = ['#A63B45', '#C96970', '#D5B16F', '#E8771F', '#F7D3D2'];
  let done = 0;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
    p.style.background = colors[i % colors.length];
    layer.appendChild(p);
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
    const dist = 60 + Math.random() * 90;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - 40;
    const anim = p.animate(
      [
        { transform: 'translate(-50%, -50%) scale(0.4) rotate(0deg)', opacity: 1 },
        { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1) rotate(${200 + Math.random() * 200}deg)`, opacity: 1, offset: 0.55 },
        { transform: `translate(calc(-50% + ${dx * 1.2}px), calc(-50% + ${dy + 120}px)) scale(0.9) rotate(${420 + Math.random() * 200}deg)`, opacity: 0 },
      ],
      { duration: 1300 + Math.random() * 500, easing: 'cubic-bezier(.2,.7,.3,1)' },
    );
    anim.onfinish = () => {
      if (++done === count) layer.remove();
    };
  }
  window.setTimeout(() => layer.remove(), 2600);
}

/** Gentle 3D tilt that follows the pointer (desktop mouse only). Returns handlers for an element. */
export function tiltHandlers(max = 5) {
  const enabled = () => !reduced() && window.matchMedia?.('(hover: hover) and (pointer: fine)').matches;
  return {
    onPointerMove(e: { currentTarget: HTMLElement; clientX: number; clientY: number }) {
      if (!enabled()) return;
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--rx', `${(-py * max).toFixed(2)}deg`);
      el.style.setProperty('--ry', `${(px * max).toFixed(2)}deg`);
      el.style.setProperty('--gx', `${((px + 0.5) * 100).toFixed(1)}%`);
      el.style.setProperty('--gy', `${((py + 0.5) * 100).toFixed(1)}%`);
    },
    onPointerLeave(e: { currentTarget: HTMLElement }) {
      const el = e.currentTarget;
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    },
  };
}
