Hề nhô , hôm này mình ngoi lên để chia sẻ một số tips hay hay, mong anh em hãy ủng hộ mình nhé.

Bắt đầu nào 
# 1.Set margin và padding rồi sau đó reset  

Có bao giờ bạn căn margin và padding cho tất cả các element rồi sau đó reset chúng ở đầu hay cuối element chưa ? 
Công đoạn đó rất là mất thời gian đúng không, thay vào đó, tại sao chúng tạ lại không sử dụng cách dễ dàng và thuận tiện hơn này : dung thằng selectors **nth-child**/**nth-of-type** , dùng  pseudo-class **:not()**, hoặc là dùng dấu **+** nè .

Trước nhé :

```javascript
.item {
  margin-right: 1.6rem;
}

.item:last-child {
  margin-right: 0;
}
// trông hơi rắc rối nhỉ 
```

Chúng ta nên làm như thế này :

```javascript
Cách 1 :
.item:not(:last-child) {
  margin-right: 1.6rem;
}

Cách 2 :
.item:nth-child(n+2) {
  margin-left: 1.6rem;
}

Cách 3:
.item + .item {
  margin-left: 1.6rem;
}
```

# 2.Add display: block cho elements khi sử dụng cùng position: absolute hay position: fixed
Bạn có biết rằng chúng ta không cần add **display: block** cho elements khi sử dụng **position: absolute** hay **position: fixed** bởi vì nó đã được default ???

Đừng làm như thế này nhé :
```javascript
.button::before {
  content: "";
  position: absolute;
  display: block;
}
```

Hay như thế này :

```javascript
.button::before {
  content: "";
  position: fixed;
  display: block;
}
```

Nên làm như thế này :

```javascript
.button::before {
  content: "";
  position: absolute;
}
```

Và thế này này :
 ```javascript
.button::before {
  content: "";
  position: fixed;
}
```


# 3. Sử dụng transform: translate (-50%, -50%) để căn giữa

Đây là một vấn đề phổ biến đã từng gây ra rất nhiều nhức nhối. Nó kéo dài cho đến năm 2015, và tất cả các giải pháp của nó đều dẫn đến một số khó khăn: đó là căn giữa một phần tử có chiều cao tùy ý dọc theo hai trục.

Có một giải pháp đó là sử dụng thuộc tính **position: absolute** kết hợp với **transform**. Nhưng cách này thì lại gặp một vấn đề, nó sẽ làm mờ văn bản trên trình duyệt Chorme.

Sau đó chúng ta có sự ra đợi của thuộc tính flex box. Nhưng theo mình thì cũng không giải quyết được gì vẫn bị mờ text. Chính vì vậy mình sẽ đưa cho mọi người một tricks chỉ sử dụng 2 thuộc tính thôi nhé :

```javascript
.parent {
  display: flex;
}

.child {
  margin: auto;
}
```

Chứ đừng làm như thế này :

```javascript
.parent {
  position: relative;
}

.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

# 4. Sử dụng width: 100% cho Block Elements

Chúng ta thường sử dụng flexbox để tạo multi-column grid sau đó chuyeerm đổi thành một columi suy nhất

Và để chuyển đổi grid  thành một column, chúng ta sử dụng **width: 100%**. Sao lại phải làm như thế này nhỉ ? Các grid elements là các elements khối có thể thực hiện việc này một cách mặc định mà không cần sử dụng các thuộc tính bổ sung.
Vì vậy, chúng ta không cần thiết phải sử dụng width: 100%:

Đừng làm thế này nhé :

```javascript
<div class="parent">
  <div class="child">Item 1</div>
  <div class="child">Item 2</div>
  <div class="child">Item 3</div>
  <div class="child">Item 4</div>
</div>
```

```javascript
.parent {
  display: flex;
  flex-wrap: wrap;
}

.child {
  width: 100%;
}

@media (min-width: 1024px) {
  .child {
    width: 25%;
  }
}
```
 Nên làm như thế này :
 

```javascript
<div class="parent">
  <div class="child">Item 1</div>
  <div class="child">Item 2</div>
  <div class="child">Item 3</div>
  <div class="child">Item 4</div>
</div>
```

```javascript
@media (min-width: 1024px) {
  .parent {
    display: flex;
    flex-wrap: wrap;
  }

  .child {
    width: 25%;
  }
}
```

# 5. Set display: block cho Flex Items

Khi sử dụng flexbox, điều quan trọng cần nhớ là khi bạn tạo flex container (thêm thuộc tính display: flex), tất cả các thằng con (flex items) sẽ bị chặn.

Điều này có nghĩa là các elements được thiết lập để hiển thị và chỉ có thể có các block valuesVậy nên, nếu bạn đặt **inline** hoặc **inline-block**, nó sẽ chuyển thành **block**, **inline-flex** -> **flex**, **inline-grid** -> **grid** và **inline-table** -> **table**.

Vì vậy,đừng nhét thằng **display: block** vào flex items làm gì. Trình duyệt nó sẽ tự làm :v.

Đừng thế này nha :

```javascript
.parent {
  display: flex;
}

.child {
  display: block;
}
```

Như thế này thì chuẩn :

```javascript

.parent {
  display: flex;
}
```

# Kết bài 
Vậy là các típ chia sẻ của mình lại kết thúc rồi .

Nếu thấy hay các bạn hay **like**, **share** và **upvote** dùm mình nhé :heart_eyes::heart_eyes::heart_eyes:

Many thanksssssss :+1::+1::+1: