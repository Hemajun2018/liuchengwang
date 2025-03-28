-- 插入管理员账号
-- 密码为 admin123 的bcrypt加密值
INSERT INTO user (username, password, role, real_name) 
VALUES (
  'admin', 
  '$2b$10$Q3E17pDQVfLZT2oCgkaabua9aZI0XSRkAKcltkRip3baqlkxLPkI6',
  'admin',
  '系统管理员'
); 