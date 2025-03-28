"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateIssuesTable1710000000002 = void 0;
const typeorm_1 = require("typeorm");
class CreateIssuesTable1710000000002 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'issues',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'node_id',
                    type: 'int'
                },
                {
                    name: 'content',
                    type: 'text'
                },
                {
                    name: 'status',
                    type: 'enum',
                    enum: ['pending', 'resolved'],
                    default: "'pending'"
                },
                {
                    name: 'start_date',
                    type: 'date',
                    isNullable: true
                },
                {
                    name: 'expected_end_date',
                    type: 'date',
                    isNullable: true
                },
                {
                    name: 'duration_days',
                    type: 'int',
                    isNullable: true
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
        await queryRunner.createForeignKey('issues', new typeorm_1.TableForeignKey({
            columnNames: ['node_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'nodes',
            onDelete: 'CASCADE'
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('issues');
        const foreignKey = table?.foreignKeys.find(fk => fk.columnNames.indexOf('node_id') !== -1);
        if (foreignKey) {
            await queryRunner.dropForeignKey('issues', foreignKey);
        }
        await queryRunner.dropTable('issues');
    }
}
exports.CreateIssuesTable1710000000002 = CreateIssuesTable1710000000002;
//# sourceMappingURL=1710000000002-CreateIssuesTable.js.map