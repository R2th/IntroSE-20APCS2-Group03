Xin chào các bạn! Như các bạn cũng đã biết thì [Vue.js v3.0](https://news.vuejs.org/) đã release cách đây mấy hôm, với tên gọi "One Piece" khá quen thuộc :D. Vì vậy bài viết lần này mình cũng nói về Vuejs, tuy nhiên không liên quan gì tới bản v3 mới release vừa rồi, mà chỉ là về những kiến thức cơ bản nhất về Vuejs để các bạn mới (như mình) có thể dễ dàng học và nắm được.

Trong phạm vi bài viết này, khái niệm đầu tiên mình muốn nhắc tới đó chính là **components**. OK, chúng ta bắt đầu thôi.

### Cài đặt
Để đơn giản thì mình init 1 source cơ bản thông qua Vue-CLI, các bạn có thể tìm hiểu thêm [ở đây](https://cli.vuejs.org/):
```
// Bước này là cài đặt
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

Và sau đó khởi tạo project của mình:
```
vue create myvue
# OR
vue ui
```
Ok vậy là sau khi tạo thành công thì chúng ta có cấu trúc thư mục như hình dưới, các bước để chạy cài đặt node_modules thì mình xin không nói thêm ở đây nhé.
![](https://images.viblo.asia/cce90ec5-832d-4ffb-8dd7-4fd78d0ec8f0.PNG)

### Khái niệm
- Component theo mình là một trong những tính năng quan trọng nhất trong Vue. Nó giúp cho việc kế thừa các thành phần HTML cơ bản, dễ dàng đóng gói và tái sử dụng code.
- Việc tổ chức các component cũng giống như một Dom tree, cũng có phân cấp thành phần.

### Tạo component
Tại folder src/components, hãy tạo 1 file là Input.vue, có html đơn giản như sau:
```html
<template>
  <input 
    :type="type" 
    :placeholder="placeholder"
  >
</template>
```
và các [props](https://vuejs.org/v2/api/#props) được khai báo ở thẻ script bên dưới:
```js
<script>
export default {
  name: 'Input',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    }
  }
}
</script>
```
Để ý thấy component chúng ta vừa tạo có tên là **Input**, bao gồm 2 props là **type** và **placeholder**, ở đây mình chỉ tạo 2 thuộc tính cơ bản nhất của 1 input, các bạn có thể tạo thêm các props khác nếu thấy cần thiết.

Cuối cùng là 1 chút css cho input trong đẹp mắt hơn, phần này được viết trong thẻ style:
```html
<style lang="scss">

input {
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 5px 10px;
  width: 100%;
  height: 40px;
}
</style>
```

### Sử dụng component
Việc tạo 1 component đã xong, vậy sử dụng nó như thế nào? Bây giờ ở folder src/views, chúng ta tạo một file với tên là Login.vue, 1 file .vue thì vẫn đây đủ 3 phần là template, script và style nhé.

Tạm thời bỏ qua phần template, ở phần script, tương tự như component Input, mình cũng phải khai báo cho component Login này, đồng thời import component Input vào để sử dụng tại đây:
```js
<script>
import Input from '../../components/Input'
export default {
  name: 'Home',

  components: {
    Input,
  },
}
</script>
```

Khi đã có compoent rồi, ta quay trở lại với phần template, là 1 form login được viết như sau:
```html
<template>
  <div class="form-login">
    <div class="form-login__group">
      <Input placeholder="Vui lòng nhập User Name" />
    </div>
    <div class="form-login__group">
      <Input type="password" placeholder="******" />
    </div>
  </div>
</template>
```
Form của chúng ta đơn giản có 2 input, và các props được truyền dữ liệu vào tương ứng. Phần style input thì không cần viết nữa, vì đã có ở file Input component và nếu có chỉnh sửa cũng rất dễ dàng.

Và trong component Login này, chúng ta thêm 1 chút css để style cho form login của mình:
```html
<style lang="scss" scoped>
.form-login {
  width: 500px;
  margin: 0 auto;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 3px;

  &__group:not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>
```

Và kết quả thu được như hình dưới (mình bỏ qua phần tạo button submit nhé :D):

![](https://images.viblo.asia/eb58cd51-3ebf-4108-b91b-128519568c47.PNG)


### Kết luận
Như vậy với ví dụ nhỏ này, hi vọng các bạn sẽ hiểu hơn về component là gì, cách tạo và sử dụng 1 component trong Vuejs. Cám ơn các bạn đã theo dõi, chúc các bạn học tốt và hẹn gặp lại trong những bài chia sẻ tiếp theo của mình.