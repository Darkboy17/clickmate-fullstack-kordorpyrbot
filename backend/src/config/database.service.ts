// src/database/database.service.ts
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService implements OnModuleInit {
    private readonly logger = new Logger(DatabaseService.name);

    constructor(
        @InjectDataSource()
        private readonly dataSource: DataSource,
    ) { }

    async onModuleInit() {
        if (this.dataSource.isInitialized) {
            const dbHost = 'host' in this.dataSource.options ? this.dataSource.options.host : 'unknown host';
            const dbName = this.dataSource.options.database;

            this.logger.log(`✅ Successfully connected to MySQL database '${dbName}' on ${dbHost}`);

            try {
                const result = await this.dataSource.query('SELECT VERSION() as version');
                this.logger.log(`📊 MySQL Server Version: ${result[0].version}`);

                // Get connection information
                const connectionInfo = await this.dataSource.query('SELECT CONNECTION_ID() as connectionId');
                this.logger.log(`🔌 Connection ID: ${connectionInfo[0].connectionId}`);
            } catch (error) {
                this.logger.error('Error fetching database information', error.stack);
            }
        } else {
            this.logger.error('❌ Database connection failed');
        }
    }
}