VueJs framework ngày càng nhận được sự hưởng ứng của cộng đồng. Vue hấp dẫn người dùng bởi dung lượng gọn nhẹ nhưng vẫn đầy đủ các công cụ cần thiết để xây dựng một SPA hoàn chỉnh. Bên cạnh đó, Vue cũng tương đối dễ học hơn React hay Angular.

Tuy nhiên, nếu mới học Vue thì cả người mới vào nghề lẫn dân lập trình kì cựu đều nên cẩn thận để không mắc phải một số sai lầm không đáng có sau đây.
### **1. Dùng camelCase cho thuộc tính của thẻ HTML**
Theo chuẩn của W3C, các thuộc tính của một thẻ HTML không phân biệt ký tự hoa thường. Nghĩa là `<IMG SRC="#" AL="" />` và `<img src="" alt="">` hay `<iMg sRC="" alT="" />` (má ơi) đều như nhau.

Trong Vue, khi bạn khai báo thuộc tính :`myProp="123"`, Vue sẽ tự match thành` :myprop="123"`. Do đó, để có thể sử dụng camelCase bên trong component, bạn phải dùng kebab-case 

như ví dụ sau:
```js
export default {
  name: 'my-component',
  props: {
    myProp: { required: true }
  },
  computed: {
    title() {
      return this.myProp.toUpperCase()
    }
  }
}

<my-component :my-prop="Hello World" />
```
### 2. Không dùng `data` như một hàm
Trong ví dụ mở đầu của Vue, bạn được hướng dẫn dùng một object bình thường làm `data`. Điều này hoàn toàn chấp nhận được khi trong ứng dụng chỉ có một instance `new Vue()` duy nhất. Tuy nhiên khi chuyển qua sử dụng component, thuộc tính `data `bắt buộc phải là một hàm, trả về một object chứa các giá trị khởi động.
```js
// KHÔNG NÊN
const FormAddNewProduct = {
  data: {
    newProduct: { name: '', price: 0 }
  }
}

// KHÔNG NÊN
const FormAddNewProduct = {
  data() {
    return {
      newProduct: { name: '', price: 0 }
    }
  }
}
```
Lý do là `FormAddNewProduct` ở trên có thể được khởi tạo nhiều lần. Nếu chúng ta dùng object cho `data`, tham chiếu (reference) của object này sẽ được chia sẻ cho tất cả `FormAddNewProduct` được khởi tạo. Điều này có thể dẫn đến những kết quả không mong muốn, chẳng hạn như lẫn lộn state. Bằng cách dùng hàm cho `data`, mỗi đối tượng của `FormAddNewProduct` sẽ có một giá trị khởi động tách biệt.
### 3. Dùng giá trị không đổi trong `data/computed`
Trong một số trường hợp, bạn khai báo một thuộc tính có giá trị không đổi trong kết quả của `data` hay `computed`, như ví dụ dưới đây.
```js
// KHÔNG NÊN
export default {
  computed: {
    phone() {
      return '1234567'
    },
    city() {
      return 'Saigon'
    }
  }
}

component.phone
component.city
```
Vì theo mặc định Vue sẽ chuyển các thuộc tính của `data/computed` thành dạng reactive, mà các giá trị này không đổi, dẫn đến thao tác này trở nên dư thừa. Cách giải quyết là sử dụng `$options.`
```js
<template>
  <h1>{{ hello }}</h1>
</template>
```
```js
<script>
export default {
  phone: '1234567',
  city: 'Saigon',
  computed: {
    hello() {
      return `${this.$options.city} đẹp lắm ${this.$options.city} ơi ${this.$options.city} ơi`
    }
  }
}
</script>

```
### 4. Dùng hàm Arrow function không đúng chỗ
Khi viết component cho Vue, có thể bạn cảm thấy một thôi thúc để sử dụng hàm mũi tên, như ví dụ dưới đây.
```js
export default {
  props: {
    value: { required: true, type: Number }
  },
  data: () => {
    const amount = this.value * 100
    return { amount }
  },
  methods: {
    increase: () => (this.amount = this.amount + 500)
  }
}
```
Nhưng theo khuyến cáo của Vue, bạn không nên dùng hàm mũi tên cho `data`, vì đơn giản, giá trị `this` bên trong hàm mũi tên sẽ là `this` trong tầm vực gần nó nhất. Điều này ảnh hưởng tới lý thuyết của Vue, vì `this` bên trong một component là một Vue instance. Cách đơn giản nhất để giải quyết là dùng cú pháp khai báo hàm cho thuộc tính của object.
```js
export default {
  props: {
    value: { required: true, type: Number }
  },
  data() {
    const amount = this.value * 100
    return { amount }
  },
  methods: {
    increase() {
      this.amount = this.amount + 500
    }
  }
}
```
Điều này cũng áp dụng khi khai báo `computed` hay `methods`.
### 5. Cho rằng dữ liệu không `reactive` sẽ trở nên `reactive`
Một ví dụ là khi bạn phải thao tác với cookie trong ứng dụng.
```js
export default {
  computed: {
    token() {
      return Cookies.get('clientToken')
    }
  }
}

Cookies.set('clientToken', '123456789a')
```
Cơ chế reactive của Vue rất thông minh, nhưng chưa đủ để nhận biết những thay đổi ngoài tầm kiểm soát như thế này. Do đó bạn buộc phải cập nhật dữ liệu bằng tay.
```js
export default {
  data() {
    return { token: null }
  },
  methods: {
    updateToken() {
      this.token = Cookies.get('clientToken')
    }
  }
}

Cookies.set('clientToken', '123456789a')
component.updateToken()
```
### 6. Lạm dụng mixin
Mixin là một cơ chế để tái sử dụng code, bên cạnh cơ chế kế thừa vốn quen thuộc trong lập trình hướng đối tượng. Mixin có một lợi thế là đối tượng được kế thừa có thể linh hoạt chọn ra những thuộc tính/phương thức cần thiết. Tuy nhiên nếu lạm dụng mixin cũng có thể đem đến những kết quả không mong muốn.
```js
Vue.mixin({
  data() {
    return { currentUser: null }
  },
  mounted() {
    MyApi().checkLogin()
     .then(user => (this.currentUser = user))
  }
})
```
Trong ví dụ trên, chúng ta khai báo một` "global mixin"`, áp dụng cho tất cả components trong ứng dụng. Rõ ràng điều này không tốt, vì khi mỗi component được mount sẽ có một request gửi đi. Một cách tốt hơn là khai báo mixin riêng rẽ, sau đó công khai sử dụng mixin này.
```js
const HasCurrentUser = {
  data() {
    return { currentUser: null }
  },
  mounted() {
    MyApi().checkLogin()
     .then(user => (this.currentUser = user))
  }
}

const UserDashboard = Vue.extend({
  mixins: [HasCurrentUser]
})
```
### 7. Kiểm tra dữ liệu trên form bằng tay
Chắc hẳn bạn đã từng kiểm tra dữ liệu người dùng nhập vào một cách "thủ công mỹ nghệ", như ví dụ dưới đây.
```js
export default {
  data() {
    return {
      form: { name: '', price: '' },
      errors: { name: '', price: '' }
    }
  },
  methods: {
    submit() {
      if (this.form.name.length === 0) {
        this.errors.name = 'Please enter name'
      } else if (this.forms.price.length === 0) {
        this.errors.price = 'Please enter price'
      } else if (/^[0-9]*$/.test(this.form.price)) {
        this.errors.price = 'Please enter numeric value'
      } else {
        sendData(this.form)
      }
    }
  }
}
```
Rõ ràng cách làm này rất mệt mỏi, không tái sử dụng code được và làm cho mã nguồn của bạn trở nên rối rắm. Thay vào đó, bạn có thể dùng thư viện `vuelidate`.
```
import { required, numeric } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      form: { name: '', price: '' }
    }
  },
  validations: {
    form: {
      name: { required },
      price: { required, numeric }
    }
  },
  methods: {
    submit() {
      if (!this.$v.$invalid) {
        sendData(this.form)
      }
    }
  }
}
```
### KẾT LUẬN
Những điểm lưu ý được đề cập ở đây là những sai lầm mà người mới học Vue hay mắc phải. Nếu bạn có gặp những trường hợp “ủa sao lạ vậy nè?” khi mới bắt đầu với Vue, đừng quên chia sẻ trong phần bình luận ở dưới nhé.
### Tài liệu tham khảo:
1. https://vuejs.org/2016/02/06/common-gotchas/
2. https://vuejs.org/