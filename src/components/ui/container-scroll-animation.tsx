"use client";

import React, { useRef } from "react";
import { MotionValue, motion, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

export const ContainerScroll = ({
  titleComponent,
  children,
  className,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.86, 0.96] : [1.04, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [16, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -72]);

  return (
    <div
      className={cn(
        "relative flex h-[46rem] items-center justify-center px-2 py-16 md:h-[62rem] md:px-10",
        className,
      )}
      ref={containerRef}
    >
      <div
        className="relative w-full py-10 md:py-24"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: string | React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="mx-auto max-w-5xl text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 0 1px rgb(255 255 255 / 0.08), 0 24px 80px -28px rgb(124 58 237 / 0.75), 0 28px 70px -36px rgb(14 165 233 / 0.65)",
      }}
      className="mx-auto -mt-8 h-[28rem] w-full max-w-5xl rounded-[28px] border border-white/15 bg-background/70 p-2 shadow-2xl backdrop-blur-xl md:h-[38rem] md:p-5"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-card/70">
        {children}
      </div>
    </motion.div>
  );
};
