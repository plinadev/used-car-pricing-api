import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { buildDataSourceOptions } from './typeorm.options';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const baseOptions = buildDataSourceOptions(
      this.configService.get('NODE_ENV'),
    );
    return {
      ...baseOptions,
      autoLoadEntities: true, // ← Specific to NestJS
    };
  }
}
