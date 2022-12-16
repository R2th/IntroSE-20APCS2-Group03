### 1: Lời giới thiệu.
Passport là thư viện xác thực node.js phổ biến nhất, được cộng đồng biết đến và sử dụng thành công trong nhiều ứng dụng sản xuất. Thật đơn giản để tích hợp thư viện này với ứng dụng Nest sử dụng @nestjs/passport mô-đun. Ở cấp độ cao, Passport thực hiện một loạt các bước để: <br>
* Xác thực người dùng bằng cách xác minh "thông tin đăng nhập" của họ ( username/password, Mã thông báo web JSON ( JWT ) hoặc mã token )
* Quản lý trạng thái được xác thực (bằng cách phát hành mã thông báo di động, chẳng hạn như JWT hoặc tạo phiên Express )
* Đính kèm thông tin về người dùng được xác thực vào Request đối tượng để sử dụng thêm trong trình xử lý tuyến.
### Bước 1: Install packages.
```
$ npm install --save @nestjs/passport passport passport-local
$ npm install --save-dev @types/passport-local
```
### Bước 2: Create module auth và module users.
1. Tạo module auth.
```
$ nest g module auth
$ nest g service auth
```
2. Tạo module users.
```
$ nest g module users
$ nest g service users
```
### Bước 3: Tạo migration và model cho users.
1. Tạo table users.
```
    import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class UserMigration1584696612114 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "user",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "first_name",
                    type: "varchar",
                },
                {
                    name: "last_name",
                    type: "varchar",
                },
                {
                    name: "username",
                    type: "varchar",
                },
                {
                    name: "password",
                    type: "varchar",
                },
                {
                    name: "age",
                    type: "int",
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
```

2. tạo ánh xạ với table users - user.entity.ts.
```
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    age: number;
}
```
### Bước 4: Tạo users/users.service.ts.

```
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  findUser(username: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        username,
      },
    });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
```

**users/users.module.ts**
```
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
```

### Bước 5: Tạo auth/auth.service.ts

```
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
    ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUser(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;

      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
        // eslint-disable-next-line @typescript-eslint/camelcase
        access_token: this.jwtService.sign(payload),
    };
  }
}
```
### Bước 6: Create auth/local.strategy.ts
```
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
```
**auth/auth.module.ts**
```
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule, 
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
```
### Bước  7: Create app.controller.ts.

```
import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }
}
```

### Bước 8: kết quả.
Thực hiện xong 7 bước trên test trên postman bạn sẽ được kết quả sau.
```
$ # POST to /auth/login
$ curl -X POST http://localhost:3000/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"
$ # result -> {"userId":1,"username":"john"}
```

Tham Khảo: [https://docs.nestjs.com/techniques/authentication#jwt-functionality](https://docs.nestjs.com/techniques/authentication#jwt-functionality)
Bài viết này tôi ghi lại các bước tôi đã thực hiện tạo auth. Nếu bạn có gì hay ho hơn vui lòng chia sẻ cho tôi nhé.
Thanks all.