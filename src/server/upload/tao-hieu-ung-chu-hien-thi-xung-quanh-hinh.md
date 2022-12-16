# I. Giới thiệu
Với CSS HTML và JavaScript bạn có thể tạo ra các hiệu ứng rất đẹp và thú vị đặc biệt ngay cả khi chỉ có mình CSS và HTML, CSS hỗ trợ rất nhiều trong việc thiết kế giao diện.
Từ các hình ảnh động cuộn đơn giản đến các background phức tạp được xây dựng hoàn toàn bằng CSS, những hiệu ứng này có thể làm trang web của bạn trở nên lung linh và sáng tạo hơn. Hôm nay mình sẽ giới thiệu đến các bạn làm sao để chữ bao quanh hình ảnh bằng các thuộc tính HTML và CSS.
# II. Demo
Việc đầu tiên là mình sẽ tạo file có cấu trúc thư mục như sau:

![](https://images.viblo.asia/ae84424a-f3a3-4dc9-87c9-9558cf751333.png)

Tiếp đến tải file hình ảnh mà mình dùng trong bài này theo đường dẫn phía dưới nha hoặc các bạn cũng có thể sử dụng hình ảnh mà mình yêu thích:
[Tại đây](https://res.cloudinary.com/dn4nxz7f0/image/upload/v1580998574/chu_xung_quanh_hinh/hinh_anh_tym4pb.jpg)

Sau đó tạo các bạn tạo cấu trúc file HTML cơ bản cho trang_chinh.html sau đó liên kết với file style.css và font Roboto của Google Font. Để hiểu rõ hơn các bạn xem đoạn code dưới đây nhé:
```php
<!DOCTYPE html>
 <html lang="en">
<head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta http-equiv="X-UA-Compatible" content="ie=edge">
     <title>Chữ bao quanh hình ảnh</title>
     <link rel="stylesheet" href="style.css">
     <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
 </head>
 <body>
 </body>
 </html>
 ```
 Bây giờ thì chúng ta cần chèn những thẻ HTML để hiển thị nội dung cơ bản rồi sau đó mình mới dùng CSS để thay đổi làm cho nó sinh động hơn:
 ```php
 <div class="noi_dung">
         <div class="hinh_anh"></div>
         <h2>Chữ xung quanh hình ảnh</h2>
         <p>Lorem ipsum dolor sit amet consectetur adipisicing
 elit. Dolores quia vitae incidunt necessitatibus, sapiente
             voluptate. Nam eos accusantium ea aspernatur ex
 recusandae obcaecati iste odit maxime, necessitatibus fuga
             harum consequatur. Lorem ipsum dolor sit amet
 consectetur adipisicing elit. Tempore in minus libero corporis
             incidunt, quaerat eum dignissimos impedit sunt
 voluptates, aut molestias vitae praesentium dolores? Alias,
             quis! Ex, ipsa doloribus.</p>
 </div>
 ```
 ![](https://images.viblo.asia/98b72d8e-b851-4874-9f96-a315f7d2f97a.png)
 
 Bây giờ mình sẽ điều chỉnh CSS trong style.css thay đổi background cũng như font chữ cho body. Các bạn theo dõi đoạn code ở dưới để nắm rõ hơn nhé:
 ```php
 body{
     margin:0;
     padding: 0;
     height: 100vw;
     font-family: 'Roboto', sans-serif;
     background: #70e1f5;  
     background: -webkit-linear-gradient(to right, #ffd194, #70e1f5);  /
     background: linear-gradient(to right, #ffd194, #70e1f5); /
     background-size: cover;
 }
 ```
 Kết quả của đạn code trên các bạn xem ở đây nhé:
 
 ![](https://images.viblo.asia/dc94f491-df54-42f3-819a-19a76b93cdf5.png)

Như các bạn thấy thì bây giờ vấn đề là mình cần đưa cái div class "noi_dung"  này ra giữa màn hình và tạo đường viền, background cũng như thiết lập độ dài cho nó. Để hiểu rõ các bạn cùng xem đoạn code dưới đây nhé:
    
```php
.noi_dung{
     position:absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
     width: 600px;
     padding: 30px;
     background: #ffffff;
     box-sizing: border-box;
     border-radius:10px;
     box-shadow: 0 15px 50px rgba(0,0,0 0.2)
 }
 ```
 Các bạn chú ý giúp mình cách đưa nội dung ra giữa màn hình bằng cách kết hợp 4 thuộc tính ở đoạn code trên là position:absolute; và top:50%; và left: 50%; và transform: translate(-50%, -50%);. Bây giờ các bạn xem kết quả khi mình chèn xong đoạn code trên nhé:

![](https://images.viblo.asia/434c709a-86bf-4fef-9bd6-92badc416272.png)

Cũng khá ổn rồi nhỉ bây giờ chúng ta vô vấn đề chính là mình sẽ thiết lập background cho div class hinh_anh bằng CSS.
Các bạn theo dõi đoạn code ở dưới để nắm rõ hơn nhé:

```php
 ​.hinh_anh{
         width: 200px;
         height: 200px;
         background:  url(hinh_anh.jpg);
         border-radius:  50%;
 }
 ```
    
Do chúng ta đã thiết lập div class hinh_anh là hình vuông với 2 thuộc tính là width:200px và height:200px thì khi đó ta muốn chuyển hình vuông sang hình tròn chỉ đơn giản là cần thêm thuộc tính là border-radius:50%. Để nằm rõ hơn các bạn xem kết quả sau khi chèn đoạn code trên:
    
![](https://images.viblo.asia/c9dee94b-e14a-4c2c-ab33-8cca9bf8cefd.png)
    
Bây giờ là chúng ta cần chữ bọc xung quanh hình thì ở đây mình sẽ sử dụng hai thuộc tính gắn vào <div class="hinh_anh"> là float:left giúp cho div chứa hình ảnh nằm bên trái so với chữ và shape-outside: circle(); giúp nội dung bao quanh hình sẽ theo hình cong. Để nắm rõ các bạn xem đoạn code dưới đây nhé:
    
```php
 .hinh_anh{
     width:200px;
     height: 200px;
     background: url(hinh_anh.jpg);
     border-radius: 50%;
     float: left;
     shape-outside: circle();
     margin:20px 20px 20px 0px;
 }
```
Và dưới đây là kết quả của đoạn code trên :

![](https://images.viblo.asia/7b030887-6120-45c7-a37b-2a68e9d27a49.png)

    Để thêm nội dung và tiêu đề đẹp hơn thì các bạn thêm đoạn code ở dưới đây vào nhé:
    
```php
 p{
     padding:0;
     margin:0;
     text-align: justify;
     line-height: 22px;
 }
h2{
     margin: 0 0 20px;
     padding:0;
     font-size: 30px;
 }
 ```
 
    Và đây là kết quả cuối cùng của bài hôm nay mà các bạn đã làm được:

![](https://images.viblo.asia/2f771923-7dfc-456e-811d-eacb6bfb246f.png)
# III. Tổng kết
    
    Như vậy mình đã giới thiệu xong phần tạo  chữ hiển thị xung quanh hình bằng css, cách làm khá đơn giản nhưng có thể giúp trang web trở nên đẹp hơn.
    
link: https://www.niemvuilaptrinh.com/article/Tao-hieu-ung-chu-hien-thi-xung-quanh-hinh