Ở bài viết trước, mình đã nói về một vài keyword trong Vue như `v-if`, `v-else`, `v-show`, `v-for`, ... Chúng thực chất là các syntax đặc biệt của Vue để thao tác linh hoạt với các DOM ảo, được gọi là Interpolations. Ngoài ra, Vue còn các Interpolations khác. 
## 1. Text 
Mục đích của nó thì đã quá rõ ràng, hiển thị text theo một cú pháp gọi là mustache. Đây là một ví dụ đơn giản :
```
<h1>Text : {{ msg }}</h1>
```
Với ví dụ này, text của chúng ta sẽ được hiển thị theo giá trị của biến msg. Nếu biết msg thay đổi thì dòng text hiển thị cũng sẽ được thay đổi theo. Tuy nhiên thì cũng có cách để biến msg chỉ được binding một lần : 
```
<h1 v-once>Text : {{ msg }}</h1>
```
Ngoài ra chúng ta cũng có thể sử dụng các biểu thức javascript ở đây : 
```
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}
```
## 2. Một vài Directive thường dùng
Các directive là các thuộc tính đặc biệt của vue với prefix là `v-<tên directive>` như `v-if`, `v-for`, ... Ngoài các directive đã được nêu ở bài viết trước, chúng ta sẽ tìm hiểu thêm `v-bind` và `v-on`. 

`v-bind`:  dữ liệu sẽ được ràng buộc sự thay đổi của nó với variable. Ví dụ: 
```
<a v-bind:href="url"> ... </a>
Cú pháp rút gọn
<a :href="url"> ... </a>
```
Như vầy, giá trị của href sẽ được thay đổi theo url, v-bind sẽ biến nó thành một thuộc tính động, tùy ý thay đổi theo mục đích của chúng ta.

`v-on`: Với javascript, để bắn sự kiện onclick của một button chúng ta làm như sau : 

```
document.getElementById('demo').onclick = function changeContent() {
    console.log('ABC')
}
```

Với Vue, chúng ta có `v-on` để xử lý các event 
```
<a v-on:click="doSomething"> ... </a>
Cú pháp rút gọn
<a @click="doSomething"> ... </a>
```
Chúng t cũng có thể sử dụng `v-on` với các event khác như: `submit`, `keydown`, `keypress`, ...

## 3. Form Directive
Việc thao tác nhập liệu với form là một việc gần như chúng ta luôn phải làm. Vậy, xử lý form với Vue thì có gì khác biệt.
```
<input v-model="message" placeholder="Nhập thông điệp">
<p>Thông điệp: {{ message }}</p>
```
`v-model` cũng giống như `v-bind` sẽ ràng buộc dữ liệu của chúng ta với variable tương ứng. Tuy nhiên, v-model chỉ sử dụng cho form, và `v-model` sẽ binding 2 chiều dữ liệu, có nghĩa là khai chúng ta nhập giá trị vào ô input thì value cũng sẽ thay đổi theo và tự động gán vào biến. Trong thực tế, `v-model` được sử dụng thường xuyên và khá nhiều trong các ứng dụng thực tế. Chúng ta cũng có thể sử dụng v-model với các thuộc tính đặc biệt như sau :
```
<!-- được đồng bộ sau sự kiện "change" thay vì "input" -->
<input v-model.lazy="msg" >
<!-- tự động convert data thành kiểu number -->
<input v-model.number="age" type="number">
<!-- loại bỏ khoảng trắng trước và sau giá trị -->
<input v-model.trim="msg">
```

Ngoài ra, mình nghĩ các bạn có thể tham khảo thêm [tại đây](https://vi.vuejs.org/v2/guide/forms.html)