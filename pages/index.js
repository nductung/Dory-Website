import { LinearGradient } from "react-text-gradients";

export default function Home() {
  const listWork = [
    {
      title: "Mo Branding",
      logo: "/images/Mo work.png",
    },
    {
      title: "Men's Folio",
      logo: "/images/Folio work.png",
    },
    {
      title: "Heineken",
      logo: "/images/henik work.png",
    },
    {
      title: "Me oi",
      logo: "/images/meoi work.png",
    },
    {
      title: "Bi Bong Branding",
      logo: "/images/bibong work.png",
    },
  ];
  return (
    <div className="max-w-[1440px] w-full">
      {/*  */}
      <div className="px-[60px] flex flex-row justify-between items-center py-[26px]">
        <img className="h-55" src={`/images/${"logo.svg"}`} />
        <div>
          <button className="btn-menu  text-[#F1E306] AristaProBoldtrial pl-[18px] pr-[18px] pt-[15px] pb-[13px]  rounded-[19px] ">
            MENU
          </button>
        </div>
      </div>
      {/*  */}
      <div className="flex flex-col px-[98px] py-[135px]">
        <LinearGradient
          className="text-hello AristaProAlternateLighttrial"
          gradient={["to left", "#F1E306"]}
        >
          {`Hello,`}
        </LinearGradient>
        <LinearGradient
          className="text-hello AristaProAlternateLighttrial"
          gradient={["to left", "#7BC14B ,#F1E306"]}
        >
          This is Dory
        </LinearGradient>
      </div>
      {/*  */}
      <div className="bg-[#6956B2] px-[145px] py-[237px] flex flex-col gap-[50px]">
        <p className="AristaProAlternateLighttrial font-[700] text-[88px] leading-[76px] text-center text-[#F1E306]">
          WHO IS DORY?
        </p>
        <p className="LexendRegular text-center font-[400] text-[#020202]">
          Dory is a designer based in Vietnam, driven by curiosity, softness,
          and a little bit of chaos. With a background in Graphic Design and a
          passion for visual storytelling, she explores how colors, forms, and
          emotions can shape human experience. Her work moves between clarity
          and playfulness — blending graphic design, illustration, and brand
          thinking. Whether it’s a children’s toy concept, a quirky game world,
          or a clean visual system, Nhi seeks the sweet spot between logic and
          feeling, intention and instinct. Her portfolio is both a personal
          space and a design playground — where ideas grow, rules bend, and
          creativity stays honest.
        </p>
      </div>
      {/*  */}
      <div className="px-[82px] py-[135px]">
        <p className="font-[700] text-[88px] leading-[76px] text-[#6956B2] pb-[135px]">
          Work
        </p>
        {listWork.map((item, index) => {
          return (
            <div
              className="flex flex-col h-[132px]"
              key={"listWork_" + item?.toString() + index}
            >
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
          );
        })}
      </div>
      {/*  */}
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
