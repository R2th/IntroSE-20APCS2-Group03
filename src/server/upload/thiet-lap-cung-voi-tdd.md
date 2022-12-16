## Cài đặt vue-cli

`vue-test-utils` là thư viện kiểm thử chính thức cho Vue và sẽ được sử dụng xuyên suốt trong cẩm nang này của chúng ta. Nó chạy trong cả môi trường trình duyệt Node.js và hoạt động với bất kỳ runner test nào. Chúng ta sẽ chạy các test trong môi trường Node.js trên tất cả nội dung của series này.

Với thư viện `vue-cli` là cách dễ nhất để khởi tạo project của chúng ta. Nó sẽ thiết lập, cũng như cấu hình Jest, một khung thực hiện các kiểm thử phổ biến trên Javascript. Chúng ta sẽ cài đặt nó bằng cách chạy terminal:

```bash
yarn global add @vue/cli
```

hoặc với npm:

```bash
npm install -g @vue/cli
```

Tạo một dự án mới bằng cách chạy `vue create [project-name]`. Chọn "Manually select features" và "Unit Testing", và "Jest" cho việc kiểm thử.

Sau khi cài đặt kết thúc, `cd` vào trong dự án và chạy `yarn test:unit`. Nếu mọi thứ đều không có vấn đề gì, bạn sẽ thấy:

```js
 PASS  tests/unit/HelloWorld.spec.js
  HelloWorld.vue
    ✓ renders props.msg when passed (26ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.074s
```

Chúc mừng bạn vừa chạy các bài kiểm tra đầu tiên thành công. :+1:

## Viết các bài tests đầu tiên

Chúng ta chạy các test hiện có đi kèm với dự án. Theo cách truyền thống khi làm TDD, bạn viết các đoạn mã test trước, sau đó mới triển khai code sao cho các bài test pass các mã test. Bây giờ, chúng ta sẽ viết component đầù tiên. 

Chúng ta không `cần src/components/HelloWorld.vue` hoặc `tests/unit/HelloWorld.spec.js` nữa, vì vậy bạn có thể xóa chúng nếu có thể.

## Tạo components `Greeting`

Tạo một file `Greeting.vue` trong `src/components`. Bên trong `Greeting.vue`, thêm những thứ sau đây:

```html
<template>
  <div>
    {{ greeting }}
  </div>
</template>

<script>
export default {
  name: "Greeting",

  data() {
    return {
      greeting: "Vue and TDD"
    }
  }
}
</script>
```

## Viết test

`Greeting` chỉ có một trách nhiệm là render giá trị `greeting`. Chiến lược ở đây là:

1. Render component với `mount`
2. Assert văn bản bên trong components có chứa từ khóa "Vue and TDD"

Tạo một `Greeting.spec.js` bên trong `tests/unit`. Bên trong, import `Greeting.vue`, cũng như `mount`, và thêm 1 số outline cho test case của bạn:

```js
import { mount } from '@vue/test-utils'
import Greeting from '@/components/Greeting.vue'

describe('Greeting.vue', () => {
  it('renders a greeting', () => {

  })
})
```

Có các cú pháp khác nhau được sử dụng cho TDD, chúng ta sẽ sử dụng cú pháp thường thấy về  `describe` và `it` đi kèm với Jest. `describe` phác thảo những gì bài test muốn, ở đây là `Greeting.vue`. `it` đại diện cho một phần kiểm tra mà đối tượng của bài test đó phải hoàn thành. Khi chúng ta có nhiều tính năng ở components thì chúng ta có nhiều khối `it`.

Bây giờ chúng ta render component với `mount` và gán component cho 1 biến được gọi là `wrapper` và cũng sẽ in console ra, để đảm bảo mọi thứ chạy chính xác:

```js
const wrapper = mount(Greeting)

console.log(wrapper.html())
```

## Chạy test

Chạy test bằng cách gõ `yarn test:unit` trên terminal của bạn. Bất kì file `tests` đều có kết thúc bằng đuôi `.spec.js` được thực hiện tự động. Bạn sẽ thấy:

```js
PASS  tests/unit/Greeting.spec.js
Greeting.vue
  ✓ renders a greeting (27ms)

console.log tests/unit/Greeting.spec.js:7
  <div>
    Vue and TDD
  </div>
```

Chúng ta có thể thấy các markup là chính xác, và thử nghiệm chạy thành công. Test case sẽ pass vì không có sai sót, nhưng có 1 vấn đề khi chúng ta thay đổi `Greeting.vue` và xóa `greeting` từ template, test của chúng ta vẫn pass, dưới đây sẽ giải thích cho nó.

## Tạo Assert

Chúng ta cần đưa ra một khẳng định để đảm bảo component hoạt động chính xác. Bằng cách sử dụng `expect` API của Jest, nó sẽ trông như thế này: `expect(result).to [matcher] (actual)`.

_expect_ là một phương thức để so sánh các giá trị và đối tượng. Ví dụ:

```js
expect(1).toBe(1)
```

Một danh sách đầy đủ các matchers có sẵn trong tài liêu của Jest [Jest documentation](http://jestjs.io/docs/en/expect). `vue-test-utils` không bao gồm bất kỳ công cụ so sách nào vì những gì Jest mang lại là quá đủ để dùng. Chúng ta muốn so sánh văn bản từ `Greeting` nên ta có thể viết như sau:

```js
expect(wrapper.html().includes("Vue and TDD")).toBe(true)
```

nhưng `vue-test-utils` có một cách tốt hơn để đánh dấu - `wrapper.text`:

```js
import { mount } from '@vue/test-utils'
import Greeting from '@/components/Greeting.vue'

describe('Greeting.vue', () => {
  it('renders a greeting', () => {
    const wrapper = mount(Greeting)

    expect(wrapper.text()).toMatch("Vue and TDD")
  })
})
```

Chúng ta không cần `console.log`, vì vậy bạn có thể xóa chúng. Chạy test với `yarn unit:test`, bạn sẽ nhận được:

```js
PASS  tests/unit/Greeting.spec.js
Greeting.vue
  ✓ renders a greeting (15ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.477s, estimated 2s
```

Trong TDD truyền thống, bạn sẽ viết các test trước khi thực hiện trong thực tế, hãy thấy nó chạy fail, sau đó sử dụng các lỗi không thành công để sửa tiếp các đoạn code của chúng ta. Hãy chắc chắn rằng bài, test chúng ta thực hiện hiệu quả đúng theo phong cách TDD. Dưới đây là cập nhật `Greeting.vue`:

```html
<template>
  <div>
    {{ greeting }}
  </div>
</template>

<script>
export default {
  name: "Greeting",

  data() {
    return {
      greeting: "Vue without TDD"
    }
  }
}
</script>
```

Và bây giờ chạy test với `yarn test:unit`:

```js
FAIL  tests/unit/Greeting.spec.js
Greeting.vue
  ✕ renders a greeting (24ms)

● Greeting.vue › renders a greeting

  expect(received).toMatch(expected)

  Expected value to match:
    "Vue and TDD"
  Received:
    "Vue without TDD"

     6 |     const wrapper = mount(Greeting)
     7 |
  >  8 |     expect(wrapper.text()).toMatch("Vue and TDD")
       |                            ^
     9 |   })
    10 | })
    11 |

    at Object.<anonymous> (tests/unit/Greeting.spec.js:8:28)
```

Jest cho chúng ta kết quả cũng như có thể thấy các kết quả mong đợi và thực tế, cũng như thất bại. Sửa lại `Greeting.vue` và đảm bảo test được pass một lần nữa.

## Kết luận
Tiếp theo chúng ta sẽ xem xet hai phương thức `vue-test-utils` cung cấp để render các components: `mount` và `shallowMount`.

## Reference
Dịch từ: https://lmiller1990.github.io/vue-testing-handbook/setting-up-for-tdd.html