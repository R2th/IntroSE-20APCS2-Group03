Scoped slots là một loại đặt biệt của slot giúp bạn có thể truyền dữ liệu từ component con lên component cha thông qua việc gán dữ liệu thông qua thuộc tính (nó cũng tương tự việc đưa dữ liệu vào props của component). Chúng ta cùng xem qua ví dụ:

Mình có một child như sau:

```html
<template>
  <span>
    <slot :user="user">
      {{ user.last }}
    </slot>
  </span>
</template>

<script>
export default {
  data() {
    return {
      user: {
        first: 'Phạm Ngọc',
        last: 'Hòa',
      },
    }
  },
}
</script>
```

Như các bạn thấy, mình truyền vào slot một attribute là `user` kiểu như prop bạn thường thấy khi truyền vào component.

Tiếp theo đến component cha. Chúng ta sẽ lấy nội dung của user thông qua thuộc tính `slot-scope`

```html
template>
  <div>
    <user>
      <template v-slot:default="slotProps">
        {{ slotProps.user.first }}
      </template>
    </user>
  </div>
</template>

<script>
import User from '@/components/demo'
export default {
  components: {
    User,
  },
}
</script>
```

Như vậy là mình có thể điều khiển được là slot muốn hiển thị first hay last từ components cha rồi nhờ vào `slot-scope`

Trong ví dụ này, mình đã chọn đặt tên cho đối tượng chứa props là slotProps nhưng bạn có thể sử dụng bất kỳ tên nào bạn thích.