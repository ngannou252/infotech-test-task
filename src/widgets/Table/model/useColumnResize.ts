import { useEffect, useRef, useState } from 'react';
import { MIN_COLUMN_WIDTH } from './constants';

interface IResizeState {
  colIndex: number;
  startX: number;
  startWidth: number;
}

export const useColumnResize = (columnsCount: number) => {
  const [widths, setWidths] = useState<number[]>(() => Array.from({ length: columnsCount }, () => 160));
  const resizeRef = useRef<IResizeState | null>(null);

  const startResize = (colIndex: number) => (event: React.MouseEvent) => {
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'col-resize';

    resizeRef.current = {
      colIndex,
      startX: event.clientX,
      startWidth: widths[colIndex],
    };
  };

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      if (!resizeRef.current) {
        return;
      }

      const { colIndex, startX, startWidth } = resizeRef.current;
      const deltaX = event.clientX - startX;
      const nextWidth = Math.max(startWidth + deltaX * 2, MIN_COLUMN_WIDTH);

      setWidths((prevState) => {
        const updated = [...prevState];
        updated[colIndex] = nextWidth;
        return updated;
      });
    };

    const onUp = () => {
      resizeRef.current = null;
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  return {
    widths,
    startResize,
  };
};
