Như các bạn đã biết SASS là một công nghệ cực kỳ hữu ích để viết style nó không chỉ ngắn gọn hơn việc viết CSS là lại cực kỳ dễ hiểu và dễ quản lý.
Ở bài viết này chúng ta sẽ cùng nhau tìm hiểu về một chức năng khá hay mà các bạn không nên bỏ qua trong SASS. Đó chính là Mixin.
## Mixin trong SASS là gì?
Mixin cho phép bạn gom nhóm CSS lại với nhau để có thể tái sử dụng. Điều này giúp bạn tránh việc lặp đi lặp lại một đoạn CSS. Ví dụ:
```
a:link { color: white; }
a:visited { color: blue; }
a:hover { color: green; }
a:active { color: red; }
```
Ở ví dụ trên khi chưa sử dụng mixin thì chúng ta có thể sẽ bị rối trí nếu như có nhiều thẻ a. Do đó ta có thể tạo style cho các thẻ `a` của mình bằng một sass mixin sau:
```
@mixin linx ($link, $visit, $hover, $active) {
  a {
    color: $link;
    &:visited {
      color: $visit;
    }
    &:hover {
      color: $hover;   
    }
    &:active {
      color: $active;
    }
  }
}
```
## Phân loại Mixin
Mixin được phân chia làm 2 loại
1.  Không sử dụng tham số
```
@mixin mixin_name {
    // SASS selectors...
}
```
2. Có tham số
```
@mixin mixin_name(param1, param2...)
{
    // SASS selectors...
}
```
Để sử dụng Mixin ta dùng cú pháp sau:
```
@include mixin_name;
```
Bây giờ hãy cùng làm quen một ví dụ nha (Xây dựng mixin chứa những đoạn mã CSS cho menu):
SCSS:
```
@mixin menu{
    #menu 
    { 
        li {
            height: 30px;
            line-height: 30px;
            
            a {
                background: #333;
                text-decoration: none;
            }
        }
    }
}
 
@include menu;
```
CSS sau khi được biên dịch
``` 
#menu li {
    height: 30px;
    line-height: 30px; 
}

#menu li a {
    background: #333;
    text-decoration: none; 
}
```
**Lưu ý:** Nếu bạn viết Mixin ở một file khác các bạn nhớ include vào file css của mình.
## Một số trường hợp hay sử dụng Mixin
### Sử dụng biến
Trong Mixin các bạn vẫn có thể sử dụng biến bình thường.

**Ví dụ:**

SCSS:
```
$color-red: red;
 
@mixin link_color_red{
    color: $color-red;
}
 
.header a{
    @include link_color_red;
}
```
CSS được biên dịch sẽ là:
```
.header a{
  color: red; 
}
```
### Sử dụng tham số
Như mình giới thiệu ở trên Mixin cũng có thể truyền được tham số.

**Ví dụ:**

SCSS:
```
@mixin header($background){
    background: $background;
}
 
.header{
    @include header(green);
    border: solid 1px;
}
```
CSS sau khi biên dịch
```
.header {
    background: green;
    border: solid 1px; 
}
```
Ngoài ra các bạn có thể truyền được nhiều tham số hơn nhé. Ở đây mình lấy ví dụ 1 tham số cho nhanh :D.
### Mixin với tham số có giá trị mặc định
Thông thường khi sử dụng Mixin có tham số bạn sẽ phải truyền đầy đủ các tham số tuy nhiên trong một vài trường hợp tham số đó chỉ thay đổi ở một số chỗ thì chúng ta cũng có thể đặt giá trị mặc định cho chúng. Nhưng có một **lưu ý** nhỏ là nếu Mixin có nhiều tham số và chỉ có một số ít tham số là có giá trị mặc định thì bắt buộc những tham số có giá trị mặc định này phải nằm ở cuối cùng bằng không các bạn vẫn sẽ phải truyền đầy đủ các tham số đã có trong Mixin. Cùng theo dõi ví dụ sau:

SCSS:
```
@mixin background($background : blue) {
    background: $background;
}
 
.header {
    @include background(green);
    border: solid 1px;
}

.footer {
    @include background;
    border: solid 1px;
}
```
CSS sau khi biên dịch
```
.header {
    background: green;
    border: solid 1px; 
}

.footer {
    background: blue;
    border: solid 1px;
}
```
### Sử dụng @content để bổ sung CSS cho Mixin
Nếu bạn muốn trong mixin có thể bổ sung CSS cho nó sau khi khai báo thì bạn sử dụng từ khóa @content đặt trong vị trí muốn bổ sung và khi sử dụng nếu ta khai báo CSS thêm thì nó sẽ tự động điền vào đúng vị trí.

**Ví dụ:**

SCSS:
```
@mixin header($background){
    background: $background;
    @content;
}
 
.header{
    @include header(red){
        padding: 20px;
    };
}
```
CSS sau khi biên dịch:
```
.header {
    background: red;
    padding: 20px; 
}
```
## Kết luận
Như vậy trong bài này mình cùng các bạn đã cùng nhau tìm hiểu về Mixin trong SASS chức năng vô cùng hữu ích để tối giản việc code lặp lại các CSS giống nhau. Cảm ơn các bạn đã theo dõi. Chúc các bạn học tập hiệu quả (bow).