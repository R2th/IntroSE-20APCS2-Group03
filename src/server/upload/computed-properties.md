## Kiểm thử trong Computed

Bạn có thể tìm thấy file test được mô tả ở trên [trang này](https://github.com/lmiller1990/vue-testing-handbook/tree/master/demo-app/tests/unit/NumberRenderer.spec.js).

Việc kiểm tra tính chất của computed được tính toán đơn giản, vì chúng chỉ là các hàm JavaScript thông thường.

Chúng ta có thể xem xét kiểm tra bằng hai cách khác nhau tính chất của `computed`. Một component `<NumberRenderer>`, nó biểu hiện các số lẻ hoặc chẵn, dựa trên một thuộc tính `numbers` computed.

## Viết các Test

Component `<NumberRenderer>` sẽ nhận được môt prop là `even`, thuộc kiểu boolean. Nếu `even` là `true`, component sẽ hiển thị 2, 4, 6 và 8. Nếu `false`, nó sẽ hiển thị 1, 3, 5, 7 và 9. Danh sách các giá trị sẽ được tính toán trong một thuộc tính `computed` được gọi là `numbers`.

## Kiểm tra giá trị được render

File kiểm tra của chúng ta:

```js
import { shallowMount } from "@vue/test-utils"
import NumberRenderer from "@/components/NumberRenderer.vue"

describe("NumberRenderer", () => {
  it("renders even numbers", () => {
    const wrapper = shallowMount(NumberRenderer, {
      propsData: {
        even: true
      }
    })

    expect(wrapper.text()).toBe("2, 4, 6, 8")
  })
})
```

Trước khi chạy thử Test, chúng ta sẽ tạo thêm `<NumberRenderer>`:

```js
<template>
  <div>
  </div>
</template>

<script>
export default {
  name: "NumberRenderer",

  props: {
    even: {
      type: Boolean,
      required: true
    }
  }
}
</script>
```

Bây giờ sẽ chạy triển khai test và để các thông báo lỗi sẽ hướng dẫn cho chúng ta. Hãy gõ `yarn test:unit` trên terminal:

```
● NumberRenderer › renders even numbers

  expect(received).toBe(expected) // Object.is equality

  Expected: "2, 4, 6, 8"
  Received: ""
```

Việc thực hiện code trên component và làm sao để test case chạy thành công. Hãy bắt đầu bằng việc computed `numbers`:

```js
computed: {
  numbers() {
    const evens = []

    for (let i = 1; i < 10; i++) {
      if (i % 2 === 0) {
        evens.push(i)
      }
    }

    return evens
  }
}
```

Và cập nhật template để sử dụng thuộc tính mới:

```html
<template>
  <div>
    {{ numbers }}
  </div>
</template>
```

`yarn test:unit` bây giờ cho kết quả:

```
FAIL  tests/unit/NumberRenderer.spec.js
● NumberRenderer › renders even numbers

  expect(received).toBe(expected) // Object.is equality

  Expected: "2, 4, 6, 8"
  Received: "[
    2,
    4,
    6,
    8
  ]"
```

Con số thì đúng, nhưng chúng ta muốn hiển thị danh sách được định dạng khác. Hãy cập nhật giá trị trả về `return`:

```js
return evens.join(", ")
```

Bây giờ `yarn test:unit` được pass! 

## Kiểm thử với `call` 

Bây giờ chúng ta sẽ thêm một test case cho trường hợp `even: fasle`. Một cách khác để kiểm tra một thuộc tính được tính toán mà không thực sự hiển thị component.

Đầu tiên:

```js
it("renders odd numbers", () => {
  const localThis = { even: false }

  expect(NumberRenderer.computed.numbers.call(localThis)).toBe("1, 3, 5, 7, 9")
})
```

Thay vì render component và đưa ra xác nhận rằng `wrapper.text()`, chúng ta sẽ sử dụng `call` để cung cấp `this` context thay thế `numbers`. Chúng ta sẽ xem xét điều gì sẽ xảy ra nếu chúng ta không sử dụng `call` sau khi kiểm tra test để pass.

Chạy kiểm thử hiện tại:

```
FAIL  tests/unit/NumberRenderer.spec.js
● NumberRenderer › renders odd numbers

  expect(received).toBe(expected) // Object.is equality

  Expected: "1, 3, 5, 7, 9"
  Received: "2, 4, 6, 8"
```

Cập nhật `numbers`:


```js
numbers() {
  const evens = []
  const odds = []

  for (let i = 1; i < 10; i++) {
    if (i % 2 === 0) {
      evens.push(i)
    } else {
      odds.push(i)
    }
  }

  return this.even === true ? evens.join(", ") : odds.join(", ")
}
```

Bây giờ cả hai đều pass! Nhưng nếu chúng ta không sử dụng `call` trong thử nghiệm thứ hai thì sao? Hãy cập nhật lại và kiểm tra điều đó:

```js
it("renders odd numbers", () => {
  const localThis = { even: false }

  expect(NumberRenderer.computed.numbers()).toBe("1, 3, 5, 7, 9")
})
```

Bây giờ test sẽ fail:

```
FAIL  tests/unit/NumberRenderer.spec.js
● NumberRenderer › renders odd numbers

  expect(received).toBe(expected) // Object.is equality

  Expected: "1, 3, 5, 7, 9"
  Received: "2, 4, 6, 8"
```

`vue` tự động liên kết `props` với `this`. Tuy nhiên chúng ta không render component với `mount`, vì vậy Vue không ràng buộc bất cứ điều gì trong `this`. Nếu bạn sử dụng `console.log(this)`, bạn có thể thấy context chỉ đơn giản là đối tượng `computed`:

```
{ numbers: [Function: numbers] }
```

Vì vậy chúng ta cần sử dụng `call`, cho phép chúng ta liên kết một đối tượng `this` thay thế, trong trường hợp của chúng ta, một đối tượng có thuộc tính có tên là `even`.

## Sử dụng `call` hay sử dụng `shallowMount`?

Cả hai kĩ thuật này đều hữu dụng  để kiểm tra các thuộc tính computed. Call có thể hữu ích khi:

- Bạn đang kiểm tra một component thực hiện một số thao tác tốn thời gian trong lifecycle mà bạn muốn tránh thực hiện trong kiểm thử đơn vị computed của mình.
- Bạn muốn bỏ đi một số giá trên `this`. Sử dụng `call` và pass trong một context tùy chỉnh cụ thể.

Tất nhiên, bạn cũng muốn đảm bảo các giá trị được hiển thị chính xác, vì vậy hãy chọn đúng kỹ thuật khi kiểm tra các thuộc tính computed của mình và kiểm tra tất cả trường hợp khi cần thiết.

## Kết luận

- Thuộc tính computed có thể được sử dụng `shallowMount` để thực hiện các xác nhận trên markup
- Với tính chất phức tạp trong thuộc tính của computed có thể kiểm tra độc lập bằng cách sử dụng `call`

## Reference
Dịch từ: https://lmiller1990.github.io/vue-testing-handbook/computed-properties.html