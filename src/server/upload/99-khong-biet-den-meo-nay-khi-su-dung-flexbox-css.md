Hello lại là mình đây. Bài viết hôm nay mình sẽ giới thiệu tới mọi người một **trick** khá hay khi dùng CSS flexbox nhé.

Thực ra đây là do cách hoạt động của flexbox có hơi kì cục một chút, nếu không cẩn thận thì giao diện có thể bị overflow luôn. Nên mẹo này là dùng để khắc phục lỗi bất thường trên của flexbox. Ok cùng bắt đầu tìm hiểu ngay thôi.

## 1. Chia layout với flexbox

Để bắt đầu, mình sẽ đặt ra một bài toán đơn giản mà ai dùng flexbox cũng đều biết.

> Cho một div container ở ngoài, bên trong có 2 div con A và B. Code như thế nào để div A rộng 200px, và div B có width là phần còn lại.

Nói cho dễ hiểu, kết quả sẽ trông như thế này.

![](https://images.viblo.asia/8c9e757f-4fc6-4956-a07a-35beaaa41836.png)

Có nhiều cách để thực hiện layout trên, đơn giản nhất là biến B thành flexbox item (dùng `display: flex`) và:

* Set chiều rộng cho B là `width: calc(100% - 200px);`
* Dùng thuộc tính `flex: 1;` cho B

Với cách 1, bạn dùng hàm `calc()` để trừ đi width của A. Tuy nhiên nếu không biết được chiều rộng của A thì không dùng cách này được.

Vì vậy, chỉ còn lại cách dùng thuộc tính `flex: 1;`. Tuy nhiên, thuộc tính này có một **hành vi bất thường** được trình bày ngay ngay tiếp theo đây.

## 2. Lỗi overflow khi dùng `flex: 1;`

À quên, mình sẽ để thêm code ví dụ ở đây cho các bạn dễ hình dung nhé.

```index.html
<html>
<head>
    <link rel="stylesheet" href="./style.css">
</head>
<body>
    <div id="container">
        <div id="A">Đây là sidebar</div>
        <div id="B">Đây là content</div>
    </div>
</body>
</html>
```

```style.css
#container {
    width: 800px;
    height: 300px;
    display: flex;
}

#A, #B {
    border: 1px solid red;
    
    /* Căn giữa text */
    display: flex;
    justify-content: center;
    align-items: center;
}

#A {
    /* Chiều rộng A là cố định */
    width: 200px;
}

#B {
    /* Để B tự động căn vừa chiều rộng còn lại */
    flex: 1;
}
```

Bây giờ hãy thêm một div C nữa ngay bên trong div B. Div C mình sẽ cho nó `width: 1000px;` để kiểm tra thử.

```index.html
<div id="container">
    <div id="A">Đây là sidebar</div>
    <div id="B">
        <div id="C">Nội dung của C rất dài</div>
    </div>
</div>
```

```style.css
...

#C {
    width: 1000px;
    border: 1px solid green;
}
```

Và đây là kết quả :cry: Giao diện bị tràn ra ngoài, thanh cuộn (scrollbar) xuất hiện, giao diện bị vỡ hoàn toàn. Thật đáng sợ :scream: và làm tệ đi trải nghiệm người dùng.

![](https://images.viblo.asia/9af22062-7d58-4394-8913-1b44e4e4808a.png)

Sau một lúc tìm tòi trên mạng, mình biết được đây là do cách hoạt động **bất thường** của thuộc tính `flex: 1;`. Cụ thể như sau.

> By default, flex items won’t shrink below their minimum content size.
>
> Mặc định thì các mục flex item sẽ không thu nhỏ lại dưới mức chiều rộng nhỏ nhất của content.

Điều đó có nghĩa, nếu nội dung của flex item quá rộng (hoặc quá cao) thì flex item sẽ tự động dãn ra tương ứng, gây tràn (overflow) ra ngoài.

## 3. Giải pháp siêu hay, ít ai ngờ tới

Vậy giải pháp cho vấn đề này là gì. Rất đơn giản, chỉ cần thêm thuộc tính CSS sau `min-width: 0;`. Bất ngờ chưa :joy:

![](https://memegenerator.net/img/instances/81573525.jpg)

Đến mình còn bất ngờ nữa mà (bất ngờ tới khó hiểu), chỉ với thuộc tính đơn giản như vậy mà giao diện bị lỗi đã trở lại bình thường ngay.

```style.css
/* Thêm vào flex item là B chứ không phải C nha */
#B {
    ...
    min-width: 0;
}
```

![](https://images.viblo.asia/05d170c2-03ef-4bcf-a7a8-8503812b0e4c.png)

Điều này cũng áp dụng khi layout xếp theo chiều dọc (vertical). Đổi lại chỉ việc dùng `min-height: 0;` thay cho `min-width: 0;` là được.

Code mình share ở đây nhé https://codepen.io/tonghoangvu/pen/QWGOWpw.

---

Hi vọng qua bài viết trên các bạn đã học được mẹo hay khi làm việc với flexbox. Hãy thử nhớ lại xem bạn đã có project nào có layout tương tự thế, và liệu vấn đề như trên có xảy ra không? Hãy thử giải pháp ở trên, bạn sẽ bất ngờ vì lợi ích của nó đấy.

Bài viết đến đây là hết rồi. Nếu thấy hay và hữu ích đừng ngại ngần vote và clip cho mình nhé. Bye bye <3