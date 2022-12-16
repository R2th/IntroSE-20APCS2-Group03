![image.png](https://images.viblo.asia/cc4c4c2e-85d7-4081-a089-ee744e4c4822.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😉.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😊.

Using Template Engines with Express
------------

**Template engine** cho phép bạn sử dụng các tệp Template tĩnh trong ứng dụng của mình. Trong lúc ứng dụng chạy, **Template engine** thay thế các biến trong tệp `Template ` bằng các `value` thực tế và chuyển Template thành tệp `HTML` được gửi đến `Client`. Cách tiếp cận này giúp thiết kế một trang `HTML` dễ dàng hơn.

Một số **Template engine** phổ biến hoạt động với `Express` là [Pug](https://pugjs.org/api/getting-started.html), [Mustache](https://www.npmjs.com/package/mustache) và [EJS](https://www.npmjs.com/package/ejs).  [Express application generator](https://expressjs.com/en/starter/generator.html) sử dụng [Jade](https://www.npmjs.com/package/jade) làm mặc định, nhưng nó cũng hỗ trợ một số ứng dụng khác.

Xem [Template Engines list (Express wiki)](https://github.com/expressjs/express/wiki#template-engines) để biết danh sách các **Template engine** mà bạn có thể sử dụng với `Express`. Xem thêm [So sánh các Template Engines JavaScript: Jade, Mustache, Dust và hơn thế nữa...](https://strongloop.com/strongblog/compare-javascript-templates-jade-mustache-dust/).

> **Lưu ý** : Jade đã được đổi tên thành [Pug](https://www.npmjs.com/package/pug). Bạn có thể tiếp tục sử dụng Jade trong ứng dụng của mình và nó sẽ hoạt động tốt. Tuy nhiên, nếu bạn muốn có bản cập nhật mới nhất cho **Template engine**, bạn phải thay thế Jade bằng Pug.

Để hiển thị tệp Template, hãy đặt các [Application Setting Properties](https://expressjs.com/en/4x/api.html#app.set) sau, đặt trong ứng dụng mặc định `app.js` được tạo bởi trình tạo:

*   `views`, thư mục chứa các tệp Template. Vd: `app.set('views', './views')`. Điều này mặc định là thư mục `views` trong thư mục gốc của ứng dụng.
*   `view engine`, **Template engine** để sử dụng. Ví dụ: `app.set('view engine', 'pug')` để sử dụng **Template engine** Pug.

Sau đó cài đặt gói npm **Template engine** tương ứng; ví dụ để cài đặt Pug:

```console
$ npm install pug --save
```
    
> Các **Template engine** tuân thủ nhanh như `Jade` và `Pug` xuất một hàm được đặt tên `__express(filePath, options, callback)`, hàm này được gọi bằng hàm `res.render()` để hiển thị **Template**.
> 
> Một số **Template engine** không tuân theo quy ước này. Thư viện [Consolidate.js](https://www.npmjs.org/package/consolidate) tuân theo quy ước này bằng cách **mapping** tất cả các **Template engine** Node.js phổ biến và do đó hoạt động liền mạch trong Express.

Sau khi công cụ `view engine` được đặt, bạn không phải chỉ định công cụ hoặc load mô-đun **Template engine** trong ứng dụng của mình; `Express` load nội bộ mô-đun, như được hiển thị bên dưới (cho ví dụ trên).

```javascript
app.set('view engine', 'pug')
```
    

Tạo tệp **Template Pug** có tên `index.pug` trong thư mục `views`, với nội dung sau:

```javascript
html
  head
    title= title
  body
    h1= message
```
    

Sau đó, tạo một `Route` để hiển thị tệp `index.pug`. Nếu thuộc tính `view engine` không được đặt, bạn phải chỉ định phần mở rộng của tệp `view`. Nếu không, bạn có thể bỏ qua nó.

```javascript
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})
```
    
Khi bạn **request** tới `'/'`, tệp `index.pug` sẽ được hiển thị dưới dạng `HTML`.

Lưu ý: Bộ đệm ẩn của **view engine** không lưu vào bộ đệm nội dung của `output` của **Template**, chỉ bản thân **Template** bên dưới. Chế độ xem vẫn được hiển thị lại với mọi **request** ngay cả khi bộ nhớ **cache** được bật.

Để tìm hiểu thêm về cách **Template engine** hoạt động trong **Express**, hãy xem: [“Developing template engines for Express”](https://expressjs.com/en/advanced/developing-template-engines.html).

Roundup
------
Như mọi khi, mình hy vọng bạn thích bài viết này và học thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

Ref
-----
* https://tuan200tokyo.blogspot.com/2022/11/blog33-su-dung-template-engines-trong.html