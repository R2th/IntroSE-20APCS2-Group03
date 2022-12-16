# I. Giới thiệu 
NestJS là một backend framework, được xây dựng trên nền NodeJS và ExpressJS để tạo các ứng dụng bên phía server-side. NestJS có một số điểm đặc biệt sử dụng Javascript hiện đại được xây dựng bằng Typeccript duy trì khả năng tương thích với Javascript thuần.

![](https://i.morioh.com/2020/01/11/3ee9d3818fc6.jpg)

NestJS sử dụng ExpressJS nhưng đồng thời cung cấp khả năng tương thích với rất nhiều các thư viện khác như Fastify... cho phép dễ dàng cài đặt nhiều plugin từ các bên thứ 3.

Trong những năm gần đây, nhờ NodeJS phát triển mạnh mà Javascript đã trở thành ngôn ngữ thịnh hành hiện nay có thể xây dựng cả ứng dụng web front end vào back end. Một số các framework front end cực kì nổi tiếng hiện nay như React, Vue, Angular... đã giúp cả thiện năng suất rất nhiều cho ae làm dev. Tuy nhiên ở phía máy chủ trong khi có rất nhiều các thư viện, framework nhưng không hẳn có công cụ nào có thể giải quyết nhanh chóng hiệu quả về vấn đề chính. Nest hường tới việc tạo ra một cấu trúc ứng dụng có thể mở rộng và bảo trì 1 cách dễ dàng.

# II. Cấu trúc
## 1. First step
Trong bài viết này mình sẽ tìm hiểu các nguyên tắc cơ bản cốt lõi của Nest. Để làm quen với các thành phần cơ bản, mình sẽ xây dựng một ứng dụng CRUD cơ bản.
## 2. Language
Mình sẽ sử dụng đó là Typescript để compile ra Javascript thuần bằng Babel
## 3. Yêu cầu (Prerequisites)
Cài đặt NodeJS từ phiên bản 10.13.0 trở lên và bất kì trình editor hay IDE nào mà bạn muốn để hỗ trợ viết code một cách dễ dàng.
## 4.Install 
Để cài đặt thì vô cùng đơn  giản mình sử dụng `npm` để install Nest CLI:
```
$ npm i -g @nestjs/cli
$ nest new project-name
```

Một project NestJS đã được tạo và đây là cấu trúc thư mục của một ứng dụng NestJS:

![](https://i.imgur.com/nml0THp.png)

Dưới đây là một số file vô cùng quan trọng:
* `app.controller.ts`: Là file cấu hình router riêng lẻ.
* `app.module.ts`: file root module của ứng dụng.
* `main.ts`: file quan trọng nhất của dự án (chắc chắn ai cũng biết để làm gì rồi =)))) ).
`main.ts` là file phải bao gồm chứa 1 function async.

```js
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

Để tạo một ứng dụng, mình đã sử dụng class NestFactory. NestFactory trình bày một số phương pháp tĩnh cho phép tạo một phiên bản. Phương trình create trả về một object đáp ứng giao diện INestApplication. Trong ví dụ `main.ts` ở trên, chúng ta chỉ cần khởi động trình nghe HTTP của mình, điều này cho phép ứng dụng chờ các yêu cầu HTTP gửi đến.


Nest hướng tới mục tiêu trở thành một khuôn khổ bất khả tri nền tảng. Nền tảng độc lập giúp tạo ra các phần logic có thể tái sử dụng mà các nhà phát triển có thể tận dụng trên một số loại ứng dụng khác nhau. Về mặt kỹ thuật, Nest có thể hoạt động với bất kỳ HTTP nào sau khi tạo bộ routes. Có hai nền tảng HTTP được hỗ trợ ngay lập tức: Express và Fastify. Bạn có thể chọn một trong những phù hợp nhất với nhu cầu của bạn.
## 5. Run App
Để run app mình dùng câu lệnh:

```
$ npm run start
```

Để sửa đổi port của server local ta tìm đến file `src/main.ts` và sửa. Trong lần đầu tiên chạy thì app sẽ tự động vào trình duyệt và điều hướng tới http://locahost:3000.

![](https://i.imgur.com/9RnruMT.png)

# III. Kết luận
NestJS là một công cụ rất đáng đến học trong tương lai khi Javascript bùng nổ và đang tạo ra cuộc cách mạng lớn này.

Tham khảo thêm:

https://github.com/nestjs/nest

https://docs.nestjs.com/