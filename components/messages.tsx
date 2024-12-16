import { Container } from "./container";
import { FadeIn } from "./fade-in";

export const Messages = () => {
  return (
    <Container className="relative z-10 max-w-[692px] space-y-12 py-36 text-3xl font-bold text-white md:text-4xl">
      <FadeIn>
        <p>
          I know I’ve hurt you, and I’m truly sorry from the bottom of my heart.
        </p>
      </FadeIn>
      <FadeIn>
        <p>
          Every moment with you has been a gift, and I can’t imagine my life
          without your love and laughter.
        </p>
      </FadeIn>
      <FadeIn>
        <p>
          I created this space to remind you of the memories we’ve shared and the
          love that will always stay.
        </p>
      </FadeIn>
      <FadeIn>
        <p>
          I’m ready to do whatever it takes to make things right. Will you give me 
          another chance?
        </p>
      </FadeIn>
    </Container>
  );
};
