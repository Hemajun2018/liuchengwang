"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const project_entity_1 = require("../entities/project.entity");
const prerequisite_entity_1 = require("../entities/prerequisite.entity");
const dotenv = require("dotenv");
dotenv.config();
async function migratePrerequisites() {
    console.log('开始迁移前置条件数据...');
    const connection = await (0, typeorm_1.createConnection)({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '3306'),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [project_entity_1.Project, prerequisite_entity_1.Prerequisite],
        synchronize: false
    });
    try {
        const projects = await connection.getRepository(project_entity_1.Project).find();
        console.log(`找到 ${projects.length} 个项目`);
        await connection.query(`
      CREATE TABLE IF NOT EXISTS prerequisites (
        id int NOT NULL AUTO_INCREMENT,
        project_id varchar(36) NOT NULL,
        content text NOT NULL,
        start_date date DEFAULT NULL,
        expected_end_date date DEFAULT NULL,
        duration_days int DEFAULT NULL,
        status varchar(20) DEFAULT 'pending',
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (id),
        KEY FK_prerequisites_project (project_id),
        CONSTRAINT FK_prerequisites_project FOREIGN KEY (project_id) REFERENCES projects (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
        console.log('前置条件表创建成功');
        for (const project of projects) {
            if (project.deliverables) {
                console.log(`迁移项目 ${project.id} 的前置条件: ${project.deliverables}`);
                const prerequisite = new prerequisite_entity_1.Prerequisite();
                prerequisite.project_id = project.id;
                prerequisite.content = project.deliverables;
                prerequisite.status = 'pending';
                await connection.getRepository(prerequisite_entity_1.Prerequisite).save(prerequisite);
                console.log(`项目 ${project.id} 的前置条件迁移成功`);
            }
        }
        console.log('前置条件数据迁移完成');
    }
    catch (error) {
        console.error('迁移过程中出错:', error);
    }
    finally {
        await connection.close();
        console.log('数据库连接已关闭');
    }
}
migratePrerequisites()
    .then(() => console.log('迁移脚本执行完毕'))
    .catch(error => console.error('迁移脚本执行失败:', error));
//# sourceMappingURL=migrate-prerequisites.js.map