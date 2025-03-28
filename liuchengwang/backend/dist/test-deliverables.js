"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const node_entity_1 = require("./database/entities/node.entity");
const deliverable_entity_1 = require("./database/entities/deliverable.entity");
const dotenv = require("dotenv");
dotenv.config();
async function testDeliverables() {
    console.log('开始测试节点和交付内容的关联关系...');
    const connection = await (0, typeorm_1.createConnection)({
        type: 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE || 'liuchengwang',
        entities: [node_entity_1.Node, deliverable_entity_1.Deliverable],
        synchronize: false
    });
    try {
        const deliverables = await connection.getRepository(deliverable_entity_1.Deliverable).find();
        console.log(`数据库中共有 ${deliverables.length} 个交付内容`);
        if (deliverables.length > 0) {
            console.log('第一个交付内容:', deliverables[0]);
        }
        const nodeId = 37;
        const nodeDeliverables = await connection.getRepository(deliverable_entity_1.Deliverable).find({
            where: { node_id: nodeId }
        });
        console.log(`节点 ${nodeId} 的交付内容数量: ${nodeDeliverables.length}`);
        const node = await connection.getRepository(node_entity_1.Node).findOne({
            where: { id: nodeId },
            relations: ['deliverables']
        });
        if (node) {
            console.log(`节点 ${nodeId} 信息:`, {
                id: node.id,
                name: node.name,
                deliverables: node.deliverables ? node.deliverables.length : 0
            });
            if (node.deliverables && node.deliverables.length > 0) {
                console.log('节点的第一个交付内容:', node.deliverables[0]);
            }
            else {
                console.log('节点没有关联的交付内容');
            }
        }
        else {
            console.log(`未找到节点 ${nodeId}`);
        }
        const foreignKeyQuery = `
      SELECT * FROM information_schema.KEY_COLUMN_USAGE
      WHERE REFERENCED_TABLE_NAME = 'nodes'
      AND TABLE_NAME = 'deliverables'
      AND CONSTRAINT_SCHEMA = '${process.env.DB_DATABASE || 'liuchengwang'}';
    `;
        const foreignKeys = await connection.query(foreignKeyQuery);
        console.log('外键约束信息:', foreignKeys);
    }
    catch (error) {
        console.error('测试过程中出错:', error);
    }
    finally {
        await connection.close();
        console.log('数据库连接已关闭');
    }
}
testDeliverables()
    .then(() => console.log('测试脚本执行完毕'))
    .catch(error => console.error('测试脚本执行失败:', error));
//# sourceMappingURL=test-deliverables.js.map