### I. Giới thiệu
Trong phần một của bài viết ([link phần một](https://viblo.asia/p/authentication-voi-nestjs-va-passport-phan-1-QpmleNvN5rd) mình đã chia sẻ cách cài đặt **passport** và cách sử dụng một **Strategy** trong ứng dụng **NestJS**, đó là **local-strategy** thường được sử dụng khi viết **Login API**.
Trong phần này mình sẽ chia sẻ thêm một **Strategy** khá là phổ biết tiếp theo của **passport** đó là **jwt-strategy**, cùng xem cách chúng ta sử dụng với **NestJS** nhé.
Các bước cài đặt và khởi tạo **source code** mình đã giới thiệu ở phần trước nên phần này mình sẽ không đề cập lại nữa nhé.
### II. Xây dựng chức năng xác thực với passport-jwt 
Trong phần trước chúng ta đã xây dựng một **module** đảm nhận các chức năng về xác thực (**Auth Module**). Cùng nhìn lại một chút **code** của **module** này một chút nhé.
```ts
// auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
```
Để xây dựng tính năng xác thực với **email** và **password** qua một **POST API** trong phần trước, chúng ta đã cài đặt **PassportModule** và sử dụng một **Strategy** giúp đảm nhiệm phần **logic**. Như mình đã nói ở phần trước, **passport** cung cấp một luồng xác thực nhất quán, với mỗi phương pháp xác thực khác nhau, chúng ta sử dụng một **strategy** riêng biệt.  
Phương pháp xác thực tiếp theo mà chúng ta xây dựng đó là sử dụng **jsonwebtoken** hay thường được gọi là **jwt**. Như mình có nói ở phần trước, **LocalStrategy** chỉ phù hợp cho chức năng **SignIn**, chúng ta cần một phương pháp xác thực linh hoạt và đơn giản hơn cho các **API** khác của **project**. Sử dụng **JWT** chắc hẳn đã khá quen thuộc với chúng ta rồi, mình sẽ không giải thích lại nữa, chúng ta hãy cùng xem sơ đồ sau:    

![](https://images.viblo.asia/dd1dd1e9-5ff3-4071-a88f-e819ecf47ae6.png)

Đầu tiên, chúng ta tiến hành cài đặt các thư viện cần thiết cho chức năng xác thực với **JWT**, chúng ta đã cài đặt sẵn **passport**, **passport-jwt** và **@types/passport-jwt** ở phần trước, lần này chúng ta cần cài đặt thêm một viện nữa:
```
yarn add @nestjs/jwt
```
**@nestjs/jwt** là một tiện ích của **nestjs** giúp chúng ta thao tác với **JWT** ( khởi tạo, xác thực **token**). Sau đó chúng ta thêm tiện ích này vào trong **Auth Module** như sau:  
```ts
// auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
// jwt module
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
      PassportModule,
      JwtModule.register({
            secret: 'jwtsecretkey',
            signOptions: {
              expiresIn: '1 hour',
            },
      })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
```
Chúng ta khởi tạo một **JWT Module** với kèm thiết lập mã bí mật khi tạo và xác thực **token** và thời hạn của **token** sẽ được tạo ra. Sau khi khởi tạo và **import** vào trong **Auth Module**, chúng ta có thể sử dụng các tiện ích của **module** này.  
Trở lại với **Auth Service**, chúng ta sẽ khởi tạo **token** khi xác thực **user** thành công với **email/password**:
```ts
// auth.controller.ts
import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('signin')
  @UseGuards(AuthGuard('local'))
  signin(@Req() req: Request) {
    const user = req.user;
    const accessToken = this.jwtService.sign(user);
    return { accessToken };
  }
}
```
Ở đây mình đã thực hiện khởi tạo một **token** tương ứng với thông tin được xác thực thành công khi **Client** thực hiện **Signin**, sử dụng phương thức **sign** của **jwtService**. **Token** này được sinh ra dựa trên mã bí mật mà chúng ta thiết lập ở trên. **Token** này sẽ được gửi về cho **Client** và được **Client** lưu lại để xác thực khi thực hiện những **request** tiếp theo (**cookies, session...**).  

Sau khi đã khởi tạo **token** và gửi về **client**, chúng ta sẽ sử dụng **passport-jwt** để tạo một **Strategy** cho chức năng xác thực với **jwt**. Hiểu nôm na như sau, mỗi khi **Client** gửi lên một **Request**, chúng ta yêu cầu **Client** gửi kèm mã **token** đã nhận được ở bước **Sign In** ở trên, thường là gửi vào trong **headers**, **JWT Strategy** sẽ thực hiện phần việc như một người bảo vệ, mỗi khi **Request** được gửi, nó sẽ đọc **header** của **Request**, lấy ra mã **token** và thực hiện xác thực, nếu kết quả xác thực thành công, nó sẽ lưu thông tin **User** đã xác thực vào trong **Request** và cho phép thực thi tiếp, nếu không, nó sẽ trả về **Client** một **Exception**. Tương tự như **LocalStrategy** đã tạo, chúng ta có như sau:

```ts
// jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'jwtsecretkey',
    });
  }

  async validate(user) {
    return user;
  }
}
```
Ở hàm **contructor**, chúng ta cần thiết lập cho **JwtStrategy** biết phương thức mà nó sẽ đọc **token**, ở đây mình thiết lập phương pháp yêu cầu **Client** cần gửi lên **token** theo trường **Authorization** trong **headers** của **Request**, và **Token** sẽ gửi lên ở dạng **Bearer Token**. **ignoreExpiration** là lựa chọn bỏ qua việc kiểm tra **token** đã hết hạn hay chưa và **secretOrKey** phải đúng với thiết lập khi chúng ta tạo ra mã **token**. Như mình nói, phần lớn **logic** đã được thực hiện bởi **passport-jwt**, chúng ta chỉ cần thêm một chút cài đặt vậy thôi :D.  
Ở đây khi xác thực thành công, mình sẽ trả về nguyên dữ liệu **user** mà chúng ta đã dùng để tạo ra **token**.  
Tương tự như **LocalStrategy**, chúng ta cần truyền **Strategy** vừa tạo vào trong **Auth Module**.  
```ts
// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
      PassportModule,
            JwtModule.register({
            secret: 'jwtsecretkey',
            signOptions: {
              expiresIn: '1 hour',
            },
      })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
```  
Chúng ta đã viết xong phương thức xác thực với **jwt**, giờ mình sẽ áp dụng nó vào một **Request** mới bằng cách sử dụng **Guard** của **nestjs** mà chúng ta đã tìm hiểu ở phần trước.
```ts
// auth.controller.ts
import { Controller, Post, Req, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('signin')
  @UseGuards(AuthGuard('local'))
  signin(@Req() req: Request) {
    const user = req.user;
    const accessToken = this.jwtService.sign(user);
    return { accessToken };
  }
  
  @Get('test')
  @UseGuards(AuthGuard('jwt'))
  testApi(@Req() req: Request) {
       // const user = req.user
  }
}
```
Bằng việc sử dụng **passport**, **testApi** không cần phải đảm đương vai trò xác thực thông tin người dùng nữa, mà sẽ tập trung vào chức năng mà nó được tạo ra. 
### III. Tạo một Decorator lấy thông tin User
Đây chỉ là một phần nhỏ khác hữu ích mà mình muốn bổ sung khi chúng ta viết xong phương thức xác thực với **JWT**, có một vấn đề nhỏ là mỗi lần chúng ta lấy ra thông tin **user**, chúng ta đều cần sử dụng **decorator** **Req** rồi khai báo biến để lấy thông tin **User**. Nếu để ý thì bạn sẽ thấy **Nestjs** cung cấp nhiều **decorator** được viết sẵn giúp chúng ta lấy ra một số giá trị nhất định trong **Request** như **Body**, **Params**...
**NestJS** cung cấp phương thức giúp chúng ta tạo ra một **decorator** để lấy ra một **param** nhất định trong **Request**. Trong trường hợp này, mình sẽ tạo ra một **decorator** có tên là **GetUser** như sau:  
```ts
// get-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const GetUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const req: Request = context.switchToHttp().getRequest();
    return req.user;
  },
);
```
Sau đó ta sẽ có thể lấy ra thông tin **user** một cách ngắn gọn và nhìn xịn hơn trước khá nhiều như sau :D
```ts
// auth.controller.ts
...
import {GetUser} from './get-user.decorator.ts'

  @Get('test')
  @UseGuards(AuthGuard('jwt'))
  testApi(@GetUser() user) {
       return user
  }
...
```
### IV. Kết bài  
Mình đã hoàn thành phần giới thiệu cách sử dụng **passport** để viết phương thức xác thực trong một ứng dụng **NestJS API**. Đối với **passport**, chúng ta rất dễ dàng mở rộng thêm nhiều phương thức xác thực trong ứng dụng bằng cách thêm vào các **Strategy**. **NestJS** đã hỗ trợ kết hợp với **passport** một cách hoàn chỉnh, nên các bước thực thi rất ngắn gọn và dễ dàng. Bạn có thể thử thêm vào các phương thức xác thực khác để hiểu thêm về phần này nhé.