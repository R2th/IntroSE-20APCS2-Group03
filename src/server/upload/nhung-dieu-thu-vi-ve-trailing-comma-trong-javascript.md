## Trailing comma là gì? 

> Trailing comma (dấu phẩy đuôi, dấu phẩy cuối) là việc để dư một dấu phẩy sau phần tử cuối cùng ở cuối một danh sách (có thể là phần tử trong Array literal, property trong Object literal, tham số của hàm...). 

**Ví dụ:**

```
//trailing comma trong Object literal
var viblo = {
  tab1: 'Newest',
  tab2: 'Series',
  tab3: 'Trending',
}

//trailing comma trong tham số của hàm (và trong lời gọi hàm)
function defName(param1, param2,) {
  /* ... */
}
```

Thường thì dấu phẩy sẽ dùng để ngăn cách giữa các phần tử trong một danh sách. Và trong ví dụ trên thì dấu phẩy ở phía cuối cùng là dư thừa về mặt ngữ pháp. Và nếu bạn sử dụng một trình duyệt cũ chỉ hỗ trợ ECMAScript 3 trở về trước (IE8) thì khi dịch đoạn mã kiểu:

```
namePost = ['post1', 'post2', 'post3',]
```

thì thứ mà bạn nhận được sẽ trông như sau: :laughing:

![](https://images.viblo.asia/c82a3efe-9760-4e83-9021-12c1f5034526.jpg)


Ấy thế mà, mọi thứ đã thay đổi 360* kể từ khi ECMAScript 5 ra đời. **trailing comma** được chấp nhận cho danh sách phần tử Array và Object property. 

## Tại sao trailing comma trở thành best practice?

Giờ thì chúng ta hãy thử tìm hiểu xem trailing comma có gì thú vị nhé. 

### 1. Phần tử khi thêm vào cuối sẽ luôn đồng nhất và tách bạch

Khi không dùng trailing comma, việc thêm phần tử vào cuối danh sách sẽ gây ảnh hưởng đến phần tử kế cuối vừa được thêm dấu phẩy. Và khi bạn commit code lên Git thì mọi thứ sẽ như này:

```
var viblo = {
   tab1: 'Newest',
   tab2: 'Series',
-  tab3: 'Trending'
+  tab4: 'Video',
+  tab5: 'My Clips',
}
```
 
 Mệt thật phải không nào! Vậy là trailing comma lại có dịp phát huy tác dụng. Chỉ cần "phẩy" nhẹ một cái là mọi sự đã khác rồi

```
var viblo = {
   tab1: 'Newest',
   tab2: 'Series',
   tab3: 'Trending',
+  tab4: 'Video',
+  tab5: 'My Clips',
}
```

### 2. Dễ dàng sắp xếp lại thứ tự và cập nhật danh sách

Để có cái nhìn rõ hơn thì bạn có thể theo dõi bức hình GIF sau:

![](https://images.viblo.asia/1b2f3eb0-7b87-489f-8abe-411ec0a671cc.gif)

### 3. Giảm số dòng conflict khi merge với version control

![](https://images.viblo.asia/531ff9ed-1c6e-44c1-ab05-72164e62be2c.png)

Trong ví dụ trên, bạn có thể nhận thấy,khi **không dùng trailing comma,** thì mặc dù phần tử *female* đều thêm cùng một dấu phẩy, Git vẫn không tự động merge dòng này và vẫn báo conflict cùng với dòng thay đổi tiếp theo. Việc theo dõi những dòng conflict vô nghĩa này sẽ gây khó khăn cho người merge và rất dễ gây ra sai sót bị mất code sau khi resolve.

:point_right: Và cách giải quyết không gì khác là dùng **trailing comma**

## Nhưng lưu ý khi sử dụng trailing comma
### 1. Trailing comma trong tham số hàm

Trailing comma chỉ hữu dụng với danh sách trên nhiều dòng, do đó khi danh sách ngắn trên cùng một dòng, bạn không cần để dư dấu phẩy làm gì.

Với danh sách tham số của hàm, **trailing comma chỉ mới được chấp nhận trong ES2017**. Nếu JS engine chưa hỗ trợ, và khi chạy trực tiếp nó sẽ gây lỗi cú pháp. Cho nên sẽ an toàn hơn nếu code của bạn được biên dịch thông qua **Babel và sử dụng preset-env.**

Vậy nên, bạn vẫn nên tránh dùng trailing comma trong tham số hàm và khi viết hàm có danh sách tham số quá dài thì bạn nên sử dụng object literal để gom danh sách các tham số như ví dụ sau:

```
// Cách viết thông thường của hàm có nhiều tham số
function getContent(title, time, content, author) { /* ...*/ }

// Khi hàm có nhiều tham số, bạn nên sử dụng object literal
function getContent(options = {}) { /* ...*/ }

// Và bạn cũng hoàn toàn có thể gọi hàm bằng cách giá trị cho tham số thông qua object literal
getContent({
  title,
  time,
  content,
  author,
})
```

### 2. Không thể sử dụng Trailing comma trong khai báo biến

Một trường hợp tiêu biểu, mà thường dính đến dấu phẩy đó là khi bạn khai báo nhiều biến với từ khóa `var / let. ` Và với cú pháp của JS thì bạn **không thể thêm Trailing comma khi khai báo biến**

```
// lỗi cú pháp unexpected token...
var a,
    b,
    c,
    ;
```

Thay vì vậy, hãy cứ "code đẹp" khi khai báo nhiều biến local như sau:
```
// Với danh sách biến không gán giá trị ban đầu,
// có thể viết trên cùng một hàng:
var a, b, c, d, e;

// Với danh sách biến có gán giá trị ban đầu,
// hãy xuống dòng và bắt đầu với từ khóa var / let:
var x = 1;
var y = 2;
var z = 3;
```

## Kết luận
Như vậy, sự xuất hiện của **Trailing comma** phần nào đó đã mang lại những lợi ích đáng kể trong việc code và commit lên version control. Tuy thế, vẫn có những lưu ý bạn cần để tâm tới để việc sử dụng "dấu phẩy dư" *có lợi chứ không mang lại hại*. Hy vọng qua bài viết này, các bạn có thể hiểu hơn về những điều thần kì xuất hiện trong JS.