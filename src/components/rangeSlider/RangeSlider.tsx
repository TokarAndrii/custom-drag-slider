import { useEffect, useRef, useState } from 'react';
import './style.css';

export const RangeSlider = ({
  trackWidth,
  thumbValue,
  thumbMinValue = 0,
  thumbMaxValue = trackWidth - 10
}: RangeSliderProps) => {
  const [value, setValue] = useState<number>(thumbValue);

  const thumbRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const thumb = thumbRef.current;

    if (thumb) {
      thumb.style.transform = `translate(${value}px, -50%)`;
    }
  }, [value, trackWidth]);

  useEffect(() => {
    const thumb = thumbRef.current;
    const track = trackRef.current;

    function dragOver(e: MouseEvent) {
      e.preventDefault();

      if (track && thumb) {
        const trackRect = track.getBoundingClientRect();
        const thumbRect = thumb.getBoundingClientRect();
        const thumbHalfWidth = thumbRect.width / 2;
        const dx = e.clientX - trackRect.left - thumbRect.width / 2;
        const containerWidth = trackRect.width - thumbRect.width;
        let newPosition = Math.min(Math.max(0, dx), containerWidth);
        // Apply minimum and maximum values
        newPosition = Math.min(
          Math.max(newPosition, thumbMinValue),
          thumbMaxValue - thumbHalfWidth
        );
        setValue(newPosition);
      }
    }

    track?.addEventListener('dragover', dragOver);

    return () => {
      track?.removeEventListener('dragover', dragOver);
    };
  }, [thumbMinValue, thumbMaxValue]);

  return (
    <div className='holder' style={{ width: `${trackWidth}px` }} ref={trackRef}>
      <div className={'track'} style={{ width: `${trackWidth}px` }}>
        <div className={'thumb'} draggable='true' ref={thumbRef}></div>
        <div
          className={'progress'}
          style={{ width: `${(value * 100) / trackWidth}%` }}
        ></div>
      </div>
    </div>
  );
};

type RangeSliderProps = {
  trackWidth: number;
  thumbValue: number;
  thumbMinValue: number;
  thumbMaxValue: number;
};
