Xin chào các bạn. Hôm nay mình sẽ tiếp tục  series về Vuejs. Hôm nay mình sẽ giới thiệu với các bạn về serve môt ứng dụng VueJS từ một NestJS backend.

---

## Tạo một ứng dụng Nest
Cài đặt Nest CLI

``` html
npm install -g @nestjs/cli
```

Tạo một ứng dụng NestJS

``` html
nest new nest-with-vue
```

Cài đặt thêm các thư viện
``` html
cd nest-with-vue npm install
```

## Xác nhận rằng tất cả đều hoạt động
Đầu tiền chúng ta sẽ chạy ứng dụng(điều này này sẽ giúp chúng ta khi có thay đổi code cũng không cần thiết phải khởi động lại server).

``` html
npm run start:dev
```

Sau đó khởi tạo port cho ứng dụng:

``` html
curl localhost:3000
```

Như vậy là chúng ta đã chạy được ứng dụng của mình rồi đó. Rất đơn giản phải không.

## Thiết lập nội dung serve tĩnh
Cần cài đặt thêm package: 

``` html
npm install --save @nestjs/serve-static
```

## Sử dụng các package

Trong src/app.module.ts:

``` html
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule} from '@nestjs/serve-static'; // New
import { join } from 'path'; // New

@Module({
  imports: [
    ServeStaticModule.forRoot({ // New
      rootPath: join(__dirname, '..', 'client/dist'), // New
    }), // New
  ],
 controllers: [AppController],
 providers: [AppService],
})
export class AppModule {}
```

Trong src/main.ts:

``` html
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // New
  await app.listen(3000);
}
bootstrap();
```

Ở đây chúng ta sẽ chuyển tất cả các endpoints vào trong folder `/api` và sau đó lưu các nội dung tĩnh vào trong folder  `./client/dist`
và kiểm tra sự thay đổi trên `localhost:3000`

Lưu ý rằng tên `Client` ở đây có thể được đặt là bất cứ tên gì. Thực ra đây chỉ là folder mà ta sẽ đặt ứng dụng Vue thôi nhé.

---

Giờ chúng ta sẽ kiểm tra lại xem sau khi di chuyển các endpoints mọi thứ đã hoạt động chưa nhé.

Ta chạy lại port vừa rồi.

``` html
curl localhost:3000
```

Giờ các bạn sẽ thẫy có lỗi `{"statusCode":500,"message":"Internal server error"}`
Các bạn chạy lại port với endpoint `/api`:
``` html
curl localhost:3000/api
```

Mọi thứ sẽ hoạt động trở lại.
Bây giờ chúng tả chỉ cần tạo một ứng dung Vue vào trong folder `./client/dist`.

## Tạo ứng dụng VueJS

Cài đặt Vue CLI:

``` html
npm install -g @vue/cli
# Hoặc 
yarn global add @vue/cli
```

Tạo ứng dụng Vue: 
``` html
npm install -g @vue/cli

# Hoặc 
vue create client
```
Build ứng dụng: 

``` html
cd client
npm run build
```

Như vậy tất cả các files static sẽ được thêm vào `./client/dist`.

## Kiểm tra Nest đã hoạt động với ứng dụng Vue.

``` html
curl localhost:3000
```
Bạn sẽ thấy có thông báo: 

``` html
<!DOCTYPE html><html lang=en> ... <strong>We're sorry but client doesn't work properly without JavaScript enabled. Please enable it to continue.</strong> ... </html>
```

Giờ mở nó lên trong trình duyệt của bạn và sẽ thấy nó hoạt động!


![](https://images.viblo.asia/bfea6c37-3e11-428a-9e7c-cf829b4f74b5.png)


---


Như vậy là mình đã giới thiệu các bạn những bước cơ bản để Serve ứng dụng VueJS với Nest.. Nếu có bất kì thắc mắc gì hãy để lại comment ở phía dưới nhé.


---
### Tham Khảo

https://medium.com/js-dojo/how-to-serve-vue-with-nest-f23f10b33e1