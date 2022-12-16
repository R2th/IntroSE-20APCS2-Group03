Chào các bạn! Nối tiếp [Circuit6](https://viblo.asia/p/express-basic-f1tours-project-circuit6-params-middleware-and-chaining-multiple-middleware-63vKjbwyK2R). Hôm nay, chúng ta tiếp tục đến với chặng 7 của "F1 Tours"! Trong phần này, mình sẽ thực hiện cách *serving static files* và *thiết lập biến môi trường* trong express.js.<br>
# 1. Serving Static Files:
Bằng cách sử dụng *middleware* sẵn có trong Express là *express.static()*, chúng ta có thể phục vụ được staic files trong Express. Ở đây, mình sẽ tạo thư mục *public* cùng cấp với *app.js* và các thư mục và file khác (như hình).

![](https://images.viblo.asia/89e28397-842d-4c51-b5c4-914a1ac68c0e.png)

Như vậy, mình muốn server phục vụ *static files* trong thư mục *public*, mình sẽ sử dụng *express.static()* trong *app.js* như sau:
```
app.js

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
```
Phần đường dẫn trong *express.static* chính là đường dẫn đến thư mục public trong source code. Toàn bộ thư mục và file chứa trong *public* đều có thể được phục vụ. Giờ mình muốn phục vụ *static files* chứa trong thư mục *data* thì tương tự như vậy, thêm một dòng code mới với *express.static(đường dẫn đến thư mục data)* là xong. Thử mở browser và kiểm tra xem kết quả sẽ như thế nào nhé.<br>
Ở hình 1 này mình muốn server phục vụ *file 404.html* mình sẽ nhập đường dẫn *http://localhost:3000/404.html*. Vì mình đã xác định đường dẫn root của static file là *public* nên trong *url* sẽ không xuất hiện *public* nữa.<br>

![](https://images.viblo.asia/7d2c9a8d-6420-4cba-bfd0-279a84f92643.png)<br>

![](https://images.viblo.asia/979ecd4c-d3f4-4d54-85b3-7b601c84fe4d.png)<br>

Xem thêm log trong server có thể thấy được ngoài việc load thành công *file 404.html*, server còn phục vụ thêm 2 files khác là *main.scss* và *main.js* tương ứng nằm trong thư mục *css và javascripts* trong public. <br>
Tương tự như vậy mình sẽ thử truy cập vào ảnh *cat1.jpg trong public/images* bằng url *http://localhost:3000/images/cat1.jpg* cho kết quả như hình sau<br>
![](https://images.viblo.asia/ab2c9a27-342c-43e0-aeb3-fa4eaca9d898.png)<br>
Tuy nhiên, trong thực tế việc phục vụ static files có thể không phải do server Express đảm nhiệm mà sẽ do một ứng dụng web server khác đảm nhiệm như nginx, ... để tăng tốc độ phục vụ. Còn ở môi trường development thì chúng có thể phục vụ static files cho mục đích phát triển sản phẩm và test được thuận tiện hơn. Bằng cách sử dụng biến môi trường, chúng ta có thể xử lý việc ghi log hoặc phục vụ static files chẳng hạn theo từng môi trường khác. Và điều đó sẽ được giới thiệu trong phần tiếp theo.
# 2. Thiết lập biến môi trường:
Việc thiết lập biến môi trường giúp cho chúng ta xử lý chức năng tùy theo mục đích sử dụng cho từng môi trường khác nhau, chẳng hạn như PORT server listen, các thông tin kết nối đến database,...<br>
Để xem biến môi trường hiện tại, mình thêm dòng log sau vào *server.js*:
```
console.log(process.env);
```
Một loạt các biến môi trường sẽ hiển thị trong phần log server. Và để set biến môi trường thì có rất nhiều cách. Trong đó cách đơn giản nhất là set biến môi trường tại thời điểm start server.
```
NODE_ENV=development HOST=localhost DATABASE=f1tour.development nodemon server.js
```

![](https://images.viblo.asia/bc9b8477-6472-490d-a0a9-7e206f28c205.png)

Xem log server có thể thấy được các biến môi trường đã được set giá trị xuất hiện trong log. Như vậy là mình đã set xong biến môi trường. Nhưng không!! Trong thực tế có thể chúng ta cần set hàng chục biến môi trường. Mà lại đi set tay như vậy thì thật là khó để quản lý, cũng như tốn thời gian.<br>
Có rất nhiều cách để có thể set biến môi trường thay vì set trực tiếp. Ở đây mình chỉ đề cập đến cách mình cũng hay dùng là sử dụng file config chứa biến môi trường. Mình tạo file *config.env* cùng cấp với *server.js* và đưa các biến môi trường đã set lúc này vào trong file này.
```
NODE_ENV=development
HOST=localhost
DATABASE=f1tour.development
PORT=3002
```
Và đến đây vẫn chưa xong. Vì chắc chắn rằng server không biết cách nào để đọc file này và lấy biến môi trường trong file để sử dụng cả. Do đó, mình sử dụng *dependency dotenv*.<br>
```
npm i dotenv
```
Chạy đoạn code trên trong terminal để cài đặt *dotenv*. Tiếp đó, trong *server.js*, thêm dòng codes sau:
```
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({path: './config.env'});

console.log(process.env);

const port = 3000;
app.listen(port, () => {
  console.log(`F1Tours running on port ${port} ...`);
});
```

![](https://images.viblo.asia/58ee8ab9-7587-4f2f-8d37-28e9c61db2a0.png)

Xem log server và chúng ta có thể thấy được các biến môi trường đã được load đầy đủ và chính xác. Tuy nhiên, mọi thứ vẫn chưa hoạt động trơn tru đâu đấy. <br>
Giờ mình sẽ load *port* từ biến môi trường thay vì sử dụng port mặc định. Trong *server.js*, mình chỉnh sửa:
```
const port = process.env.PORT || 3000;
```
Lúc này, port server listen không còn là 3000 nữa mà sẽ là 3002. Đến đây mọi thứ vẫn ổn cả thôi. Giờ mình sẽ chỉnh sửa trong *app.js* như sau:
```
console.log('==========================');
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(express.static(`${__dirname}/public`));
}
```
Giờ mình chỉ muốn khi nào ở môi trường development thì mới phục vụ *static files* mà thôi. Về mặt logic thì mọi thứ đều ổn. Nhưng khi mình request để xem ảnh *cat1.jpg* thì server lại không thể phục vụ được. Thử xem log giá trị biến môi trường.

![](https://images.viblo.asia/121f2580-16f8-438c-90f3-2ec1812e4beb.png)

WOW, kết quả trả về là *undefined*. Rõ là mình đã load được PORT trong *server.js*, đã gán biến *NODE_ENV* trong *config.env*. Giờ lại không có giá trị. Mọi việc nằm ở chỗ load file *config.env* ở scope nào?<br>
Xem lại đoạn code load file biến môi trường, có thể thấy được file được load sau khi load *Express app* và vì thế mà các biến môi trường sẽ không xuất hiện trong *scope* của *Express app*. Mình thử đưa đoạn code load lên phía trên load *Express app* xem chuyện gì sẽ xảy ra nhé.
```
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const app = require('./app');

console.log(process.env);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`F1Tours running on port ${port} ...`);
});
```
![](https://images.viblo.asia/fb40f8b7-1fe6-4ab3-bcda-14cb6bc7c44f.png)

Mình thử load lại ảnh *cat1.jpg* thì lúc này đã có thể xem được ảnh, chứng tỏ *static files* đã được phục vụ. Đồng thời xem log giá trị biến *NODEENV* trong log server đã thấy trả về giá trị *development*. Như vậy việc thay đổi là phù hợp.<br>
Để thuận tiện hơn cho việc start server trên nhiều môi trường khác nhau. Trong *package.json* mình chỉnh sửa như sau:
```
"scripts": {
    "start:dev": "nodemon server.js",
    "start:prod": "NODE_ENV=production nodemon server.js"
  }
```
2 dòng script này sẽ dùng để phân biệt đâu khi run server sẽ chạy trên môi trường nào.<br>
```
npm run start:dev

hoặc 

npm run start:prod
```
Các bạn có thể test bằng cách gọi đến một trong những static files để kiểm tra xem đã chạy trên đúng môi trường hay chưa. Và hết sức lưu ý, cần đưa vào *gitignore* các file setting biến môi trường để không bị lộ thông tin bảo mật khi push code lên github/gitlab. Nếu là file chưa biến môi trường dùng chung và public được thì có thể không cần đưa vào *gitignore*<br>
Như vậy, là mình đã thực hiện xong việc set biến môi trường. Và từ bây giờ, mình muốn thêm biến môi trường gì, mình chỉ việc chỉnh sửa file *config.env* và load lại server mà thôi.
# 3. Phần kế tiếp:
Circuit7 đến đây xin kết thúc. Mời các cùng chờ đợi phần kế tiếp nhé.<br>
*Cảm ơn các bạn đã đọc bài viết của mình.* <br>
*Bài viết không thể tránh khỏi những thiếu xót, mong nhận được sự góp ý của các bạn để bài viết được hoàn thiện hơn.* <br>
***Nguồn tham khảo***:<br>
*- Expressjs.com*<br>
*- Udemy.com* <br>
*- Và một số nguồn khác* <br>
***Link github [F1Tours](https://github.com/dtmhdev89/ExpressSample_F1Tours)***