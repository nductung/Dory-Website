import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Contact from "../../components/Contact";

const cards = Array.from({ length: 10 }, (_, i) => i);

const cardVariants = {
  hidden: {
    y: "110vh", // Bắt đầu từ dưới màn hình
    opacity: 0,
    rotate: 0,
  },
  visible: (index) => ({
    y: 0,
    opacity: 1,
    // Vẫn giữ xoay ngẫu nhiên để thấy rõ là có nhiều thẻ chồng lên nhau
    rotate: Math.random() * 20 - 10,

    transition: {
      // --- LOGIC QUAN TRỌNG NHẤT Ở ĐÂY ---
      // Math.floor(index / 2): Gom nhóm 2 thẻ thành 1 cặp
      // * 0.4: Mỗi cặp cách nhau 0.4 giây
      delay: Math.floor(index / 2) * 0.4,

      type: "spring",
      stiffness: 100,
      damping: 20,
      duration: 0.8,
    },
  }),
};

function PairCardAnimation() {
  return (
    <div className="h-screen w-full bg-gray-900 flex items-center justify-center overflow-hidden">
      <div className="relative w-64 h-96">
        {cards.map((index) => (
          <motion.div
            key={index}
            custom={index} // Truyền index vào để tính toán delay
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="absolute top-0 left-0 w-full h-full bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col items-center justify-center"
            style={{
              zIndex: index,
              // Thêm màu sắc nhẹ để dễ phân biệt các lớp khi chồng lên nhau
              backgroundColor: index % 2 === 0 ? "#fff" : "#f8fafc",
            }}
          >
            <div className="text-4xl mb-2">🃏</div>
            <div className="text-slate-800 font-bold text-xl">
              Card {index + 1}
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {/* Hiển thị nhóm để bạn dễ debug */}
              Nhóm: {Math.floor(index / 2) + 1}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-10 text-white text-center opacity-60">
        <p>Mỗi lần bay lên 2 lá bài</p>
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <div className="bg-primary">
      <PairCardAnimation />
    </div>
  );
}
