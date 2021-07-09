export interface Environment {
  api: {
    isEnabled: boolean;
    port: number;
  };
  jwt: {
    secret: string;
  };
}
