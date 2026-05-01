"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Globe, Paperclip, Plus, Send } from "lucide-react";

import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

interface UseAutoResizeTextareaProps {
  minHeight: number;
  maxHeight?: number;
}

function useAutoResizeTextarea({ minHeight, maxHeight }: UseAutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }

      textarea.style.height = `${minHeight}px`;
      const newHeight = Math.max(
        minHeight,
        Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY),
      );

      textarea.style.height = `${newHeight}px`;
    },
    [minHeight, maxHeight],
  );

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = `${minHeight}px`;
    }
  }, [minHeight]);

  useEffect(() => {
    const handleResize = () => adjustHeight();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [adjustHeight]);

  return { textareaRef, adjustHeight };
}

const MIN_HEIGHT = 48;
const MAX_HEIGHT = 164;

const AnimatedPlaceholder = ({ showSearch }: { showSearch: boolean }) => (
  <AnimatePresence mode="wait">
    <motion.p
      key={showSearch ? "search" : "ask"}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.1 }}
      className="pointer-events-none absolute w-[180px] text-sm text-white/70"
    >
      {showSearch ? "Search the web..." : "Ask NEXA Agent..."}
    </motion.p>
  </AnimatePresence>
);

export function AiInput() {
  const [value, setValue] = useState("");
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: MIN_HEIGHT,
    maxHeight: MAX_HEIGHT,
  });
  const [showSearch, setShowSearch] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setImagePreview(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    setValue("");
    adjustHeight(true);
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div className="w-full py-4">
      <div className="relative mx-auto w-full max-w-xl rounded-[22px] border border-white/10 bg-background/30 p-1 shadow-elegant backdrop-blur-xl">
        <div className="relative flex flex-col rounded-2xl border border-white/10 bg-white/5">
          <div className="overflow-y-auto" style={{ maxHeight: `${MAX_HEIGHT}px` }}>
            <div className="relative">
              <Textarea
                id="ai-input-04"
                value={value}
                placeholder=""
                className="w-full resize-none rounded-2xl rounded-b-none border-none bg-white/5 px-4 py-3 leading-[1.2] text-white shadow-none focus-visible:ring-0"
                ref={textareaRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                onChange={(e) => {
                  setValue(e.target.value);
                  adjustHeight();
                }}
              />
              {!value && (
                <div className="absolute left-4 top-3">
                  <AnimatedPlaceholder showSearch={showSearch} />
                </div>
              )}
            </div>
          </div>

          <div className="h-12 rounded-b-xl bg-white/5">
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              <label
                className={cn(
                  "relative cursor-pointer rounded-full p-2 transition-colors",
                  imagePreview
                    ? "border border-[#ff3f17] bg-[#ff3f17]/15 text-[#ff3f17]"
                    : "bg-white/5 text-white/40 hover:text-white",
                )}
              >
                <input type="file" ref={fileInputRef} onChange={handleChange} className="hidden" />
                <Paperclip
                  className={cn(
                    "h-4 w-4 text-white/40 transition-colors hover:text-white",
                    imagePreview && "text-[#ff3f17]",
                  )}
                />
                {imagePreview && (
                  <div className="absolute -left-4 top-14 h-[100px] w-[100px]">
                    <img
                      className="h-full w-full rounded-2xl object-cover"
                      src={imagePreview}
                      alt="additional upload preview"
                    />
                    <button
                      type="button"
                      onClick={handleClose}
                      className="absolute -left-1 -top-1 rotate-45 rounded-full bg-[#e8e8e8] text-[#464646] shadow-lg"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </label>
              <button
                type="button"
                onClick={() => {
                  setShowSearch(!showSearch);
                }}
                className={cn(
                  "flex h-8 items-center gap-2 rounded-full border px-1.5 py-1 transition-all",
                  showSearch
                    ? "border-[#ff3f17] bg-[#ff3f17]/15 text-[#ff3f17]"
                    : "border-transparent bg-white/5 text-white/40 hover:text-white",
                )}
              >
                <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center">
                  <motion.div
                    animate={{
                      rotate: showSearch ? 180 : 0,
                      scale: showSearch ? 1.1 : 1,
                    }}
                    whileHover={{
                      rotate: showSearch ? 180 : 15,
                      scale: 1.1,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                      },
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 25,
                    }}
                  >
                    <Globe
                      className={cn("h-4 w-4", showSearch ? "text-[#ff3f17]" : "text-inherit")}
                    />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {showSearch && (
                    <motion.span
                      initial={{ width: 0, opacity: 0 }}
                      animate={{
                        width: "auto",
                        opacity: 1,
                      }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0 overflow-hidden whitespace-nowrap text-sm text-[#ff3f17]"
                    >
                      Search
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
            <div className="absolute bottom-3 right-3">
              <button
                type="button"
                onClick={handleSubmit}
                className={cn(
                  "rounded-full p-2 transition-colors",
                  value
                    ? "bg-[#ff3f17]/15 text-[#ff3f17]"
                    : "bg-white/5 text-white/40 hover:text-white",
                )}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
