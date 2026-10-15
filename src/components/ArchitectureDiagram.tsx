import { useId, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  BookOpen,
  Bot,
  Boxes,
  Cloud,
  CreditCard,
  Database,
  FolderOpen,
  KeyRound,
  Mail,
  Monitor,
  Network,
  ScanText,
  Search,
  Server,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

type ResponsiveBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type ArchitectureNode = ResponsiveBox & {
  id: string;
  title: string;
  detail?: string;
  mobile?: ResponsiveBox;
};

export type ArchitectureEdge = {
  id: string;
  from: string;
  to: string;
  path: string;
  mobilePath?: string;
};

export type ArchitectureFlow = {
  id: string;
  label: string;
  summary: string;
  edgeIds: string[];
  nodeIds: string[];
};

type ArchitectureDiagramProps = {
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
  flows: ArchitectureFlow[];
  ariaLabel: string;
  description: string;
  defaultFlowId?: string;
  accentColor?: string;
  accentTextColor?: string;
  viewBox?: string;
  mobileViewBox?: string;
  className?: string;
};

type DiagramCanvasProps = {
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
  activeEdges: Set<string>;
  activeNodes: Set<string>;
  accentColor: string;
  accentTextColor: string;
  viewBox: string;
  ariaLabel: string;
  description: string;
  idPrefix: string;
  className: string;
};

type NodeSide = "top" | "right" | "bottom" | "left";

type Point = {
  x: number;
  y: number;
};

function centerOf(box: ResponsiveBox): Point {
  return {
    x: box.x + box.width / 2,
    y: box.y + box.height / 2,
  };
}

function pointOnSide(box: ResponsiveBox, side: NodeSide): Point {
  const center = centerOf(box);

  switch (side) {
    case "top":
      return { x: center.x, y: box.y };
    case "right":
      return { x: box.x + box.width, y: center.y };
    case "bottom":
      return { x: center.x, y: box.y + box.height };
    case "left":
      return { x: box.x, y: center.y };
  }
}

function routeEdge(source: ResponsiveBox, destination: ResponsiveBox): string {
  const sourceCenter = centerOf(source);
  const destinationCenter = centerOf(destination);
  const deltaX = destinationCenter.x - sourceCenter.x;
  const deltaY = destinationCenter.y - sourceCenter.y;
  const nearlyHorizontal = Math.abs(deltaY) < 42;
  const nearlyVertical = Math.abs(deltaX) < 42;

  let sourceSide: NodeSide;
  let destinationSide: NodeSide;

  if (nearlyHorizontal) {
    sourceSide = deltaX >= 0 ? "right" : "left";
    destinationSide = deltaX >= 0 ? "left" : "right";
  } else if (nearlyVertical) {
    sourceSide = deltaY >= 0 ? "bottom" : "top";
    destinationSide = deltaY >= 0 ? "top" : "bottom";
  } else {
    // Diagonal flows leave horizontally toward their target, then enter from
    // the vertical side the target faces. This keeps both the line and its
    // arrowhead clear of node corners.
    sourceSide = deltaX >= 0 ? "right" : "left";
    destinationSide = deltaY >= 0 ? "top" : "bottom";
  }

  const start = pointOnSide(source, sourceSide);
  const end = pointOnSide(destination, destinationSide);
  const controlDistance = Math.min(150, Math.max(54, Math.max(Math.abs(deltaX), Math.abs(deltaY)) * 0.42));
  const sourceControl =
    sourceSide === "left"
      ? { x: start.x - controlDistance, y: start.y }
      : sourceSide === "right"
        ? { x: start.x + controlDistance, y: start.y }
        : sourceSide === "top"
          ? { x: start.x, y: start.y - controlDistance }
          : { x: start.x, y: start.y + controlDistance };
  const destinationControl =
    destinationSide === "left"
      ? { x: end.x - controlDistance, y: end.y }
      : destinationSide === "right"
        ? { x: end.x + controlDistance, y: end.y }
        : destinationSide === "top"
          ? { x: end.x, y: end.y - controlDistance }
          : { x: end.x, y: end.y + controlDistance };

  return `M${start.x} ${start.y} C${sourceControl.x} ${sourceControl.y} ${destinationControl.x} ${destinationControl.y} ${end.x} ${end.y}`;
}

function iconForNode(node: ArchitectureNode): LucideIcon {
  const subject = `${node.id} ${node.title} ${node.detail ?? ""}`.toLowerCase();

  if (/(openai|bedrock|ai |assistant)/.test(subject)) return Bot;
  if (/(pinecone|vector|search)/.test(subject)) return Search;
  if (/(mongo|database|valkey)/.test(subject)) return Database;
  if (/(textract|ocr)/.test(subject)) return ScanText;
  if (/(storage|upload|document)/.test(subject)) return FolderOpen;
  if (/(stripe|billing|subscription)/.test(subject)) return CreditCard;
  if (/(firebase|idp|auth|oidc|proof)/.test(subject)) return KeyRound;
  if (/(email|mail|resend)/.test(subject)) return Mail;
  if (/(rabbit|queue|gateway|socket|realtime)/.test(subject)) return Network;
  if (/(worker|intelligence|analytics|scheduled|jobs|live)/.test(subject)) return Activity;
  if (/(cdn|nginx|delivery|cloud)/.test(subject)) return Cloud;
  if (/(shield|security)/.test(subject)) return ShieldCheck;
  if (/(quran|hadith|quranenc)/.test(subject)) return BookOpen;
  if (/(api|server|collector|issuer|content|bff)/.test(subject)) return Server;
  if (/(browser|visitor|reader|person|client|web|dashboard|ui|app|html|site)/.test(subject)) return Monitor;

  return Boxes;
}

function DiagramCanvas({
  nodes,
  edges,
  activeEdges,
  activeNodes,
  accentColor,
  accentTextColor,
  viewBox,
  ariaLabel,
  description,
  idPrefix,
  className,
}: DiagramCanvasProps) {
  const reduceMotion = useReducedMotion();
  const markerId = `${idPrefix}-arrow`;
  const glowId = `${idPrefix}-glow`;
  const nodesById = useMemo(() => new Map(nodes.map((node) => [node.id, node])), [nodes]);

  return (
    <svg
      className={className}
      viewBox={viewBox}
      role="img"
      aria-labelledby={`${idPrefix}-title ${idPrefix}-description`}
      preserveAspectRatio="xMidYMid meet"
    >
      <title id={`${idPrefix}-title`}>{ariaLabel}</title>
      <desc id={`${idPrefix}-description`}>{description}</desc>
      <defs>
        <pattern id={`${idPrefix}-grid`} width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="var(--color-border)" opacity="0.55" />
        </pattern>
        <marker id={markerId} markerWidth="18" markerHeight="18" refX="16" refY="9" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M2 2L16 9L2 16Z" fill={accentColor} stroke="none" />
        </marker>
        <filter id={glowId} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="100%" height="100%" fill={`url(#${idPrefix}-grid)`} />

      {edges.map((edge) => {
        if (!activeEdges.has(edge.id)) return null;
        const source = nodesById.get(edge.from);
        const destination = nodesById.get(edge.to);
        if (!source || !destination) return null;
        const path = routeEdge(source, destination);
        return (
          <g key={`${edge.id}-active`}>
            <path
              d={path}
              fill="none"
              stroke={accentColor}
              strokeWidth="3.25"
              strokeLinecap="round"
              opacity="0.3"
              filter={`url(#${glowId})`}
            />
            <motion.path
              d={path}
              fill="none"
              stroke={accentColor}
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeDasharray="8 14"
              markerEnd={`url(#${markerId})`}
              initial={false}
              animate={reduceMotion ? { strokeDashoffset: 0 } : { strokeDashoffset: [0, -44] }}
              transition={reduceMotion ? { duration: 0 } : { duration: 1.3, ease: "linear", repeat: Infinity }}
            />
          </g>
        );
      })}

      {nodes.map((node) => {
        const active = activeNodes.has(node.id);
        const box = node;
        const Icon = iconForNode(node);
        const iconSize = 18;
        const titleX = box.x + 45;
        const titleY = box.y + 25;
        return (
          <motion.g key={node.id} animate={{ opacity: active ? 1 : 0.5 }} transition={{ duration: 0.2 }}>
            <rect
              x={box.x}
              y={box.y}
              width={box.width}
              height={box.height}
              rx={18}
              fill={active ? "var(--color-primary-subtle)" : "var(--color-card-muted)"}
              stroke={active ? accentColor : "var(--color-border-strong)"}
              strokeWidth={active ? "1.6" : "1"}
              vectorEffect="non-scaling-stroke"
            />
            <Icon
              x={box.x + 16}
              y={box.y + 13}
              width={iconSize}
              height={iconSize}
              color={active ? accentColor : "var(--color-fg-muted)"}
              strokeWidth={2}
              aria-hidden="true"
            />
            <text x={titleX} y={titleY} fill={active ? accentTextColor : "var(--color-fg-strong)"} fontSize="15" fontWeight="700">
              {node.title}
            </text>
            {node.detail && (
              <text x={box.x + 16} y={box.y + 56} fill={active ? "var(--color-fg)" : "var(--color-fg-muted)"} fontSize="12">
                {node.detail}
              </text>
            )}
          </motion.g>
        );
      })}
    </svg>
  );
}

export default function ArchitectureDiagram({
  nodes,
  edges,
  flows,
  ariaLabel,
  description,
  defaultFlowId,
  accentColor = "var(--color-primary)",
  accentTextColor = "var(--color-fg-strong)",
  viewBox = "0 0 1100 620",
  mobileViewBox = "0 0 360 660",
  className = "",
}: ArchitectureDiagramProps) {
  const [selectedFlowId, setSelectedFlowId] = useState(defaultFlowId ?? flows[0]?.id ?? "");
  const reactId = useId().replace(/:/g, "");
  const activeFlow = flows.find((flow) => flow.id === selectedFlowId) ?? flows[0];
  const activeEdges = useMemo(() => new Set(activeFlow?.edgeIds ?? []), [activeFlow]);
  const activeNodes = useMemo(() => {
    const ids = new Set(activeFlow?.nodeIds ?? []);
    edges.forEach((edge) => {
      if (activeEdges.has(edge.id)) {
        ids.add(edge.from);
        ids.add(edge.to);
      }
    });
    return ids;
  }, [activeEdges, activeFlow, edges]);

  if (!activeFlow) return null;

  const canvasProps = {
    nodes,
    edges,
    activeEdges,
    activeNodes,
    accentColor,
    accentTextColor,
    ariaLabel,
    description,
    idPrefix: `architecture-${reactId}`,
  };

  return (
    <div className={`overflow-hidden rounded-[1.5rem] border border-border bg-card text-fg shadow-xl ${className}`}>
      {flows.length > 1 && (
        <div className="border-b border-border p-3 sm:p-4">
          <div className="flex gap-2 overflow-x-auto sm:flex-wrap sm:justify-center sm:overflow-visible" role="group" aria-label="Architecture workflow">
            {flows.map((flow) => (
              <button
                key={flow.id}
                type="button"
                aria-pressed={selectedFlowId === flow.id}
                onClick={() => setSelectedFlowId(flow.id)}
                className="shrink-0 rounded-full border px-3.5 py-2 text-[11px] font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-card sm:text-xs"
                style={
                  selectedFlowId === flow.id
                    ? { backgroundColor: accentColor, borderColor: accentColor, color: "var(--color-primary-fg)" }
                    : { backgroundColor: "var(--color-card-muted)", borderColor: "var(--color-border)", color: "var(--color-fg-muted)" }
                }
              >
                {flow.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <p className="border-b border-border px-4 py-3 text-center text-sm leading-6 text-fg-muted sm:px-8">{activeFlow.summary}</p>

      <div className="relative mx-auto w-full max-w-[960px]">
        <DiagramCanvas {...canvasProps} viewBox={viewBox} className="block h-auto w-full" />
      </div>
    </div>
  );
}
