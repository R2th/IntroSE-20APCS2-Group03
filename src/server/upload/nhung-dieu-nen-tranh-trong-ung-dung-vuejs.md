Năm 2018 có lẽ sẽ là năm của [Vuejs](https://vuejs.org/), khi mà framework này ngày càng nhận được sự hưởng ứng của cộng đồng. Vue hấp dẫn người dùng bởi dung lượng gọn nhẹ nhưng vẫn đầy đủ các công cụ cần thiết để xây dựng một SPA hoàn chỉnh. Bên cạnh đó, Vue cũng tương đối dễ học hơn React hay Angular.

Tuy nhiên, nếu mới học Vue thì cả người mới vào nghề lẫn dân lập trình kì cựu đều nên cẩn thận để không mắc phải một số sai lầm không đáng có sau đây.

## Static properties in `data/computed`

Trong một số trường hợp, bạn khai báo một thuộc tính có giá trị không đổi trong kết quả của `data` hay `computed`, như ví dụ dưới đây.
```
/* DON'T */
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
Vì theo mặc định Vue sẽ chuyển các thuộc tính của `data/computed` thành dạng reactive, mà các giá trị này không đổi, dẫn đến thao tác này trở nên dư thừa. Cách giải quyết là sử dụng `$options`.
```
/* DO */
export default {
  phone: '1234567',
  city: 'HaNoi',
}
component.$options.phone
component.$options.city
```

## Thinking that non-reactive data will be reactive
Lấy ví dụ là khi bạn phải thao tác với cookie trong ứng dụng.

```
/* DON'T */
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

```
/* DO */
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

## Mixins with things that should be done once
Mixin là một cơ chế để tái sử dụng code, bên cạnh cơ chế kế thừa vốn quen thuộc trong lập trình hướng đối tượng. Mixin có một lợi thế là đối tượng được kế thừa có thể linh hoạt chọn ra những thuộc tính/phương thức cần thiết. Tuy nhiên nếu lạm dụng mixin cũng có thể đem đến những kết quả không mong muốn.
```
/* DON'T */
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

Trong ví dụ trên, chúng ta khai báo một `global mixin`, áp dụng cho tất cả components trong ứng dụng. Rõ ràng điều này không tốt, vì khi mỗi component được mount sẽ có một request gửi đi. Một cách tốt hơn là khai báo mixin riêng rẽ, sau đó công khai sử dụng mixin này.

```
/* DO */
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

## Incorrect work with setTimout/setInterval
Nếu bạn phải sử dụng `setInterval` bên trong một component, bạn cần nhớ phải gọi đến `clearInterval` trong `beforeDestroy()`.

```
/* DON'T */
export default {
  data() {
    return { ticks: 0 }
  },
  methods: {
    tick() {
      this.ticks++
    }
  },
  created() {
    setInterval(this.tick, 300)
  }
}
```

```
/* DO */
export default {
  data() {
    return { ticks: 0 }
  },
  methods: {
    tick() {
      this.ticks++
    }
  },
  created() {
    this.$options.interval = setInterval(this.tick, 300)
  },
  beforeDestroy() {
    clearInterval(this.$options.interval)
  }
}
```

Hoặc bạn có thể dùng thư viện [vue-timers](https://github.com/kelin2025/vue-timers).

```
/* DO */
export default {
  data() {
    return { ticks: 0 }
  },
  methods: {
    tick() {
      this.ticks++
    }
  },
  timers: {
    tick: { time: 300, repeat: true }
  }
}
```

## Mutating parents
Vue cho phép bạn tương tác đến component cha thông qua thuộc tính `$parents`. Tuy nhiên, trực tiếp thao tác đến `$parents` bị xem là "bad practice", vì không đảm bảo tính chất “phân tách trọng tâm”

```
/* DON'T */
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
Thay vào đó bạn nên dùng events.
```
/* DO */
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
Bạn cũng có thể dùng `.sync` để cập nhật thay đổi.
```
/* DO */
export default {
  props: [ 'prop1', 'prop2' ],
  methods: {
    update() {
      this.$emit('update:prop1', 1)
      this.$emit('update:prop2', 2)
    }
  }
}

<my-component :prop1.sync="prop1" :prop2.sync="prop2" />
```

## If/else form validation
Chắc hẳn bạn đã từng kiểm tra dữ liệu người dùng nhập vào một cách "thủ công mỹ nghệ", như ví dụ dưới đây.
```
/* DON'T */
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
Rõ ràng cách làm này rất mệt mỏi, không tái sử dụng code được và làm cho mã nguồn của bạn trở nên rối rắm. Thay vào đó, bạn có thể dùng thư viện [vuelidate](https://monterail.github.io/vuelidate/).
```
/* DO */
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

# Kết luận
Những điểm lưu ý được đề cập ở đây là những sai lầm mà người mới học Vue hay mắc phải. Nếu bạn có gặp những trường hợp “oh cái *** gì đang diễn ra vậy ?” khi mới bắt đầu với Vue, đừng quên chia sẻ trong phần bình luận ở dưới nhé (bow).

Thanks for reading!