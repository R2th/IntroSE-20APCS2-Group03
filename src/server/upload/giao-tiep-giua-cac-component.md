#  Lời Nói Đầu
Xin chào các bác, em đã trở lại rồi đây 😃). Hôm nay em tiếp tục chia sẻ một bài viết vềVueJS các bác nhé, trong bài trước em đã chia sẻ về  [VueJS life cycle Hook](https://viblo.asia/p/vuejs-life-cycle-hooks-OeVKBRXYKkW#comment-MnKMxPpaQ57) nếu bác nào chưa xem qua thì click vào link để xem nhé,còn Trong bài viết lần này thì em xin viết về  Vue.js Component Communication Patterns trong VueJS hay còn gọi là giao tiếp giữa các components trong VueJS.Chắc các bác cũng biết Component là một trong các tính năng mạnh mẽ nhất của Vue.js. Nó giúp cho chúng ta gom nhóm các mã HTML lại để tái sử dụng cho các module tương tự. Ở một mức độ cao thì component là một thành phần được Vue.js biên dịch để xử lý các hành vi. Và trong một vài trường hợp thì nó cũng có thể xuất hiện như một phần tử HTML với các attribute đặc biệt. Tuy nhiên hôm nay em chỉ đi sâu vào tìm hiểu một tính năng khá là quan trọng của component đó là giao tiếp giữa các component.Bây giờ thì cùng bắt đầu các bác nhé.
<br>
Có vài phương pháp có thể dùng để giao tiếp giữa các Component. `Props` và `Events` thường được dùng cho hầu hết các trường hợp.Nhưng cũng có các phương pháp khác để các bác có thể sử dụng.
<br>
## Props and Events
Tất nhiên, phương pháp thông dụng nhất được sử dụng để giao tiếp giữa các Components là bao `Props` và `Events`. Mẫu phổ biến này cung cấp một cách giao tiếp mạnh mẽ giữa các Component mà không đưa ra bât kỳ sự phụ thuộc hoặc hạn chế nào về các thành phần có liên quan.
### Props
Props cho phép ta chuyền bất kỳ loại dữ liệu nào cho component con và cho phép bạn kiểm soát kiểu dữ liệu mà thành phân con nhận được. các updated Props cũng được reactive để cho phép các component con có thể cập nhật mọi thay đổi từ component cha.
ví dụ:
```
<my-component v-bind:prop1="parentValue"></my-component>
<!-- Or more succinctly, -->
<my-component :prop1="parentValue"></my-component>
```
<br>
## Events
Event cung cấp một cách để thông báo tới Component cha những sự thay đổi của Component con.
```
<my-component v-on:myEvent="parentHandler"></my-component>
<!-- Or more succinctly, -->
<my-component @myEvent="parentHandler"></my-component>
```
<br>
kích hoạt sự kiện

```
...
export default {
  methods: {
    fireEvent() {
      this.$emit('myEvent', eventValueOne, eventValueTwo);
    }
  }
}
```
hơn nữa thì chúng ta có thể tạo global event để truyền sự kiện tới bất cứ nơi nào trong app của mình.
## Combined
dùng `V-Model` để cho phép kết hợp `Props` với  `Event`  cho two-way binding. Cái này thường được dùng cho đầu vào của component. `V-Model` lấy giá trị của `Props` để chuyền vào `Event`. Tuy nhiên có có thể tùy chỉnh được.
<br>
ví dụ:
```
<my-component v-model="prop1"></my-component>
```
một V-Model phù hợp với Component:
```
<template>
  <div>
    <input type="text" :value="value" @input="triggerEvent"/>
  </div>
</template>

<script>
  export default {
    props: {
      value: String
    },

    methods: {
      triggerEvent(event) {
        this.$emit('input', event.target.value);
      }
    }
  }
</script>
```

# Provide and inject
có một sự bổ sung mới mẻ cho Vue là cơ chế cung cấp và truyền (Provide/Inject). Nó cho phép hiển thị có chọn lọc dữ liệu hoặc một phương thức từ thành phần "tổ tiên" cho tất "con cháu"của nó.Trong khi Provide/Inject bản thân nó không động, nó có thể được dùng để chuyền đối tượng động.
<br>
Provide và Inject không phải là một ý tưởng tốt để phát triển một ứng dụng. Nhưng nó có thể trẻ nên thuận tiện khi viết toàn bộ `custom-rendered component libraries`.
<br>
Component tổ tiên:
```
const SomethingAllDescendantsNeed = 'Air, probably.';

export default {
  provide: {
    SomethingAllDescendantsNeed
  }
}
```
component con cháu:
```
<ancestor-component>
  <div>
    <descendant-component>
      <p>
        <descendant-component></descendant-component>
      </p>
    </descendant-component>
  </div>
</ancestor-component>
```
Template:
```
<ancestor-component>
  <div>
    <descendant-component>
      <p>
        <descendant-component></descendant-component>
      </p>
    </descendant-component>
  </div>
</ancestor-component>
```
(Tất cả các thành phần con cháu dù có năm sâu bên trong component tree thì vẫn có thể truy cập vào SomethingAllDescendantsNeed)
sử dụng: được sử dụng khi các component con cần truy cập vào đối tượng nào đó mà chỉ được khởi tạo trong mỗi component tree.
# Kết Luận
Vừa rồi thì em đã chưa sẻ một chút kiến thức mà em đã tìm hiểu được về giao tiếp giữa các component. Cảm ơn các bác đã theo dõi bài chia sẻ. Hi vọng qua bài viết này thì các bác cũng phần nào đó hiểu được sự giao tiếp giữa các component trong VueJS là như thế nào, và em cũng rất hi vọng nhận được ý kiến đóng góp từ các bác để có thể cải thiện chất lượng bài cho những lần tới. Trân trọng!
# Tài liệu tham khảo
https://alligator.io/vuejs/component-communication/