import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

type BackgroundGlowProps = {
  className?: string;
  variant?: "nexa" | "soft-yellow" | "teal";
};

export const BackgroundGlow = ({ className, variant = "nexa" }: BackgroundGlowProps) => {
  const styles = {
    nexa: {
      backgroundImage: `
        radial-gradient(circle at 50% 8%, oklch(0.82 0.16 95 / 0.14), transparent 46%),
        radial-gradient(circle at 88% 16%, oklch(0.72 0.16 190 / 0.18), transparent 42%),
        radial-gradient(circle at 16% 82%, oklch(0.70 0.22 285 / 0.18), transparent 46%)
      `,
      mixBlendMode: "screen",
      opacity: 0.9,
    },
    "soft-yellow": {
      backgroundImage: "radial-gradient(circle at center, #FFF991 0%, transparent 70%)",
      mixBlendMode: "multiply",
      opacity: 0.6,
    },
    teal: {
      background: "#ffffff",
      backgroundImage: `
        radial-gradient(
          circle at top right,
          rgba(56, 193, 182, 0.5),
          transparent 70%
        )
      `,
      filter: "blur(80px)",
      backgroundRepeat: "no-repeat",
    },
  } satisfies Record<string, CSSProperties>;

  return (
    <div
      className={cn("pointer-events-none inset-0 z-0", className ?? "absolute")}
      style={styles[variant]}
      aria-hidden="true"
    />
  );
};

export const Component = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <BackgroundGlow />
    </div>
  );
};
