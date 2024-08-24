export interface Marker {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Polygon {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number }[];
}
