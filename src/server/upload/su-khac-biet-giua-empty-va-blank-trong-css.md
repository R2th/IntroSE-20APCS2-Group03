### Tổng quan

Những người mới tìm hiểu cũng như những người đã có kiến thức CSS cơ bản thường hiểu chưa đúng về `:empty` và `:blank`. Hầu hết mọi người thường nghĩ `:empty` không hữu ích và `:blank` hữu ích hơn nhiều so với `:empty`.
Thực tế thì `:empty` thực sự đủ dùng và chúng ta thậm chí không cần đến `:blank`. Vậy `:empty` và `:blank` là cái quái quỷ gì?

### :empty và :blank là gì?

`:empty` là một pseudo selector. Nó cho phép bạn lựa chọn các phần tử rỗng hoặc chỉ chứa comment HTML.

```
:empty {
    /* do something here */
}
```

Các phần tử rỗng là các phần tử không chứa gì bên trong chúng. Nó cũng không thể chứa khoảng trắng. Chúng ta cùng xem một ví dụ về phần tử rỗng dưới đây:

```
<!-- Example of an empty element -->
<div></div>
```

Các phần tử rỗng có thể chứa các comment HTML.

```
<!-- Empty can have comments -->
<div><!-- this is a comment --></div>
```

`:blank` là một dạng khác mà `:empty` hỗ trợ. Giống như `:empty`, `:blank` sẽ lựa chọn những phần tử rỗng hoặc chỉ chứa comment HTML. Ngoài ra, `:blank` cho phép chúng ta chọn các phần tử có chứa các khoảng trắng bên trong phần tử. 

```
<!-- Matched with :blank but not with :empty -->
<div> </div>
```

### :empty và :blank trong các tình huống thực tế

Cả `:empty` và `:blank` hữu ích khi chúng ta cần:

+ Style một phần tử rỗng
+ Tạo trạng thái rỗng cho phần tử

##### - Style một phần tử rỗng

Giả sử chúng ta có một phần tử `<div>` . Bạn sẽ chỉ style cho phần tử này khi có lỗi xảy ra.

```
<!-- Without errors -->
<div class="error"></div>

<!-- With errors -->
<div class="error">Whoops! Something went wrong!</div>
```

Ở đây, chúng ta phải style cho phần tử có class là `.error`. Nếu chúng ta không dùng pseudo selector  `:empty` thì chúng ta cần phải sử dụng một **class** hoặc **attribute** để style. Điều này có vẻ hơi thừa thãi và không tối ưu.

```
<!-- With errors -->
<div class="error" data-state="error">Whoops! Something went wrong!</div>
```

```
.error {
  display: none;
  background-color: hsl(0, 20%, 50%);
  padding: 0.5em 0.75em;
}

.error[data-state="error"] {
  display: block;
}
```

Nhưng khi chúng ta sử dụng `:empty` thì không cần dùng **class** hoặc **attribute** . Chúng ta có thể style trực tiếp vào class `:error`. Chúng ta cũng không cần thuộc tính `display: none;`

```
.error {
  background-color: hsl(0, 20%, 50%);
  padding: 0.5em 0.75em;
}

.error:empty {
  padding: 0;
}
```

Dưới đây là đoạn code demo giúp bạn có thể hiểu rõ hơn. Thử xoá bỏ `padding: 0` trong `.error:empty` bạn sẽ thấy màu nền của phần tử rỗng này.

https://jsfiddle.net/8qn0ejub/

<br>

##### - Tạo trạng thái rỗng

Giả sử chúng ta tạo một danh sách việc cần phải làm. Trong lần đầu tiên khi xem danh sách việc cần làm có thể sẽ là một danh sách rỗng. Trạng thái khi không có việc cần làm chúng ta gọi là **trạng thái rỗng** .


Nếu chúng ta muốn tạo trạng thái rỗng cho danh sách việc cần làm, chúng ta có thể thêm một `<div>` phía sau `<ul>`. Như vậy, chúng ta có thể kết hợp `:empty` và `+` (adjacent sibling) hoặc `~` (subsequent sibling) để style cho trạng thái rỗng. 

```
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
<div class="empty-state"></div>
```

```
.empty-state {
  display: none;
}

ul:empty + .empty-state {
  display: block;
}
```

### Nhược điểm của :empty

`:empty` thường được dùng trong thực tế. Tuy nhiên, nó có 2 nhược điểm sau: 
+ Trải nghiệm phát triển kém
+ Chúng ta cần xoá bỏ khoảng trắng sử dụng Javascript.


Nhược điểm đầu tiên không phải là vấn đề lớn. Tuy nhiên, nhược điểm thứ hai là không hợp lệ và thực tế thì chúng ta không cần phải dùng Javascript để xoá khoảng trắng. 

<br>

##### - Trải nghiệm phát triển kém

Chúng ta quay lại ví dụ về danh sách công việc cần làm. Chúng ta có đoạn markup danh sách việc cần làm như sau: 

```
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
<div class="empty-state"></div>
```

Làm sao để chúng ta kiểm tra được các phần tử `:empty` ?

Chúng ta sẽ thử xoá bỏ  các phần tử `<li>` bên trong `<ul>`. Sau khi xoá các `<li>` chúng ta được đoạn code sau:

```
<ul>
</ul>
```

Chúng ta có thể nhận thấy đoạn HTML trên sẽ không kích hoạt `:empty` bởi vì `:empty` chỉ hoạt động khi phần tử không chứa khoảng trắng. 

Để `:empty` hoạt động chúng ta chỉ cần xoá bỏ khoảng trắng bên trong thẻ `<ul>` là xong. 

<br>

##### - Xoá bỏ khoảng trắng sử dụng Javascript

Chúng ta sẽ không cần sử dụng Javascript để xoá khoảng trắng nếu sử dụng `:empty`. Giả định này là sai. 

Giả sử chúng ta có đoạn code HTML sau:

```
<ul>
  <li>Item 1</li>
</ul>
<div class="empty-state"></div>
```

Để trạng thái rỗng hoạt động, chúng ta cần xoá phần tử `<li>` cuối cùng bên trong `<ul>`. Nếu sử dụng Javascript chúng ta cần sử dùng hàm `removeChild`

```
const ul = document.querySelector('ul')
const li = ul.children[0]

ul.removeChild(li)
```

Giả sử đoạn code trên sẽ sinh ra mã HTML như sau

```
<ul>
</ul>
```

thì chúng ta sẽ phải xoá bỏ toàn bộ khoảng trắng trong `<ul>` như đoạn code dưới đây:

```
const ul = document.querySelector('ul')
const li = ul.children[0]

ul.removeChild(li)

if (ul.children.length === 0) {
  ul.innerHTML = ''
}
```


Giả sử của chúng ta ở trên đã sai vì đoạn code trên sẽ sinh ra đoạn HTML sau: 


```
<ul></ul>
```

### Khả năng hỗ trợ trình duyệt của :blank và :empty

`:empty` hỗ trợ hầu hết trên các trình duyệt trong khi `:blank` hỗ trợ kém hơn. Điều này là lý đó để sử dụng `:empty` hơn là `:blank`.

<br>
- Trình duyệt hỗ trợ `:empty`

![](https://images.viblo.asia/308992a5-eb48-48a8-94be-81b3441b702d.png)

- Trình duyệt hỗ trợ `:blank`

![](https://images.viblo.asia/894645b5-084d-4113-b629-b414a92320a4.png)

### Kết luận
`:empty` và `:blank` cho phép chúng ta style phần tử rỗng và tạo ra trạng thái rỗng một cách dễ dàng. 
`:blank` tốt hơn `:empty` vì nó cung cấp trải nghiệm cho người lập trình tốt hơn. Tuy nhiên, chúng ta không thể dùng `:blank` vì nó hỗ trợ trình duyệt kém hơn. Do đó, `:empty` thường được sử dụng hơn.  

**Nguồn tham khảo:**  https://zellwk.com/blog/empty-and-blank/?ck_subscriber_id=228370172