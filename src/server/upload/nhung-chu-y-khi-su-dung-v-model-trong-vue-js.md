### Mở đầu
v-model là chức năng được sử dụng rất nhiều khi tạo form sử dụng Vue.js. Bạn có thể sử dụng v-model để tạo ra các ràng buộc dữ liệu hai chiều trên các ô input hoặc textarea hay thậm chí là file. Nó sẽ tự động chọn đúng cách để cập nhật các phần tử dựa trên kiểu nhập. Mặc dù khi sử dụng bạn sẽ thấy có đôi chút magic, nhưng v-model thực sự là một cú pháp không thể thiếu mỗi khi bạn muốn handle một form một cách thuận tiện và ngon lành 😄 Note: v-model sẽ bỏ qua các giá trị ban đầu, "checked" hoặc "selected" attribute được tìm thấy trên bất kì form elements nào. Nó sẽ luôn luôn xử lý các dữ liệu của Vue instance như là những dữ liệu luôn đúng. Bạn nên khai báo giá trị ban đầu ở phía Javascript bên trong các component.

### Hoạt động của v-model
v-model là một syntax sugar (cú pháp ngọt - dễ nhìn) để viết v-on và v-bind với nhau trong một dòng. Tổng quan, hai dòng sau thực hiện cùng một hoạt động:

```
<input v-model="searchText">
<input :value="searchText" @change="searchText = $event.target.value">
```
Thành phần tùy chỉnh của v-model
Trường hợp sử dụng v-model đối với thành phần tùy chỉnh, mặc định thì props được gọi là value và sự kiện của input được sử dụng. Value này có thể thay đổi được bằng định nghĩa ở phía thành phần tùy chỉnh.

Ví dụng sau được trích từ trang tài liệu tham khảo chính thức:

```
Vue.component('my-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    // Tùy theo điều này,  cho phép sử dụng thuộc tính `value` với mục đích riêng biệt.
    value: String,
    // `checked` sẽ được sử dụng như thuộc tính thay thế `value`
    checked: {
      type: Number,
      default: 0
    }
  },
  // ...
})
```
### Những lỗi thường gặp
Viêt cả v-model và @change
V-model như đã nói ở trên là Event handling (xử lý sự kiện). Nên việc kết hợp viết hai lần sử dụng v-model và @change là không cần thiết, và làm cho code trở nên Not Syntax Suger. Ví dụ như đoạn mã ở dưới.

// Đoạn code lỗi
```
<input v-model="searchText" @change="(value) => searchText = value">
```
Do bản thân v-model đã có sẵn Event handling (xử lý sự kiện) của sự kiện @change, nên sự kiện đối với change bị lặp lại hai lần. Nếu trường hợp muốn xử lý nhiều sự kiện hơn một sự kiện change, chúng ta nên dùng việc sử dụng v-model và thay thế vào đó là sử dụng đồng thời v-bind và v-on hoặc sử dụng thuộc tính thay thế searchText.

// Đoạn code chuẩn Syntax Suger
```
<input v-model="searchText">
<script>
data(){
  return {
    innerSearchText: ''
  }
},
computed: {
  searchText: {
    get () {
      return this.innerSearchText
    },
    set (value) {
      this.innerSearchText = value
    }
  }
}
</script>
```
// Đoạn code chuẩn Syntax Suger
```
<input :value="searchText" @change="onChange">
<script>
data(){
  return {
    searchText: ''
  }
}
</script>
```
Sự kết hợp giữa v-model và set tạo động lực phát triển cho trường hợp kết hợp với Vuex với nhiều nội dung khác.

Truyền nguyên props cho v-model
Đối với biến v-model, trường hợp muốn làm cầu nói với props thì mình thấy rất nhiều. Nhưng nếu sử dụng điều này, lỗi cảnh báo sẽ được hiển thị vì props bị thay đổi trực tiếp.

<!-- Đoạn mã lỗi -->
```
<input v-model="searchText"> # Cảnh báo sẽ được hiển thị vì v-model thực thi searchText = $event.taget.value
<script>
  props: {
    searchText: String
  }
</script>
```
Ngoài ra, để sử lỗi này, việc định nghĩa data từ giá trị của props sẽ tạo ra lỗi tương tự. Ví dụ như đoạn code ở dưới:

<!-- Đoạn mã lỗi -->
```
<input v-model="searchTextData"> 
<script>
  props: {
    searchText: String
  },
  data() {
    return {
      searchTextData: this.$props.searchText 
    }
  }
</script>
```
Đoạn mã này nhìn thì thấy có vẻ như hoạt động đúng. Nhưng trên thực tế, sau khi giá trị của props được khởi tạo thì giá trị giữa props và data sẽ không được đồng bộ. Cho nên, dù đã sử thành đoạn mã mới, nhưng việc sửa chữa vẫn không được thực thi đúng.

Vậy thì làm thế nào để có thể tránh nó? Bằng cách sử dụng các thuộc tính được tính toán thì có thể khắc phục được..

<!-- Đoạn code chuẩn Syntax Suger -->
```
<input v-model="innerSearchText">
<script>
  props: {
    searchText: String
  },
  computed: {
    innerSearchText: {
      get () {
        return this.$props.searchText
      },
      set (value) {
        this.$emit('change', value)
      }
    }
  }
</script>
```
### Tổng quan
Đó là, thay vì gán một giá trị trong thành phần này, nó sẽ gửi một giá trị dưới dạng một sự kiện cho thành phần cha. Và bằng cách viết lại giá trị của props ở phía thành phần cha, thành phần này có thể được sử dụng một cách chính xác. Ngoài ra còn có một phương pháp sử dụng watch thay vì setter, nhưng tôi không khuyến nghị cá nhân vì luồng dữ liệu rất khó nhìn thấy.