import React, { useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  motion,
  MotionValue,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { BackgroundGlow } from "@/components/ui/background-components";

type InfiniteGridBackgroundProps = {
  children?: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

export const InfiniteGridBackground = ({
  children,
  className,
  contentClassName,
}: InfiniteGridBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  const speedX = 0.5;
  const speedY = 0.5;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  useAnimationFrame(() => {
    const currentX = gridOffsetX.get();
    const currentY = gridOffsetY.get();
    gridOffsetX.set((currentX + speedX) % 40);
    gridOffsetY.set((currentY + speedY) % 40);
  });

  const maskImage = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn("relative min-h-screen overflow-hidden bg-background", className)}
    >
      <BackgroundGlow className="fixed" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.05]">
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </div>
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 opacity-40"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </motion.div>

      <div className={cn("relative z-10 min-h-screen", contentClassName)}>{children}</div>
    </div>
  );
};

export const Component = () => {
  const [count, setCount] = useState(0);

  return (
    <InfiniteGridBackground contentClassName="flex flex-col items-center justify-center px-4">
      <div className="mx-auto flex max-w-3xl flex-col items-center space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground drop-shadow-sm md:text-6xl">
            The Infinite Grid
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            Move your cursor to reveal the active grid layer. <br />
            The pattern scrolls infinitely in the background.
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setCount(count + 1)}
            className="rounded-md bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-95"
          >
            Interact ({count})
          </button>
          <button className="rounded-md bg-secondary px-8 py-3 font-semibold text-secondary-foreground transition-all hover:bg-secondary/80 active:scale-95">
            Learn More
          </button>
        </div>
      </div>
    </InfiniteGridBackground>
  );
};

const GridPattern = ({
  offsetX,
  offsetY,
}: {
  offsetX: MotionValue<number>;
  offsetY: MotionValue<number>;
}) => {
  const patternId = useId();

  return (
    <svg className="h-full w-full" aria-hidden="true">
      <defs>
        <motion.pattern
          id={patternId}
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-muted-foreground"
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
};
