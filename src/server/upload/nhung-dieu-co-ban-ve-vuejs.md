# 1. Giới thiệu về VueJS.
![](https://images.viblo.asia/0f5f7851-90c6-44cb-8d77-627205248ec6.png)

Nếu bạn là một người sử dụng javascript để làm việc thì hẳn đã nghe về Vue.JS một framework cực kỳ mạnh mẽ. Hôm nay, bằng kiến thức của một người mới tiếp cận với **VueJS**, mình sẽ giới thiệu cho mọi người những thứ cơ bản về  **vuejs**.

Vậy **VueJS** là gì?

Nó là một framework javascript được xây dựng lên bởi Evan You, nó giúp chúng ta xây dựng giao diện người dùng hoặc **Single Page Application**.  Nó được xây dựng dựa trên HTML, CSS và JavaScript tiêu chuẩn, đồng thời cung cấp mô hình lập trình dựa trên các **component** và khai báo nó giúp bạn phát triển hiệu quả các giao diện người dùng, dù đơn giản hay phức tạp.

# 2. Những kiến thức cơ bản.
## 2.1 Vue Instance, vòng đời một instance.
* Đầu tiên chúng ta cần hiểu instance là gì.

**Instance** là một đối tượng trong Vue.js. Để khởi tạo một đối tượng ở trong Vue chúng ta sử dụng:
```js
const vm = new Vue({
    // options 
})
```
VD:
```js
const vm = new Vue({
    el: '#app',
    data: {
        return {
            count: 0
        }
    }
})
```

Ở ví dụ trên, Vue đã thực hiện selector với thành phần có id là `app` và khởi tạo dữ liệu `count` để chúng ta có thể sử dụng và render ra chúng.

### **Vòng đời của một instance**
Gồm 4 giai đoạn chính:

* Khởi tạo (creating)
* Gắn vào DOM (mounting)
* Cập nhật DOM (updating)
* Hủy instance (destroying)

Trong mỗi giai đoạn sẽ có các hook tương ứng được chạy.  Bạn có thể hiểu đơn giản `hook` là một function được gọi vào những thời điểm cụ thể của giai đoạn đó.

[Bạn có thể vào đây để xem về xong đời của Vue instance](https://vuejs.org/guide/essentials/lifecycle.html)

## 2.2 Cú pháp trong template
```js
//Ở đây mình sẽ sử dụng CDN nhé (các bạn cứ vứt link vue cuối thẻ body là được).

<script src="https://unpkg.com/vue@next"></script> //đây là link vue mình sử dụng
```

Vừa rồi ở trên mình đã ví dụ về việc tạo một dữ liệu `count` để sử dụng và render nó. Vậy làm thế nào để chúng ta có thể render nó ra màn hình?

Để có thể render ra chúng ra để chúng ở giữa 2 dấu `{{ }}` này. Cụ thể:
```HTML
<p>{{ count }}</p>
```
Kết quả khi bạn chạy chương trình chúng ta sẽ thấy `0` hiển thị ở đó.

vậy nếu chúng ta muốn render ra màn hình một câu `Tôi đang học vue` thì làm thế nào?

Đơn giản bạn chỉ cần thay `0` thành `"Tôi đang học vue"` là được rồi.

Tương tự chúng ta cũng có thể render ra 1 thẻ HTML thì chúng ta chỉ cần sử dụng **directive** của Vue với cú pháp `v-`. Ví dụ:
```HTML
<p v-html="count"></p>
```
Chúng ta cũng có thể sử dụng các thuộc tính của thẻ HTML, nhưng không phải là sử dụng dấu `{{ }}` này mà chúng ta cần sử dụng `v-bind:parameter="value"` với `parameter` là thuộc tính cần sử dụng và `value` là giá trị. Cụ thể:
```HTML
<button v-bind:disabled="true" ></button>
```
Chúng ta cũng có thể thay `true` bằng một function với giá trị return là `true` or `false`  hay một dữ liệu có giá trị tương tự.

Ngoài ra chúng ta cũng có thể tăng tính rằng buộc cho directive bằng Modifier. vd: bạn muốn submit form mà không muốn load lại trang web thì bạn có thể sử dụng:
```HTML
<form v-on:submit.prevent="method">...</form>
```
Note: bạn cũng có thể rút gọn chúng `v-on:click`-> `@click`, `v-bind:href` -> `:href`.

## 2.3 Methods
Như bạn đã thấy ở ví dụ `form` ở trên mình đã nhắc tới `method` vậy trong `Vue` chúng ta cài đặt chúng như nào?

Để khởi tạo một function chúng ta chỉ cần thêm option `methods` và viết function ở trong đó là được. Cụ thể:
```js
const vm = new Vue({
    el: '#app',
    data() {
        return: {
            number: 0,
            message: "Bạn vừa tăng thêm 1 đơn vị"
        },
        methods: {
            plusNumber() {
                this.number += 1
                alert(this.message)
            },
            subtractNumber(value) {
                this.number -= value
            }
        }
    }
})
```

```HTML
<p>{{ number }}</p>
<button @click="plusNumber">plus 1</button>
<button @click="subtractNumber(1)">subtract 1</button>
```
Một khi chúng ta click vào button `plus` thì  number sẽ tăng 1 và ngược lại.

## 2.4 Computed, watchers.
### Computed properties.
Để hiểu được về `computed` thì chúng ta làm thử 1 ví dụ trước:
```js
 var vm = new Vue({
     el: '#app',
     data() {
         number: 0
     }, 
     methods: {
        plusNumber () {
           return this.number++
        }
     }
     computed: {
        plusNumber () {
           return this.number++
        }
     }
 })
```
Theo các bạn chúng ta sẽ sử dụng cái nào trong trường hợp trên khi `plusNumber` được gọi.

Để biết trường hợp nào được gọi thì chúng ta cần biết khi sử dụng `computed` thì chúng ta sẽ không có tham số đầu vào và khi gọi chúng ta chỉ cần gọi `plusNumber` mà không cần `plusNumber()`. Đó chính là điểm khác biết giữa computed và method khi sử dụng.

**Computed** có khả năng Cache lại dữ liệu khi gọi function này lần đầu tiên để những lần tiếp theo nó sẽ lấy ra dữ liệu ở trong cache đã được xử lý qua computed. Ngược lại method thì không.

Cuối cùng **Computed** thường thực hiện với dữ liệu có trong instance để hạn chế việc tính toán và lấy dữ liệu ở trong cache.

### watchers:
watchers dịch ra là `người theo dõi` và công việc của nó cũng như cách gọi. Nó dùng để theo dõi sự thay đổi của dữ liệu của đối tượng. Chúng ta sẽ khai báo `watcher` giống như methods và computed.  vd:
```js
const vm = new Vue({
    el: '#app',
    data() {
        return {
            count: 0
        },
        watch: {
            count(value) {
                this.count++
            }
        }
    }
})
```

**Tổng kết lại : cả methods, computed properties, watchers đều có những ưu điểm riêng nhưng tùy vào mục đích sử dụng cụ thể mà chúng ta sẽ áp dụng chúng một cách tối ưu nhất.**
## 2.5 Binding, Render, Xử lý sự kiện.
### Binding
Binding là rằng buộc cụ thể dữ liệu vào một phần tử web. Cú pháp sử dụng là `v-bind`. Chúng ta có thể binding class, binding style bằng cách sử dụng v-bind:class hoặc v-bind:style. Dưới đây mình chỉ nói về binding class vì binding style tương tự vậy.

Ví dụ:
```HTMl
<div class="static"
    v-bind:class="{ 'error': hasError }">
</div>
```

với dữ liệu:
```js
data: {
  hasError: true
}
```

Kết quả là:
```HTML
<div class="static error"></div>
```
### Render
Ở đây mình chỉ nói về việc render có điều kiện vì nếu không có điều kiện thì ở trên mình đã nói rồi. 

Để render dữ liệu theo điều kiện , chúng ta có 2 cách là  `v-if` và `v-show`:
```js
data: {
  show: true
}
```
v-if:
```HTML
<div v-if="show"></div>
```
v-show:
```HTML
<div v-show="show"></div>
````

Cả `v-if` và `v-show` đều có thể dùng để render dữ liệu ra màn hình nhưng `v-if` sẽ xóa bỏ template nếu điều kiện sai còn `v-show` chỉ ẩn đi bằng css.

Để render ra một danh sách thì chúng ta sử dụng `v-for`. Ví dụ:
```js
const vm = new Vue({
    el: '#app',
    data() {
        lists: [1, 2, 3, 4, 5, 6]
    }
})
```
```HTML
<ul>
    <li v-for="item in list">{{ item }}</li>
</ul>
```

### Form Input Binding:
Đối với việc lập trình web thì việc làm việc với form là điều không thể tránh khỏi. Vue cũng cung cấp cho chúng ta các răng buộc với form. 
* `v-model` dùng để rằng buộc dữ liệu với form. Khi nhập dữ liệu từ ô input thì nó sẽ được cập nhật vào thuộc tính cùng tên ở `data` của Vue.
```js
const vm = new Vue({
    el: '#app',
    data() {
        message: ''
    }
})
```
```HTML
<input v-model="message" placeholder="nhập nội dung">
```
### Xử lý sự kiện:
Chúng ta có thể dùng directive `v-on` để lắng nghe các sự kiện DOM và thực thi JavaScript khi những sự kiện này được kích hoạt. Ví dụ:
```HTML
<div id="example-1">
    <button v-on:click="counter += 1">Đếm cừu</button>
    <p>{{ counter }} con cừu.</p>
</div>
```
```js
var example1 = new Vue({
    el: '#example-1',
    data: {
        counter: 0
    }
})
```
Ngoài `click` thì các bạn có thể tìm hiểu thêm về xử lý sự kiện từ phím khác tại: [Xử lý sự kiện](https://vi.vuejs.org/v2/guide/events.html#Event-modifier)
# 3. Tổng kết.
Qua các ví dụ ở trên thì chúng ta có thể nắm được cách tạo một Vue instance, các cú pháp sử dụng, cách render dữ liệu. Rất mong bài viết này sẽ giúp ích được cho mọi người.