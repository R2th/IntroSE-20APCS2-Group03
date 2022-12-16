![](https://images.viblo.asia/ff5294f8-07aa-49c0-aefb-f27a67e80777.jpeg)

Thời gian gần đây, cái tên `Deno` đang trở thành một từ khoá vô cùng hot trong cộng đồng JS. Dạo qua khắp các group các forum không quá khó để chúng ta tìm được những bài viết về `Deno`. `Deno` là cái chi chi mà sao lại có sức hút lớn như vậy?

### Giới thiệu
Deno giống với NodeJs là một `runtime environment`, nó cũng được phát triển dựa trên V8 engine của Javascript giống với Nodejs cũng bởi chính cha đẻ của NodeJs là Ryan Dahl. Năm 2018 tại JSConf EU, Ryan Dahl đã có một bài phát biểu nói về những hạn chế của NodeJs mà khó có thể thay đổi,  các bạn có thể xem lại bài phát biểu tại [đây](https://www.youtube.com/watch?v=M3BM9TB-8yA). Deno được sinh ra nhằm giải quyết những vấn đề còn tồn đọng của NodeJs.

### So sánh Deno với NodeJs
Deno với NodeJs có một số điểm tương đồng như cùng được xây dựng dựa trên V8 engine và cùng nhằm mục đích phát triển server-side với Javascript. Tuy nhiên so với NodeJs, Deno đã có những thay đổi lớn.

#### Typescript

Deno hỗ trợ trực tiếp Typescript mà không cần phải config gì thêm. Hiện nay Typescript đã và đang trở thành xu hướng bởi những lợi ích mà nó mang lại có thể kể tới như việc chú thích về types cho các biến giúp code trở nên dễ đọc, dễ debug hơn. Các dựa án front-end hiện nay sử dụng ReactJS, VueJS, ... cũng đã chuyển sang sử dụng Typescript. Trước đây khi làm việc với React mình thường phải sử dụng thêm Flow types để thêm tính năng check type cho Javascript thứ mà hiện nay Typescript đã có thể giải quyết vấn đề một cách dễ dàng.

Nếu muốn sử dụng Javascript thay vì Typescript Deno cũng đã hỗ trợ sẵn.

#### Không sử dụng package manager
Khác với NodeJs sử dụng npm, yarn làm package manager. Deno hoàn toàn không có một trình quản lý gói nào cả, thay vào đó Deno import các thư viện thông qua URL. Việc không sử package manager khiến Deno vô cùng linh hoạt, chúng ta có thể viết một thư viện Deno và import mà không cần phải đóng gói xong đẩy chúng lên repository giống như npm.


#### ECMAScript features
Deno sử dụng các tính năng mới nhất của ECMAScript trong tất cả API và standard library trong khi NodeJs sử dụng callback-based. Làm việc với callback trong NodeJs thực sự là một cực hình đặc biệt là gặp tình trạng callback hell, chính mình hiện cũng đang là nạn nhân của callback hell khi mới nhận một dự án NodeJs đã phát triển từ khá lâu bởi một đơn vị khác với những đoạn code callback có thể thụt vào tới 20 tabs :). Thực sự đó là một trải nhiệm không hề dễ chịu chút nào, với Deno mọi thứ sẽ được giải quyết 1 cách dễ dàng.  


#### Security
Security cũng là một điểm nổi bật của Deno so với NodeJs. Đối với Deno một chương trình sẽ cần được cấp quyền để có thể tương tác với các thành phần như file, network, ... trong khi đó đối với NodeJs ta có thể tương tác trực tiếp với mọi thứ một cách dễ dàng hơn rất nhiều. Dưới đây là danh sách các permission flag mà Deno cung cấp:

* ***--allow-env:*** Allow environment access.
* ***--allow-hrtime:*** Allow high-resolution time measurement.
* ***--allow-net:*** Allow network access.
* ***--allow-plugin:*** Allow loading plugins.
* ***--allow-read:*** Allow file system read access.
* ***--allow-run:*** Allow running subprocesses.
* ***--allow-write:*** Allow file system write access.
* ***--allow-all:*** Give all access.


### Xây dựng một server đơn giản với Deno
Chúng ta cùng thử cài đặt Deno. Hướng dẫn cài đặt đã được ghi rất rõ tại trang chủ của Deno là [deno.land](https://deno.land/).
Đầu tiên chúng ta chạy lệnh install Deno
```bash
curl -fsSL https://deno.land/x/install/install.sh | sh
```

Mặc định khi cài đặt Deno sẽ được lưu trữ lại thư mục `/home` vì vậy chúng ta cần config lại PATH một chút.

```bash
  export DENO_INSTALL="/Users/user_name/.deno"
  export PATH="$DENO_INSTALL/bin:$PATH"
```

Kiểm tra phiên bản Deno bằng cách 
```bash
deno --version
```

Chúng ta cùng thử tạo một server Deno trả về một trang html tĩnh một cách đơn giản.
Đầu tiên chúng ta tạo một trang html tĩnh.
```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charset="utf-8" />
    <title>Example using Deno</title>
  </head>
  <body>
    index.html served correctly
  </body>
</html>
```

Sau đó tạo một server đơn giản với Deno
```js
import { listenAndServe } from 'https://deno.land/std/http/server.ts'

listenAndServe({ port: 3000 }, async (req) => {
  if (req.method === 'GET' && req.url === '/') {
    req.respond({
      status: 200,
      headers: new Headers({
        'content-type': 'text/html',
      }),
      body: await Deno.open('./index.html'),
    })
  }
})

console.log('Server running on localhost:3000')
```

Để tạo 1 server với Deno ta sử dụng thư viện `http`. Chúng ta có thể tìm thấy các thư viện chuẩn của Deno tại [đây](https://deno.land/std). Ta thấy hàm `listenAndServe` được import trực tiếp từ URL do đó chúng ta không cần `npm` và `node_modules`, chúng ta cũng có thể sử dụng ESmodule thay vì Common.js cùng với các tính năng `async-await` như đã đề cập ở trên.

Để run server chúng ta chạy lệnh
```bash
deno run server.ts
```
![](https://images.viblo.asia/89a2267f-8d11-4c18-915c-ba9bbb95b218.png)

Sau khi chạy Deno sẽ dowload dependencies từ `http` module, chúng sẽ được tải trong lần đầu chạy project sau đó được cache lại để sử dụng cho những lần sau. Ta có thể xoá cache bằng cách thêm flag `--reload`.

Tuy nhiên project của chúng ta không hoạt động ngay mà có 1 thông báo lỗi yêu cầu chạy lại với flag `--allow-net` để được cấp quyền truy cập network. 

![](https://images.viblo.asia/57b96eb3-2fb4-41c8-83be-504a3b6d1ca9.png)

Ta tiếp tục chạy lệnh
```bash
deno run --allow-net server.ts
```
![](https://images.viblo.asia/d7eff0a0-e5c4-48e1-8542-7bab1b3acb3f.png)

Ở đây Deno tiếp tục thông báo lỗi chúng ta không có quyền đọc file `index.html`. Vì vậy ta cần cấp quyền đọc cho chương trình bằng flag `--allow-read`.

```bash
deno run --allow-net allow-read server.ts
```

Và đây là kết quả thu được, static web của chúng ta đã hoạt động. Như các bạn thấy tính năng security của Deno yêu cầu chúng ta phải cấp quyền cho ứng dụng để hoạt động chứ không như NodeJs, điều này giúp cho Deno bảo mật và khó bị tấn công hơn 
![](https://images.viblo.asia/da4d9cf8-81c6-4380-9994-b2fcc74c593c.png)

### Kết
Qua bài viết này mình đã giới thiệu sơ bộ về Deno. Hiện nay số lượng sao trên Github của Deno đã lên tới con số 64k, Deno trở thành một từ khoá hot trong cộng đồng JS và đang ngày một phát triển. Hy vọng tương lai Deno sẽ phát triển để trở thành một đối công cụ hữu ích cho các lập trình viên JS.

### Tài liệu tham khảo
https://deno.land/manual

https://aralroca.com/blog/learn-deno-chat-app