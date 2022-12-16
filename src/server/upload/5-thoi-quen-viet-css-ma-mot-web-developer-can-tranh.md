Nhiều người nghĩ Css rất khó học. Bởi có rất nhiều trường hợp lỗi xảy ra mà chúng ta không thể tìm được nguyên nhân, cần phải hiểu rõ và sử dụng một cách cẩn thận các thuộc tính Css nếu không chúng rất dễ phản tác dụng. Dưới đây là 5 thói quen viết Css của nhiều developer mà bạn cần tránh.

# 1. Đặt Margin hoặc Padding và sau đó lại hoàn tác chúng
Bây giờ hãy đặt ra một ví dụ nhỏ thế này, bạn có 3 phần tử **.item** ngang hàng nhau. Bạn muốn set margin-right cho phần tử thứ 1 và 2.

Trong trường hợp này sẽ có nhiều bạn sử dụng cách dưới đây

```css
.item {
  margin-right: 1.6rem;
}

.item:last-child {
  margin-right: 0;
} 
```

Cách này tuy đáp ứng được yêu cầu của bạn nhưng nó không phải cách tốt nhất, thay vào đó hãy sử dụng các cách sau

Cách 1 sử dụng **:not()** kết hợp **:last-child**, cách này sẽ set Css cho tất cả phần tử  ngoại trừ phần tử cuối cùng (**:last-child**) nằm trong **:not()**, trường hợp này ta có thể thay **:last-child** bằng **:nth-child(3)**

```css
.item:not(:last-child) {
  margin-right: 1.6rem;
}
```

Cách 2 sử dụng **:nth-child**, cách này sẽ set Css cho phần tử thứ 1 và 2 

```css
.item:nth-child(n+2) {
  margin-left: 1.6rem;
}
```

Hoặc bạn cũng có thể sử dụng **Adjacent sibling combinator**
```css
.item + .item {
  margin-left: 1.6rem;
}
```

# 2.Thêm thuộc tính display: block cho các phần tử với position: absolute hoặc position: fixed

Một lỗi mà chúng ta hay mắc phải nữa đó là set thuộc tính **display: block** cho các phần tử đã có sẵn thuộc tính  **position: absolute** hoặc **position: fixed**. Tại sao không nên làm như vậy ? Đơn giản là vì các phần tử có **position: absolute** hoặc **position: fixed** đã bao gồm cả  thuộc tính **display: block** .

Ngoài ra, khi 1 phần tử đã có thuộc tính **position: absolute** hoặc **position: fixed** thì tất cả thuộc tính **inline-** lên nó đều vô tác dụng. Nếu là **inline** hoặc **inline-block** -> **block**,  **inline-flex** -> **flex**, **inline-grid** -> **grid**, và **inline-table** -> **table**.
Vì vậy, chỉ viết **position: absolute** hoặc **position: fixed** đi chung với **display: flex** hoặc **display: grid**.

Đừng làm thế này
```css
.button::before {
  content: "";
  position: absolute;
  display: block;
}
```

cũng đừng làm thế này

```css
.button::before {
  content: "";
  position: fixed;
  display: block;
}
```

Hãy làm thế này

```css
.button::before {
  content: "";
  position: absolute;
}
```

hoặc thế này

```css
.button::before {
  content: "";
  position: fixed;
}
```

# 3. Sử dụng transform: translate (-50%, -50%) để canh giữa
Để thiết lập vị trí chính giữa cho 1 phần tử chắc hẳn nhiều bạn đã từng sử dụng cách này

```css
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

Cách này đã từng gây tranh cãi rất nhiều vì nó gây ra rất nhiều khó khăn, đặc biệt là sự cố văn bản mờ trong các trình duyệt dựa trên Chromium. Sau đó, flexbox ra đời và chúng ta có 1 kỹ thuật tuyệt vời hơn để canh giữa phần tử.

```css
.parent {
  display: flex;
}

.child {
  margin: auto;
}
```

# 4. Sử dụng width: 100% cho các Block Elements
Để chuyển đổi các phần tử được sắp xếp từ dạng nhiều hàng và cột thành dạng chỉ có 1 cột duy nhất nhiều bạn sẽ làm thế này

```html
<div class="parent">
  <div class="child">Item 1</div>
  <div class="child">Item 2</div>
  <div class="child">Item 3</div>
  <div class="child">Item 4</div>
</div>
```

```css
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

Cách này thực sự không hay vì bản thân các Block Elements đã có sẵn  **width: 100%;** và sắp xếp trên từng dòng riêng biệt, thay vào đó hãy thử cách ngắn gọn hơn

```html
<div class="parent">
  <div class="child">Item 1</div>
  <div class="child">Item 2</div>
  <div class="child">Item 3</div>
  <div class="child">Item 4</div>
</div>
```

```css
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

# 5. Đặt display: block cho các Flex Items

Khi bạn sử dụng flexbox, các phần tử được hiển thị linh hoạt hơn. Nhưng nếu bạn đặt thuộc tính **display: block** cho các **flex elements** thì chúng sẽ mất hết các thuộc tính **inline**. Theo đó, nếu bạn đặt **inline** hoặc **inline-block** -> **block**, **inline-flex** -> **flex**, **inline-grid** -> **grid**, và **inline-table** -> **table**.

Đừng làm thế này

```css
.parent {
  display: flex;
}

.child {
  display: block;
}
```

hãy làm thế này

```css
.parent {
  display: flex;
}
```

# Kết luận
Hy vọng 1 vài thủ thuật nhỏ của mình sẽ giúp các bạn dễ thở hơn với Css. Cảm ơn vì đã đọc.

Nguồn : https://betterprogramming.pub/5-css-practices-to-avoid-as-a-web-developer-1b7553c05131