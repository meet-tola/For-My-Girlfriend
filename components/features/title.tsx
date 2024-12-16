import classNames from "classnames";
import { useInView } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { useFeatureStore } from "./store";

type Props = {
  children: React.ReactNode;
  id: string;
};

export const FeatureTitle = ({ children, id }: Props) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const isBrowser = typeof window !== "undefined";
  const documentRef = useRef(isBrowser ? document : null);
  const isInView = useInView(ref, {
    margin: "-50% 0px -50% 0px",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    root: documentRef,
  });
  const setInViewFeature = useFeatureStore((state) => state.setInViewFeature);
  const inViewFeature = useFeatureStore((state) => state.inViewFeature);

  useEffect(() => {
    if (isInView) setInViewFeature(id);
    if (!isInView && inViewFeature === id) setInViewFeature(null);
  }, [isInView, id, setInViewFeature, inViewFeature]);

  return (
    <p
      ref={ref}
      className={classNames(
        "feature-title py-16 font-heading font-semibold text-4xl md:text-5xl transition-colors",
        isInView ? "text-black" : "text-gray-300"
      )}
    >
      {children}
    </p>
  );
};
