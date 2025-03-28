"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMaterialsTable1710000000003 = void 0;
const typeorm_1 = require("typeorm");
class CreateMaterialsTable1710000000003 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'materials',
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
                    name: 'name',
                    type: 'varchar',
                    length: '100'
                },
                {
                    name: 'content',
                    type: 'text'
                },
                {
                    name: 'file_url',
                    type: 'varchar',
                    length: '255',
                    isNullable: true
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
        await queryRunner.createForeignKey('materials', new typeorm_1.TableForeignKey({
            columnNames: ['node_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'nodes',
            onDelete: 'CASCADE'
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('materials');
        const foreignKey = table?.foreignKeys.find(fk => fk.columnNames.indexOf('node_id') !== -1);
        if (foreignKey) {
            await queryRunner.dropForeignKey('materials', foreignKey);
        }
        await queryRunner.dropTable('materials');
    }
}
exports.CreateMaterialsTable1710000000003 = CreateMaterialsTable1710000000003;
//# sourceMappingURL=1710000000003-CreateMaterialsTable.js.map