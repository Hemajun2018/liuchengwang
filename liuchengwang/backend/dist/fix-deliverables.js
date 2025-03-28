"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const node_entity_1 = require("./database/entities/node.entity");
const deliverable_entity_1 = require("./database/entities/deliverable.entity");
const dotenv = require("dotenv");
dotenv.config();
async function fixDeliverables() {
    console.log('开始修复节点和交付内容的关联关系...');
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
        const foreignKeyQuery = `
      SELECT * FROM information_schema.KEY_COLUMN_USAGE
      WHERE REFERENCED_TABLE_NAME = 'nodes'
      AND TABLE_NAME = 'deliverables'
      AND CONSTRAINT_SCHEMA = '${process.env.DB_DATABASE || 'liuchengwang'}';
    `;
        const foreignKeys = await connection.query(foreignKeyQuery);
        console.log('外键约束信息:', foreignKeys);
        if (foreignKeys.length === 0) {
            console.log('未找到外键约束，添加外键约束...');
            try {
                await connection.query(`
          ALTER TABLE deliverables
          DROP FOREIGN KEY IF EXISTS FK_deliverables_node_id;
        `);
                console.log('删除旧的外键约束成功');
            }
            catch (error) {
                console.log('删除旧的外键约束失败，可能不存在:', error.message);
            }
            try {
                await connection.query(`
          ALTER TABLE deliverables
          ADD CONSTRAINT FK_deliverables_node_id
          FOREIGN KEY (node_id) REFERENCES nodes(id)
          ON DELETE CASCADE;
        `);
                console.log('添加外键约束成功');
            }
            catch (error) {
                console.error('添加外键约束失败:', error.message);
            }
        }
        console.log('检查Node实体中的deliverables关系...');
        const nodeMetadata = connection.getMetadata(node_entity_1.Node);
        const deliverableRelation = nodeMetadata.relations.find(r => r.propertyName === 'deliverables');
        if (deliverableRelation) {
            console.log('Node实体中的deliverables关系存在:', {
                propertyName: deliverableRelation.propertyName,
                type: deliverableRelation.type,
                isLazy: deliverableRelation.isLazy,
                relationType: deliverableRelation.relationType
            });
        }
        else {
            console.log('Node实体中的deliverables关系不存在');
        }
        console.log('检查Deliverable实体中的node关系...');
        const deliverableMetadata = connection.getMetadata(deliverable_entity_1.Deliverable);
        const nodeRelation = deliverableMetadata.relations.find(r => r.propertyName === 'node');
        if (nodeRelation) {
            console.log('Deliverable实体中的node关系存在:', {
                propertyName: nodeRelation.propertyName,
                type: nodeRelation.type,
                isLazy: nodeRelation.isLazy,
                relationType: nodeRelation.relationType
            });
        }
        else {
            console.log('Deliverable实体中的node关系不存在');
        }
        const deliverables = await connection.getRepository(deliverable_entity_1.Deliverable).find();
        console.log(`数据库中共有 ${deliverables.length} 个交付内容`);
        const invalidDeliverables = [];
        for (const deliverable of deliverables) {
            const node = await connection.getRepository(node_entity_1.Node).findOne({
                where: { id: deliverable.node_id }
            });
            if (!node) {
                console.log(`交付内容 ${deliverable.id} 的节点ID ${deliverable.node_id} 无效`);
                invalidDeliverables.push(deliverable);
            }
        }
        console.log(`发现 ${invalidDeliverables.length} 个无效的交付内容记录`);
        if (invalidDeliverables.length > 0) {
            console.log('开始修复无效的交付内容记录...');
            const nodes = await connection.getRepository(node_entity_1.Node).find();
            if (nodes.length === 0) {
                console.log('没有有效的节点可用于修复');
            }
            else {
                const validNodeId = nodes[0].id;
                console.log(`使用节点ID ${validNodeId} 修复无效的交付内容记录`);
                for (const deliverable of invalidDeliverables) {
                    await connection.getRepository(deliverable_entity_1.Deliverable).update({ id: deliverable.id }, { node_id: validNodeId });
                    console.log(`已修复交付内容 ${deliverable.id}`);
                }
            }
        }
        console.log('修复完成');
    }
    catch (error) {
        console.error('修复过程中出错:', error);
    }
    finally {
        await connection.close();
        console.log('数据库连接已关闭');
    }
}
fixDeliverables()
    .then(() => console.log('修复脚本执行完毕'))
    .catch(error => console.error('修复脚本执行失败:', error));
//# sourceMappingURL=fix-deliverables.js.map