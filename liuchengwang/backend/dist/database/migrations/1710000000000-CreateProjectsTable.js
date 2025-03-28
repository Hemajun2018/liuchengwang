"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProjectsTable1710000000000 = void 0;
const typeorm_1 = require("typeorm");
class CreateProjectsTable1710000000000 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'projects',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '100',
                    isUnique: true
                },
                {
                    name: 'password',
                    type: 'varchar',
                    length: '100'
                },
                {
                    name: 'deliverables',
                    type: 'text',
                    isNullable: true
                },
                {
                    name: 'status',
                    type: 'enum',
                    enum: ['not_started', 'in_progress', 'completed', 'delayed'],
                    default: "'not_started'"
                },
                {
                    name: 'start_date',
                    type: 'datetime',
                    isNullable: true
                },
                {
                    name: 'days_to_complete',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'expected_end_date',
                    type: 'datetime',
                    isNullable: true
                },
                {
                    name: 'created_by',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'start_time',
                    type: 'date',
                    isNullable: true
                },
                {
                    name: 'end_time',
                    type: 'date',
                    isNullable: true
                },
                {
                    name: 'days_needed',
                    type: 'int',
                    default: 0
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP'
                }
            ]
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('projects');
    }
}
exports.CreateProjectsTable1710000000000 = CreateProjectsTable1710000000000;
//# sourceMappingURL=1710000000000-CreateProjectsTable.js.map