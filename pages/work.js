import { useState } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
// Data
import Contact from "../components/Contact";

const Work = () => {
  const router = useRouter();
  const theme = useTheme();
  const [mount, setMount] = useState(false);

  return (
    <>
      <div className="relative"></div>
      <Contact />
    </>
  );
};

export default Work;
