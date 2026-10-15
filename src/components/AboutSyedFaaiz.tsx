import { ArrowUpRight } from "lucide-react";

export default function AboutSyedFaaiz() {
  return (
    <section
      className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
      aria-labelledby="about-syed-faaiz-title"
    >
      <div className="flex flex-col md:flex-row md:items-center md:gap-6 lg:gap-10">
        <div className="relative mx-auto aspect-[433/577] w-full max-w-[21rem] shrink-0 self-end md:mx-0 md:w-[21rem]">
          <img
            src="/images/about-syed-faaiz.webp"
            alt="Syed Faaiz"
            width="433"
            height="577"
            loading="lazy"
            className="relative h-full w-full object-contain object-bottom [mask-image:linear-gradient(to_right,transparent_0%,#000_10%,#000_90%,transparent_100%),linear-gradient(to_bottom,#000_72%,transparent_100%)] [mask-composite:intersect] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,#000_10%,#000_90%,transparent_100%),linear-gradient(to_bottom,#000_72%,transparent_100%)] [-webkit-mask-composite:source-in]"
          />
        </div>
        <div className="relative flex-1 px-1 pt-6 sm:pt-8 md:py-6 md:pl-2 lg:py-10 lg:pl-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-text">
            About the engineer
          </p>
          <h2
            id="about-syed-faaiz-title"
            className="mt-3 text-balance text-3xl font-semibold tracking-tight text-fg-strong sm:text-4xl"
          >
            I’m Syed Faaiz.
          </h2>
          <p className="mt-5 max-w-xl leading-8 text-fg-muted">
            Syed Faaiz, professionally known as Syed Faizan Hussain Hashmi, is a software engineer and Taekwondo
            black belt who practices arm wrestling and calisthenics.
          </p>
          <a
            href="https://syedfaaiz.com/about"
            className="mt-7 inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-fg transition hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Read my full story
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
