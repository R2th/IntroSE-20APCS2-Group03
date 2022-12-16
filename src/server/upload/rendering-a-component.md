## Hai cách để biểu diễn (render)

`vue-test-utils` cung cấp 2 cách để  render, hoăc  __mount__ một component - `mount` và `shallowMount`. Một component được mounted bằng một trong hai phương thức trả về một `wrapper`, là một đối tượng chứa Vue component, kèm theo đó là một số phương thức để kiểm thử.

Chúng ta bắt đầu với hai components đơn giản:

```js
const Child = Vue.component("Child", {
  name: "Child",

  template: "<div>Child component</div>"
})

const Parent = Vue.component("Parent", {
  name: "Parent",

  template: "<div><child /></div>"
})
```

Cúng ta bắt đầù rendering `Child` và gọi phương thức `html` mà `vue-test-utils` cung cấp để kiểm tra markup.

```js
const shallowWrapper = shallowMount(Child)
const mountWrapper = mount(Child)

console.log(shallowWrapper.html())
console.log(mountWrapper.html())
```

Cả hai `mountWrapper.html()` và `shallowWrapper.html()` sẽ cho kết quả như sau:

```html
<div>Child component</div>
```

Không có sự khác biệt, vậy chúng ta sẽ thử làm cách kiểm tra tương tự đối với `Parent`?

```js
const shallowWrapper = shallowMount(Parent)
const mountWrapper = mount(Parent)

console.log(shallowWrapper.html())
console.log(mountWrapper.html())
```

`mountWrapper.html()` bây giờ là:

```html
<div><div>Child component</div></div>
```

`Parent` và `Child` đều render giống nhau. Mặt khác, `shallowWrapper.html()` ra được kết quả như sau:

```html
<div><vuecomponent-stub></vuecomponent-stub></div>
```

Ở `<Child />` được thay thế bởi `<vuecomponent-stub />`. `shallowMount` render các thành phần html thông thường, nhưng thay thế các thành phần components của Vue bằng stub.

> Stub là một loại đối tượng "giả" đại diện cho một đối tượng thực sự.

Hãy tưởng tượng bạn muốn kiếm tra `App.vue` của mình, trông giống như thế này:

```vue
<template>
  <div>
    <h1>My Vue App</h1>
    <fetch-data />
  </div>
</template>
```

Và chúng ta muốn kiểm thử  `<h1>My Vue App</h1>` sẽ được rendered chính xác. Chúng ta cũng có component `<fetch-data>`, sẽ gọi request API bên ngoài trong `mounted` của lifecycle hook.

Nếu chúng ta sử dụng `mount`, mặc dù tất cả những gì chúng ta muốn làm là kiểm tra so sánh văn bản được rendered, `<fetch-data />` sẽ gọi request API. Điều này sẽ làm cho quá trình kiểm thử của chúng ta bị chậm và dễ dàng bị fail do quá nhiều thứ khó kiểm soát. Vì vậy, chúng ta sử dụng stub để tạo như là một đối tượng thực sự. Bằng cách sử dụng `shallowMount`, `<fetch-data />` sẽ được thay thế bằng một `<vuecomponent-stub />`, và lệnh gọi request API sẽ không cần sử dụng đến nó.

## Reference
Dịch từ: https://lmiller1990.github.io/vue-testing-handbook/rendering-a-component.html