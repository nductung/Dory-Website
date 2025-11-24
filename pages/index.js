import { LinearGradient } from "react-text-gradients";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

// --- CONFIG ---
const COLORS = {
  yellow: "#F1E306",
  purple: "#6956B2",
  green: "#7BC14B",
  black: "#000000",
  text: "#6956B2",
};

// Easing cực mượt (Fluid Motion)
const TRANSITION = { duration: 1.2, ease: [0.76, 0, 0.24, 1] };

// --- FIX: MASKED REVEAL (Hiệu ứng đòn bẩy: Trái cố định, Phải vung lên) ---
const MaskedReveal = ({ children, delay = 0, className = "" }) => {
  return (
    // pb-4 để đảm bảo khi chữ nghiêng không bị cắt mất phần đáy
    <div className={`overflow-hidden py-4 -my-4 px-2 -mx-2 ${className}`}>
      <motion.div
        initial={{ y: "110%", rotate: -5 }} // Bắt đầu: Chìm sâu xuống và Nghiêng đầu phải xuống (-5 độ)
        animate={{ y: "0%", rotate: 0 }} // Kết thúc: Thẳng hàng
        transition={{
          ...TRANSITION,
          delay: delay,
        }}
        // QUAN TRỌNG: Xoay từ góc dưới bên trái -> Tạo cảm giác "lật" từ trái qua phải lên
        style={{ transformOrigin: "left bottom" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const TextLineReveal = ({ children, delay = 0, className = "" }) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: false, margin: "-10%" }} // Kích hoạt khi vào tầm nhìn
        transition={{
          duration: 0.9,
          ease: [0.33, 1, 0.68, 1], // Easing kiểu "trượt nhẹ rồi dừng"
          delay: delay,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// --- COMPONENT SÓNG ---
const CurveLayer = ({ path, color, zIndex, delay, height }) => {
  return (
    <motion.div
      className="absolute top-0 left-0 w-full pointer-events-none"
      // Height ở đây quyết định độ "sâu" của sóng xuống dưới màn hình.
      // Tôi đã chỉnh height nhỏ lại để sóng "xịch lên trên".
      style={{
        height: height,
        zIndex: zIndex,
      }}
      initial={{ y: "-100%" }}
      animate={{ y: "0%" }}
      exit={{ y: "-100%" }}
      transition={{ ...TRANSITION, duration: 0.8, delay: delay }}
    >
      {/* Container SVG: Dùng preserveAspectRatio="none" để co giãn full chiều ngang */}
      <div className="w-full h-full relative">
        {/* Phần màu lấp đầy vô tận phía trên (để khi trượt không bị hở) */}
        <div
          className="absolute left-0 w-full"
          style={{
            bottom: "99%", // Nằm ngay trên đỉnh SVG
            height: "100vh", // Cao vô tận lên trên
            backgroundColor: color,
          }}
        />

        {/* SVG Curve chính xác */}
        <svg
          className="w-full h-full block"
          viewBox="0 0 1440 595"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={path} fill={color} />
        </svg>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  // --- LOGIC: KHÓA SCROLL KHI MỞ MENU ---
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
  // --- ANIMATION CONFIG ---
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5, // Text hiện sau khi nền đen đã xuống
      },
    },
  };

  const itemVars = {
    hidden: { y: 40, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };
  const listWork = [
    { title: "Mo Branding", logo: "/images/Mo work.png" },
    { title: "Men's Folio", logo: "/images/Folio work.png" },
    { title: "Heineken", logo: "/images/henik work.png" },
    { title: "Me oi", logo: "/images/meoi work.png" },
    { title: "Bi Bong Branding", logo: "/images/bibong work.png" },
  ];

  const menuItems = [
    { title: "Home", href: "" },
    { title: "About me", href: "/about" },
    { title: "Work", href: "/work" },
  ];

  const aboutLines = [
    "Dory is a designer based in Vietnam, driven by curiosity, softness, and a little bit of ",
    "chaos. With a background in Graphic Design and a passion for visual storytelling, ",
    "she explores how colors, forms, and emotions can shape human experience. ",
    "Her work moves between clarity and playfulness — blending graphic design, ",
    "illustration, and brand thinking. Whether it’s a children’s toy concept, a quirky ",
    "game world, or a clean visual system, Nhi seeks the sweet spot between logic and ",
    "feeling, intention and instinct. ",
    "Her portfolio is both a personal space and a design playground — where ideas ",
    "grow, rules bend, and creativity stays honest. ",
  ];

  return (
    <div className="max-w-[1440px] w-full">
      {/* --- MENU OVERLAY --- */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <div className="fixed inset-0 z-50 h-screen w-screen overflow-hidden">
            {/* 1. TEXT MENU (Nằm lớp trên cùng - Z-Index 50) */}
            {/* Nằm trong một container riêng biệt đè lên tất cả các lớp sóng */}
            <motion.div
              className="absolute inset-0 z-50 flex flex-col justify-end px-10 md:px-32 pointer-events-auto"
              variants={containerVars}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              <div className="flex flex-col gap-2 mb-20 gap-[20px]">
                {/* Margin top để tránh các lớp sóng phía trên */}
                {menuItems.map((item, i) => (
                  <div key={i} className="overflow-hidden">
                    <motion.a
                      href={item.href}
                      onClick={(e) => {
                        if (i === 0) {
                          e.preventDefault();
                          setIsOpen(false);
                        }
                      }}
                      variants={itemVars}
                      className="AristaProAlternateLighttrial font-[700] text-[104px] leading-[89px] text-[#6956B2]"
                      style={{}}
                    >
                      {item.title}
                    </motion.a>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 2. BACKGROUND ĐEN (Lớp nền chính - Z-Index 10) */}
            <motion.div
              className="absolute inset-0 w-full h-full bg-black z-10"
              style={{ backgroundColor: COLORS.black }}
              initial={{ y: "-100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ ...TRANSITION, duration: 0.8, delay: 0.2 }}
            />

            {/* 3. CÁC LỚP SÓNG TRANG TRÍ (Decoration Layers) 
               - Các lớp này chỉ đóng vai trò trang trí ở phần trên.
               - Tôi đã set height nhỏ lại (25vh, 40vh) để đẩy chúng lên trên.
            */}

            {/* XANH LÁ - Thấp nhất trong nhóm trang trí */}
            <CurveLayer
              zIndex={20}
              color={COLORS.green}
              delay={0.15}
              height="54vh" // Chiếm khoảng 55% màn hình từ trên xuống
              path="M0 145V409.322C0 409.322 50.0925 454.855 237.293 409.322C424.5 363.788 570.75 482.174 570.75 482.174C570.75 482.174 696.75 578.081 823.5 520.387C950.25 462.693 993 546.612 1046.25 573.586C1099.5 600.56 1179.98 613.297 1222.24 542.116C1264.51 470.935 1342.99 466.462 1374.62 505.042C1406.25 543.615 1440 542.116 1440 542.116V145H0Z"
            />

            {/* TÍM - Ở giữa */}
            <CurveLayer
              zIndex={30}
              color={COLORS.purple}
              delay={0.1}
              height="52vh" // Chiếm 40% màn hình, xịch lên trên so với Xanh
              path="M0 82V346.908C0 346.908 50.0925 392.543 237.293 346.908C424.5 301.274 570.75 419.922 570.75 419.922C570.75 419.922 696.75 516.042 823.5 458.219C950.25 400.397 993 484.502 1046.25 511.536C1099.5 538.57 1179.98 551.336 1222.24 479.997C1264.51 408.658 1342.99 404.175 1374.62 442.84C1406.25 481.499 1440 479.997 1440 479.997V82H0Z"
            />

            {/* VÀNG - Trên cùng */}
            <CurveLayer
              zIndex={40}
              color={COLORS.yellow}
              delay={0}
              height="50vh" // Chỉ chiếm 25% màn hình, nằm gọn phía trên
              path="M1439.5 0.5V397.505C1439.26 397.505 1438.92 397.503 1438.51 397.488C1437.54 397.454 1436.11 397.362 1434.29 397.133C1430.67 396.674 1425.5 395.661 1419.34 393.446C1407.03 389.018 1390.76 379.781 1375.01 360.525C1343.08 321.501 1264.19 326.213 1221.81 397.744C1200.78 433.258 1170.25 447.823 1138.33 450.159C1106.39 452.497 1073.05 442.582 1046.48 429.092C1033.22 422.362 1020.61 412.075 1007.12 401.281C993.643 390.5 979.31 379.229 962.667 370.614C946.016 361.996 927.048 356.033 904.293 355.856C881.541 355.68 855.031 361.288 823.292 375.767C760.079 404.604 697.036 395.062 649.761 378.284C626.126 369.896 606.443 359.703 592.671 351.607C585.785 347.56 580.378 344.037 576.693 341.527C574.851 340.273 573.439 339.271 572.489 338.584C572.014 338.24 571.655 337.975 571.414 337.796C571.294 337.707 571.203 337.639 571.143 337.594C571.112 337.571 571.09 337.553 571.075 337.542C571.068 337.536 571.062 337.532 571.059 337.529C571.057 337.528 571.055 337.527 571.054 337.526C571.049 337.523 571.044 337.518 571.037 337.513C571.019 337.498 570.992 337.476 570.956 337.447C570.884 337.39 570.777 337.305 570.635 337.192C570.351 336.968 569.926 336.635 569.366 336.205C568.246 335.344 566.58 334.089 564.394 332.509C560.021 329.348 553.567 324.885 545.238 319.674C528.582 309.251 504.424 295.831 474.409 283.839C414.382 259.855 330.908 241.575 237.174 264.424C143.619 287.23 84.3645 287.219 48.5244 281.528C30.6056 278.683 18.5394 274.418 10.9639 270.874C7.17602 269.102 4.51011 267.51 2.7959 266.365C1.9388 265.793 1.31971 265.332 0.916992 265.017C0.733648 264.873 0.595587 264.759 0.5 264.679V0.5H1439.5Z"
            />
          </div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="px-[60px] flex flex-row justify-between items-center py-[26px]">
        <img className="h-55" src="/images/logo.svg" alt="Logo" />
        <div>
          <button
            className="btn-menu text-[#F1E306] AristaProBoldtrial px-[18px] py-[15px] rounded-[19px]"
            onClick={() => setIsOpen(true)}
          >
            MENU
          </button>
        </div>
      </div>

      {/* Introduction */}
      <div className="flex flex-col px-[98px] py-[100px]">
        <MaskedReveal delay={0} className="leading-[189px]">
          <LinearGradient
            className="text-hello AristaProAlternateLighttrial p-[4px]"
            gradient={["to left", "#F1E306"]}
          >
            {`Hello,`}
          </LinearGradient>
        </MaskedReveal>
        <div className="flex flex-row gap-[60px]">
          <MaskedReveal delay={0.15} className="leading-[189px]">
            <LinearGradient
              className="text-hello AristaProAlternateLighttrial p-[4px]"
              gradient={["to left", "#F1E306"]}
            >
              {"This"}
            </LinearGradient>
          </MaskedReveal>
          <MaskedReveal delay={0.3} className="leading-[189px]">
            <LinearGradient
              className="text-hello AristaProAlternateLighttrial p-[4px]"
              gradient={["to left", "#F1E306"]}
            >
              {"is"}
            </LinearGradient>
          </MaskedReveal>
          <MaskedReveal delay={0.45} className="leading-[189px]">
            <LinearGradient
              className="text-hello AristaProAlternateLighttrial p-[4px]"
              gradient={["to left", "#7BC14B"]}
            >
              {"Dory"}
            </LinearGradient>
          </MaskedReveal>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-[#6956B2] px-[145px] py-[237px] flex flex-col gap-[50px]">
        <p className="AristaProAlternateLighttrial font-[700] text-[88px] leading-[76px] text-center text-[#F1E306]">
          WHO IS DORY?
        </p>
        {/* Khối text được căn giữa, chiều rộng giới hạn để giống layout tạp chí */}
        <div className="flex flex-col items-center gap-[0.2em] max-w-[90%]">
          {aboutLines.map((line, index) => (
            <TextLineReveal
              key={index}
              delay={index * 0.05} // Stagger nhanh (0.05s) tạo hiệu ứng gợn sóng mượt
              className="text-center"
            >
              <span className="LexendRegular font-[400] text-[#020202] text-[25px] leading-[1.4] inline-block leading-[76px]">
                {line}
              </span>
            </TextLineReveal>
          ))}
        </div>
      </div>

      {/* Work Section */}
      <div className="px-[82px] py-[135px]">
        <p className="font-[700] text-[88px] leading-[76px] text-[#6956B2] pb-[135px]">
          Work
        </p>
        {listWork.map((item, index) => (
          <div className="flex flex-col h-[132px]" key={`listWork_${index}`}>
            <div className="relative group flex items-center justify-between cursor-pointer overflow-hidden">
              <span className="font-[700] text-[48px] leading-[41px] text-[#7BC14B] transition-transform duration-300 group-hover:translate-x-4">
                {item.title}
              </span>
              <img
                src={item.logo}
                alt={item.title}
                className="h-[132px] w-[132px] opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="px-[122px] pt-[244px] pb-[398px] relative">
        <p className="font-[700] text-[188px] leading-[200px] text-[#F1E306]">
          TELL ME
          <br />
          YOUR IDEAS
        </p>

        <div className="absolute top-[260px] right-[122px] flex flex-col gap-[16px]">
          <a
            href="https://www.google.com/maps/search/?api=1&query=A.+La+Khe,+Ha+Dong,+Ha+Noi"
            target="_blank"
            rel="noopener noreferrer"
            className="LexendRegular font-[400] text-[21px] leading-[26px] text-right text-[#7BC14B] hover:underline"
          >
            A. La Khe, Ha Dong, Ha Noi
          </a>
          <a
            href="mailto:dobaonhi7@gmail.com"
            className="LexendRegular font-[400] text-[21px] leading-[26px] text-right text-[#F1E306] hover:underline"
          >
            E. dobaonhi7@gmail.com
          </a>
          <a
            href="tel:+84981345258"
            className="LexendRegular font-[400] text-[21px] leading-[26px] text-right text-[#6956B2] hover:underline"
          >
            P. (+84) 981 345 258
          </a>
        </div>

        <img
          src="/images/elemts.svg"
          alt="elemts"
          className="absolute bottom-0 left-0 w-full h-auto"
        />
      </div>
    </div>
  );
}
