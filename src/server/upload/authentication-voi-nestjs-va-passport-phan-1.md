**Authentication**, hay xác thực thông tin người dùng, là một trong những tính năng cơ bản nhất của phần lớn ứng dụng **Web**.  Trong bài viết này, mình xin chia sẻ phương pháp sử dụng **[passportjs](http://www.passportjs.org/)** để xây dựng tính năng **Authentication** cho một **API server** viết trên **[NestJS](https://docs.nestjs.com/)** - Một **NodeJS Framework** khá phổ biến hiện nay.   
Mình sẽ xây dựng một **project** từ đầu, sau đó sẽ xây dựng hai tính năng xác thực người dùng cơ bản, với chức năng xác thực bằng **email/password** và xác thực người dùng với **json web token**.
### I. Cài đặt project  
Đầu tiên, giả sử đã có sẵn môi trường **Nodejs**, chúng ta khởi tạo ứng dụng có tên là **demo-app**, sử dụng công cụ **[nest-cli](https://docs.nestjs.com/cli/overview)**.  
```
# cai dat cli
npm install -g @nestjs/cli

# khoi tao project
nest new demo-app
```
Tiếp đến chúng ta sẽ cài đặt thêm các thư viện cần thiết bằng lệnh sau:  
```
npm install --save @nestjs/passport passport passport-local passport-jwt
npm install --save-dev @types/passport-local @types/passport-jwt
```
* **passport**: Thư viện chung khi sử dụng, là nền tảng của luồng hoạt động của **passport**.
* **passport-local, passport-jwt**: Hai thư viện phục vụ hai phương pháp xác thực mà chúng ta đề cập ở trên. Trong **passport**, mỗi phương thức xác thực sẽ được gọi là một **strategy**.
* **@nestjs/passport**: Tiện ích **passport** của **nestjs**.
* **@types/passport-jwt, @types/passport-local**: Do mặc định thì 2 thư viện **strategy** của **passport** mà chúng ta cài đặt ở trên không hỗ trợ **typescript**, 2 thư viện này sẽ giúp **fix** điều đó. 

OK, vậy là xong bước cài đặt, chúng ta tiếp tục khởi tạo **module auth**, **module** này sẽ đảm nhận xử lý các chứng năng xác thực trong ứng dụng, chúng ta tiếp tục sử dụng **nest-cli**:
```
nest g module auth
nest g controller auth --no-spec
nest g service auth --no-spec
```
Mình đã tạo luôn **controller** và **service** đi kèm với **module auth**, để cho đơn giản mình có thêm lựa chọn không sinh ra tập tin **spec**, và sẽ không xây dựng chức năng liên quan tới **database** trong phần này.
### II. Xây dựng chức năng xác thực với passport-local
#### 1. Định nghĩa chức năng
Chức năng đầu tiên ta muốn xây dựng cho ứng dụng của mình là chức năng **Sign in** với **email** và **password**, chức năng cực kì cơ bản. Chúng ta bắt đầu bằng việc định nghĩa **"database"** và **api**, chúng ta có một danh sách chứa thông tin người dùng (**user**) và một **Post API** - **API** này sẽ nhận một **Body** gồm hai giá trị là **email** và **password** được gửi lên từ **Client**, phần **Logic** chính sẽ là thực hiện kiểm tra giá trị mà người dùng gửi lên với **database** và trả về thông tin **user** một **Exception** nếu thông tin gửi lên không chính xác (Đây là phần **logic** chúng ta sẽ sử dụng **passport**).  

Để cho đơn giản, chúng ta sẽ định nghĩa danh sách người dùng là một dữ liệu dạng tĩnh như sau:  

![](https://images.viblo.asia/5fccb7bd-5ef6-4089-abab-697b62df655e.png)


Tiếp theo chúng ta định nghĩa **Dto** và **Sign In API**:  

![](https://images.viblo.asia/81e9daf3-ec96-498b-8d9b-6b2da3993606.png)

#### 2. Xây dựng tính năng xác thực với passport-local strategy
OK, sau khi định nghĩa **"database"** và **API**, chúng ta thực hiện viết **logic** xác thực dữ liệu mà **user** gửi lên với **passport**, như mình đã nói ở trên, **passport** cung cấp một luồng **logic** xác thực nhất quan, đối với mỗi tính năng xác thực, **passport** xây dựng cho chúng ta một **strategy** riêng, điều này giúp dễ dàng quản lý và mở rộng ứng dụng, giả sử ứng dụng cần xây dựng thêm các phương pháp xác thực khác, ta chỉ cần mở rộng bằng cách viết thêm **strategy**.  
Trong bài toán này, ta sẽ tạo ra một **strategy** như sau:  

![](https://images.viblo.asia/5dd4ee36-94d9-4fb3-9644-891cd91aaca0.png)

Sau khi đã thêm một số dòng code, mình sẽ giải thích lại một chút các bước hoạt động của tính năng xác thực qua sơ đồ như sau:
![](https://images.viblo.asia/c1270692-d216-49ec-9b9e-5cf7cfce8f73.PNG)
1. **local strategy** đọc **request body** và kiểm tra dữ liệu trong đó, mặc định nó sẽ kiểm tra hai trường **username** và **password**, ở đây do chúng ta tiến hành xác thực với hai trường là **email/password** nên mình đã điều chỉnh lại cài đặt trong hàm **contructor** của **strategy**.
2. Nếu định dạng của dữ liệu gửi lên không có vấn đề gì, tiến hành kiểm tra tính xác thực của dữ liệu với **database**, **logic** sẽ được thực hiện trong phương thức **validate** ( cần lưu ý đặt đúng tên phương thức khi khai báo **strategy**), **logic** chi tiết chúng ta sẽ phải tự viết, ở đây mình có sử dụng phương thức **validateUserAndPassword** trong **AuthService**, hàm này chúng ta sẽ bổ sung vào **auth.service.ts** được tạo ở trên.
3. Sau khi có kết quả kiểm tra, thông tin được trả về trong phương thức **validate** sẽ được thêm vào thông tin của **request**, từ đó ta có thể đọc được thông tin xác thưc của người dùng bằng cách gọi **request.user**, việc này sẽ do **passport-local** tự động thực hiện. 
4. Nếu dữ liệu gửi lên không theo đúng định dạng hoặc kết quả trả về từ hàm **validate** không tồn tại, **Client** sẽ nhận được một **exception**.

Theo luồng hoạt động ở trên, chúng ta chỉ cần viết phương thức xác thực thông tin **sign in** với dữ liệu hiện có vào trong **AuthService**, như sau:  

![](https://images.viblo.asia/e884a94c-79d3-4f87-9e97-e8d0647e18cf.png)

#### 3. Bổ sung AuthGuard vào API Sign In  
Sau khi đã viết xong phần **logic** của chức năng xác thực, chúng ta tiến hành lắp ráp chúng vào trong **auth module**, đầu tiên cần thêm **Passport Module** và **LocalStrategy** vào phần thiết lập của **AuthModule**.  

![](https://images.viblo.asia/aea601a9-5562-49f2-a2f9-7a59a6d2e40a.png)  

Tiếp đến, chúng ta chỉ định việc thực hiện **logic** xác thực với **API** bên trong **controller**. **NestJS** cung cấp khái niệm **[Guards](https://docs.nestjs.com/guards)** - dịch ra nghĩa là *bảo vệ* - với vai trò cho phép chúng ta xây dựng **logic** nhằm quyết định xem khi nào thì một **request** được thực thi - nếu bạn đã từng làm việc với **expressjs** thì khái niệm này gần giống với **middleware**. Thư viện **@nestjs/passport** mà chúng ta cài đặt ban đầu đã tích hợp sẵn, cho phép chúng ta sử dụng **strategy** của **passport** như một **Guard** của **API**. Việc cần làm là thêm một xíu **code** vào bên trong **auth.controller.ts**  

```ts
// auth.controller.ts
import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  @UseGuards(AuthGuard('local'))
  signin(@Req() req: Request) {
    const user = req.user;
    console.log('user', user);
    return 'sign success!';
  }
}
```  

Mình giải thích qua một xíu nhé, **AuthGuard** là một **NestJS Guard** được viết sẵn bởi thư viện **@nestjs/passport** cho phép tích hợp **passport strategy** vào bên trong **API**. Mặc định **AuthGuard** sẽ gọi tới **LocalStrategy** mà chúng ta định nghĩa và đã thêm vào bên trong **AuthModule** trước đó.    \


Xong, chúng ta đã xây dựng xong phương thức xác thực với **email/password**. Tuy nhiên, nếu chỉ sử dụng một phương thức xác thực như trên trong ứng dụng, thì gặp một vấn đề như sau, với mỗi **API** tiếp theo của ứng dụng, nếu cần xác thực, **Client** luôn luôn nhớ phải gửi lên cả **email** và **password**, và phải là phương thức **Post**. Vì vậy phương thức xác thực này thực tế chỉ nên sử dụng cho một **API** đó là khi người dùng **sign in**. Còn đối với những **API** khác, chúng ta cần sử dụng một phương thức xác thực có tính linh hoạt hơn, như là sử dụng **jsonwebtoken** chẳng hạn, chúng ta sẽ tiếp tục xây dựng phương thức xác thực này bằng **passport** trong phần 2 của bài viết.