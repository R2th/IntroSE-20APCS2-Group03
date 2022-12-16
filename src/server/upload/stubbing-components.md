## Stub các component

Bạn có thể tìm thấy file test [ở đây](https://github.com/lmiller1990/vue-testing-handbook/tree/master/demo-app/tests/unit/ParentWithAPICallChild.spec.js).

## Tại sao sử dụng stub?

Khi bạn viết unit test, thường thì chúng ta muốn _stub_ những đoạn code mà chúng ta không cần quan tâm. Một stub chỉ đơn giản là một đoạn code thể hiện cho các thứ khác. Giả sử bạn đang viết test cho component `<UserContainer>`. Nó sẽ trông như thế này:

```html
<UserContainer>
  <UsersDisplay />
</UserContainer>
```

`<UserDisplay>` có một phương thức `created` lifecycle như sau:

```js
created() {
  axios.get("/users")
}
```

Chúng ta muốn viết test khẳng định rằng `<UserDisplay>` được render.

`axios` đang thực hiện ajax request gọi bên ngoài trong lúc `created`. Điều đó có nghĩa rằng chúng ta dùng `mount(UserContainer)`, `<UserDisplay>` cũng được mounted, và `created` khởi tạo ajax request. Vì đây là một unit test, chúng ta chỉ quan tâm đến việc liệu có `<UserContainer>` render chính xác `<UserDisplay>` hay không, việc verify ajax request có đúng endpoint hay không là việc của `<UsersDisplay>` khi viết unit test.

Một cách để ngăn chặn `<UserDisplay>` bắt đầu call ajax request là _stubbing_ component. Chúng ta sẽ viết component của riêng chúng ta và test chúng để hiểu rõ hơn về lợi ích của stub.

## Tạo components

Ví dụ này sẽ sử dụng hai components. Đầu tiên là `ParentWithAPICallChild`, chỉ đơn giản là render một component khác:

```html
<template>
  <ComponentWithAsyncCall />
</template>

<script>
import ComponentWithAsyncCall from "./ComponentWithAsyncCall.vue"

export default {
  name: "ParentWithAPICallChild",

  components: {
    ComponentWithAsyncCall
  }
}
</script>
```

`<ParentWithAPICallChild>` là một component đơn giản. Việc của nó là render `<ComponentWithAsyncCall>`. `<ComponentWithAsyncCall>` như tên gọi của nó sẽ thực hiện một ajax request bằng `axios` http client:

```html
<template>
  <div></div>
</template>

<script>
import axios from "axios"

export default {
  name: "ComponentWithAsyncCall",
  
  created() {
    this.makeApiCall()
  },
  
  methods: {
    async makeApiCall() {
      console.log("Making api call")
      await axios.get("https://jsonplaceholder.typicode.com/posts/1")
    }
  }
}
</script>
```

`<ComponentWithAsyncCall>` sẽ gọi `makeApiCall` bên trong `created` của lifecycle hook.

## Viết test bằng cách sử dụng `mount`

Chúng ta sẽ bắt đầu viết test để xác minh rằng `<ComponentWithAsyncCall>` được render:

```js
import { shallowMount, mount } from '@vue/test-utils'
import ParentWithAPICallChild from '@/components/ParentWithAPICallChild.vue'
import ComponentWithAsyncCall from '@/components/ComponentWithAsyncCall.vue'

describe('ParentWithAPICallChild.vue', () => {
  it('renders with mount and does initialize API call', () => {
    const wrapper = mount(ParentWithAPICallChild)

    expect(wrapper.find(ComponentWithAsyncCall).exists()).toBe(true)
  })
})
```

Chạy `yarn test:unit` trên terminals:

```
PASS  tests/unit/ParentWithAPICallChild.spec.js

console.log src/components/ComponentWithAsyncCall.vue:17
  Making api call
```

Test của chúng ta đã vượt qua thành công. Lưu ý rằng `console.log` trong đầu ra xuất phát từ phương thức `makeApiCall`. Lý tưởng nhất là không gọi các dịch vụ bên ngoài của unit test, đặc biệt là chúng không liên quan đến trọng tâm của unit test. Chúng ta có thể sử dụng `stubs` thay thế , được mô tả tài liệu [ở đây](https://vue-test-utils.vuejs.org/api/options.html#stubs).

## Sử dụng `stubs` để stub `<ComponentWithAsyncCall>`

Chúng ta sẽ cập nhật là test của chúng ta, lần này là stub `<ComponentWithAsyncCall>`:

```js
it('renders with mount and does initialize API call', () => {
  const wrapper = mount(ParentWithAPICallChild, {
    stubs: {
      ComponentWithAsyncCall: true
    }
  })

  expect(wrapper.find(ComponentWithAsyncCall).exists()).toBe(true)
})
```

Test của chúng ta vẫn pass khi chạy `yarn test:unit`, tuy nhiên `console.log` không xuất hiện. Đó là bời vì chúng ta đã sử dụng `[component]: true` để `stubs` thay thế component ban đầu. Interface vẫn giống nhau (chúng ta vẫn có thể đang sử dụng `find`, vì thuộc tính `name` được sử dụng bên trong `find`). Các phương thức bên trong, chẳng hạn `makeApiCall`, được thay thế bằng các phương thức giả và không làm gì cả - chúng đã bị "stubbed out". 

Bạn cũng có thể chỉ định đánh dấu để sử dụng stub, nếu bạn muốn:

```js
const wrapper = mount(ParentWithAPICallChild, {
  stubs: {
    ComponentWithAsyncCall: "<div class='stub'></div>"
  }
})
```

## Tự động stub với `shallowMount`

Thay vì sử dụng `mount` và stub thủ công `<ComponentWithAsyncCall>`, chúng ta có thể sử dụng `shallowMount`, nó sẽ tự động stub bất kỳ component con nào theo mặc định. Các test với `shallowMount` trông sẽ như thế này:

```js
it('renders with shallowMount and does not initialize API call', () => {
  const wrapper = shallowMount(ParentWithAPICallChild)

  expect(wrapper.find(ComponentWithAsyncCall).exists()).toBe(true)
})
```

Chạy `yarn test:unit` sẽ không hiển thị bất cứ `console.log` nào, và test pass. `shallowMount` tự động stub `<ComponentWithAsyncCall>`. `shallowMount` rất hữu ích chho việc kiểm tra component có nhiều component con. Tôi có xu hướng sử dụng `shallowMount` theo mặc định trừ khi có lý do chính đáng để sử dụng `mount`. Nó phụ thuocj vào trường hợp sử dụng của bạn và những gì bạn muốn test.

## Kết luận

- `stubs` rất hữu ích để loại bỏ các hành vi của component con không liên quan đến unit test của chúng ta
- `shallowMount` stubs các component con một cách mặc định
- bạn có thể pass `true` để tạo stub mặc định hoặc pass theo cách tùy chỉnh riêng bạn

Bạn có thể tìm thấy bài test được mô tả [ở đây](https://github.com/lmiller1990/vue-testing-handbook/tree/master/demo-app/tests/unit/ParentWithAPICallChild.spec.js).