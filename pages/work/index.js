import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Giả lập 10 thẻ (5 cặp)
const cards = [
  { id: 1, color: "bg-red-400", label: "Pair 1" },
  { id: 2, color: "bg-red-300", label: "Pair 1" },

  { id: 3, color: "bg-orange-400", label: "Pair 2" },
  { id: 4, color: "bg-orange-300", label: "Pair 2" },

  { id: 5, color: "bg-green-500", label: "WINNER" }, // Cặp ở giữa
  { id: 6, color: "bg-green-400", label: "WINNER" }, // Cặp ở giữa

  { id: 7, color: "bg-blue-400", label: "Pair 4" },
  { id: 8, color: "bg-blue-300", label: "Pair 4" },

  { id: 9, color: "bg-purple-400", label: "Pair 5" },
  { id: 10, color: "bg-purple-300", label: "Pair 5" },
];

export default function CardFilterEffect() {
  // State kiểm soát giai đoạn: "scatter" (tỏa ra) -> "filter" (bay đi)
  const [animationStep, setAnimationStep] = useState("scatter");

  useEffect(() => {
    // Giai đoạn 1: Tự động chạy "scatter" khi load (mặc định)

    // Giai đoạn 2: Sau 3 giây, kích hoạt "filter"
    const timer = setTimeout(() => {
      setAnimationStep("filter");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const cardVariants = {
    // --- PHASE 0: Ẩn dưới đáy ---
    hidden: {
      y: "120vh",
      x: 0,
      opacity: 0,
      rotate: 0,
    },

    // --- PHASE 1: Bay lên và Tỏa ra (Scatter) ---
    scatter: (index) => {
      // Logic rải ngẫu nhiên cũ
      const spreadX = (index - 5) * 60 + (Math.random() * 40 - 20);
      const spreadY = (index % 2 === 0 ? -1 : 1) * (Math.random() * 100 + 50);

      return {
        x: spreadX,
        y: spreadY,
        opacity: 1,
        scale: 1,
        rotate: Math.random() * 40 - 20,
        transition: {
          delay: Math.floor(index / 2) * 0.2, // Bay từng cặp
          type: "spring",
          stiffness: 60,
        },
      };
    },

    // --- PHASE 2: Sàng lọc (Filter) ---
    filter: (index) => {
      // 1. NHÓM TRÁI (Cặp 1 & 2 - Index 0,1,2,3)
      if (index < 4) {
        return {
          x: "-120vw", // Bay tít sang trái màn hình
          y: 0,
          opacity: 0, // Mờ dần
          rotate: -90, // Xoay nhẹ khi bay
          transition: { duration: 1.5, ease: "easeInOut", delay: 0.1 * index },
        };
      }

      // 2. NHÓM PHẢI (Cặp 4 & 5 - Index 6,7,8,9)
      else if (index > 5) {
        return {
          x: "120vw", // Bay tít sang phải màn hình
          y: 0,
          opacity: 0,
          rotate: 90,
          transition: {
            duration: 1.5,
            ease: "easeInOut",
            delay: 0.1 * (index - 6),
          },
        };
      }

      // 3. NHÓM GIỮA (Cặp 3 - Index 4,5) -> Ở LẠI
      else {
        return {
          x: index === 4 ? -20 : 20, // Tách nhẹ ra 2 bên tí xíu để thấy là 2 thẻ
          y: 0,
          scale: 1.3, // Phóng to lên làm tiêu điểm
          rotate: index === 4 ? -5 : 5, // Xoay đối xứng đẹp mắt
          opacity: 1,
          zIndex: 100, // Đẩy lên trên cùng
          transition: {
            duration: 1,
            type: "spring",
            stiffness: 100,
            delay: 0.5, // Chờ các thẻ kia bay đi rồi mới phóng to
          },
        };
      }
    },
  };

  return (
    <div className="h-screen w-full bg-slate-900 flex items-center justify-center overflow-hidden relative">
      {/* Container */}
      <div className="relative w-10 h-10 flex items-center justify-center">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate={animationStep} // Biến state quyết định đang ở phase nào
            className={`absolute w-56 h-64 rounded-2xl shadow-2xl flex flex-col items-center justify-center p-4 border-4 border-white/90 ${card.color}`}
            style={{ zIndex: index }}
          >
            <div className="w-full h-2/3 bg-white/20 rounded-lg mb-2 backdrop-blur-sm" />
            <div className="text-slate-900 font-bold text-xl">{card.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Text trạng thái */}
      <div className="absolute bottom-10 text-white/60 text-center">
        {animationStep === "scatter"
          ? "Phase 1: Scattering..."
          : "Phase 2: Filtering Winners"}
        <br />
        <button
          onClick={() => window.location.reload()}
          className="mt-2 underline hover:text-white"
        >
          Replay
        </button>
      </div>
    </div>
  );
}
