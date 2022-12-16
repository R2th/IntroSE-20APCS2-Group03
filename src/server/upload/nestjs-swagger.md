### I. Mở đầu
- Trong các bài viết về nestjs mình toàn chỉ dùng Graphql nên hôm nay đổi gió một chút, giới thiệu các bạn về restAPI sử dung swaggerUI trong nestjs
- Trong bài viết này mình sử dung yarn thay vì npm

### II. Cài đặt
- dùng `nest new <project name>` để tạo project nest
- dùng lệnh bên dưới để cài swagger
    ```
    yarn add @nestjs/swagger swagger-ui-express
    ```
- thêm `"skipLibCheck": true` trong `tsconfig.json` để bỏ qua việc check tslint trong node_module, nếu bị bắt lỗi những file trong node_module
- khi bạn gặp lỗi `Error: Cannot find module '@nestjs/core/router/route-path-factory'`
thì do bị lỗi phiên bản tương thích: https://github.com/nestjs/nest/issues/7499#issuecomment-877050501
- cách để sửa lỗi
    - xóa file yarn.lock hoặc (package.lock)
    - sửa trong file package.json 3 chỗ là: @nestjs/common, @nestjs/core và @nestjs/platform-express thanfh "^8.0.0"
    - yarn hoặc npm install lại

trong file `main.ts` sửa code lại thành như bên dưới để khi run thì có swagger
```
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
```
- `yarn start:dev` rồi vào link `http://localhost:3000/api/#/` sẽ ra giao diện như bên dưới

    ![](https://images.viblo.asia/a0323a03-8c14-4438-8952-69d44708a78c.PNG)

### III. Sử dụng TypeOrm
- `yarn add @nestjs/typeorm typeorm postgres pg` để cài SQL sử dụng
- thêm vào `package.json` trong phần `scripts` 2 câu lệnh dưới để generate file migrate
    ```
    "m:g": "yarn build && typeorm migration:generate -n",
    "m:run": "yarn build && typeorm migration:run",
    ```
- tạo 1 file tên là `ormconfig.js` để typeorm tự động nhận các config trong này
    ```
    const DBConfig = {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1',
      database: 'TEST_SWAGGER',
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/databases/migrations/*.js'],
      cli: { migrationsDir: 'src/databases/migrations' },
      synchronize: false,
    }

    module.exports = DBConfig;
    ```
- trong `app.module.ts` thì thêm `TypeOrmModule.forRoot()` và xóa `controllers` lẫn `providers`, vì chúng ta sẽ import các module vào nên chỗ này k cần thiết nữa
```
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot()
  ]
})
export class AppModule {}
```
- tạo folder tên `bots`, tạm thời gồm 2 file
    - `bot.entity.ts`
        ```
        import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

        @Entity('bots')
        export class BotEntity {
          @PrimaryGeneratedColumn()
          id: number;

          @Column({ length: 500 })
          name: string;

          @Column('text')
          description: string;
        }
        ```
    - `bot.module.ts`
        ```
        import { Module } from '@nestjs/common';
        import { TypeOrmModule } from '@nestjs/typeorm';
        import { BotEntity } from './bot.entity';

        @Module({
          imports: [
            TypeOrmModule.forFeature([BotEntity]),
          ],
          providers: [],
        })
        export class BotModule { }
        ```
    - chạy lệnh `yarn m:g create-bot-entity` và `yarn m:run`, để tạo file migrate `create-bot-entity` và run luôn file đó để tránh khi tạo file migrate mới sẽ generate ra code cũ của file entity khác
- tạo folder tên `users`, tạm thời chứa 2 file
    - `user.entity.ts`
        ```
        import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

        @Entity()
        export class User {
          @PrimaryGeneratedColumn()
          id: number;

          @Column()
          firstName: string;

          @Column()
          lastName: string;

          @Column({ default: true })
          isActive: boolean;
        }
        ```
    - `user.module.ts`
        ```
        import { Module } from '@nestjs/common';
        import { TypeOrmModule } from '@nestjs/typeorm';
        import { UserEntity } from './user.entity';

        @Module({
          imports: [
            TypeOrmModule.forFeature([UserEntity]),
          ],
          providers: [],
        })
        export class BotModule { }
        ```
    - chạy lệnh `yarn m:g create-bot-entity` và `yarn m:run`
- Nếu bạn gặp lỗi `TypeError: rxjs_1.lastValueFrom is not a function` thì chạy lệnh `yarn add rxjs@^7`
- tạo 1 folder tên databases với các file sau
    - `database.provider.ts` (lưu ý  `synchronize: true` không được dùng khi lên product vì sẽ dễ mất dữ liệu)
        ```
        import { createConnection } from 'typeorm';

        export const databaseProviders = [
          {
            provide: 'DATABASE_CONNECTION',
            useFactory: async () => await createConnection({
              type: 'postgres',
              host: 'localhost',
              port: 5432,
              username: 'postgres',
              password: '1',
              database: 'TEST_SWAGGER',
              entities: [
                  __dirname + '/../**/*.entity{.ts,.js}',
              ],
              synchronize: false,
            }),
          },
        ];
        ```
    - `database.module.ts`
        ```
        import { Module } from '@nestjs/common';
        import { databaseProviders } from './database.provider';

        @Module({
          providers: [...databaseProviders],
          exports: [...databaseProviders],
        })
        export class DatabaseModule {}
        ```
- tạo 2 file
    - `user.provider.ts`
        ```
        import { Connection } from 'typeorm';
        import { UserEntity } from './user.entity';

        export const userProvider = [
          {
            provide: 'USER_REPOSITORY',
            useFactory: (connection: Connection) => connection.getRepository(UserEntity),
            inject: ['DATABASE_CONNECTION'],
          },
        ];
        ```
    - `bot.provider.ts`
        ```
        import { Connection } from 'typeorm';
        import { BotEntity } from './bot.entity';

        export const botProvider = [
          {
            provide: 'BOT_REPOSITORY',
            useFactory: (connection: Connection) => connection.getRepository(BotEntity),
            inject: ['DATABASE_CONNECTION'],
          },
        ];
        ```
- thay đổi 2 file là 
    - `bot.module.ts`
        ```
        import { Module } from '@nestjs/common';
        import { TypeOrmModule } from '@nestjs/typeorm';
        import { DatabaseModule } from 'src/databases/database.module';
        import { BotEntity } from './bot.entity';
        import { botProvider } from './bot.provider';

        @Module({
          imports: [
            TypeOrmModule.forFeature([BotEntity]),
            DatabaseModule,
          ],
          providers: [...botProvider],
        })
        export class BotModule { }
        ```
    - `user.module.ts`
        ```
        import { Module } from '@nestjs/common';
        import { TypeOrmModule } from '@nestjs/typeorm';
        import { DatabaseModule } from 'src/databases/database.module';
        import { UserEntity } from './user.entity';
        import { userProvider } from './user.provider';

        @Module({
          imports: [
            TypeOrmModule.forFeature([UserEntity]),
            DatabaseModule,
          ],
          providers: [...userProvider],
        })
        export class UserModule { }
        ```
### IV. Sử dụng SwaggerUI
- Ok! trước khi tới phần controller và service, ta phải tạo ra DTO (data to object) trước. File DTO này sẽ có nhiệm vụ là bắt validate và tạo property trong swagger
- `create-bot.dto.ts`
    ```
    import { ApiProperty } from '@nestjs/swagger';

    export class CraeteBotDTO {
      @ApiProperty()
      id: number;

      @ApiProperty()
      name: string;

      @ApiProperty()
      description: string;
    }
    ```
- `update-bot.dto.ts`
    ```
    import { PartialType } from '@nestjs/swagger';
    import { CraeteBotDTO } from './create-bot.dto';

    export class UpdateBotDTO extends PartialType(CraeteBotDTO) {

    }
    ```
- tương tự cho user

- Giờ là lúc tạo controller và service
- file `bot.controller.ts`
    ```
    import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
    import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
    import { BotService } from './bot.service';
    import { CraeteBotDTO } from './create-bot.dto';
    import { UpdateBotDTO } from './update-bot.dto';

    @ApiTags('bots')
    @Controller('bots')
    export class BotController {
      constructor(
        private botSerivce: BotService,
      ) { }

      @Post()
      createOneBot(@Body() createBotDTO: CraeteBotDTO) {
        return this.botSerivce.createOneBot(createBotDTO);
      }

      @Get()
      @ApiOkResponse({ description: 'List all bots' })
      async getBotList() {
        return await this.botSerivce.getBotList();
      }

      @Get(':id')
      getDetailBot(@Param('id') id: number) {
        return this.botSerivce.getDetailBot(id);
      }

      @Put(':id')
      updateBot(@Param('id') id: number, @Body() updateBotDTO: UpdateBotDTO) {
        return this.botSerivce.updateBot(id, updateBotDTO);
      }

      @Delete(':id')
      removeOneBot(@Param('id') id: number) {
        return this.botSerivce.removeOneBot(id);
      }
    }
    ```
- file `bot.service.ts`
    ```
    import { Inject, Injectable } from '@nestjs/common';
    import { Repository } from 'typeorm';
    import { BotEntity } from './bot.entity';
    import { CraeteBotDTO } from './create-bot.dto';
    import { UpdateBotDTO } from './update-bot.dto';

    @Injectable()
    export class BotService {
      constructor(
        @Inject('BOT_REPOSITORY') private readonly botRepository: Repository<BotEntity>,
      ) { }
      createOneBot(createBotDTO: CraeteBotDTO) {
        return this.botRepository.save(createBotDTO);
      }

      getBotList() {
        return this.botRepository.find({});
      }

      getDetailBot(id: number) {
        return this.botRepository.findOne(id);
      }

      updateBot(id: number, updateBotDTO: UpdateBotDTO) {
        return this.botRepository.update(id, updateBotDTO);
      }

      removeOneBot(id: number) {
        return this.botRepository.delete(id);
      }
    }
    ```
- tương tự cho user
- Xém quên mất, bên trong 2 module phải thêm controller nếu không sẽ k có hiện được các api
### V. Kết
- khi F5 lại trang web ta sẽ có được giao diện như sau

    ![](https://images.viblo.asia/3fdaf047-07d7-4824-b341-9f077e14915f.PNG)

-  Mọi người có thể tham khảo [github](https://github.com/trungnq-1441/nestjs-swagger)
- à và những gì mình giới thiệu chỉ là 1 phần nhỏ, mọi người có thể tham khảo thêm trên trang chủ của nestjs phần [open api](https://docs.nestjs.com/openapi/introduction)