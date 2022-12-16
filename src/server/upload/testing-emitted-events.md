## Kiểm thử với sự kiện emit

Khi các ứng dụng được phát triển lớn hơn, số lượng các component cũng phát triển kèm theo đó. Khi các thành phần này cần phải chia sẻ dữ liệu, component con có thể [emit](https://vuejs.org/v2/api/#vm-emit) một event, và các component cha sẽ phản hồi chúng.

`vue-test-utils` cung cấp một API `emitted` cho phép chúng ta so sánh các sự kiện được emit. Các tài liệu cho `emitted` có thể đọc thêm [ở đây](https://vue-test-utils.vuejs.org/api/wrapper/emitted.html).

Mã nguồn cho file Test có thể đọc thêm [ở đây](https://github.com/lmiller1990/vue-testing-handbook/tree/master/demo-app/tests/unit/Emitter.spec.js).

## Viết một Component và Test

Chúng ta sẽ xây dựng một component đơn giản. Tạo một component `<Emitter>` và thêm các đoạn code sau.

```html
<template>
  <div>
  </div>
</template>

<script>
  export default {
    name: "Emitter",

    methods: { 
      emitEvent() {
        this.$emit("myEvent", "name", "password")
      }
    }
  }
</script>

<style scoped>
</style>
```

Xây dựng test call `emitEvent`:

```js
import Emitter from "@/components/Emitter.vue"
import { shallowMount } from "@vue/test-utils"

describe("Emitter", () => {
  it("emits an event with two arguments", () => {
    const wrapper = shallowMount(Emitter)

    wrapper.vm.emitEvent()

    console.log(wrapper.emitted())
  })
})
```
Sử dụng [emitted API](https://vue-test-utils.vuejs.org/ja/api/wrapper/emitted.html) được cung cấp bởi `vue-test-utils`, chúng ta có thể dễ dàng thấy các event được emit.

Chạy các test với `yarn test:unit`.

```
PASS  tests/unit/Emitter.spec.js
● Console

  console.log tests/unit/Emitter.spec.js:10
    { myEvent: [ [ 'name', 'password' ] ] }
```

## emitted syntax

`emitted` trả về một đối tượng. Các sự kiện được emit được lưu dưới dạng các thuộc tính trên đối tượng. Bạn có thể kiểm tra các sự kiện bằng các sử dụng `emitted().[event]`:

```js
emitted().myEvent //=>  [ [ 'name', 'password' ] ]
```

Chúng ta sẽ cố gắng thử gọi `emitEvent` 2 lần.

```js
it("emits an event with two arguments", () => {
  const wrapper = shallowMount(Emitter)

  wrapper.vm.emitEvent()
  wrapper.vm.emitEvent()

  console.log(wrapper.emitted().myEvent)
})
```

Chạy test với `yarn test:unit`:

```
console.log tests/unit/Emitter.spec.js:11
  [ [ 'name', 'password' ], [ 'name', 'password' ] ]
```

`emitted().emitEvent` bây giờ trả về một mảng. Ở instance đầu tiên `emitEvent` có thể truy cập bằng cách sử dụng với `emitted().emitEvent[0]`. Các đối số có thể truy cập bằng cách sử dụng một syntax tương tự, `emitted().emitEvent[0][0]` v.v.

Chúng ta sẽ so sánh thực tế đối với trường hợp emitted event này.

```js
it("emits an event with two arguments", () => {
  const wrapper = shallowMount(Emitter)

  wrapper.vm.emitEvent()

  expect(wrapper.emitted().myEvent[0]).toEqual(["name", "password"])
})
```

Test đã pass.

## Test các event mà không cần mounting component

Đôi lúc bạn có thể kiểm tra các emitted events mà không cần mounting component. Bạn có thể làm điều này bằng cách sử dụng `call`. Chúng ta sẽ viết một test khác. 

```js
it("emits an event without mounting the component", () => {
  const events = {}
  const $emit = (event, ...args) => { events[event] = [...args] }

  Emitter.methods.emitEvent.call({ $emit })

  expect(events.myEvent).toEqual(["name", "password"])
})
```

Vì `$emit` chỉ là một đối tượng JavaScript, bạn có thể mock `$emit` và bằng cách sử dụng `call` để attach kèm theo vào `this` context của `emitEvent`. Bằng cách sử dụng `call`, bạn có thể gọi một phương thức mà không cần mounting component.

Việc sử dụng `call` có thể hữu ích trong các tình huống mà bạn có một số xử lý nặng trong các phương thức của lifecycle như `created` và `mounted` mà bạn không muốn thực hiện chúng. Vì vậy không mounting component, nên các phương thức lifecycle không bao giờ được gọi đến. Nó cũng có thể hữu ích khi bạn muốn thao tác `this` context một cách cụ thể nào đó.

## Kết luận

- Các API `emitted` từ `vue-test-utils` được sử dụng để thực hiện các so sánh khi emitted events.
- `emitted` là một phương thức. Nó trả về một đối tượng có các thuộc tính tương ứng với các emitted events.
- mỗi các thuộc tính của `emiited` là một mảng. Bạn có thể truy cập vào từng trường hợp của một emitted events bởi cách sử dụng cú pháp mảng `[0]`, `[1]`.
- các đối số của emitted events cũng được lưu lại dưới dạng mảng và có thể được truy cập bằng cách sử dụng cú pháp mảng `[0]`, `[1]`
- `$emit` cũng có thể được mock sử dụng `call`, so sánh xác nhận có thể được thực hiện mà không render component.

Mã nguồn của test được miêu tả [ở đây](https://github.com/lmiller1990/vue-testing-handbook/tree/master/demo-app/tests/unit/Emitter.spec.js).