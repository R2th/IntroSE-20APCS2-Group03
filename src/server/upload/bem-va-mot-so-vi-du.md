Ở bài trước mình đã giới thiệu qua về BEM - Block Element Modifer rồi, bây giờ mình sẽ lấy một ví dụ cụ thể hơn nữa cho các bạn hình dung về BEM cho dễ hàng nhé :grinning:
mình sẽ ví dụ theo từng thành phần của BEM là Block - Element - Modifer.

### B for Block

Mình sẽ lấy cấu trúc của một con người để các bạn dễ hình dung, xem ảnh dưới đây:

![](https://images.viblo.asia/2b66f36a-33d0-4ef5-880e-290e0b37073b.png)

Đầu tiên chúng ta sẽ bắt đầu bằng một **Block** gọi là ```.person``` thì tương ứng với một class như sau:

```css
.person {
    backgroud: blue;
}
```

### E for Element

Tiếp theo, như bạn cũng biết để cấu tạo nên một cơ thể người hoàn chỉnh thì sẽ bao gồm các thành phần như chân, tay, mắt, ... Thì ở đây Element sẽ được hiểu theo như mỗi một thành phần cấu tạo nên Block.

![](https://images.viblo.asia/a1787aeb-8adb-43ae-8889-1bd29911eeb1.png)

Quan sát các hình ảnh sẽ thấy rằng trong class ```.person``` kia sẽ bao gồm nhiều class con của nó như  ```.person__eye```  ```.person__head```  ```.person__mouth```, ... Khi đó viết css kết hợp với Sass sẽ như sau:

```css
.person {
    // dấu & ở đây sẽ được hiểu là nó sẽ phụ thuộc thằng cha của nó, khi mix ra file css thì sẽ là .person .person__eye
    &__eye {
        // còn dấu __ thì mình cũng giải thích ở bài trước rồi
        color: brown;
    }
    &__mouth {
        color: pink;
    }
}
```

### M for Modifer

Cuối cùng khi mà chúng ta cần thêm mỗi ```.person``` nữa nhưng sẽ khác với ```.person``` cũ thì sẽ như thế nào?

![](https://images.viblo.asia/277539fd-76fe-4fe1-b2c6-55d54e3e53ce.png)

Khi đó thì mình sẽ dùng Modifer của BEM bằng hai dấu gạch ngang để phần biệt với ```.person``` cũ, như sau:

```css
.person {
    &__eye {
        color: brown;
    }
    &__mouth {
        color: pink;
    }
    &--child {
        width: 50%;
    }
}
```

Nó cũng giống như mình custom một button bên dưới sẽ có nhiều backgroud khác nhau vậy và sẽ không phải tạo Block Button nhiều lần nữa, tiết kiệm được khác nhiều thời gian phải không nào :)))
```css
/* Block */
.btn { /* styling here */ }

/* Modifiers */
.btn--red { background: #efb5b5; }
.btn--blue { background: #aed7ea; }
.btn--green { background: #afdeb5; }
.btn--yellow { background: #f8d892; }
```
và đây bên markup:
```html
<a href="#" class="btn btn--red">Button Red</a>
```

Vậy là mình đã có 2 person khác nhau rồi, mình mong qua ví dụ trên thì các bạn có thể hiểu rõ hơn cách sử dụng BEM, cách phân biệt giữa các thành phần Block - Element - Modifer (vì mình cũng toàn bị nhầm giữ Element và Modifer thôi :joy:)

Mình cũng có làm 1 ví dụ nho nhỏ ở đây, các bạn có thể tham khảo nhé: https://jsfiddle.net/VietNC/mg796tp8/15/

Cảm ơn các bạn đã dành thời gian đọc bài chia sẻ của mình, thankyou :hugs:

### Bài viết tham khảo
- http://getbem.com/naming/
-  https://medium.com/tech-tajawal/bem-simple-naming-convention-for-css-classes-9660438d04a2