import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const cards = [
  { id: 1, color: "bg-red-400", label: "Pair 1" },
  { id: 2, color: "bg-red-300", label: "Pair 1" },
  { id: 3, color: "bg-orange-400", label: "Pair 2" },
  { id: 4, color: "bg-orange-300", label: "Pair 2" },
  { id: 5, color: "bg-green-500", label: "WINNER" },
  { id: 6, color: "bg-green-400", label: "WINNER" },
  { id: 7, color: "bg-blue-400", label: "Pair 4" },
  { id: 8, color: "bg-blue-300", label: "Pair 4" },
  { id: 9, color: "bg-purple-400", label: "Pair 5" },
  { id: 10, color: "bg-purple-300", label: "Pair 5" },
];

const TOTAL_PAIRS = 5;
const RADIUS = 400;
const ANIMATION_DURATION = 800;

// --- CẤU HÌNH ĐỘ NHẠY ---
// Số pixel cần cuộn để kích hoạt chuyển đổi.
// Tăng số này lên = Cần cuộn nhiều hơn (Nặng hơn)
// Giảm số này xuống = Nhạy hơn
const SCROLL_THRESHOLD = 150;

export default function LessSensitiveWheel() {
  const [animationStep, setAnimationStep] = useState("scatter");
  const [activeIndex, setActiveIndex] = useState(2);

  const isLocked = useRef(false);

  // Ref để tích lũy quãng đường cuộn
  const scrollAccumulator = useRef(0);

  // Ref để reset tích lũy nếu người dùng dừng cuộn giữa chừng
  const resetTimeout = useRef(null);

  useEffect(() => {
    const t1 = setTimeout(() => setAnimationStep("filter"), 2000);
    const t2 = setTimeout(() => setAnimationStep("wheel"), 4000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    const handleWheel = (e) => {
      if (animationStep !== "wheel" || isLocked.current) return;

      // 1. CỘNG DỒN QUÃNG ĐƯỜNG CUỘN
      scrollAccumulator.current += e.deltaY;

      // (Optional) Reset tích lũy nếu ngừng cuộn quá 200ms (tránh bị kẹt tích lũy cũ)
      clearTimeout(resetTimeout.current);
      resetTimeout.current = setTimeout(() => {
        scrollAccumulator.current = 0;
      }, 200);

      // 2. KIỂM TRA NGƯỠNG (THRESHOLD)
      // Chỉ khi giá trị tuyệt đối vượt quá ngưỡng mới kích hoạt
      if (Math.abs(scrollAccumulator.current) > SCROLL_THRESHOLD) {
        // --- BẮT ĐẦU KHÓA ---
        isLocked.current = true;

        // Xác định hướng dựa trên tổng quãng đường đã tích lũy
        // (Dương là xuống, Âm là lên)
        const direction = scrollAccumulator.current > 0 ? 1 : -1;

        setActiveIndex((prev) => {
          let next = prev + direction;
          if (next >= TOTAL_PAIRS) next = 0;
          if (next < 0) next = TOTAL_PAIRS - 1;
          return next;
        });

        // Reset biến tích lũy về 0 ngay lập tức để chuẩn bị cho lần sau
        scrollAccumulator.current = 0;

        // --- MỞ KHÓA SAU KHI ANIMATION KẾT THÚC ---
        setTimeout(() => {
          isLocked.current = false;
        }, ANIMATION_DURATION);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [animationStep]);

  const cardVariants = {
    hidden: { y: "120vh", x: 0, opacity: 0, rotate: 0 },

    scatter: (index) => ({
      x: (index - 5) * 60 + (Math.random() * 40 - 20),
      y: (index % 2 === 0 ? -1 : 1) * (Math.random() * 100 + 50),
      opacity: 1,
      scale: 1,
      rotate: Math.random() * 40 - 20,
      transition: { delay: Math.floor(index / 2) * 0.1, type: "spring" },
    }),

    filter: (index) => {
      if (index < 4)
        return { x: "-120vw", opacity: 0, transition: { duration: 1 } };
      if (index > 5)
        return { x: "120vw", opacity: 0, transition: { duration: 1 } };
      return {
        x: index === 4 ? -20 : 20,
        y: 0,
        scale: 1.3,
        rotate: index === 4 ? -5 : 5,
        opacity: 1,
        zIndex: 10,
        transition: { duration: 1, type: "spring" },
      };
    },

    wheel: (index) => {
      const pairIndex = Math.floor(index / 2);
      let diff = pairIndex - activeIndex;
      if (diff > TOTAL_PAIRS / 2) diff -= TOTAL_PAIRS;
      if (diff < -TOTAL_PAIRS / 2) diff += TOTAL_PAIRS;

      const isActive = diff === 0;
      const angle = diff * 45;
      const rad = (angle * Math.PI) / 180;

      return {
        x: RADIUS * Math.sin(rad),
        y: isActive ? 0 : RADIUS * (1 - Math.cos(rad)) + 100,

        opacity: isActive ? 1 : 0,
        scale: isActive ? 1.4 : 0.6,

        rotate: angle + (index % 2 === 0 ? -5 : 5),
        zIndex: isActive ? 100 : 0,

        transition: {
          duration: ANIMATION_DURATION / 1000,
          ease: "easeInOut",
        },
      };
    },
  };

  return (
    <div className="h-screen w-full bg-[#0F172A] flex items-center justify-center overflow-hidden relative">
      <div className="relative w-10 h-10 flex items-center justify-center">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate={animationStep}
            className={`absolute w-56 h-64 rounded-2xl flex flex-col items-center justify-center p-4 border-[3px] border-white/80 shadow-2xl ${card.color}`}
            style={{ transformOrigin: "center 150%" }}
          >
            <div className="w-full h-3/5 bg-white/20 rounded-lg mb-3 backdrop-blur-sm" />
            <div className="text-slate-900 font-bold text-2xl">
              {card.label}
            </div>

            {animationStep === "wheel" &&
              Math.floor(index / 2) === activeIndex && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="absolute -top-12 bg-white text-slate-900 px-3 py-1 rounded-full font-bold text-xs tracking-widest uppercase shadow-lg"
                >
                  Current
                </motion.div>
              )}
          </motion.div>
        ))}
      </div>

      {animationStep === "wheel" && (
        <div className="absolute bottom-20 flex gap-4 z-50">
          {Array.from({ length: TOTAL_PAIRS }).map((_, i) => (
            <div
              key={i}
              className={`transition-all duration-500 rounded-full border border-white/40 ${
                i === activeIndex
                  ? "bg-white w-4 h-4"
                  : "bg-transparent w-2 h-2"
              }`}
            />
          ))}
        </div>
      )}

      <div className="absolute bottom-10 text-white/30 text-center text-sm font-mono uppercase">
        {animationStep === "wheel"
          ? "Scroll Distance Required to Switch"
          : "Loading..."}
      </div>
    </div>
  );
}
