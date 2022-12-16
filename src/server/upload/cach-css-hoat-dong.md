Nếu bạn là một developer chắc hẳn đã nge không dưới n lần về css nhỉ :smile:. Khi bắt đầu tạo một trang web, ngay cả trước khi bạn viết các file css để style cho trang web, trình duyệt sẽ sử dụng các styles cho trang web của bạn, nó được gọi là default styles.

Có bao giờ bạn tự hỏi ai là người quyết định những default style đó như thế nào chưa ?

Trong bài viết này, mình muốn chia sẽ sự khác nhau giữa các level của CSS trong trình duyệt, cách chúng làm việc và cách chúng ta sủ dụng chúng.

![](https://images.viblo.asia/33aadbd8-3e3c-400b-ae42-1a01037695ad.png)

MÌnh đã từng nghĩ các style cơ bản của trình duyệt đều đến từ file `User-Agent Stylesheet`.  Nếu bạn cũng nghĩ vậy thì cùng đến với phần tiếp theo của bài viết nhé !

## Level 1 - CSS Properties Default Styles

Mọi thưộc tính CSS đều có giá trị ban đầu (initial value). Giá trị này không phụ thuộc vào phần HTML mà nó áp dụng tới. Nghĩa là, giá trị ban đầu của thuộc tính được áp dụng cho tất cả các phần tử HTML theo cùng một cách.

Một số người sẽ không để ý đến điều cơ bản này.

### Initial Value

Mọi thuộc tính css đều có giá trị khởi tạo. Giá trị này không phụ thuộc vào phần tử HTML mà nó áp dụng. Nghĩa là, giá trị ban đầu của thuộc tính áp dụng cho tất cả các phần tử HTML theo cùng một cách.

Hãy cùng xem ví dụ dưới đây :

**Single style**
```
.some-class {
    position: absolute;
    top: 20px;
    left: 20px;
 }
```

**Bạn đã từng tự hỏi `default value` của thuộc tính `positions` là gì chưa ?**

Đây là câu trả lời :

**Basic styles**
```
    position: static; 
    top: auto; 
    bottom: auto;
    left: auto; 
    right: auto;
```

*Note:  Basic styles tồn tại trước khi bạn viết single style.*

Để xem value khỏi tạo của các thuộc tính trong css, bạn có thể vào trang [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/position#formal_definition) trong phần "Formal Definition".

### Inheritance

Định nghĩa thứ hai mà một số thuộc tính CSS có “hành vi kế thừa”. Hành vi này có nghĩa là một kiểu được áp dụng cho một phần tử sẽ được các phần tử con của nó kế thừa.

Theo mặc định, các thuộc tính chính có hành vi này là các thuộc tính về text, chẳng hạn như `font-family`, `font-size`, `color`, `text-align` và các thuộc tính [typography](https://medium.com/cssclass-com/css-basics-for-typography-160025e3aeca) khác.

vd: Khi bạn khai báo thẻ `<body>` có `font-size: 20px`,  tất cả các phần tử bên trong HTMl sẽ bị ảnh hưởng và thừa kế lại `font-size` đó cho tới khi bạn khai báo `font-size` mới chó các phần tử bên trong HTML.

Nhưng khi bạn khai báo `padding: 20px` trên phần tử HTML `<body>`, nó không ảnh hưởng đến các phần tử HTML bên trong. Điều này là do thuộc tính `padding` không có hành vi kế thừa theo mặc định.

**HTML**

```
<body>
   Some text in the body HTML element
   <div> some text on the div HTML element </div>
</body>
```

**CSS**

```
body{
  font-size: 20px; /* affects both the <body> and the <div> */
  padding: 20px;   /* affects only the <body> */
}
```

![](https://images.viblo.asia/ceb6e9ae-56b0-4df7-8a46-465eefd557e3.png)

**Làm thế nào chúng ta có thể biết liệu kiểu là "thuộc tính kế thừa" hay "thuộc tính không được kế thừa" khi debug trên trình duyệt?**

Khi chúng ta debug code ở trên bằng cách sử dụng tính năng “inspect element” trên phần tử HTML `div` , browser’s developer tools của trình duyệt sẽ cho chúng ta thấy  có các kiểu kế thừa từ phần tử HTML body.
    
Chúng ta sẽ thấy thuộc tính kích thước phông chữ có màu đậm vì đây là thuộc tính được kế thừa. Tuy nhiên, thuộc tính padding sẽ có màu nhạt vì không được kế thừa và không ảnh hưởng đến `div`.

![](https://images.viblo.asia/f4ffab3d-ed2f-41e2-a30f-6ad92438eeb1.jpeg)

Cách để biết liệu một thuộc tính có "hành vi kế thừa" hay không, ngoài việc tự mình thử nó, bạn có thể tìm trên trên trang web **MDN** trong phần “Formal Definition”.

![](https://images.viblo.asia/8e528525-bf42-42e8-9ae2-79815d6868ed.jpeg)

## Level 2 - User-Agent-Stylesheet

Theo mặc định, như chúng ta đã khám phá trong level 1, tất cả các phần tử HTML đều nhận được cùng giá trị cho tất cả các thuộc tính CSS. Theo `CSS Properties Initial Styles` (level- 1) thì tất cả các thuộc tính CSS chỉ có một giá trị ban đầu.

Nhưng bây giờ đến phần phân biệt giữa các loại phần tử HTML khác nhau - `User-Agent-Stylesheet` (level- 2).

“User-Agent-Stylesheet” (Level 2) là tệp CSS mặc định mà các trình duyệt triển khai trong trình duyệt của họ. Cấp độ này thiết lập kết nối trực tiếp giữa CSS và HTML bằng cách tạo các kiểu phân biệt giữa một số thẻ. Điều này là đối lập với `CSS Properties Initial Styles` (Mức-1) trong đó các kiểu ban đầu không liên quan đến các phần tử HTML.

Ví dụ: giá trị ban đầu của thuộc tính `display` luôn bằng `inline`. Nhưng như bạn có thể đã biết, phần tử HTML `<div>` có giá trị mặc định: `display: block`. Thay đổi này đến từ `User-Agent-Stylesheet` (level -2).

**Cách tốt nhất để hiểu những khác biệt này là kiểm tra các phần tử HTML `<span>` và `<div>`**:

- Khi chúng ta `inspect` phần tử `<span>` HTML, chúng ta sẽ không thấy bất kỳ kiểu nào. Đó là do dev tools không hiển thị cho bạn `CSS Properties Initial Styles` (level-1) trong bảng `inspect element` và kiểu tác nhân (`User-Agent-Stylesheet` (Level 2)) mà dev tools hiển thị, không có bất kỳ định nghĩa bổ sung nào cho phần tử `<span>` HTML.
Bạn không muốn thấy tất cả các thuộc tính CSS với giá trị ban đầu của chúng (theo “CSS Properties Default Styles” (level-1)) cho mọi phần tử HTML mà bạn đang debug.
Giá trị ban đầu của thuộc tính hiển thị là nội tuyến. Do đó, giá trị này không hiển thị trong trình gỡ lỗi “phần tử kiểm tra” trên trình duyệt của chúng tôi.

[medium](https://elad.medium.com/how-does-css-work-92fe7116916d)

**Còn tiếp**