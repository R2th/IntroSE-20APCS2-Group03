## Thiết lập props với propsData

`propsData` có thể sử dụng với cả `mount` và `shallowMount`. Nó thường được sử dụng để kiểm tra các components được nhận props từ component cha của nó.

`propsData` được truyền đối số thứ 2 của một trong hai `shallowMount` hoặc `mount` dưới dạng sau:

```js
const wrapper = shallowMount(Foo, {
  propsData: {
    foo: 'bar'
  }
})
```

## Tạo component mẫu

Tạo một component `<SubmitButton>` đơn giản có hai `props`: `msg` và `isAdmin`. Tùy thuộc vào giá trị của `isAdmin`, component này sẽ chứa một `<span>` trong hai trạng thái: 

* `Not Authorized` nếu `isAdmin` là false (hoặc không được thông qua dưới dạng prop)
* `Admin Privileges` nếu `isAdmin` là true

```html
<template>
  <div>
    <span v-if="isAdmin">Admin Privileges</span>
    <span v-else>Not Authorized</span>
    <button>
      {{ msg }}
    </button>
  </div>
</template>

<script>
export default {
  name: "SubmitButton",

  props: {
    msg: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  }
}
</script>
```

## Tạo kiểm thử đầu tiên

Chúng ta sẽ đưa ra khẳng định về thông báo trong trường hợp người dùng không có quyền quản trị admin.

```js
import { shallowMount } from '@vue/test-utils'
import SubmitButton from '@/components/SubmitButton.vue'

describe('SubmitButton.vue', () => {
  it("displays a non authorized message", () => {
    const msg = "submit"
    const wrapper = shallowMount(SubmitButton,{
      propsData: {
        msg: msg
      }
    })

    console.log(wrapper.html())

    expect(wrapper.find("span").text()).toBe("Not Authorized")
    expect(wrapper.find("button").text()).toBe("submit")
  })
})
```

Chạy test với `yarn test:unit`. Kết quả chúng ta nhận được:

```
PASS  tests/unit/SubmitButton.spec.js
  SubmitButton.vue
    ✓ displays a non authorized message (15ms)
```

Kết quả của `console.log(wrapper.html())` cũng được in ra:

```html
<div>
  <span>Not Authorized</span>
  <button>
    submit
  </button>
</div>
```

Chúng ta có thể thấy `msg` prop được xử lý và markup chính xác những gì được hiển thị.

## Tạo thử nghiệm thứ hai

Chúng ta sẽ kiểm tra trạng thái khi `isAdmin` là `true`:

```js
import { shallowMount } from '@vue/test-utils'
import SubmitButton from '@/components/SubmitButton.vue'

describe('SubmitButton.vue', () => {
  it('displays a admin privileges message', () => {
    const msg = "submit"
    const isAdmin = true
    const wrapper = shallowMount(SubmitButton,{
      propsData: {
        msg,
        isAdmin
      }
    })

    expect(wrapper.find("span").text()).toBe("Admin Privileges")
    expect(wrapper.find("button").text()).toBe("submit")
  })
})
```

Chạy test với `yarn test:unit` và kiểm tra kết quả:

```shell
PASS  tests/unit/SubmitButton.spec.js
  SubmitButton.vue
    ✓ displays a admin privileges message (4ms)
```

Chúng ta cũng có markup với `console.log(wrapper.html())`:

```html
<div>
  <span>Admin Privileges</span>
  <button>
    submit
  </button>
</div>
```
Có thể thấy prop `isAdmin` được sử dụng để render phần tử `<span>` một cách chính xác.

## Refactoring lại các tests

Chúng ta sẽ refactor lại các bài tests tuân thủ nguyên tắc "Don't Repeat Yourself" (DRY). Vì tất cả các bài test đều pass, chúng ta có thể tự tin để tái refactor lại chúng. Miễn là tất cả các bài tests vẫn có thể pass sau khi refactor, hãy chắc chắn rằng là không phá vỡ bất cứ điều gì.

## Refactor với Factory Function

Trong cả hai bài tests, chúng ta gọi `shallowMount` sau đó sử dụng đối tượng `propsData` lặp đi lặp lại. Chúng ta có thể refactor lại bằng cách sử dụng một factory function. Một factory function là một hàm trả về một đối tượng - nó _tạo ra_ các đối tượng, do đó có tên là "factory" function.

```js
const msg = "submit"
const factory = (propsData) => {
  return shallowMount(SubmitButton, {
    propsData: {
      msg,
      ...propsData
    }
  })
}
```

Trên đây là một function nó sẽ `shallowMount` một `SubmitButton` component. Chúng ta có thể pass bất cứ props nào để thay đổi đối số đầu tiên `factory`. Hãy DRY những test cùng với factory function.

```js
describe("SubmitButton", () => {
  describe("has admin privileges", ()=> {
    it("renders a message", () => {
      const wrapper = factory()

      expect(wrapper.find("span").text()).toBe("Not Authorized")
      expect(wrapper.find("button").text()).toBe("submit")
    })
  })

  describe("does not have admin privileges", ()=> {
    it("renders a message", () => {
      const wrapper = factory({ isAdmin: true })

      expect(wrapper.find("span").text()).toBe("Admin Privileges")
      expect(wrapper.find("button").text()).toBe("submit")
    })
  })
})
```

Chạy thử nghiệm lần nữa. Mọi thứ để pass dễ dàng.

```sh
PASS  tests/unit/SubmitButton.spec.js
 SubmitButton
   has admin privileges
     ✓ renders a message (26ms)
   does not have admin privileges
     ✓ renders a message (3ms)
```

## Kết luận

- Bằng các pass `propData` khi gắn mounting một component, bạn có thể set các `props` được sử dụng trong kiểm thử.
- Factory functions có thể sử dụng để DRY các tests của bạn
- Thay vì sử dụng `propsData`, chúng ta cũng có thể sử dụng [`setProps`](https://vue-test-utils.vuejs.org/api/wrapper-array/#setprops-props) để set giá trị props trong quá trình kiểm thử.

## Reference
Dịch từ: https://lmiller1990.github.io/vue-testing-handbook/components-with-props.html#setting-props-with-propsdata