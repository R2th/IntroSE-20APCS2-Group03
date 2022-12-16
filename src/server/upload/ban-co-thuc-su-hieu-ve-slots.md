![image.png](https://images.viblo.asia/12f57839-ab7c-4637-9542-8dd8581459fe.png)

Trong quá trình làm việc với Vuejs thì hẳn ai cũng đã từng sử dụng slot rồi, nhưng liệu ngoài chức năng là thêm nội dung `html` từ component cha vào component con thì nó còn có tác dụng nào nữa

Hãy đi qua các ví dụ và phương pháp dưới đây để biết xem rằng bạn có thật sự hiểu về slot không?

# Đóng gói component
## Vấn đề

Ví dụ với 1 component dialog đơn giản như này với thư viện là `ElementUI`

```html
<template>
  <div>
    <el-button @click="handleOpen">Open </el-button>
    <el-dialog :visible="isVisible">
      <el-button @click="handleClose">Cancel</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
    }
  },
  methods: {
    handleOpen() {
      this.isVisible = true;
    },
    handleClose() {
      this.isVisible = false;
    }
  }
}
</script>
 ```

 Component này có 1 biến `isVisible` và các hàm có chức năng đóng mở dialog

 Nhưng khi component mở rộng và có nhiều dialog hơn, các biến và hàm nhiều lên

 ```js
<script>
export default {
  data() {
    return {
      isVisible1: false,
      isVisible2: false,
      isVisible3: false,
      isVisible4: false,
      isVisible5: false,
    }
  },
  methods: {
    handleOpen1() {
      this.isVisible1 = true;
    },
    handleClose1() {
      this.isVisible1 = false;
    },
    handleOpen2() {
      this.isVisible2 = true;
    },
    handleClose2() {
      this.isVisible2 = false;
    },
    handleOpen3() {
      this.isVisible3 = true;
    },
    handleClose3() {
      this.isVisible3 = false;
    }
    ...
  }
}
</script>
```

 Các hàm đóng mở lặp đi lặp lại, vậy làm thế nào để tối ưu, chúng ta sẽ đi đến phần sau

## Giải quyết

Tạo một component là `SlotDialog`, component này sẽ đặt 1 slot default, và có biến `isVisible`với 2 function dùng để đóng mở dialog
    
 ```html
// SlotDialog

<template>
  <div>
    <!-- Truyền ngược lại các biến và hàm cần dùng vào slot theo kiểu truyền prop -->
    <slot :isVisible="isVisible" :open="handleOpen" :close="handleClose" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
    }
  },
  methods: {
    handleOpen() {
      this.isVisible = true;
    },
    handleClose() {
      this.isVisible = false;
    }
  }
}
</script>
```

Và khi dùng thì chúng ta có thể lấy được các props được truyền vào bằng 2 cách là `v-slot` hoặc là `slot-scope`

    
```html
<!-- Cách 1 -->
<SlotDialog>
  <!-- Dùng destructing để lấy các biến -->
  <template v-slot="{ isVisible, open, close }">
    <el-button @click="open">click </el-button>
    <el-dialog :visible="isVisible">
      <el-button @click="close">Cancel</el-button>
    </el-dialog>
  </template>
</SlotDialog>

<!-- Cách 2 -->
<SlotDialog>
  <template slot-scope="scope">
    <el-button @click="scope.open">click </el-button>
    <el-dialog :visible="scope.isVisible">
      <!-- Nếu muốn xử lý thêm logic thì chỉ cần truyền vào 1 function callback -->
      <el-button @click="handleClose(scope.close)">Cancel</el-button>
    </el-dialog>
  </template>
</SlotDialog>

<script>
export default {
  methods: {
    handleClose(close) {
      // Hàm này sẽ xử lý logic và gọi lại hàm đóng dialog
      close()
    }
  }
}
</script>
 ```

Đối với slot `default` thì chúng ta có thể viết như trên, còn với ví dụ slot có tên là `body` thì cú pháp sẽ là

```html
<!-- Cách 1 -->
<template v-slot:body="scope"></template>

<!-- Cách 2 -->
<template slot="body" slot-scope="scope"></template>
```

Vậy là quá ví dụ trên chúng ta đã thấy là có thể sử dựng nhiều dialog mà không cần phải tạo các biến và hàm giống nhau

# Slot lồng nhau

## Vấn đề

Component `Counter` có 1 biến `counter` sẽ tăng dần theo mỗi giây được đặt trong slot `body`

Các thẻ `Header` và `Footer` cũng được dặt trong slot tương ứng


```html
// Counter.vue

<template>
  <div>
    <slot name="header">
      <h1>Header</h1>
    </slot>
    <slot name="body">
      <p>Counter: {{ counter }}</p>
    </slot>
    <slot name="footer">
      <h2>Footer</h2>
    </slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0,
    }
  },
  beforeMount() {
    this.$options.counter = setInterval(() => {
      this.counter += 1;
    }, 1000); 
    this.$on('hook:beforeDestroy', () => {
      clearInterval(this.$options.counter)
    })
  },
}
</script>
```

Component này sẽ được dùng ở rất nhiều nơi, mỗi nơi lại có 1 yêu cầu khác nhau, là thay đổi nội dung của `body` hoặc `header`, `footer`

Cách làm chúng ta nghĩ đến đầu tiên sẽ là truyền các `props` điều kiện vào và `if` `else` để thay đổi

Và khi đó, mỗi 1 yêu cầu sẽ là 1 `prop` mới và thêm các `if else`, cuối cùng nó sẽ trở thành 1 đống rác

Tư duy khi thiết kế 1 component dùng chung cho nhiều nơi đó là làm thế nào vẫn có thể chỉnh sửa và mở rộng được mà vẫn không làm ảnh hưởng đến những phần khác

Component `Counter` được lồng bên trong component `Child` và `Parent`


```html
// ChildComponent

<template>
  <Counter>
    <template slot="header">
      <slot name="header" />
    </template>
    <template slot="body">
      <slot name="body" />
    </template>
    <template slot="footer">
      <slot name="footer" />
    </template>
  </Counter>
</template>

<script>
import Counter from './Counter.vue'

export default {
  components: { Counter },
}
</script>
```

```html
// ParentComponent

<template>
  <ChildComponent />
</template>

<script>
import ChildComponent from "./ChildComponent.vue"

export default {
  components: { ChildComponent },
}
</script>
```
Component `Child` sẽ gọi component `Counter` và sẽ để  sẵn các thẻ `slot` để có thể truyền slot từ component `Parent`

Lưu ý khi truyền slot 2 tầng thế này thì chúng ta sẽ sử dụng thẻ `template`, vì nếu sử dụng thẻ `div` thì component `Counter` sẽ hiểu rằng ta đang truyền slot với nội dung rỗng từ ngoài vào và nó sẽ đè mất phần slot mặc định bên trong slot đấy

Nếu dùng thẻ div, phải thêm điều kiện để chỉ khi nào có slot truyền vào từ `Parent` thì mới render ra

```html
<div v-if="$slots.body" slot="body">
  <slot name="body" />
</div>
```

## Giải quyết

Và bây giờ, chúng ta sẽ sử dụng kỹ thuật `scoped slots` để lấy giá trị `counter` từ component `Counter` ra ngoài `Parent`
```html
// Counter.vue

<template>
  <div>
    <slot name="header">
      <h1>Header</h1>
    </slot>
    <!-- Truyền biến counter vào slot body -->
    <slot name="body" :counter="counter" >
      <p>Counter: {{ counter }}</p>
    </slot>
    <slot name="footer">
      <h2>Footer</h2>
    </slot>
  </div>
</template>
```

```html
// ChildComponent

<template>
  <Counter>
    <template slot="header">
      <slot name="header" />
    </template>
    <!-- Lấy biến counter từ scope rồi truyền ngược ra 1 lần nữa vào slot body -->
    <template slot="body" slot-scope="scope">
      <slot name="body" :counter="scope.counter" />
    </template>
    <template slot="footer">
      <slot name="footer" />
    </template>
  </Counter>
</template>
```
```html
// ParentComponent

<template>
  <ChildComponent>
    <template slot="header">
      <h1>Custom Header</h1>
    </template>
    <template slot="body" slot-scope="scope">
      <h1>
        {{ scope.counter }}
      </h1>
    </template>
  </ChildComponent>
</template>
```

Cuỗi cùng chúng ta đã có thể thay đổi được nội dung từ `Parent` mà vẫn lấy được các giá trị từ bên trong component `Counter`

## Tối ưu

Cách viết của `Child` component bên trên đã dùng được, nhưng khi có nhiều slot và prop thì chúng ta lại phải viết đi viết lại rất nhiều
```html
// ChildComponent

<template>
  <Counter>
    <template slot="header">
      <slot name="header" />
    </template>
    <template slot="body" slot-scope="scope">
      <slot
        name="body"
        :prop1="scope.prop1"
        :prop2="scope.prop2"
        :prop3="scope.prop3"
        ...
      />
    </template>
    <template slot="footer" slot-scope="scope">
      <slot name="footer"
        :prop1="scope.prop1"
        :prop2="scope.prop2"
        :prop3="scope.prop3"
        ...
      />
      ...
    </template>
  </Counter>
</template>
```

Nên chúng ta sẽ dùng vòng `for` để render ra các thẻ slot

```html
// ChildComponent

<template>
  <Counter>
    <!-- Lấy các slot name từ $slots và truyền vào thẻ <slot> -->
    <template v-for="slotName in $slots">
      <slot :name="slotName"></slot>
    </template>

    <!-- Đôi với scoped slots thì sẽ lấy các key $scopedSlots  -->
    <!-- Truyền slotName theo cú pháp dynamic slot để lấy scope -->
    <template
      v-for="slotName in Object.keys($scopedSlots)"
      v-slot:[slotName]="scope"
    >
      <!-- Thay vì phải viết từng prop ra, chúng ta sẽ v-bind scope luôn -->
      <slot :name="slotName" v-bind="scope"></slot>
    </template>

    <!-- Scoped slots cũng có thể loop theo cách này -->
    <!-- Biến đầu tiền sẽ là 1 function, chúng ta không dùng mà sẽ chỉ dùng slot name thôi -->
    <template v-for="(_, slotName) in $scopedSlots" #[slotName]="scope">
      <!-- Có thể truyền thêm các prop sau v-bind -->
      <slot :name="slotName" v-bind="scope" :newProp="1"></slot>
    </template>
  </Counter>
</template>

<script>
import Counter from './Counter.vue'

export default {
  components: { Counter },
}
</script>
```

# Kết luận

Scoped slot là một phương pháp giúp chúng ta có thể gói gọn các biến và logic trong 1 component, nhằm tránh dư thừa code

Nhưng đúng theo tên gọi của nó, phạm vi của các prop được lấy ra từ slot chỉ có thể hoạt động được trong `scope` đấy

Vậy nên tùy vào mỗi trường hợp mà chúng ta sẽ cân nhắc có nên sử dụng hay không, nếu được sử dụng đúng cách thì hiệu quả của phương pháp này đem lại là rất tuyệt vời