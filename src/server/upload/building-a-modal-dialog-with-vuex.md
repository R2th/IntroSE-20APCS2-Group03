# `Building a Modal Dialog with Vuex`

Trong các dự án, một tình huống rất phổ biến là ta sẽ phải xây dựng các thông báo, các dialog confirm YES?NO cho các thao tác quan trong của user. Vì vậy xây dựng dialog này là điều rất thường ngày và hay gặp. 


![](https://images.viblo.asia/31185589-a64c-4a88-b42c-24201ac44ad6.png)

### Problem
Nếu tiếp cận theo mô hình MPA truyền thống, mỗi một trang có một modal riêng hay mỗi một message có một dialog riêng của mình sẽ là điều không tốt, rất ảnh hưởng đến performance của dự án.
```js
<button onclick="openModalA">Open modal A</button>
<button onclick="openModalB">Open modal B</button>
...
<div id="modalA">
   ...content
</div>
<div id="modalB">
   ...content
</div>
```

### Solution

Cách tiếp cận đơn giản và dễ dàng nhất là tạo duy nhất một modal ở global, dùng store hay eventbus để gọi và thay đổi cập nhật nội dung content của chúng. Tại bài trước, mình đã giới thiệu về EventBus rồi nên bài này mình sẽ tập trung vào hướng dùng Vuex để xử lý.
Trong store này thì modal sẽ cần có những property và method của một modal.
```js
const mutations = {
  showModal(state, payload) {
    state.modalVisible = true
    state.dialogContent = payload
  },
  hideModal(state) {
    state.modalVisible = false
  },
}

const state = {
  modalVisible: false,
  dialogContent: {},
}
```
Xây dựng modal global
```html
<div class="modal">
  <div class="modal__title">{{ title }}</div>
  <div class="modal__body">{{ message }}</div>
  <div class="modal__footer">
      <button>Cancel</button>
      <button>OK</button>
  </div>
</div>
```

Tại các page tướng ứng, mình sẽ gọi đến các mutation này trên store
```js
<template>
  <div class="c-pageHome">
    <button class="c-pageHome__login" @click="openModal">Login</button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'PageHome',
  methods: {
    ...mapMutations(['showModal']),
    openModal() {
        const config = {
            title: 'foo',
            message: 'bar',
        }
        this.showModal(config)
    },
  },
}
</script>
```
Như vậy ở bất kỳ page nào ta cũng có thể gọi được modal này. Thông qua hàm `showModal` và các config, modal sẽ nhận giá trị ấy và hiển thị tương ứng. Thông qua Vuex, ta đã có thể ẩn hiện modal khắp mọi các component.
Nhưng với các trường hợp component có cấu trúc và nội dung khác hoàn nhau thì sao? Ta có thể set dựa theo nameComponent và dùng directive `component is` và dynamic component tương ứng.

### References
1. https://markus.oberlehner.net/blog/building-a-modal-dialog-with-vue-and-vuex/
2. https://vuejs.org/v2/examples/modal.html