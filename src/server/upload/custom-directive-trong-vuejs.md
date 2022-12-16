Hello các bạn, lần trước mình có chia sẻ nhỏ với các bạn về [components trong Vuejs](https://viblo.asia/p/co-ban-ve-components-trong-vuejs-QpmlejBo5rd). Thì lần này, cũng tiếp tục chủ đề Vue, mình lại xin chia sẻ tiếp về một tính năng mà chắc hẳn ai đã từng tìm hiểu qua ngôn ngữ này đều biết. :D

Đó chính là **Directive**, tuy nhiên bài viết này sẽ không đề cập tới các directive có sẵn mà Vue cung cấp, mà sẽ hướng dẫn các bạn cách tạo một `custom Directive` hay còn gọi là `Directive tùy biến`. OK chúng ta bắt đầu nhé.

### Giới thiệu
- Custom Directive thật chất cũng là directive, và cách sử dụng cũng tương tự.
- Ngoài các directive mà Vue cung cấp sẵn thì Vue cũng cho phép chúng ta đăng kí hay khởi tạo một custom directive riêng, với mục đích nào đó theo yêu cầu dự án.

### Khởi tạo Custom Directive
Chúng ta sẽ tận dụng source code hoặc tìm hiểu cách cài đặt base code ở bài viết về [components](https://viblo.asia/p/co-ban-ve-components-trong-vuejs-QpmlejBo5rd) lần trước. Tiếp theo ở folder chính `/src`, hãy tạo 1 folder với tên gọi là **directives** và 1 file **outsideClick.js**. Xem cấu trúc như hình dưới:

![](https://images.viblo.asia/6e8cf0f4-88cd-4ac1-822a-7a7b7cc0b677.PNG)

OK đã xong, chúng ta tiến hành những dòng code đầu tiền ở file `outsideClick.js` thôi.
```js
import Vue from 'vue'

Vue.directive('click-outside', {
  bind () {
      this.event = event => this.vm.$emit(this.expression, event)
      this.el.addEventListener('click', this.stopProp)
      document.body.addEventListener('click', this.event)
  },   
 
  unbind() {
    this.el.removeEventListener('click', this.stopProp)
    document.body.removeEventListener('click', this.event)
  },

  stopProp(event) { event.stopPropagation() }
})
```

- Như chúng ta thấy thì để đăng kí hay khai báo một custom directive, ta sử dụng cú pháp **Vue.directive** và tất nhiên phải import Vue vào trước (lol).
- `'click-outside'` là tên directive mà chúng ta sẽ đăng kí và gọi để sử dụng.
- Phần còn lại như `bind`, `unbind`...còn nhiều nữa, chúng được gọi chung là các hàm **hook**, và mỗi hàm đều có **chức năng** và **tham số** riêng của nó, mình sẽ không giải thích trong phạm vi bài viết, các bạn có thể tìm hiểu thêm [ở đây](https://vuejs.org/v2/guide/custom-directive.html#Hook-Functions) ^^.
- Cuối cùng là phần xử lý bên trong các hook, đó cũng đã các đoạn js để handle việc click outside.

### Sử dụng Custom Directive
Cách sử dụng thì đơn giản hơn nhiều, giống như cách bạn dùng một directive có sẵn mà Vue cung cấp vậy. ở file `src\views\Home\index.vue`, ta có đoạn code sau:
- Phần template, sử dụng với cú pháp **v-click-outside="handleClickOutside"**
```html
<template>
  <div class="form-login" v-click-outside="handleClickOutside">
    <div class="form-login__group">
      <Input placeholder="Vui lòng nhập User Name" />
    </div>
    <div class="form-login__group">
      <Input type="password" placeholder="******" />
    </div>
  </div>
</template>
```

- Phần script
```js
<script>
import Input from '../../components/Input'
export default {
  name: 'Home',

  components: {
    Input,
  },
  handleClickOutside() {
    console.log('Bạn đang click outside!')
  }
}
</script>
```
- Thử click bên ngoài phạm vi `form login` và xem kết quả ở tab console Devtool nhé.

![](https://images.viblo.asia/e8a452a2-d4e0-4324-8739-606a1b079a2a.PNG)

### Kết luận
- Như vậy qua một ví dụ nhỏ thì hi vọng các bạn hiểu hơn về `Custom Directive` là gì, và vận dụng nó một cách hợp lý vào các dự án của mình.
- Với tính năng nho nhỏ nên bài chia sẻ cũng khá ngắn gọn :D, và mình xin được dừng ở đây, cám ơn các bạn đã theo dõi, hẹn gặp lại nhé!