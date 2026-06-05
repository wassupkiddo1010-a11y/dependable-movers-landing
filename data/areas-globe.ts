export const AREAS_GLOBE_MARKERS = [
  { lat: 36.17, lng: -115.14, label: "Nevada" },
  { lat: 40.71, lng: -74.01, label: "New York" },
  { lat: 34.0, lng: -81.03, label: "South Carolina" },
  { lat: 33.75, lng: -84.39, label: "Georgia" },
  { lat: 35.47, lng: -97.52, label: "Oklahoma" },
  { lat: 32.78, lng: -96.8, label: "Texas" },
  { lat: 37.54, lng: -77.44, label: "Virginia" },
  { lat: 33.45, lng: -112.07, label: "Arizona" },
  { lat: 21.31, lng: -157.86, label: "Hawaii" },
] as const;

export const AREAS_GLOBE_CONNECTIONS: {
  from: [number, number];
  to: [number, number];
}[] = [
  { from: [40.71, -74.01], to: [37.54, -77.44] },
  { from: [37.54, -77.44], to: [34.0, -81.03] },
  { from: [34.0, -81.03], to: [33.75, -84.39] },
  { from: [32.78, -96.8], to: [35.47, -97.52] },
  { from: [36.17, -115.14], to: [33.45, -112.07] },
  { from: [32.78, -96.8], to: [36.17, -115.14] },
  { from: [40.71, -74.01], to: [32.78, -96.8] },
  { from: [33.45, -112.07], to: [21.31, -157.86] },
];

export const AREAS_GLOBE_COLORS = {
  dotColor: "rgba(22, 51, 91, ALPHA)",
  arcColor: "rgba(237, 125, 34, 0.45)",
  markerColor: "rgba(237, 125, 34, 1)",
  autoRotateSpeed: 0.002,
} as const;
