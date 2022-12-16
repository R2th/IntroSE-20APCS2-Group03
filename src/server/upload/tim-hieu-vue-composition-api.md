## Giới thiệu. 
Ở phần trước, mình đã viết sơ qua về Vue Composition API, nói về tại sao lại có có Vue composition api, động lực nào dẫn đến những thay đổi đó. Và những thay đổi đó có thể mang đến những hiệu quả ra sao. Bài viết này mình sẽ tìm hiểu kỹ hơn về function **setup** của Vue composition, phần khác biệt nhất của vue composition api với bản vue 2.x

## Nội dung 
### setup
**setup** là một option mới của component.  Nó đóng vai trò là vị trí để sử dụng composition api trong các component của vue. 
#### Thời gian được gọi 
**setup** được gọi ngay sau khi init các biến props và thể hiện vue được tạo ra. Trong life-cycle hook, thì **setup** được gọi ở *beforeCreate* .
#### Sử dụng với template
  Nếu hàm **setup** trả về một object (đối tượng) thì các thuộc tính của nó hoàn toàn có thể sử dụng trên template như thông thường 

```js
<template>
  <div>{{ count }} {{ object.foo }}</div>
</template>

<script>
  import { ref, reactive } from 'vue'

  export default {
    setup() {
      const count = ref(0)
      const object = reactive({ foo: 'bar' })

      // expose to template
      return {
        count,
        object
      }
    }
  }
</script>
```

  Chú ý là, các biến trả về bởi hàm **setup** sẽ có thể truy cập các thuộc tính mà không cần sử dung *.value*
#### Sử dụng với các hàm render 
```js
import { h, ref, reactive } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const object = reactive({ foo: 'bar' })

    return () => h('div', [count.value, object.foo])
  }
}
```

#### Các tham số
Function setup có thể nhận props như là tham số đầu tiên của nó 
```js
export default {
  props: {
    name: String
  },
  setup(props) {
    console.log(props.name)
  }
}
```

Chú ý là **props** là **relative**, nên chúng ta cũng có thể sử dụng watch, hoặc watchEffect để tracking sự thay đổi 
```js
export default {
  props: {
    name: String
  },
  setup(props) {
    watchEffect(() => {
      console.log(`name is: ` + props.name)
    })
  }
}
```
Nhưng chúng ta không thể phá hủy cấu trúc của **props** vì khi đó biến sẽ không còn **relative** nữa 
```js
export default {
  props: {
    name: String
  },
  setup({ name }) {
    watchEffect(() => {
      console.log(`name is: ` + name) // Will not be reactive!
    })
  }
}
```

Chú ý rằng, các biến **props** là không nên được thay đổi trên vue component. Chúng ta sẽ cảnh báo warning nếu thay đổi trực tiếp các giá trị props. Chúng ta có thể thực hiện emit giá event nếu cần thiết có sự thay đổi. 

Tham số thứ hai là **context**, nó có tương tự các thuộc tính như biến **this** trong các phiên bản vue 2.x

```js
const MyComponent = {
  setup(props, context) {
    context.attrs
    context.slots
    context.emit
  }
}
```
*attrs* và *slots* đều là những proxy để truy cập những giá trị của một thể hiện vue, và theo từng thể hiện vue, nên chúng ta có thể phá vỡ cấu trúc của nó mà vẫn tracking sự thay đổi
```js
const MyComponent = {
  setup(props, { attrs }) {
    // a function that may get called at a later stage
    function onClick() {
      console.log(attrs.foo) // guaranteed to be the latest reference
    }
  }
}
```

Dưới đây là một số lý do mà **props** lại là tham số đầu tiên, chứ nó không được bao gồm trong biến **context**.
- Có rất nhiều component sử dụng **props**, **props** được sử dụng nhiều hơn rất nhiều so với những thuộc tính khác. Có nhiều trường hợp component chỉ sử dụng **props**.
- Có props, sẽ dễ dàng check type, và reference hơn trong type script 

#### Sử dụng với this 
**this** không khả dụng trong function **setup**.  Tuy nhiên chúng ta có thể sử dụng tham số thứ hai **context** để thay thế biến this. Có một số lý do để **this** không được phép sử dụng trong function **setup**. 
Sử dụng biến **this** trong **setup** có thể gây lỗi và là cạm bẫy lớn cho những người mới bắt đầu. Họ không hiểu rõ, **this** ở đây là chỉ thực thể vue, hay function, hay gì đó.

Tham khảo thêm
[Tài liệu về vue composition api](https://composition-api.vuejs.org/api.html#setup)