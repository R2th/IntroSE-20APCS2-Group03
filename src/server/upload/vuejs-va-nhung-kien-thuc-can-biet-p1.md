# 1. Giới thiệu
Vuejs là một javascript framework giúp người dùng xây dựng giao diện người dùng. . Khác với các monolithic framework (frame work nguyên khối), Vue được thiết kế theo hướng progressive framework (framework linh động) cho phép và khuyến khích việc phát triển ứng dụng theo từng bước.
# 2. Vue Instance
**Khởi tạo** 
```js
var vm = new Vue({
  // options
})
```
Một ứng dụng Vue được bắt đầu bằng cách khởi tạo một Vue Instance (đối tượng Vue). Khi khởi tạo vue instance thì chúng ta sẽ truyền vào một đối tượng là `options` với các tùy trọn bên trong. Một số tùy chọn cơ bản như là data, props, method, computed. Các tùy chọn này giúp ứng dụng hoạt động theo đúng ý muốn.

**Vòng đời của Vue Instance**

Mỗi Vue instance đều phải trải qua một loạt các bước khởi tạo như là cài đặt dữ liệu (data observation), biên dịch template, kết nối Instance tới DOM và cập nhật DOM khi dữ liệu có sự thay đổi. Quá trình này được gọi là một vòng đời của Vue Instance. Trong quá trình này thì nó sẽ thực thi một số hàm gọi là lifecycle hooks.

Có tổng cộng 8 methods bao gồm:  `beforeCreate`, `created`, `beforeMount`, `mounted`, `beforeUpdate`, `updated`, `beforeDestroy`, `destroyed`. 
* **beforeCreate()**

Đây là lifecycle hook đầu tiên được gọi trong Vue js. Nó được gọi đến ngay sau khi Vue Instance được khởi tạo.
```js
<script>
export default {
name: 'Pocadi',
beforeCreate() {
     // something
 }
}
</script>
```
* **created()**

Lifecycle hook created được gọi thứ hai, sau khi quá trình khởi tạo các injections và các reactivity được hoàn thành.
```js
new Vue({
  data: {
    a: 1
  },
  created: function () {
    console.log('a is: ' + this.a)
  }
})
```
* **beforeMount()**

Đây là lifecycle hook tiếp theo được gọi sau khi created được gọi. Đây là thời điểm ngay trước khi instance được gắn trên DOM, template sẽ được biên dịch tại nhưng bạn vẫn chưa thể thao tác với DOM.
```js
<script>
export default {
  beforeMount() {
    alert('beforeMount is called')
  }
}
</script>
```

* **mounted()**

Lifecycle hook mounted được gọi ngay sau khi các instance đã được mount. Ở đây thì các DOM element đã được thay thế. 

```js
<script>
export default {
  mounted() {
    alert('mounted has been called'); 
   }
}
</script>
```

* **beforeUpdate()**

Được gọi bất cứ khi nào có dữ liệu thay đổi mà yêu cầu DOM phải cập nhật. 

```js
<script>
export default {
  beforeUpdate() {
    alert('mounted has been called'); 
   }
}
</script>
```

* **updated()**

Được gọi ngay sau khi DOM được cập nhật, có nghĩa là sau beforeUpdate() hook được gọi.
```js
<script>
export default {
  updated() {
    alert('mounted has been called'); 
   }
}
</script>
```

* **beforeDestroy()**

Lifecycle hook này được gọi ngay trước khi một Vue Instance bị phá hủy, ở thời điểm này thì Instance và các chức năng vẫn còn hoạt động bình thường. Ở giai đoạn này bạn có thể quản lý tài nguyên, xóa các biến và dọn dẹp các component.
```js
<script>
export default {
name: 'Pocadi',
 data() {
    return {
      posts: 0
    }
  },
  beforeDestroy() {
    this.posts = null
    delete this.posts
  }
}
</script>
```

* **destroyed()**

Đây là giai đoạn cuối cùng trong vòng đời của một Vue Instance. Tất cả các instance con đều đã bị phá hủy. Nó được gọi ngay sau khi chạy hủy trên đối tượng.
```js
<script>
export default {
  destroyed() {
    this.$destroy() 
    console.log(this)
  }
}
</script>
```

**Sơ đồ vòng đời**

![](https://images.viblo.asia/db3ccd4c-fb47-494b-ba42-baed79c4245e.png)

# 3. Template Syntax
Vue js sử dụng một cú pháp template dựa trên HTML giúp hiển thị giao diện trang người dùng. Tất cả các template của Vue đều là code HTML hợp lệ và có thể được parse bởi các trình duyệt và parser chuẩn.

Để hiển thị dữ liệu lên giao hiện chúng ta có thể sử dụng cặp dấu `{{ }}`
```html
<template>
    <div class="app">
        <p>Message: {{ message }}</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: "This is message"
            }
        }
    }
</script>
```
Khi đó thì `{{ messsage}}` sẽ được thay thế bằng giá trị trên object data tương ứng. Nếu chúng ta muốn chỉ hiển thị message một lần và không cập nhật lại khi dữ liệu thay đổi thì có thể sử dụng `v-once`.
```html
<p v-once>This message will never change: {{ message }}</p>
```

Ngoài ra để có thể render ra html thì chúng ta có thể sử dụng `v-html`, vì khi sử dụng `{{ }}` thì sẽ thông dịch data thành văn bản thuần túy.

```html
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

**Directive**

Directive là các thuộc tính đặc biệt mà Vuejs sử dụng được bắt đầu bằng `v-` và được gán cho giá trị là biểu thức javascript trừ `v-for`.
* **v-if và v-show**

Hai directive này dùng để hiển thị các thành phần giao diện dựa trên một số điều kiện nào đó(có thể là một biểu thức so sánh hoặc truyền thẳng dữ liệu true false từ trong data vào).
```html
<p v-if="seen">Now you see me</p>
<p v-show="seen">Now you see me</p>
```
Điểm khác biệt giữa hai directive là nếu biểu thức được truyền cho `v-if` là `false` thì sẽ không được render ra, còn với `v-show` thì luôn được render ra nhưng sẽ bị ẩn đi bằng cách sử dụng css.

Nếu có v-if thì chúng ta cũng sẽ có v-else-if và v-else, và cách dùng cũng giống như if else trong javascript.
* **v-for**

Sử dụng `v-for` để render ra các element dựa trên dữ liệu được truyền vào. Các kiểu dữ liệu có thể dùng v-for là : `Array | Object | number | string | Iterable (since 2.6)`.
```html
<div v-for="item in items">
  {{ item.text }}
</div>
```

Chúng ta có thể kết hợp `v-if` và `v-for` để hiển thị một danh sách kèm theo một số điều kiện nhất định. Vì độ ưu tiên của `v-for` cao hơn `v-if` nên `v-if` sẽ được kiểm tra trên mỗi item trong mỗi vòng lặp của `v-for`.
```html
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo }}
</li>
```

Vì `v-if` có độ ưu tiên thấp hơn nên nếu muốn kiểm tra điều kiện trước khi chạy `v-for` thì chúng ta có thể lồng `v-for` vào trong `v-if`, nếu điều kiện không phù hợp thì có thể bỏ qua việc thực thi vòng lặp.
```html
<ul v-if="todos.length">
  <li v-for="todo in todos">
    {{ todo }}
  </li>
</ul>
```
* **v-bind**

Directive v-bind được sử dụng để gán dữ liệu vào các thuộc tính của html như là `href`, `id`, `disabled`.
```html
<button v-bind:disabled="isButtonDisabled">Hòn Vọng Phu</button>
```
Ngoài ra chúng ta có thể rút gọn `v-bind` bằng cách sử dụng `:`
```html
<a v-bind:href="url"> ... </a>

<a :href="url"> ... </a>
```
# 4. Methods, Computed và Watcher
**Methods**

Methods bao gồm các hàm được khai báo trong `methods` và khi cần sử dụng thì có thể được gọi từ bên trong script hoặc từ template.
```html
<template>
    <div>{{ upperCase(name) }}</div>
</template>
<script>
    export default {
        data() {
            return {
                name: pocadi
            }
        },
        methods: {
            upperCase(name) {
                return name.toUpperCase();
            }
        }
    }
</script>
```
**Computed**

Computed có thể hiểu là các data đã được tính toán và xử lý.  Chúng ta có thể sử dụng `computed` như cách sử dụng `data`
```html
<template>
    <div>
        <p>Original message: "{{ message }}"</p>
        <p>Computed reversed message: "{{ reversedMessage }}"</p>
    </div>
</template>
<script>
    export default {
        data: {
            message: 'Hello'
        },
        computed: {
            reversedMessage() {
                return this.message.split('').reverse().join('')
            }
        }
    }
</script>
```

Các bạn có thể nhận ra là chúng ta có thể computed trên bằng methods và kết quả trẻ về cũng không có sự khác biệt. Tuy nhiên thì computed và methods thì lại có sự khác biệt về mặt tính toán lại giá trị, Nếu đối với computed thì sẽ không được tính toán lại nếu như các thành phần phụ thuộc không thay đổi. Còn đối với methods thì sẽ được tính toán lại khi có một sự kiện re-render xảy ra. Ngoài ra thì computed không thể nhận biến truyền vào, còn methods thì có thể.

**Watcher**

Chúng ya có thể quan sát sự thay đổi của dữ liệu thông qua `watch`.
```js
<script>
  data: {
    name: 'Pocadi'
  },
  watch: {
    name(newQuestion, oldQuestion) {
        // do something
    }
  },
</script>
```
Watcher nhận vào hai giá trị mới và giá trị cũ của dữ liệu tương ứng và có thể thực hiện một số tính toán không đồng bộ. Watcher thường sử dụng này rất hữu ích khi bạn muốn thực hiện những tính toán không đồng bộ và tốn kém liên quan đến việc thay đổi dữ liệu.
# 5. Tổng kết 
Trong bài viết này chúng ta đã tìm hiểu những kiến thức cơ bản về Vuejs, mong sẽ có ích cho các bạn đọc. Cảm ơn các bạn đã theo dõi. Hãy chờ đón phần tiếp theo nhé. 

Phần tiếp theo đã có, mời các bạn đọc [tại đây](https://viblo.asia/p/vuejs-va-nhung-kien-thuc-can-biet-p2-4P856r3B5Y3).

**Tài liệu tham khảo**

https://vi.vuejs.org/v2/guide/

https://v2.vuejs.org/v2/guide/