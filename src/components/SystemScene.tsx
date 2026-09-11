import { motion, useReducedMotion } from "framer-motion";
import {
  BrainCircuit,
  Cloud,
  Code2,
  Layers3,
  UserRound,
  Workflow,
} from "lucide-react";

const stages = [
  {
    title: "Interface",
    meta: "React · TypeScript",
    icon: Layers3,
    position: "left-0 top-[16%] sm:left-[3%]",
  },
  {
    title: "Services & APIs",
    meta: "Node · Django · .NET",
    icon: Code2,
    position: "right-0 top-[30%]",
  },
  {
    title: "AI & Intelligence",
    meta: "RAG · Agents · OpenAI",
    icon: BrainCircuit,
    position:
      "right-0 top-[62%] sm:right-[2%]",
  },
  {
    title: "Automation",
    meta: "Workflows · Integrations",
    icon: Workflow,
    position:
      "left-0 top-[66%] sm:left-[2%]",
  },
  {
    title: "Cloud Delivery",
    meta: "AWS · CI/CD · Operations",
    icon: Cloud,
    position: "left-0 top-[41%]",
  },
  {
    title: "Senior Software Engineer",
    meta: "",
    icon: UserRound,
    position: "bottom-5 left-1/2 -translate-x-1/2",
  },
];

export default function SystemScene() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative isolate mx-auto w-full max-w-[360px] sm:w-[440px] sm:max-w-none md:w-[540px] lg:w-[600px]" aria-label="Product engineering expertise">
      <div className="relative z-10 mx-auto w-[min(72vw,260px)] sm:w-[280px] md:w-[320px] lg:w-[360px]">
        <img
          src="/images/syed-faaiz-engineering-portrait.webp"
          srcSet="/images/syed-faaiz-engineering-portrait-320.webp 320w, /images/syed-faaiz-engineering-portrait.webp 640w"
          sizes="(max-width: 640px) 72vw, 360px"
          alt="Syed Faizan Hussain Hashmi"
          width={640}
          height={853}
          className="relative z-10 mx-auto h-auto w-full select-none"
          draggable={false}
          loading="eager"
          fetchPriority="high"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 bg-gradient-to-t from-ink-50 via-ink-50/80 to-transparent dark:from-ink-950 dark:via-ink-950/80" aria-hidden="true" />
      </div>

      {stages.map((stage, index) => {
        const Icon = stage.icon;

        return (
          <div key={stage.title} className={`absolute z-30 ${stage.position}`}>
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 5 + index * 0.25, ease: "easeInOut", repeat: Infinity }}
              className="inline-flex max-w-[220px] items-center gap-1.5 rounded-full border border-ink-200 bg-white px-2.5 py-1.5 text-left text-ink-950 sm:gap-2 dark:border-white/10 dark:bg-ink-900 dark:text-white"
            >
              <Icon className="size-[14px] shrink-0 opacity-95 sm:size-[18px]" aria-hidden="true" />
              <span>
                <strong className="block whitespace-nowrap text-[clamp(10px,1.25vw,14px)] font-semibold leading-snug">{stage.title}</strong>
                {stage.meta && <span className="block whitespace-nowrap text-[7px] leading-relaxed text-ink-500 min-[400px]:text-[8px] sm:text-[10px] dark:text-ink-400">{stage.meta}</span>}
              </span>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
