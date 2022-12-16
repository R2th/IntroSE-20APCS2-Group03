Chào mừng các bạn trở lại với series tutorial Nestjs của mình. 


Nói chung là học cái nestjs này nó cũng đơn giản nhưng mà "people make it complicated" nên mình sẽ giúp em các bạn cảm thấy enjoy cái framework này  😂 😂 😂 - theo danh ca Chipu

### Index series
1.  [Giới thiệu về setup repository + typeorm](https://viblo.asia/p/tich-hop-repository-design-pattern-vao-nestjs-project-using-typeorm-and-mysql-RQqKL6rbl7z).
2.  [Xác thực người dùng trong Nestjs sử dụng Passport JWT](https://viblo.asia/p/xac-thuc-nguoi-dung-trong-nestjs-su-dung-passport-jwt-924lJB7blPM).
3. Tiếp tục series mình cùng các bạn sẽ tìm hiểu vể Relationship trong Nestjs + Typeorm. Bắt đầu nhé 

![](https://images.viblo.asia/8f39a256-3163-4433-984f-f9928e2b2457.png)

### 1. Setting base
 - Ở bài viết về setup repository + typeorm mình đã setting rất chi tiết rồi. mọi người có thể tham khảo lại bài viết [tại đây](https://viblo.asia/p/tich-hop-repository-design-pattern-vao-nestjs-project-using-typeorm-and-mysql-RQqKL6rbl7z)
 
 - Cụ thể:  ở đây mình sẽ chỉ lấy ra thông tin user bằng id gửi lên *function findById($id)*
     
     Trong  **user.service.ts** :
     
      ```javascript
       import { UsersRepository } from './users.repository';
       ...
       @Injectable()
        export class UsersService {
          constructor(
            @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
          ) {}

          async findById(
            id: number,
            relations: string[] = [],
            throwsException = false,
          ): Promise<UserEntity> {
            return await this.usersRepository.getEntityById(
              id,
              relations,
              throwsException,
            );
          }
        }
      ```
      
      Trong **user.repository.ts** :
      ```javascript
       import { UsersService } from './users.service';
       ...
       @Injectable()
        export class UsersService {
          constructor(
            @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
          ) {}

          async findById(
            id: number,
            relations: string[] = [],
            throwsException = false,
          ): Promise<UserEntity> {
            return await this.usersRepository.getEntityById(
              id,
              relations,
              throwsException,
            );
          }
        }
      ```
### 2.  One-To-One
   1. Định nghĩa table   
       **users table** :
    
        | id | name | email | password |
        | -------- | -------- | -------- | -------- |
        | int increment   | varchar     | varchar     | varchar     |

        **profiles table**
        | id | user_id | avatar | address| phone | gender |
        | -------- | -------- | -------- | -------- |-------- |-------- |-------- |
        | int increment        | int     | varchar     | varchar     | varchar     | varchar     |

   2. Define relationship in entity
          Định nghĩa **user.entity.ts** :
          
         ```javascript
          import { IUser } from '../interfaces/user.interface';
           ...
           
            @Entity({ name: 'users' })
            export class User implements IUser {
              @PrimaryGeneratedColumn()
              id: string;

              @Column({ unique: true, length: 255 })
              email: string;

              @Column({ name: 'password', length: 255 })
              password: string;

              @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
              createdAt: Date;

              @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
              updatedAt: Date;
              
              // define relationship with profiles table
              @OneToOne(() => Profile, (profile) => profile.user)
              profile: Profile;
            }
         ```
         Định nghĩa **profile.entity.ts** :
          
         ```javascript
           import { User } from './entities/user.entity';
            ...
            
            @EntityRepository(User)
            export class UsersRepository {
            ...
            //function get user by id and relationship
            async getEntityById(
                id: number,
                relations: string[] = [],
            ): Promise<UserEntity | null> {
                return await this.findOne({
                  where: { id },
                  relations,
                }).then((entity) => {
                  if (!entity) {
                    return Promise.reject(new NotFoundException('Model not found'));
                  }

                  return Promise.resolve(entity ? this.transform(entity) : null);
                });
              }

             transform(model: User): UserEntity {
                const transformOptions = {};

                return plainToClass(
                  UserEntity,
                  classToPlain(model, transformOptions),
                  transformOptions,
                );
              }
         ```
   3.  Get data User with Profile
       
       Trong  **user.controller.ts** :
       ```javascript
       import { UsersService } from './users.service';
       ...
       @Controller('users')
        export class UsersController {
          constructor(private readonly usersService: UsersService) {}
           ...
           
          @Get('conversation/:id')
          async userConversation(@Param() params): Promise<UserEntity> {
            const user = await this.usersService.findById(params.id, [
              'profile',
            ]);
            this.throwUserNotFound(user);
            return user;
          }
          ...
        }
       ```
       
       còn đây sẽ là response 
       ```javascript       
       {
            "id": "13",
            "name": "duong",
            "email": "xuanduong.kma@gmail.com",
            "password": "$2b$12$JDj6D0RIjpGdd4tAGO/BMOqUxmq.7tEGIvWHtJfbm6MfxIeXyBrGW",
            "createdAt": "2021-10-10T06:56:06.000Z",
            "updatedAt": "2021-10-10T06:56:06.000Z",
            "profile": {
                "id": "2",
                "user_id": "13",
                "avatar": null,
                "phone": "+84999999999",
                "createdAt": "2021-10-16T10:51:49.000Z",
                "updatedAt": "2021-10-16T10:51:49.000Z"
            },
       }
       ```
### 3.  One-To-Many
   1. Định nghĩa table   
       **users table** :
    
        | id | name | email | password |
        | -------- | -------- | -------- | -------- |
        | int increment   | varchar     | varchar     | varchar     |

        **messages table**
        | id | user_id | conversation_id | message|
        | -------- | -------- | -------- | -------- |-------- |
        | int increment        | int     | int     | varchar     |
    2. Define relationship in entity
          
          Định nghĩa **user.entity.ts** :
          
         ```javascript
          import { IUser } from '../interfaces/user.interface';
           ...
           
            @Entity({ name: 'users' })
            export class User implements IUser {
              ...
              
              @OneToMany(() => Message, (message) => message.user)
              messages?: Message[];
            }
         ```
         
          Định nghĩa **messages.entity.ts**
         ```javascript
          import { IUser } from '../interfaces/user.interface';
           ...
           
            @Entity({ name: 'messages' })
            export class Message implements IMessage {
              ...
              
              @ManyToOne(() => User, (user) => user.messages)
              @JoinColumn({ name: 'user_id' })
              user?: User;
            }
         ```
         
  3.  Get data User with Profile
       
       Trong  **user.controller.ts** :
       ```javascript
       import { UsersService } from './users.service';
       ...
       @Controller('users')
        export class UsersController {
          constructor(private readonly usersService: UsersService) {}
           ...
           
          @Get('conversation/:id')
          async userConversation(@Param() params): Promise<UserEntity> {
            const user = await this.usersService.findById(params.id, [
              'messages',
            ]);
            this.throwUserNotFound(user);
            return user;
          }
          ...
        }
       ```
       
       còn đây sẽ là response 
       ```javascript       
       {
            "id": "13",
            "name": "duong",
            "email": "xuanduong.kma@gmail.com",
            "messages": [
                {
                    "id": "1",
                    "conversation_id": "1",
                    "user_id": "12",
                    "message": "hello xuan duong 2",
                },
                {
                    "id": "2",
                    "conversation_id": "1",
                    "user_id": "12",
                    "message": "hello xuan duong 2",
                },
          ]  
       }
       ```
### 4. Many-To-Many

1. Định nghĩa table   
       **users table** :
       
      | id | name | email | password |
      | -------- | -------- | -------- | -------- |
      | int increment   | varchar     | varchar     | varchar     |

      **conversations table** :
      | id | title | description | ....|
      | -------- | -------- | -------- | -------- |-------- |
      | int increment        | varchar     | varchar     | varchar     |
      
      **user_conversation table**
      | id | user_id | conversation_id | 
      | -------- | -------- | -------- | -------- |
      | int        | int     | int     |
  2. Define relationship in entity
          
        Định nghĩa **user.entity.ts** :
        
        ```javascript
        @Entity({ name: 'users' })
        export class User implements IUser {
          ...
          @ManyToMany(() => Conversation, (conversations) => conversations.users)
          @JoinTable({
            name: 'user_conversation',
            joinColumn: { name: 'user_id', referencedColumnName: 'id' },
            inverseJoinColumn: { name: 'conversation_id' },
          })
          conversations: Conversation[];
        }
        ```
        
        **conversation.entity.ts** :
       ```javascript
        @Entity({ name: 'conversations' })
        export class Conversation implements IConversation {
          ...
          
          @ManyToMany(() => User, (users) => users.conversations)
          @JoinTable({
            name: 'user_conversation',
            joinColumn: { name: 'conversation_id', referencedColumnName: 'id' },
            inverseJoinColumn: { name: 'user_id' },
          })
          users: User[];
        }
       ```
      3.  Get data User with Profile

     Trong  **user.controller.ts** :
     
        ```javascript
          import { UsersService } from './users.service';
          ...
          
           @Controller('users')
            export class UsersController {
              constructor(private readonly usersService: UsersService) {}
               ...

              @Get('conversation/:id')
              async userConversation(@Param() params): Promise<UserEntity> {
                const user = await this.usersService.findById(params.id, [
                  'conversations',
                  'conversations.messages', // lấy ra luôn các message trong converstion => nhớ định nghĩa relationship nhé
                ]);
                this.throwUserNotFound(user);
                return user;
              }
              ...
            }
       ```
### 5. Kết luận
   1. Qua bài viết này mình đã giới thiệu cho các bạn  relationship trong typeorm. nếu có khó khắn hoặc thắc mặc đừng ngại ngần comment ở dưới, Nếu bài viết hay và hữu ích thì cho mình xin 1 upvote.
   2. Từ cấu trúc bảng mình đã xây dựn ở trên , ở bài tiếp theo mình sẽ giới thiệu với các bạn về chat realtime sử dụng :
       
       Server: Nestjs + socket.io
       
       Client: React + Redux saga
  
      Thank you!