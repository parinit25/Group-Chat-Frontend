import * as React from "react";

import Divider from "@mui/material/Divider";

import FAQ from "../mui/FAQ";
import Features from "../mui/Features";
import LogoCollection from "../mui/LogoCollection";
import Testimonials from "../mui/Testimonials";
import HeroSection from "./HeroSection";

export default function HomeComponent() {
  return (
    <>
      <HeroSection />

      <LogoCollection />
      <Divider />
      <Features />
      <Divider />
      <Testimonials />

      <Divider />
      <FAQ />
      <Divider />
    </>
  );
}
