let config = {
    type: 'postgres',
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT),
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    cache: {
        type: 'redis',
        options: {
            host: process.env.REDISHOST,
            port: parseInt(process.env.REDISPORT),
        },
        duration: 30000,
    },
};

switch (process.env.NODE_ENV) {
    case 'dev':
        config = {
            ...config,
            synchronize: false,
            logging: ["query"],
            entities: ['**/*.entity.js'],
            migrationsRun: false,
            migrations: ['src/migrations/**/*.js'],
            cli: {
                migrationsDir: 'src/migrations',
            },
        };

        break;
    case 'test':
        config = {
            ...config,
            synchronize: true,
            logging: false,
            entities: ['**/*.entity.ts'],
        };
        break;
    case 'production':
        config = {
            ...config,
            synchronize: false,
            logging: false,
            entities: ['**/*.entity.js'],
            migrationsRun: false,
            migrations: ['src/migrations/**/*.js'],
            cli: {
                migrationsDir: 'src/migrations',
            },
        };
        break;
    default:
        break;
}

module.exports = config;