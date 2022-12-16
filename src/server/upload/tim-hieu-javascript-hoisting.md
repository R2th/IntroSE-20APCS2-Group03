# Tìm hiểu JavaScript Hoisting

Hoisting là vấn đề liên quan đến cách khai báo biến trong Javascript. Nó liên quan đến việc trong Javascript bạn có thể sử dụng một biến mà không cần phải định nghĩa trước, vì vậy để chương trình chạy chuẩn thì bạn phải khai báo biến trước khi sử dụng và đặt nó phía trên cùng phạm vi của biến (trong function, trong đoạn script, ...).
### Table of Content
1. Hoisted trong Javascript
2. Không phải hoisted trong Javascript
3. Lời kết

## 1. Hoisted trong Javascript

Trong Javascript bạn có thể định nghĩa một biến sau khi sử dụng nó, hay nói cách khác một biến có thể được sử dụng trước và định nghĩa sau.
```
// Gán nhưng chưa khai báo biến
domain = 'https://freetuts.net';
 
// In giá trị
document.write("Domain là: " + domain);
 
// Khai báo
var domain;
 
// In lại
document.write("<br/> Domain là: " + domain);
```
Nếu trong lúc khởi tạo mà bạn gán giá trị cho biến thì kết quả sẽ khác
```
// Gán nhưng chưa khai báo biến
domain = 'https://freetuts.net';
 
// In giá trị
document.write("Domain là: " + domain);
 
// Khai báo
var domain = 'http://course.freetuts.net';
 
// In lại
document.write("<br/> Domain là: " + domain);

```

Nhưng nếu viết cách khai báo biến trước khi sử dụng thì ta vẫn có kết quả giống nhau.

```
// Khai báo
var domain;
 
// Gán nhưng chưa khai báo biến
domain = 'https://freetuts.net';
 
// In giá trị
document.write("Domain là: " + domain);
 
// In lại
document.write("<br/> Domain là: " + domain);
```


Và đây chính là cách chuẩn nhất nên viết và ta gọi là hoisting, tức là khai báo biến nằm trên cùng của đoạn mã script.

## 2. Không phải hoisted trong Javascript

Trong Javascript hoists chỉ tồn tại khi bạn khai báo biến chứ không tồn tại khi gán giá trị ban đầu cho biến, nghĩa là bạn có thể gán thoải mái và nó không liên quan đến việc dễ debug hay không, miễn là cứ khai báo ở trên top.

```
var domain = 'https://freetuts.net';
var email = 'thehalfheart@gail.com';
 
document.write("Domain là: " + domain);
document.write("<br/> Email là: " + email);
```

Trong ví dụ này ta khai báo và gán giá trị khởi tạo luôn.


```
var domain = 'https://freetuts.net';
 
document.write("Domain là: " + domain);
 
document.write("<br/> Email là: " + email);
 
var email = 'thehalfheart@gail.com';
```

Trong ví dụ này ta sử dung rồi mới khai báo, lúc này chương trình chưa hiểu biến email là gì, vì vậy nó sẽ in ra là undefined.

## 3. Lời kết

Việc hiểu cơ chế hoisted giúp lập trình viên giảm lỗi và dễ debug trong quá trình phát triển. Không những vậy mà việc khai báo biến nằm trên top của chức năng giúp chương trình sáng và dễ quản lý code hơn.

Những ví dụ này khá đơn giản nên bạn hãy tự mình liên tưởng tới khái niệm biến toàn cục và biến cục bộ, sau đó áp dụng vào thử nhé.