Chắc hẳn, làm việc với CSS thì mọi người cũng từng nghe tới khái niệm variables,

Ta có thể khai báo variables trong CSS như sau
```css
:root {
    --red: #000;
    --blue: #fff;
    --width: 99px;
}
```
Và sau đó dùng lại các variables này ở nhiều chỗ, qua đó giúp việc maintain code dễ hơn
```css
p {
    color: var(--red);
}

h1 {
    color: var(--blue);
}
```

Ngoài cách dùng này ra, chúng ta còn có thể override lại các variables để giảm thiệu việc phải viết lại code nhiều lần.
### Override variables
Giả sử ta có những element sau
```html
<div class='box'></div>
<div class='box.box--big'></div>
<div class='box.box--rotate'></div>
<div class='box.box--big.box--rotate'></div>
```
Để áp dụng các modifier cho class `box` ta sẽ phải viết như sau
```css
.box {
    transform: scale(1.2) rotate(5deg) // trạng thái cơ bản của box
}

.box--big {
    transform: scale(2) rotate(5deg) // modifier cho box to ra nhưng vẫn phải giữ nguyên trạng thái rotate cơ bản của box
}

.box--rotate {
    transform: scale(1,2) rotate(45deg) // modifier cho box rotate nhưng vẫn phải giữ nguyên scale cơ bản của box
}

.box--big.box--rotate {
    transform: scale(2) rotate(45deg) // kết hợp cả 2 modifier thì cần phải sửa lại đơn vị của scale và rotate
}
```
Như trên thì ta thấy việc viết bình thường mất rất nhiều code, và đây là lúc mà CSS variables phát huy tác dụng của nó
```css
:root {
    --scale: 1.2;
    --rotate: 5deg;
}

.box {
    transform: scale(var(--scale)) rotate(var(--rotate)) // trạng thái cơ bản của box
}

.box--big {
    --scale: 2; // ta chỉ cần override lại variable --scale, sẽ không ảnh hưởng đến rotate
}

.box--rotate {
    --rotate: 45deg; // ta chỉ cần override lại variable --rotate, sẽ không ảnh hưởng đến scale
}

.box--big.box--rotate {} // k cần phải kết hợp cả 2 modifier vì đoạn code 2 modifier ở trên k làm ảnh hưởng đến nhau
```
Ngoài trường hợp trên, chúng ta có thể áp dụng cách nào vào nhiều trường hợp khác nữa

Việc sử dụng CSS variables sẽ giúp chúng ta tránh phải lặp lại code nhiều lần