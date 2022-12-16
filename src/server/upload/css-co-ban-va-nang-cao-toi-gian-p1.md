>*Như tiêu đề mình đã đề cập, chủ đề này mình sẽ chia sẻ về CSS cơ bản và nâng cao theo những gì mình đã học và đang học một cách tối giản nhất, có thể có nhiều thiếu sót, để tìm hiểu sâu hơn mọi người có thể tìm kiếm theo từ khóa ở các mục lớn trong bài. Cảm ơn mọi người đã theo dõi.*

# CSS là gì?
* Theo trang W3Schools, CSS viết tắt của Cascading Style Sheets.
* CSS mô tả cách các phần tử HTML được hiển thị trên màn hình hoặc các phương tiện khác.
* CSS giúp bạn kiểm soát bố cục của nhiều trang web cùng một lúc. Do đó nó tiết kiệm được rất nhiều thời gian cho bạn trong công việc.



## 1. Cú pháp cơ bản
```css
Selector {property: value;}
```

**Selector**: đối tượng sẽ được áp dụng: VD: body, h1, h2, img, .username, #title…

Ngoài viết tên selector theo class, id, tag. Chúng ta có thể viết tên selector theo phân cấp để chỉ các ảnh trong #entry. VD: #entry img.

VD 1 đoạn mã về input 
```html 
<input name = "Search" type = "text" value = "Key Word">
```

Để áp dụng CSS cho riêng thuộc tính tìm  kiếm này, ta dùng `input[name= “Search”]`

Dùng selector ảnh hưởng đến toàn trang web `* {color: red}`

**Property**: các thuộc tính quy định cách trình bày: VD: background-color, font-family, color, padding,..

**Value**: giá trị của thuộc tính: VD: #FFF định màu trắng cho nền trang.

## 2. Chú thích trong CSS

Chú thích (comment) sẽ được trình duyệt bỏ qua và không hiển thị trên trang web. Sử dụng cấu trúc `/*.........*/` ở trên 1 dòng hoặc nhiều dòng để chú thích. VD:

    /* Style for image */

Ngoài ra để viết chú thích nhanh hơn, bạn hãy gõ đoạn text bạn cần chú thích, sau đó bôi đen và sử dụng cú pháp `Ctrl + /` để tạo chú thích.

## 3. Nhúng CSS vào HTML

Có 3 cách để thêm CSS vào file HTML

* **External CSS:** viết CSS ở một file riêng, đặt tên là `<name>.css`, sau đó sử dụng thẻ `link` để nhúng file này vào trong phần `<head>` của file html. 

VD: file `myStyle.css`:
```css
  h1
  {
    color: white;
    background–color: purple;
  }
  .content 
  {
    color: red;
    background–color: white;
    text-align: center;
  }
```
file `html`
```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="myStyle.css">
  </head>
  <body>
    <h1>H1 works!</h1>
    <p class="content">p work!.</p>
  </body>
</html>
```
* **Internal CSS:** đặt trong mục `head` của file html, được cấu trúc bằng cặp thẻ `<style></style>`

VD: file `html`
```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      h1
      {
        color: white;
        background–color: purple;
      }
      .content 
      {
        color: red;
        background–color: white;
        text-align: center;
      }
    </style>
  </head>
<body>
  <h1>H1 works!</h1>
  <p class="content">p work!.</p>
</body>
</html>
```

* **Inline CSS:** áp dụng trực tiếp vào phần tử. CSS bằng cách này không được khuyến khích, việc quản lý file sẽ rất khó nếu chỉ sử dụng `Inline CSS`, vì nó chỉ áp dụng cho một element duy nhất.

VD: file `html`

```html
<!DOCTYPE html>
<html>
  <body>
    <h1 style="color:white; background–color: purple;">H1 work!</h1>
    <p style="color:red; background–color: white; text-align: center;">p works!</p>
  </body>
</html>
```

## 4. Đơn vị CSS:
*Đơn vị chiều dài*

  > + **`%`**: phần trăm,  là đơn vị tham chiếu tỉ lệ so với một phần tử mẹ dựa vào kích thước.
  >+ **`in`**: inch (1 inch = 2,54 cm)
  >+ **`em`**: 1em tương đương với kích thước font chữ hiện hành, nếu font hiện hành có kích thước 14px thì 1em = 14px
  >+ **`ex`**: 1ex bằng chiều cao của chữ x hiện hành
  >+ **`pt`**: Point (1pt = 1/72 inch)	
  >+ **`pc`**: Pica (1pc = 12pt)
  >+ **`px`**: Pixel (điểm ảnh trên màn hình máy tính)
  >+ **`cm`**: định nghĩa đơn vị đo bằng cm
  >+ **`mm`**: định nghĩa đơn vị đo bằng mm
  >+ **`vh`**: 1% chiều cao của khung nhìn
  >+ **`vw`**: 1% chiều rộng của khung nhìn

## 5. Sự ưu tiên về vị trí đặt CSS
    CSS Nội tuyến > CSS bên trong > CSS bên ngoài > CSS mặc định của trình duyệt

Thay đổi độ ưu tiên cho thuộc tính CSS: 
```css
selector {property: value !important}
```
Nếu cùng một thuộc tính cho một `selector`, nếu cả 2 đều có `!important` thì cái sau được lấy.


## 6. Background
**`6.1. Màu nền:`**: (background-color)
```css
background-color: red;
```
**`6.2 Ảnh nền:`** 	(background-image) 
```css
background-image: url(avatar.png)
```
**`6.3 Lặp lại ảnh nền:`**	(background-repeat) 
```css
background-repeat: no-repeat
```
```css
+ repeat-x: /* Lặp lại theo phương ngang */
+ repeat-y: /* Lặp lại theo phương dọc */
+ repeat: /* Lặp lại theo 2 phương (Đây là giá trị mặc định) */
+ no-repeat: /* Không lặp lại ảnh */
```
**`6.4.Khóa ảnh nền:`** (background-attachment) 
```css
background-attachment: fixed
```
```css
+ scroll: /* Ảnh nền cuộn xuống cùng nội dung trang web (Giá trị mặc định) */
+ fixed: /* Ảnh nền cố định khi cuộn nội dung trang web. */
```
**`6.5. Định vị ảnh nền:`** (background-position) 
```css
background-position: 5cm 2cm
/* Ảnh được định vị 5cm từ trái qua, 2cm từ phải qua */
```
Chúng ta có thể nhóm thuộc tính CSS:
```css
background-color: transparent;
background-image: url(avatar.png)
background-repeat: no-repeat
background-attachment: fixed
background-position: right bottom
```
thành một dòng ngắn
```css
background: transparent url(avatar.png) no-repeat fixed right bottom;
```
## 7. Font chữ
**`7.1. Font-family`**

Định nghĩa danh sách ưu tiên các font sẽ được dùng để hiện thị lên trang web.
Có hai loại font được chỉ định: `family-names` và `generic families`

    + family-names: Tên cụ thể của font: Roboto, Arial, Time New Roman…
    + generic families: Tên của một họ gồm nhiều font: sans-serif, serif,…

```css 
body {font-family: “Roboto”, sans-serif;}
```
**`7.2. Font-style`**

Định nghĩa việc áp dụng các kiểu in thường, in nghiêng, hay in xiên cho chữ.
```css
h1 {font-style: italic;} 
/* (normal, oblique) */
```
**`7.3. Font-variant`**

Được dùng để chọn chế độ bình thường và chế `small-caps` (chữ in hoa có kích cỡ nhỏ hơn chữ in hoa bình thường) của một font chữ.
```css
h1 {font-variant: small-caps;}
```
**``7.4. Font-weight``**

Được dùng để chọn chế độ bình thường hay in đậm
```css
h1 {font-weight: bold;}
```
**`7.5. Font-size`**

Được dùng để chỉnh kích thước font chữ
```css
h1 {font-size: 14px;}
```
**`7.6. Rút gọn font:`**

Từ việc bạn viết
```css
h1 {
  font-style: italic;
  font-variant: small-caps;
  font-weight: bold;
  font-size: 14px;
  font-family: “Roboto”, sans-serif;
}
```
thì có thể rút ngắn lại thành
```css
h1 {font: italic small-caps bold 14px “Roboto”, sans-serif}
```

## 8. Text
**`8.1. Màu chữ (color)`**

Để định màu chữ cho một thành phần nào đó trên trang web
```css
body {color: #FFF}
```
**`8.2. Text-indent`**

Tạo khoảng thụt đầu dòng cho dòng đầu tiên của văn bản
```css
p {text-indent: 30px}
```
**`8.3. Text-align`**

Canh chỉnh văn bản cho các thành phần trong trang web. Có 4 giá trị: `left` (canh trái), `right` (canh phải), `center` (canh giữa), `justify` (canh đều).
```css
p {text-align: justify}
```
**`8.4. Letter-spacing`**

Dùng để chỉnh khoảng cách giữa các ký tự trong một văn bản.
```css
h1 {letter-spacing: 5px}
```
**`8.5. Text-decoration`**

Thêm các hiệu ứng: `underline` (gạch chân), `line-through` (gạch xiên), `overline` (gạch đầu), `blink` (hiệu ứng nhấp nháy).
```css
h1 {text-decoration: overline}
```
**`8.6. Text-transform`**

Quy định chế độ in hoa hay in thường của văn bản mà không phụ thuộc vào văn  bản gốc trên HTML. Có 4 giá trị: `uppercase` (in hoa), `lowercase` (in thường), `capitalize` (in hoa ký tự đầu tiên trong mỗi từ) và `none` (không áp dụng hiệu ứng).
```css
h1 {text-transform: uppercase}
```

Tạm thời kết thúc phần 1 ở đây nhé. Cảm ơn mọi người đã xem bài.