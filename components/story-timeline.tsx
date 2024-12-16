"use client";
import { stagger, useAnimate } from "framer-motion";
import {
  Availability,
  Colors,
  Music,
  SchedulingLinks,
  Team,
  Todo,
} from "@/components/features/card";
import { FeatureTitle } from "@/components/features/title";
import { AddingColors, Finding, MusicVisual, OtherVisual, Santorini, TheBeginning } from "@/components/features/visual";
import { useFeatureStore } from "@/components/features/store";
import { useEffect } from "react";
import { useHidePageOverflow } from "@/utils/toggle-page-overflow";
import { useEscapePress } from "@/utils/use-escape-press";

const features = [
  {
    title: "The Beginning of Us",
    id: "todo-list",
    card: Todo,
    visual: TheBeginning,
  },
  {
    title: "Adding Colors to Our Love Story",
    id: "colors",
    card: Colors,
    visual: AddingColors,
  },
  {
    title: "Finding Time to Be Together",
    id: "availability",
    card: Availability,
    visual: Finding,
  },
  {
    title: "Our Soundtrack: The Music We Shared",
    id: "music",
    card: Music,
    visual: MusicVisual,
  },
  {
    title: "The Little Plans We Made Together",
    id: "scheduling-links",
    card: SchedulingLinks,
    visual: Santorini,
  },
  {
    title: "How We Grew as a Team",
    id: "team",
    card: Team,
    visual: OtherVisual,
  },
];


function StoryTimeline() {
  const [scope, animate] = useAnimate();
  const fullscreenFeature = useFeatureStore((state) => state.fullscreenFeature);
  const lastFullscreenFeature = useFeatureStore(
    (state) => state.lastFullscreenFeature
  );
  const setFullscreenFeature = useFeatureStore(
    (state) => state.setFullscreenFeature
  );

  const onEscapePress = () => {
    if (fullscreenFeature) setFullscreenFeature(null);
  };

  useEscapePress(onEscapePress);
  useHidePageOverflow(!!fullscreenFeature);

  useEffect(() => {
    if (fullscreenFeature) {
      animate([
        [
          ".feature-title",
          { opacity: 0, x: "-200px" },
          { duration: 0.3, delay: stagger(0.05) },
        ],
        [
          `.visual-${lastFullscreenFeature}`,
          { opacity: 1, scale: 1, pointerEvents: "auto" },
          { at: "<" },
        ],
        [".active-card .gradient", { opacity: 0, scale: 0 }, { at: "<" }],
        [".active-card .show-me-btn", { opacity: 0 }, { at: "<" }],
        [
          ".back-to-site-btn",
          { opacity: 1, y: "0px" },
          { at: "<", duration: 0.3 },
        ],
      ]);
    } else {
      animate([
        [
          ".feature-title",
          { opacity: 1, x: "0px" },
          { duration: 0.3, delay: stagger(0.05) },
        ],
        [
          `.visual-${lastFullscreenFeature}`,
          { opacity: 0, scale: 0.75, pointerEvents: "none" },
          { at: "<" },
        ],
        [".active-card .gradient", { opacity: 1, scale: 1 }, { at: "<" }],
        [
          ".back-to-site-btn",
          { opacity: 0, y: "300px" },
          { at: "<", duration: 0.3 },
        ],
        [".active-card .show-me-btn", { opacity: 1 }],
      ]);
    }
  }, [animate, fullscreenFeature, lastFullscreenFeature]);

  return (
    <div className="mx-auto max-w-6xl px-4 bg-white">
      <div ref={scope}>
        {features.map((feature) => (
          <feature.visual id={feature.id} key={feature.id} />
        ))}
        <button
          onClick={() => setFullscreenFeature(null)}
          className="back-to-site-btn fixed bottom-6 left-1/2 z-10 -translate-x-1/2 translate-y-[300%] rounded-full bg-black px-4 py-2 text-white opacity-0 shadow-lg"
        >
          Back to site
        </button>
        <div className="flex w-full items-start gap-20">
          <div className="w-full py-[50vh]">
            <ul>
              {features.map((feature) => (
                <li key={feature.id}>
                  <FeatureTitle id={feature.id}>{feature.title}</FeatureTitle>
                </li>
              ))}
            </ul>
          </div>
          <div className="sticky top-0 flex h-screen w-full items-center">
            <div className="relative aspect-square w-full rounded-2xl bg-gray-100 [&:has(>_.active-card)]:bg-transparent">
              {features.map((feature) => (
                <feature.card id={feature.id} key={feature.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoryTimeline;
