Trong bài viết đầu tiên của Sub-Series NodeJS mà chúng ta đang thực hiện ở đây, nếu như bạn để ý thì thấy sau khi thực hiện xong việc cài đặt gói phần mềm tải về từ trang chủ của NodeJS, chúng ta đã thử chạy 2 câu lệnh để kiểm tra kết quả cài đặt :

```CMD.io
node -v
:: kết quả: v16.14.2

npm -v
:: kết quả: 8.5.0
```

```Terminal.io
node -v
# kết quả: v16.14.2

npm -v
# kết quả: 8.5.0
```

Câu lệnh đầu tiên là để kiểm tra phiên bản của NodeJS đã cài đặt thành công trên máy tính của bạn. Còn câu lệnh thứ hai là để kiểm tra phiên bản của một phần mềm có tên là `npm` được đóng gói kèm theo bộ cài đặt của NodeJS. Và bây giờ thì chúng ta mới có thể bắt đầu nói về phần mềm này.

## NPM là cái gì?

Vẫn xuất phát từ nhu cầu chia sẻ và tái sử dụng các bộ code miễn phí của cộng đồng lập trình viên. Đâu đó trong một thời điểm lịch sử khoảng 8 tháng sau khi NodeJS xuất hiện, thì một cơ sở dữ liệu cộng đồng dành riêng cho các gói phần mềm `package` được viết trên nền NodeJS cũng được chính thức giới thiệu kèm theo một `phần mềm quản lý` dành cho người sử dụng có tên là `NPM`. Tên viết đầy đủ của `NPM` thì như tiêu đề bài viết của chúng ta đã ghi, đó là `Node Package Manager` - phần mềm quản lý `manager` các gói `package` trong môi trường `NodeJS`.

Khái niệm `package` ở đây được hiểu rộng hơn một chút so với `module` mà chúng ta đã biết trước đó. Một `package` có thể là một thư viện nhỏ `library` cung cấp các công cụ hỗ trợ trong code của chúng ta; Một `package` cũng có thể có kích cỡ lớn hơn một chút - đó là một `framework` bao gồm nhiều `module` để tạo nên các thành phần mang tính kiến trúc trong phần mềm mà chúng ta đang xây dựng; Và thậm chí, một `package` cũng có thể là một phần mềm hoàn chỉnh, chạy trên môi trường NodeJS.

## Tìm kiếm, cài đặt, và sử dụng các package

Cũng giống với các dự án cộng đồng khác, NPM có một trang web chính thức với đầy đủ tài liệu sử dụng và một công cụ tìm kiếm giúp chúng ta nhanh chóng tìm ra các `package` có liên quan tới nhu cầu sử dụng đang được chia sẻ bởi nhiều lập trình viên khác. Và địa chỉ top 1 sau khi mình Google với từ khóa `npm` là đây - [https://www.npmjs.com/](https://www.npmjs.com/).

![](https://images.viblo.asia/677ee91c-9549-497f-ae61-3b29a7f3d313.png)

Ở góc phía bên phải thì chúng ta có mục tài liệu hướng dẫn là `Documentation` và khu vực đăng ký tài khoản người dùng để tham gia vào cộng đồng lập trình viên đang chia sẻ các gói phần mềm tại `npm`. Về giao diện sử dụng dòng lệnh thì chúng ta có các thao tác được liệt kê đầy đủ tại đây - [Danh sách đầy đủ các câu lệnh để sử dụng `npm`](https://docs.npmjs.com/cli/v8/commands). Tuy nhiên thì bạn không cần phải cố gắng ghi nhớ hết mấy câu lệnh này để bắt đầu sử dụng `npm` đâu. Vẫn như mọi khi thôi, chúng ta lưu lại liên kết tham khảo để sử dụng khi cần tới, và chỉ khởi đầu với một vài câu lệnh phổ biến là đủ. :D

Bây giờ chúng ta sẽ thử tìm và cài đặt một `package` để sử dụng. Hãy giả định là chúng ta đang cần tìm một phần mềm `server` cho web tĩnh giống như code `server` đơn giản mà chúng ta đang có ở thời điểm hiện tại đi. Vậy chúng ta sẽ thử tìm kiếm với từ khóa `http-server`.

![](https://images.viblo.asia/cf7d64e0-db2b-4d5e-8ba2-cf02b29e4e25.png)

Có ngay một kết quả trùng hợp chính xác `exact-match` với từ khóa mà chúng ta tìm kiếm, và có một dòng mô tả bên dưới là - một phần mềm `server http` đơn giản không yêu cầu thiết lập gì mà chỉ cần cài đặt về là dùng thôi. Nhấn vào xem ngay. :D

![](https://images.viblo.asia/7e816397-268a-4cd4-a385-5aaa45959a71.png)

Phong cách lập tài liệu chung của các `package` được chia sẻ tại `npm` thì đều sẽ cung cấp cho người sử dụng hướng dẫn cài đặt `Installation` và hướng dẫn sử dụng `Usage`. Ở đây chúng ta có hướng dẫn cài đặt là một câu lệnh -

```CMD|Terminal.io
npm install --global http-server
```

![](https://images.viblo.asia/1b75e099-e107-4ac2-a20b-17498c05a565.png)

Sau khi lệnh cài đặt được thực hiện xong thì chúng ta, xem tới phần hướng dẫn sử dụng `Usage` có mô tả cú pháp lệnh thế này -

```CMD|Terminal.io
http-server [path] [options]
```

Trong đó thì các tham số đầu vào là đường dẫn `path` tới thư mục gốc của trang web tĩnh mà chúng ta đang có, tức là thư mục `static`, và các tham số phụ không bắt buộc `options`. Trong trường hợp không chỉ định `path` thì phần mềm `http-server` sẽ tìm thư mục `public` trong thư mục đang làm việc hiện tại, nếu không tìm thấy thì sẽ xem như thư mục hiện tại sẽ là thư mục gốc của trang web.

Vậy chúng ta chỉ cần di chuyển tới thư mục `static` và gõ lệnh `http-server` là được. Ở đây thì mình đã di chuyển thư mục `nodejs-blog` vào `Documents`, nếu bạn vẫn để ở `Desktop` thì sửa lại lệnh `cd` thành `Desktop` nhé. :D

```CMD|Terminal.io
cd Documents/nodejs-blog/static
http-server
```

Sau khi khởi chạy phần mềm thì chúng ta sẽ thấy địa chỉ truy cập được in ra trong `console`. Thử mở trình duyệt web để kiểm tra ngay thôi. :D

[http://127.0.0.1:8080](http://127.0.0.1:8080)

![](https://images.viblo.asia/9754fb5b-745d-41ce-a6da-217f7c84ad67.png)

Tuyệt... Mọi thứ hoạt động hoàn toàn đúng với quảng cáo tại trang tài liệu của `package`. :D

## Làm thế nào để sử dụng Library và Framework?

Ứng dụng quan trọng nhất của `npm` đối vối chúng ta lúc này là tải về và nhúng các thư viện hỗ trợ hay `framework` để giúp chúng ta xây dựng một trang web có logic xử lý ở server linh hoạt hơn so với code `server` web tĩnh mà chúng ta đang có ở  thời điểm hiện tại. Và để `npm` có thể giúp chúng ta nhúng một `package` vào một bộ code bất kỳ thì chúng ta cần đăng ký bộ code đó với `npm` như một dự án `project`. Bây giờ trong `console` chúng ta cần quay trở lại thư mục `nodejs-blog` để làm việc.

```CMD|Terminal.io
cd ..
```

Sau đó nói với `npm` là chúng ta muốn khởi đầu `init` một dự án `project`.

```CMD|Terminal.io
npm init
```

![](https://images.viblo.asia/b2415f8b-819b-42c6-881b-9c7ecc55e5b0.png)

Ở đây chúng ta đang được hướng dẫn từng bước để tạo ra một tệp khai báo giúp phần mềm `npm` có thể hiểu được những thông tin tổng quan của `project` mà chúng ta đang thực hiện. Những thao tác này sẽ tạo ra một tệp quản lý `package.json` để `npm` có thể giúp chúng ta kết nối code của mình tới các `package` được tải về.

![](https://images.viblo.asia/c501d50a-f400-4338-9eeb-331d417dea5e.png)

Sau khi thực hiện xong các khai báo ban đầu cho `project` của chúng ta thì bạn sẽ thấy trong thư mục `nodejs-blog` có thêm tệp `package.json`. Tệp khai báo này có thể được mở và chỉnh sửa thủ công nếu muốn, tuy nhiên thì bạn sẽ cần Google một vài lần trước khi chỉnh sửa để hiểu được ý nghĩa của một số thành phần như - cách đánh số `version` của một `project`, hay dạng bản quyền phân phối `lisence`.

![](https://images.viblo.asia/68ff9afc-cd8f-4c0a-9591-073e085eecaf.png)

Ở đây có mục `script` mà chúng ta cần quan tâm đầu tiên. Đó là 2 lệnh `start` và `test` để khởi động hoặc chạy thao tác kiểm tra `server` mà chúng ta đang code. Lúc này thay vì gõ lệnh `node server.js` hay `node test.js` trong `console` thì chúng ta sẽ gõ `npm start` hoặc `npm test`. Như vậy thì `npm` sẽ có thể giúp chúng ta kiểm tra các thành phần chính trong tệp khai báo `package.json` trước khi khởi chạy code - bao gồm cả những thư viện mà chúng ta cài đặt thêm vào `project`.

```CMD|Terminal.io
npm test
```

![](https://images.viblo.asia/0634f2b1-d432-46a0-8f54-43dbe630060d.png)

Tới đây thì chúng ta đã có thể lên trang chủ của `npm` để tìm kiếm các thư viện hay `framework` liên quan đến tác vụ cần được hỗ trợ, và thực hiện cài đặt về để sử dụng cho `project` này.

## Dùng thử thư viện hỗ trợ làm việc với mã Markdown của Github

Bây giờ chúng ta sẽ thử cài đặt một thư viện và sử dụng thử trong code của tệp `test.js`. Code hiện tại đang hoạt động tốt ở tệp `server.js` mà bạn `copy/paste` từ `test.js` sang thì chúng ta không chạm vào nhé. :D Thư viện `marked` sẽ giúp chúng ta chuyển đổi nội dung văn bản được đánh dấu với mã `markdown` của Github thành code HTML.

```CMD|Terminal.io
npm install --save marked
```

Bạn để ý là ở đây chúng ta sử dụng lệnh cài đặt với tham số phụ `--save` khác với ví dụ ở trên là `--global`. Tham số `--save` sẽ chỉ cài đặt `package` này cho `project` hiện tại và được lưu trong thư mục `node_modules` được `npm` tạo ra trong thư mục `nodejs-blog`. Và hiển nhiên là `package` này sẽ không được nhìn thấy bởi các `project` khác mà bạn đang có. Còn nếu sử dụng tham số `--global` thì `package` mới sẽ được cài đặt tổng bộ và lưu ở thư mục `node_modules` trong thư mục người dùng và có thể được tham chiếu tới bởi tất cả các `project`.

Sau khi cài đặt xong thì bạn sẽ thấy trong tệp `package.json` có thêm thuộc tính `dependencies` mô tả các `package` mà `project` của chúng ta đang lệ thuộc vào để vận hành. Thư viện `marked` được ghi lại với phiên bản tối thiểu `^` là `4.0.12` để có thể chắc chắn vận hành được code mà chúng ta viết trong `project` có sử dụng đến `marked` tính từ thời điểm hiện tại.

```nodejs-blog/package.json
{
   ...
   "dependencies": {
      "marked": "^4.0.12"
   }
}
```

Bây giờ chúng ta thử `require` và sử dụng `marked` trong tệp `test.js` thôi. :D Tuy nhiên thì chúng ta cần một tệp `markdown` đặt ngay bên cạnh tệp `test.js` để thử đọc và in ra `console`.

```nodejs-blog/npm-intro.md
## NPM là cái gì?

Vẫn xuất phát từ nhu cầu chia sẻ và tái sử dụng các bộ code miễn phí của cộng đồng lập trình viên...

[**https://www.npmjs.com/**](https://www.npmjs.com/).

![](https://images.viblo.asia/677ee91c-9549-497f-ae61-3b29a7f3d313.png)
```

```nodejs-blog/test.js
const fsPromises = require('fs/promises');
const path = require('path');

var npmIntroMd = path.join(__dirname, 'npm-intro.md');
var encoding = 'utf-8';

fsPromises.readFile(npmIntroMd, encoding)
   .then(function(data) {
      var markdown = require('marked');      
      var html = markdown.parse(data);
      console.log(html);
   })
   .catch(function (error) {
      console.error(error);
   });
```

Ở đây thì chúng ta cần truyền thêm một tham số nữa cho phương thức `readFile` để kết quả `data` thu được ở dạng ký tự `utf-8`, và có thể sẵn sàng sử dụng cho công cụ biên dịch mã `markdown`. Chạy `npm test` để xem kết quả được in ra ở `console` thôi. :D

![](https://images.viblo.asia/f653e57c-b129-4473-b59d-b59152726d2d.png)

Như vậy là chúng ta đã có thể soạn thảo và lưu trữ nội dung của các bài viết blog ở dạng tệp `markdown` rồi, bởi vì đã có một phiên dịch viên tên là `marked` giúp đỡ. Bạn đã có thể suy nghĩ tới khả năng tự động hóa công việc biên dịch các tệp `bai-viet.md`, hoặc các tệp `bai-viet.json` có chứa nội dung `markdown` thành các tệp `bai-viet.html` đặt trong thư mục `nodejs-blog/static/post`. :D

## Thế còn Framework thì sao? Chúng ta đã có thể bắt đầu sử dụng Framework trên nền NodeJS chưa?

Có ngay và luôn. Chúng ta đã có thể bắt đầu học cách sử dụng một `framework` ở thời điểm hiện tại. Bởi vì như bạn thấy đấy, việc sử dụng các `module` của NodeJS cung cấp mặc định cũng rất trừu tượng. Chúng ta không cần quan tâm nhiều tới logic hoạt động của các hàm được cung cấp, mà chỉ đơn giản là làm quen với phong cách lập tài liệu hướng dẫn của NodeJS, truyền đúng tham số cần thiết để thu được kết quả xử lý với logic `input/output` đơn giản. 

Tiến trình học tập hiện tại của chúng ta đã khác rất nhiều so với thời điểm mới bắt đầu học những khái niệm lập trình đầu tiên. Chúng ta không cần phải chờ đợi cho đến khi biết hết mọi thứ về các `module` mặc định của NodeJS cung cấp rồi mới bắt đầu tìm hiểu về những công nghệ ở lớp trừu tượng cao hơn. Và thậm chí, việc học ngược lại các `module` mặc định của NodeJS khi chúng ta đang sử dụng một `framework` sẽ đem cho chúng ta nhiều cảm hứng học tập hơn. Bởi vì chúng ta sẽ học tốt hơn trong tiến trình xây dựng và hoàn thiện phần mềm mong muốn thay vì chỉ học lý thuyết bằng cách đọc hiểu từ tài liệu do NodeJS cung cấp.

Vậy, chúng ta hãy bắt đầu với một `framework` rất phổ biến của NodeJS, giúp chúng ta đơn giản hóa nhiều tác vụ xử lý như phân tích yêu cầu nhận được từ trình duyệt web, phân chia lộ trình xử lý cho các kiểu yêu cầu nhận được, v.v... Đó là [ExpressJS - https://expressjs.com/](https://expressjs.com/).  :D

[[ExpressJS] Bài 1 - Làm Quen Với ExpressJS](https://viblo.asia/p/maGK7rDO5j2)

Song song với việc khởi hành một `Sub-Series` mới về `ExpressJS`, chúng ta vẫn sẽ tiếp tục tìm hiểu những kiến thức về các `module` mặc định của NodeJS có liên quan đến những yếu tố được sử dụng khi dùng `ExpressJS`. Mình rất hy vọng là bạn sẽ tiếp tục đồng hành cùng mình trong chặng đường tự học `ExpressJS` xuất phát từ đây. :D

Hẹn gặp lại bạn trong các bài viết tiếp theo.

[[NodeJS] Bài 6 - Phân Tích URL Yêu Cầu](https://viblo.asia/p/GrLZDrWE5k0)