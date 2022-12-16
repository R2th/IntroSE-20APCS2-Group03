# Giới thiệu
Nếu bạn đã làm hoặc đọc qua về Laravel, Spring boot thì không lạ lẫm gì với Repository Pattern. Có rất nhiều bài viết nói về lý do sử dụng, lợi ích rồi nên trong bài viết này, mình sẽ build một module demo sử dụng NestJS framework kết hợp với TypeORM, MySQL.
# Tích hợp TypeORM
## Cài đặt dependencies
Để tích hợp TypeORM với Nest:
```bash
$ npm install --save @nestjs/typeorm typeorm mysql
```
## Tích hợp vào project
Để tích hợp với Nest, chúng ta sẽ thêm vào file `app.module.ts` của Project
```ts
TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [],
}),
```
Các option trên đều là cái option cơ bản của TypeORM, các bạn có thể tham khảo tại đây để tìm hiểu rõ hơn và tùy biến nhé
https://typeorm.io/#/connection-options
## Database migration
Với các ORM Framework/lib, database migration là phần không thể thiếu được, tiếp theo mình sẽ tiếp tục tích hợp thêm phần migration
Tạo file ```ormconfig.ts```
```ts
export = {
  host: process.env.DATABASE_HOST,
  type: 'mysql',
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB_NAME,
  migrations: [
    'src/database/migrations/*.ts',
  ],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
```
Trong đó:
1. `migrations`: Chỉ định cho TypeORM biết thư mục chứa file migration
2. `cli/migrationsDir`: Chỉ định thư mục chưa file migration khi tạo file với CLI

## Thêm CLI command
Chúng ta thêm 3 script vào file `package.json`:
```json
"migrate:create": "ts-node ./node_modules/typeorm/cli.js migration:create -n",
"migrate:up": "ts-node ./node_modules/typeorm/cli.js migration:run",
"migrate:down": "ts-node ./node_modules/typeorm/cli.js migration:revert"
```
# Migration, Model, Repository
## Tạo base Service
Với các project áp dụng Repository Pattern, chúng ta thường sẽ có thêm một lớp Service để xử lý các logic liên quan đến nghiệp vụ.
Trước tiên mình sẽ tạo base Interface
Tạo file `i.base.service.ts`
```ts
import { EntityId } from 'typeorm/repository/EntityId'
import { DeleteResult } from 'typeorm'

export interface IBaseService<T> {
  index(): Promise<T[]>

  findById(id: EntityId): Promise<T>

  findByIds(id: [EntityId]): Promise<T[]>

  store(data: any): Promise<T>

  update(id: EntityId, data: any): Promise<T>

  delete(id: EntityId): Promise<DeleteResult>
}
```

Trong này mình sẽ định nghĩa sẵn một số method thường hay được sử dụng, vì là base nên cả `class` và `interface` mình sẽ sử dụng `Generics`

Tạo file `base.service.ts`
```ts
import { BaseEntity, DeleteResult, Repository } from 'typeorm'
import { IBaseService } from './i.base.service'
import { EntityId } from 'typeorm/repository/EntityId'
import { LoggerService } from './logger/custom.logger'

export class BaseService<T extends BaseEntity, R extends Repository<T>> implements IBaseService<T> {
  protected readonly repository: R
  protected readonly logger: LoggerService

  constructor(repository: R, logger: LoggerService) {
    this.repository = repository
    this.logger = logger
  }

  index(): Promise<T[]> {
    return this.repository.find()
  }

  findById(id: EntityId): Promise<T> {
    return this.repository.findOne(id)
  }

  findByIds(ids: [EntityId]): Promise<T[]> {
    return this.repository.findByIds(ids)
  }

  store(data: any): Promise<T> {
    return this.repository.save(data)
  }

  async update(id: EntityId, data: any): Promise<T> {
    await this.repository.update(id, data)
    return this.findById(id)
  }

  delete(id: EntityId): Promise<DeleteResult> {
    return this.repository.delete(id)
  }
}
```

Class `BaseService` sẽ implement từ interface `BaseService`, trong đó:

| Type | Desc |
| -------- | -------- | 
| T     | Đại diện cho Model | 
| R    | Đại diện cho Repository | 

## Tạo sample module, model
Sau khi tích hợp và config xong, chúng ta sẽ tạo một sample module các bạn nhé
### Migration
```bash
npm run migrate:create create-users-table
```
Sau khi chạy xong chúng ta sẽ thêm cái cột vào file migration (tại thư mục database/migration)
```ts
import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUsersTable1592555965808 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'email',
          type: 'varchar',
          isUnique: true,
        },
        {
          name: 'firstName',
          type: 'varchar',
        },
        {
          name: 'lastName',
          type: 'varchar',
        },
        {
          name: 'password',
          type: 'varchar',
        },
        {
          name: 'isActive',
          type: 'tinyInt',
          default: 1,
        },
        {
          name: 'createdAt',
          type: 'datetime',
          default: 'now()',
          isNullable: true,
        },
        {
          name: 'updatedAt',
          type: 'datetime',
          default: 'now()',
          isNullable: true,
        },
      ],
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}
```

Cuối cùng chạy command để migrate nào 
```bash
npm run migrate:up
```
### Tạo module
Lúc này chúng ta sẽ tạo thêm modules `users`
```bash
nest g module service users
```
### Tạo Model
Tạo file `user.entity.ts`
```ts
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Unique(['email'])
  @Column()
  email: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Exclude()
  @Column()
  password: string

  @Column({ default: true })
  isActive: boolean

  @CreateDateColumn({
    default: `now()`,
    nullable: true,
  })
  createdAt: string

  @UpdateDateColumn({
    default: `now()`,
    nullable: true,
  })
  updatedAt: string

  constructor(partial: Partial<User>) {
    super()
    Object.assign(this, partial)
  }

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }
}
```
### Tạo UserRepository
Sau khi đã có model, chúng ta sẽ tạo tiếp class Repository
```ts
import { EntityRepository, Repository } from 'typeorm'
import { User } from './user.entity'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  getInactiveUsers(): Promise<User[]> {
    return this.createQueryBuilder()
      .where('isActive = :active', { active: false })
      .getMany()
  }
}
```

Lúc này chúng ta cần Extend lại Base Repository của TypeORM, và thêm Decorator `@EntityRepository(User)`

### Tạo UserService
```ts
import { User } from './user.entity'
import { UserRepository } from './user.repository'
import { Injectable } from '@nestjs/common'
import { BaseService } from '../base.service'
import { LoggerService } from '../logger/custom.logger'

@Injectable()
export class UserService extends BaseService<User, UserRepository> {
  constructor(repository: UserRepository, logger: LoggerService) {
    super(repository, logger)
  }

  findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ email: email })
  }

  getInactiveUsers(): Promise<User[]> {
    return this.repository.getInactiveUsers()
  }
}
```
Class `UserService` sẽ extend từ `BaseService`, trong đó `UserRepository` và `LoggerService` sẽ được inject vào constructor thông qua decorator `@Injectable()`.
Ngoài những method được extend từ BaseService, mình đã define thêm 2 method nữa là `findByEmail` và `getInactiveUsers`
### User Module và User repository module
Sau khi xong xuôi từ Service, Repository, chúng ta sẽ tạo module để có thể Inject vào Module, Service khác,...
`user.module.ts`
```ts
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from './user.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
    ]),
  ],
  providers: [],
  exports: [
    TypeOrmModule,
  ],
})
export class UserModule {
}
```

`user-http.module.ts`
```ts
import { Module } from '@nestjs/common'
import { UserModule } from './user.module'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { ConfigService } from '@nestjs/config'
import { LoggerService } from '../logger/custom.logger'

@Module({
  imports: [UserModule, ConfigService, LoggerService],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserHttpModule {
}
```
### UserController
Đến bước này chúng ta chỉ cần tạo controller, Inject `UserService` vào và sử dụng một cách bình thường
`user.controller.ts`
```ts
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { User } from './user.entity'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { EntityId } from 'typeorm/repository/EntityId'
import { plainToClass } from 'class-transformer'
import { UpdateUserDto } from './dto/update-user.dto'
import { DeleteResult } from 'typeorm/index'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  index(): Promise<User[]> {
    return this.userService.index()
  }

  @Get('/inactive')
  getInactiveUser(): Promise<User[]> {
    return this.userService.getInactiveUsers()
  }

  @Get('/:id')
  async show(@Param('id') id: EntityId): Promise<User> {
    const user = await this.userService.findById(id)
    if (!user) {
      throw new NotFoundException()
    }

    return user
  }

  @Post()
  async create(@Body() userData: CreateUserDto): Promise<User> {
    const createdUser = await this.userService.store(userData)

    return plainToClass(User, createdUser)
  }

  @Put('/:id')
  update(@Param('id') id: EntityId, @Body() userData: UpdateUserDto): Promise<User> {
    return this.userService.update(id, userData)
  }

  @Delete('/:id')
  destroy(@Param('id') id: EntityId): Promise<DeleteResult> {
    return this.userService.delete(id)
  }
}
```
# Kết
Trên đây là quá trình vắn tắt áp dụng Repository Pattern cho project NestJS với TypeORM. Code sample, chi tiết hơn các bạn có thể tham khảo tại đây
https://github.com/hoangtm1601/nest-base