Khi viết css cho thẻ a, chúng ta có thể customize màu chữ với thuộc tính ``color``, việc này cũng đồng nghĩa màu gạch dưới của thẻ a cũng có màu như màu text.
Vì lý do đặc biệt nào đó bạn muốn màu của chữ khác với màu gạch chân thẻ a thì phải làm thế nào ? 

Có nhiều cách để thực hiện, trong bài viết này hãy cùng mình học cách làm sử dụng thuộc tính ``box-shadow``.

![](https://images.viblo.asia/ff7fe7fb-e8d7-4dd7-a001-70ef6959553e.gif)


Trước tiên tạo một thẻ a bằng html:
```html
<a href="/">Sun Asterisk</a>
```

Với cách làm này chúng ta cần tắt thuộc tính ``text-decoration`` bằng cách đặt giá trị ``none``, khi đó thẻ a không còn gạch dưới.
Tiếp theo chúng ta thêm thuộc tính ``box-shadow`` với giá trị là ``0 3px red`` để tạo gạch chân cho thẻ a với màu đỏ, nhưng nó sẽ hơi sát với text nên chúng ta thêm ``padding`` cho nó. Ngoài ra chúng ta thêm màu đen cho chữ.

```css
a {
    text-decoration: none;
    box-shadow: 0 3px tomato;
    padding: 4px;
    color: black;
}
```

Bây giờ thẻ link a đã có màu và gạch chân nhưng nó không đổi màu khi chúng ta hover chuột vào, để làm chúng ta thêm css cho selector hover như sau: 

```css
a:hover {
    color: orangered;
    box-shadow: 0 3px yellow;
}
```

Bây giờ thẻ đã có gạch chân màu vàng khi hover nhưng cảm giác nó hơi bị giật, để cho nó mượt hơn chúng ta sử dụng thuộc tính ``transition``

```css
transition: box-shadow 0.3s;
```

Cuối cùng ta có CSS như sau:
```css
a {
  text-decoration: none;
  box-shadow: 0 3px red;
  padding: 4px;
  color: black;
  transition: box-shadow .4s, color .3s;
}

a:hover {
  color: orangered;
  box-shadow: 0 3px yellow;
}
```

{@codepen: https://codepen.io/dat08/pen/GRjvRYw}

Bài viết đến đây là hết rồiiiii. Cảm ơn bạn đã dành thời gian học cùng mình :scream::kissing_heart::kissing_heart: 

*Nguồn:* https://dev.to/phongduong/custom-link-underline-with-css-box-shadow-2h93