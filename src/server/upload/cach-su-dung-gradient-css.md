# I. Giới thiệu
Trong bài viết hôm nay mình sẽ giới thiệu đến bạn CSS gradient là gì và cách áp dụng chúng vào thiết kế và phát triển cho trang web.
# II. Gradient Là Gì?
Gradient là một phần tử CSS với kiểu dữ liệu hình ảnh, nó được tạo ra bởi sự kết hợp hai hay nhiều màu xác định với hai loại chính là linear và radial.
Do là kiểu hình ảnh nên bạn có thể sử dụng các thuộc tính dành cho hình ảnh trong CSS như là background-image, border-image... cho phần tử của website.
# III. Cách dùng
## 1. Linear Gradient
Cú pháp của linear gradient 
```php
 background: linear-gradient(hướng, màu thứ nhất, màu thứ hai, ...);
 ```
 Và để hiểu rõ chúng ta hãy đi vào ví dụ sau nhé:
 
 HTML:
 ```php
 <div class="noi-dung">Từ Trái Sang Phải</div><div class="noi-dung">Từ Trái Sang Phải</div>
 ```
 CSS:
 ```php
 body {
   text-align: center;
 }
.noi-dung {
   background: linear-gradient(to right, #7A7FBA, #11C37C);
   color: white;
   padding: 6rem 1rem;
   margin: 4rem;
   font-size: 50px;
 }
 ```
 Và kết quả
 ![](https://images.viblo.asia/61c7bdd6-653b-499c-8f4e-19c066560043.png)

## 2. Radial Gradient
Cú pháp về radial gradient nhé:
 ```php
 background: radial-gradient(hình dạng at vị trí, màu bắt đầu, ..., màu kết thúc);
 ```
 Và để hiểu rõ hơn thì bạn xem ví dụ cách sử dụng nó trong thực tế nhé:
 
 HTML:
 ```php
 <div class="noi-dung">Hình dạng hình tròn và vị trí nằm ở chính giữa</div>
 ```
 CSS:
 ```php
 body {
   text-align: center;
 }
.noi-dung {
  background: radial-gradient(circle at center, #F4DD90, #0C1C5F);
   color: white;
   padding: 6rem 1rem;
   margin: 4rem;
   font-size: 50px;
 }
 ```
 Kết quả
 ![](https://images.viblo.asia/215399c4-35cb-43d6-85b2-ef10d7f40d22.png)

## 3. Tạo Border cho phần tử
Bây giờ chúng ta sẽ đi vào tìm hiểu cách tạo đường viền cho phần tử bằng cách sử dụng gradient trong CSS nhé!

HTML:
```php
<div class="noi_dung border-gradient">Tạo Đường Viền Gradient</div>
```
CSS:
```php
.noi_dung {
   width: 400px;
   height: 200px;
   max-width: 100%;
   margin: 1rem auto;
   display: flex;
   align-items: center;
   justify-content: center;
   font-size: 2rem;
 }
.border-gradient {
   border: 10px solid;
   border-image-source: linear-gradient(45deg, #1b2a49, #bada55);
   border-image-slice: 1;
 }
 ```
 Kết quả border gradient bạn xem bên dưới nhé:
 ![](https://images.viblo.asia/6f11d70e-119a-4449-853d-77aebe2e55fa.png)

##  4. Tạo Text Gradient
 Trong phần này chúng ta sẽ đi vào tạo text-gradient bằng đoạn mã sau đây 
 
 HTML:
 ```php
 <div class="text-gradient">Niềm Vui Lập Trình</div>
 ```
 
 CSS:
 ```php
 .text-gradient {
   text-align: center;
   font-size: 100px;
   background: linear-gradient(to right, #bada55 0%, #1b2a49 100%);
   -webkit-background-clip: text;
   -moz-background-clip: text;
   background-clip: text;
   -webkit-text-fill-color:transparent;
 }
 ```
 Đây là kết quả
 ![](https://images.viblo.asia/ed3e25cd-7a0f-4b36-af9c-e335f1f02596.png)

##  5. Tạo Bullet Gradient Cho Danh Sách
 Trong phần này chúng ta sẽ đi vào tạo bullet gradient cho List thông qua đoạn mã sau đây
 
 HTML:
 ```php
 <ul>
   <li>Phần Tử 1</li>
   <li>Phần Tử 2</li>
   <li>Phần Tử 3</li>
 </ul>
 ```
 CSS:
 ```php
 ul {
   display: block;
   margin-left: -10px;
 }
 ul li {
   display: block;
   position: relative;
   font-size: 50px;
 }
ul li:before {
   content: "";
   position: absolute;
   top: 1.2em;
   left: -30px;
   margin-top: -0.9em;
   background:linear-gradient(to right, #8360c3, #2ebf91);
   height: 25px;
   width: 25px;
   border-radius: 50%;
 }
 ```
 Và kết quả
 ![](https://images.viblo.asia/f1ec45ce-bc66-4b5e-a7d0-b66c2c2b1630.png)

##  6. Kết Hợp Gradient Với Hình Ảnh
 Trong phần tiếp theo này chúng ta sẽ đi vào kết hợp giữa gradient với phần tử hình ảnh
 
 HTML:
 ```php
 <div class="noi-dung">Niềm Vui Lập Trình</div>
 ```
 CSS:
 ```php
 body {
   background: #f2f2f2;
   text-align: center;
   font-size: 50px;
 }
.noi-dung {
     background-image:linear-gradient(to bottom, rgb(0, 159, 255, 0.5), rgb(236, 47, 75, 0.8)),
     url('https://niemvuilaptrinh.ams3.cdn.digitaloceanspaces.com/pexels-paul-ijsendoorn-33041.jpg');
     width: 100%;
     height: 400px;
     background-size: cover;
     color: white;
     padding: 20px;
 }
 ```
 Và kết quả 
 ![](https://images.viblo.asia/84bc9939-2833-4348-98d5-0f8e8368ff0d.png)

##  7. Cách Tạo Gradient Button
 Phần cuối cùng này chúng ta sẽ đi vào tạo gradient button cho trang web
 
 HTML:
 ```php
 <button class="btn">Niềm Vui Lập Trình</button>
 ```
 CSS:
 ```php
 .btn {background-image: linear-gradient(to right, #B3FFAB 0%, #12FFF7 51%, #B3FFAB 100%)}
 .btn {
 margin: 10px;
 padding: 15px 45px;
 text-align: center;
 text-transform: uppercase;
 transition: 0.5s;
 background-size: 200% auto;
 color: white;
 box-shadow: 0 0 20px #eee;
 border-radius: 10px;
 display: block;
 border: none;
  cursor: pointer;
 }
.btn:hover {
 background-position: right center;
 color: #fff;
 text-decoratio
 }
 ```
 Và kết quả bạn xem bên dưới 
 ![](https://images.viblo.asia/5c8bef8a-bc44-40d8-9ef0-94bc7daec04a.png)

#  IV. Tổng kết
 Qua đây mình mong bài viết sẽ cung cấp thêm cho bạn những kiến thức để tạo gradient CSS hữu ích dành cho việc phát triển, thiết kế web. Chúc bạn có một ngày vui vẻ!
 link tham khảo: https://www.niemvuilaptrinh.com/