# 1. Event Handling
### Listening to Events
Chúng ta có thể sử dụng chỉ thị `v-on` để lắng nghe các sự kiện DOM và chạy một số JavaScript khi chúng được kích hoạt.

Ví dụ:
```html
<div id="example">
  <button v-on:click="counter += 1">Click me</button>
  <p>Count clicked {{ counter }} </p>
</div>
```
```js
var app = new Vue({
  el: '#example',
  data: {
    counter: 0
  }
})
```
### Method Event Handlers
Trong thực tế, logic để xử lí sự kiện thường phức tạp hơn, vì thế chứa JavaScript trực tiếp trong giá trị của thuộc tính v-on như trên là không khả thi. Đó là lí do v-on cũng có thể nhận tên của một phương thức mà bạn muốn gọi.

Ví dụ:
```html
<button v-on:click="HandleClick">Click me</button>
```
```js
 methods:{
        HandleClick(){
            this.counter += 1;
    }                  
 ```
### Methods in Inline Handlers
Thay vì bind trực tiếp tên phương thức, ta cũng có thể gọi phương thức trong một câu lệnh JavaScript:
```html
<button v-on:click="HandleClick(2)">Click me</button>
```
```js
HandleClick(number){
            this.counter += number;
        },
 ```
 Đôi khi chúng ta cũng muốn truy xuất đến sự kiện DOM ban đầu từ câu lệnh JavaScript inline. Bạn có thể truyền sự kiện DOM vào phương thức thông qua biến $event:
 ```html
<button v-on:click="HandleClick($event,2)">Click me</button>
```
```js
HandleClick(event,number){
            this.counter += number;
            console.log(event.target);
        },
```
 ### Event Modifiers
 Trong rất nhiều trường hợp, chúng ta cần gọi` event.preventDefault()` hoặc` event.stopPropagation() `bên trong một phương thức xử lí sự kiện. Tuy việc này không có gì khó, sẽ tốt hơn nếu các phương thức chỉ phải tập trung giải quyết logic dữ liệu thay vì cáng đáng các sự kiện DOM.

Để giải quyết vấn đề này, Vue cung cấp các event modifier cho` v-on. Event modfier` là một hậu tố (postfix) cho directive, được biểu thị bằng một dấu chấm.

```html
        <form action="" v-on:submit.prevent="HandleModifier">
            <label for="">Name</label>
            <input type="text" name="name"> <br>
            <label for="">Email</label>
            <input type="email" name="email">
            <input type="submit" value="submit">
        </form>
```
```js
 HandleModifier(event){
            console.log(event);
        }
```
# Form Input Bindings
### Basic Usage
Bạn có thể sử dụng directive` v-model` để tạo ràng buộc dữ liệu `2 chiều` lên các phần tử `form input và textarea`. Vue sẽ tự động chọn cách phù hợp để cập nhật phần tử này dựa trên kiểu của input. Có một chút ma thuật,` v-model` là syntax sugar trong việc cập nhật dữ liệu dựa trên các sự kiện input từ người dùng kèm theo một số trường hợp đặc biệt khác.

`v-model` sẽ bỏ qua giá trị khởi tạo của các thuộc tính value, checked hoặc selected trong mọi phần tử form. Nó luôn luôn xem data trong đối tượng Vue là nguồn đáng tin cậy duy nhất. Bạn nên khai báo các giá trị khởi tạo trong JavaScript, bên trong option data của component.
```html
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>
```
đây là một trong những rằng buộc. bạn có thể tìm hiểu thêm tại https://v2.vuejs.org/v2/guide/forms.html
# Conditional Rendering
### Conditional Groups with v-if on `<template>`
Vì là một directive,` v-if `phải được dùng trên một phần tử đơn lẻ (single element) như `<p> `hoặc `<div>`. Nếu chúng ta muốn bật tắt một nhóm các phần tử thì sao? Chỉ cần dùng v-if trên một phần tử` <template>` với vai trò wrap (bọc) các phần tử lại thành một nhóm. Kết quả render cuối cùng sẽ không có phần tử` <template>` này.
    
```html
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
    <title>Document</title>
    <style>
        .tabs {
            margin: 0;
            padding: 0;
        }

        .tabs li {
            cursor: pointer;
            padding: 15px 10px;
            border: 1px solid #ccc;
            display: inline-block;
        }
        .login, .register {
            border: 1px solid green;
            width: 500px;
            height: 100px;
            padding: 15px 10px;
        }
    </style>
</head>

<body>
    <div id="app">
        <ul class="tabs">
            <li v-on:click="changeTab('login')">dang nhap</li>
            <li v-on:click="changeTab('register')">đăng xuất</li>
        </ul>
        <br>
        <div class="login" v-if="tabSelected === 'login'">
            <h2>Form Dang Nhap</h2>
            <form action="">
                <input type="email" placeholder="email">
          
                <input type="pass" name="" id="" placeholder="password">
                
                <input type="submit" value="dang nhap">
            </form>
        </div>

        <div class="register" v-else-if="tabSelected === 'register'">
            <h2>Form Dang Ky</h2>
            <form action="">
                <input type="email" placeholder="email">
          
                <input type="pass" name="" id="" placeholder="password">
                
                <input type="submit" value="dang ky">
            </form>
        </div>
    </div>

</body>
<script src="/Render_Template/main.js"></script>

</html>
```
### Controlling Reusable Elements with key
Vue cố gắng render các phần tử một cách hiệu quả đến mức có thể, với một trong những cách làm là sử dụng lại thay vì tạo mới từ đầu. Ngoài việc giúp cho Vue thao tác cực kì nhanh, điều này còn mang lại một số lợi ích đáng kể khác. Ví dụ, nếu bạn cho phép người dùng được đăng nhập bằng username hoặc email:
```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Nhập username">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Nhập địa chỉ email">
</template>
```
thì việc chuyển đổi giá trị của loginType trong đoạn code trên sẽ không xóa đi thông tin mà người dùng đã điền vào. Vì cả hai `<template> `dùng các phần tử giống nhau, phần tử <input> sẽ không bị thay thế, chỉ có thuộc tính placeholder là thay đổi.

Tuy nhiên không phải lúc nào đây cũng là điều bạn mong muốn. Vì thế, Vue cung cấp một thuộc tính gọi là key. Khi dùng key với giá trị độc nhất (unique), về căn bản bạn đang dặn Vue “xem hai phần tử này là hoàn toàn khác nhau và đừng dùng lại”:
```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Nhập username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Nhập địa chỉ email" key="email-input">
</template>
```
Bây giờ thì hai phần tử <input> này sẽ được render lại từ đầu mỗi khi giá trị loginType được thay đổi.
# List Rendering
### Mapping an Array to Elements with v-for
Chúng ta có thể dùng directive v-for để render một danh sách các item dựa trên một mảng. Directive v-for đòi hỏi một cú pháp đặc biệt dưới dạng item in items, trong đó items là mảng dữ liệu nguồn và item trỏ đến phần tử mảng đang được duyệt đến:
```html
<div id="app">
       <div class="list-blog" >
           <div v-for="blog in blogList" class="blog">
               <div class="title">{{blog.title}}</div>
               <div class="description">{{blog.body}}</div>
           </div>
   </div> 
 ```
 ``` js
  data: {
        blogList: [
            {
                "userId" : 1,
                "id": 1,
                "title": "Chúng ta đều là khách qua đường vội vã",
                "body": "Hôm nay đã là ngày 13/2, vậy một chút nữa thôi là tròn 3 năm tớ đánh mất người con gái từng rất yêu. Valentine năm nay, tớ nhìn dòng người vội qua, nhìn những cặp đôi dắt tay nhau tớ lại chạnh lòng nghĩ đến cậu. Thanh xuân êm đẹp ấy có cậu kề bên thực xứng đáng"
            },
            {
                "userId" : 1,
                "id": 2,
                "title": "Nhìn cuộc đời một cách bình yên",
                "body": " Cuộc đời tàn nhẫn với ta mười lần thì xin hãy một lần thương xót. Cuộc đời lấy đi của ta mười thứ chỉ xin lại một thứ là bình yên gia đình. Chỉ thế thôi. Lúc đó là lúc ta có thể nhẹ nhàng an nhiên chào đón những tàn nhẫn, vô tâm mà cuộc đời thử thách rồi. "
            },
            {
                "userId" : 1,
                "id": 3,
                "title": "Khi cô đơn quá lâu người ta chẳng cần một ai quan tâm nữa",
                "body": "Khi cô đơn quá lâu con người ta chẳng cần thêm một ai quan tâm nữa, họ chỉ muốn vậy một mình đi qua những ngày nắng ấm hay gió rét, một mình tận hưởng cuộc sống không có ai bước vào bên trong, không vì ai mà vui mà buồn."
            },
            {
                "userId" : 1,
                "id": 4,
                "title": "Tôi của sau này không còn thích chàng trai đứng dưới mưa",
                "body": "Có ai đó đứng đợi mình dưới những cơn mưa là một điều gì đó ngọt ngào, lãng mạn. Nhưng có lẽ sau này chúng ta sẽ không còn thích những chàng trai đứng dưới mưa đợi mình nữa. Bởi trải rồi, thấm rồi mới xót người đứng dưới mưa"
            }
        ]
    },
```
### Array Change Detection
#### Mutation Methods
Vue wrap các phương thức biến đổi (mutation method) của một mảng được quan sát (observe) để việc gọi phương thức này cũng sẽ kích hoạt thay đổi trên view. Các phương thức được wrap gồm có:
* push()
* pop()
* shift()
* unshift()
* splice()
* sort()
* reverse()
#### Replacing an Array
Các phương thức biến đổi, như tên gọi cho thấy, biến đổi nội dung của mảng. Chúng ta cũng có những phương thức không biến đổi (non-mutating method) như `filter()`, `concat()`, `slice()`… Thay vì biến đổi nội dung của mảng gốc, các phương thức này luôn trả về một mảng mới. Khi làm việc với các phương thức này, bạn có thể thay mảng cũ bằng mảng mới:
```js
example1.items = example1.items.filter(function (item) {
  return item.name.match(/à/)
})
```
Có thể bạn sẽ nghĩ là làm thế này Vue sẽ bỏ đi toàn bộ DOM có sẵn và render lại từ đầu, nhưng không phải thế. Vue thực hiện một số phỏng đoán thông minh để dùng lại DOM đến mức tối đa, vì thế thay thế một mảng bằng một mảng khác chứa các object chồng nhau là một cách làm rất hiệu quả.
### v-for with an Object
```html
 <ul>
           <li v-for="(value,key) in scores">{{key}}:{{value}}}</li>
       </ul>
```
```js
 data: {
        scores: {
            math: 9.0,
            english:7,
            history:9.5
        },
 ```
 ### key
 Khi cập nhật một danh sách các phần tử được render với v-for, mặc định Vue sẽ sử dụng kĩ thuật “inline patch” (hiểu nôm na là “vá tại chỗ”). Điều này có nghĩa là nếu thứ tự của các item thay đổi, thay vì dịch chuyển các phần tử web theo thứ tự tương ứng, Vue sẽ patch mỗi phần tử tại chỗ và bảo đảm phản ánh đúng những gì cần phải render tại vị trí đó. Cách xử lí này tương tự với track-by="$index" trong Vue 1.x.

Kĩ thuật nói trên rất hiệu quả, nhưng chỉ thích hợp khi danh sách cần render không phụ thuộc vào trạng thái của component con (child component state) hay trạng thái DOM tạm thời (ví dụ như thông tin người dùng nhập vào form).

Để Vue có thể nhận ra từng node và nhờ đó có thể tái sử dụng và sắp xếp các phần tử, bạn cần cung cấp một thuộc tính key với giá trị độc nhất cho từng item (ví dụ, id sẽ là một giá trị key lí tưởng). key tương đương với track-by trong 1.x, nhưng vì nó là một thuộc tính, bạn cần dùng v-bind để bind nó vào các giá trị động như sau:
```html
<!-- ở đây ta dùng shorthand `:key` thay vì `v-bind:key` -->
<div v-for="item in items" :key="item.id">
  <!-- nội dung -->
</div>
```
### `v-for` with `v-if`
Khi được dùng trên dùng một node, v-for có độ ưu tiên cao hơn v-if, có nghĩa là v-if sẽ được thực thi một cách riêng biệt trên mỗi vòng lặp của v-for. Điều này có thể có ích khi bạn muốn render cho chỉ một số item, như trong ví dụ sau:
```html
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo }}
</li>
```
Ví dụ trên sẽ chỉ render những todo chưa hoàn thành.

Ngược lại, nếu bạn muốn bỏ qua việc thực thi vòng lặp v-for theo điều kiện, hãy dùng v-if trên một phần tử wrapper (hoặc `<template>`). Ví dụ:
```html
<ul v-if="todos.length">
  <li v-for="todo in todos">
    {{ todo }}
  </li>
</ul>
<p v-else>Mọi việc đã hoàn thành.</p>
```
# Components Basics
Đây là ví dụ về một component trong Vue:
```js
// Định nghĩa một component với tên là "button-counter"
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">Bạn đã bấm {{ count }} lần.</button>'
})
```
Component là các đối tượng Vue có thể sử dụng lại được với một cái tên: trong trường hợp này là `<button-counter>`. Chúng ta có thể dùng component này như là một phần tử bên trong đối tượng Vue gốc được tạo bởi new Vue:
```html
<div id="components-demo">
  <button-counter></button-counter>
</div>
```
```js
new Vue({ el: '#components-demo' })
```
Vì là những đối tượng Vue tái sử dụng được, các component cùng nhận các tùy chọn như new Vue, ví dụ data, computed, watch, methods, và các hook vòng đời. Các ngoại lệ duy nhất là một số ít tùy chọn đặc biệt cho root như el.
## Reusing Components
Bạn có thể tái sử dụng component bao nhiêu lần tùy ý:
```html
<div id="components-demo">
  <button-counter></button-counter>
  <button-counter></button-counter>
  <button-counter></button-counter>
</div>
```
Để ý là khi bấm các nút trên đây, mỗi nút giữ một giá trị count riêng hoàn toàn tách biệt. Điều này là vì mỗi khi bạn dùng một component, một đối tượng của component đó được tạo mới.
### data Must Be a Function
 tùy chọn data của component phải là một hàm. Bằng cách này, mỗi đối tượng của component có thể duy trì một bản sao riêng biệt của đối tượng data được trả về:
 ```js
 data: function () {
  return {
    count: 0
  }
}
```
## Organizing Components
Ví dụ, bạn có thể có các component cho header, sidebar, khu vực nội dung, mỗi component này lại chứa các component dành cho trình đơn, blog post, vân vân.

Để có thể được sử dụng trong các template, component phải được đăng kí. Có hai cách đăng kí component: toàn cục và cục bộ. Trên đây chúng ta chỉ mới đăng kí component ở cấp toàn cục với Vue.component:
```js
Vue.component('my-component-name', {
  // ... tùy chọn ...
})
```
## Passing Data to Child Components with Props
Prop là các thuộc tính tùy chỉnh mà bạn có thể đăng kí trên một component. Khi một giá trị được truyền vào một prop, nó trở thành một `_prop_ertycủa đối tượng component đó. Để truyền tựa đề (title) vào component bài viết (blog-post)`, chúng ta sử dụng tùy chọn props:
```js
Vue.component('blog-post', {
  props: ['title'],
  template: '<h3>{{ title }}</h3>'
})
```
Tuy nhiên, trong một ứng dụng điển hình, bạn có lẽ sẽ có một mảng các bài viết trong data:
```js
new Vue({
  el: '#blog-post-demo',
  data: {
    posts: [
      { id: 1, title: 'Giới thiệu về Vue' },
      { id: 2, title: 'Các khái niệm trong Vue' },
      { id: 3, title: 'Vue căn bản và vô cùng nâng cao' }
    ]
  }
})
```
và sau đó render một component cho mỗi bài viết:
```html
<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title"
></blog-post>
```

Nguồn tham khảo: https://v2.vuejs.org/v2/guide/