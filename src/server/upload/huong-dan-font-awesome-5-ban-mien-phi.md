![Hướng dẫn sử dụng Font Awesome 5 bản miễn phí](https://images.viblo.asia/0fe8eed4-dc09-4f8f-9f56-94e5c41260bf.png)

[Font Awesome 5](https://fontawesome.com/v5/docs/web/) là một trong những icon font phổ biến nhất hiện nay, tại thời điểm viết bài 28/10/2020 với phiên bản 5.15.1 hỗ trợ trên 1600 icon miễn phí, rất dễ dàng để tích hợp vào website, công việc của bạn bây giờ là lựa chọn icon và copy paste. Font Awesome có bản miễn phí và bản trả phí, tuy nhiên bạn chỉ cần dùng bản miễn phí là đủ để làm đẹp cho website của mình. 


## 01. Demo

* Link thư viện: https://fontawesome.com/v5/search
* Danh sách icon bản miễn phí: https://fontawesome.com/v5/search?m=free


## 02. Cài đặt

Cách 1: Sử dụng link **CDN**
```
https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css
```
Cách 2: Tải thư viện về hoặc một vài cách tải khác qua npm - yarn ...


## 03. Thêm thư viện vào trang web
Đối với link CDN
```html:html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
```

Đối với thư viện tải về, ta giải nén và link tới file all.min.css 


Mẫu HTML cơ bản
```html:html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Hướng dẫn sử dụng Fontawesome 5 | kentrung</title>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
</head>
<body>
	<!-- your html -->
</body>
</html>
```







## 04. Cách tìm icon và sử dụng
Các bạn lên trang web của họ có liệt kê toàn bộ icon, tìm tên icon bằng tiếng anh, ở đây mình tìm các icon của **user** 
```
https://fontawesome.com/v5/search?q=user&m=free
```


![Cách tìm icon fontawesome 5](https://images.viblo.asia/539bc81a-98cc-467a-b22f-497f177b4723.png)


-----



Click chọn icon bạn thấy thích, ở đây mình chọn icon **user-tag**, để sử dụng bạn chỉ cần copy đoạn code vào trang web là xong.

-----
![Cách tìm icon fontawesome 5](https://images.viblo.asia/f4106875-c883-401c-b1ff-b3f9cbc361c4.png)

-----

1. Tên icon
2. Kiểu icon và prefix
3. Mã unicode
4. Mã html
5. Tag loại nhóm 
6. Phiên bản hỗ trợ
7. Nếu là: `Start Using This Pro Icon` thì là bản PRO trả phí mới dùng được



## 05. Color Icons
Thay đổi màu sắc của icon 

```html:html
<i class="fas fa-clock" style="color: red;"></i>
<i class="fas fa-clock" style="color: blue;"></i>
<i class="fas fa-clock" style="color: green;"></i>
<i class="fas fa-clock" style="color: pink;"></i>
<i class="fas fa-clock" style="color: #000;"></i>
```

**Kết quả:**

![color icons fontawesome 5](https://images.viblo.asia/84e78b1d-8d73-4e00-972b-45f66908036c.jpg)


## 06. Sizing Icons
Sử dụng các class `fa-xs` `fa-sm` `fa-lg` `fa-2x` `fa-3x` `fa-4x` `fa-5x` `fa-6x` `fa-7x` `fa-8x` `fa-9x` `fa-10x` để điều chỉnh kích thước icon
```html:html
<i class="fas fa-clock fa-xs"></i>
<i class="fas fa-clock fa-sm"></i>
<i class="fas fa-clock fa-lg"></i>
<i class="fas fa-clock fa-2x"></i>
<i class="fas fa-clock fa-5x"></i>
<i class="fas fa-clock fa-10x"></i>
```
**Kết quả:**

![sizing icons fontawesome 5](https://images.viblo.asia/9c8ebcb7-4f35-4c11-9340-c6b8c0057e9a.jpg)

## 07. Icon in a List

Sử dụng class `fa-ul` và `fa-li` để thay thế style mặc định của ul
```html:html
<ul class="fa-ul">
  <li>
    <span class="fa-li"><i class="fas fa-check-square"></i></span>List Item
  </li>
  <li>
    <span class="fa-li"><i class="fas fa-spinner fa-pulse"></i></span>List Item
  </li>
  <li>
    <span class="fa-li"><i class="fas fa-square"></i></span>List Item
  </li>
</ul>
```
**Kết quả:**

![icon in a list fontawesome 5](https://images.viblo.asia/fd2aaf5d-a9a9-44ab-8bd5-9352b69fa061.gif)


## 08. Animating Icons

* Sử dụng class `fa-spin` để xoay tròn icon liên tục.
* Sử dụng class `fa-pulse` để xoay tròn icon với 8 bước di chuyển.

```html:html
<i class="fas fa-spinner fa-spin"></i>
<i class="fas fa-circle-notch fa-spin"></i>
<i class="fas fa-sync-alt fa-spin"></i>
<i class="fas fa-cog fa-spin"></i>
<i class="fas fa-cog fa-pulse"></i>
<i class="fas fa-spinner fa-pulse"></i>
```
**Kết quả:**

![animating icons fontawesome 5](https://images.viblo.asia/444aff2d-2fd4-4456-b8fc-a57cb4761177.gif)



## 09. Rotating and Flipping Icons

Sử dụng class `fa-rotate-*` và `fa-flip-*` để xoay và lật icon.
```html:html
<i class="fas fa-horse"></i>
<i class="fas fa-horse fa-rotate-90"></i>
<i class="fas fa-horse fa-rotate-180"></i>
<i class="fas fa-horse fa-rotate-270"></i>
<i class="fas fa-horse fa-flip-horizontal"></i>
<i class="fas fa-horse fa-flip-vertical"></i>
```
**Kết quả:**

![rotating and fliping icons fontawesome 5](https://images.viblo.asia/a2060f15-a730-49d0-8df5-4398770ad449.jpg)

## 10. Stacking Icons

Để ghép hai icon ta sử dụng class `fa-stack` trên lớp bao ngoài, class `fa-stack-1x` cho icon có kích thước nhỏ và `fa-stack-2x` cho icon lớn hơn, class `fa-inverse` được sử dụng để đổi sang màu đối ngược.
```html:html
<span class="fa-stack fa-lg">
  <i class="fas fa-circle fa-stack-2x"></i>
  <i class="fab fa-twitter fa-stack-1x fa-inverse"></i>
</span>
<br>
<span class="fa-stack fa-lg">
  <i class="far fa-circle fa-stack-2x"></i>
  <i class="fab fa-twitter fa-stack-1x"></i>
</span>
<br>
<span class="fa-stack fa-lg">
  <i class="fas fa-camera fa-stack-1x"></i>
  <i class="fas fa-ban fa-stack-2x text-danger" style="color:red;"></i>
</span>
```
**Kết quả:**

![stacking icons fontawesome 5](https://images.viblo.asia/51fc8704-41e2-43d1-9d8b-a5e9e6cf7239.jpg)


## 11. Fixed-Width Icons

Các icon có độ rộng khác nhau nên ta sử dụng class `fa-fw` để đặt icon có độ rộng cố định.
```html:html
<p>Fixed Width:</p>
<div><i class="fas fa-arrows-alt-v fa-fw"></i> Icon 1</div>
<div><i class="fas fa-band-aid fa-fw"></i> Icon 2</div>
<div><i class="fab fa-bluetooth-b fa-fw"></i> Icon 3</div>

<p>Without Fixed Width:</p>
<div><i class="fas fa-arrows-alt-v"></i> Icon 1</div>
<div><i class="fas fa-band-aid"></i> Icon 2</div>
<div><i class="fab fa-bluetooth-b"></i> Icon 3</div>
```
**Kết quả:**

![fixed width icons fontawesome 5](https://images.viblo.asia/2344ea1a-a656-473d-aade-011b79a192e9.jpg)


## 12. Bordered + Pulled Icons

Class `fa-border`, `fa-pull-right` hoặc `fa-pull-left` cho dấu ngoặc kép hoặc icon bài viết.
```html:html
<i class="fas fa-quote-left fa-3x fa-pull-left fa-border"></i>
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
```
**Kết quả:**

![bordered pulled icons fontawesome 5](https://images.viblo.asia/20e7dab2-ac9e-4afe-ae41-60ee95a5e784.jpg)

## 13. [Advanced] CSS Pseudo-elements

Với một vài dự án đôi khi chúng ta không thể thêm icon trực tiếp vào HTML được nhưng không sao vẫn có cách thêm bằng CSS. CSS có một tính năng mạnh mẽ được gọi là [Pseudo-element](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements). Font Awesome đã tận dụng yếu tố pseudo-element `:: before` để thêm các icon vào trong trang web.

Các bước thực hiện
* Thiết lập css chung cho tất cả icon
* Xác định **font-family** tương ứng cho mỗi kiểu, Font Awesome có 5 kiểu trong đó 2 kiểu free là Solid và Brands còn 3 kiểu pro (trả phí) là Regular, Light và Duotone. Xem bảng bên dưới để tìm giá trị.
* Xác định **font-weight** tương ứng cho mỗi kiểu, xem bảng bên dưới để tìm giá trị.
* Xác định **Unicode** tương ứng cho icon bạn muốn, xem bảng [cheatsheet](https://fontawesome.com/cheatsheet) để tìm giá trị.


| Style | Availability | font-weight | font-family
| - | - | - | - 
| Solid | Free Plan | 900 | `Font Awesome 5 Free` or `Font Awesome 5 Pro` (for pro users)
| Brands | Free Plan | 400 | `Font Awesome 5 Brands`
| Regular | Pro Plan Required | 400 | `Font Awesome 5 Pro`
| Light | Pro Plan Required | 300 | `Font Awesome 5 Pro`
| Duotone | Pro Plan Required | 900 | `Font Awesome 5 Duotone`

**Ví dụ**
```html:html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" />
  <style>
    /* CSS pseudo-element styling */
    /* general reset/setup styling for icons - needed on all */
    .icon::before {
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
      display: inline-block; 
      font-style: normal;
      font-variant: normal;
      text-rendering: auto;
      line-height: 1;
    }

    /* defining the right font-family/font-face for each style */
    .icon-solid::before {font-family: "Font Awesome 5 Free";}
    .icon-brand::before {font-family: "Font Awesome 5 Brands";}

    /* defining the right weight for each style */
    .icon-solid::before {font-weight: 900;}
    .icon-brand::before {font-weight: 400;}

    /* defining the right unicode values for each icon */
    .icon-microphone::before {content: "\f130";}
    .icon-aws::before {content: "\f375";}

     /*Custom CSS*/
    h1, h2 {text-align: center;}
    h1 span {margin: 0 20px;}
    h1 span:before {margin-right: 1rem; color: red;}
    .rating-outer {position: relative; color: red; display: inline-block;}
    .rating-inner {position: absolute; top: 0; left: 0; overflow: hidden;}
    .rating-outer::before,
    .rating-inner::before {
      font-family: "Font Awesome 5 Free"; 
      font-weight: 400; 
      content: "\f005 \f005 \f005 \f005 \f005";
    }
    .rating-inner::before {
      font-weight: 900;
    }
  }
  </style>
</head>
<body>
  <h1>
    <span class="icon icon-solid icon-microphone">Microphone</span>
    <span class="icon icon-brand icon-aws">Amazon</span>
  </h1>
  <h2>
    <span class="icon rating-outer">
      <span class="icon rating-inner" style="width: 50%"></span>
    </span>
    (69 reviews)
  </h2>
</body>
</html>
```
**Kết quả**

![pseudo element fontawesome 5](https://images.viblo.asia/bd07f8e2-3ebb-48c6-947c-65f684cf9059.png)


## 14. [Advanced] Tối ưu Font Awesome với IcoMoon

[Font Awesome 5](https://fontawesome.com/) hỗ trợ trên 1600 icon miễn phí, tuy nhiên nếu bạn chỉ muốn sử dụng khoảng 10 đến 20 icon trong đó... thì bạn vẫn phải tải toàn bộ style của Font Awesome, điều này quả thật là chưa tối ưu. Một câu hỏi đặt ra là làm sao mình vẫn sử dụng được Font Awesome mà chỉ cần tải về style của những icon mình dùng? Sau khi tìm hiểu một số phương pháp thì mình thấy cách tối ưu Font Awesome với IcoMoon là đơn giản và hiệu quả nhất.

Đã có một vài bài viết hướng dẫn cách tối ưu nên mình không viết lại, các bạn tham khảo tại: 
* http://completejavascript.com/toi-uu-font-awesome-voi-icomoon
* https://viblo.asia/p/tao-icon-font-voi-icomoon-WAyK8e1eZxX

-----


* Bài viết đến đây là hết, hi vọng với bài viết này các bạn đã thêm được nhiều kiến thức bổ ích. Hẹn gặp lại các bạn ở bài viết tiếp theo.
* Tham khảo thêm các chức năng cực kì ó sầm (awesome) nữa tại đây: https://fontawesome.com/how-to-use/on-the-web/referencing-icons/basic-use
* Liên hệ: trungnt256