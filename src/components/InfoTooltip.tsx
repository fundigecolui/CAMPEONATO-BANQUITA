import React, { useState, useRef, useEffect } from 'react';
import { Info } from 'lucide-react';

interface InfoTooltipProps {
  title: string;
  description: string;
  align?: 'center' | 'left' | 'right';
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({
  title,
  description,
  align = 'center',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);

  const updatePosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    let left = rect.left + rect.width / 2;
    if (align === 'right') left = rect.right;
    if (align === 'left') left = rect.left;
    setCoords({
      top: rect.bottom + 8,
      left,
    });
  };

  useEffect(() => {
    if (!isOpen) return;
    updatePosition();
    const handleScrollOrResize = () => updatePosition();
    window.addEventListener('scroll', handleScrollOrResize, true);
    window.addEventListener('resize', handleScrollOrResize);
    return () => {
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [isOpen]);

  const alignTransform =
    align === 'right'
      ? '-translate-x-full'
      : align === 'left'
      ? 'translate-x-0'
      : '-translate-x-1/2';

  return (
    <span
      className="relative inline-flex items-center print:hidden"
      onMouseEnter={() => {
        updatePosition();
        setIsOpen(true);
      }}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        ref={triggerRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          updatePosition();
          setIsOpen((prev) => !prev);
        }}
        onFocus={() => {
          updatePosition();
          setIsOpen(true);
        }}
        onBlur={() => setIsOpen(false)}
        aria-label={`Información sobre ${title}`}
        className="inline-flex items-center justify-center w-4 h-4 rounded-full text-amber-400/80 hover:text-amber-300 hover:bg-amber-500/20 focus:outline-none focus:ring-1 focus:ring-amber-400 transition cursor-help"
      >
        <Info className="w-3.5 h-3.5" />
      </button>

      {isOpen && (
        <div
          style={{ top: `${coords.top}px`, left: `${coords.left}px` }}
          className={`fixed z-[100] ${alignTransform} w-64 max-w-[85vw] p-3 rounded-xl bg-slate-950 border border-amber-400/50 shadow-2xl text-left pointer-events-none normal-case tracking-normal font-sans`}
        >
          <p className="text-[11px] font-black text-amber-300 uppercase tracking-wide mb-1">
            {title}
          </p>
          <p className="text-[11px] text-slate-200 font-medium leading-relaxed whitespace-normal">
            {description}
          </p>
        </div>
      )}
    </span>
  );
};
