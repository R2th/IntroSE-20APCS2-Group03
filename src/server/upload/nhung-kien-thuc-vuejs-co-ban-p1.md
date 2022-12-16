Xin chào mọi người. Trước mình cũng viết một số bài với chủ đề về VueJs rồi nhưng chưa đầy đủ, nay mình bắt đầu viết trọn bộ series kiến thức cơ bản về VueJs mong mọi người cùng đón đọc.
![](https://images.viblo.asia/1786fae7-9525-4a1f-bba8-363961b88ff7.jpeg)

Về bài đầu tiên này mình xin giới thiệu những kiến thức cơ bản như sau
1. Vue instance
2. Dữ liệu (data)
3. Phương thức
4. Directives

## Vue instance
Vue được thiết kế theo pattern MVVM, theo một cách hiểu đơn giản là Vue nằm trung gian giữa View và Model
![](https://images.viblo.asia/2d7c58e9-4d0d-46d9-b00a-f95fe1d280a5.jpg)
Một ứng dụng VueJs được tạo bằng cách khởi tạo một đối tượng Vue gọi là  **Vue instance** hoạt động theo mô hình Model-view
``` php
var vm = new Vue({
  // các tùy chọn
})
```
Một Vue Instance thường bao gồm các thông tin data và methods
ví dụ:
``` php
<script type="text/javascript">
    var app = new Vue({
        el: '#app',
        data: {
            message: 'hello world'
        },
        methods: {
            initialVue : function () {
                return this.message;
            }
        }
    });
</script>
```

## Dữ liệu (data)
Khi khởi tạo một Vue instance  tất cả các thuộc tính (property) được đặt trong dữ liệu của đối tượng được sử dụng để render trong template, khi giá trị của các thuộc tính này thay đổi đồng thời sẽ tự cập nhật tương ứng với các giá trị mới cập nhật.  Data trong VueJs thể hiện mạnh mẽ và đa dạng, có thể là string, object, array, number ...

``` php
<template>
    <div id="app">
        <p> My car : {{ cars[1] }}</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                cars: ['Ford', 'Toyota', 'Hyundai', 'Vin']
            }
        }
    }
</script>
```

## Phương thức
Trong Vue ta có thể viết các hàm để thực hiện các công việc bất kỳ. Các hàm này có thể sử dụng trong template và script
``` php
<template>
    <div id="app">
        <p>Message: {{ reverseMessage() }}</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: 'Hello Vue.js!'
            }
        },
        methods: {
            reverseMessage() {
                return this.message.split('').reverse().join('');
            }
        }
    }
</script>
```

## Computed
Đây là thuộc tính sẽ tính toán lại những biến hoặc object được khai báo trong thuộc tính data mỗi lần render lại. Hay nói một cách khác nó cho phép khai báo các phương thức trả về giá trị giống như methods nhưng chỉ tính toán lại khi có thay đổi, còn các phương thức trong methods thì luôn được tính toán lại mỗi lần gọi.

Ví dụ:
``` php
<template>
    <div class="my-component">
        <div>{{ reverseMessage }}</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: 'this is text'
            }
        },
        computed: {
            reverseMessage() {
                return this.message.split('').reverse().join('')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .my-component {
        color: red;
    }
</style>
```

computed reverseMessage sẽ chỉ tính toán lại mỗi khi các biến phụ thuộc trong nó thay đổi, còn methods sẽ được tính toán bất kì khi nào nó được gọi, nên nếu tận dụng computed để tính toán các dữ liệu có sẵn thì sẽ cải thiện được performance.

## Directives
Directives là các thuộc tính HTML dùng để chèn chúng vào các phần tử DOM và nó được bắt đầu bằng tiền tố v- , thể hiện cách chúng phản ứng với DOM được hiển thị giao diện dựa trên phần dữ liệu trong script.

### v-if

Trong vue.js chúng ta sử dụng v-if directive để thực hiện các render có liên quan đến điều kiện.

`<h1 v-if="true">Hello</h1>`

Lúc này,giá trị bên trong v-if là true nên thẻ h1 sẽ được hiển thị, còn là false thì thẻ h1 sẽ được ẩn. Điều này tương tự như cách hoạt động của câu lệnh if else bình thường chỉ có điều khác ở cách trình bày. Và bạn cũng có thể kết hợp với v-else.

``` php
<h1 v-if="false">hello</h1>
<h1 v-else >Bye</h1>
```

### v-show

v-show cũng tương tự v-if. Tức là giá trị bên trong v-show trả về true thì tag chứa nó sẽ hiển thị và ngược lại giá trị bên trong nó là false thì tag chứa nó sẽ ẩn. Tuy nhiên v-if và v-show có điểm khác nhau cơ bản là với v-if thì nội dung sẽ hoàn toàn không được sinh ra thành HTML còn  với v-show luôn luôn được render nó chỉ ẩn đi bằng css còn lại thì trên DOM vẫn tồn tại tag chứa nó.

``` php
<h1 v-show="show">hello</h1>
```

! Đối với trường hợp dữ liệu thay đổi nhiều trong một lần chạy thì bạn nên chọn v-show vì nó chỉ render lần đầu khi chạy. Còn đối với dữ liệu không thay đổi trong 1 lần chạy thì nên chọn v-if vì nó có tính chất private hơn.

### v-bind

dùng để lấy dữ liệu và hiển thị ra template, Ta có thể truyền một object vào v-bind:class để bật tắt class một cách linh hoạt:

`<div v-bind:class="{ active: isActive }"></div>`

Cú pháp như trên nghĩa là class active sẽ được áp dụng tùy theo tính đúng sai của thuộc tính dữ liệu isActive.

### v-for

Để thực hiện vòng lặp ta có thể sử dụng v-for

``` php
<template>
    <div id="app">
        <ul>
            <li v-for="item in items">{{ item }}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: ['Cà phê', 'Trà đặc', 'Bò húc']
            }
        }
    }
</script>
```

Kết quả: 

* Cà phê
* Trà đặc
* Bò húc

**v-for** cũng hỗ trợ một tham số thứ hai (không bắt buộc) chỉ số thứ tự (index) của phần tử mảng hiện hành.

``` php
<ul>
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.name }}
  </li>
</ul>
```

### v-html

 đây là drective bind 1 đoạn text trong đó có chứa các thẻ, Vue sẽ tự động hiểu để gen ra UI bằng cặp ngoặc nhọn sẽ tự động được escape để tránh dạng tấn công XSS
``` php
<div v-html="<p>Xin chao ban</p>"></div>
```

### v-model
thường xuất hiện trong thẻ input(ta viết như thuộc tính của thẻ input). Trình biên dịch khi xử lý đoạn mã này nó sẽ biết v-model là câu lệnh nhằm chỉ thị gán giá trị đối tượng
``` php
<div id="app">
    <input type="text" v-model="name" />
    <p>{{ name }}</p>
</div>

<script>
    new Vue({
        el: '#app',
        data: {
            name: ''
        }
    });
</script>
```
Khi chúng ta điền vào ô input thì tự động dòng text dưới ô input sẽ tự động fill theo. Thực chất cơ chế của nó là như này `v-model="name" - @input="name == $event.target.value"` Vue sẽ sử dụng `event .chang`e để bắt lấy khi chúng ta nhập cái gì thì sẽ cập nhật giá trị vào ngay biến.

## Kết bài
Kết thúc bài này là những kiển thức cơ bản của VueJS, chúng ta cùng đồng hành để tìm hiểu thêm nhé. cảm ơn mọi người