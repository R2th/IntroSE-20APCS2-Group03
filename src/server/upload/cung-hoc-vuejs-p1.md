# I )  VueJS là gì ?
Vue.js là  một  trong các framework JavaScript ,nó rất linh động và được dùng phổ biến để xây dựng  các giao diện người dùng , không giống với các monolithic frameworks khác, `Vue` được thiết kế  để xây dựng theo từng bước  .Thư viện lỏi (core libary) của nó  chỉ tập trung vào xây dựng phần view và nó dể dàng tích hợp với các thư viện khác hoặc project có sãn. Mặt khác  `Vue` hoàn toàn đủ khả năng cung cấp các chức năng để sây dựng một trang wep SPA(Single-Page Applications).

# II) Mở đầu 
Để có thể sử dụng `Vue` một cách dể dàng chúng ta chỉ cần tạo một file html và gián thẻ scrip như sau để sử dụng.
```html 
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
```

Hoặc bạn có thể [vue-cli](https://cli.vuejs.org/) để sự dụng. Nhưng chúng ta đang mới bắt đâu với `Vue` nên mình nghĩ dung CDN cho nó dể.

Cốt lõi của Vue.js là một hệ thống cho phép chúng ta khai báo và render data sử dụng syntax sau

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>
    <div id="app">
        <span v-bind:title="toDay">{{ message }}</span>
    </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
<script>
    const app = new Vue({
        el: '#app',
        data: {
            message: 'Hello word !!',
            toDay:new Date().toLocaleString()
        }
    })
</script>
</html>
```
Kết quả
![](https://images.viblo.asia/b7e7df9c-7af1-4361-aa1e-ca0db9a4ccb1.png)

Chúng ta đã tạo ra một ví dụ đơn gian về `Vue`. Trong nó có vẻ chỉ là render ra một tamplate string nhưng thực tế thì `Vue` đã làm rất nhiều thứ bên dưới. Bây giờ Data và DOM của chúng ta đã kết nối với nhau, và  mọi thứ bây giờ đều phản ứng với nhau. Để kiểm chứng, hãy mở console của trình duyệt và gán cho app.message một giá trị khác, ví dụ `app.message = 'Chào bạn !!'`. Bạn sẽ thấy message  thay đổi tương ứng.

Ở đây chúng ta có một cái mới đó là `v-bind` được gọi là `directive`. Một `directive` trong Vue được bắt đầu với `v-` để chỉ định rõ rằng đây là một thuộc tính riêng do `Vue` cung cấp, đồng thời thuộc tính này sẽ áp dụng một hành vi (behavior) đặc biệt lên kết quả DOM được render ra. Trong ví dụ này, directive `v-bind `về cơ bản là đang giữ thuộc tính `title` của phần tử web luôn luôn đồng nhất với property `toDay` của đối tượng Vue được khởi tạo.

# III) Vue Instance
Mọi ứng dụng `Vue` luông bắt đầu bằng việc khởi tạo đối tượng `Vue` thông qua hàm `new Vue({})`
```js
var vm = new Vue({
  // các options khác
})
```

## 1)  Data và Methods
Khi một đối tượng `Vue` được tạo ra, nó sẻ add tất cả các properties được tìm thấy trong `data` vào hệ thông phản ứng của `Vue`(Vue’s reactivity system).Khi các giá trị của các properties thay đổi . Thì phần view của mình cũng tự động thay đổi để giống với dữ liệu mới.

```js
var data = { a: 1 }

// Object được add và Vue instance
var vm = new Vue({
  data: data
})

vm.a == data.a // => true

// thay đổi data của property a trong vue instance
// data gốc của ta cũng thay đổi theo
vm.a = 2
data.a // => 2

//Ngược lại cũng vậy. Khi thay đổi data thì data trong vue instance cũng thay đổi theo
data.a = 3
vm.a // => 3
```

khi data thay đổi thì phần view sẽ re-render lại , tuy nhiên chỉ đúng đối với các property đã được định nghĩa trước trong data. đối với các property được add vào sau khi vue được khởi tạo, những property này sẽ không được theo giỏi .
```js
vm.b = 'hi'
// b sẽ không được theo dỏi
//View sẽ không re-render lại
```
Ngoài data property , `Vue` cũng cung cấp một số instance properties và phương thức hữu ích. Chúng ta có một tiền tố là `$` để phân biệt  instance properties hay của người dùng đinh nghĩa.

```js
var data = { a: 1 }
var vm = new Vue({
  el: '#app2',
  data: data
})

vm.$data === data // => true
vm.$el === document.getElementById('app2') // => true

// $watch đây chính là Instance method
vm.$watch('a', function (newValue, oldValue) {
// Hàm này sẽ được gọi khi a thay đổi.

```
Ở đây bạn có thể thấy một instance properties là `el`. Được cung cấp cho Vue instance một phần tử DOM hiện có để gắn vào. Nó có thể là chuỗi `Css selector` hoặc là `HTMLElement`. 
## 2) Instance Lifecycle Hooks
Mỗi Vue instance  sẽ đi qua nhiều bước khởi tạo khi nó được tạo ra. Như cài đặt các dữ liệu cần theo dõi, biên dịch template,gán vào DOM và update lại cây DOM nếu data thay đỗi.Vue instance sẽ cung cấp một số phương thức và nó sẽ được chạy trong các tiến trình cố định, các phương thức này được gọi là `lifecycle hooks`.Các phương thức này cho phép chúng thêm các đoạn code của mình vào để tính toán trong mỗi tiến trình. 
Ví dụ :
```js
new Vue({
  data: {
    a: 1
  },
  beforeCreate:function () {
    // Được gọi đồng bộ ngay lập tức sau khi instance được khởi tạo 
    // và trước khi cài đặt các data được theo dỏi và init Events.
   
  },
  created: function () {
    // Được gọi đồng bộ sau khi instance đã đươc tạo ra. 
    // Tại tiến trình này các tùy chọn sau đã được thiết lập: quan sát dữ liệu, thuộc tính được tính toán, phương thức, và các watch/event callbacks.
    // Tuy nhiên ở giai đoạn nay vân chưa có liên kết đến cây DOM nên $el sẽ chưa có
  },
  beforeMount:function () {
    // Được gọi trước khi liên kết đến cây DOM
    // Hay có thể hiểu là trước khi hàm render được gọi lần đâu tiên
   
  },
  mounted:function () {
    // Được gọi khi tiến trình replace $el hoàn tất.
  },
  beforeUpdate:function () {
    //Được gọi khi data thay đỗi và trước khi visualDOM được re-render
  },
  updated:function () {
    //Được gọi khi data đã được thay đổi.
  },
  beforeDestroy:function () {
    //Được gọi ngay trước khi vue instance được destroy.
    //Có thể hiểu là trước khi component của chúng ta bị huỷ như chuyển từ component này sang component khác
  },
  destroyed:function () {
    //Được gọi khi vue instance đã được destroy.
  }
})
```
Các bạn có thểm tham khảo thêm tại [đây](https://vuejs.org/v2/api/#Options-Lifecycle-Hooks)
## 3) Lifecycle Diagram
![](https://images.viblo.asia/3251640b-7fb6-417d-9b7b-3b744e4dba68.png)


# IV) Lời kết
Phần 1 sẽ kết thúc tại đây , trong phần tiếp theo chúng ta sẽ tiếp tục học thêm nhiều thứ khác của `Vue`