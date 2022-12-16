Mình thì xuất thân một Dev PHP laravel, trong thời gian vừa qua mình có tham gia dự án nhưng khách hàng muốn sử dụng  Oracle SQL. Còn Laravel support Oracle không thực sự tốt và có rất nhiều rủi nên các anh trong dự án mình đưa ra quyết đinh "quay xe" sang Nodejs cụ thể là Nestjs.  Mình cũng đồng ý luôn vì chưa biết thì học cũng rất là tốt, và đến thời điểm hiện tại thì việc để chúng ta học thêm một ngôn ngữ mới và tiếp cận nó không còn quá khó khăn. Nên trong bài viết này mình sẽ chia sẻ lại những kiến thức mình đã tích lũy được và xây dựng Repository basic + TypeOrm như của đối thủ cạnh tranh của Nest là Laravel/PHP. 

Bài viết dừng lại ở việc chia sẻ kiến thức của mình và mình cũng chưa có nhiều thời gian làm việc với nó, nên rất mong mọi người đóng góp và ủng hộ

Mình cũng sẽ xây dựng một series về nestjs để các bạn muốn tìm hiểu và học có thể tham khảo. Còn bây giờ bắt đầu nhé  👇

### 1.  Giới thiệu
![image.png](https://images.viblo.asia/3d6ca316-56fc-426a-90e2-aef511a892a1.png)

Nestjs là một framework được xây dựng nên các ứng dụng phía Server-side và chạy bằng Nodejs, ngoài Nestjs thì còn Hapi.js, Express.js, Koa.js... cũng là frameword của Nodejs.

Nest cung cấp một kiến trúc ứng dụng out-of-the-box cho phép các developer và nhóm tạo ra các ứng dụng có thể test, có thể mở rộng, móc nối và dễ bảo trì. Kiến trúc được lấy cảm hứng từ Angular.

### 2.  Cài đặt

- Trước tên chúng ta cần install các packege sau:
```javascript
      > npm i -g @nestjs/cli

      > nest new project-name

      > npm i --save @nestjs/core @nestjs/common rxjs reflect-metadata

      > npm i --save @nestjs/typeorm typeorm mysql

      > npm install -g ts-node

      > npm install class-transformer
   ```
- Tiếp đến là folder structure của dự án: 
     ```javascript
     src/
    ├── databse/
    |   ├── migrations/
    │   │   └── 123456789-messageTable.ts
    └── models/
        ├── messages/
        |   ├── interfaces/
        │   │   └── message.interface.ts
        |   ├── entities/
        │   │   └── message.entity.ts
        |   ├── serializers/
        │   │   └── message.serializer.ts
        │   ├── messages.controller.ts
        │   ├── messages.module.ts
        │   ├── messages.repository.ts
        │   └── messages.service.ts
        ├── model.repository.ts
        ├── model.serializer.ts
        └── orm-config.ts
     ```
   - model.repository.ts sẽ là basic repository của dự án.
- Để có thể có thể connect đến mysql và migrate thì cần config một số thứ sau trong file ***orm-config.tss***
```javascript
       import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

       const config: MysqlConnectionOptions = {
          type: 'mysql',
          database: 'nest',
          username: 'root',
          password: 'root',
          port: 3306,
          host: '127.0.0.1',
          entities: ['dist/models/**/*.entity{.ts,.js}'],
          synchronize: false, // false để khi bạn thay đổi trong entities nó sẽ không tự update DB
          dropSchema: false,
          migrations: [
            "dist/database/migrations/*.js",
          ],
          cli: {
            migrationsDir: 'src/database/migrations' // migrate file sẽ được sinh ra tại đây
          }
        }

        export default config;
   ```
  - Sau đó là  ***app.module.ts***
  ```javascript
        import { Module } from '@nestjs/common';
        import { AppController } from './app.controller';
        import { AppService } from './app.service';
        import { TypeOrmModule } from '@nestjs/typeorm';
        import config from './orm-config';
        import { MessagesModule } from './models/messages/messages.module';

        @Module({
          imports: [
            TypeOrmModule.forRoot(config),
            MessagesModule,
          ],
          controllers: [AppController],
          providers: [AppService],
        })
        export class AppModule {}

        export default config;
   ```
   
 - Config để generate migrate, run migrate ... cần thiết lập trong  ***package.json***
  ```javascript
       "scripts": {
            "typeorm": "node --require ts-node/register ./node_modules/typeorm/cli.js --config src/orm-config.ts",
            "migration": "yarn typeorm migration:run",
            "migration:create": "yarn typeorm migration:create -n",
            "migration:revert": "yarn typeorm migration:revert",
            .....
        }

        export default config;
   ```
 - Run migrate:
 ```javascript
       > yarn run migration //chạy các file migrate
       
       > yarn run migration:create MessageTable //generate file migrate
       
       > yarn run migration:revert  //migrate rollback
   ```
### 3.  Setting Basic Repository
- ***models/model.repository.ts***
    ```javascript
      import { Injectable, NotFoundException } from '@nestjs/common';
        import { plainToClass } from 'class-transformer';
        import { ModelEntity } from './model.serializer';
        import { DeepPartial, Repository } from 'typeorm';

        @Injectable()
        export class ModelRepository<T, K extends ModelEntity> extends Repository<T> {

          async getAllEntity(
            relations: string[] = [],
            throwsException = false
          ): Promise<K[] | null> {
            return await this.find({relations})
              .then(entity => {
                if (!entity && throwsException) {
                  return Promise.reject(
                    new NotFoundException('Model not found')
                  )
                }

                return Promise.resolve(entity ? this.transformMany(entity) : null)
              })
          }

          async getEntityById(
            id: string | number,
            relations: string[] = [],
            throwsException = false
          ): Promise<K | null> {
            return await this.findOne({
              where: { id },
              relations
            })
              .then(entity => {
                if (!entity && throwsException) {
                  return Promise.reject(
                    new NotFoundException('Model not found')
                  )
                }

                return Promise.resolve(entity ? this.transform(entity) : null)
              })
          }

          async createEntity(
            inputs: DeepPartial<T>,
            relations: string[] = []
          ): Promise<K> {
            return await this.save(inputs)
              .then(async entity => {
                return await this.getEntityById((entity as any).id, relations)
              })
              .catch(error => Promise.reject(error))
          }

          async updateEntity(
            entity: K,
            inputs: DeepPartial<T>,
            relations: string[] = []
          ): Promise<K> {
            return await this.update(entity.id, inputs)
              .then(async entity => {
                return await this.getEntityById((entity as any).id, relations)
              })
              .catch(error => Promise.reject(error))
          }

          async deleteEntityById(
            id: number | string,
          ): Promise<boolean> {
            return await this.delete(id)
              .then(() => {
                return true
              })
              .catch(error => Promise.reject(error))
          }

          transform(model: T, transformOptions = {}): K {
            return plainToClass(ModelEntity, model, transformOptions) as K;
          }

          transformMany(
            model: T[],
            transformOptions = {}
          ): K[] {
            return model.map(model => this.transform(model, transformOptions))
          }

        }
   ```
    - Trong đó T : Đại diện cho Model, K: Đại diện cho Interface
    - Ngoài ra, hãy nhớ rằng đây chỉ là một số chức năng. Bạn có thể tạo bao nhiêu chức năng repo khác nếu bạn muốn  ( ví dụ. getWhere, destroyByEmail....
   ).
- ***model.serializer.tss***
 ```javascript
     export class ModelEntity {
       id: number | string;
       [key: string]: any;
     }
   ```
### 4.  Setting For Message Model
- Đầu tiên mình sẽ đi vào  ***messages/interfaces/message.interface.ts*** nơi định nghĩa các field của User
 ```javascript
       export interface IMessage {
          id: number | string,
          conversation_id: number | null,
          status: boolean,
          message: string | null,
       }
   ```
- Thiếp lập migration file ***123456789-messageTable.ts***  (nhớ là file này sinh ra từ câu lệnh generate bên trên)
```javascript
        import {MigrationInterface, QueryRunner, Table} from "typeorm";

        export class messageTable1632326169350 implements MigrationInterface {
            public async up(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.createTable(
                  new Table({
                      name: 'messages',
                      columns: [
                          {
                              name: 'id',
                              type: 'bigint',
                              isPrimary: true,
                              isGenerated: true,
                              generationStrategy: 'increment',
                          },
                          {
                              name: 'conversation_id',
                              type: 'bigint',
                              isNullable: true
                          },
                          {
                              name: 'status',
                              type: 'boolean',
                              isNullable: true
                          },

                          {
                              name: 'message',
                              type: 'varchar',
                              isNullable: true
                          },
                          {
                              name: 'created_at',
                              type: 'timestamp',
                              isNullable: true,
                              default: 'now()'
                          },
                          {
                              name: 'updated_at',
                              type: 'timestamp',
                              isNullable: true,
                              default: 'now()'
                          }
                      ],
                  })
                )
            }

            public async down(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.dropTable('messages')
            }
        }

   ```
- ***messages/entities/message.entity.ts***
 ```javascript
        import { Column } from 'typeorm'
        import { IMessage } from '../interfaces/message.interface'
        import { 
            Entity, 
            PrimaryGeneratedColumn,
            CreateDateColumn,
            UpdateDateColumn
        } from 'typeorm';

        @Entity({ name: 'messages' })
        export class Message implements IMessage {
          @PrimaryGeneratedColumn()
          id: string;

          @Column({name:'conversation_id', nullable: true})
          conversation_id: number

          @Column({default: true})
          status: boolean

          @Column({name: 'message', length: 255})
          message: string

          @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true})
          createdAt: Date;

          @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
          updatedAt: Date;
        }
   ```
   - ***messages/serializers/message.serializer.ts***
 ```javascript
        import { IMessage } from '../interfaces/message.interface';
        import { Expose } from 'class-transformer';
        import { ModelEntity } from '../../model.serializer';

        export const defaultMessageGroupsForSerializing: string[] = ['message.timestamps'];
        export const extendedMessageGroupsForSerializing: string[] = [
          ...defaultMessageGroupsForSerializing,
        ];
        export const allMessageGroupsForSerializing: string[] = [
          ...extendedMessageGroupsForSerializing,
          'message.conversation_id',
        ];

        export class MessageEntity extends ModelEntity implements IMessage {
          id: number | string

          conversation_id: null | number;

          status: boolean;

          message: string | null;

          @Expose({ groups: ['message.timestamps'] })
          createdAt: Date;

          @Expose({ groups: ['message.timestamps'] })
          updatedAt: Date;

        }
   ```
   - Tiếp đó là ***messages/message.repository.ts***, ở đây ta sẽ tiến hành overwrite  lại các function của Basic repository
  ```javascript
        import { EntityRepository } from 'typeorm';
        import { Message } from './entities/message.entity'
        import { ModelRepository } from '../model.repository';
        import { allMessageGroupsForSerializing, MessageEntity } from './serializers/message.serializer';
        import { plainToClass, classToPlain } from 'class-transformer';

        @EntityRepository(Message)
        export class MessagesRepository extends ModelRepository<Message, MessageEntity> {
          transform(model: Message): MessageEntity {
            const transformOptions = {
              groups: allMessageGroupsForSerializing
            }

            return plainToClass(
              MessageEntity,
              classToPlain(model, transformOptions),
              transformOptions
            )
          }

          transformMany(models: Message[]): MessageEntity[] {
            return models.map(model => this.transform(model));
          }
        }
   ```
- Muốn control được luồng thì chúng ta cần phải có controller đúng không ***messages/message.controller.ts***

```javascript
        import {
          Get, Put, Post,Body, Delete,
          Param, Controller, UseInterceptors, SerializeOptions, ClassSerializerInterceptor, HttpException, HttpStatus,
        } from '@nestjs/common';
        import {
          extendedMessageGroupsForSerializing,
          MessageEntity,
        } from './serializers/message.serializer';
        import {MessagesService} from './messages.service';
        import { Message } from './entities/message.entity';

        @Controller('messages')
        @SerializeOptions({
          groups: extendedMessageGroupsForSerializing,
        })
        export class MessagesController {
          constructor(private readonly messageService: MessagesService) {}

          @Get('/')
          @UseInterceptors(ClassSerializerInterceptor)
          async index() {
            return this.messageService.findAll()
          }

          @Get('/:id')
          @UseInterceptors(ClassSerializerInterceptor)
          async getById(
            @Param() params
          ): Promise<MessageEntity> {
            const message = await this.messageService.findById(params.id);
            this.throwMessageNotFound(message)
            return message
          }

          @Post('/')
          @UseInterceptors(ClassSerializerInterceptor)
          async create(
            @Body() inputs: Message,
          ): Promise<MessageEntity> {
            return await this.messageService.create(inputs);
          }

          @Put('/:id')
          @UseInterceptors(ClassSerializerInterceptor)
          async update(
            @Param() params,
            @Body() inputs: Message,
          ): Promise<MessageEntity> {
            const message = await this.messageService.findById(parseInt(params.id, 0))
            this.throwMessageNotFound(message)
            return await this.messageService.update(message, inputs);
          }

          @Delete('/:id')
          async delete(
            @Param() params,
          ): Promise<Boolean> {
            const message = await this.messageService.findById(parseInt(params.id, 0))
            this.throwMessageNotFound(message)
            return await this.messageService.deleteById(params.id);
          }

          throwMessageNotFound(
            message: MessageEntity
          ) {
            if (!message) {
              throw new HttpException('Not found', HttpStatus.NOT_FOUND)
            }
          }
        }
   ```
 
- Tiếp sẽ là thiết lập service -> repository  ***messages/messages.service.ts***
```javascript
    import {Injectable} from '@nestjs/common';
    import { InjectRepository } from '@nestjs/typeorm';
    import { MessagesRepository } from './messages.repository';
    import { MessageEntity } from './serializers/message.serializer';
    import { Message } from './entities/message.entity';

    @Injectable()
    export class MessagesService {
      constructor(
        @InjectRepository(MessagesRepository) private  usersRepository: MessagesRepository
      ) {}

      async findAll(
        relations: string[] = [],
        throwsException = false
      ): Promise<MessageEntity []> {
        return await this.usersRepository.getAllEntity(relations, throwsException)
      }

      async create(
        inputs: Message,
      ): Promise<MessageEntity> {
        return await this.usersRepository.createEntity(inputs)
      }

      async findById (
        id: number,
        relations: string[] = [],
        throwsException = false
      ): Promise<MessageEntity> {
        return await this.usersRepository.getEntityById(id, relations, throwsException)
      }

      async update(
        user: MessageEntity,
        inputs: Message,
        ): Promise<MessageEntity> {
        return await this.usersRepository.updateEntity(user, inputs)
      }

      async deleteById(id: number): Promise<Boolean> {
        return await this.usersRepository.deleteEntityById(id)
      }
    }
```

- Chốt hạ là ***messages.module.ts***
```javascript
    import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
    import { MessagesController } from './messages.controller';
    import { MessagesService } from './messages.service';
    import { TypeOrmModule } from '@nestjs/typeorm';
    import { MessagesRepository } from './messages.repository';
    import { ConfigModule } from '@nestjs/config';

    @Module({
      imports: [ConfigModule, TypeOrmModule.forFeature([MessagesRepository])],
      controllers: [MessagesController],
      providers: [MessagesService, ConfigModule],
      exports: [MessagesService],
    })

    export class MessagesModule {}
```
### 5.  Kết luận
 - Thực sự bài viết cúng khá là dài, nhưng mình đã chia sẻ đây là bài hướng dẫn khá là chi tiết để xây dựng 1 Basic Reposiroy theo luồng Controller -> Service -> Repository -> TypeOrm và rất là chặt chẽ.
 - Hy vọng bài viết này đã giúp bạn. Nếu có bất kì thắc mắc hãy liên hệ với mình
 - Trong phần tiếp theo mình sẽ giúp các bạn using JWT trong Nest, rất mong được các bạn ủng hộ.
 -  Bạn cũng có thể tham khảo của mình Repository :  [Tại đây](https://github.com/duong120798/nest-project)

### Thanks for Reading