Chào mọi người, hôm nay mình sẽ viết về Mixins và 1 số vấn đề trong sử dụng Mixins hay ho mà mình gặp trong dự án thực. 

## I. Mixin trong VueJS:
Trích dẫn từ trang chủ của [`VueJS`](https://vi.vuejs.org/v2/guide/mixins.html):
> Mixin là một cách linh hoạt để phân phối những tính năng tái sử dụng được cho component.

Cú pháp sử dụng Mixin cũng rất đơn giản, tạo 1 file js bất kỳ và sử dụng nó ở các file vue:

* src/mixins/isEven.js
```javascript
export default {
  methods: {
    isEven(value) {
      return value % 2 === 0;
    }
  }
};
```

Sau đó, chúng ta sẽ import vào file `.vue` cần dùng:

* src/views/Home.vue:
```javascript
...
import isEven from "@/helpers/isEven";
...

export default {
  ...
  mixins: [isEven], // sử dụng isEven như một mixin
  ...
};
```

Ngoài ra, chúng ta cũng có thể viết một `Global Mixin`:

* src/mixins/isEven.js
```javascript
import Vue from "vue";

Vue.mixin({
  methods: {
    isEven(value) {
      return value % 2 === 0;
    }
  }
});
```

Và gọi ở trong file `main.js`:

* src/main.js:
```javascript
...
import "@/helpers/isEven";
...
```

Với cả 2 cách trên, chúng ta đã có thể sử dụng `isEven` để kiểm tra chẵn lẻ:

* Ở tag `template`:

```html
<template>
    ...
    {{ isEvent(5) }} <!-- false -->
    ...
</template>
```

* Ở tag `script`:
```js
export default {
    ...
    created() {
        console.log(this.isEven(5)); /* false */
    },
    ...
}
```

## II. Một số lưu ý khác khi sử dụng mixin:
### 1. Option Merging:
* Khi các tên biến `data`, các `computed`, các `methods` của `mixin` và `component` trùng nhau, `Vue` sẽ sử dụng các giá trị này của `component` ưu tiên.
* Khi các `Lifecycle Hooks` trùng nhau, thứ tự chạy sẽ là `Mixin -> Component` cho từng hook.

Demo code:

* src/mixins/isEven.js
```javascript
export default {
  data: () => ({
    name: "Mixin"
  }),
  computed: {
    show() {
      return "Mixin";
    }
  },
  methods: {
    isEven(value) {
      return value % 2 === 0;
    },
    warning() {
      return "Mixin";
    }
  },
  created() {
    console.log("in mixin create"); // eslint-disable-line no-console
  },
  beforeDestroy() {
    console.log("in mixin destroy"); // eslint-disable-line no-console
  }
};
```

* File `.vue`:
```html
<template>
  <div class="home">
    <h2>data: {{ name }}</h2> <!-- Component -->
    <h2>computed: {{ show }}</h2> <!-- Component -->
    <h2>methods: {{ warning() }}</h2> <!-- Component -->
  </div>
</template>
```

```javascript
import isEven from "@/helpers/isEven";

export default {
  name: "Home",
  mixins: [isEven],
  data: () => ({
    name: "Component"
  }),
  computed: {
    show() {
      return "Component";
    }
  },
  methods: {
    warning() {
      return "Component";
    }
  },
  created() {
    console.log("in component create"); // eslint-disable-line no-console
  },
  beforeDestroy() {
    console.log("in component destroy"); // eslint-disable-line no-console
  }
};
```

* In Terminal khi vào url '/':
```
in mixin create
in component create
```
* Khi thay đổi route:
```
in mixin destroy
in component destroy
```
### 2. Lưu ý từ người viết:
Có một vài quan điểm về `Mixin` mà mình muốn chia sẽ thêm.
* Đầu tiên là việc không sử dụng `Global Mixin`, chỉ import mixin khi bạn sử dụng, tránh việc ảnh hưởng bởi `Mixin` làm thay đổi các giá trị của ứng dụng web, ngoài ra còn có thể làm giảm hiệu năng web của bạn.
* Trong hầu hết trường hợp, khi viết các `helpers`, chúng ta không nên viết theo dạng `Mixin`, thay vào đó, hay viết 1 `pure function` (như function `isEven` ở đầu bài là 1 `pure function`), import vào ở dạng method. Chỉ khi cần sử dụng biến `this` của `Vue`, chúng ta mới ưu tiên hơn cho `mixin`. Việc sử dụng `pure function` cũng giúp code gọn gàng hơn, 1 function cho 1 chức năng, và tương tự đối với mixin, `1 mixin 1 chức năng`:
```javascript
import isEvent from '...';

export default {
    methods: {
        isEven,
        ...
    },
}
```


Trên đây là một vài chia sẻ nho nhỏ của mình về `Mixin` khi thực chiến với `Vue`, cảm ơn các bạn đã đọc qua. Hãy mạnh dạn comment ở bên dưới nếu có thắc mắc hoặc vấn đề cẩn thảo luận nhé ;).