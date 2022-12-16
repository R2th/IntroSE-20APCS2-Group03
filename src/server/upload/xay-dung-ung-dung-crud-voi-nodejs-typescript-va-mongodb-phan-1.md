## Lời mở đầu
Dạo gần đây thì mình mới học Nodejs và Typescript, chính vì vậy mà mình tham khảo nhiều nơi và viết ra bài này (chính xác hơn là dịch và tổng hợp lại). Một phần là để ghi nhớ lâu hơn và coi như là 1 bản ghi chép để nếu quên thì có chỗ mà xem lại. Một phần cũng là mong muốn chia sẻ cho các bạn nào mới tiếp xúc Nodejs (như mình) có thể dễ dàng hơn trong việc xây dựng 1 ứng dụng nho nhỏ trên nền tảng Nodejs và Typescript. 

**Vì mình cũng mới tìm hiểu nên có thể bài viết còn nhiều thiếu xót. Mong các bạn, các anh/chị bỏ qua cho nhé :D**.

## Chuẩn bị cơ sở dữ liệu
### Cài đặt MongoDB
Trong bài viết này mình sẽ dùng MongoDB để làm cơ sở dữ liệu cho ứng dụng. Chính vì vậy các bạn cần phải [cài đặt MongoDB tại đây](https://docs.mongodb.com/manual/administration/install-community/). Link này đã hướng dẫn chi tiết cách cài đặt và cả cách sử dụng cơ bản cho các loại hệ điều hành (Mac, Windows, Linux) nên mình sẽ không hướng dẫn lại nữa.

### Cài đặt RoboMongo
Các bạn có thể tương tác với MongoDB thông qua Terminal. Tuy nhiên để dễ dàng hơn cho những người mới(như mình) thì mình khuyên các bạn nên sử dụng giao diện để dễ dàng quản lý. Các bạn có thể [tải và cài đặt RoboMongo tại đây](https://robomongo.org/) hoặc [tải và cài đặt Mongo Compass tại đây](https://docs.mongodb.com/compass/master/install/). Ở bài viết này mình sẽ sử dụng RoboMongo nhé.

### Kết nối đến MongoDB thông qua RoboMongo
#### Thêm kết nối 
Khi khởi động sẽ có giao diện như bên dưới. Bạn hãy bấm **New Connection** để thêm kết nối đến MongoDB nhé.

![](https://i.imgur.com/O9LQhEn.png)

#### Cài đặt thông số
Mặc định bạn có thể kết nối đến MongoDB thông qua servername là **localhost** và chạy trên port **27017**.

![](https://i.imgur.com/hLUDwR8.png)

#### Kết nối thành công
Sau khi thêm thông số xong thì bấm Connect để có thể thực hiện viện quản lý nhé. Khi thành công thì giao diện sẽ như sau:

![](https://i.imgur.com/6NWgByP.png)

## Chuẩn bị Nodejs và các công cụ cần thiết
### Cài đặt Nodejs
Để có thể viết ứng dụng Nodejs thì chắc chắn bạn sẽ phải cài đặt Nodejs rồi. Bạn có thể cài đặt bản ổn định mới nhất tại trang [chủ của Nodejs](https://nodejs.org).

Hoặc nếu dùng ubuntu thì bạn có thể chạy các lệnh lần lượt như sau để cài đặt Nodejs:

```
sudo apt update
```

```
sudo apt install nodejs
```

```
sudo apt install npm
```

Sau khi cài đặt thành công hãy thử bằng cách chạy 2 dòng sau:

```
node -v

npm -v
```

Nếu như nó ra phiên bản mà bạn cài đặt thì có nghĩa là bạn đã cài đặt thành công Nodejs.
![](https://i.imgur.com/qBdYvqq.png)

### Cài đặt typescript
Ở bài này mình sử dụng Typescript thay vì dùng Javascript. Thực ra Typescript nó là bản hơi nâng cấp 1 chút so với Javascript. Với Typescript thì bạn có thể khai báo các class, abstract class, interface, kiểu dữ liệu,... Bạn cũng có thể sử dụng các cú pháp Javascript trong Typescript và hoàn toàn có thể chuyển nó thành file Javascript nhé.

Chạy lệnh sau để cài đặt typescript

```
sudo npm install tsc -g
```

Khi install xong hãy thử chạy lệnh sau để kiểm tra xem nó đã được cài đặt thành công hay chưa:

```
tsc -v
```

Nếu nó ra version như dưới đây có nghĩa là bạn đã cài đặt thành công:

![](https://i.imgur.com/ImdFkum.png)


## Bắt tay vào làm nào
### Bước 1: Init Nodejs Project

1. Tạo thư mục **NodeJS-TSC**

2. Sau đó chạy command trong thư mục này:

```
npm init 
```

Bạn có thể nhập hoặc enter để bỏ qua các thông tin, những thông tin này bạn có thể dễ dàng sửa lại sau này.

![](https://i.imgur.com/NsA3sdC.png)

Sau khi nhập xong thông tin thì file **package.json** sẽ được tạo ra trong thư mục của bạn.

### Bước 2: Cài đặt các dependency cần thiết

Chạy lệnh sau để cài các package cần thiết cho việc xây dựng ứng dụng

```
npm install --save @types/express express body-parser mongoose nodemon
```

Giải thích công dụng của các package:

* express: đây là 1 framework của Nodejs (đừng nhầm lẫn Nodejs là Framework của Javascript nhé, nó là platform của javascript) giúp chúng ta xây dựng ứng dụng Nodejs dễ dàng hơn.

* @types/express: giúp chúng ta có thể sử dụng express thông qua Typescript.

* body-parser: giúp ứng dụng có thể nhận dữ liệu thông qua body của Request.

* mongoose: giúp chúng ta kết nối đến MongdoDB để thực hiện tương tác với cơ sở dữ liệu.

* nodemon: giúp cho server có thể tự restart lại mỗi lần code thay đổi. Nếu không có nó bạn sẽ phải chạy lại command mỗi khi lưu code (khá là bất tiện nhỉ).

### Bước 3: Cấu hình file config của Typescript
Chúng ta sẽ để tất cả các file typescript trong thư mục **src** và khi lên môi trường production thì chúng ta sẽ lưu những file Javascript (sau khi chuyển từ Typescript) vào trong thư mục **dist** nhé.

Tạo file tsconfig.json trong thư mục project của bạn với nội dung như sau:
```json
{
    "compilerOptions": {
        "module": "commonjs",
        "moduleResolution": "node",
        "pretty": true,
        "sourceMap": true,
        "target": "es6",
        "outDir": "./dist",
        "baseUrl": "./src"
    },
    "include": [
        "src/**/*.ts"
    ],
    "exclude": [
        "node_modules"
    ]
}
```

Sau này khi bạn chạy lệnh ```tsc``` thì tất cả file Typescript sẽ được chuyển thành file Javascript và cho vào trong thư mục **dist**.

### Bước 4: Thêm các lệnh vào package.json
Bật file package.json của bạn lên xóa **scripts** cũ đi và thay vào đó:

```json
"scripts": {
  "build": "tsc",
  "dev": "nodemon --exec ts-node ./src/server.ts",
  "start": "nodemon ./dist/server.js",
  "prod": "npm run build && npm run start",
  "test": "echo \"Error: no test specified\" && exit 1"
},
```

Khi trong môi trường development bạn có thể chạy lệnh sau để khởi động server

```
npm run dev
```

Và khi lên môi trường production:

```
npm run prod
```

### Bước 5: Bắt đầu xây dựng file app.ts
File này sẽ là nơi chúng ta cấu hình cho express, thêm vào nó các middleware hay thiết lập các công cụ để làm việc. Chúng ta sẽ export nó ra để có thể sử dụng ở những nơi khác.
Tạo file **app.ts** trong thư mục **src**:

```typescript
import * as express from "express";
import * as bodyParser from "body-parser";

class App {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();        
    }

    private config(): void{
        // Giúp chúng ta tiếp nhận dữ liệu từ body của request
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

}

export default new App().app;
```

### Bước 6: File server.ts và chạy thử
Bước cuối cùng này chúng ta sẽ import app ở trên và khởi động thử server của chúng ta nhé. Bạn có thể thay đổi port khác cho ứng dụng của mình.

Tạo file **server.ts** trong **src**:

```typescript
import app from "./app";

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
```

Sau đó chạy lệnh sau để khởi động server:

```
npm run dev
```

Bạn sẽ thấy nó log ra 1 dòng là: **Server is running on port: 8080**

![](https://i.imgur.com/vQJpJJA.png)


Ra trình duyệt và chạy thử theo đường dẫn [http://localhost:8080](http://localhost:8080) (tùy theo port mà bạn cài đặt). Nếu như nó hiện như sau tức là server của bạn đã chạy thành công rồi đó.

![](https://i.imgur.com/qjG1raR.png)

Tham khảo: https://itnext.io/building-restful-web-apis-with-node-js-express-mongodb-and-typescript-part-1-2-195bdaf129cf