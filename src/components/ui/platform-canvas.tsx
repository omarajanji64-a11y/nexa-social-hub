import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MacOSDock from "./mac-os-dock";
import { X } from "lucide-react";

type Platform = "instagram" | "tiktok" | "twitter" | "facebook" | "linkedin" | "youtube";

const platformAccents: Record<Platform, string> = {
  instagram: "#E1306C",
  tiktok: "#000000",
  twitter: "#000000",
  facebook: "#1877F2",
  linkedin: "#0A66C2",
  youtube: "#FF0000",
};

const platformData: Record<Platform, any> = {
  instagram: {
    name: "Instagram",
    actionButton: "Schedule Post",
    stats: ["248 Posts Scheduled", "16 Accounts", "1.2k AI Captions"],
  },
  tiktok: {
    name: "TikTok",
    actionButton: "Upload Video",
    stats: ["124 Videos", "8 Accounts", "890 Captions"],
  },
  twitter: {
    name: "Twitter/X",
    actionButton: "Compose",
    stats: ["312 Tweets", "12 Accounts"],
  },
  facebook: {
    name: "Facebook",
    actionButton: "Create Post",
    stats: ["198 Posts", "10 Pages"],
  },
  linkedin: {
    name: "LinkedIn",
    actionButton: "Write Article",
    stats: ["87 Posts", "6 Company Pages"],
  },
  youtube: {
    name: "YouTube",
    actionButton: "Upload Video",
    stats: ["43 Videos", "4 Channels"],
  },
};

const dockApps = [
  { id: "instagram", name: "Instagram", icon: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" },
  { id: "tiktok", name: "TikTok", icon: "https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg" },
  { id: "twitter", name: "Twitter", icon: "https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg" },
  { id: "facebook", name: "Facebook", icon: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" },
  { id: "linkedin", name: "LinkedIn", icon: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" },
  { id: "youtube", name: "YouTube", icon: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" },
];

export const PlatformCanvas: React.FC = () => {
  const [active, setActive] = useState<Platform | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActive(null);
      }
    };

    if (active) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [active]);

  const handlePlatformClick = (platformId: string) => {
    const platform = platformId as Platform;
    setActive((prev) => (prev === platform ? null : platform));
  };

  return (
    <motion.section
      ref={containerRef}
      className="relative w-screen"
      style={{
        backgroundColor: "#F5F5F7",
        height: "100vh",
        backgroundImage: "radial-gradient(#D2D2D7 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Hint text */}
      <motion.div
        className="absolute top-[12%] left-1/2 -translate-x-1/2 text-center"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <p style={{ color: "#6E6E73", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Click a platform to explore
        </p>
      </motion.div>

      {/* Dock container */}
      <div
        className="absolute"
        style={{
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: active ? 30 : 20,
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(20px)",
            borderRadius: "24px",
            padding: "10px 16px",
            border: "1px solid rgba(255,255,255,0.9)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
          }}
        >
          <MacOSDock
            apps={dockApps}
            onAppClick={handlePlatformClick}
            openApps={active ? [active] : []}
          />
        </div>
      </div>

      {/* Dashboard popup */}
      <AnimatePresence>
        {active && (
          <>
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ background: "rgba(0,0,0,0.04)", zIndex: 40 }}
              onClick={() => setActive(null)}
            />

            {/* Dashboard container */}
            <motion.div
              className="absolute rounded-2xl overflow-hidden"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -58%)",
                width: "min(820px, 88vw)",
                height: "460px",
                background: "#FFFFFF",
                boxShadow: "0 40px 80px rgba(0,0,0,0.12)",
                zIndex: 50,
              }}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              {/* Mac top bar */}
              <div
                style={{
                  height: "44px",
                  backgroundColor: "#F5F5F7",
                  borderBottom: "1px solid #D2D2D7",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                }}
              >
                <div className="flex gap-1.5">
                  <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#FF5F57" }} />
                  <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#FFBD2E" }} />
                  <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#28C840" }} />
                </div>

                <div className="flex items-center gap-2">
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      backgroundColor: platformAccents[active],
                      borderRadius: "50%",
                    }}
                  />
                  <span style={{ color: "#1D1D1F", fontSize: "13px", fontWeight: "500" }}>
                    {platformData[active].name}
                  </span>
                </div>

                <button
                  onClick={() => setActive(null)}
                  className="flex items-center justify-center"
                  style={{ cursor: "pointer", color: "#6E6E73" }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Dashboard body */}
              <div
                style={{
                  padding: "20px",
                  overflowY: "auto",
                  height: "calc(100% - 44px)",
                }}
              >
                <DashboardContent platform={active} accentColor={platformAccents[active]} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

interface DashboardContentProps {
  platform: Platform;
  accentColor: string;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ platform, accentColor }) => {
  const data = platformData[platform];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div />
        <button
          style={{
            backgroundColor: accentColor,
            color: "white",
            borderRadius: "8px",
            fontSize: "12px",
            padding: "6px 14px",
            border: "none",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          {data.actionButton}
        </button>
      </div>

      {platform === "instagram" && <InstagramContent accentColor={accentColor} stats={data.stats} />}
      {platform === "tiktok" && <TikTokContent accentColor={accentColor} stats={data.stats} />}
      {platform === "twitter" && <TwitterContent accentColor={accentColor} stats={data.stats} />}
      {platform === "facebook" && <FacebookContent accentColor={accentColor} stats={data.stats} />}
      {platform === "linkedin" && <LinkedInContent accentColor={accentColor} stats={data.stats} />}
      {platform === "youtube" && <YouTubeContent accentColor={accentColor} stats={data.stats} />}

      {/* Stats row */}
      <div style={{ display: "flex", gap: "16px", marginTop: "20px", fontSize: "12px", color: "#6E6E73" }}>
        {data.stats.map((stat: string, idx: number) => (
          <span key={idx}>
            {stat}
            {idx < data.stats.length - 1 && " · "}
          </span>
        ))}
      </div>
    </div>
  );
};

const InstagramContent: React.FC<{ accentColor: string; stats: string[] }> = ({ accentColor, stats }) => (
  <div>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "12px",
      }}
    >
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div
          key={i}
          style={{
            backgroundColor: "#F5F5F7",
            borderRadius: "8px",
            aspectRatio: "1",
            border: "1px solid #D2D2D7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#6E6E73",
          }}
        >
          {i === 0 ? "+ New Post" : ""}
        </div>
      ))}
    </div>
  </div>
);

const TikTokContent: React.FC<{ accentColor: string; stats: string[] }> = ({ accentColor, stats }) => (
  <div style={{ display: "flex", gap: "12px" }}>
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        style={{
          backgroundColor: "#F5F5F7",
          borderRadius: "10px",
          width: "30%",
          aspectRatio: "9/16",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #D2D2D7",
          position: "relative",
        }}
      >
        <span style={{ fontSize: "24px", color: "#D2D2D7" }}>▶</span>
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            fontSize: "11px",
            backgroundColor: "#D2D2D7",
            color: "#1D1D1F",
            padding: "4px 8px",
            borderRadius: "4px",
          }}
        >
          Draft
        </div>
      </div>
    ))}
  </div>
);

const TwitterContent: React.FC<{ accentColor: string; stats: string[] }> = ({ accentColor, stats }) => (
  <div>
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        style={{
          backgroundColor: "#F5F5F7",
          borderRadius: "12px",
          padding: "12px",
          marginBottom: "8px",
          display: "flex",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            backgroundColor: "#D2D2D7",
            borderRadius: "50%",
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1 }}>
          <div
            style={{
              height: "8px",
              backgroundColor: "#E8E8E8",
              borderRadius: "2px",
              marginBottom: "8px",
            }}
          />
          <div
            style={{
              height: "8px",
              backgroundColor: "#E8E8E8",
              borderRadius: "2px",
              marginBottom: "8px",
              width: "90%",
            }}
          />
          <div
            style={{
              height: "8px",
              backgroundColor: "#E8E8E8",
              borderRadius: "2px",
              width: "75%",
            }}
          />
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "8px",
              fontSize: "12px",
              color: "#6E6E73",
            }}
          >
            <span>♥</span>
            <span>↻</span>
            <span>💬</span>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const FacebookContent: React.FC<{ accentColor: string; stats: string[] }> = ({ accentColor, stats }) => (
  <div>
    {[0, 1].map((i) => (
      <div
        key={i}
        style={{
          backgroundColor: "#F5F5F7",
          borderRadius: "12px",
          padding: "14px",
          marginBottom: "10px",
        }}
      >
        <div style={{ display: "flex", gap: "12px", marginBottom: "10px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              backgroundColor: "#D2D2D7",
              borderRadius: "50%",
              flexShrink: 0,
            }}
          />
          <div>
            <div style={{ fontSize: "13px", fontWeight: "500", color: "#1D1D1F" }}>Brand Name</div>
            <div style={{ fontSize: "12px", color: "#6E6E73" }}>2 hours ago</div>
          </div>
        </div>
        <div
          style={{
            height: "90px",
            backgroundColor: "#D2D2D7",
            borderRadius: "8px",
            marginTop: "10px",
          }}
        />
        <div style={{ display: "flex", gap: "12px", marginTop: "10px", fontSize: "12px", color: "#6E6E73" }}>
          <span>👍</span>
          <span>❤️</span>
        </div>
      </div>
    ))}
  </div>
);

const LinkedInContent: React.FC<{ accentColor: string; stats: string[] }> = ({ accentColor, stats }) => (
  <div>
    {[0, 1].map((i) => (
      <div
        key={i}
        style={{
          backgroundColor: "#F5F5F7",
          borderRadius: "12px",
          padding: "14px",
          marginBottom: "10px",
        }}
      >
        <div style={{ display: "flex", gap: "12px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              backgroundColor: "#D2D2D7",
              borderRadius: "50%",
              flexShrink: 0,
            }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "13px", fontWeight: "500", color: "#1D1D1F" }}>Company Name</div>
            <div style={{ fontSize: "12px", color: "#6E6E73" }}>1.2k followers</div>
          </div>
        </div>
        <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <div
            style={{
              height: "8px",
              backgroundColor: "#E8E8E8",
              borderRadius: "2px",
              width: "90%",
            }}
          />
          <div
            style={{
              height: "8px",
              backgroundColor: "#E8E8E8",
              borderRadius: "2px",
              width: "75%",
            }}
          />
          <div
            style={{
              height: "8px",
              backgroundColor: "#E8E8E8",
              borderRadius: "2px",
              width: "60%",
            }}
          />
        </div>
        <div style={{ display: "flex", gap: "12px", marginTop: "12px", fontSize: "12px", color: "#6E6E73" }}>
          <span>👍</span>
          <span>💬</span>
          <span>↗</span>
        </div>
      </div>
    ))}
  </div>
);

const YouTubeContent: React.FC<{ accentColor: string; stats: string[] }> = ({ accentColor, stats }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
    {[0, 1, 2, 3].map((i) => (
      <div
        key={i}
        style={{
          backgroundColor: "#F5F5F7",
          borderRadius: "8px",
          aspectRatio: "16/9",
          position: "relative",
          border: "1px solid #D2D2D7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            backgroundColor: "rgba(0,0,0,0.15)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "14px",
          }}
        >
          ▶
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "8px",
            left: "8px",
            backgroundColor: "rgba(0,0,0,0.6)",
            color: "white",
            fontSize: "10px",
            padding: "2px 4px",
            borderRadius: "2px",
          }}
        >
          0:00
        </div>
      </div>
    ))}
  </div>
);
