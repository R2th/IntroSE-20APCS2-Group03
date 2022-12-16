**BEM (viết tắt: Block-Element-Modifier) là một tiêu chuẩn trong việc viết CSS, sử dụng BEM rất hữu ích - làm cho code CSS dễ đọc, hiểu, bảo trì hay mở rộng…**

![](https://images.viblo.asia/3723a76b-a590-4d92-918b-1b14c4fcf65a.jpg)

```
/* Block */
.block {}

/* Element */
.block__element {}

/* Modifier */
.block__element--modifier {}
```
# Tại sao sử dụng BEM ?
* Thống nhất
* Tạo ra một cấu trúc có thể mở rộng và dễ bảo trì

# Sử dụng thế nào ?
**Block:**<br>
Phần tử cha ngoài cùng của thành phần nào đó (component - ví dụ một button) được định nghĩa là block (tạm dịch: khối).\
Class này chứa những định dạng chung nhất và dùng để tái sử dụng
	
**Element:** <br>
Trong một component có thể có một hoặc nhiều các phần tử gọi là elements. Các elements này bổ sung thêm các style mới cho block nhưng không ghi đè lại các style đã có của block.

**Modifier:**<br>
Một block hoặc một element có thể có một biến thể được gọi là modifier.

# Ví dụ:
## Block không có elements hoặc modifiers:
Một component đơn giản có thể có một phần tử duy nhất, do đó có một class sẽ là block:
```
<style>
   .btn {}
</style>
<button class="btn"></button>
```

## Component với modifier đơn giản:
Như đã nói ở trên, một component có thể có nhiều biến thể ( kiểu như nút bấm có nhiều màu, kích thước chữ khác nhau …) thì các biến thể phải được thể hiện bởi một class modifier. Class modifier để bổ sung class cơ sở (block) - không thay thế, ghi đè các thuộc tính của block.


**Chuẩn :+1::**
```
<style>
   .btn {
      display: inline-block;
      color: blue;
   }
   .btn--secondary {
      color: green;
   }
</style>
<button class="btn btn--secondary"></button>
```

**Chưa chuẩn :-1::**
```
<style>
   .btn--secondary {
      display: inline-block;
      color: green;
   }
</style>
<button class="btn--secondary"></button>
```

## Component với elements:
Cấu trúc phức tạp hơn chút, có nhiều các element con. Mỗi element con cần một style phải gồm một class được đặt tên. Một trong những mục đích của BEM là nhất quán và ít đặc trưng riêng.

**Chuẩn :+1::**
```
<style>
   .card { }
   .card__title { }
   .card__description { }
</style>
<div class="card">
   <h1 class="card__title"></h1>
   <p class="card__description"></p>
</div>
```

**Chưa chuẩn :-1::**
```
<style>
   .card { }
   .card h1 { }
   .card p { }
</style>
<div class="card">
   <h1></p>
   <p></p>
</div>
```

Nếu cấu trúc của component có các element con mà trong element đó có thêm nhiều cấp độ, thì không nên viết element nhiều cấp độ.

BEM không khuyến khích cho cấu trúc “depth level”. Một class BEM biểu thị một element con của một component chỉ nên gồm tên của block và tên của element đó.

**Chuẩn :+1::**
```
<style>
   .card { }
   .card__title { }
   .card__description { }
   .card__excerpt { }
   .card__button { }
</style>
<div class="card">
   <h1 class="card__title"></h1>
   <div class="card__description">
      <p class="card__excerpt"></p>
      <button class="card__button"></button>
   </div>
</div>
```

**Chưa chuẩn :-1::**
```
<style>
   .card { }
   .card__title { }
   .card__description { }
   .card__description__excerpt { }
   .card__description__button { }
</style>
<div class="card">
   <h1 class="card__title"></h1>
   <div class="card__description">
      <p class="card__description__excerpt"></p>
      <button class="card__description__button"></button>
   </div>
</div>
```

## Element với modifier:
Trong một vài trường hợp, bạn có thể muốn thay đổi một element duy nhất trong component thì modifier phải được thêm cho element đó thay vì cho element.

```
<style>
   .card { }
   .card__title { }
   .card__title--big { } /* thêm style bổ sung */
   .card__description { }
   .card__excerpt { }
   .card__button { }
</style>
<div class="card">
   <h1 class="card__title card__title--big"></h1>
</div>
```

## Style các element dựa trên modifier:
Nếu bạn tùy biến các phần tử cùng một component giống định dạng nhau, cân nhắc việc thêm modifier cho block gốc của component và điều chỉnh styles cho mỗi element dựa trên modifier đó bằng cách thêm modifier. Việc này làm tăng tính riêng biệt, đặc trưng và làm cho các biến thể đơn giản hơn nhiều. 

**Chuẩn :+1::**
```
<style>
   .card--dark .card__title { }
   .card--dark .card__description { }
</style>
<div class="card card--dark">
   <h1 class="card__title"></h1>
   <p class="card__description"></p>
</div>
```

**Chưa chuẩn :-1::**
```
<style>
   .card__title--dark { }
   .card__description--dark { }
</style>
<div class="card">
   <h1 class="card__title card__title--dark"></h1>
   <p class="card__description card__description--dark"></p>
</div>
```

# Tên biến nhiều từ làm sao ? 
Viết tách ra với dấu “-”, hạn chế viết tắt - trừ khi là các từ thông dụng.\
Ví dụ: ``category-box``

# Kết luận:stuck_out_tongue_winking_eye::
Đây là  rất hay để viết CSS mà được coi là tiêu chuẩn, để mọi người trong cùng dự án có thể đọc và hiểu một cách nhanh chóng. BEM sẽ hữu dụng hơn khi được kết hợp với SASS.

*Nguồn: https://medium.com/@basterrika/bem-will-make-you-happy-ab0d0a821226*