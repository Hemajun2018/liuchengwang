"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async create(createUserDto) {
        const existingUser = await this.userRepository.findOne({
            where: { username: createUserDto.username },
        });
        if (existingUser) {
            throw new common_1.ConflictException('用户名已存在');
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });
        return this.userRepository.save(user);
    }
    async login(loginDto) {
        console.log('开始登录验证:', {
            username: loginDto.username,
            password: loginDto.password
        });
        const user = await this.userRepository.findOne({
            where: { username: loginDto.username },
        });
        if (!user) {
            console.log('用户不存在:', loginDto.username);
            throw new common_1.UnauthorizedException('用户名或密码不正确');
        }
        console.log('找到用户:', {
            username: user.username,
            storedHash: user.password
        });
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        console.log('密码验证结果:', {
            inputPassword: loginDto.password,
            storedHash: user.password,
            isValid: isPasswordValid
        });
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('用户名或密码不正确');
        }
        const payload = {
            id: user.id,
            username: user.username,
            role: user.role
        };
        const token = this.jwtService.sign(payload);
        console.log('登录成功，生成token');
        const { password, ...result } = user;
        return {
            token,
            user: result,
        };
    }
    async findOne(id) {
        const user = await this.userRepository.findOne({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException(`用户ID ${id} 不存在`);
        }
        return user;
    }
    async findByUsername(username) {
        return this.userRepository.findOne({
            where: { username },
        });
    }
    async findAll(params) {
        const { page, pageSize, keyword, role } = params;
        const skip = (page - 1) * pageSize;
        const queryBuilder = this.userRepository.createQueryBuilder('user');
        if (keyword) {
            queryBuilder.where('(user.username LIKE :keyword OR user.realName LIKE :keyword OR user.email LIKE :keyword OR user.phone LIKE :keyword)', { keyword: `%${keyword}%` });
        }
        if (role) {
            queryBuilder.andWhere('user.role = :role', { role });
        }
        const [items, total] = await queryBuilder
            .skip(skip)
            .take(pageSize)
            .getManyAndCount();
        return {
            items: items.map(item => {
                const { password, ...rest } = item;
                return rest;
            }),
            total,
        };
    }
    async update(id, updateUserDto) {
        const user = await this.findOne(id);
        Object.assign(user, updateUserDto);
        return this.userRepository.save(user);
    }
    async remove(id) {
        const user = await this.findOne(id);
        await this.userRepository.remove(user);
    }
    async updatePassword(id, updatePasswordDto) {
        const { oldPassword, newPassword } = updatePasswordDto;
        const user = await this.findOne(id);
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('旧密码不正确');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await this.userRepository.save(user);
    }
    async updateRole(id, role) {
        const user = await this.findOne(id);
        user.role = role;
        return this.userRepository.save(user);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map