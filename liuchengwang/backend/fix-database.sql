-- 首先禁用外键检查
SET FOREIGN_KEY_CHECKS=0;

-- 修改deliverables表结构
ALTER TABLE deliverables
DROP FOREIGN KEY FK_5d7b950eb7c657c0492fb291767;

-- 重新创建外键约束
ALTER TABLE deliverables
ADD CONSTRAINT FK_deliverables_node_id FOREIGN KEY (node_id) REFERENCES nodes(id) ON DELETE CASCADE;

-- 启用外键检查
SET FOREIGN_KEY_CHECKS=1; 