# 1. Vue Js là gì?
Vue (phát âm là / vjuː /, like view ) là một khung JavaScript để xây dựng giao diện người dùng. Nó được xây dựng dựa trên HTML, CSS và JavaScript tiêu chuẩn, đồng thời cung cấp mô hình lập trình dựa trên thành phần và khai báo giúp bạn phát triển hiệu quả các giao diện người dùng, dù đơn giản hay phức tạp.

# 2. Vue instance
### Khởi tạo một vue instance
 Một ứng dụng Vue luôn được bắt đầu bằng cách khởi tạo một đối tượng Vue (Vue instance) sử dụng hàm Vue:
 dùng để quản lý 1 thành phần trong trang web.
 ```javascript
 var app = new Vue({
   //component options
 })
  ```
  Khi khởi tạo một đối tượng Vue, bạn truyền vào một object options với các tùy chọn. Phần lớn bản hướng dẫn này sẽ mô tả cách sử dụng các tùy chọn đó để tạo ra behavior (hành vi) mong muốn. Bạn cũng có thể tham khảo danh sách đầy đủ các tùy chọn ở trang API.

Một ứng dụng Vue bao gồm một đối tượng Vue gốc (root Vue instance) được tạo với lệnh new Vue. Ứng dụng này cũng thường được sắp xếp thành một cây gồm các component lồng nhau và tái sử dụng được

### Element
Dùng để trỏ đến thành phần muốn quản lý.
ví dụ ở đây chúng ta muốn qquanr lý thành phần có id là app:
```javascript
<div id="app">
        <button @click="count++">{{ count }}</button>
</div>
```

```javascript
var app = new Vue({
    el:"#app"
})
```
### Data và method
Khi một đối tượng Vue được khởi tạo, tất cả các thuộc tính (property) được tìm thấy trong object data sẽ được thêm vào reactivity system (hiểu nôm na là “hệ thống phản ứng”) của Vue. Điều này có nghĩa là view sẽ “react” (phản ứng) khi giá trị của các thuộc tính này thay đổi, và tự cập nhật tương ứng với các giá trị mới.
```javascript
var app = new Vue({
    el:"#app",
    data: {
        //dữ liệu của thành phần muốn quản lý
    },
    method: {
        //các phương thức để quản lý
    }
})
```
# 3. Syntak Template
### Text Interpolation
Hình thức liên kết dữ liệu cơ bản nhất là nội suy văn bản sử dụng cú pháp "Mustache" (dấu ngoặc nhọn kép):
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <title>Document</title>
</head>
<body>
    <div id="app">
        {{ msg }}
    </div>
</body>
<script src="main.js"></script>
</html>
```
```javascript
var app = new Vue({
    el:"#app",
    data: {
       msg: "Hello World"
    },
 
})
```
### Raw HTML
Bộ dấu ngoặc kép diễn giải dữ liệu dưới dạng văn bản thuần túy, không phải HTML. Để xuất ra HTML thực, bạn sẽ cần sử dụng v-htmlchỉ thị :

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <title>Document</title>
</head>
<body>
    <div id="app">
        <span v-html="msg"></span>
    </div>
</body>
<script src="main.js"></script>
</html>
```
Thuộc tính  `v-html` bạn đang thấy được gọi là chỉ thị . Các chỉ thị có tiền tố là` v-`để chỉ ra rằng chúng là các thuộc tính đặc biệt do Vue cung cấp và như bạn có thể đoán, chúng áp dụng hành vi phản ứng đặc biệt cho DOM được hiển thị. Ở đây, về cơ bản chúng tôi đang nói "giữ cho HTML bên trong của phần tử này được cập nhật với thuộc tính `msg` trên phiên bản hoạt động hiện tại.
### Attribute Bindings
Cú pháp mustache không dùng được bên trong các thuộc tính HTML. Thay vào đó, bạn hãy dùng directive v-bind:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <title>Document</title>
</head>
<body>
    <div id="app">
        <a v-bind:href= "url">{{msg}}</a>
    </div>
</body>
<script src="main.js"></script>
</html>
```
```javascript
var app = new Vue({
    el:"#app",
    data: {
       msg: "Hello World",
       url: "https://vuejs.org/guide/essentials/template-syntax.html#raw-html"
    },
 
})
```

Directive này cũng hoạt động với các thuộc tính boolean như disabled và selected - các thuộc tính này sẽ được bỏ đi khi biểu thức được tính toán trả về kết quả sai (falsy):
```html
<div id="app">
        <a v-bind:href= "url">{{msg}}</a>
            <button v-bind:disabled="isButtonDisabled">No Active</button>
    </div>
```
```javascript
var app = new Vue({
    el:"#app",
    data: {
       msg: "Hello World",
       url: "https://vuejs.org/guide/essentials/template-syntax.html#raw-html",
       isButtonDisabled: 0
    },
 
})
```
### Using JavaScript Expressions
Cho đến nay chúng ta chỉ mới bind vào các khóa thuộc tính dơn giản trong template. Tuy nhiên, thật ra Vue hỗ trợ sức mạnh toàn diện của các biểu thức JavaScript bên trong toàn bộ các ràng buộc dữ liệu (data binding):
```html
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div v-bind:id="'list-' + id"></div>
```
Các biểu thức này sẽ được tính toán dưới dạng JavaScript trong scope của đối tượng Vue hiện hành. Một hạn chế ở đây là mỗi ràng buộc chỉ có thể chứa một biểu thức đơn lẻ, vì thế các trường hợp sau sẽ không hoạt động:
```html
<!-- đây là một khai báo, không phải biểu thức: -->
{{ var a = 1 }}

<!--
  các lệnh quản lí luồng (flow control) cũng sẽ không hoạt động,
  thay vào đó bạn hãy dùng toán tử ba ngôi (ternary operator):
-->
{{ if (ok) { return message } }}
```
### Modifier
Modifier là các hậu tố (postfix) đặc biệt được đánh dấu bằng một dấu chấm, chỉ rõ rằng một directive phải được ràng buộc theo một cách đặc biệt nào đó. Ví dụ, modifier `.prevent` hướng dẫn` directive v-on` gọi `event.preventDefault()` khi sự kiện được kích hoạt:
```html
<form @submit.prevent="onSubmit">...</form>
```
# 4. Computed property và watcher

### Computed property
Computed property có thể hiểu là một “thuộc tính được tính toán.” Để cho nhất quán, chúng tôi sẽ giữ nguyên cụm từ computed property.

Viết biểu thức trực tiếp trong template rất tiện, nhưng chỉ dành cho những biểu thức có tính toán đơn giản. Những biểu thức phức tạp được viết theo cách đó sẽ khiến template cồng kềnh và khó bảo trì. Ví dụ:
```html
<div id="example">
  {{ message.split('').reverse().join('') }}
</div>
```
Đến đây, template không còn đơn giản và mang tính khai báo (declarative) nữa. Bạn sẽ phải mất chút thời gian thì mới nhận ra được message đã bị đảo ngược. Càng tệ hơn khi bạn sử dụng biến message đảo ngược này nhiều lần trong code.

ví dụ:
```html
<div id="example">
  <p>Thông điệp ban đầu: "{{ message }}"</p>
  <p>Thông điệp bị đảo ngược bằng tính toán (computed): "{{ reversedMessage }}"</p>
</div
```
```js
var vm = new Vue({
  el: '#example',
  data: {
    message: 'người đông bến đợi thuyền xuôi ngược'
  },
  computed: {
    // một computed getter
    reversedMessage: function () {
      // `this` trỏ tới đối tượng vm
      return this.message.split(' ').reverse().join(' ')
    }
  }
})
```

### Computed caching và phương thức
Bạn có lẽ đã nhận ra chúng ta cũng có thể đạt được cùng một kết quả bằng cách sử dụng một phương thức:
```html
<p>Thông điệp bị đảo ngược: "{{ reverseMessage() }}"</p>
```
```js
var vm = new Vue({
  el: '#example',
  data: {
    message: 'người đông bến đợi thuyền xuôi ngược'
  },
  // trong component
methods: {
  reverseMessage: function () {
    return this.message.split(' ').reverse().join(' ')
  }
})
```
Thay vì sử dụng` computed property`, chúng ta cũng có thể dùng một phương thức thay thế. Nếu xét về kết quả cuối cùng thì hai cách tiếp cận này thât ra chỉ là một. Tuy nhiên, sự khác biệt ở đây là `computed property` được `cache` lại dựa vào những những thành phần phụ thuộc (dependency). Một `computed property` chỉ được tính toán lại khi những thành phần phụ thuộc của chúng thay đổi. Điều này có nghĩa: miễn là giá trị của` message `không thay đổi, thì những truy cập tới` computed reversedMessage` sẽ ngay lập tức trả về kết quả được tính toán trước đó mà không phải chạy lại hàm một lần nữa.
### Computed và watched
Vue cung cấp một cách khái quát hơn để quan sát và phản ứng (react) lại những thay đổi trên dữ liệu: watch property. Khi bạn có một số dữ liệu cần được thay đổi dựa trên những dữ liệu khác, bạn rất dễ lạm dụng watch - nhất là nếu bạn có nền tảng về AngularJS. Tuy nhiên, thường thì bạn nên dùng computed thay vì watch. Hãy xem ví dụ sau:
```html
<div id="demo">{{ fullName }}</div>
```
```js
var vm = new Vue({
  el: '#app',
  data: {
    firstName: 'Phạm',
    lastName: 'Đức',
    fullName: 'Phạm Đức'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
```
Đoạn code phía trên theo hướng mệnh lệnh và lặp lại. Hãy so sánh với phiên bản dùng computed property:
```js
var vm = new Vue({
  el: '#app',
  data: {
    firstName: 'coder',
    lastName: 'duc'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
```
### Watcher
Computed property thích hợp cho hầu hết các trường hợp, nhưng cũng có lúc cần tới những watcher tùy biến. Đó là lí do tại sao Vue cung cấp một cách khái quát hơn để phản ứng lại với việc thay đổi dữ liệu trong watch. Cách sử dụng này rất hữu ích khi bạn muốn thực hiện những tính toán không đồng bộ và tốn kém liên quan đến việc thay đổi dữ liệu.
```html
<div id="watch-example">
  <p>
    Hãy hỏi một câu hỏi yes/no:
    <input v-model="question">
  </p>
  <p>{{ answer }}</p>
</div>
```
```js
<script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>
<script>
var watchExampleVM = new Vue({
  el: '#watch-example',
  data: {
    question: '',
    answer: 'Không thể trả lời nếu bạn chưa đặt câu hỏi!'
  },
  watch: {
    // bất cứ lúc nào câu hỏi thay đổi, hàm bên dưới sẽ chạy
    question: function (newQuestion, oldQuestion) {
      this.answer = 'Đang chờ bạn đặt xong câu hỏi...'
      this.getAnswer()
    }
  },
  methods: {
    // _.debounce là một hàm do Lodash cung cấp
    // Để tìm hiểu rõ hơn cách hoạt động của hàm này,
    // bạn có thể truy cập: https://lodash.com/docs#debounce 
    getAnswer: _.debounce(
      function () {
        if (this.question.indexOf('?') === -1) {
          this.answer = 'Câu hỏi thì thường chứa một dấu "?" ;-)'
          return
        }
        this.answer = 'Đang suy nghĩ...'
        var vm = this
        axios.get('https://yesno.wtf/api')
          .then(function (response) {
            vm.answer = _.capitalize(response.data.answer)
          })
          .catch(function (error) {
            vm.answer = 'Lỗi! Không thể truy cập API. ' + error
          })
      },
      // Đây là thời gian (đơn vị mili giây) chúng ta đợi người dùng dừng gõ.
      500
    )
  }
})
</script>
```
Trong trường hợp này, sử dụng watch cho phép chúng ta thực hiện những tính toán không đồng bộ (ví dụ: truy cập tới một API), giới hạn việc chúng ta thường xuyên thực hiện tính toán đó và gán trạng thái trung gian cho tới khi chúng ta có được kết quả cuối cùng. Nếu dùng computed property bạn sẽ không làm được những chuyện này.
# 5. Binding cho class và style
Một nhu cầu thường gặp khi thực hiện ràng buộc dữ liệu (data binding) là quản lí danh sách class và các style của một phần tử web. Vì cả class và style đều là thuộc tính, chúng ta có thể dùng v-bind để xử lí: chỉ cần sử dụng các biểu đạt (expression) để tạo ra một chuỗi. Tuy nhiên, vì can thiệp vào việc nối chuỗi rất phiền phức và dễ mắc lỗi, Vue cung cấp một số tính năng hỗ trợ khi v-bind được dùng với class và style. Không chỉ có chuỗi, các biểu đạt này có thể xử lí cả mảng và object.
  
## Binding class trong HTML
### Sử dụng cú pháp object
Ta có thể truyền một object vào v-bind:class để bật tắt class một cách linh hoạt:
```html
<div v-bind:class="{ active: isActive }"></div>
```
Cú pháp như trên nghĩa là class active sẽ được áp dụng tùy theo tính đúng sai (truthiness) của thuộc tính dữ liệu isActive.

Bạn có thể bật tắt nhiều class bằng cách dùng nhiều field (trường) trong object. Thêm vào đó, directive v-bind:class và thuộc tính class thông thường có thể được dùng cùng lúc với nhau. Nếu chúng ta có template sau:
```html
<div class="static"
     v-bind:class="{ active: isActive, 'text-danger': hasError }">
</div>
```
```js
data: {
  isActive: true,
  hasError: false
}
```
kết quả sẽ là
```html
<div id="app"><a href="https://vi.vuejs.org/v2/guide/syntax.html">Hello World</a> 
    <button disabled="disabled">Hòn Vọng Phu</button> 
    <div class="static active"></div>
</div>
```
Nhưng với cách trên chỉ sử dụng trong trường hợp ít class còn nếu nhiều class thì ta có thể nghĩ đến methods hoặc computed

sau đây là ví dụ sử dụng computed:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
    <title>Binding Class</title>
    <style>
        .demo{
            background-color: yellow;
        }
        .active {
            background-color: green;

        }
        .error {
            background-color: red;
        }
    </style>
</head>
<body>
    <div id="app">
        <button v-on:click="changeActive">changeActive</button>
        <button v-on:click="changeError">changeError</button>
        <div class="demo"v-bind:class="obj">text</div>
    </div>
</body>
<script src="/bindingClass/main.js"></script>
</html>
```
```js
var app = new Vue({

    el:"#app",
    data:{
        typeText: 'active',
        isActive: true,
        isError:false
    },
    methods: {
         changeActive(){
            this.isActive = !this.isActive
         },
         changeError(){
             this.isError = !this.isError
         }
    },
    computed: {
        obj: function(){
            return {
                active: this.isActive,
                error: this.isError
            };
        }
    }
})
```
## Binding cho inline style
### Sử dụng cú pháp object

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
    <title>Document</title>
</head>
<body>
    <div id="app">
        <div v-bind:style="objStyle">
        <div v-bind:style="styleObject">Name</div>
    </div>
</div>
</body>
<script src="/bindingStyle/main.js"></script>
</html>
```

```js
var app = new Vue({

    el:"#app",
    data: {
          color: 'red',
          fontSize: '13px',
          height:'1000px',
          bg: "https://mondaycareer.com/wp-content/uploads/2020/11/background-%C4%91%E1%BA%B9p-3-1024x682.jpg"
      },
    
    computed: {
        objStyle: function(){
            return {
               backgroundImage: 'url('+this.bg+')',
               height: this.height
            };
        }
    }
})
```
Nguồn tham khảo: https://v2.vuejs.org/v2/guide/