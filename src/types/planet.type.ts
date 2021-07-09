export interface Planet {
  name: string;
  password: string;
  latitude: number;
  longitude: number;
}

export interface CreatePlanet {
  name: Planet['name'];
  password: Planet['password'];
  latitude: Planet['latitude'];
  longitude: Planet['longitude'];
}
