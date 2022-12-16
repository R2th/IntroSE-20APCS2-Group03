Hello anh em, cũng một thời gian rồi, nay mình xin phép tiếp tục series [Tự học NodeJS](https://viblo.asia/s/tu-hoc-nodejs-nodejs-cho-mobile-P0lPmJ7p5ox) của mình mong anh em ủng hộ nhá, mình cũng còn nhiều thiếu sót nên xin nhờ anh em chăm chỉ comment chỉ giúp mình những lỗi sai nhiều hơn :D (thanks). Trong bài viết này mình chúng ta sẽ đi tìm hiểu thêm về:
     
   - HTTP Module
   - Babel
   - Tương tác cơ bản với file json
   
# I. HTTP module
HTTP module là gì? thực ra nó rất quan trọng, nó cho phép chúng ta tạo ra server và cho phép các request từ phía client gửi lên server thông qua các port do ta định danh.

Ở đây mình có sử require tới module `http` nghĩa là ta khai báo sử dụng module `http` này và có port là 3003

```js:index.js
    let http = require('http');
    const port = 3003;
```

ở đây các bạn có thể sử dụng `let` hoặc `var` đều được nhá, bởi vì mục đích của biến này chỉ là khởi tạo 1 lần nên đều được.

Tiếp theo để tạo ra 1 server chúng ta cần khai báo nó: 
```js:index.js
    const server = http.createServer((request, response) => {
        response.write('This is Awesome !!!');
        response.end();
    }).listen(port);
```

Để start server chúng ta cần gọi tới `createServer` của đối tượng `http` và nó trả về 1 object server chứa 2 tham số đó là `request` và `response`. Và chúng ta gọi tới port mà chúng ta khai báo phía cuối arrow function này.

Trong arrow function mình có viết 1 lệnh `write`, lệnh này chỉ là 1 lệnh in ra màn hình khi server nhận được request từ phái client. Và cuối lệnh createServer ta cần phải end nó đi.

Các  bạn hãy test bằng cách mở  `terminal` lên và gõ `node index.js`. Sau đó mở browser lên nhập `localhost:` với tên port bạn khai báo. Ở đây của mình là `localhost:3003`

![](https://images.viblo.asia/f9f2db20-a5fc-4498-a7c8-5aa933458c6b.png)

Bây giờ nếu như bạn muốn lấy ra địa chỉ ip phía client mà request nên server thì ta cần gọi tới `socket`

```js:index.js
     const server = http.createServer((request, response) => {
        response.write('This is Awesome !!!');
        const ipAddress = request.socket.remoteAddress;
        response.write(`IP address is ${ipAddress} \r\n`);
        response.end();
    }).listen(port);
```

- `remoteAddress` chính là địa chỉ ip mà gửi đến.
- `\r\n` nghĩa là xuống dòng. Dưới kia là mình test trên `Postman`  nên nó mới không xuống dòng.

![](https://images.viblo.asia/23467eea-7a04-4922-ad27-51e2da6bd576.png)

Ở đây cho ra địa chỉ IP là `::1` nghĩa là sao? Điều này nghĩa là serer của chúng ta hiện tại đang là local host. Oke bây giờ mình thử truy cập bằng tên miền xem sao. Các bạ  quay lại terminal và `hostname` để lấy tên miền trên máy của chính mình 

![](https://images.viblo.asia/e97415ec-30c0-475e-8f41-c9d96b2bfdfb.png)

Sau đó hãy copy hostname mà chúng ta vừa có thay cho từ khoá `localhost` và xem lại kết quả nhá, nó sẽ in ra chính địa chỉ IP máy của mình bởi vì mình đang request tới chính máy local của mình mà :D

![](https://images.viblo.asia/a4789c62-6130-4cb4-b0f6-4a4b902197cd.png)

Xong, nếu bây giờ trên `url` có các tham số và chúng ta muốn lấy thông tin về nó và xử lý thì phải làm sao? Trong `request` có 1 biến đó là `url`

```js:index.js
    const server = http.createServer((request, response) => {
        response.write(`Request url is ${request.url} \r\n`);
        response.write(`Detail request's url is ${require('url').parse(request.url, true)}`);
        response.end();
    }).listen(port);
```

![](https://images.viblo.asia/f0670f45-abc5-4788-8d4d-7b806ed6bfe0.png)

Khi phía sau url không có gì thì url hiệnt tại chính là root `/` . Nếu bây giờ các bạn thêm thông số phía sau thì url nhận được cũng sẽ thay đổi theo.

![](https://images.viblo.asia/933b6a6c-891b-428b-bef8-463b1979e5b3.png)

Tiếp theo chúng ta sẽ thêm các tham số

![](https://images.viblo.asia/2ec6f7bb-37d0-47bb-90c2-dba91b69949b.png)

Sau dấu `?` là các tham số, `%20` là dấu space, `&` là phân biệt giữa các tham số đầu vào. Ở trên mình có 2 tham số đầu vào đó là name = longnk và gender = male.

`require('url')` là thư viện thực hiện cho việc tách url. Parse để chúng ta phân tích url ra thành 1 object, trong object đó chúng ta có thể sẽ lấy ra được các params bên trong.

Nhưng hiện tại chúng ta chỉ thấy in ra là Object Object vậy phải làm sao? Bây giờ chúng ta quay lại [Debugger](https://viblo.asia/p/nodejs-la-gi-cai-dat-va-cau-truc-thu-muc-nodejs-Do754kg4lM6) của bài trước.

Các bạn thêm `debugger` vào và mở terminal lên run `node inspect index.js` nhá: 

```js:index.js
    const server = http.createServer((request, response) => {
        response.write(`Request url is ${request.url} \r\n`);
        response.write(`Detail request's url is ${require('url').parse(request.url, true)}`);
        debugger;
        response.end();
    }).listen(port);
    console.log(`Server is running an port: ${port}.`);
```

Sau khi gõ `node inspect index.js` chúng ta gõ thêm `c` để continue. Tiếp theo mở trình duyệt lên và refresh lại sẽ ra kết quả như này:

![](https://images.viblo.asia/9c222b6e-b516-4de4-87da-197f024e0227.png)

 Nếu tới được bước này là thành công rồi nhá, tiếp theo chúng ta sẽ in đoạn `require('url').parse(request.url, true)` ra, các bạn gõ repl và paste đoạn trên vừa vào
 
![](https://images.viblo.asia/980b7e96-13ed-491e-90de-60689c3450d6.png)

Nếu muốn lấy nhiều thông tin hơn, chúng ta sử dụng hàm JSON.stringify, hàm này giúp truyền tải hết thông tin của object về dạng string.

Khi đó các bạn muốn lấy ra thông tin mình cần chỉ cần `.query_[param]`

![](https://images.viblo.asia/6fc39e15-0e54-487a-ad9c-477b18eb7927.png)

# II. Babel

Babel là một compiler của nodejs, ta sẽ sử dụng Babel để biên dịch ứng dụng NodeJS của chúng ta.

Trước tiên ta cần cài đặt : 

  `npm install --save-dev babel-cli`

- --save-dev:  nghĩa là chúng ta cài và lưu trong giai đoạn phát triển của dự án, giai đoạn product (release cho khách hàng) sẽ không có.

`npm install --save-dev babel-preset-es2015 babel-preset-stage-2`

- babel-preset: đây là plugin của babel, 2 plugin này phục vụ cho chúng ta làm việc với es2016.

Sau khi cài đặt thành công, ta quay lại file package.json và thêm dòng này:

![](https://images.viblo.asia/71abeb61-db1e-4716-99e6-c6e36993eb7b.png)

Câu lệnh này nghĩa là sẽ chạy file `node.js` mà sẽ sử dụng `babel-node` chứ không sử dụng `node` nữa 

- --preset : nghĩa là chúng ta khai báo sử dụng các preset (es2015,stage-2).

Sau khi xong ta quay lại terminal và `npm start`

![](https://images.viblo.asia/5f9802d9-d4a9-43df-8084-6b4e19afb826.png)

Nhìn cũng giống như chạy `node index.js` phải không :v, khoan ta hãy cài thêm 1 số plugin nhá.

`npm install --save-dev nodemon`

- mục đích là theo dõi khi code của chúng ta thay đổi

Tiếp theo sửa file `package.json`
```js:package.json
"runNodemon": "nodemon index.js --exec babel-node --presets es2015,stage-2"
```

Bây giờ các bạn thử chạy lệnh `npm runNodemon` lên và thử sửa 1 dòng code nào đó và xem thay đổi nhá. nó sẽ tự cập nhật lại đấy :D!

**Note:** Với phiên bản mới bây giờ các bạn hãy cài https://babeljs.io/docs/en/env/ thay vì `es2015,stage-2`

Bây giờ sau khi biên dịch xong rồi chúng ta muốn export nó ra thì làm như nào?

Đầu tiên ta tạo 1 folder mới trong project `mkdir src` và chuyển file `index.js` vào đó `mv index.js src`.

Thêm câu lệnh `build` vào trong file `package.json`

```js:package.js
"build": "babel src -d distribution --presets es2015,stage-2",
"serve": "node distribution/index.js"
```
- build: trích ra thư mục distribution
- serve: chạy thư file `index.js` sau khi export vào trong thư mục distribution

Sau đó hãy chạy `npm run build` và `npm run serve` nhá :D.


Sau khi xong các bạn tạo thêm file `.babelrc` với câu lệnh `touch .babelrc`
- File này nghĩa là các option dành cho babel.

```js:.babelrc
{
    "presets": [
        "es2015",
        "stage-2"
    ],
    "plugin": []
}
```

Sau khi xong các bạn quay lại file `package.json` và có thể xoá các option đã import đi.

```js:package.json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "babel-node index.js",
    "build": "babel src -d distribution",
    "runNodemon": "nodemon src/index.js --exec babel-node",
    "serve": "node distribution/index.js"
  },
```


Ok, bài của mình xin dừng ở đây nhá, hy vọng với cách trình bày của mình các bạn có thể hiểu một phần nào đó :D, bài sau mình sẽ viết về tương tác với file `.json` như thế nào, Thanks!!