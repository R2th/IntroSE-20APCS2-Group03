![](https://images.viblo.asia/00ea1f44-6099-4fb2-a12b-583ab68eb72d.png)
# Bắt Đầu
Tiếp tục với series về `Nodejs` cơ bản ở bài trước mình đã hướng dẫn các bạn cài một số `Package` cần thiết để bắt đầu làm dự án với  `Nodejs`, thì ở bài viết này mình sẽ giới thiệu về `Template engines` nhé các bạn. 
# Template engines
`Template engines` là công cụ giúp chúng ta tạo ra các HTML template bằng những đoạn mã được tối giản. Ngoài ra nó có thể đưa dữ liệu vào HTML template ở phía máy khách và tạo ra các đoạn mã HTML. Trong `Nodejs` hiện có rất nhiều `Template engines`, các bạn có thể tham khảo tại [đây](https://expressjs.com/en/resources/template-engines.html). Trong phạm vi bài viết này mình xin giới thiệu `Template engines` `Pug` 
![](https://images.viblo.asia/76d66feb-ceab-48f4-86d7-12119f1fd96a.png)

VÌ mình thấy mọi người dùng `Pug` khá nhiều, cú pháp thì gọn gàng và đặc biệt là rất dễ học, Tin mình đi, để mình giới thiệu nó qua một ví dụ là các bạn sẽ hiểu ngay :D
```php
                <!DOCTYPE html>
                <html lang="en">

                <head>
                  <title>Template Pub</title>
                </head>

                <body>
                  <h1>node template engine</h1>
                  <div class="col" id="container">
                    <p>hello</p>
                  </div>
                </body>
                
                </html
```
Đây là một đoạn `html` bình thường, Còn dưới đây là file.pub của đoạn `html` ở trên 
```php
doctype html
    html(lang='en')
      head
        title Template Pub
      body
        h1 node template engine
        #container.col
          p hello

```
Có thể thấy được các thẻ đã không cần dấu `<` và `>` nữa, cũng không cần thẻ đóng, các thẻ cùng cấp sẽ thụt lề bằng nhau còn các thẻ con thì sẽ thụt vào một cấp so với thẻ cha.`Class` và `id` thì lại tương tự như trong viết `css`. Có một lưu ý nhỏ là nếu mới bắt đầu chưa quen dùng `pug` thì bạn có thể vào trang  [này](https://html2jade.org/) để có thể  `Convert HTML to Pug`. OMG nãy giờ quên mất chưa nói đến cách cài `Pug` để cài `Pug` bạn chỉ cần mở terminal lên và gõ 
```php
 yarn add pug --save
```
các bạn vào file `package.json` phần `dependencies` thấy có `pug` là đã cài thành công rồi nhé.
Tiếp theo chúng ta sẽ tạo một file để chứa đoạn mã `pug` trên. mình sẽ tạo 1 file là `index.pug` nằm trong folder `views`. Cấu trúc thư mục sẽ như thế này 

![](https://images.viblo.asia/12cad930-62c5-4939-9309-e83cbffb75ef.png)

Tiếp theo ở file index.js mình sẽ thêm 
```php
app.set('view engine', 'pug');
app.set('views', './views');
```
Cái đầu tiên là để khai báo đường dẫn đến thư mục chứa `teamplate`, cái thứ 2 là để khai báo `teamplate engines` mà mình sử dụng, ở đây là `pug` :D. Tiếp theo là sửa lại 
```php
app.get('/', function(req, res){
    res.send("Hello World");
})
``` 
mà mình đã viết từ bài trước thành 
```php
app.get('/', function(req, res){
	res.render('index');
})
``` 
Mục đích là để  render file index.pug trong thư mục views thành file HTML. Bây giờ hãy mở trình duyệt ra và xem thử nhé :D .
Và nếu các bạn có ý định chỉ sử dụng `Nodejs` để viết api còn `client` lại dùng thư viện js khác thì cũng không cần quan tâm phần này lắm :D.

# Kết luận
Vậy là mình đã giới thiệu đến các bạn `Template engines`  trong Nodejs. Ở bài tiếp theo mình sẽ giới thiệu về `Query Parameters` và cùng làm thử chức năng tìm kiếm xem sao :D. Bài viết của mình đến đây là hết rồi. Cảm ơn các bạn đã theo dõi nếu có thắc mắc hay góp ý gì cho bài viết thì hãy cmt xuống bên dưới để mình được biết nhé. Cảm ơn các bạn