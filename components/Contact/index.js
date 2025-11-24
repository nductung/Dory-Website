const Contact = ({ content }) => {
  return (
    <div className="px-[122px] pt-[135px] pb-[300px] relative">
      <p className="font-[700] text-[188px] leading-[200px] text-[#F1E306]">
        TELL ME
        <br />
        YOUR IDEAS
      </p>

      <div className="absolute top-[145px] right-[122px] flex flex-col gap-[16px]">
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
  );
};

export default Contact;
