// Haversine distance in meters between two lat/lng points.
export function haversineMeters(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

export interface Site {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radius_m: number;
}

export interface NearestSite {
  site: Site | null;
  distance_m: number | null;
  inside: boolean;
}

export function nearestSite(
  lat: number,
  lng: number,
  sites: Site[],
): NearestSite {
  if (sites.length === 0) return { site: null, distance_m: null, inside: false };
  let best: Site = sites[0];
  let bestDist = Infinity;
  for (const s of sites) {
    const d = haversineMeters(lat, lng, Number(s.latitude), Number(s.longitude));
    if (d < bestDist) {
      bestDist = d;
      best = s;
    }
  }
  return { site: best, distance_m: bestDist, inside: bestDist <= best.radius_m };
}

export function captureGPS(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject(new Error("Geolocation unsupported"));
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    });
  });
}
