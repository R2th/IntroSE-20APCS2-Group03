## Thiết lập S3
Tạo mới bucket
![](https://images.viblo.asia/95c1cf50-daf5-4ec8-b7b3-05ebd56b5237.png)
Cài đặt hạn chế quyền truy cập vào các tệp tải lên bucket. User muốn truy cập vào một tệp, họ sẽ cần thực hiện việc đó thông qua API.
![](https://images.viblo.asia/dbf78d55-38a2-43ac-8bad-6437d7e12f6f.png)
## Thiết lập IAM user
![](https://images.viblo.asia/21c8ea24-1398-458d-ba8b-2e5c8d749a64.png)
Thiết lập quyền truy cập phù hợp
![](https://images.viblo.asia/e9abd1ed-7cc4-45d5-8580-b002fec84e50.png)
Sau khi tạo IAM user sẽ lấy được cặp key Access key ID and Secret access key.
Thêm chúng vào file .env

.env
```
# ...
BUCKET_NAME=nestjs-private-bucket
AWS_ACCESS_KEY_ID=*******
AWS_SECRET_ACCESS_KEY=*******
```

## Quản lý tệp thông qua API
Tạo một bảng để lưu thông tin private file

/src/privateFiles/privateFile.entity.ts
```
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from '../users/user.entity';
 
@Entity()
class PrivateFile {
  @PrimaryGeneratedColumn()
  public id: number;
 
  @Column()
  public key: string;
 
  @ManyToOne(() => User, (owner: User) => owner.files)
  public owner: User;
}
 
export default PrivateFile;
```
Thêm thông tin bên bảng quan hệ User

/src/users/user.entity.ts
```
import { Entity, OneToMany } from 'typeorm';
import PrivateFile from '../privateFIles/privateFile.entity';
 
@Entity()
class User {
  // ...
 
  @OneToMany(
    () => PrivateFile,
    (file: PrivateFile) => file.owner
  )
  public files: PrivateFile[];
}
 
export default User;
```

Tạo 1 API để có thể upload file lên S3

/src/files/privateFiles.service.ts
```
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import PrivateFile from './privateFile.entity';
 
@Injectable()
export class PrivateFilesService {
  constructor(
    @InjectRepository(PrivateFile)
    private privateFilesRepository: Repository<PrivateFile>,
    private readonly configService: ConfigService
  ) {}
 
  async uploadPrivateFile(dataBuffer: Buffer, ownerId: number, filename: string) {
    const s3 = new S3();
    const uploadResult = await s3.upload({
      Bucket: this.configService.get('AWS_PRIVATE_BUCKET_NAME'),
      Body: dataBuffer,
      Key: `${uuid()}-${filename}`
    })
      .promise();
 
    const newFile = this.privateFilesRepository.create({
      key: uploadResult.Key,
      owner: {
        id: ownerId
      }
    });
    await this.privateFilesRepository.save(newFile);
    return newFile;
  }
}
```

/src/files/privateFiles.module.ts
```
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrivateFilesService } from './privateFiles.service';
import { ConfigModule } from '@nestjs/config';
import PrivateFile from './privateFile.entity';
 
@Module({
  imports: [
    TypeOrmModule.forFeature([PrivateFile]),
    ConfigModule,
  ],
  providers: [PrivateFilesService],
  exports: [PrivateFilesService]
})
export class PrivateFilesModule {}
```

/src/users/users.service.ts
```
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './user.entity';
import { PrivateFilesService } from '../privateFIles/privateFiles.service';
 
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly privateFilesService: PrivateFilesService
  ) {}
 
  // ...
 
  async addPrivateFile(userId: number, imageBuffer: Buffer, filename: string) {
    return this.privateFilesService.uploadPrivateFile(imageBuffer, userId, filename);
  }
```

/src/users/users.controller.ts
```
import { UsersService } from './users.service';
import { Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import RequestWithUser from '../authentication/requestWithUser.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
 
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}
 
  // ...
 
  @Post('files')
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addPrivateFile(@Req() request: RequestWithUser, @UploadedFile() file: Express.Multer.File) {
    return this.usersService.addPrivateFile(request.user.id, file.buffer, file.originalname);
  }
}
```

Sau khi thực hiện tất cả những điều trên, user có thể bắt đầu tải lên các file private.

![](https://images.viblo.asia/de30a7aa-60d4-4744-bd74-aff200e41ded.png)

## Truy cập private files
Vì các tệp tải lên ở trên là private nên không thể truy cập chúng bằng cách chỉ cần nhập URL. Nếu làm như vậy sẽ dẫn đến lỗi.
![](https://images.viblo.asia/915cf5d2-ee8c-403b-b683-fd0142f265f2.png)

### Truy cập file từ Amazon S3 dưới dạng một stream

/src/privateFiles/privateFiles.service.ts
```
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import PrivateFile from './privateFile.entity';
import { NotFoundException } from '@nestjs/common';
 
@Injectable()
export class PrivateFilesService {
  constructor(
    @InjectRepository(PrivateFile)
    private privateFilesRepository: Repository<PrivateFile>,
    private readonly configService: ConfigService
  ) {}
 
  // ...
 
  public async getPrivateFile(fileId: number) {
    const s3 = new S3();
 
    const fileInfo = await this.privateFilesRepository.findOne({ id: fileId }, { relations: ['owner'] });
    if (fileInfo) {
      const stream = await s3.getObject({
        Bucket: this.configService.get('AWS_PRIVATE_BUCKET_NAME'),
        Key: fileInfo.key
      })
        .createReadStream();
      return {
        stream,
        info: fileInfo,
      }
    }
    throw new NotFoundException();
  }
}
```

/src/users/users.service.ts
```
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './user.entity';
import { FilesService } from '../files/files.service';
import { PrivateFilesService } from '../privateFIles/privateFiles.service';
 
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly filesService: FilesService,
    private readonly privateFilesService: PrivateFilesService
  ) {}
 
  // ...
 
  async getPrivateFile(userId: number, fileId: number) {
    const file = await this.privateFilesService.getPrivateFile(fileId);
    if (file.info.owner.id === userId) {
      return file;
    }
    throw new UnauthorizedException();
  }
}
```

/src/users/users.controller.ts
```
import { UsersService } from './users.service';
import {
  Controller,
  Get,
  Param,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import RequestWithUser from '../authentication/requestWithUser.interface';
import { Response } from 'express';
import FindOneParams from '../utils/findOneParams';
 
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}
  
  // ...
 
  @Get('files/:id')
  @UseGuards(JwtAuthenticationGuard)
  async getPrivateFile(
    @Req() request: RequestWithUser,
    @Param() { id }: FindOneParams,
    @Res() res: Response
  ) {
    const file = await this.usersService.getPrivateFile(request.user.id, Number(id));
    file.stream.pipe(res)
  }
}
```
### Generating signed URLs

/src/files/privateFiles.service.ts
```
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config'; 
import PrivateFile from './privateFile.entity';
 
@Injectable()
export class PrivateFilesService {
  constructor(
    @InjectRepository(PrivateFile)
    private privateFilesRepository: Repository<PrivateFile>,
    private readonly configService: ConfigService
  ) {}
 
  // ...
 
  public async generatePresignedUrl(key: string) {
    const s3 = new S3();
 
    return s3.getSignedUrlPromise('getObject', {
      Bucket: this.configService.get('AWS_PRIVATE_BUCKET_NAME'),
      Key: key
    })
  }
}
```

/src/users/users.service.ts
```
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './user.entity';
import { FilesService } from '../files/files.service';
import { PrivateFilesService } from '../privateFIles/privateFiles.service';
 
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly filesService: FilesService,
    private readonly privateFilesService: PrivateFilesService
  ) {}
 
  // ...
 
  async getAllPrivateFiles(userId: number) {
    const userWithFiles = await this.usersRepository.findOne(
      { id: userId },
      { relations: ['files'] }
    );
    if (userWithFiles) {
      return Promise.all(
        userWithFiles.files.map(async (file) => {
          const url = await this.privateFilesService.generatePresignedUrl(file.key);
          return {
            ...file,
            url
          }
        })
      )
    }
    throw new NotFoundException('User with this id does not exist');
  }
}
```

/src/users/users.controller.ts
```
import { UsersService } from './users.service';
import {
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import RequestWithUser from '../authentication/requestWithUser.interface';
 
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}
 
  // ...
 
  @Get('files')
  @UseGuards(JwtAuthenticationGuard)
  async getAllPrivateFiles(@Req() request: RequestWithUser) {
    return this.usersService.getAllPrivateFiles(request.user.id);
  }
}
```
Sau khi call API sẽ nhận được 1 signedURL có thể truy cập private file một cách dễ dàng
![](https://images.viblo.asia/628aed6b-df85-4bab-aaab-4c48a67508c1.png)