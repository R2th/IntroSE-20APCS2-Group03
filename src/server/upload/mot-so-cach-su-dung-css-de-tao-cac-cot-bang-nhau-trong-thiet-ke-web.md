## 1. Lời mở đầu
Các cột có chiều cao bằng nhau thường xuất hiện trong việc thiết kế giao diện web. Nếu các cột thiết kế trên cùng một giao diện mà chiều cao của các cột không bằng nhau sẽ ảnh hưởng đến việc thiết kế giao diện của khối cũng như tổng thể toàn trang. Vài năm trước, chúng ta đã có thể sử dụng thuộc tính cở bản của `table` để tạo ra các cột bằng nhau. Hiện nay, chúng ta đã có các giải pháp đơn giản hơn để tạo chiều cao cột bằng cách sử dụng CSS3. Sau đây là một số cách cơ bản để các cột có chiều cao bằng nhau trên web.
## 2. Sử dụng các thuộc tính CSS của bảng (Table properties)
Đầu tiên chúng ta phải kể đến đó là cách sử dụng thuộc tính của `table` , đây là cách mà được khá nhiều người xử dụng từ trước đến nay. Vì ngoài khả năng tạo ra các cột có chiều dài bằng nhau còn có thể căn chỉnh nội dung theo `top` `center` hoặc `bottom`.
    
**HTML:**
```
<h3> Using table properties</h3>
<div class="col-wrap">
    <div class="col">
        <h2>Column 1</h2>
        <p>Hello World</p>
    </div>

    <div class="col">
        <h2>Column 2</h2>
        <p>Hello World!</p>
        <p>Hello World!</p>
        <p>Hello World!</p>
        <p>Hello World!</p>
    </div>

    <div class="col">
        <h2>Column 3</h2>
        <p>Some other text..</p>
        <p>Some other text..</p>
    </div>
</div>
```
**CSS:**
```
.col-wrap {
    display: table; 
    width: 100%; 
}

.col {
    display: table-cell;
    padding: 1rem
}
.col:nth-child(even){
    background-color:orange;
}
.col:nth-child(odd){
    background-color:yellow;
}
```
## 3. Sử dụng CSS grid
Phương pháp tiếp theo tôi nhắc đến là phương pháp sử dụng grid. Phương pháp này hơi phức tạp hơn một chút bởi bạn cần tính toán chiều rộng của các cột bên trong phần tử cha bằng cách sử dụng `grid-template-columns`.

**Ví dụ:**
    
   - Nếu muốn chia 2 cột thì ta có: `grid-template-columns: 50% 50%`

Ngoài ra để 2 cột có chiều cao bằng nhau và khoảng cách giữa 2 cách nhau 1 khoảng cách nhất định ( giống như cột `col` của bootstrap ) ta sử dụng `grid-column-gap`

**Ví dụ:** 
    
   * khoảng cách giữa 2 cột là 30px: `grid-column-gap: 30px`
* Một chú ý nhỏ là khi sử dụng `grid-column-gap` thì độ rộng của các phần tử con sẽ tăng lên như ví dụ trên khi sử dụng cùng lúc `grid-template-columns: 50% 50%`, và `grid-column-gap: 30px` thì độ dài các phần tử con sẽ bằng `50% + 50% + 30px` như vậy sẽ bị thừa ra 30px và sẽ xuất hiện scroll. Để khắc phục tình trạng này ta nên sử dụng công thức dưới dây:
    
> W(adjusted) = W(individual) - (1rem * 1/2) 

Trong đó : 

* W(individual): là độ rộng của 1 cột
* 1rem: là khoảng cách mà `grid-column-gap` đã sử dụng có thể thay đổi `1rem` bằng đơn vị bất kì

Sau đây là ví dụ cụ thể:

**HTML:**
```
<h3> Using css grid</h3>
<div class="g-grid">
    <div class="g-grid-col">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia molestiae iure, a laboriosam facere consequuntur repellendus aspernatur porro ut. Doloremque fugiat saepe maiores.
    </div>
    <div class="g-grid-col">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto incidunt, accusantium, cumque obcaecati similique et ducimus inventore fugiat velit exercitationem dolorem iusto porro repellat accusamus quia eum, quos eveniet expedita!. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto incidunt, accusantium, cumque obcaecati similique et ducimus inventore fugiat velit exercitationem dolorem iusto porro repellat accusamus quia eum, quos eveniet expedita!
    </div>
</div>
```

**CSS**
```
.g-grid {
    display: grid;
    /* W(adjusted) = W(individual) - (1rem * 1/2) */
    grid-template-columns: calc(50% - (30px * 1/2)) calc(50% - (30px * 1/2));
    grid-column-gap: 30px;
}

.g-grid-col {
    padding: 30px;
    background-color: red;
    color: #fff;
}
```

## 4. Sử dụng CSS Flexbox
Sử dung flexbox là cách tiếp cận mới và sử dụng dễ dàng hơn. Không những có thể tạo ra được các cột bằng nhau giống như `table` mà còn khắc phục được nhược điểm của `table` đó là khả năng thay đổi vị trí của các cột chỉ bằng cách sử dụng `order`, đặt thứ tự của chúng đến vị trí mong muốn. Chính vì sự cơ động này Flexbox hiện nay được sử dụng khá nhiều trong các UI framework

**HTML**
```
<div class="f-grid">
    <div class="f-grid-col">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae, nulla! Assumenda dignissimos harum, molestias iure repudiandae ratione praesentium. Illo facilis et velit ut quam omnis, porro molestiae magni, laboriosam ipsa.
    </div>
    <div class="f-grid-col">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non, quaerat blanditiis. Eligendi quae tenetur ratione repellendus ut.</div>
    <div class="f-grid-col">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae, nulla! Assumenda dignissimos harum, molestias iure repudiandae ratione praesentium. Illo facilis et velit ut quam omnis, porro molestiae magni, laboriosam ipsa.
    </div>
</div>
```

**CSS**
```
.f-grid {
    display: flex;
    justify-content: space-between;
    margin-left: -1rem;
    flex-flow: row wrap;
}

.f-grid-col {
    flex: 1 0;
    background-color: green;
    margin-left: 1rem;
    margin-bottom: 1rem;
    padding: 1rem;
}
```

**Demo:**

{@codepen: https://codepen.io/TrinhThang/pen/WaMRWR}
## 5. Kết luận
Đó là một số cách tạo ra các cột bằng nhau với css hiện nay, bạn có thể chọn một trong các cách trên trên để tạo giao diện web đẹp mắt. Phương pháp đơn giản, tối ưu và được sử dụng phổ biến nhất hiện nay là sử dụng css flexbox.