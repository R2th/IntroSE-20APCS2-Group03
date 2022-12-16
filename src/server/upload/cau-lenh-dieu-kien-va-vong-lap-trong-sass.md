# **I. Giới thiệu**
Hi, xin chào mọi người hôm nay mình sẽ tiếp nối series về SASS, và hôm nay mình sẽ viết về cấu trúc câu điều kiện và vòng lặp trong SASS.
# **II. Cấu trúc câu điều kiện**
**2.1. Câu lệnh if else**

Lệnh if else dùng để kiểm tra điều kiện nào đó có đúng hay không, nếu đúng thì thực thi lệnh bên trong khối if và ngược lại nếu sai thì thực hiện lệnh trong khối else.

Bạn có thể sử dụng cú pháp if else hoặc if else lồng nhau:
```sass
@if ($condition){
    // do something
}
@else{
    // do something
}
```

**if else lồng nhau**

```sass
@if ($condition1){
    // do something
}
@else if ($condition2){
    // do something
}
@else{
    // do something
}
```
**Ví dụ**: kiểm tra màu sắc của `$background` có là màu `red` hay không, nếu đúng thì chuyển nó thành `none` còn không thì hiển thị nó là màu `green`;
```sass
$background: red;
 
 
@if ($background = red){
    h1 {
        display: none;
    }
}
@else{
    h1 {
        background: green;
    }
}
```
**2.2. Câu lệnh if else lồng nhau**

Đơn giản là chúng ta chỉ cần đặt `if` trong `if` thôi
```sass
@if ($condition1){
    @if ($condition2){
        // do something
    }
    @else{
        // do something
    }
}
@else{
    // do something
}
```
**Ví dụ**:
```sass
@if ($menu_height > 200){
    @if ($menu_height < 720){
        li {
            display: inline-block;
        }
    }
    @else{
        li {
            display: block;
        }
    }
}
@else{
     li {
        display: none;
    }
}
```
# **III. Vòng lặp trong SASS**
**3.1. Vòng lặp for trong SASS**

Nói đơn giản vòng lặp `for` dùng để lặp những đoạn CSS có chung cấu trúc và biết được số lần lặp thì hãy nên sử dụng vòng lặp `for`.

**Ví dụ**

```sass
@for $i from 1 through 4 {
    #item-#{$i}{
        background: red
    }
}
```
có nghĩa là nó lặp từ `$item-1` đến `$item-4` và chúng đều có background là `red`.

Và để lấy giá trị của `$i` mỗi vòng lặp thì ta sử dụng cú pháp `#{$i}`.

`through` có nghĩa là xuyên qua, nó cho chúng ta lấy từ `1` đến `4`. Hoặc bạn cũng có sử dụng cú pháp như sau: 
```sass
@for $i from 1 to 4 {
    #item-#{$i}{
        background: red
    }
}
```
Nhìn quen phải không, nó cũng giống như vòng for trong lập trình và kết quả là chỉ từ `$item-1`  đến `$item-4`

Các bạn qua file `.css` và sẽ thấy: 
```css
#item-1 {
  background: red; 
}
 
#item-2 {
  background: red; 
}
 
#item-3 {
  background: red; 
}
 
#item-4 {
  background: red; 
}
```
Bạn có thể sử dụng `@mixin` với `if else` và `for`  một cách bình thường.

**3.2. Vòng lặp while trong SASS**

Vòng lặp `for` dùng để lặp cho những trường hợp ta biết trước tổng số vòng lặp, điều này trong vòng lặp while cũng đúng. Tuy nhiên với vòng lặp while ta có thể không cần biết trước tổng số lần lặp vẫn được miễn là có điều kiện dừng vòng lặp để tránh tình trạng lặp vô hạn.

**Ví dụ**
```sass
$index : 1;
 
@while $index <= 10
{
    @if ($index % 3 == 0) or ($index % 5 == 0)
    {
        .col-xs-#{$index}{
            background: blue;
        }
    }
    $index : ($index + 1);
}
```
**3.3. Vòng lặp each trong SASS**

Vòng lặp `each`  có chức năng tương tự như vòng lặp foreach trong php, tuy nhiên trong SASS không có cấu trúc mảng nên vòng lặp each trong SASS dùng để lặp một loại dữ liệu tương tự như mảng đó là dữ liệu dạng **list**.

**Cú pháp**

```sass
@each $value in $values {
    // do something
}
```

**Ví dụ**
```sass
$class-name : col-xs-1 col-xs-2 col-xs-3;
 
@each $name in $class-name {
    .#{$name} {
        background: red;
    }
}
```
**Kiểu dữ liệu dạng List trong SASS**

Kiểu dữ liệu list là một danh sách các giá trị cách nhau bởi khoảng trắng, mỗi giá trị có thể có cặp dấu ngoặc kép bao lại hoặc không.

**Ví dụ**

```sass
$borders : "solid 2px" "solid 3px";
 
@each $border in $borders {
    .h2{
        border: #{$border};
    }
}
```
# **IV. Kết luận**
Như vậy là ta đã tìm hiểu xong về các dạng vòng lặp và cấu trúc câu điều kiện trong SASS và một số ví dụ liên quan, đồng thời cũng biết thêm kiểu dũ liệu dạng list trong SASS. Bài tiếp theo mình sẽ giới thiệu với các bạn về Function và một số hàm làm việc với string và number thường dùng trong SASS.

Thank you!!!