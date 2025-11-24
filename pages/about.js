import { useState } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
// Data
import Contact from "../components/Contact";

const About = () => {
  const router = useRouter();
  const theme = useTheme();
  const [mount, setMount] = useState(false);

  return (
    <>
      <Contact />
    </>
  );
};

export default About;
