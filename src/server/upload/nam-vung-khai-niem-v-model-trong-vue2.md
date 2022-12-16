Trong `Vue` có một khái niệm `two-way binding` sử dụng `v-model`. Hãy cũng mình đi qua từng phần để hiểu rõ được bản chất hoạt động của nó.

====

Note: Qua từng phần bạn nên xem code và tự mình làm thử để xem cách nó hoạt động thế nào. Theo mình đó là cách nhanh nhất để bạn nắm được một khái niệm ở [Doc](https://vuejs.org/v2/guide/components-custom-events.html)  trong trang chủ `Vue`.

### 1. `two-way binding` là gì ???
Bạn có thể hiểu nôm na là khi người dùng thay đổi giá trị,  giá trị đó sẽ được cập nhật giá match với giá trị bạn đưa vào.

Ví dụ: Những element như input, chebox, select,... : Khi bạn đổi giá trị của nó, bạn cần gọi một event cập nhật giá trị mới như `@change`, `@input`.

```javascript
<template>
  <div id="app">
    <input type="text" v-model="text" />
    <hr />
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      text: "",
    };
  },
};
</script>
```

Giá trị của text nó sẽ được cập nhật khi bạn người dùng thay đổi giá trị `input` khi bạn sử dụng `v-model`.

Bản chất thực thế của `v-model` sẽ như thế này:

```javascript
<template>
  <div id="app">
    <input type="text" :value="text" @input="onInput" />
    <hr />
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      text: "",
    };
  },
  methods: {
    onInput(e) {
      this.text = e.target.value;
    },
  },
};
</script>
```
Nếu bạn không dùng `v-model`. Bạn sẽ cần phải gọi một event `@input` và event này sẽ gọi hàm `onInput`khi giá trị thay đổi. Trong hàm `onInput` bạn sẽ cần phải lấy giá trị mới nhất và cập nhật vào biến `text`.

Ví dụ khá đơn giản và dễ hiểu phải không, giờ phức tạp hơn xíu nha.

### 2. Tạo Component sử dụng `v-model`
Khi làm dự án thì sẽ hay cần taọ một component TextField gồm `label`, `input`. Vậy ta sử dụng v-model cho nó như thế nào đây???

```javascript
<TextField label="Name" v-model="text" />
```

```javascript
// (1)
// TextField.vue
<template>
  <div>
    <label v-if="label"> {{ label }} </label>
    <input type="text" />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
  },
  created() {
    console.log(this);
  },
};
</script>
```
Mình sẽ log `this` ở `created` . Khi log nó thì bạn sẽ thấy được `$attrs`  `$listerners` gồm `value` và event `input` khi mình  sử dụng `v-model="text"` ở  `TextField` (`v-model` sẽ tự động sinh ra 2 cái này).

![Screen Shot 2021-09-22 at 08.14.49.png](https://images.viblo.asia/8b7d67dc-5840-4287-8386-7ca8ae956ba8.png)

Nếu mình bind hết  `$attrs`  `$listerners` vào input từ v-model có hoạt động không:

```javascript
// (2)
// TextField.vue
<template>
  <div>
    <label v-if="label"> {{ label }} </label>
    <input type="text" v-bind="$attrs" v-on="$listerners" />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
  },
  created() {
    console.log(this);
  },
};
</script>
```

Câu trả lời sẽ là không nha. Vì `@input` khi tay đổi thì giá trị thì tham số đưa vào đang là một object event. Nên khi bạn cập nhật giá trị cho text thì `text = event`.

Trong trường hợp này. Bạn cần override event `input` trong `$listerners`. Xem mình làm nha

```javascript
// (3)
// TextField.vue
<template>
  <div>
    <label v-if="label"> {{ label }} </label>
    <input type="text" v-bind="$attrs" v-on="inputListerners" />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
  },
  computed: {
    inputListerners() {
      return {
        ...this.$listeners,
        input: (event) => {
          this.$emit("input", event.target.value);
        },
      };
    },
  },
  created() {
    console.log(this);
  },
};
</script>
```
Mình sẽ tạo một biến `inputListerners` biến này sẽ dùng `spread` của es6 để ghi đè event `@input` (Tham khảo cách viết thuần Js ở [Doc](https://vuejs.org/v2/guide/components-custom-events.html#Binding-Native-Events-to-Components) của Vue)

Giờ thử chạy lại xem kết quả nhé.