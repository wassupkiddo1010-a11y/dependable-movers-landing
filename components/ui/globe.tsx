"use client";

import createGlobe, { type COBEOptions } from "cobe";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type GlobeCreateOptions = COBEOptions & {
  onRender?: (state: Record<string, unknown>) => void;
};

export const AREAS_GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.28,
  dark: 0,
  diffuse: 0.45,
  mapSamples: 16000,
  mapBrightness: 1.1,
  baseColor: [0.85, 0.82, 0.95],
  markerColor: [237 / 255, 125 / 255, 34 / 255],
  glowColor: [0.95, 0.94, 1],
  markers: [
    { location: [36.1699, -115.1398], size: 0.06 },
    { location: [40.7128, -74.006], size: 0.07 },
    { location: [34.0522, -118.2437], size: 0.06 },
    { location: [32.7767, -96.797], size: 0.07 },
    { location: [33.4484, -112.074], size: 0.06 },
    { location: [33.749, -84.388], size: 0.06 },
    { location: [21.3069, -157.8583], size: 0.05 },
    { location: [37.5407, -77.436], size: 0.05 },
    { location: [34.0007, -81.0348], size: 0.05 },
    { location: [35.4676, -97.5164], size: 0.05 },
  ],
};

export function Globe({
  className,
  config = AREAS_GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const [r, setR] = useState(0);

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      setR(delta / 200);
    }
  };

  const onRender = useCallback(
    (state: Record<string, unknown>) => {
      if (pointerInteracting.current === null) {
        phiRef.current += 0.005;
      }
      state.phi = phiRef.current + r;
      state.width = widthRef.current * 2;
      state.height = widthRef.current * 2;
    },
    [r]
  );

  const onResize = useCallback(() => {
    if (canvasRef.current) {
      widthRef.current = canvasRef.current.offsetWidth;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    if (!canvasRef.current) {
      return;
    }

    const globe = createGlobe(canvasRef.current, {
      ...config,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender,
    } as GlobeCreateOptions);

    const canvas = canvasRef.current;
    const revealTimer = window.setTimeout(() => {
      canvas.style.opacity = "1";
    }, 0);

    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(revealTimer);
      globe.destroy();
    };
  }, [config, onRender, onResize]);

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-square w-full max-w-[560px]",
        className
      )}
    >
      <canvas
        className="size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}
