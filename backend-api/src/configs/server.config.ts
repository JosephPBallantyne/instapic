import { ServerConfig } from '../types/configs.type';

class ServerConfigImpl implements ServerConfig {
  public env: string;

  public port: number;

  public dbHost: string;

  public dbName: string;

  public dbUser: string;

  public dbPassword: string;

  // eslint-disable-next-line camelcase
  public jwt_secret: string;

  constructor() {
    this.env = process.env.NODE_ENV || 'local';
    this.port = (process.env.PORT as any as number) || 3000;
    this.dbHost = process.env.POSTGRES_HOST || '';
    this.dbName = process.env.POSTGRES_DATABASE || '';
    this.dbUser = process.env.POSTGRES_USER || '';
    this.dbPassword = process.env.POSTGRES_PASSWORD || '';
    this.jwt_secret = process.env.JWT_SECRET || '';
  }
}

export default ServerConfigImpl;
