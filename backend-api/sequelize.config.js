let config = {
  local: {
    username: 'Joe',
    database: 'instapic',
    password: '',
    host: 'localhost',
    dialect: 'postgres',
  },
  development: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_NAME,
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
  },
};

if (process.env.NODE_ENV === 'local') {
  config = config.local;
} else if (process.env.NODE_ENV === 'development') {
  config = config.development;
} else {
  config = config.local;
}

console.log(
  `Running sequelize-cli on host: ${config.host}; db: ${config.database}`
);
module.exports = {
  ...config,
};
