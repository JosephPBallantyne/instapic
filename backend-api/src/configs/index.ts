import ServerConfig from './server.config';

class Config {
  public static server: ServerConfig;

  constructor() {
    this.initServerConfig();
  }

  public initServerConfig = () => {
    console.log('Loading Server configs...');
    try {
      Config.server = new ServerConfig();
      console.log('Server configs loaded successfully.');
    } catch (err) {
      console.log('Server configs failed to load.');
    }
  };
}

export default Config;
