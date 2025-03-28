"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNodesTable1710000000001 = void 0;
const typeorm_1 = require("typeorm");
class CreateNodesTable1710000000001 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'nodes',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'project_id',
                    type: 'int'
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '100'
                },
                {
                    name: 'order',
                    type: 'int'
                },
                {
                    name: 'status',
                    type: 'enum',
                    enum: ['not_started', 'in_progress', 'completed', 'delayed'],
                    default: "'not_started'"
                },
                {
                    name: 'expected_end_date',
                    type: 'datetime',
                    isNullable: true
                },
                {
                    name: 'actual_end_date',
                    type: 'datetime',
                    isNullable: true
                },
                {
                    name: 'is_prerequisite',
                    type: 'boolean',
                    default: false
                },
                {
                    name: 'is_result',
                    type: 'boolean',
                    default: false
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
        await queryRunner.createForeignKey('nodes', new typeorm_1.TableForeignKey({
            columnNames: ['project_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'projects',
            onDelete: 'CASCADE'
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('nodes');
        const foreignKey = table?.foreignKeys.find(fk => fk.columnNames.indexOf('project_id') !== -1);
        if (foreignKey) {
            await queryRunner.dropForeignKey('nodes', foreignKey);
        }
        await queryRunner.dropTable('nodes');
    }
}
exports.CreateNodesTable1710000000001 = CreateNodesTable1710000000001;
//# sourceMappingURL=1710000000001-CreateNodesTable.js.map