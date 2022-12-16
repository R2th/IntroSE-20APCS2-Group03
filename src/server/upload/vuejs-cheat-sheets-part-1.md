![](https://images.viblo.asia/e1130728-4706-4cb4-9bc1-7cc5f520a7b7.png)
# Interpolations (Nội suy)
Interpolations giúp đặt hoặc hiển thị dữ liệu bằng cách sử dụng cú pháp "mustache" ("ria mép" - hai dấu ngoặc nhọn) của Vue.

## Simple interpolation
Bằng cách sử dụng cú pháp "mustache", bạn có thể hiển thị dữ liệu của mình:
```markdown:js
<span>My name is: {{ myName }}</span>
```
## Interpolation with expression
Interpolation có thể chứa các biểu thức đơn giản trong Vue.
### Simple expression interpolation
Bạn có thể sử dụng các biểu thức Javascript bên trong cú pháp "mustache":
```javascript:js
<span>I'm {{ myAge + 5 }} years old!</span>
```
Bạn cũng có thể sử dụng các phương thức để thao tác với dữ liệu của mình và trả về một string hoặc integer sẽ được hiển thị:
```php
<span>My pets' names are {{ myPets.join(", ") }}</span>
```

### Ternary operator expression interpolation
Bạn cũng có thể sử dụng toán tử ba ngôi (ternary operator) để hiển thị có điều kiện đơn giản:
```cpp:js
<span>I'm a {{ myAge > 50 ? 'kinda old' : 'young' }}!</span>
```

**Note**
* Chỉ có thể sử dụng 1 biểu thức bên trong cú pháp "mustache"
* Một biểu thức khác với một câu lệnh. VD: Code bên dưới sẽ không hoạt động, bởi vì nó không phải biểu thức, mà là một câu lệnh:
    ```js
    <!--THIS IS WRONG-->
    {{ let msg = 'Hello World!'; }}
    ```

 * Các lệnh quản lí luồng (flow control) không được hỗ trợ trong cú pháp "mustache":
    ```js
    <!--THIS IS WRONG-->
    {{ if(true) { return 'Yes!' } }}
    ```
## Raw HTML interpolation
Cú pháp "mustache" sẽ thông dịch dữ liệu ra thành văn bản thuần túy (plain text), nghĩa là các kí tự HTML đặc biệt như `<>&"'` sẽ được mã hóa. Để xuất ra HTML thuần túy, bạn sử dụng lệnh `v-html`
```html:js
<span v-html="myHTMLData"></span>
```
**Note**

Render HTML động trên trang web của bạn có thể dẫn đến `các lỗ hổng XSS`, vì thế chỉ dùng `v-html` với các nội dung đáng tin tưởng, **đừng bao giờ** dùng với các nội dung được người dùng cung cấp

# Binding (Ràng buộc)
Binding có nghĩa là sử dụng dữ liệu của bạn bên trong các thuộc tính (attributes) của tag HTML.
## Simple binding
Đã xảy ra lỗi khi mà dev Vue mới bắt đầu đã cố gắng đặt 1 dữ liệu data vào 1 thuộc tính attribute:
```html:js
<span class="{{ myClass }}"></span>
```
Nhưng điều này là sai và bạn thực sự phải ràng buộc (binding) nó:
```html:js
<span v-bind:class="myClass"></span>
```
Có 1 cách viết ngắn gọn hơn, bỏ qua `v-bind`
```html:js
<span :class="myClass"></span>
```
## Binding with concat
Điều gì sẽ xảy ra nếu bạn muốn kết hợp `string` với dữ liệu data của mình khi ràng buộc (binding)? Hãy đặt string bên trong dấu ngoặc kép và nối nó như bình thường:
```html:js
<span :class="myClass + 'test'"></span>
```
Điều này thực sự hữu ích khi sử dụng nó bên trong hyperlinks của thẻ a trong HTML
```javascript:js
<a :href="baseURL + '/post/' + postId">Read more</a>
```
## Conditional binding
Đối với các thuộc tính attribute không có giá trị như `disabled` hoặc `required` nếu data trả về true, thuộc tính sẽ được thêm vào và ngược lại nếu trả về false thì thuộc tính sẽ không được thêm vào element
```markdown:js
<button :disabled="true"></button>
```
Bạn có thể sử dụng các biểu thức (expressions) trả về boolean:
```markdown:js
<button :disabled="password.length < 6"></button>
```
Bạn cũng có thể dùng nhiều field (trường) trong object.
```html:js
<div :class="{green: true, red: false}"></div>
```
Nâng thêm chút nữa, bạn càng có thể sử dụng các toán tử so sánh và logic:
```html:js
<div :class="{green: 5 > 1, red: false && 9 < 16}"></div>
```

# Two-way data binding (Liên kết dữ liệu hai chiều)
Bằng cách sử dụng directive `v-model`, bạn có thể tạo liên kết dữ liệu hai chiều. Có nghĩa là người dùng có thể thay đổi dữ liệu bằng cách sử dụng đầu vào input và xem kết quả đồng thời nếu cần.
```html:js
//HTML
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>

//JS
let app = new Vue({
    el: '#app',
    data: {
        message: ''
    }
});

```
Directive `v-model` có thể hoạt động trên hầu hết mọi loại đầu vào `input`.
# Events (Sự kiện)
Events được gọi khi 1 hành động (action) cụ thể được thực hiện trên 1 phần tử element.

Các events được khai báo với directive `v-on`.
```html:js
//HTML
<div id="app">
    <button v-on:click="callMyfunction"></button>
</div>

//JS
let app = new Vue({
    el: '#app',
    methods: {
        callMyfunction() {
            alert('This is it!');
        }
    }
});
```
Khi button được nhấn xuống, nó sẽ gọi method `callMyfunction`.

Bạn cũng có thể sử dụng hàm ẩn danh (anonymous functions):
```javascript:js
<button v-on:click="() => alert('Hello my friend')"></button>
```
Có thể viết ngắn gọn hơn, thay `v-on:` bằng `@`
```javascript:js
<button @click="() => alert('Hello my friend')"></button>
```

# Dynamic arguments (Đối số động)
Hãy tưởng tượng khi bạn muốn đánh giá (evaluated) 1 tên thuộc tính (ở đây mình hiểu là 1 attribute tự định nghĩa). Điều này có thể thực hiện được bằng cách sau:
```html:js
<div v-bind:[myAttribute]="myData"></div>
```

Bạn cũng có thể làm tương tự với events:
```html:js
<div v-on:[myEvent]="doSomething"></div>
```

## Dynamic arguments by object
Bạn cũng có thể sử dụng 1 đối tượng:
```go:js
//HTML
<button v-on="{[myAttr]: true}">Click on me if you can</button>

//JS
let app = new Vue({
    el: '#app',
    data: {
        myAttr: 'disabled'
    }
});
```

Điều này cũng có thể được sử dụng cho các sự kiện:
```javascript:js
//HTML
<button v-on="{[myEvent]: function() { alert("Hello world!") }}">Hi</button>

//JS
let app = new Vue({
    el: '#app',
    data: {
        myEvent: 'click'
    }
});
```

# Computed properties
Computed property có thể hiểu là một “thuộc tính được tính toán”. Là một cách để làm code của bạn clean hơn và sử dụng chúng thay vì các biểu thức bên trong cú pháp "mustache" hoặc những nơi khác.

Hãy tưởng tượng bạn có đoạn code sau:
```html:js
<p>
The best programming languages are: {{ programmingLanguages }}<br>
But the worst are: {{ programmingLanguages.split(', ').reverse().join(', ') }}
</p>
```

Thay vào đó, bạn có thể xác định omputed property và sử dụng nó:
```javascript:js
//HTML
<p>
The best programming languages are: {{ programmingLanguages }}<br>
But the worst are: {{ worstProgrammingLanguages }}
</p>

//JS
let app = new Vue({
    el: '#app',
    data: {
        programmingLangauges: 'JavaScript, C#, PHP, Python, LALALA, HOHOHO'
    }
    computed: {
        worstProgrammingLanguages() {
            return this.programmingLangauges.split(', ').reverse().join(', ');
        }
    }
});
```
Computed properties như là một hàm getters, nghĩa là chúng chỉ trả về một cái gì đó và không có vai trò trong việc thiết lập dữ liệu.

Bạn có thể thay đổi hành vi (behaviour) này và đặt cả 2 hàm `get` và `set` cho dữ liệu, như bên dưới:
```javascript:js
let app = new Vue({
    el: '#app',
    data: {
        myFirstName: 'Adnan',
        myLastName: 'Babakan'
    }
    computed: {
        myFullName: {
            get(): {
                return this.myFirstName + ' ' + this.myLastName;
            },
            set(newValue): {
                let parts = newValue.split(' ');
                this.myFirstName = parts[0];
                this.myLastName = parts[1];
            }
        }
    }
});
```
Bây giờ, khi bạn gán `vm.fullName = 'Quan Tien'`, thì setter sẽ được gọi, `vm.myFirstName` và `vm.myLastName` sẽ được cập nhật tương ứng.
# Watchers
Một cách chung chung hơn để biết khi nào dữ liệu thay đổi là sử dụng trình theo dõi `watcher`.
```css:js
let app = new Vue({
    el: '#app',
    data: {
        myAge: 19
    }
    watch: {
        myAge(v) {
            console.log('I\'m now ' + v);
        }
    }
});
```
**Note:**

* Tên của watcher phải trùng với tên của data cần theo dõi.
* Các watcher phải được đặt trong watch scope. 
# Conditional render
Conditional render được sử dụng khi bạn muốn hiển thị các phần của giao diện người dùng theo (các) điều kiện.
```markdown:js
<span v-if="isUserLoggedIn">Hello user</span>
<span v-else>Hi guest!</span>
```
Các điều kiện của bạn cũng có thể có "else-if"
```javascript:js
<span v-if="favoriteColor === 'red'">Red like apple</span>
<span v-if="favoriteColor === 'blue'>Blue like sky</span>
<span v-else>Hmmm....</span>
```

Vue cố gắng render các phần tử một cách hiệu quả đến mức có thể, với một trong những cách làm là sử dụng lại thay vì tạo mới từ đầu.
Ví dụ: Nếu bạn có input để login bằng email hoặc username, việc chuyển đổi giữa 2 phần theo điều kiện sẽ không xóa và hiển thị lại input đó và giá trị đã nhập của người dùng sẽ không bị xóa:
```html:js
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address">
</template>
```
Mặc dù là như vậy, tuy nhiên không phải lúc nào đây cũng là điều bạn mong muốn. Vì thế, Vue cung cấp một thuộc tính gọi là `key`. Khi dùng `key` với giá trị độc nhất (unique), về căn bản bạn đang dặn Vue "xem hai phần tử này là hoàn toàn khác nhau và đừng dùng lại":
```html:js
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
```
## Toggle display conditional rendering
Một lựa chọn nữa cho việc hiện hoặc ẩn (đặt thuộc tính `display` là `block` hoặc `none`) một phần tử web theo điều kiện là directive `v-show`
```cpp:js
<span v-show="true">Hello there!</span>
```
**Note:**

* `v-show` hông hỗ trợ thẻ `template` và cũng không hoạt động với `v-else`.
* `v-if` là lười biếng (lazy) có nghĩa là khối có điều kiện sai ở đầu sẽ không được hiện tại, mặt khác `v-show` thực sự hiển thị nhưng ẩn khối đi bằng CSS.
# List rendering
Render ra danh sách dữ liệu cũng giống như lặp (looping) trong các ngôn ngữ lập trình khác.
## Array rendering
Sử dụng directive `v-for` để render một danh sách các item dựa trên 1 mảng.
```html:js
//HTML
<ul id="example-1">
  <li v-for="item in items">
    {{ item.message }}
  </li>
</ul>

//JS
var example1 = new Vue({
  el: '#example-1',
  data: {
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
});
```
Bạn có thể thêm tham số thứ hai (không bắt buộc) để truy cập chỉ số thứ tự (index) của phần tử mảng hiện hành.
```html:js
//HTML
<ul id="example-2">
  <li v-for="(item, index) in items">
    {{ index }} - {{ item.message }}
  </li>
</ul>

//JS
var example2 = new Vue({
  el: '#example-2',
  data: {
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
});
```
## Object rendering
Bạn cũng có thể dùng `v-for` để duyệt qua các thuộc tính của một object.
```javascript:js
//HTML
<ul id="v-for-object" class="demo">
  <li v-for="value in object">
    {{ value }}
  </li>
</ul>

//JS
new Vue({
  el: '#v-for-object',
  data: {
    object: {
      title: 'How to do lists in Vue',
      author: 'Jane Doe',
      publishedAt: '2016-04-10'
    }
  }
});
```

Bạn cũng có thể cung cấp tham số thứ hai dùng cho khóa (key) của thuộc tính:
```javascript:js
//HTML
<ul id="v-for-object" class="demo">
  <div v-for="(value, name) in object">
    {{ name }}: {{ value }}
  </div>
</ul>

//JS
new Vue({
  el: '#v-for-object',
  data: {
    object: {
      title: 'How to do lists in Vue',
      author: 'Jane Doe',
      publishedAt: '2016-04-10'
    }
  }
});
```
Tham số thứ ba chỉ thứ tự của thuộc tính:
```javascript:js
//HTML
<ul id="v-for-object" class="demo">
  <div v-for="(value, name, index) in object">
    {{ index }}. {{ name }}: {{ value }}
  </div>
</ul>

//JS
new Vue({
  el: '#v-for-object',
  data: {
    object: {
      title: 'How to do lists in Vue',
      author: 'Jane Doe',
      publishedAt: '2016-04-10'
    }
  }
});
```

## Iterate in range
Lặp lại trong 1 loạt các số cũng khá dễ dàng:
```javascript:js
<div>
  <span v-for="n in 10">{{ n }} </span>
</div>
```

# Tổng kết
Đây là những kiến thức cơ bản nhất cần nắm được khi làm việc với Vue. Do bài viết khá dài, mình xin giới thiệu tiếp với các bạn ở các phần tiếp theo. Cảm ơn các bạn đã đọc đến tận đây nhé!

**Nguồn:**

https://dev.to/adnanbabakan/vue-cheat-sheet-1-194a

https://vuejs.org/v2/guide/index.html