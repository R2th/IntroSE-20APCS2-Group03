# Mở đầu
Xin chào các bạn. Dưới đây là một số câu hỏi,khái niệm phỏng vấn thường gặp dành cho Front-end khi apply Intern, Fresher. Đây là những kinh nghiệm mà mình đã trãi qua khi đi phỏng vấn và hy vọng có thể giúp ích một phần nào đó cho các bạn.

Ở mỗi câu hỏi, khái niệm thì người phỏng vấn sẽ đưa ra một vài câu hỏi ví dụ thực tế về phần khái niệm đó để kiểm tra xem bạn có thực sự hiểu hay không, vì vậy cần chú trọng lý thuyết lẫn thực hành.

Và chúng ta sẽ đi qua lần lượt các câu hỏi cho HTML, CSS, JavaScript, ReactJS.
## 1. HTML

### Thẻ <!DOCTYPE html> là gì?
Ở đầu một file HTML sẽ khai báo <!DOCTYPE html> để làm cho trình duyệt web biết được website của bạn đang sử dụng phiên bản ngôn ngữ đánh dấu (hay còn gọi markup language) nào.

### Thẻ meta là gì?
Thẻ meta dùng để cung cấp thông tin của website cho công cụ tìm kiếm. Một số thẻ meta tiểu biểu như: title, description, content-type, view-port...

### HTML sematic là gì?
HTML semactic có nghĩa là sử dụng thẻ thích hợp nhất cho ý nghĩa của nó. Nó có nghĩa là sử dụng các phần tử có ý nghĩa như **form**, **article** và **table** thay vì chỉ sử dụng **div** và **span**.

Ví dụ: Tạo header ta có thể sử dụng thẻ **header** thay vì **div**.
Bạn có thể tham khảo một số thẻ sematic khác [tại đây](https://viblo.asia/p/semantic-html-va-mot-so-the-html-de-phan-chia-noi-dung-trang-ByEZk9k25Q0).

### HTML 5 là gì?
Đây là phiên bản thứ 5 của ngôn ngữ HTML. Hầu hết hiện nay chúng ta đều sử dụng HTML5

HTML5 thêm mới một số thẻ như: header, footer, article, nav, section, audio, video....

Ưu điểm của HTML5: đa nền tảng và responsive, hỗ trợ âm thanh và video, code bằng HTML5 rõ ràng và nhất quán, có nhiều layout elements hơn...

### DOM trong HTML
![](https://images.viblo.asia/fd70deab-8b0d-40ab-aa37-61bf8125b7ad.gif)

DOM đại diện cho website của bạn. Bên trong có root element là thẻ **html**, và bên trong root element có nhiều element khác là các thẻ như: **head**, **body**, **div**,**a**...

Và bên trong element sẽ có attribute và children ( text ).

Ví dụ:
```markdown
// element: <a><a/>
// attribute: href
// children: Click me!!!
<a href="google.com">Click me!!!<a/>
```

### Khác nhau giữa thẻ div và span
**Div** đại diện cho thẻ **block**, thường dùng để gom nhóm các thẻ **block** với nhau.

**Span** đại diện cho thẻ **inline**, thường dùng để gom nhóm các thẻ **inline** với nhau.

### SEO là gì? Cách SEO một trang web?
SEO -Search Engine Optimization nghĩa là tối ưu hóa vị trí tìm kiếm trên các công cụ tìm kiếm như: Google..

Một vài cách SEO một trang web đơn giản:
1. Sử dụng đầy đủ thẻ **meta**
2. Sử dụng thẻ **sematic**
3. Sử dụng nhiều thẻ **h1** cho tiêu đề
4. Thẻ **Image** buộc phải có thuộc tính **alt**
5. .....

### Một số câu hỏi khác
Một số câu hỏi có thể xuất hiện ở phần HTML là:
1. Thẻ Image có 2 thuộc tính quan trọng là gì? Chức năng của thuộc tính đó?

2. Thẻ label có thuộc tính for dùng để làm gì?

## 2. CSS ( Cascading Style Sheets )
### Các cách viết CSS
**Inline**: Viết trực tiếp vào thẻ bằng thuộc tính style
```html
<h1 style="color:white;padding:30px;">My title!!</h1>
```

**Internal**: Được viết trong thẻ **style** nằm trong thẻ **head**
```html
<head>
  <style type="text/css">
    p {color:white; font-size: 10px;}
    .center {display: block; margin: 0 auto;}
    #button-go, #button-back {border: solid 1px black;}
  </style>
</head>
```

**External**: Viết ở một file khác và link vào html như dưới đây
```html
<head>
  <link rel="stylesheet" type="text/css" href="style.css" />
</head>
```

### Phân biệt inline, block, inline-block
**Inline**: những thẻ mang thuộc tính inline sẽ nằm cùng 1 hàng, đặc biệt không thể set width và height.

**Block**: thẻ mang thuộc tính block sẽ nằm 1 hàng và width sẽ là 100%.

**Inline-block**: những thẻ mang thuộc tính inline-block sẽ nằm cùng 1 hàng, nhưng set đc width và height.

### Flex box và Grid
Flex box dùng để css theo 1 chiều ( chiều ngang hoặc dọc ).

Grid dùng để css theo 2 chiều.

Ở câu hỏi này bạn cần trả lời các thuộc tính cơ bản của **flex box** và **grid**.

### Position
Bao gồm 5 thuộc tính: relative, absolute, fixed,  stiky, static.

Thuộc tính mặc định là static

Bạn cần phân biệt được khái niệm của các thuộc tính trên và mối liên hệ giữa relative và absolute.

### Phân biệt các đơn vị px, rem, em
px: pixel là đơn vị phổ biến và dễ dùng nhất.

rem: phụ thuộc vào thẻ html, mặc định là 1rem = 16px.

em: phụ thuộc vào thẻ cha gần nhất có thuộc tính font-size.

### Box-sizing: border-box là gì?
Khi chúng ta set một border,padding cho phần tử thì kích thước ban đầu sẽ tăng lên vì vậy cần sử dụng **Box-sizing: border-box** để ngăn chặn điều đó, nó sẽ tính toán lại phần content sao cho content + với các phần tăng thêm sẽ bằng với kích thước mà chúng ta đặt ra ban đầu.

### Model box là gì?
Bao gồm: Content ( phần nội dung chính ), Border ( phần viền ), Padding ( phần đệm thêm ), Margin ( phần dịch chuyển ).

Bạn có thể Inspect một element nào đó, sau đó vào tab **Computed** để xem model box của element đó.

### BEM
BEM là viết tắt của **Block**, **Element và Modifier**. Đó là quy ước đặt tên CSS để viết các lớp CSS rõ ràng hơn và dễ đọc hơn.

BEM cũng nhằm mục đích viết các khối CSS độc lập để sử dụng lại chúng sau này trong dự án khác nhau.

Ví dụ:
```html
<h1 class="title__header-active"><h1/>
```
### Responsive
Khi responsive chúng ta dùng thẻ @media.

Các break-point cơ bản cho các thiết bị như:
1. Mobile: 0 > 768px
2. Tablet: 769px > 1024px
3. Desktop: 1024px trở lên

Ví dụ: Đối với thiết bị từ 0 > 600px sẽ có background màu đỏ
```css
@media only screen and (max-width: 600px) {
  div {
    background-color: red;
  }
}
```
### CSS Selector
Những CSS Selector cơ bản bạn có thể tham khảo
![image.png](https://images.viblo.asia/0ccc5c2a-c97f-4c01-985e-4f232a3e42d7.png)
### Pseudo-class
Một Pseudo class trong CSS được dùng để xác định trạng thái đặc biệt của một phần tử. Nó có thể được kết hợp với class để thêm hiệu ứng cho các phần tử.

Một số Pseudo class cơ bản như: hover, visited, focus, focus-within, disable, checked....
```css
/* 
   Khi thẻ a được hover sẽ hiển thị màu xanh
*/
a:hover {
  color: green;
}
```
### Một số câu hỏi khác
Một số câu hỏi có thể xuất hiện ở phần CSS là:
1. Phân biệt display: none; và visibility: hidden;

2. Phân biệt position: fixed; và position: sticky;

3. Phân biệt ID và Class

4. Các cách căn giữa một phần tử

## 3. JavaScript
### Thao tác với DOM
Một số thao tác DOM cơ bản bạn cần phải biết:

**getElementById()**

**getElementsByClassName()**

**querySelector()**

**addEventListener()**

**removeEventListener()**

**appendChild()**

### Phân biệt var, let, const
Khuyến khích sử dụng **let** khi muốn biến đó có sự thay đổi, và **const** khi không muốn thay đổi

Bạn có thể truy cập vào [đây](https://viblo.asia/p/phan-biet-kieu-bien-var-let-va-const-trong-javascript-ORNZqaOnZ0n) để tìm hiểu thêm về biến trong JS.
### Truthy, Falsy
Truthy là những giá trị khi ép kiểu về boolean thì bằng **true**.

Falsy là những giá trị khi ép kiểu về boolean thì bằng **false**.

Ví dụ 

Falsy: 0, "" , null, undefined, NaN , false. 

Truthy: là các kiểu còn lại

### Tham trị, tham chiếu
Tham trị chứa một giá trị như Number, String, Boolean.

Tham chiếu chứa một địa chỉ như Array, Object.

Bạn cần phân biệt tham trị và tham chiếu như thế nào.

### Xử lý bất đồng bộ ( promise, callback, async await )
Bạn có thể xem chi tiết về xử lý bất đồng bộ [tại đây](https://viblo.asia/p/tong-hop-xu-ly-bat-dong-bo-trong-javascript-callback-promise-va-async-Az45ba6LlxY)
### Phân biệt cookies, session storage, và local storage?
Bạn có thể xem chi tiết về cookies, session storage, và local storage [tại đây](https://viblo.asia/p/local-storage-session-storage-va-cookie-ORNZqN3bl0n)
### Hoisting
Hoisting là hành động mặc định của Javascript, nó sẽ chuyển phần khai báo lên phía trên top Trong Javascript, một biến (variable) có thể được khai báo sau khi được sử dụng. 

Chỉ xuất hiện ở biến **var**.
### ES6
Một số thay đổi ở ES6 mà bạn cần phải biết như:
1. Default Parameters 
2. Template Literals 
3. Multi-line String 
4. Destructuring Assignment 
5. Enhanced Object Literals 
6. Arrow Functions 

Bạn có thể xem chi tiết về ES6 [tại đây](https://viblo.asia/p/10-tinh-nang-cua-es6-lap-trinh-javascript-phai-biet-07LKXwQE5V4)

### Phân biệt các hàm cơ bản trong JS ( map, reduce, filter )
Ở câu hỏi này bạn cần phân biệt được cách sử dụng, giá trị trả về, tham số truyền vào của các hàm. Tiêu biểu là các hàm map, reduce, filter...

## 4. ReactJS
### Tại sao phải sử dụng ReactJS?
Đơn giản nó là một thư viện giúp chúng ta viết HTML, CSS, JS nhanh hơn rất nhiều so với viết thuần. Ngoài ReactJS còn có một số thư viện khác như: Angular, Vue...

### JSX
Nó cho phép bạn viết các đoạn mã HTML trong React một cách dẽ dàng và có cấu trúc hơn.

React sử dụng JSX cho việc xây dựng bố cục thay vì javascript thông thường.
### DOM ảo
Trong React, mỗi phần giao diện người dùng là một Component. Khi trạng thái của một Component thay đổi, React sẽ cập nhật DOM ảo. Khi DOM ảo đã được cập nhật, React sau đó sẽ so sánh phiên bản hiện tại của DOM ảo với phiên bản trước của DOM ảo. Quá trình này được gọi là "diffing".

Khi React biết đối tượng DOM ảo nào đã thay đổi, thì React chỉ cập nhật các đối tượng đó trong DOM thực. Điều này làm cho hiệu suất tốt hơn nhiều so với thao tác trực tiếp với DOM thực. Do đó làm cho React nổi bật như một thư viện JavaScript hiệu suất cao.
### SSR và CSR
SSR - Server Side Rendering là thực hiện việc render ở phía server. Nghĩa là khi bạn truy cập vào website thì sẽ gửi yêu cầu lên server, sau đó server trả về toàn bộ mã HTML và CSS từ đó trình duyệt hiển thị cho người dùng xem.

CSR - Client Side Rendering là thực hiện việc render ở phía client.  Nghĩa là khi bạn truy cập vào website thì sẽ gửi yêu cầu lên server, sau đó server trả về 1 thẻ div rỗng và một số file javascript, từ những file javascript đó trình duyệt sẽ thực thi và hiển thị giao diện cho người dùng.

SSR sẽ đảm bảo việc SEO tốt hơn CSR.

Một số thư viện CSR: ReactJS, VueJS

Một số thư viện SSR: NextJS, NuxtJS
### Lifecycle của ReactJS
Bạn có thể tham khảo Lifecycle của ReactJS [tại đây](https://viblo.asia/p/lifecycle-component-trong-reactjs-gGJ59jzxKX2)
### Điểm khác nhau giữa Class components và Functional components
Functional component là một hàm Javascript (hoặc ES6) trả về element React.

Class components là những class ES6. Chúng phức tạp hơn functional components ở chỗ nó còn có: phương thức khởi tạo, life-cycle, hàm render() và quản lý state (data).

Bạn có thể tham khảo sự khác nhau giữa Class components và Functional componentscủa ReactJS [tại đây](https://viblo.asia/p/react-js-hieu-ve-functional-va-class-components-Qbq5QpkRlD8)
### useState, useEffect, và một số hook hoạt động như thế nào?
Bạn có thể tham khảo **hook** của ReactJS [tại đây](https://viblo.asia/p/cung-tim-hieu-ve-cac-hook-trong-react-hooks-Ljy5VYgjlra)
### State management ( redux )
Bạn cần phải trình bày tại sao phải quản lý state ( redux ). Chi tiết hơn [tại](https://viblo.asia/p/huong-dan-su-dung-redux-trong-reactjs-3P0lP6X8Kox)

## 5. Kết luận
Bài viết hơi dài, hi vọng mọi người cố gắng đọc hết, vì đây đều là những câu hỏi, khái niệm quan trọng khi apply vị trí Intern, Fresher Front-end. Cảm ơn!!!!

## 6. Tài liệu tham khảo 
https://viblo.asia/p/tim-hieu-ve-virtual-dom-trong-react-bJzKm4kO59N

https://viblo.asia/p/react-js-hieu-ve-functional-va-class-components-Qbq5QpkRlD8

https://viblo.asia/p/huong-dan-su-dung-redux-trong-reactjs-3P0lP6X8Kox

https://w3schools.com/