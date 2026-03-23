"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "../../lib/utils";

export const BackgroundRippleEffect = ({
  rows = 14,
  cols = 27,
  cellSize = 56,
}: any) => {
  const [clickedCell, setClickedCell] = useState(null);
  const [rippleKey, setRippleKey] = useState(0);
  const ref = useRef(null);

  // Global click listener so ripples trigger even when background is under content
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const gridEl: HTMLElement | null = ref.current?.querySelector('[data-ripple-grid="1"]')
      if (!gridEl) return
      const rect = gridEl.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return
      const cellSize = Number(gridEl.getAttribute('data-cell-size') || 56)
      const cols = Number(gridEl.getAttribute('data-cols') || 27)
      const rows = Number(gridEl.getAttribute('data-rows') || 8)
      const col = Math.max(0, Math.min(cols - 1, Math.floor(x / cellSize)))
      const row = Math.max(0, Math.min(rows - 1, Math.floor(y / cellSize)))
      setClickedCell({ row, col })
      setRippleKey((k: number) => k + 1)
    }
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  // Gentle auto-ripple to keep background alive
  useEffect(() => {
    const id = setInterval(() => {
      const gridEl: HTMLElement | null = ref.current?.querySelector('[data-ripple-grid="1"]')
      if (!gridEl) return
      const cols = Number(gridEl.getAttribute('data-cols') || 27)
      const rows = Number(gridEl.getAttribute('data-rows') || 8)
      const row = Math.floor(Math.random() * rows)
      const col = Math.floor(Math.random() * cols)
      setClickedCell({ row, col })
      setRippleKey((k: number) => k + 1)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 h-full w-full overflow-hidden",
        "[--cell-border-color:var(--color-neutral-300)] [--cell-fill-color:var(--color-neutral-100)] [--cell-shadow-color:var(--color-neutral-500)]",
        "dark:[--cell-border-color:var(--color-neutral-800)] dark:[--cell-fill-color:var(--color-neutral-950)] dark:[--cell-shadow-color:var(--color-neutral-700)]"
      )}
    >
      <div className="relative h-auto w-auto overflow-hidden">
        <DivGrid
          key={`base-${rippleKey}`}
          className="mask-radial-from-20% mask-radial-at-top opacity-60"
          rows={rows}
          cols={cols}
          cellSize={cellSize}
          borderColor="var(--cell-border-color)"
          fillColor="var(--cell-fill-color)"
          clickedCell={clickedCell}
          onCellClick={(row: number, col: number) => {
            setClickedCell({ row, col });
            setRippleKey((k: number) => k + 1);
          }}
          interactive
        />
      </div>
    </div>
  );
};

const DivGrid = ({
  className,
  rows,
  cols,
  cellSize,
  borderColor,
  fillColor,
  clickedCell,
  onCellClick,
  interactive = true,
}: any) => {
  const cells = useMemo(() => Array.from({ length: rows * cols }, (_, i) => i), [rows, cols]);

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
    width: cols * cellSize,
    height: rows * cellSize,
    marginInline: "auto",
  };

  return (
    <div
      className={cn("relative z-[1]", className)}
      style={gridStyle}
      data-ripple-grid="1"
      data-cell-size={cellSize}
      data-cols={cols}
      data-rows={rows}
    >
      {cells.map((idx) => {
        const row = Math.floor(idx / cols);
        const col = idx % cols;
        const distance = clickedCell ? Math.hypot(clickedCell.row - row, clickedCell.col - col) : 0;
        const delay = clickedCell ? Math.max(0, distance * 55) : 0;
        const duration = 200 + distance * 80;
        const style = clickedCell
          ? { "--delay": `${delay}ms`, "--duration": `${duration}ms` }
          : {};
        return (
          <div
            key={idx}
            className={cn(
              "cell relative border-[0.5px] opacity-40 transition-opacity duration-150 will-change-transform hover:opacity-80 dark:shadow-[0px_0px_40px_1px_var(--cell-shadow-color)_inset]",
              clickedCell && "animate-cell-ripple",
              !interactive && "pointer-events-none"
            )}
            style={{
              backgroundColor: fillColor,
              borderColor,
              ...style,
            }}
            onClick={interactive ? () => onCellClick?.(row, col) : undefined}
          />
        );
      })}
    </div>
  );
};


