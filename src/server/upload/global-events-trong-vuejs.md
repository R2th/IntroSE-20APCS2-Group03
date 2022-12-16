Bài viết này lấy một ví dụ về Modal trích từ khoá học Advanced Vue Component Design của Adam Wathan.Nếu bạn là một người thích học qua videos bạn có thể tham khảo khoá học này qua link sau https://adamwathan.me/advanced-vue-component-design/

### Chúng ta có 2 components sau:

****App.vue****
```vue
<template>
  <div id="app">
    <button @click="showModal = true">Show Modal</button>
    <Modal 
      :showModal="showModal"
      @closeModal="showModal = false"
    />
  </div>
</template>

<script>
import Modal from "./components/Modal";

export default {
  data () {
    return {
      showModal: false
    }
  },
  components: {
    Modal
  }
};
</script>
```
****Modal.vue****.
```vue
<template>
  <div class="modal-mask" v-show="showModal">
    <div class="modal-wrapper">
      <div class="main-modal">
        <div class="modal-content">
          modal content goes here!!!!
        </div>
        <button @click="close" class="btn btn-warning">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['showModal'],

  methods: {
    close () {
      this.$emit('closeModal')
    }
  }
};
</script>
```
- Khi user click vào `Show Modal` button, modal được show ra và click vào button `Close` thì modal ẩn đi.Chúng ta thêm một feature nữa là: Thay vì click vào button `Close`, user có thể nhấn vào `ESC` key và kết quả vẫn thế(modal ẩn đi).

- Suy nghĩ đầu tiên chúng ta thường gặp là thêm Vue keydown Event Handling và gọi method close cho chính modal đó
    ```vue
        <div class="main-modal" @keydown.esc="close">
    ```
- Chúng ta mở modal ra và nhấn ESC, không có gì thay đổi cả(modal vẫn chưa ẩn đi).Lý do ở đây là key event chỉ có thể ```captured``` bằng focusable element(input, button...), để div modal thành focusable chúng ta thêm tabindex cho nó.
    ```vue
        <div class="main-modal" @keydown.esc="close" tabindex="0">
    ```
- Lúc này khi modal mở ra, user click vào nó sẽ thấy viền màu xanh quanh modal đó(focused) và nhấn ESC key, modal sẽ được ẩn đi.Vấn đề ở đây là thao tác nhấn ESC key chỉ có thể ẩn modal khi user đã click vào modal(để focus).Chúng ta muốn khi modal mở ra, nhấn ESC thì modal ẩn ngay đi.
Trước hết chúng ta style cho modal để user không thấy màu viền khi focus.
   ```
        .main-modal:focus {
            outline: 0;
        }
   ```
- Và thực hiện để bất cứ khi nào modal mở ra, modal đó sẽ được focus bằng cách dùng watchers:
    ```vue
       watch: {
        showModal (showModal) {
          if (showModal) {
            this.$refs.modal.focus()
          }
        }
      }, 
    ```
- Chúng ta thêm ref cho modal
    ```
        <div class="main-modal" @keydown.esc="close" tabindex="0" ref="modal">
    ```
* Điều kỳ lạ ở đây là user nhấn `ESC` key, modal vẫn không ẩn đi.Chúng ta thử test lại bằng cách comment style cho `.main-modal:focus`.Khi này chúng ta thấy modal vẫn chỉ focus khi user click vào modal.Lý do ở đây là trong watch section, khi giá trị showModal thay đổi, Vue sẽ không update DOM ngay lập tức.Để đảm bảo dòng code `
this.$refs.modal.focus()` chạy ngay khi DOM updated chúng ta dùng `nextTick` ở đây.
    ```vue
        watch: {
            showModal (showModal) {
              if (showModal) {
                this.$nextTick(() => {
                  this.$refs.modal.focus()
                })
              }
            }
          },
    ```
- Đến đây user có thể nhấn ESC để ẩn đi modal ngay khi modal hiện ra.Để tạo 1 feature nhỏ, chúng ta đã thực hiện khá nhiều thao tác.Thử làm một cách khác xem(global event)
  + Đầu tiên chúng ta bỏ đi watcher và viết lifecycle method
    ```vue
        created() {
            document.addEventListener('keydown', event => {
              if (event.key === 'Escape' && this.showModal) {
                this.close()
              }
            })
          },
    ```
  - Bất cứ khi nào component được tạo ra, chúng ta add event ```keydown``` cho nó.Đến đây chúng ta có thể bỏ ref, tabindex, css @keydown.esc và chức năng vẫn được thực hiện.Cuối cùng đừng quên removeEventListener tránh memory leak.
    ```vue
        created() {
            const escapeHandler = event => {
              if (event.key === 'Escape' && this.showModal) {
                this.close()
              }
            }
            document.addEventListener('keydown', escapeHandler)
            this.$once('hook:destroyed', () => {
              document.removeEventListener('keydown', escapeHandler)
            })
      },
    ```
***Nhận xét***
    - Cách dùng `global event` trên hoàn toàn code theo Javascript. Ở đây chúng ta vẫn đảm bảo tính đóng gói của mỗi component. Component App không cần biết component con Modal thực hiện gì, nó chỉ thay đổi status của showModal(true hay false) và ngược lại component con(Modal) cũng không quan tâm gì đến component ngoài nó. Nó chỉ emit event closeModal.Mọi thứ đều được đảm bảo khi dùng global event ở đây.Vue, React... tất cả cũng chỉ là JS vậy nên đôi khi chúng ta không cần dùng những magic mà chúng có sẵn mà nhìn cái cội nguồn của nó, chính là JS.
Bài viết chỉ dựa vào cảm nhận cá nhân học qua ví dụ khoá học nên không thể tránh khỏi sai sót.
Cuối cùng bạn có thể xem code ở đây: https://codesandbox.io/s/48w20l1pp7