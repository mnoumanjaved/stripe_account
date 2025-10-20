import CreativeAgencyMain from "@/pages/homes/creative-agency/CreativeAgencyMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brainstorm.ai - AI-Powered Creative Brainstorming Tool",
  description: "Break through creative blocks with AI-generated provocative questions. Transform your brief into 30-40 thought-provoking triggers in seconds.",
};

export default function Home() {
  return (
    <CreativeAgencyMain />
  );
}
