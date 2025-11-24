import React from "react";

const Contact = ({ content }) => {
  return (
    <div className="relative px-[122px] pt-[135px] pb-[300px] mob:px-[20px] mob:pt-[60px] mob:pb-[150px]">
      {/* Big Title */}
      <p className="font-[700] text-[188px] leading-[200px] text-[#F1E306] mob:text-[60px] mob:leading-[0.9]">
        TELL ME
        <br />
        YOUR IDEAS
      </p>

      {/* Contact Info Block 
          - Laptop: absolute, top/right cố định, căn phải
          - Mobile: static (hết absolute), margin top, căn trái
      */}
      <div className="absolute top-[145px] right-[122px] flex flex-col gap-[16px] text-right mob:static mob:mt-[40px] mob:gap-[12px] mob:text-left">
        <a
          href="https://www.google.com/maps/search/?api=1&query=A.+La+Khe,+Ha+Dong,+Ha+Noi"
          target="_blank"
          rel="noopener noreferrer"
          className="LexendRegular font-[400] text-[21px] leading-[26px] text-[#7BC14B] hover:underline mob:text-[16px] mob:leading-[22px]"
        >
          A. La Khe, Ha Dong, Ha Noi
        </a>
        <a
          href="mailto:dobaonhi7@gmail.com"
          className="LexendRegular font-[400] text-[21px] leading-[26px] text-[#F1E306] hover:underline mob:text-[16px] mob:leading-[22px]"
        >
          E. dobaonhi7@gmail.com
        </a>
        <a
          href="tel:+84981345258"
          className="LexendRegular font-[400] text-[21px] leading-[26px] text-[#6956B2] hover:underline mob:text-[16px] mob:leading-[22px]"
        >
          P. (+84) 981 345 258
        </a>
      </div>

      {/* Background Image Element 
          - Laptop: bottom-0
          - Mobile: vẫn bottom-0 nhưng có thể chỉnh height nếu cần
      */}
      <img
        src="/images/elemts.svg"
        alt="elemts"
        className="absolute bottom-0 left-0 w-full h-auto pointer-events-none"
      />
    </div>
  );
};

export default Contact;
