"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";

/* -------------------------------------------------------------------- */
/*  Data contract                                                        */
/* -------------------------------------------------------------------- */

interface StateProps {
  st_nm: string;
  st_code?: string;
}

type StateFeature = GeoJSON.Feature<GeoJSON.Geometry, StateProps>;

interface StateStat {
  districts?: number;
  offices?: number;
}

/**
 * Fill in real per-state numbers as they become available.
 * Any state left out simply falls back to the generic copy in the panel —
 * nothing breaks if this stays empty.
 *
 * Example:
 *   Maharashtra: { districts: 36, offices: 41 },
 */
const STATE_STATS: Record<string, StateStat> = {};

const WIDTH = 700;
const HEIGHT = 760;
const TOPOLOGY_URL = "/data/india-states.json";

/* -------------------------------------------------------------------- */
/*  Component                                                            */
/* -------------------------------------------------------------------- */

export default function IndiaPresenceMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement>(null);
  const zoomBehaviorRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);

  const [features, setFeatures] = useState<StateFeature[] | null>(null);
  const [pathGen, setPathGen] = useState<d3.GeoPath | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const active = selected ?? hovered;

  /* ---- load + project the topology once ---- */
  useEffect(() => {
    let cancelled = false;

    d3.json<any>(TOPOLOGY_URL)
      .then((topology) => {
        if (!topology || cancelled) return;

        const objectName = Object.keys(topology.objects)[0];
        const geo = topojson.feature(
          topology,
          topology.objects[objectName]
        ) as unknown as GeoJSON.FeatureCollection<GeoJSON.Geometry, StateProps>;

        const projection = d3.geoMercator().fitSize([WIDTH, HEIGHT], geo);
        setPathGen(() => d3.geoPath(projection));
        setFeatures(geo.features);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  /* ---- scroll-to-zoom / drag-to-pan ---- */
  useEffect(() => {
    if (status !== "ready" || !svgRef.current || !gRef.current) return;

    const svg = d3.select(svgRef.current);
    const g = d3.select(gRef.current);

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 8])
      .translateExtent([
        [0, 0],
        [WIDTH, HEIGHT],
      ])
      .on("zoom", (event) => {
        g.attr("transform", event.transform.toString());
      });

    svg.call(zoom);
    svg.on("dblclick.zoom", null); // reserve double-click; we use an explicit reset button
    zoomBehaviorRef.current = zoom;

    return () => {
      svg.on(".zoom", null);
    };
  }, [status]);

  const zoomBy = (factor: number) => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    d3.select(svgRef.current)
      .transition()
      .duration(300)
      .call(zoomBehaviorRef.current.scaleBy, factor);
  };

  const resetZoom = () => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    d3.select(svgRef.current)
      .transition()
      .duration(400)
      .call(zoomBehaviorRef.current.transform, d3.zoomIdentity);
  };

  const activeStat = active ? STATE_STATS[active] : undefined;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:gap-8">
      {/* ---------------- MAP ---------------- */}
      <div className="relative overflow-hidden border border-[var(--color-border)] bg-[var(--color-brand-tint)]">
        <style>{`
          @keyframes mapFadeIn {
            from { opacity: 0; transform: scale(0.98); }
            to   { opacity: 1; transform: scale(1); }
          }
          .osm-state { transform-origin: center; transform-box: fill-box; }
        `}</style>

        {/* zoom controls */}
        <div className="absolute right-4 top-4 z-10 flex flex-col gap-1.5">
          {[
            { label: "Zoom in", symbol: "+", onClick: () => zoomBy(1.4) },
            { label: "Zoom out", symbol: "\u2212", onClick: () => zoomBy(1 / 1.4) },
          ].map(({ label, symbol, onClick }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              onClick={onClick}
              className="flex h-8 w-8 items-center justify-center border border-[var(--color-border)] bg-white text-[15px] font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-brand)] hover:text-white"
            >
              {symbol}
            </button>
          ))}
          <button
            type="button"
            aria-label="Reset view"
            onClick={resetZoom}
            className="flex h-8 items-center justify-center border border-[var(--color-border)] bg-white px-1.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] transition-colors hover:bg-[var(--color-brand)] hover:text-white"
          >
            Reset
          </button>
        </div>

        {status === "loading" && (
          <div className="flex aspect-[7/7.6] w-full animate-pulse items-center justify-center">
            <p className="text-[13px] text-[var(--color-muted)]">Loading map…</p>
          </div>
        )}

        {status === "error" && (
          <div className="flex aspect-[7/7.6] w-full flex-col items-center justify-center gap-2 px-6 text-center">
            <p className="text-[14px] font-medium text-[var(--color-ink)]">
              Map data couldn&apos;t be loaded
            </p>
            <p className="text-[13px] text-[var(--color-body)]">
              Check that <code>{TOPOLOGY_URL}</code> exists in your{" "}
              <code>public</code> folder.
            </p>
          </div>
        )}

        {status === "ready" && features && pathGen && (
          <svg
            ref={svgRef}
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            className="h-auto w-full cursor-grab touch-none active:cursor-grabbing"
            role="img"
            aria-label="Map of India showing OneSIS presence across states"
          >
            <g ref={gRef}>
              {features.map((f, i) => {
                const name = f.properties.st_nm;
                const isActive = active === name;
                return (
                  <path
                    key={name}
                    d={pathGen(f) ?? undefined}
                    className="osm-state cursor-pointer outline-none transition-[fill,fill-opacity] duration-200"
                    style={{
                      fill: "var(--color-brand)",
                      fillOpacity: isActive ? 0.95 : 0.32,
                      stroke: "var(--color-offwhite)",
                      strokeWidth: 0.6,
                      animation: "mapFadeIn 500ms ease both",
                      animationDelay: `${i * 10}ms`,
                    }}
                    onMouseEnter={() => setHovered(name)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(name)}
                    onBlur={() => setHovered(null)}
                    onClick={() => setSelected((s) => (s === name ? null : name))}
                    tabIndex={0}
                    role="button"
                    aria-pressed={selected === name}
                  >
                    <title>{name}</title>
                  </path>
                );
              })}
            </g>
          </svg>
        )}

        <p className="pointer-events-none absolute bottom-3 left-4 text-[11px] text-[var(--color-muted)]">
          Scroll to zoom · drag to pan · tap a state
        </p>
      </div>

      {/* ---------------- INFO PANEL ---------------- */}
      <div className="flex flex-col justify-between border border-[var(--color-border)] bg-white p-6">
        {active ? (
          <div>
            <p className="eyebrow text-[var(--color-brand)]">Selected Region</p>
            <h3 className="mt-2 font-display text-2xl leading-[1.15] text-[var(--color-ink)]">
              {active}
            </h3>

            {activeStat ? (
              <div className="mt-5 grid grid-cols-2 gap-4">
                {activeStat.districts !== undefined && (
                  <div>
                    <div className="font-display text-2xl text-[var(--color-ink)]">
                      {activeStat.districts}
                    </div>
                    <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--color-muted)]">
                      Districts
                    </div>
                  </div>
                )}
                {activeStat.offices !== undefined && (
                  <div>
                    <div className="font-display text-2xl text-[var(--color-ink)]">
                      {activeStat.offices}
                    </div>
                    <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--color-muted)]">
                      Offices
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="mt-4 text-[14px] leading-relaxed text-[var(--color-body)]">
                Part of OneSIS&apos;s pan-India network, served through our
                regional office structure and on-ground teams.
              </p>
            )}
          </div>
        ) : (
          <div>
            <p className="eyebrow text-[var(--color-brand)]">Explore the network</p>
            <h3 className="mt-2 font-display text-2xl leading-[1.15] text-[var(--color-ink)]">
              Hover or tap a state
            </h3>
            <p className="mt-3 text-[14px] leading-relaxed text-[var(--color-body)]">
              Every highlighted state on the map is part of our active
              service footprint. Select one to see it up close.
            </p>
          </div>
        )}

        <div className="mt-6 flex items-center gap-2 text-[12px] text-[var(--color-muted)]">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: "var(--color-brand)" }}
          />
          Active OneSIS presence
        </div>
      </div>
    </div>
  );
}
