export interface ServerConfig {
  env: string;
  port: number;
  dbHost: string;
  dbName: string;
  dbUser: string;
  dbPassword: string;
}

export interface AppConfigEnv {
  ENABLE_FEATURE_X: string;
}

export interface AppConfig {
  enableFeatureX: boolean;
}
