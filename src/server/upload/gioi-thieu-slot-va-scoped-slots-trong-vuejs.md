Chắc hẳn trong quá trình làm việc với Vue.js, các bạn sẽ gặp những trường hợp muốn chèn nội dụng HTML vào bên trong component con giống như cách chúng ta vẫn viết HTML thông thường thay vì dùng prop. Ví dụ như:

```html
<div class="parent">
  <child>
    <p>Hello from parent</p>
  </child>
</div>
```
Để làm được việc này, Vue.js cung cấp **<slot></slot>** giúp chúng ta có thể chèn nội dung từ component cha vào component con.

Một số trường hợp thường sử dụng slot đó là:

- Những component chung (Button, Modal, Card, Dropdown, Tabs, …)
- Những component layout dùng chung (Header, Navbar, Footer…)
- Những component đệ quy (Tree, Menu…)

## Các loại slot
### Căn bản
Cùng tìm hiểu cách dùng căn bản của slot. Chúng ta có component con childsử dụng slot như sau:
```html
<div class="children">
  <h2>This is children component</h2>
  <slot></slot>
</div>
```
Component cha chèn nội dung vào bên trong child
```html
<div class="parent">
  <h2>This is parent component</h2>
  <child>
    <p>Hello from parent</p>
  </child>
</div>
```
Nội dung sau khi render ra như sau:
```html
<div class="parent">
  <h2>This is parent component</h2>
  <div class="children">
    <h2>This is children component</h2>
    <p>Hello from parent</p>
  </div>
</div>
```
### Fallback content
Tất cả nội dung bên trong **<slot></slot>** sẽ được dùng làm fallback content khi component cha không chèn bất kì thứ gì vào component con. Ví dụ:
```html
<div class="children">
  <h2>This is children component</h2>
  <slot><p>This is the fallback content</p></slot>
</div>
```
Component cha gọi tới child nhưng không chèn nội dung vào:
```html
<div class="parent">
  <h2>This is parent component</h2>
  <child></child>
</div>
```
Kết quả khi render ra sẽ hiển thị nội dung fallback:
```html
<div class="parent">
  <h2>This is parent component</h2>
  <div class="children">
    <h2>This is children component</h2>
    <p>This is the fallback content</p>
  </div>
</div>
```
### Đặt tên cho Slot
Slot có một thuộc tính đặc biệt là **name** giúp chúng ta có thể đặt tên cho slot đó. Trong một component có thể chứa nhiều slot với tên khác nhau và Vue.js cũng cho phép có một slot không được đặt tên để chứa những nội dung không trùng khớp với bất kì slot name nào trong component. Chúng ta cùng xem qua ví dụ cho dễ hiểu.

Ta có một componet card gồm 3 phần header, content, footer Ta sẽ đặt vào 3 slot như sau:
```html
<!-- Component card -->
<div class="card">
  <header class="card-header">
    <slot name="header"></slot>
  </header>

  <div class="card-content">
    <slot></slot>
  </div>

  <footer class="card-footer">
    <slot name="footer"></slot>
  </footer>
</div>
```
Component cha sử dụng và truyền nội dung:
```html
<div class="parent">
 <card>
   <h2 slot="header">Vue.js is awesome</h2>
   <p>The Progressive JavaScript Framework</p>
   <p>Another paragraph</p>
   <p slot="footer">I hate Covid-19</p>
 </card>
</div>
```
Kết quả sau khi render:
```html
<div class="card">
  <header class="card-header">
    <h2>Vue.js is awesome</h2>
  </header>

  <div class="card-content">
    <p>The Progressive JavaScript Framework</p>
  </div>

  <footer class="card-footer">
    <p>I hate Covid-19</p>
  </footer>
</div>
```
### Scoped slots
Scoped slots là một loại đặt biệt của slot giúp bạn có thể truyền dữ liệu từ component con lên component cha thông qua việc gán dữ liệu thông qua thuộc tính (nó cũng tương tự việc đưa dữ liệu vào props của component). Chúng ta cùng xem qua ví dụ:

Mình có một child như sau:
```html
<div class="children">
  <slot text="Hello from child!"></slot>
</div>
```
Như các bạn thấy, mình truyền vào slot một attribute là text kiểu như prop bạn thường thấy khi truyền vào component.

Tiếp theo đến component cha. Chúng ta sẽ lấy nội dung từ text thông qua thuộc tính slot-scope.
```html
<div class="parent">
  <p>Hello from parent</p>
  <child>
    <p slot-scope="props" v-text="props.text"></p>
  </child>
</div>
<!-- Hoặc có thể dùng tính năng destructuring syntax của ES2015 -->
<p slot-scope="{ text }" v-text="text"></p>
```
> Những kiểu dữ liệu có thể sử dụng trong scoped slots có thể là string, number, object, array thậm chí bạn có thể truyền method.

## Tổng kết
- Slot và Scoped slot là một trong những tính năng mạnh mẽ nhất của Vuejs. Nó cho phép chúng ta có khả năng tùy biến các component với việc viết ít mã, code có thể tái sử dụng, giúp clean code và tránh vi phạm nguyên tắc DRY. Cám ơn các bạn đã theo dõi!
- Tham khảo:  [Trang chủ](https://vuejs.org/v2/api/#vm-scopedSlots)