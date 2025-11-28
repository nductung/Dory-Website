import { LinearGradient } from "react-text-gradients";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Contact from "../components/Contact";
import Header from "../components/Header";
import Head from "next/head";
import Image from "next/image";

// ... (Keep existing transition and reveal components) ...

// Transition configuration for smooth fluid motion
const TRANSITION = { duration: 1.2, ease: [0.76, 0, 0.24, 1] };

/**
 * MaskedReveal Component
 * Effect: Lever-like reveal animation.
 * - Initial state: Text is positioned 110% below and rotated -5 degrees.
 * - Animation: Moves up to 0% and rotates to 0 degrees.
 * - Origin: Rotates from the bottom-left corner.
 * - Purpose: Used for the "Hello This is Dory" introduction text.
 */
const MaskedReveal = ({ children, delay = 0, className = "" }) => {
  return (
    <div className={`overflow-hidden py-4 -my-4 px-2 -mx-2 ${className}`}>
      <motion.div
        initial={{ y: "110%", rotate: -5 }}
        animate={{ y: "0%", rotate: 0 }}
        transition={{
          ...TRANSITION,
          delay: delay,
        }}
        style={{ transformOrigin: "left bottom" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

/**
 * TextLineReveal Component
 * Effect: Vertical slide-up reveal for text lines.
 * - Initial state: Text is positioned 100% below (hidden).
 * - While in view: Moves up to 0% (visible).
 * - Viewport: Triggers every time it enters the viewport (once: false).
 * - Easing: Smooth slide and stop effect.
 * - Purpose: Used for the "WHO IS DORY?" description lines.
 */
const TextLineReveal = ({ children, delay = 0, className = "" }) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: false, margin: "-10%" }}
        transition={{
          duration: 0.9,
          ease: [0.33, 1, 0.68, 1],
          delay: delay,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

/**
 * WorkReveal Component
 * Effect: Horizontal slide-in with fade.
 * - Initial state: Translated -100px to the left and invisible (opacity 0).
 * - While in view: Moves to original position (x: 0) and becomes visible (opacity 1).
 * - Viewport: Triggers only once.
 * - Purpose: Used for the list of work items.
 */
const WorkReveal = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      className={className}
      initial={{ x: -100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{
        once: true,
        margin: "-10%",
      }}
      transition={{
        duration: 0.8,
        ease: TRANSITION.ease,
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Effect: Lock body scroll when the menu is open.
   * - Adds 'overflow: hidden' to body when isOpen is true.
   * - Removes it when isOpen is false or component unmounts.
   */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const listWork = [
    { title: "Mo Branding", logo: "/images/Mo work.png", href: "/work/mo" },
    {
      title: "Men's Folio",
      logo: "/images/Folio work.png",
      href: "/work/folio",
    },
    {
      title: "Heineken",
      logo: "/images/henik work.png",
      href: "/work/heineken",
    },
    { title: "Me oi", logo: "/images/meoi work.png", href: "/work/meoi" },
    {
      title: "Bi Bong Branding",
      logo: "/images/bibong work.png",
      href: "/work/bibong",
    },
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
    <div className="w-full bg-primary">
      <Head>
        <title>Dory Portfolio - Home</title>
        <meta
          name="description"
          content="Welcome to Dory's portfolio. Explore creative designs, branding, and illustrations."
        />
      </Head>
      <Header isOpen={isOpen} setIsOpen={setIsOpen} indexHeader={0} />

      {/* Introduction Section */}
      <div className="px-[98px] py-[100px] flex flex-col mob:px-[25px]">
        <MaskedReveal delay={0} className="leading-[189px] mob:leading-[90px]">
          <LinearGradient
            className="text-hello AristaProAlternateLighttrial p-[4px] mob:text-[18vw]"
            gradient={["to left", "#F1E306"]}
          >
            {`Hello,`}
          </LinearGradient>
        </MaskedReveal>
        <div className="flex flex-row gap-[60px] mob:gap-[20px]">
          <MaskedReveal
            delay={0.15}
            className="leading-[189px] mob:leading-[90px]"
          >
            <LinearGradient
              className="text-hello AristaProAlternateLighttrial p-[4px] mob:text-[18vw]"
              gradient={["to left", "#F1E306"]}
            >
              {"This"}
            </LinearGradient>
          </MaskedReveal>
          <MaskedReveal
            delay={0.3}
            className="leading-[189px] mob:leading-[90px]"
          >
            <LinearGradient
              className="text-hello AristaProAlternateLighttrial p-[4px] mob:text-[18vw]"
              gradient={["to left", "#F1E306"]}
            >
              {"is"}
            </LinearGradient>
          </MaskedReveal>
          <MaskedReveal
            delay={0.45}
            className="leading-[189px] mob:leading-[90px]"
          >
            <LinearGradient
              className="text-hello AristaProAlternateLighttrial p-[4px] mob:text-[18vw]"
              gradient={["to left", "#7BC14B"]}
            >
              {"Dory"}
            </LinearGradient>
          </MaskedReveal>
        </div>
      </div>

      {/* About Section */}
      <div className="px-[145px] py-[145px] bg-[#6956B2] flex flex-col gap-[50px] mob:px-[30px] mob:py-[90px]">
        <p className="AristaProAlternateLighttrial font-[700] text-[88px] leading-[76px] text-center text-[#F1E306] ">
          WHO IS DORY?
        </p>
        <div className="flex flex-col items-center gap-[0.2em] max-w-[100%]">
          {aboutLines.map((line, index) => (
            <TextLineReveal
              key={index}
              delay={index * 0.05}
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
      <div className="px-[82px] py-[135px] mob:px-[30px] mob:py-[90px]">
        <p className="font-[700] text-[88px] leading-[76px] text-[#6956B2] pb-[100px]">
          Work
        </p>
        {listWork.map((item, index) => (
          <WorkReveal key={`listWork_${index}`} delay={0.1}>
            <div
              className="flex flex-col h-[132px]"
              onClick={() => window.open(item.href, "_blank")}
            >
              {/* 
                  Hover Effect:
                  - Text translates x by 4 units.
                  - Image fades in (opacity 100) and scales up (scale 100).
              */}
              <div className="relative group flex items-center justify-between cursor-pointer overflow-hidden">
                <span className="font-[700] text-[48px] leading-[41px] text-[#7BC14B] transition-transform duration-300 group-hover:translate-x-4">
                  {item.title}
                </span>
                <div className="relative h-[132px] w-[132px] opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                  <Image
                    src={item.logo}
                    alt={item.title}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
            </div>
          </WorkReveal>
        ))}
      </div>

      {/* Contact Section */}
      <Contact />
    </div>
  );
}
