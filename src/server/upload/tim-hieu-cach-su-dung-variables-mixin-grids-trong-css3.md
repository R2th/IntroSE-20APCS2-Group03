# Mở đầu
Nếu bạn là 1 developer chuyên về website thì chắc các bạn phải biết về HTML và CSS. Hiện nay CSS3 đã không còn xa lạ với nhiều người nhưng để sử dụng hết các tính năng của nó thì chắc hẳn chưa có nhiều người có thể làm được việc đó. Sau đây mình xin được mạo muội giới thiệu một số tính năng của CSS3 mà sẽ giúp cho công việc css của các bạn trở nên dễ dàng hơn. Các tính năng này cho phép các developer thực hiện tính toán thông qua CSS, áp dụng các filter tuyệt vời cho hình ảnh bằng cách chỉ sử dụng một vài thuộc tính, tạo bố cục layout cho website mà không cần phải sử dụng nhiều thuộc tính khác mà chỉ cần grid chẳng hạn. Nào chúng ta cùng bắt đầu nào =))
# 1. CSS Variables
Với cách viết CSS trước đây thì các bạn thường xác định color hay width, height bằng 1 giá trị nhất định nhưng nếu như một ngày đẹp trời  khách hàng muốn thay đổi color của một sô chỗ có màu này sang màu khác, nếu với cách code cũ thì có thể bạn sẽ có một hay hơi vất vả nhưng với tính năng mới này của CSS3 thì mọi chuyện là easy.

> Các biến trong CSS phải được khai báo trong selector của CSS để xác định phạm vi của nó. Đối với biến toàn cục ảnh hưởng ở phạm vi toàn cầu, bạn có thể sử dụng selector :root hoặc body selector.
> 


-----



Tên biến phải bắt đầu bằng hai dấu gạch ngang (--) và phân biệt chữ cái hoa chữ thường!
 Hàm var () có thể được sử dụng để chèn giá trị của thuộc tính tùy chỉnh.
var(custom-property-name, value).

 Trong đó: 
 +   custom-property-name là bắt buộc ( chính là tên biến mà bạn muốn chèn).
 +   Value là giá trị mà bạn được dùng khi tên biến không hợp lệ.



Ví dụ:
```
:root {
  --main-bg-color: coral; 
}

#div1 {
  background-color: var(--main-bg-color); 
}

#div2 {
  background-color: var(--main-bg-color);
}
```
# 2. CSS Mixins
> Có khi nào bạn đọc lại những đoạn code Css của mình rồi cảm thấy sao nó lại lặp đi lặp lại những đoạn Css giống nhau rồi không biết phải làm như thế nào. Dùng class cũng được nhưng mà nhưng vậy quá nhiều class sẽ gây cho bạn khó kiểm soát.
Nhưng Css3 đã giúp chúng ta quản lý việc đó bằng mixins kết hợp @apply, nếu ai đã từng làm việc với SASS/LESS thì mixins không còn quá xa lạ nữa

Ví dụ:
```
button {
    display: block;
    margin: 10px;
    @apply --button-style;
}

:root {
    --button-style: {
        width: 300px;
        padding: 30px 20px;
        border-radius: 5px;
        background: blue;
        color: #fff;
        font-size: 54px;
        text-transform: uppercase;
    }
```

# 3. CSS Grids
Các bạn có khi nào gặp một bố cục layout khó nhai như vậy không? Nếu chỉ dùng width, float thì bạn có thể làm được nhưng cũng hơi mất time xíu. Nhưng khi bạn reponsive cho layout này thì nói thật time bỏ ra khá nhiều =))
![](https://images.viblo.asia/3ee6960a-01c8-4cde-a458-6ecd822d94e6.png)

Ví dụ:

```
.grid {
    display: grid;
    grid-template-columns: 200px 2fr 1fr;
    border: 1px solid red;
    grid-gap: 20px;
    grid-auto-rows: 200px;
}

.section {
    width: 60%;
    margin: 0 auto;
    background: #eee;
}

header {
    grid-column: 1/4;
    background: red;
}

```
Nhưng với thuộc tính `display: grid;`  thì việc đó thật easy trong 1 nốt nhạc.  Việc sử dụng thêm `grid-template-columns` và `grid-template-rows` sẽ giúp bạn làm việc trên nhiều dạng layout giống nhau và khi reponsive đối với màn hình nhỏ hơn thì thật dễ dàng.
Bạn có biết không ở Bootstrap cũng dùng grid như vậy, họ chia màn hình thành 12 cột và chia điều ra, thì với Grids bạn cũng có thể làm như vậy.

# Kết bài
Tuy mình là 1 developer full-stack nhưng qua những cái mình chia sẽ sẽ giúp ích cho mọi ngừoi và hy vọng mọi người có thể code ra những trang web đẹp hơn và chất lượng hơn.