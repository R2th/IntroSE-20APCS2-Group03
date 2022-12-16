Phiên bản gần đây nhất của Sass mới update thêm một tính năng mới, đó là hệ thống module ( a module system).
Với tính năng update này, các file sass của bạn đang sử dụng chức năng @import sẽ có sự thay đổi lớn. @import trước nay đem đến cho chúng ta nhiều lợi ích khi sử dụng, ví dụ như import sass từ bên thứ ba, tách các file sass ra thành các file sass con, mỗi file đại diện cho một mục đích nào đó, thường sẽ là file `_variables`, `funtions`, và các file components. 

Tuy nhiên nó cũng có những hạn chế nhất định:
* Trong Css thì tính năng @import cũng có nên đôi khi nó sẽ gây ra nhầm lẫn cho người dùng
* Trường hợp @import cùng 1 file ở nhiều vị trí khác nhau, thì cái file đó sẽ được hiểu là gọi nhiều lần, và dĩ nhiên, code sẽ bị duplicate lên -> phí phạm tài nguyên, maintain khó cộng với thời gian compile sẽ lâu hơn nữa
* Và thường chúng ta sẽ có 1 file `_variables.scss` gọi đầu tiên, và nó sẽ là global, mọi file phía dưới đều có thể sử dụng được nó, tương tự với funtions, nhưng nó có thật sự hay ko
    * Ví dụ như ta muốn sử dụng một số biến local, chỉ tồn tại trong 1 file thôi -> không làm được
    * Việc sử dụng global sẽ dẫn tới những hệ quả như sau: giá trị biến có thể bị override mà ta không biết được, ví dụ gọi bootsrtap từ bên thứ 3, họ define rất nhiều biến, sau đó ta define biến dùng cho mình, vô tình bị trùng tên -> sai, funtions cũng vậy

Chính vì vậy mà tính năng hệ thống module của sass ra đời đi kèm với thuộc tính @use.
@use khá giống @import nhưng có những sự khác biệt quan trọng sau:
* File sẽ chỉ dc gọi vào một lần duy nhất bất kể bạn sử dụng @use file đó bao nhiêu lần
* Các biến bắt đầu bằng underscore `(_)` hoặc hyphen `(-)` sẽ được coi là biến local (private)
* Tất cả những variables, hay functions private sẽ có namespace riêng khi tao sử dụng @use tới file đó, ví dụ:

    ```css
        @use 'buttons'; // creates a `buttons` namespace
        @use 'forms'; // creates a `forms` namespace
    ```

Và để sử dụng được nó thì ta phải gọi theo namespace như sau:

```css
// variables: <namespace>.$variable
$btn-color: buttons.$color;
$form-border: forms.$input-border;

// functions: <namespace>.function()
$btn-background: buttons.background();
$form-border: forms.border();

// mixins: @include <namespace>.mixin()
@include buttons.submit();
@include forms.input();
```

Ngoài ra chúng ta cũng có thể đặt alias cho các namespace này:

```css
@use 'buttons' as *; // the star removes any namespace
@use 'forms' as f;

$btn-color: $color; // buttons.$color without a namespace
$form-border: f.$input-border; // forms.$input-border with a custom namespace
```

Như bạn thấy thì ```css@use 'buttons' as *;``` sẽ không yêu cầu phải có namespace khi sử dụng nữa -> ```css
$btn-color: $color; // buttons.$color without a namespace```  nhưng nó vẫn là local nhé.