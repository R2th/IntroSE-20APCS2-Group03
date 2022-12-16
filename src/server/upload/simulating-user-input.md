## Kích hoạt Event

Một trong những điều phổ biến nhất mà các component của Vue sẽ làm là lắng nghe các giá trị đầu vào từ người dùng. `vue-test-utils` và Jest giúp chúng dễ dàng để kiểm tra đầu vào. Chúng ta hãy xem xét cách sử dụng `trigger` và Jest mocks để xác minh các thành phần của component đang hoạt đông chính xác.

Mã nguồn cho bài kiểm tra được mô tả trên trang này có thể được tìm thấy [ở đây](https://github.com/lmiller1990/vue-testing-handbook/tree/master/demo-app/tests/unit/FormSubmitter.spec.js).

## Tạo component

Chúng ta sẽ tạo một component đơn giản `<FormSubmitter>`, chúng có chứa một `<input>` và một `<button>`. Khi button được clicked, một thứ gì đó sẽ xảy ra. Ví dụ đầu tiên sẽ chỉ hiển thị một thông báo thành công, sau đó chúng ta sẽ chuyển sang một ví dụ thú vị hơn như gửi biểu mẫu đến một external endpoint.

Tạo một `<FormSubmitter>` và nhập mẫu template:

```html
<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input v-model="username" data-username>
      <input type="submit">
    </form>

    <div 
      class="message" 
      v-if="submitted"
    >
      Thank you for your submission, {{ username }}.
    </div>
  </div>
</template>
```

Khi người dùng submit form, chúng ta sẽ nhận được một thông báo cảm ơn họ đã submit. Chúng ta muốn submit form không đồng bộ, vì vậy chúng ta đang sử dụng cơ chế `@submit.prevent` để ngăn chặn action mặc định, đó là refresh trang khi form được submit.

Bây giờ thêm logic submit form:

```html
<script>
  export default {
    name: "FormSubmitter",

    data() {
      return {
        username: '',
        submitted: false
      }
    },

    methods: {
      handleSubmit() {
        this.submitted = true
      }
    }
  }
</script>
```

Khá là đơn giản, chúng ta chỉ thiết lập `submitted` là `true` khi form được submit, từ đó hiển thị thông báo thành công trong thẻ `<div>`.

## Viết test

File test như sau:

```js
import { shallowMount } from "@vue/test-utils"
import FormSubmitter from "@/components/FormSubmitter.vue"

describe("FormSubmitter", () => {
  it("reveals a notification when submitted", () => {
    const wrapper = shallowMount(FormSubmitter)

    wrapper.find("[data-username]").setValue("alice")
    wrapper.find("form").trigger("submit.prevent")

    expect(wrapper.find(".message").text())
      .toBe("Thank you for your submission, alice.")
  })
})
```

Chúng ta sử dụng component `shallowMount`, đặt tên người dùng sử dụng phương thức `trigger` và `vue-test-utils` cung cấp mô phỏng đầu vào của người dùng. `trigger` hoạt động trên các sự kiện tùy chỉnh, cũng như các sự kiện sử dụng công cụ sửa đổi, như `submit.prevent`, `keydown.enter` ...

Kiểm thử này cũng tuân theo 3 bước của kiểm thử đơn vị:

1. sắp xếp (thiết lập kiểm tra. Trong trường hợp của chúng ta, chúng ta render component)
2. hành động (thực hiện các action trên hệ thống)
3. assert (đảm bảo kết quả thực tế phù hợp với mong đợi của bạn))

Chúng ta tách từng bước với một dòng mới vì nó làm cho các bài test dễ đọc hơn.

Chạy test với `yarn test:unit`. Tất nhiên nó sẽ pass.

Trigger rất đơn giản - sử dụng `find` để lấy phần tử mong muốn mô phỏng một số đầu vào và gọi `trigger` với tên của event và bất kỳ công cụ sửa đổi nào.

## Ví dụ thực tế

Form thường được submit đến một số endpoint nào đó. Hãy xem các chúng ta có thể kiểm tra component này với cách triển khai khác `handleSubmit`. Một thực tế phổ biến là alias của thư viện HTTP là `Vue.prototype.$http`. Điều này cho phép chúng ta thực hiện một request Ajax bằng cách gọi đơn giản như `this.$http.get(...)`. Tìm hiểu thêm [ở đây](https://vuejs.org/v2/cookbook/adding-instance-properties.html).

Thông thường thư viện HTTP là axios, một HTTP client phổ biến hiện tại. Trong trường hợp này, chúng ta sử dụng `handSubmit` có thể sẽ như thế này:

```js
handleSubmitAsync() {
  return this.$http.get("/api/v1/register", { username: this.username })
    .then(() => {
      // show success message, etc
    })
    .catch(() => {
      // handle error
    })
}
```

Trong trường hợp này, một kỹ thuật _mock_ `this.$http` sẽ tạo môt trường thử nghiệm mong muốn. Bạn có thể đọc về `mocks` được mô tả thêm [ở đây]](https://vue-test-utils.vuejs.org/api/options.html#mocks). Chúng ta hãy mock một phương thức `http.get` như sau:

```js
let url = ''
let data = ''

const mockHttp = {
  get: (_url, _data) => {
    return new Promise((resolve, reject) => {
      url = _url
      data = _data
      resolve()
    })
  }
}
```

Có một vài điều thú vị được diễn ra ở đây:

- Chúng ta tạo một biến `url` và `data` để lưu `url` và `data` chuyển đến `$http.get`. Điều này sẽ hữu ích để xác minh request đang đi đến đúng endpoint với payload chính xác.
- Sau khi gán đối số `url` và `data`, chúng ta resolve Promise. để mô phỏng phản hôi API thành công.

Trước khi xem file test, đây là hàm `handleSubmitAsync` mới:

```js
methods: {
  handleSubmitAsync() {
    return this.$http.get("/api/v1/register", { username: this.username })
      .then(() => {
        this.submitted = true
      })
      .catch((e) => {
        throw Error("Something went wrong", e)
      })
  }
}
```

Ngoài ra, chúng ta cũng cập nhật `<template>` để sử dụng hàm `handleSubmitAsync` mới:

```html
<template>
  <div>
    <form @submit.prevent="handleSubmitAsync">
      <input v-model="username" data-username>
      <input type="submit">
    </form>

  <!-- ... -->
  </div>
</template>
```

Bây giờ, chúng ta chỉ còn test.

## Mocking một ajax call

Đầu tiên, include việc mock `this.$http` ở trên cùng, trước block `describe`:

```js
let url = ''
let data = ''

const mockHttp = {
  get: (_url, _data) => {
    return new Promise((resolve, reject) => {
      url = _url
      data = _data
      resolve()
    })
  }
}
```

Bây giờ, thêm trường hợp test, sử dụng `$http` với `mocks` như sau:

```js
it("reveals a notification when submitted", () => {
  const wrapper = shallowMount(FormSubmitter, {
    mocks: {
      $http: mockHttp
    }
  })

  wrapper.find("[data-username]").setValue("alice")
  wrapper.find("form").trigger("submit.prevent")

  expect(wrapper.find(".message").text())
    .toBe("Thank you for your submission, alice.")
})
```

Thay vì sử dụng bất kì thư viện http được sử dụng `Vue.prototype.$http`, việc triên khai mock sẽ được sử dụng thay thế. Điều này chúng ta có thể kiểm soát môi trường của test và nhận kết quả phù hợp.

Chạy `yarn test:unit` sẽ cho ra kết quả test fail:

```sh
FAIL  tests/unit/FormSubmitter.spec.js
  ● FormSubmitter › reveals a notification when submitted

    [vue-test-utils]: find did not return .message, cannot call text() on empty Wrapper
```

Có một vấn đề nhỏ ở đây là test của chúng ta chạy xong trước cả khi _before_ promise trả về  resolve `mockHttp`. Chúng ta có thể giải quyết bằng cách sử dụng `async` như thế này:

```js
it("reveals a notification when submitted", async () => {
  // ...
})
```

Tuy nhiên, test của chúng ta vẫn kết thúc trước khi promise resolve. Một cách để giải quyết vấn đề này là sử dựng các [flush-promises](https://www.npmjs.com/package/flush-promises), một mô-đun Node.js đơn giản sẽ giải quyết ngay lập tức tất cả các pending promise. Cài đặt `yarn add flush-promises`, cập nhật lại thay đổi test như sau:

```js
import flushPromises from "flush-promises"
// ...

it("reveals a notification when submitted", async () => {
  const wrapper = shallowMount(FormSubmitter, {
    mocks: {
      $http: mockHttp
    }
  })

  wrapper.find("[data-username]").setValue("alice")
  wrapper.find("form").trigger("submit.prevent")

  await flushPromises()

  expect(wrapper.find(".message").text())
    .toBe("Thank you for your submission, alice.")
})
```

Bây giờ test đã pass. Mã nguồn của `flush-promises` khoảng 10 dòng code, nếu bạn quan tâm đến Node.js thì đáng để đọc và hiểu cách thức hoạt động của nó.

Chúng ta cũng nên đảm bảo điểm cuối của payload là chính xác. Thêm 2 assert vào file test của chúng ta:

```js
// ...
expect(url).toBe("/api/v1/register")
expect(data).toEqual({ username: "alice" })
```

Test của chúng ta vẫn pass.

## Kết luận

Trong phần này, chúng ta đã thấy làm thế nào để:

- sử dụng `trigger` cho các event, ngay cả những sự kiện sử dụng công cụ sửa đổi như `prevent`
- sử dụng `setValue` để đặt giá trị của việc `<input>` sử dụng `v-model`
- viết các test bằng 3 bước kiểm thử đơn vị
- mock một method gắn liền với `Vue.protopyte` cùng với sử dụng `mocks` để gắn kết chúng
- làm thế naò để sử dụng `flush-promises` để giải quyết vấn đề resolve tất cả các promise, một kỹ thuật hữu ích trong kiểm thử đơn vị

Mã nguồn cho source code được mô tả [ở đây](https://github.com/lmiller1990/vue-testing-handbook/tree/master/demo-app/tests/unit/FormSubmitter.spec.js).