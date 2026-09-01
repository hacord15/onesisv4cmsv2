"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";

interface StateProps {
  st_nm: string;
  st_code?: string;
}

type StateFeature = GeoJSON.Feature<GeoJSON.Geometry, StateProps>;

interface StateStat {
  districts?: number;
  offices?: number;
}

interface OfficeLocation {
  city: string;
  type: "Corporate Office" | "Regional Office";
  lat: number;
  lon: number;
}

const STATE_STATS: Record<string, StateStat> = {};

const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    city: "Delhi",
    type: "Corporate Office",
    lat: 28.6139,
    lon: 77.209,
  },
  {
    city: "Mumbai",
    type: "Regional Office",
    lat: 19.076,
    lon: 72.8777,
  },
  {
    city: "Bangalore",
    type: "Regional Office",
    lat: 12.9716,
    lon: 77.5946,
  },
  {
    city: "Gurugram",
    type: "Regional Office",
    lat: 28.4595,
    lon: 77.0266,
  },
  {
    city: "Kolkata",
    type: "Regional Office",
    lat: 22.5726,
    lon: 88.3639,
  },
  {
    city: "Hyderabad",
    type: "Regional Office",
    lat: 17.385,
    lon: 78.4867,
  },
];

const WIDTH = 700;
const HEIGHT = 760;
const TOPOLOGY_URL = "/data/india-states.json";

export default function IndiaPresenceMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement>(null);
  const zoomBehaviorRef =
    useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);

  const [features, setFeatures] = useState<StateFeature[] | null>(null);
  const [pathGen, setPathGen] = useState<d3.GeoPath | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );

  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedOffice, setSelectedOffice] = useState<string | null>(null);

  const active = selected ?? hovered;
  const activeStat = active ? STATE_STATS[active] : undefined;

  const activeOffice = OFFICE_LOCATIONS.find(
    (office) => office.city === selectedOffice
  );

  useEffect(() => {
    let cancelled = false;

    d3.json<any>(TOPOLOGY_URL)
      .then((topology) => {
        if (!topology || cancelled) return;

        const objectName = Object.keys(topology.objects)[0];

        const geo = topojson.feature(
          topology,
          topology.objects[objectName]
        ) as unknown as GeoJSON.FeatureCollection<
          GeoJSON.Geometry,
          StateProps
        >;

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
    svg.on("dblclick.zoom", null);
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
      .call(
        zoomBehaviorRef.current.transform,
        d3.zoomIdentity
      );
  };

  const getOfficePosition = (office: OfficeLocation) => {
    if (!pathGen) return null;

    const projection = pathGen.projection();

    if (!projection) return null;

    // Check if projection is callable (GeoProjection) and use it
    if (typeof projection === 'function') {
      const point = projection([office.lon, office.lat]);
      if (!point) return null;
      
      return {
        x: point[0],
        y: point[1],
      };
    }

    // If it's a GeoStreamWrapper, we can't use it for point projection
    // Return null and log a warning
    console.warn('Projection is not callable for point projection');
    return null;
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:gap-8">
      <div className="relative overflow-hidden border border-[var(--color-border)] bg-[var(--color-brand-tint)]">
        <style>{`
          @keyframes mapFadeIn {
            from {
              opacity: 0;
              transform: scale(0.98);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          .osm-state {
            transform-origin: center;
            transform-box: fill-box;
          }

          .office-marker {
            transition:
              transform 180ms ease,
              opacity 180ms ease;
          }

          .office-marker:hover {
            transform: scale(1.15);
          }
        `}</style>

        <div className="absolute right-4 top-4 z-20 flex flex-col gap-1.5">
          {[
            {
              label: "Zoom in",
              symbol: "+",
              onClick: () => zoomBy(1.4),
            },
            {
              label: "Zoom out",
              symbol: "−",
              onClick: () => zoomBy(1 / 1.4),
            },
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
            <p className="text-[13px] text-[var(--color-muted)]">
              Loading map…
            </p>
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
            aria-label="Map of India showing OneSIS presence and office locations"
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
                    onClick={() =>
                      setSelected((s) => (s === name ? null : name))
                    }
                    tabIndex={0}
                    role="button"
                    aria-pressed={selected === name}
                  >
                    <title>{name}</title>
                  </path>
                );
              })}

              {OFFICE_LOCATIONS.map((office) => {
                const position = getOfficePosition(office);

                if (!position) return null;

                const isSelected = selectedOffice === office.city;
                const isCorporate = office.type === "Corporate Office";

                return (
                  <g
                    key={office.city}
                    className="office-marker cursor-pointer"
                    transform={`translate(${position.x}, ${position.y})`}
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedOffice((current) =>
                        current === office.city ? null : office.city
                      );
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`${office.city}, ${office.type}`}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setSelectedOffice((current) =>
                          current === office.city ? null : office.city
                        );
                      }
                    }}
                  >
                    <circle
                      r={isSelected ? 9 : 7}
                      fill="white"
                      stroke="var(--color-ink)"
                      strokeWidth={1.5}
                    />

                    <circle
                      r={isSelected ? 5 : 4}
                      fill={
                        isCorporate
                          ? "var(--color-brand)"
                          : "var(--color-ink)"
                      }
                    />

                    {isSelected && (
                      <circle
                        r="12"
                        fill="none"
                        stroke={
                          isCorporate
                            ? "var(--color-brand)"
                            : "var(--color-ink)"
                        }
                        strokeWidth="1.2"
                        opacity="0.5"
                      />
                    )}

                    <text
                      x="10"
                      y="4"
                      fontSize="11"
                      fontWeight="600"
                      fill="var(--color-ink)"
                      paintOrder="stroke"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    >
                      {office.city}
                    </text>

                    <title>
                      {office.city} — {office.type}
                    </title>
                  </g>
                );
              })}
            </g>
          </svg>
        )}

        <div className="absolute bottom-4 left-4 flex flex-wrap gap-3 border border-[var(--color-border)] bg-white/95 px-3 py-2 shadow-sm">
          <div className="flex items-center gap-2 text-[11px] font-medium text-[var(--color-ink)]">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-brand)]" />
            Corporate Office
          </div>

          <div className="flex items-center gap-2 text-[11px] font-medium text-[var(--color-ink)]">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-ink)]" />
            Regional Office
          </div>
        </div>

        <p className="pointer-events-none absolute bottom-3 right-4 text-[11px] text-[var(--color-muted)]">
          Scroll to zoom · drag to pan · tap a location
        </p>
      </div>

      <div className="flex flex-col justify-between border border-[var(--color-border)] bg-white p-6">
        {activeOffice ? (
          <div>
            <p className="eyebrow text-[var(--color-brand)]">
              {activeOffice.type}
            </p>

            <h3 className="mt-2 font-display text-2xl leading-[1.15] text-[var(--color-ink)]">
              {activeOffice.city}
            </h3>

            <p className="mt-4 text-[14px] leading-relaxed text-[var(--color-body)]">
              {activeOffice.city === "Delhi"
                ? "Our corporate office and central hub supporting OneSIS operations and business leadership."
                : `Our ${activeOffice.type.toLowerCase()} supporting clients, teams, and on-ground service delivery across the region.`}
            </p>

            <div className="mt-6 border-t border-[var(--color-border)] pt-5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--color-muted)]">
                Office Location
              </div>

              <div className="mt-2 flex items-center gap-2 text-[14px] font-medium text-[var(--color-ink)]">
                <span className="h-2 w-2 rounded-full bg-[var(--color-brand)]" />
                {activeOffice.city}, India
              </div>
            </div>
          </div>
        ) : active ? (
          <div>
            <p className="eyebrow text-[var(--color-brand)]">
              Selected Region
            </p>

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
            <p className="eyebrow text-[var(--color-brand)]">
              Explore the network
            </p>

            <h3 className="mt-2 font-display text-2xl leading-[1.15] text-[var(--color-ink)]">
              Our India office network
            </h3>

            <p className="mt-3 text-[14px] leading-relaxed text-[var(--color-body)]">
              OneSIS operates through a central Corporate Office in Delhi and
              Regional Offices across Mumbai, Bangalore, Gurugram, Kolkata,
              and Hyderabad.
            </p>

            <div className="mt-6 space-y-3">
              {OFFICE_LOCATIONS.map((office) => (
                <button
                  key={office.city}
                  type="button"
                  onClick={() => setSelectedOffice(office.city)}
                  className="flex w-full items-center justify-between border-b border-[var(--color-border)] pb-3 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        office.type === "Corporate Office"
                          ? "bg-[var(--color-brand)]"
                          : "bg-[var(--color-ink)]"
                      }`}
                    />

                    <span className="text-[13px] font-medium text-[var(--color-ink)]">
                      {office.city}
                    </span>
                  </div>

                  <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">
                    {office.type === "Corporate Office"
                      ? "Corporate"
                      : "Regional"}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center gap-2 text-[12px] text-[var(--color-muted)]">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: "var(--color-brand)" }}
          />
          OneSIS office presence
        </div>
      </div>
    </div>
  );
}