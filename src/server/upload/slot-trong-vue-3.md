Xin chào mọi người, lại là mình đây! Như các bạn đã biết thì tất cả những bài viết trước của mình đều liên quan đến `ReactJS` và kể cả những bài không liên quan thì mình cũng sẽ dùng `ReactJS` để triển khai ý tưởng. Nhưng trong bài viết này có 1 chút khác! Bài viết này mình sẽ tập trung vào `VueJS`. Và mình sẽ đi về phiên bản mới nhất gần đây đó chính là `Vue 3`.Trong bài hôm nay chúng ta sẽ cùng nói về 1 khái niệm rất thú vị, đó chính là `slot`. Hãy cùng bắt đầu nào.
# I. Vue 3
Đầu tiên hãy nói một chút về phiên bản Vue 3. Một trong những tính năng trong Vue 3 đó chính là  `Composition API`. `Composition API` mang lại cho cách để xây dựng những ứng dụng có khả năng mở rộng lớn, như là cách tố chức code, khả năng đọc hiểu dễ dàng cũng như là việc reuse trở nên dễ dàng hơn.

Mục đích cuối cùng của `Composition API` (dựa trên cảm hứng đến từ `React Hooks`) là làm các component của chúng ta trở nên đơn giản dễ dùng hơn, nâng cao khả năng đọc hiểu, cách tổ chức code và làm cho code của chúng ta dễ dàng được reuse trong xuyên suốt ứng dụng của chúng ta.

`Composition API` sẽ không chỉ cho phép chúng ta sử dụng nó thông qua các tùy chọn của component mà nó còn cung cấp cho chúng ta `composition functions`. Thứ mà chúng ta có thể sử dụng thay vì các phương pháp reuse code khác của Vue (như là mixins, scoped slots, ...)

Nhưng trong một số trường hợp chúng ta vẫn có thể áp dụng `slot`. Và hôm nay trong bài này hãy cùng đi xa hơn với `slot` trong Vue 3.
# II. Slot và các dạng triển khai của slot trong Vue 3.
Như chúng ta đã biết thì `slot` là một cách cho phép chúng ta reuse code. Bình thường thì `slot` cho phép bạn truyền một rendered element xuống. `Scoped slot` cho phép chúng ta tạo những customize template. Tiếp đến hãy cùng đi qua các dạng triển khai của slot trong vue 3 sẽ như thế nào.

## Slot content
Như cái tên của nó. Nó cho phép chúng ta truyền một content xuống cho component. Gần giống như `children` trong `React component`.
```javascript:MyButton.vue
<template>
  <button>
    <slot /> // Content "Click me" sẽ được truyền xuống và thay thế cho slot
  </button>
</template>

<script>
export default {
  name: "MyButton",
};
</script>
```
```javascript:App.vue
<template>
  <Button type="button">Click me</Button>
</template>

<script>
import ButtonVue from "./components/MyButton.vue";

export default {
  name: "App",
  components: {
    Button: ButtonVue,
  },
};
</script>
```
Kết quả chúng ta sẽ nhận được Button "Click me". Chúng ta cũng có thể truyền thêm nhiều content vào nữa thay vì chỉ có "Click me".
## Render Scope

Khi mà chúng ta không muốn truyền một content cố định mà thay vào đó là một content động. Chúng ta cũng có thể sử dụng slot và binding giá trị muốn truyền vào.

```javascipt:App.vue
<template>
  <Button type="button">{{ btnContent }}</Button>
</template>

<script>
import ButtonVue from "./components/MyButton.vue";

export default {
  name: "App",
  data() {
    return {
      btnContent: "Click me",
    };
  },
  components: {
    Button: ButtonVue,
  },
};
</script>
```

Ở trường hợp trên `slot` sẽ có quyền truy cập vào data của `App` component (vì slot bản thân nó đang nằm ở trong template của `App` component). Và kết quả trả về sẽ vẫn là button "Click me".

Như các bạn để ý ở trên thì sẽ có một số thắc mắc là tại sao `slot` không thể truy xuất data của `Button` component???
```javascript:Button.vue
<template>
  <button>
    <slot />
  </button>
</template>

<script>
export default {
  name: "MyButton",
  props: {
    mode: {
      type: String,
      default: "create",
    },
  },
};
</script>
```
```javascript:App.vue
<template>
  <Button type="button" :mode="btnMode">
    // Nếu thay bằng {{ btnContent }} to {{ mode }}
    // , chúng ta sẽ có kết quả như ý
    {{ btnContent }} to {{ mode }}
  </Button>
</template>

<script>
import ButtonVue from "./components/MyButton.vue";

export default {
  name: "App",
  data() {
    return {
      btnContent: "Click me",
      btnMode: "edit",
    };
  },
  components: {
    Button: ButtonVue,
  },
};
</script>
```
Kết quả chúng ta nhận được đối với đoạn code trên là button "Click me to". Thế thì tại sao vậy? Tại sao kết quả lại khác do chúng ta mong muốn (button "Click me to edit"). Lý do đơn giản thôi bởi vì `slot không đọc được data 'mode'` ở scope của component `App`. Chúng ta muốn slot đọc data ở scope component `Button` nhưng `slot` lại đọc data ở `App` (vì nó được biên dịch ở scope của component `App`). Hãy nhớ một điều là tất cả mọi thứ ở template cha (App.vue) sẽ được biên dịch tại scope của component cha, những thứ ở template con (Button.vue) sẽ được biên dịch ở scope component con.

Ở ví dụ phía trên khi chúng ta  binding data `{{ mode }}` thì nó sẽ được biên dịch ở scope của component `App.vue` (mà ở component này lại không có data `mode`). Nếu binding `{{ btnMode }}` thay vì `{{ mode }}` thì chúng ta sẽ nhận được kết quả như ý là button "Click me to edit".
## Fallback Content
Như cái tên của nó. Slot cho phép chúng ta dự phòng một content trong trường hợp nó không nhận được content từ component cha.
```javascript:Button.Vue
<template>
  <button>
    <slot>Click me</slot>
  </button>
</template>

<script>
export default {
  name: "MyButton",
};
</script>
```
```javascript:App.vue
<template>
  <Button type="button"></Button>
</template>

<script>
import ButtonVue from "./components/MyButton.vue";

export default {
  name: "App",
  components: {
    Button: ButtonVue,
  },
};
</script>
```
Mặc dù chúng ta không truyền content cho component `Button` nhưng `slot` sẽ tự hiểu và dùng content dự phòng để thay thế. Và kết quả của chúng ta vẫn là button "Click me". Và khi có content được truyền vào thì content đó sẽ thay thế cho content dự phòng.
## Named Slots
Đặt tên cho slot cho phép chúng ta tổ chức những content mà chúng ta muốn truyền vào tương ứng sẽ thay thế cho những slot nào. Việc đặt tên này theo mình thấy là cực kỳ hữu dụng và tường minh. Chúng ta sẽ xác định được content truyền vào và nó sẽ cần phải thay thế `slot` nào.
```javascript:Button.vue
<template>
  <button>
    <slot name="icon" />
    <slot name="content" /> // Có thể thay thế bằng <slot /> và dùng v-slot:default
  </button>
</template>

<script>
export default {
  name: "MyButton",
};
</script>
```
```javascript:App.vue
<template>
  <Button type="button">
    <template v-slot:icon> + </template>
    <template v-slot:content> Add </template> // Có thể dùng v-slot:default
  </Button>
</template>

<script>
import ButtonVue from "./components/MyButton.vue";

export default {
  name: "App",
  components: {
    Button: ButtonVue,
  },
};
</script>
```
Kết quả nhận được sẽ là button "+ Add".
## Scoped Slots
Cuối cùng cũng đến phần hay nhất. `Scoped Slots` cho phép `slot` truy cập vào data của component con để phục vụ tốt nhất việc custom lại content dùng trong component con đó tại component cha.
```javascript:Buton.vue
<template>
  <button>
    // Ở đây mình binding props "click" 
    // để component cha có thể nhận được và sử dụng cho việc customize
    // Tương ứng thì mình có xác định rõ tên của slot
    // để tường minh phần xử lý
    <slot name="icon" :click="onIconClick" />
    <slot />
  </button>
</template>

<script>
export default {
  name: "MyButton",
  methods: {
    onIconClick() {
      console.log("Icon click");
    },
  },
};
</script>
```
```javascript:App.vue
<template>
  <Button type="button">
    // Tại đây mình sẽ truyền nội dụng content cho slot "icon"
    // và cũng đồng thời lấy ra props mà mình đã binding trước đó
    // ở component 'Button' mang ra và sử dụng
    <template v-slot:icon="iconProps">
      <span @click.stop="iconProps.click">+</span>
    </template>
    <template v-slot:default> Add </template>
  </Button>
</template>

<script>
import ButtonVue from "./components/MyButton.vue";

export default {
  name: "App",
  components: {
    Button: ButtonVue,
  },
};
</script>
```
Trong đoạn code trên ở component con `Button` thì mình có binding một prop click vào `slot` có name là "icon" `<slot name="icon" :click="onIconClick" />` và ở trên component cha `App` khi mình truyền content ở `slot "icon"` thì mình có thể dùng `v-slot:icon="iconProps"` để lấy tất cả props mà mình binding ở `slot "icon"` ở component con. Và sau khi có được `iconProps` thì mình chỉ việc `iconProps.click` để lấy ra prop `click` mà mình đã binding trước đó ở component con `Button`.

Chúng ta hãy hiểu đơn giản thôi ví dụ như khi chúng ta muốn custom một phần của một component `Button` thì việc đầu tiên là phải xác định phần cần custom, thứ hai là viết một đoạn khác để thay thế. Nhưng sẽ ra sao nếu mà phần chúng ta muốn thay thế có xử lý một số logic, hoặc đơn giản là sử dụng data ở trong component `Button` (mà data đó chỉ có ở component `Button`). Và `scoped slot` cho phép chúng ta truyền prop lên component cha (để component nếu cha muốn custom thì sẽ có thể nhận được những prop và thực hiện đúng logic cho phần muốn đưa vào thay thế).

Trong trường hợp chúng ta có nhiều prop thì chúng có thể dùng `Destructuring` để lấy từng prop ra dễ dàng, bên cạnh đó là một cách ngắn gọn hơn để viết `slot name` đó là dùng `#`.
```javascript:Button.vue
<template>
  <button>
    // Truyền nhiều prop tại đây và destructuring tại component cha
    <slot name="icon" :click="onIconClick" :loading="isLoading" />
    <slot />
  </button>
</template>

<script>
export default {
  name: "MyButton",
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    onIconClick() {
      console.log("Icon click");
    },
  },
};
</script>
```
```javascript:App.vue
<template>
  <Button type="button">
    // Tại đây chúng ta truyền slot "icon" xuống
    // và chúng ta sẽ lấy prop "click" và "loading" để xử lý render
    <template #icon="{ click, loading }">
      <span @click.stop="click">{{ loading ? "*" : "+" }} </span>
    </template>
    <template #default> Add </template>
  </Button>
</template>

<script>
import ButtonVue from "./components/MyButton.vue";

export default {
  name: "App",
  components: {
    Button: ButtonVue,
  },
};
</script>
```

Rất thú vị đúng không nào. Chúng ta có thể dùng `slot` để custom component một cách dễ dàng, cùng với cách viết rút gọn khá ưa nhìn nữa. Còn chần chờ gì nữa, hãy bắt tay vào custom các component của mình ngay nào.
# IV. Kết luận.
Vậy là chúng ta đã đi qua một lượt về `slot` trong Vue 3. Rất nhiều cách chúng ta có thể áp dụng nó vào trong code của mình.  Vậy các bạn cảm thấy thế nào? Các bạn có nghĩ là `Composition API` có thể thay thế `slot` nói riêng và một số phương pháp reuse code khác (như `mixins`) nói chung được không?

Bài viết của mình đến đây là hết rồi! Hy vọng nó sẽ mang lại lợi ích ít nhiều cho chúng ta khi làm việc với `Vue.js`. Cảm ơn các bạn đã quan tâm đón đọc! Xin chào và hẹn gặp lại trong bài viết tiếp theo!