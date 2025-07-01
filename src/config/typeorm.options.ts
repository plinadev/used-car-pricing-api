import { DataSourceOptions } from 'typeorm';

function isRunningInTs(): boolean {
  return __filename.endsWith('.ts');
}

export function buildDataSourceOptions(
  env: string = process.env.NODE_ENV || 'development',
): DataSourceOptions {
  const fileExt = isRunningInTs() ? 'ts' : 'js';

  switch (env) {
    case 'development':
      return {
        type: 'sqlite',
        database: 'db.sqlite',
        entities: [`src/**/*.entity.${fileExt}`],
        migrations: [`src/migrations/*.${fileExt}`],
        synchronize: false,
      };
    case 'test':
      return {
        type: 'sqlite',
        database: 'test.sqlite',
        entities: [`src/**/*.entity.${fileExt}`],
        migrations: [`src/migrations/*.${fileExt}`],
        synchronize: true,
      };
    case 'production':
      return {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        migrationsRun: true,
        entities: [`src/**/*.entity.${fileExt}`],
        migrations: [`src/migrations/*.${fileExt}`],
        synchronize: false,
        ssl: {
          rejectUnauthorized: false,
        },
      };
    default:
      throw new Error(`Unsupported NODE_ENV: ${env}`);
  }
}
