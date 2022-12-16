# Giới thiệu: 
* Ngày nay, một trang web không được chỉ đẹp trên màn hình máy tính để bàn mà còn trên cả máy tính bảng và điện thoại thông minh. Một trang web đáp ứng nếu nó có thể responsive với màn hình của khách hàng. Trong bài viết này, tôi sẽ chỉ cho bạn cách dễ dàng tạo trang web responsive trong ba bước đơn giản.
## 1 – The layout(Bố cục)
Khi bạn làm xong trang web nhưng non-responsive, điều đầu tiên cần làm là dán các dòng sau vào các thẻ **<head>** và **</head>** trên trang html của bạn. Điều này sẽ đặt chế độ xem trên tất cả các màn hình ở tỷ lệ co 1 × 1 và loại bỏ chức năng mặc định khỏi iPhone và các trình duyệt trên điện thoại thông minh khác hiển thị trang web ở chế độ full-view và cho phép người dùng phóng to bố cục bằng cách zoom.
```html
           <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
            <meta name="HandheldFriendly" content="true">
```

Thật ra cốt lõi của Responsive layout là việc thay vì fix cứng pixel của từng khối trên giao diện thì ta sẽ thay bằng %

*Dòng này khai báo để website cho phép các thiết bị di động điều chỉnh hiển thị tốt nhất trên thiết bị.*

## **2 - Medias Query**
Vậy với layout nhiều cột mà hiển thị trên di động thì sao? Ta cần sử dụng tới media query, ví dụ để thêm 1 số thuộc tính css cho riêng mobile ta có thể làm như sau:
```css
    @media screen and (min-width: 480px) {

      .content {
        float: left;
      }

      .social_icons {
        display: none
      }

      // and so on...

    }
```
1 số kích cỡ màn hình khác thường dùng:
```
*     0 -> 740px cho điện thoại thông minh
*         @media (max-width: 740px) {}
*     741px -> 1023px cho tablet
*         @media (min-width: 741px) and (max-width: 1023px) {}
*     1024px < ....px cho những màn hình máy tính hoặc laptop (15.6)
*         @media (min-width: 1024px) {}
```

Như vậy là bạn hoàn toàn có thể control được cách hiển thị với từng loại màn hình(tương ứng với từng loại thiết bị)

## **3 - Boostrap**
```html
<!DOCTYPE html>
    <html lang="en-US">
    <head>
    <style>
    .city {
        float: left;
        margin: 5px;
        padding: 15px;
        width: 300px;
        height: 300px;
        border: 1px solid black;
    }
    </style>
    </head>
    <body>

    <h1>Framgia Demo</h1>
    <h2>Resize this responsive page!</h2>

    <div class="city">
      <h2>London</h2>
      <p>London is the capital city of England.</p>
      <p>It is the most populous city in the United Kingdom, with a metropolitan area of over 13 million inhabitants.</p>
    </div>

    <div class="city">
      <h2>Paris</h2>
      <p>Paris is the capital and most populous city of France.</p>
    </div>

    <div class="city">
      <h2>Tokyo</h2>
      <p>Tokyo is the capital of Japan, the center of the Greater Tokyo Area, and the most populous metropolitan area in the world.</p>
    </div>

    </body>
    </html>
```
Nhưng có lẽ sẽ tốt hơn nếu bạn dùng Bootstrap, CSS framework này hiện nay đang được sử dụng nhiều nhất trên thế giới, nó giúp bạn làm website có thể hiển thị cực đẹp trên tất cả các thiết bị, ví dụ đơn giản như sau:
```html
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
    </head>
    <body>

    <div class="container">

    <div class="jumbotron">
      <h1>Framgia Demo</h1>
      <p>Resize this responsive page!</p>
    </div>

    <div class="row">
      <div class="col-md-4">
        <h2>London</h2>
        <p>London is the capital city of England.</p>
        <p>It is the most populous city in the United Kingdom,
        with a metropolitan area of over 13 million inhabitants.</p>
      </div>
      <div class="col-md-4">
        <h2>Paris</h2>
        <p>Paris is the capital and most populous city of France.</p>
      </div>
      <div class="col-md-4">
        <h2>Tokyo</h2>
        <p>Tokyo is the capital of Japan, the center of the Greater Tokyo Area,
        and the most populous metropolitan area in the world.</p>
      </div>
    </div>

    </div>

    </body>
    </html>
```
## **Kết luận**
Trên đây là 1 số khái niệm ban đầu để bạn hiểu về responsive design, để tiếp tục bạn nên tìm hiểu sâu hơn về Bootstrap cũng như Media Query, chúc bạn thành công.