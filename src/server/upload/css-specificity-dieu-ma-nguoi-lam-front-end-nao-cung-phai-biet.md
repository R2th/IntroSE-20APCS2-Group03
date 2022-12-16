Khi học về CSS chắc hẳn ai cũng phải nghe đến khái niệm về CSS Specificity. Nếu bạn không nắm rõ về khái niệm này bạn sẽ không biết làm thế nào để có thể override được một thuộc tính trong CSS hay bạn sẽ gặp phải một số trường hợp như bạn muốn chuyển từ tiều đề từ màu xanh sang màu đỏ nhưng khi bạn đã thêm `class` có thuộc tính màu đỏ rồi nhưng tại sao tiêu đề đó vẫn có chữ màu xanh?. Vậy CSS Specificity là gì? Cách tính toán nó như thế nào? Trong bài viết này chúng ta cùng tìm hiểu về nó nhé.

# CSS Specificity là gì?

CSS Specificity là độ ưu tiên hay cách mà trình duyệt quyết định xem thuộc tính nào trong CSS sẽ được áp dụng cho phần tử được style (giả sử một phần tử có nhiều class có cùng 1 thuộc tính thì trình duyệt sẽ dựa vào CSS Specificity để quyết định xem thuộc tính nào sẽ được áp dụng lên phần tử đó). Specificity dựa trên những quy tắc phù hợp với những bộ CSS selectors khác nhau.

Khái niệm thì nôm na nó là như vậy nhưng để tìm hiểu kỹ về nó mình và các bạn sẽ cùng lần lượt đi qua nhũng ví dụ để hiểu rõ hơn về Specificity. Ta có một ví dụ như sau.

```HTML
<div class="card">
    <h1 class="card-title">CSS Specificity</h1>
    <p class="card-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis recusandae quaerat asperiores minima laborum tempore omnis necessitatibus, labore eum natus!</p>
</div>
```

```CSS
.card-title-1 {
    color: red;
}

.card-title-2 {
    color: goldenrod;
}
```

![](https://images.viblo.asia/7ccb6e3b-15dd-4203-b525-f84d236b9b6c.png)

Nếu mình thêm cho phần tử `h1` 2 class là `.card-title-1, .card-title-2` thì bạn nghĩ xem chữ sẽ được đổi sang màu `red` hay màu `goldenrod`. Câu trả lời là màu `goldenrod` vì tuy thuộc tính này đều thuộc 2 class nhưng do trong CSS nếu những thuộc tính đó cùng cấp thì thuộc tính đứng sau sẽ được override thuộc tính đứng trước. Ví dụ này rất đơn giản những hồi khi mình mới học đã từng bị trường hợp như vậy, học đến phần bắt sự kiện trong DOM thì mình có thực hành đổi màu chữ của header nhưng khi minh đã thêm được class có màu chữ đó vào header bằng Javascript rồi nhưng màu chữ vẫn được giữ nguyên và không hiểu tại sao lại như thế, đi hỏi khắp thì mới biết đến cái này =)) (sad).

Tiếp theo mình sẽ đổi class `card-title-1` thành id và thêm nó vào `h1` xem kết quả như thế nào nhé.

```CSS
#card-title-1 {
    color: red;
}

.card-title-2 {
    color: goldenrod;
}
```

Các bạn có thể thấy chữ đã được đổi sang màu đỏ. Vậy tại sao chữ lại đổi sang màu `red` mặc dù thuộc tính `color: goldenrod` được định nghĩa ở phía dưới và đều được áp dụng vào phần tử đó nhưng chữ lại có màu `red` thay vì màu `goldenrod`. Đó là vì id trong CSS có độ ưu tiên cao hơn so với class nên nó áp dụng style id vào phần tử đó. Vậy làm sao để biết thuộc tính nào sẽ được áp dùng cho phần tử đó ta cùng tìm hiểu đến phần tiếp theo là cách tính CSS Specificity bên dưới.

# Cách tính CSS Specificity

Ta có công thức độ ưu tiên như sau như sau:
```
(Style atribute(inline CSS)) -> (ID) -> (Class, pseudo-class, attribute) -> (Elements)
```

Các thuộc tính này sẽ đều có điểm và có độ ưu tiên giảm giần. Ta sẽ xét từ độ ưu tiên từ cao đến thấp, nếu điểm bằng nhau thì ta xét tiếp độ ưu tiên thấp hơn .Để rõ hơn về cách tính điểm ta sẽ đi tiếp đến một ví dụ bên dưới.

```HTML
<div class="list">
    <ul>
        <li>Item1</li>
        <li>Item2</li>
        <li>Item3</li>
        <li>Item4</li>
        <li>Item5</li>
    </ul>
</div>
```

![](https://images.viblo.asia/a9711497-784f-4e68-b64d-bbe8c64773b0.png)

Ta có CSS như sau:
```CSS
.list ul li {
    color: red;
}

div ul li {
    color: green;
}
```

Tương ứng với nó ta có CSS Specificity:

| Style | CSS Specificity |
| -------- | -------- |
| `.list ul li`     | (0, 0, 1, 2)     |
| `div ul li`     |  (0, 0, 0, 3)     |

Vì `.list ul li` có điểm class là 1 và  `div ul li`  có điểm là 0 nên màu sẽ `red` sẽ được áp dụng (bất kể điểm đằng sau có lơn bao nhiêu đi nữa nhưng vì độ ưu tiên thấp hơn nên ta sẽ xét từ dộ ưu tiên cao).

![](https://images.viblo.asia/e41a8f4f-2aad-403d-aaba-ee46dc9f0d3d.png)

Tiếp đến ta có:

```CSS
.list ul li {
    color: red;
}

body .list ul li {
    color: yellow;
}
```

| Style |  CSS Specificity |
| -------- | -------- | -------- |
| .list ul li     | (0, 0, 1, 2)     |
| body .list ul li     | (0, 0, 1, 3)     |

Vì ta có điểm đều bằng 1 nên ta sẽ xét đến mức ưu tiên tiếp theo là `Element` ở đây `body .list ul li` có điểm cao hơn nên thuộc tính `color: yellow` sẽ được áp dụng.

![](https://images.viblo.asia/924b6e2e-362a-4d81-92b2-97759cbd1028.png)

Tương tự như vậy các điểm của `Inline CSS` hay `ID` sẽ cũng được tính như vậy.

# Lưu ý

CSS có một "vũ khí tối thượng" để override đó là `!important`. Khi thuộc tính nào có kèm theo `!importan` thì nó sẽ bỏ qua mọi CSS Specificity kể cả là `inline CSS` và áp dụng thuộc tính đó vào phần tử. Để có thể override được `!importan` thì ta chỉ còn cách là định nghĩa nó xuống dưới thuộc tính `!important` muốn override. Tuy có sức mạnh to lớn là vậy những ta không nên lạm dùng thuộc tính này vì khi cần bảo trì hay maintain sau này sẽ rất khó. Ta có một ví dụ về `!important` bên dưới.

```CSS
.list ul li {
    color: red;
}

li {
    color: white !important;
}
```

![](https://images.viblo.asia/5d5fdb45-c890-4737-9458-9ad3fea2ffaf.png)

# VSCode và CSS Specificity

Có một trick cho những người sử dụng VSCode đó là VSCode có hỗ trợ sẵn cho việc tính  CSS Specificity nhưng chỉ ở mức `(ID)` là cao nhất. Khi code CSS các bạn chỉ cần hover vào là có thể thấy được CSS Specificity. Thật tiện lợi phải không nào ^^.

![](https://images.viblo.asia/f28bfc4a-c790-43bf-ba2f-25f3cd1a3b83.png)

# Tổng kết

Qua bài viết này mình và các bạn đã cùng tìm hiểu về CSS Specificity. Hy vọng qua bài viết này các bạn có thể áp dụng và sử dụng được thành thạo CSS Specificity. Cảm ơn các bạn đã theo dõi đến hết bài viết ❤️.