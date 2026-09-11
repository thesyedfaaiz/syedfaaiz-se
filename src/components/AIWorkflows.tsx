import { useEffect, useRef, useState } from "react";
import {
  BrainCircuit,
  CheckCheck,
  Database,
  FileText,
  MessageSquare,
  ScanText,
  Search,
  Send,
  Settings2,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import "./AIWorkflows.css";
import { Section } from "./ui";

type Point = [number, number];

type Step = {
  title: string;
  detail: string;
  icon: LucideIcon;
};

type WorkflowDefinition = {
  id: string;
  name: string;
  eyebrow: string;
  title: string;
  description: string;
  example: string;
  steps: Step[];
  edges: [number, number][];
  desktop: Point[];
  mobile: Point[];
};

const flows: WorkflowDefinition[] = [
  {
    id: "automation",
    name: "AI & Automation",
    eyebrow: "04 / The complete workflow",
    title: "Connect intelligence to a checked outcome.",
    description:
      "Connect models to data, tools, and operational workflows. Each stage has a purpose: understand the input, choose a useful action, and check what actually happened.",
    example:
      "Example: an incoming request is interpreted, routed through a tool, and followed by a message or record update.",
    steps: [
      {
        title: "Input",
        detail: "Documents & intent",
        icon: FileText,
      },
      {
        title: "AI processing",
        detail: "RAG & extraction",
        icon: BrainCircuit,
      },
      {
        title: "Tools / APIs",
        detail: "Search & actions",
        icon: Settings2,
      },
      {
        title: "Action",
        detail: "Message & update",
        icon: Workflow,
      },
      {
        title: "Result",
        detail: "Verified outcome",
        icon: CheckCheck,
      },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ],
    desktop: [
      [70, 95],
      [285, 95],
      [500, 95],
      [395, 300],
      [145, 300],
    ],
    mobile: [
      [160, 55],
      [160, 185],
      [160, 315],
      [160, 445],
      [160, 575],
    ],
  },

  {
    id: "assistant",
    name: "Connected AI assistant",
    eyebrow: "05 / Intelligence with context",
    title: "An assistant that can do the next step.",
    description:
      "A question reaches the AI, which can look up relevant knowledge and call the right tools. Those results come together in a grounded answer or an action.",
    example:
      "Example: a support question draws on a knowledge base and a status lookup to produce a useful reply.",
    steps: [
      {
        title: "Question",
        detail: "Understand the request",
        icon: MessageSquare,
      },
      {
        title: "AI assistant",
        detail: "Plan the next step",
        icon: BrainCircuit,
      },
      {
        title: "Knowledge",
        detail: "Search trusted context",
        icon: Search,
      },
      {
        title: "Tools & APIs",
        detail: "Look up or take action",
        icon: Settings2,
      },
      {
        title: "Answer or action",
        detail: "Bring results together",
        icon: Send,
      },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [1, 3],
      [2, 4],
      [3, 4],
    ],
    desktop: [
      [60, 200],
      [220, 200],
      [375, 70],
      [375, 325],
      [515, 200],
    ],
    mobile: [
      [160, 55],
      [160, 185],
      [160, 315],
      [160, 445],
      [160, 575],
    ],
  },

  {
    id: "document",
    name: "Document to action",
    eyebrow: "06 / From information to execution",
    title: "Give a document somewhere to go.",
    description:
      "Extract the useful details, retrieve supporting context, and turn the information into a system update. Check the response before treating the work as complete.",
    example:
      "Example: a new document becomes structured data, an updated record, and a checked result.",
    steps: [
      {
        title: "Document",
        detail: "Receive a file",
        icon: FileText,
      },
      {
        title: "Extract details",
        detail: "Identify key fields",
        icon: ScanText,
      },
      {
        title: "Retrieve context",
        detail: "Find relevant knowledge",
        icon: Search,
      },
      {
        title: "Update a system",
        detail: "Write through an API",
        icon: Database,
      },
      {
        title: "Check the result",
        detail: "Validate the response",
        icon: CheckCheck,
      },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ],
    desktop: [
      [70, 95],
      [285, 95],
      [500, 95],
      [395, 300],
      [145, 300],
    ],
    mobile: [
      [160, 55],
      [160, 185],
      [160, 315],
      [160, 445],
      [160, 575],
    ],
  },
];

function getStage(flow: WorkflowDefinition, index: number) {
  if (flow.id === "assistant") {
    if (index < 2) return index;
    if (index < 4) return 2;
    return 3;
  }

  return index;
}

function getEdgeStage(flow: WorkflowDefinition, index: number) {
  if (flow.id === "assistant") {
    if (index === 0) return 0;
    if (index < 3) return 1;
    return 2;
  }

  return index;
}

function Diagram({
  flow,
}: {
  flow: WorkflowDefinition;
}) {
  const points = flow.desktop;

  const viewBox =
    flow.id === "assistant"
      ? "15 25 550 355"
      : "15 45 550 345";

  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      className="ai-flow__svg"
      aria-hidden="true"
      focusable="false"
    >
      {flow.edges.map(([from, to], index) => {
        const [x1, y1] = points[from];
        const [x2, y2] = points[to];

        const path = `
          M ${x1} ${y1}
          C ${(x1 + x2) / 2} ${y1},
            ${(x1 + x2) / 2} ${y2},
            ${x2} ${y2}
        `;

        const stage =
          flow.id === "assistant"
            ? index === 0
              ? 0
              : index < 3
                ? 1
                : 2
            : index;

        return (
          <g key={`${from}-${to}`}>
            <path
              d={path}
              className="ai-flow__track"
            />

            <path
              d={path}
              pathLength="1"
              className={`ai-flow__signal ai-flow__signal--${stage}`}
              data-animate
            />
          </g>
        );
      })}

      {flow.steps.map(
        ({ title, detail, icon: Icon }, index) => {
          const [x, y] = points[index];

          const stage =
            flow.id === "assistant"
              ? index < 2
                ? index
                : index < 4
                  ? 2
                  : 3
              : index;

          return (
            <g
              key={title}
              transform={`translate(${x} ${y})`}
            >
              <circle
                r="35"
                className={`ai-flow__ring ai-flow__ring--${stage}`}
                data-animate
              />

              <Icon
                x="-13"
                y="-13"
                width="26"
                height="26"
                strokeWidth="1.6"
                className="ai-flow__icon"
              />

              <text
                y="55"
                textAnchor="middle"
                className="ai-flow__title"
              >
                {title}
              </text>

              <text
                y="74"
                textAnchor="middle"
                className="ai-flow__detail"
              >
                {detail}
              </text>
            </g>
          );
        },
      )}
    </svg>
  );
}

function WorkflowSection({
  flow,
}: {
  flow: WorkflowDefinition;
}) {
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [reduced, setReduced] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const updateMotion = () => {
      setReduced(preference.matches);
    };

    const updateVisibility = () => {
      setPageVisible(!document.hidden);
    };

    updateMotion();
    updateVisibility();

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(Boolean(entry?.isIntersecting));
      },
      {
        threshold: 0.1,
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    preference.addEventListener("change", updateMotion);
    document.addEventListener(
      "visibilitychange",
      updateVisibility,
    );

    return () => {
      observer.disconnect();

      preference.removeEventListener(
        "change",
        updateMotion,
      );

      document.removeEventListener(
        "visibilitychange",
        updateVisibility,
      );
    };
  }, []);

  return (
    <Section
      id={
        flow.id === "document"
          ? "ai"
          : `ai-${flow.id}`
      }
      kicker={flow.eyebrow}
      title={flow.name}
    >
      <div
        ref={ref}
        className="ai-flow text-ink-950 dark:text-white"
        data-running={
          visible &&
          pageVisible &&
          !reduced
        }
        data-reduced={reduced}
      >
        <div className="ai-flow__layout">
          <div className="ai-flow__copy">
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {flow.title}
            </h3>

            <p className="mt-5 text-base leading-8 text-ink-600 dark:text-ink-300">
              {flow.description}
            </p>

            <p className="mt-6 text-sm leading-7 text-ink-500 dark:border-brand-500/40 dark:text-ink-400">
              {flow.example}
            </p>
          </div>

          <div className="ai-flow__visual">
            <div
              key={flow.id}
              className="ai-flow__diagram"
              role="img"
              aria-label={flow.steps
                .map(
                  (step) =>
                    `${step.title}: ${step.detail}`,
                )
                .join(". ")}
            >
              <Diagram
                flow={flow}
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default function AIWorkflows() {
  return (
    <>
      {flows.map((flow) => (
        <WorkflowSection
          key={flow.id}
          flow={flow}
        />
      ))}
    </>
  );
}