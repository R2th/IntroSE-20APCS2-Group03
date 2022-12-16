VueJs đã không còn xa lạ với mọi người, khi mà framework này ngày càng nhận được sự hưởng ứng của cộng đồng. Vue hấp dẫn người dùng bởi dung lượng gọn nhẹ nhưng vẫn đầy đủ các công cụ cần thiết để xây dựng một SPA hoàn chỉnh. Bên cạnh đó, học Vue cũng tương đối dễ **thở** hơn AngularJs hay ReactJs.

Tuy nhiên, nếu mới học Vue thì không khỏi mắc phải một số sai lầm sau đây.

# 1. Dùng camelCase
- Theo chuẩn của W3C, các thuộc tính của một thẻ HTML không phân biệt ký tự hoa thường. Nghĩa là:
``` 
<IMG SRC="#" AL="" /> và 
<img src="" alt=""> hay 
<iMg sRC="" alT="" /> 
/// đều như nhau 
```

- Trong Vue, khi bạn khai báo thuộc tính :myProp="123", Vue sẽ tự match thành :myprop="123". Do đó, để có thể sử dụng camelCase bên trong component, bạn phải dùng kebab-case như ví dụ sau:
```
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
# 2. Data phải làm một hàm
- Trong ví dụ mở đầu của Vue, bạn được hướng dẫn dùng một object bình thường làm data. Điều này hoàn toàn chấp nhận được khi trong ứng dụng chỉ có một instance new Vue() duy nhất. Tuy nhiên khi chuyển qua sử dụng component, thuộc tính data bắt buộc phải là một hàm, trả về một object chứa các giá trị khởi tạo.
```
// không nên
const FormAddNewProduct = {
  data: {
    newProduct: { name: '', price: 0 }
  }
}

// nên
const FormAddNewProduct = {
  data() {
    return {
      newProduct: { name: '', price: 0 }
    }
  }
}
```

- Tham khảo thêm: [https://vi.vuejs.org/v2/guide/components.html#data-phai-la-mot-ham](https://vi.vuejs.org/v2/guide/components.html#data-phai-la-mot-ham)

# 3. Cẩn thận khi dùng Arrow Functions
- Từ khi ES6 ra đời, Arrow Functions thường xuyên được sử dụng với cú pháp ngắn gọn:
```
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
- Nhưng theo khuyến cáo của Vue, bạn không nên dùng Arrow Functions cho data, các hooks. Vì đơn giản, Arrow Functions được bind vào ngữ cảnh cha (parent context), this sẽ không trỏ đến đối tượng Vue instance. Cách đơn giản nhất để giải quyết là dùng cú pháp khai báo hàm cho thuộc tính của object. Viết lại như sau:
```
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
- Tham khảo thêm: [https://vi.vuejs.org/v2/guide/instance.html#Vong-doi-cua-doi-tuong](https://vi.vuejs.org/v2/guide/instance.html#Vong-doi-cua-doi-tuong)

# 4. Đụng đến $parents
- Vue cho phép bạn tương tác đến component cha thông qua thuộc tính $parents. Tuy nhiên, trực tiếp thao tác đến $parents bị xem là "**bad practice**", vì không đảm bảo tính chất “phân tách trọng tâm” ([Separation of Concerns](https://www.wikiwand.com/en/Separation_of_concerns)).

```
// Cách này hết sức bậy bạ
export default {
  props: {
    isSelected: { type: Boolean, required: true }
  },
  methods: {
    toggle() {
      this.$parents.isSelected = !this.$parents.isSelected
    }
  }
}
```
- Thay vào đó hãy sử dụng **events** và viết lại như thế này:
```
export default {
  props: {
    value: { type: Boolean, required: true }
  },
  methods: {
    toggle() {
      this.$emit('input', !this.value)
    }
  }
}

<my-component :value="value" @input="newValue => { value = newValue }" />
```
- Thảm khảo thêm về events ở đây: [https://vi.vuejs.org/v2/guide/events.html](https://vi.vuejs.org/v2/guide/events.html)

# 5. Tổng kết
- Hi vọng những sai lầm sẽ không còn xảy ra với chúng ta nữa, cám ơn mọi người đã đọc bài chia sẻ này!
- Nguồn tham khảo: 
    - [https://vuejs.org](https://vuejs.org)
    - [https://itnext.io/](https://itnext.io/)