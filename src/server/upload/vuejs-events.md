Chắc các bạn không còn lạ gì với javascript events. Bài viết này mình sẽ cũng các bạn tìm hiểu về Vuejs events để xem chúng có gì khác nhau không nhé. Đầu tiên chúng ta cùng đi hiểu khái niệm sự kiện trọng vuejs nhé.
## 1. Sự kiện Vue.js là gì 
Vue.js cho phép chúng ta chặn bất kỳ sự kiện DOM nào bằng cách sử dụng lệnh v-on trên một element. 
Nếu chúng ta muốn làm gì đó khi một sự kiện nhấp xảy ra trong phần tử này:
```js
<template>
  <a>Click me! pls</a>
</template>
```
Chúng ta thêm một sự kiện click vào thẻ <a>
```js
<template>
   <a v-on:click="handleClick">Click me! pls</a>
</template>
```
Có một cách khá được vuejs cung cấp giúp chúng ta thuận tiên ngắn gọn hơn khi code **@click** 
```js
<template>
   <a @click="handleClick">Click me! pls</a>
</template>
```
Với function handleClick bạn có thể dùng ngoặc đơn hay không vì  @click="handleClick" tương đương  @click="handleClick()"
chúng ta có thể thực hiện các hành đông bên trong handleClick
```js
<script>
export default {
  methods: {
    handleClick: function(event) {
      console.log(event)
    }
  }
}
</script>
```
## 2. Truy cập đối tượng sự kiện ban đầu
Trong nhiều trường hợp, bạn sẽ muốn thực hiện một hành động trên đối tượng sự kiện hoặc tìm kiếm một số thuộc tính trong đó. Để trung cập nó chúng ta dùng biến $event đặc biệt như sau 
```js
<template>
  <a @click="handleClick('text', $event)">Click me!</a>
</template>

<script>
export default {
  methods: {
    handleClick: function(text, event) {
      console.log(event)
      console.log(text)
    }
  }
}
</script>
```
## 3. Event modifiers
event.preventDefault () hoặc event.stopPropagation () là những nhu cầu phổ biến gọi bên trong các trình xử lý sự kiện. Mặc dù chúng ta có thể thực hiện điều này một cách dễ dàng bên trong các phương thức, nhưng sẽ tốt hơn nếu các phương thức đó hoàn toàn là về logic dữ liệu thay vì phải xử lý các chi tiết sự kiện DOM.
Để giải quyết vấn đề này, Vue.js cung cấp hai công cụ sửa đổi sự kiện cho v-on: .prevent và .stop. Hãy nhớ rằng các sửa đổi là các hậu tố chỉ thị được biểu thị bằng một dấu chấm
    
@click.prevent call event.preventDefault()
    
@click.stop call event.stopPropagation()

@click.passive sử dụng tùy chọn thụ động của addEventListener 
    
@click.once sự kiện sẽ chỉ được kích hoạt chính xác một lần
## 4. Key Modifiers
Khi nghe các sự kiện bàn phím, chúng ta thường cần kiểm tra các mã khóa phổ biến. Vue.js cũng cho phép thêm các sửa đổi chính cho v-on khi nghe các sự kiện chính:
```js
<input v-on:keyup.enter="submit">
<!-- hoặc dùng -->
<input @keyup.enter="submit">
```
    
Dưới đây là danh sách đầy đủ các key key modifier:
    
enter
    
tab
    
delete (captures both “Delete” and, if the keyboard has it, “Backspace”)
    
esc
    
space
    
up
    
down
    
left
    
right
    
Vậy là mình đã giới thiệu qua cho các bạn về vuejs events, và cách sử dụng.
 
link tham khảo:  
https://flaviocopes.com/vue-events/#access-the-original-event-object
    
https://v1.vuejs.org/guide/events.html#Why-Listeners-in-HTML