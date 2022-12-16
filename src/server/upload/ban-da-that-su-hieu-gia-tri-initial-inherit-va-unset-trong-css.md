Trong bài viết này chúng ta sẽ cùng tìm hiểu về 3 khái niệm trong CSS là: `initial`, `inherit`, và một cái tương đối mới, `unset`. 

Có lẽ nhiều người thi thoảng vẫn dùng đến nó, nhưng chưa chắc đã thật sự hiểu về nó. Mọi người thường chỉ hiểu đơn giản nó dùng để reset các style trong CSS, nhưng nếu đều dùng để reset thì sao phải cần nhiều như vậy? Chính xác sự khác biệt giữa chúng là gì?

## Các kiểu cơ bản của website
Trước khi tìm hiểu về 3 khái niệm này, chúng ta cần hiểu thêm một chút về gốc rễ giá trị của các thuộc tính.
### Style gốc của mỗi thuộc tính trong CSS
Mỗi thuộc tính trong CSS đều có 1 style gốc, nó ko liên quan đến việc được dùng cho phần tử HTML nào. 

Ví dụ `line-height` có style gốc là `normal`

![](https://images.viblo.asia/9ec74beb-787c-46b8-9d68-6cdf00662e8c.jpeg)

### Style của trình duyệt
Sau khi áp dụng các style gốc của thuộc tính, trình duyệt sẽ load các style của bản thân trình duyệt, cái này không liên quan đến style gốc của thuộc tính.

Ví dụ
![](https://images.viblo.asia/4d6631ae-f173-4c2e-81fe-91f0cae64ee8.png)

Các phần tử HTML không có style gốc, các style mặc định của nó, ví dụ như thẻ `<h1>` ở trên đến từ style của trình duyệt, nên có thể style mặc định của cùng 1 phần tử HTML ở các trình duyệt khác nhau lại khác nhau. 

**OK, giờ vào phần chính của bài viết!**
## Keyword Inherit
Giống như tên gọi của nó là kế thừa, từ khóa này sẽ yêu cầu trình duyệt tìm kiếm giá trị của phần tử cha gần nó nhất, và sử dụng lại cái đó. Nếu như phần tử cha gần nhất của nó cũng có giá trị `inherit` thì nó sẽ tiếp tục tìm đi lên cho đến khi thấy giá trị nào đó. Nếu vẫn không có giá trị nào, nó sẽ sử dụng style của trình duyệt, nếu cũng không có, nó sẽ sử dụng style gốc của thuộc tính.
## Keyword Initial
Quay lại những gì vừa nói ở trên, mỗi thuộc tính đều có style gốc của nó, thì từ khóa này sẽ yêu cầu trình duyệt sử dụng style gốc của nó.

Ví dụ: Style gốc của thuộc tính `display` là `inline`, cho mọi phần tử, còn style của trình duyệt set cho thẻ `<div>` là `display: block`. Nếu thẻ `<div>` được gán giá trị `initial`, thì nó sẽ nhận giá trị `inline` thay vì `block`.
## Keyword Unset
Đây là từ khóa duy nhất hoạt động khác nhau trên các kiểu thuộc tính khác nhau. Trong CSS, có 2 kiểu thuộc tính:
* **Inherited properties** (thuộc tính kế thừa): Thuộc tính sẽ ảnh hưởng tới các phần tử con của nó. Tất cả các thuộc tính liên quan đến text đều thuộc kiểu này. Ví dụ như chúng ta định nghĩa font-size cho 1 phần tử HTML, thì nó sẽ áp dụng cho tất cả các phần tử HTML con, trừ khi bạn set riêng font-size cho một phần tử cụ thể. 

![](https://images.viblo.asia/2ee8774a-0b0d-40a0-bf44-27c630c010fd.png)

* **Non-inherited properties** (thuộc tính không kế thừa): thuộc tính này chỉ ảnh hưởng tới phần tử sử dụng nó, là các phần tử mà không áp dụng cho text. Ví dụ, bạn set `border` cho phần tử cha, thì phần tử con vẫn không có `border`

![](https://images.viblo.asia/385c6690-d2f6-40a0-b7fa-11c68d7ef3c0.png)

`unset` hoạt động giống như `inherit` với kiểu thuộc tính kế thừa. Ví dụ như thuộc tính `color`, nó sẽ hoạt động giống như `inherit`, tức là tìm giá trị của phần tử cha gần nhất, và tìm ngược lên trên giống như giải thích phía trên. 

Với kiểu thuộc tính không kế thừa, `unset` hoạt động giống `initial`, tức là lấy style gốc. Ví dụ với `border-color` nó sẽ hiểu là `initial`
```
.some-class{ 
   color: unset; /* bằng với 'inherit' */ 
   display: unset; /* bằng với 'initial' */
}
```
### Tại sao lại sử dụng unset nếu nó hoạt động giống như inherit và initial

Nếu **unset** hoạt động giống `initial` và `inherit`, vậy tại sao ta lại muốn sử dụng `unset` ?

Nếu ta chỉ cần reset 1 thuộc tính, vậy thì `unset` là không cần thiết; ta có thể sử dụng `inherit` hay `initial`.

Nhưng giờ ta đã có một thuộc tính mới gọi là `all` đi kèm một tính năng mới: có thể reset cả các ** thuộc tính được kế thừa** lẫn các **thuộc tính không được kế thừa**.

Theo cách mới này, ta không cần phải reset từng thuộc tính một. Thay vào đó, apply giá trị `unset` tới thuộc tính `all` sẽ reset tất cả các thuộc tính kế thừa về `inherit`, và các thuộc tính không kế thừa về `initial`

**Đây là lý do duy nhất cho sự tồn tại của giá trị `unset` !**

Ví dụ, thay vì reset từng thuộc tính lần lượt:

```
/* Bad */
.common-content *{ 
    font-size: inherit; 
    font-weight: inherit;
border-width: initial; 
    background-color: initial;
}
```

Ta có thể dùng thuộc tính `all` với giá trị `unset`, qua đó tác động tới tất cả các thuộc tính đang tồn tại:

```
/* Good */
.common-content *{ 
    all: unset;
}
```

Tôi đã viết một ví dụ nhỏ để minh họa cách các thuộc tính hoạt động khi sử dụng thuộc tính `all` với giá trị `unset`; một số hoạt động  như `inherit`, một số khác lại giống với `initial`. [Ví dụ đó đây.](https://codepen.io/elad2412/pen/QWWgKbB)

## Keyword `Revert`

Nhưng nếu như nếu ta muốn reset style của thuộc tính về style gốc của trình duyệt thay vì style gốc của thuộc tính đó ? Ví dụ, đảo ngược thuộc tính `display` của một `<div>` về `block` (style của trính duyệt) chứ không phải `inline` (style gốc CSS) ?

```
div {                    // user agent stylesheet
  display: block;
}
```

Vì lý do đó, ta có một keyword CSS mới: `revert`. Keyword này rất giống với `unset`, 
với một điểm khác nhau duy nhất đó là `revert` sẽ ưu tiên style của trình duyệt so với style gốc của thuộc tính. Ví dụ:

```
div{
    display: revert; /* = block */ 
}
h1{ 
    font-weight: revert; /* = bold */ 
    font-size: revert; /* = 2em */
}
```

Theo cách này, nếu ta muốn reset tất cả style của một tag HTML về style gốc của trình duyệt, ta có thể làm như sau:

```
/* Good */
.common-content *{ 
    all: revert;
}
```

Như thế, `revert` cung cấp cho ta khả năng còn mạnh mẽ hơn so với `unset`. Nhưng ở thời điểm hiện tại, `revert` chỉ hoạt động trên Firefox và Safari.

## Browser support

- `inherit` - hoạt động trên tất cả các trình duyệt, bao gồm cả IE 11
- `initial` và `unset` - hoạt động trên tất cả trình duyệt, ngoại trừ IE 11
- `revert` - hiện giờ chỉ hoạt động trên Firefox và Safari


Nguồn: https://medium.com/@elad/understanding-the-initial-inherit-and-unset-css-keywords-2d70b7121695