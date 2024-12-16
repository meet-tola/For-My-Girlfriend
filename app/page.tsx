import { EasterEgg } from "@/components/easter-egg";
import { Footer } from "@/components/footer";
import { ForgiveMe } from "@/components/forgive-me";
import Gallery from "@/components/gallery";
import Hero from "@/components/hero";
import { Messages } from "@/components/messages";
import MusicSection from "@/components/music-section";
import ScrollDownText from "@/components/scrolldown-text";
import SoSpecial from "@/components/so-special";
import StoryTimeline from "@/components/story-timeline";
import { VideoCarousel } from "@/components/video-carousel";

export default function Home() {
  return (
    <>
      <main>
        <div className="bg-black relative z-10">
          <Hero />
          <Messages />
        </div>
        <VideoCarousel />
        <StoryTimeline />
        <SoSpecial />
        <Gallery />
        <MusicSection />
        <ScrollDownText />

        <ForgiveMe />
        <EasterEgg />
      </main>
      <Footer /> 
    </>
  );
}
