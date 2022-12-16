![](https://images.viblo.asia/b4936b4e-dd30-4eb3-a65d-acbb0c4e0373.jpg)
### I. Lời mở đầu

Lập trình web đang nổi lên là một công việc được các bạn trẻ ưa chuộng. Xuất phát từ việc internet đang ngày càng chi phối mạnh mẽ đến cuộc sống con người ngày nay, lập trình web bỗng dưng trở thành một công việc lý tưởng cho các lập trình viên. Có thể nói trong thời điểm hiện tại, số lượng các bạn theo lập trình web ngày càng tăng vọt.
Và tất nhiên chúng ta không còn xa lạ gì với từ khóa **front-end** và **CSS** đúng không nào. Khi nhắc đến **css**, tưởng chừng với chúng ta có gì đó khá cơ bản nhưng các bạn có chắc mình đang viết **css** sạch.  Trong bài viết, mình sẽ chia sẻ cho các bạn một vài kinh nghiệm về **css** để giúp cho chúng ta có thể "Viết style (sạch) cho front-end".
### II. Nội dung chính
**1. Sử dụng SASS/SCSS:**
![](https://images.viblo.asia/e928279d-8cc0-466b-9c31-2fa3497562a2.png)

SASS / SCSS là gì?

SASS (Systematically Awesome Style Sheets) là một một ngôn ngữ kịch bản tiền xử lý, từ nó được chuyển đổi ra CSS bằng các công cụ biên dịch khác nhau. SASS có hai loại cú pháp. Cú pháp gốc ban đầu là loại cú pháp viết theo kiểu thụt đầu dòng giống như Haml, nó phân chia các khối code bằng ký tự xuống dòng và thụt đầu dòng, các file viết theo cú pháp này thường để phần mở rộng .sass

Cú pháp viết code SASS thứ hai là SCSS (Sassy CSS), nó sử dụng các định dạng các khối code giống như chính CSS. Nó sử dụng {} để bọc khối code và ký hiệu ; để chia dòng trong khối lệnh đó. Các code viết theo SCSS lưu trong file có phần mở rộng .css
```scss
/*SASS*/

$color1: red
$color2: lime

a
    color: $color1
    &:hover
        color: $color2
   
/*SCSS*/

$color1: red;
$color2: lime;

a {
    color: $color1;
    &:hover {
        color: $color2;
        }
    }
    
/*CSS*/

a {
    color: red;
}
a:hover {
    color: lime;
}
```
**Variables:**

Bạn có thể sử dụng biến trong SCSS. Biến này giúp chúng ta có thể tái sử dụng trong các lần sử dụng khác nhau. Có thể ví dụ như bạn có một mã màu, mà mã màu này sẽ được dùng nhiều trong website của bạn...
```scss
// Declare a variable
$primary-color: #0099ff;
// References a variable
h1 {
  color: $primary-color;
}
```
**Nesting:**
Bạn có thể lồng các class:
Ví dụ bạn có thẻ span bao bên ngoài là 1 thẻ h1, các bạn thường viết thế này:
```
h1 {
  font-size: 5rem;
  color: blue;
}

h1 span {
  color: green;
}
```
Viết lồng như sau:
```
h1 {
  font-size: 5rem;
  color: blue;

  span {
    color: green;
  }
}
```
Nhìn có vẻ gọng gàng hơn đúng không nào.

**Partials and imports:**

Với scss bạn có thể tách style ra nhiều file .scss khác nhau, sau đó có thể import style đó vào 1 hoặc nhiều file .scss ở nhiều nơi khác nhau. Ví dụ mình muốn tạo style cho animation cho trang web. Như dưới mình sẽ tạo 1 file animation.scss. sau đó khi muốn sử dụng cho header thì mình import vào header.scss. Hoặc sử dụng ở content thì mình import vào content. Tránh việc import global khi không cần sử dụng.
```scss
// _animations.scss
@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
// header.scss
@import 'animations';
h1 {
  animation: appear 0.5s ease-out;
}
```
**Sử dụng BEM với SASS:**

Trước tiên, ký pháp BEM giúp người mới tham gia dự án dễ dàng phát hiện ra các trạng thái và các đối tượng con của một component đã được viết sẵn. Điều này giúp tránh cho họ phải viết lại những kiểu CSS đã có sẵn và hạn chế việc viết thừa code hoặc trùng kiểu CSS, điều mà rất hay xảy ra trong dự án lớn có nhiều người tham gia.

Bạn vẫn sẽ sử dụng cách viết lồng để cô lập khối component và kết hợp với biểu tượng parent & của SASS để đặt tên cho Element và Modifier mà không phải đánh lại tên của Component. VD:
```scss
.component {
 
    &__element {}
 
    &--mod {}
}
```
Mặc dù viết lồng cấp, khi được biên dịch thành CSS, chúng vẫn được trải phẳng thành một cấp class theo đúng tinh thần của BEM:
```scss
.component {}

.component__element {}

.component--mod {}
```

**2. Sử dụng thư viện**
![](https://images.viblo.asia/d1502af9-61a6-4bc6-8541-f2e7dec0323b.png)
**2.1. Bootstrap:**

 ```html
 <!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">

<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

<!-- Popper JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>

<!-- Latest compiled JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
 ```

  + Bootstrap là một mã nguồn mở, là một framework có chứa các ngôn ngữ lập trình như HTML, CSS và Javascript, hay nói một cách dễ hiểu thì framewordk chính là khuôn khổ và việc bạn sử dụng các ngôn ngữ HTML, CSS và Javascript trong khuôn khổ mà Bootstrap cho sẵn, và khi đó sẽ giúp bạn tiết kiệm được rất nhiều thời gian, công sức và đặc biệt nhất là khi bạn xây dựng 2 template cho giao diện PC và Mobile đã lỗi thời, thay vào đó thì Responsive sẽ giúp web của bạn được hiển thị tốt nhất, giúp tương thích với mọi kích thước màn hình, và nhờ đó thì bạn có thể tuỳ biến hiển thị được nhiều hơn trên nhiều loại màn hình khác nhau. Bootstrap có một tập hợp các class tiện ích hỗ trợ người dùng trong việc thiết kế website của mình.

Thay vì phải suy nghĩ đặt tên cho các class cũng như xây dựng layout. Bootstrap đã cung cấp cho coder một số layout cơ bản. Chúng ta có thể sử dụng để thiết kế trang web của mình sẽ tiết kiệm thời gian cũng như cho code "sạch" hơn.

**Ưu điểm:**
+ Bootstrap giúp các nhà thiết kế website có thể giảm thiểu được time trong việc thiết kế website. Khi bạn sử dụng Bootstrap, các bạn có thể hạn chế được thời giờ bỏ ra để viết code cho giao diện. Vì trong thư viện của nó đã có từ trước, những đoạn mã có thể chèn vào trong website.
+ Khi bạn sử dụng Bootstrap bạn hoàn toàn có thể tùy biến được giao diện theo ý muốn của cá nhân bạn. Với hệ thống Grid System đã mặc định bao gồm 12 bột cùng với độ rộng 940px được tích hợp sẵn ở Bootstrap.
+ Ngày nay, khi mà xu hướng phát triển website tương thích được với các  thiết bị thì Bootstrap. Bootstrap nổi lên như một Framework có sẵn reponsive css  phù hợp với mọi thiết bị như SmartPhone, tablets, dextop…vv..

**Nhược điểm:**

+ Tính kém phổ biến: Bootstrap không phải là ứng dụng web phổ biến nên để tìm được một tổ chức, cá nhân thành thạo bootstrap để có thể sử dụng với nền tảng lập trình web không nhiều.
    
+ Sản phẩm nặng, tốc độ tối ưu chưa cao: nên nếu dự án của bạn đòi hỏi sản phẩm nhẹ thì việc sử dụng bootstrap sẽ là cả một gánh nặng cho web. 
    
+ Chưa hoàn thiện: Bootstrap chưa đầy đủ các thư viện cần thiết. Các phát triển chưa thể tạo ra một framework riêng hoàn hảo, do đó một số trang web vẫn phải dùng phiên bản dành riêng cho mobile

**2.2. Tailwindcss:**

![](https://images.viblo.asia/f63b5ee4-6edf-41fa-abe5-e0b5c883ffb1.png)

Cũng giống như bootstrap, Tailwindcss cũng cung cấp cho người sử dụng tập class hỗ trợ viết style cho website. Để cài đặt Tailwind:
```bash
# Using npm
npm install tailwindcss

# Using Yarn
yarn add tailwindcss
```
Add vào css của bạn:
```scss
@tailwind base;

@tailwind components;

@tailwind utilities;
```
Import css của Tailwind:
```scss
@import "tailwindcss/base";

@import "tailwindcss/components";

@import "tailwindcss/utilities";
```
Tạo file config cho tailwind:
```js
// tailwind.config.js
module.exports = {
  theme: {},
  variants: {},
  plugins: [],
}
```

**Ưu điểm:**
- Tên class ngắn gọn dễ nhớ, Tailwind CSS có gần như đủ gần 85% thuộc tính css.
- Sử dụng Flexbox để chia layout.
- Dễ dàng cài đặt.

**Nhược điểm:**
- Khi sử dụng Tailwind bên cạnh việc sử dụng các class được thuận tiên và dễ nhớ thì class sẽ rất là dài (Hiểu đơn giản, đến font-size, color,.. cũng có class để sử dụng).

**Một số class của tailwind:**
```scss
.block	        => display: block;
.inline-block	=> display: inline-block;
.inline	        => display: inline;
.flex	        => display: flex;
.inline-flex	=> display: inline-flex;
.table	        => display: table;
.table-row	    => display: table-row;
.table-cell	    => display: table-cell;
.hidden	        => display: none;
```
### III. Tạm kết
Qua bài viết chắc hẳn các bạn đã có một số kiến thức để viết style cho website được đẹp hơn rồi đúng không nào. Các bạn có thể sử dụng SASS/SCSS, Bootstrap, Tailwind,... hoặc bạn có thể tự tạo thư viện cho riêng mình.
![](https://images.viblo.asia/de712910-d0ef-4e55-aaf8-d7cffca1e892.jpg)