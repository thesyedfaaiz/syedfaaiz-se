import { motion, useReducedMotion } from "framer-motion";
import {
  BrainCircuit,
  Cloud,
  Code2,
  Layers3,
  Workflow,
} from "lucide-react";

const stages = [
  {
    title: "Interface",
    meta: "React · TypeScript",
    icon: Layers3,
    position: "left-1/2 top-[1%] -translate-x-1/2",
  },
  {
    title: "Services & APIs",
    meta: "Node · Django · .NET",
    icon: Code2,
    position: "right-0 top-[26%] sm:top-[27%]",
  },
  {
    title: "AI & Intelligence",
    meta: "RAG · Agents · OpenAI",
    icon: BrainCircuit,
    position:
      "bottom-[8%] right-[3%] min-[400px]:right-[5%] sm:bottom-[10%] sm:right-[8%]",
  },
  {
    title: "Automation",
    meta: "Workflows · Integrations",
    icon: Workflow,
    position:
      "bottom-[8%] left-[3%] min-[400px]:left-[5%] sm:bottom-[10%] sm:left-[8%]",
  },
  {
    title: "Cloud Delivery",
    meta: "AWS · CI/CD · Operations",
    icon: Cloud,
    position: "left-0 top-[26%] sm:top-[27%]",
  },
];

export default function SystemScene() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.aside
      className="mx-auto w-full min-w-0 max-w-[620px]"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.16,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      aria-label="Product engineering system"
    >
      <div className="relative mx-auto aspect-square w-full max-w-[560px]">
        {/* Ambient glow */}
        <div
          className="
            pointer-events-none
            absolute inset-[11%]
            rounded-full
            bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.11),transparent_68%)]
            blur-xl
            sm:inset-[10%]
            sm:blur-2xl
            dark:bg-[radial-gradient(circle_at_center,rgba(167,139,250,0.13),transparent_70%)]
          "
          aria-hidden="true"
        />

        {/* Main orbit */}
        <div
          className="
            pointer-events-none
            absolute inset-[20%]
            rounded-full
            border border-ink-200/90
            sm:inset-[18%]
            dark:border-white/10
          "
          aria-hidden="true"
        />

        {/* Inner orbit */}
        <div
          className="
            pointer-events-none
            absolute inset-[29%]
            rounded-full
            border border-dashed border-ink-200/70
            sm:inset-[27%]
            dark:border-white/[0.07]
          "
          aria-hidden="true"
        />

        {/* Slowly moving orbit accent */}
        <motion.div
          className="
            pointer-events-none
            absolute inset-[20%]
            rounded-full
            sm:inset-[18%]
          "
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
          aria-hidden="true"
        >
          <span
            className="
              absolute
              left-1/2 top-[-3px]
              size-1.5
              -translate-x-1/2
              rounded-full
              bg-brand-500
              shadow-[0_0_16px_rgba(139,92,246,0.5)]
              sm:top-[-4px]
              sm:size-2
            "
          />

          <span
            className="
              absolute
              bottom-[-2px] left-1/2
              size-1
              -translate-x-1/2
              rounded-full
              bg-brand-300/80
              sm:bottom-[-3px]
              sm:size-1.5
            "
          />
        </motion.div>

        {/* Core positioning wrapper */}
        <div
          className="
            absolute
            left-1/2 top-1/2
            z-20
            -translate-x-1/2
            -translate-y-1/2
          "
        >
          {/* Core animation is separate from positioning */}
          <motion.div
            className="
              grid
              size-[clamp(5.75rem,26vw,9.5rem)]
              place-items-center
              rounded-full
              border border-brand-200/90
              bg-white/90
              text-center
              shadow-[0_18px_60px_-28px_rgba(79,70,229,0.45)]
              backdrop-blur-xl
              dark:border-brand-400/20
              dark:bg-ink-950/90
            "
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [0, -3, 0],
                  }
            }
            transition={{
              duration: 5,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <div className="px-2 sm:px-4">
              <div
                className="
                  mx-auto mb-1.5
                  grid size-7
                  place-items-center
                  rounded-full
                  bg-brand-50
                  text-brand-700
                  min-[400px]:size-8
                  sm:mb-2
                  sm:size-9
                  dark:bg-brand-500/10
                  dark:text-brand-200
                "
              >
                <Layers3 className="size-3.5 sm:size-[17px]" />
              </div>

              <strong
                className="
                  block
                  text-[11px]
                  font-semibold
                  leading-tight
                  tracking-[-0.03em]
                  text-ink-950
                  min-[360px]:text-xs
                  min-[430px]:text-sm
                  sm:text-lg
                  dark:text-white
                "
              >
                Product
                <span className="block">System</span>
              </strong>
            </div>
          </motion.div>
        </div>

        {/* Five surrounding stages */}
        {stages.map((stage, index) => {
          const Icon = stage.icon;

          return (
            /*
             * Static wrapper owns all positional transforms.
             *
             * This is important because Framer Motion uses transform
             * internally as well. Keeping positioning on this wrapper
             * prevents animations from breaking translate-x/y.
             */
            <div
              key={stage.title}
              className={`
                absolute
                z-30
                w-[clamp(5.75rem,27vw,9.625rem)]
                ${stage.position}
              `}
            >
              <motion.div
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        scale: 0.92,
                        y: 5,
                      }
                }
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.26 + index * 0.08,
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -3,
                      }
                }
                className="
                  group
                  flex
                  min-h-[62px]
                  flex-col
                  justify-center
                  rounded-xl
                  border border-ink-200/90
                  bg-white/[0.88]
                  p-2
                  shadow-[0_12px_34px_-24px_rgba(15,23,42,0.45)]
                  backdrop-blur-xl
                  transition-colors
                  hover:border-brand-300
                  min-[380px]:min-h-[68px]
                  min-[380px]:rounded-2xl
                  min-[400px]:p-2.5
                  sm:min-h-[88px]
                  sm:p-3.5
                  dark:border-white/10
                  dark:bg-ink-900/[0.88]
                  dark:hover:border-brand-400/30
                "
              >
                <div
                  className="
                    mb-1.5
                    grid size-6
                    shrink-0
                    place-items-center
                    rounded-lg
                    bg-brand-50
                    text-brand-700
                    min-[380px]:size-7
                    min-[380px]:rounded-xl
                    sm:mb-2
                    sm:size-8
                    dark:bg-brand-500/10
                    dark:text-brand-200
                  "
                >
                  <Icon className="size-3 sm:size-4" />
                </div>

                <strong
                  className="
                    block
                    text-[9px]
                    font-semibold
                    leading-[1.15]
                    text-ink-950
                    min-[360px]:text-[10px]
                    min-[430px]:text-[11px]
                    sm:text-sm
                    dark:text-white
                  "
                >
                  {stage.title}
                </strong>

                <span
                  className="
                    mt-1
                    block
                    overflow-hidden
                    text-ellipsis
                    whitespace-nowrap
                    text-[7px]
                    leading-relaxed
                    text-ink-500
                    min-[380px]:text-[8px]
                    min-[430px]:text-[9px]
                    sm:text-[10px]
                    dark:text-ink-400
                  "
                >
                  {stage.meta}
                </span>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Supporting qualities */}
      <div
        className="
          mt-2
          flex
          flex-wrap
          items-center
          justify-center
          gap-x-2.5
          gap-y-2
          text-center
          text-[7px]
          font-bold
          uppercase
          tracking-[0.1em]
          text-ink-400
          min-[360px]:gap-x-3
          min-[360px]:text-[8px]
          min-[420px]:gap-x-4
          sm:mt-4
          sm:gap-x-5
          sm:text-[9px]
          sm:tracking-[0.13em]
          dark:text-ink-500
        "
      >
        <span>Scalable</span>

        <span
          className="
            size-0.5
            rounded-full
            bg-ink-300
            sm:size-1
            dark:bg-ink-700
          "
        />

        <span>Maintainable</span>

        <span
          className="
            size-0.5
            rounded-full
            bg-ink-300
            sm:size-1
            dark:bg-ink-700
          "
        />

        <span>Production-ready</span>
      </div>
    </motion.aside>
  );
}