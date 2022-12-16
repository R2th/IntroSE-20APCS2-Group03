## Tìm kiếm các yếu tố

`vue-test-utils` cung cấp một cách để tìm và khẳng định sự hiện diện của các phần tử html hoặc các component Vue khác bằng phương thức `find`. Việc sử dụng `find` là khẳng định một component được render chính xác một element hoặc một component con.

Mã nguồn cho các bài test được mô tả trên trang này có thể tìm thấy [ở đây](https://github.com/lmiller1990/vue-testing-handbook/tree/master/demo-app/tests/unit/Parent.spec.js).

## Tạo các components

Trong ví dụ này, chúng ta sẽ tạo component `<Child>` và `<Parent>`.

Child: 

```js
<template>
  <div>Child</div>
</template>

<script>
export default {
  name: "Child"
}
</script>
```

Parent:

```js
<template>
  <div>
    <span v-show="showSpan">
      Parent Component
    </span>
    <Child v-if="showChild" />
  </div>
</template>

<script>
import Child from "./Child.vue"

export default {
  name: "Parent",

  components: { Child },

  data() {
    return {
      showSpan: false,
      showChild: false
    }
  }
}
</script>
```

## `find` vói `querySelector` syntax

Các yêu tố thông thường có thể dễ dàng được chọn bằng cách sử dụng syntax của `document.querySelector`. `vue-test-utils` cũng cung cấp một phương thức `isVisible` để kiểm tra các phần tử được render có điều kiện `v-show` hay không. Tạo một `Parent.spec.js`, và bên trong file chúng ta thêm các đoạn mã sau:

```js
import { mount, shallowMount } from "@vue/test-utils"
import Parent from "@/components/Parent.vue"

describe("Parent", () => {
  it("does not render a span", () => {
    const wrapper = shallowMount(Parent)

    expect(wrapper.find("span").isVisible()).toBe(false)
  })
})
```

Vì `v-show="showSpan"` mặc định là `false`, Chúng tôi hy vọng rằng phương thức `<span>` của phần tử tìm thấy `isVisible` sẽ trả về là `false`. Test sẽ pass khi chạy với `yarn test:unit`. Tiếp theo, một test khác sẽ thực hiện xung quanh trường hợp `showSpan` là true.

```js
it("does render a span", () => {
  const wrapper = shallowMount(Parent, {
    data() {
      return { showSpan: true }
    }
  })

  expect(wrapper.find("span").isVisible()).toBe(true)
})
```

Tất nhiên sẽ pass! Giống như `isVisible` cho `v-show`, `vue-test-utils` cung cấp một phương thức `exists` được sử dụng khi kiểm tra các yếu tố có điều kiện render khi sử dụng `v-if`.

## TÌm thành phần với `name` và `Component`

Tìm các component con sẽ khác một chút so với tìm các phần tử HTML thông thường. Sẽ có hai cách chính để khẳng định sự hiện diện cảu các Vue component con:

1. `find(Component)`
2. `find({ name: "ComponentName" })`

Một chút dễ hiểu hơn trong bối cảnh của một ví dụ test. Chúng ta sẽ bắt đầu với cú pháp `find(Component)`. Điều này đòi hỏi chúng ta sẽ `import` các component và truyền nó vào hàm `find`.

```js
import Child from "@/components/Child.vue"

it("does not render a Child component", () => {
  const wrapper = shallowMount(Parent)

  expect(wrapper.find(Child).exists()).toBe(false)
})
```

Việc thực hiện của `find` khác phức tạp, vì nó hoạt động với `querySelector`, cũng như một số cú pháp khác. Bạn có thể thấy một phần của nguồn tìm thấy các Vue component con được mô tả [ở đây](https://github.com/vuejs/vue-test-utils/blob/dev/packages/test-utils/src/find.js). Về cơ bản, nó kiểm tra `name` của component đối với từng child được render, sau đó sẽ kiểm tra `constructor` và một số thuộc tính khác.

Như đã đề cập trong đoạn trước, thuộc tính `name` là một trong những kiểm tra được thực hiện `find` khi bạn chạy qua một component. Thay vì chuyển component, bạn có thể chỉ cần truyền một đối tượng với thuộc tính chính xác `name`. Điều này có nghĩa là bạn không cần đến `import` component. Hãy kiểm tra trường hợp khi `<Child>` được render:

```js
it("renders a Child component", () => {
  const wrapper = shallowMount(Parent, {
    data() {
      return { showChild: true }
    }
  })

  expect(wrapper.find({ name: "Child" }).exists()).toBe(true)
})
```

Nó đá pass! Sử dụng tính chất `name` có thể sẽ có một chút không trực quan, vì vậy nhập component thực tế là một thay thế. Một tùy chọn khác là chỉ cần thêm một `class` hoặc `id` và truy vấn bằng `querySelector` được trình bày trong hai ví dụ đầu tiền.

## `findAll`

Thường có trường hợp khi bạn muốn khẳng định rằng một số phần tử được render. Một số trường hợp phổ biến là một danh sách các mục được redner với `v-for`. Đây là một trong `<ParentWithManyChildren>` nó render các components `<Child>`.

```js
<template>
  <div>
    <Child v-for="id in [1, 2 ,3]" :key="id" />
  </div>
</template>

<script>
import Child from "./Child.vue"

export default {
  name: "ParentWithManyChildren",

  components: { Child }
}
</script>
```

Chúng ta có thể viết test kiểm tra bằng cách `findAll` xác nhận ba components `<Child>` sẽ được render như thế này:

```js
it("renders many children", () => {
  const wrapper = shallowMount(ParentWithManyChildren)

  expect(wrapper.findAll(Child).length).toBe(3)
})
```

Chạy `yarn test:unit` sẽ hiển thị test đã pass. Bạn có thể sử dụng cú pháp `querySelector` với `findAll`.

## Kết luận

Trang này bao gồm:

- sử dụng `find` và `findAll` với cú pháp `querySelector`
- `isVisible` và `exists`
- sử dụng `find` và `findAll` với component hoặc name của phần được select

Mã nguồn cho bài kiểm tra được mô tả trên trang này có thể được tìm thấy [ở đây](https://github.com/lmiller1990/vue-testing-handbook/tree/master/demo-app/tests/unit/Parent.spec.js).