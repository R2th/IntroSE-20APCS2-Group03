# Giới thiệu
Gọi tắt là Vue (phát âm giống như view trong tiếng Anh), Vue.js là một framework linh động dùng để xây dựng giao diện người dùng (user interfaces). Khác với các framework nguyên khối (monolithic), Vue được thiết kế từ đầu theo hướng cho phép và khuyến khích việc phát triển ứng dụng theo từng bước. Khi phát triển lớp giao diện (view layer), người dùng chỉ cần dùng thư viện lõi (core library) của Vue, vốn rất dễ học và tích hợp với các thư viện hoặc dự án có sẵn. Cùng lúc đó, nếu kết hợp với những kĩ thuật hiện đại như SFC (single file components) và các thư viện hỗ trợ, Vue cũng đáp ứng được dễ dàng nhu cầu xây dựng những ứng dụng một trang (SPA - Single-Page Applications) với độ phức tạp cao hơn nhiều.

# Sử dụng 
Để dùng thử Vue.js, không gì dễ hơn là bắt đầu với một ví dụ Hello World trên JSFiddle. Hãy mở ví dụ này trong một tab khác và làm theo những ví dụ cơ bản mà chúng tôi sẽ nhắc đến dần sau đây. Bạn cũng có thể tạo một file index.html và nhúng thư viện Vue vào:
```javascript
<!-- bản phát triển (development), bao gồm những cảnh báo hữu ích trong console -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
```

# Render View
Vue.js cho phép chúng ta render (kết xuất) dữ liệu lên DOM theo hướng khai báo (declarative, thay vì hướng mệnh lệnh – imperative) sử dụng một cú pháp đơn giản:
```javascript
<div id="app">
  {{ message }}
</div>

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hiện thỉ Hello world ra đây!!!!!!!!!!!!!!!!'
  }
})
```

Ngoài việc quản lí và chỉnh sửa văn bản, chúng ta cũng có thể bind các thuộc tính của phần tử web, như sau:
```javascript
<div id="app-2">
  <span v-bind:title="message">
    hiển thị title đc bind vào span 
  </span>
</div>


var app2 = new Vue({
  el: '#app-2',
  data: {
    message: 'Đây là nội dung sẽ show lên khi hover vào span !!!!!!!!!!!!!!!!!!!!!!!!!!!'
  }
})
```

Thuộc tính v-bind mà bạn thấy trên đây được gọi là một directive. Một directive trong Vue được bắt đầu với v- để chỉ định rõ rằng đây là một thuộc tính riêng do Vue cung cấp, đồng thời thuộc tính này sẽ áp dụng một hành vi (behavior) đặc biệt lên kết quả DOM được render ra. Trong ví dụ này, directive v-bind về cơ bản là đang giữ thuộc tính title của phần tử web luôn luôn đồng nhất với property message của đối tượng Vue được khởi tạo.
Bây giờ nếu bạn mở console JavaScript lần nữa và nhập vào app2.message = 'Cái gì đó khác', bạn sẽ thấy HTML được bind – trong trường hợp này là thuộc tính title – được cập nhật tương ứng.

# sử dụng condition và loop trong VueJS
Cấu trúc sự dụng condition If ở trong JS khá đơn giản ,tương tự như trong Angular ,ví dụ :
```javascript
<div id="app-3">
  <span v-if="isShow">Show Hide theo điều kiệu if</span>
</div>

var app3 = new Vue({
  el: '#app-3',
  data: {
    isShow: true
  }
})
```

Ngoài v-bind và v-if chúng ta còn có thêm nhiều directive nữa, với các tính năng đặc biệt khác nhau. Ví dụ, directive v-for có thể được dùng để trình bày một danh sách các item sử dụng dữ liệu từ một mảng:
```javascript
<div id="app-4">
  <ol>
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>
  </ol>
</div>

ar app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
      { text: 'VueJS' },
      { text: 'AngularJS' },
      { text: 'BackBoneJS' }
    ]
  }
})
```

Để người dùng tương tác với ứng dụng, chúng ta có thể dùng directive v-on để đính kèm các event listener và gọi các method trên đối tượng Vue.
```javascript
<div id="app-5">
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">Click vào đây</button>
</div>

var app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'Đảo qua đảo lại đảo lại đảo'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split(' ').reverse().join(' ')
    }
  }
})
```

Trên đây chúng ta đã lược qua những tính năng cơ bản nhất của Vue.js. Phần còn lại của bản hướng dẫn sẽ đi sâu vào những tính năng này, đồng thời đề cập một cách chi tiết đến những tính năng cao cấp hơn.  (part 2)