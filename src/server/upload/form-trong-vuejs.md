Xin chào các bạn. Hôm nay mình sẽ tiếp tục series về Vuejs. Hôm nay mình sẽ giới thiệu với các bạn về Form trong VueJs

---
title: Ràng buộc form input
type: guide
order: 10
---

## Cách sử dụng cơ bản

Bạn có thể sử dụng directive `v-model` để tạo ràng buộc dữ liệu 2 chiều lên các phần tử form input và textarea. Vue sẽ tự động chọn cách phù hợp để cập nhật phần tử này dựa trên kiểu của input. Có một chút ma thuật, `v-model` là syntax sugar trong việc cập nhật dữ liệu dựa trên các sự kiện input từ người dùng kèm theo một số trường hợp đặc biệt khác.

<p class="tip">`v-model` sẽ bỏ qua giá trị khởi tạo của các thuộc tính `value`, `checked` hoặc `selected` trong mọi phần tử form. Nó luôn luôn xem data trong đối tượng Vue là nguồn đáng tin cậy duy nhất. Bạn nên khai báo các giá trị khởi tạo trong JavaScript, bên trong option `data` của component.</p>

<p class="tip" id="vmodel-ime-tip">Đối với các ngôn ngữ đòi hỏi bộ gõ ([IME](https://en.wikipedia.org/wiki/Input_method)) (tiếng Trung, tiếng Nhật, Tiếng Hàn v.v.), bạn sẽ nhận thấy rằng `v-model` không thay đổi trong quá trình biên soạn của IME. Nếu bạn muốn nhận các thay đổi này thì phải sử dụng sự kiện `input`.</p>

### Văn bản

``` html
<input v-model="message" placeholder="enter Message">
<p>Message is: {{ message }}</p>
```


### Văn bản nhiều dòng

``` html
<span>Multiline message is:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<br>
<textarea v-model="message" placeholder="add multiple lines"></textarea>
```

### Checkbox

Checkbox đơn, giá trị boolean:

``` html
<input type="checkbox" id="checkbox" v-model="checked">
<label for="checkbox">{{ checked }}</label>
```
Nhiều checkbox, ràng buộc vào cùng một mảng:

``` html
<div id='example-3'>
  <input type="checkbox" id="jack" value="jack" v-model="checkedNames">
  <label for="com-chien-toi">jack</label><br>
  <input type="checkbox" id="john" value="john" v-model="checkedNames">
  <label for="dot-bi-xao-toi">john</label><br>
  <input type="checkbox" id="Mike" value="Mike" v-model="checkedNames">
  <label for="canh-rau-rung">Mike</label>
  <br>
  <span>Món đã chọn: {{ checkedNames }}</span>
</div>
```

``` js
new Vue({
  el: '#example-3',
  data: {
    checkedNames: []
  }
})
```

### Radio

``` html
<input type="radio" id="One" value="One" v-model="picked">
<label for="cac-mon-rau">One</label><br>
<input type="radio" id=two" value="two" v-model="picked">
<label for="cac-mon-thit">two</label><br>
<span>Đã chọn: {{ picked }}</span>
```

``` js
new Vue({
  el: '#example-4',
  data: {
    picked: ''
  }
})
```

### Select

Select đơn:

``` html
<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
<span>Selected: {{ selected }}</span>
```

``` js
new Vue({
  el: '#example-5',
  data: {
    selected: ''
  }
})
```

<p class="tip">Nếu giá trị khởi tạo của biểu thức trong `v-model` không khớp với bất kỳ option nào, thì `<select>` sẽ render ở trạng thái "chưa được chọn". Trên iOS nó sẽ làm cho người dùng không thể chọn item đầu tiên bởi vì iOS không gọi sự kiện change trong trường hợp này. Do đó chúng tôi khuyên bạn nên thêm một lựa chọn có giá trị rỗng giống như trong ví dụ trên.</p>

Select nhiều lựa chọn (được ràng buộc với một mảng):

``` html
<select v-model="selected" multiple>
   <option>A</option>
   <option>B</option>
   <option>C</option>
</select>
<br>
<span>Selected: {{ selected }}</span>
``` 

## Ràng buộc giá trị

Đối với radio, checkbox và select option, `v-model` thường ràng buộc giá trị kiểu chuỗi tĩnh (hoặc boolean đối với checkbox):

``` html
<!-- `picked` sẽ là chuỗi "a" khi được check -->
<input type="radio" v-model="picked" value="a">

<!-- `toggle` có thể là true hoặc false -->
<input type="checkbox" v-model="toggle">

<!-- `selected` sẽ là chuỗi "abc" khi được chọn -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>
```

Nhưng đôi khi chúng ta muốn ràng buộc giá trị với một thuộc tính động trong đối tượng Vue. Chúng ta có thể sử dụng `v-bind` để làm điều này. Thêm nữa, sử dụng `v-bind` còn cho phép ràng buộc giá trị của input với các trị không phải kiểu chuỗi.

### Checkbox

``` html
<input
  type="checkbox"
  v-model="toggle"
  true-value="yes"
  false-value="no"
>
```

``` js
vm.toggle === 'yes'
// khi không được check:
vm.toggle === 'no'
```

<p class="tip">Các thuộc tính `true-value` và `false-value` không ảnh hưởng đến thuộc tính `value` của input, vì trình duyệt không gủi kèm theo các checkbox không được check khi submit form. Để đảm bảo một trong hai giá trị này được submit cùng với form (ví dụ "yes" hoặc "no"), hãy dùng input dạng radio thay thế.</p>

### Radio

``` html
<input type="radio" v-model="pick" v-bind:value="a">
```

``` js
vm.pick === vm.a
```

### Select option

``` html
<select v-model="selected">
  <!-- inline object literal -->
  <option v-bind:value="{ number: 123 }">123</option>
</select>
```

``` js
// khi được chọn:
typeof vm.selected // => 'object'
vm.selected.number // => 123
```

## Modifier

### `.lazy`

Mặc định, `v-model` đồng bộ giá trị của input với dữ liệu sau sự kiện `input` (có ngoại lệ đối với trường hợp bộ gõ như [đã nói ở trên](#vmodel-ime-tip)). Bạn có thể thêm modifier `lazy` để đồng bộ sau sự kiện `change`:

``` html
<!-- được đồng bộ sau sự kiện "change" thay vì "input" -->
<input v-model.lazy="msg" >
```

### `.number`

Nếu bạn muốn giá trị từ input được tự động chuyển kiểu về kiểu số, bạn có thể thêm modifier `number` vào `v-model`:

``` html
<input v-model.number="age" type="number">
```

Điều này rất hữu ích, vì kể cả khi input có `type="number"` thì giá trị được trả về của nó luôn luôn là chuỗi.

### `.trim`

Dùng để tự động loại bỏ khoảng trắng trước và sau giá trị trong input.

```html
<input v-model.trim="msg">
```

## `v-model` với Component

> Nếu bạn chưa quen với Vue component, bạn có thể bỏ qua phần này.

Không phải lúc nào các kiểu input có sẵn của HTML cũng có thể đáp ứng nhu cầu của bạn. May mắn là các component của Vue cho phép bạn xây dựng các input riêng tái sử dụng được với các hành vi (behavior) được tùy chỉnh hoàn toàn. Các input này thậm chí còn hoạt động với `v-model`.



---


Như vậy là mình đã giới thiệu các bạn những bước cơ bản để Triển khai một ứng dụng VueJS cơ bản với Form. Nếu có bất kì thắc mắc gì hãy để lại comment ở phía dưới nhé.

---
### Tham Khảo chi tiết hơn

https://vuejs.org/v2/guide/forms.html