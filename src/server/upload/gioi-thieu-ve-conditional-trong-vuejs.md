Xin chào các bạn. Hôm nay mình sẽ giới thiệu cho các bạn về một series mới về Vuejs. Cụ thể mình sẽ giới thiệu với các bạn về Conditional trong Vuejs.

Trong bài này chúng ta sẽ tìm hiểu về Conditional rendering. Mình nghĩ đây sẽ là thứ mà các bạn dùng nhiều trong công việc.



 - [v-if](#v-if)
    - [Nhóm điều kiện với v-if trên thẻ <template>](#dieukienvif)
    - [v-else](#v-else) 
    - [v-else-if](#v-else-if) 
    - [Điều khiển việc tái sử dụng phần tử với key](#key) 
 - [v-show](#v-show)
 - [v-if và v-show](#v-show)
- [v-if dùng với v-for](#Clienti)


---

# `v-if`

Trong các thư viện biên dịch template như `Handlebars`, thông thường chúng ta sẽ viết các khối điều kiện (conditional block) như sau:

``` html
{{#if ok}}
  <h1>Vue is awesome!</h1>
{{/if}}
```

Để làm điều này với Vue, chúng ta sử dụng directive `v-if`:

``` html
<h1 v-if="ok">Vue is awesome!</h1>
```

Chúng ta cũng có thể thêm khối "else" bằng `v-else`:

``` html
<h1 v-if="ok">Vue is awesome!</h1>
<h1 v-else>Oh no </h1>
```

### Nhóm điều kiện với `v-if` trên thẻ `<template>`

Vì là một directive, `v-if` phải được dùng trên một phần tử đơn lẻ (single element) như `<p>` hoặc `<div>`. Nếu chúng ta muốn bật tắt một nhóm các phần tử thì sao? Chỉ cần dùng `v-if` trên một phần tử `<template>` với vai trò wrap (bọc) các phần tử lại thành một nhóm. Kết quả render cuối cùng sẽ không có phần tử `<template>` này.

``` html
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

### `v-else`

Như trên đã nhắc đến, ta có thể dùng directive `v-else` để chỉ định một khối "else" cho `v-if`:

``` html
<div v-if="Math.random() > 0.5">
  Now you see me
</div>
<div v-else>
  Now you don't
</div>
```

Để được coi là hợp lệ, phần tử có `v-else` phải theo ngay sau một phần tử `v-if` hoặc `v-else-if`.

### `v-else-if`

Directive `v-else-if` đóng vai trò một khối "else if" cho `v-if`. Directive này có thể được dùng nhiều lần nối tiếp nhau:

```html
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```

Tương tự với `v-else`, phần tử với `v-else-if` phải theo ngay sau một phần tử `v-if` hoặc `v-else-if`.

### Điều khiển việc tái sử dụng phần tử với `key`

Vue cố gắng render các phần tử một cách hiệu quả đến mức có thể, với một trong những cách làm là sử dụng lại thay vì tạo mới từ đầu. Ngoài việc giúp cho Vue thao tác cực kì nhanh, điều này còn mang lại một số lợi ích đáng kể khác. Ví dụ, nếu bạn cho phép người dùng chuyển đổi giữa nhiều cách đăng nhập:

``` html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address">
</template>
```

thì việc chuyển đổi giá trị của `loginType` trong đoạn code trên sẽ không xóa đi thông tin mà người dùng đã điền vào. Vì cả hai `<template>` dùng các phần tử giống nhau, phần tử `<input>` sẽ không bị thay thế, chỉ có thuộc tính `placeholder` là thay đổi. 

Tuy nhiên không phải lúc nào đây cũng là điều bạn mong muốn. Vì thế, Vue cung cấp một thuộc tính gọi là `key`. Khi dùng `key` với giá trị độc nhất (unique), về căn bản bạn đang dặn Vue "xem hai phần tử này là hoàn toàn khác nhau và đừng dùng lại":

``` html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Nhập username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Nhập địa chỉ email" key="email-input">
</template>
```

Bây giờ thì hai phần tử `<input>` này sẽ được render lại từ đầu mỗi khi giá trị `loginType` được thay đổi.

Lưu ý rằng các phần tử `<label>` vẫn được sử dụng lại vì không có thuộc tính `key`.

# `v-show`

Một lựa chọn nữa cho việc hiện hoặc ẩn một phần tử web theo điều kiện là directive `v-show`. Cách dùng `v-show` cũng tương tự với `v-if`:

``` html
<h1 v-show="ok">Hello!</h1>
```

Điểm khác biệt giữa `v-show` và `v-if` là phần tử được đánh dấu với `v-show` sẽ luôn luôn được render và chứa trong DOM; `v-show` chỉ bật tắt thuộc tính `display` của phần tử này.

`v-show` không hỗ trợ thẻ `<template>` và cũng không hoạt động với `v-else`.

# `v-if` và `v-show`

`v-if` là render theo điều kiện "thật sự," vì nó bảo đảm các event listener và component con bên trong khối điều kiện được hủy và khởi tạo lại trong quá trình bật/tắt.

`v-if` cũng **lười biếng** (lazy): nếu giá trị của điều kiện là `false` trong lần render đầu tiên, nó sẽ không làm gì cả - khối điều kiện sẽ không được render cho đến khi điều kiện trở thành `true` lần đầu tiên.

Trong khi đó, `v-show` đơn giản hơn nhiều - phần tử sẽ được render bất kể điều kiện là đúng hay sai, và chỉ được hiện/giấu đi bằng CSS.

Nói chung, `v-if` có phí tổn bật/tắt cao, còn `v-show` có phí tổn render cao. Vì thế, nếu bạn cần bật/tắt thường xuyên, hãy dùng `v-show`. Ngược lại, nếu điều kiện ít khi thay đổi trong suốt vòng đời của ứng dụng, hãy dùng `v-if`.

## `v-if` dùng với `v-for`

Khi dùng chung với `v-if`, `v-for` có độ ưu tiên cao hơn. 
    
---
    
Dưới đây mình  đã giới thiệu với các bạn về  Conditional  và một số khái niệm như `v-if`, `v-else`, `v-else-if`, `v-show` trong    Conditional  VueJs. Nếu có bất kì thắc mắc gì hãy để lại comment ở phía dưới nhé.

### Tham Khảo

https://vuejs.org/v2/guide/conditional.html