import { useState } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import Contact from "../components/Contact";
import Head from "next/head";
import Image from "next/image";

const About = () => {
  const router = useRouter();
  const theme = useTheme();
  const [mount, setMount] = useState(false);

  return (
    <div className="bg-primary">
      <Head>
        <title>Dory Portfolio - About</title>
        <meta
          name="description"
          content="Learn more about Dory, a Graphic Designer based in Vietnam."
        />
      </Head>
      <div className="relative">
        <p className="font-[700] text-[525px] leading-[451px] text-[#F1E306] text-center mob:text-[40vw]">
          DORY
        </p>

        <div className="absolute top-[236px] w-full h-[600px] pointer-events-none">
          {/* 
            Flip Card Effect
            - Structure:
              1. Outer Container: Sets perspective (1000px) for 3D depth.
              2. Inner Wrapper: Handles the rotation (rotateY).
              3. Front/Back Faces: Images positioned absolutely with backface-visibility: hidden.
            - Interaction: Hovering over the group triggers the flip.
          */}
          <div className="group absolute left-1/2 -translate-x-1/2 w-[300px] h-[400px] z-10 [perspective:1000px] pointer-events-auto">
            {/* Inner Wrapper: Transitions the rotation */}
            <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              {/* Front Face */}
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden]">
                <Image
                  src="/images/Layer_1.png"
                  alt="Dory Front"
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              {/* Back Face (Rotated 180deg initially) */}
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <Image
                  src="/images/Gemini_Generated_Image_dkmpshdkmpshdkmp 1.png"
                  alt="Dory Back"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>

          {/* Floating Words */}
          <p className="font-[700] text-[70px] leading-[60px] text-[#7BC14B] absolute top-[25%] left-[29%] z-20">
            the
          </p>
          <p className="font-[700] text-[70px] leading-[60px] text-[#7BC14B] absolute top-[50%] left-[28%] z-20">
            idea
          </p>
          <p className="font-[700] text-[70px] leading-[60px] text-[#7BC14B] absolute top-[27%] right-[20%] z-20">
            become
          </p>
          <p className="font-[700] text-[70px] leading-[60px] text-[#7BC14B] absolute top-[48%] right-[10%] z-20">
            real
          </p>
          <p className="font-[700] text-[70px] leading-[60px] text-[#7BC14B] absolute top-[38%] left-[10%] z-20">
            Make
          </p>
        </div>
      </div>

      <div className="mt-[236px] flex w-full justify-between px-[82px] mob:px-[30px]">
        <p className="LexendLight font-[300] text-[28px] leading-[35px] text-[#6956B2] max-w-[33vw] text-left">
          {`Through every project, I aim to turn creativity into something that sparks joy and connection`}
        </p>
        <p className="LexendRegular font-[400] text-[16px] leading-[20px] text-[#F1E306] max-w-[40vw] text-right mt-[90px]">
          {`I’m Dory, a Graphic Designer with an unlimited passion for turning creative ideas into reality. I always seek diversity and newness in design style; believing that every challenge is an opportunity to learn and grow. With experience working on many projects from brand identity, illustration, to digital communication, I always aim to create unique design products that reflect the spirit and values ​​of the client. Let's turn your ideas into inspiring works of art!`}
        </p>
      </div>

      <div className="mt-[200px]">
        <Contact />
      </div>
    </div>
  );
};

export default About;
