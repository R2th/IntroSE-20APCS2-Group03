Một trong những điều mình thích thú với VueJS đó chính là reactivity system (hệ thống tương tác hay phản ứng). Khi mà bạn thay đổi data, model, thì view sẽ ngay lập tức cập nhật những thay đổi đó lên view và ngược lại hay chúng ta thường gọi là two ways data binding. Điều đó làm cho việc quản lý trạng thái của dữ liệu là đơn giản và trực quan, nhưng nó cũng là một chủ đề quan trọng mà chúng ta cần nắm rõ để tránh những sai lầm khi làm việc với VueJS.

## Lợi hại khi vue activity system quá tốt
<hr>

Thông thường khi làm việc thì chúng ta sẽ không để ý tới getter/setters, ví dụ khi bạn tạo ra một data property thì Vue sẽ tự động thiết lập reactivity cho property đó một cách tự động hay việc tạo computed property, bind prop ... Điều này thật tuyệt vời bởi một số lý do sau:
- Giúp chúng ta tiết kiệm thời gian xử lý
- Giữ code ngắn gọn
- Chúng ta không cần phải biết hiểu rõ quá nhiều về việc reactivity nhưng việc chúng ta sử dụng nó vẫn có kết quả như ý muốn.
Vue giúp làm mọi thứ thật đơn giản, nhưng sự đơn giản đó lại có thể gây ra những rắc rối ngớ ngấn đối với chính chúng ta khi code. Đơn giản như khi hỏi bạn gái **hôm nay ăn gì? “Em ăn gì cũng được”**, quá đơn giản để xử lý tình huống đó đúng không nhưng thực ra không phải thế :#)
Mình thấy có khá nhiều câu hỏi trên những diễn đàn lập trình đại loại như kiểu rõ ràng biến được gán đã thay đổi, nhưng hiển thị ở view vẫn là giá trị cũ. Vì thế việc sử dụng sự đơn giản của reactivy system trong vue và nắm được những nguyên lý cơ bản mà vue khiến reactivity còn khiến chúng ta tiết kiệm được nhiều thời gian phát triển ứng dụng hơn nữa!

## Các thay đổi được theo dõi như thế nào
<hrr>

Khi bạn truyền vào một plain JavaScript object vào Vue instance giống như data option thì Vue sẽ duyệt qua toàn bộ property và định nghĩa thêm getter/setters cho mỗi property thông qua [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty), tính năng này chỉ có từ phiên bản ES5 vì thế mà Vue không hỗ trợ IE8 và những phiên bản cũ hơn.
Ví dụ một object trong Vue được khai báo
```
{
  id: 1,
  name: 'My Item',
  price: 9.99
}
```
Sau khi Vue instance được khởi tạo chúng ta có thể xem object này trên console và thấy Vue define thêm getter và setter trên nó
![getter/setter](https://images.viblo.asia/18b8aa06-9910-47c6-80e0-7a7c57795ad2.png)

Mỗi một component instance sẽ tương ứng với một **watcher** instance, watcher sẽ ghi lại thông tin của bất kỳ property nào được sử dụng và thay đổi trong suốt quá trình component render. Sau khi một setter được kích hoạt nó sẽ thông báo cho watcher chính là nguồn gốc của việc kích hoạt một hành động re-render. Hãy cùng nhìn hình ảnh dưới đây được sử dụng từ trang chủ của vuejs

![vue-render-cycle](https://vuejs.org/images/data.png)

## Cảnh báo phát hiện thay đổi
<hr>

Bởi vì sự giới hạn trong từng phiên bản JavaScript (Object.ovserve đã không còn được hỗ trợ) do đó Vue không thể nhận ra những thay đổi property khi chúng ta thêm hay xóa. Do đó một property để tự động reactive bạn cần phải được khi báo trong **data** object để Vue có thể thực hiện kích hoạt getter/setter trong suốt quá trình khởi tạo instance và khi property trở nên reactive.

Để dữ liệu là reactive bạn cần khai báo dữ liệu của mình với VueJS khi component được khởi tạo và trong lifecycle `beforeMount` được kích họat sau khi component được khởi tạo. Cùng xem ví dụ sau để thấy điều đó.

```
var vm = new Vue({
  data: {
    a: 1
  }
})
// `vm.a` bây giờ là reactive

vm.b = 2
// `vm.b` là KHÔNG reactive
```

Theo ví dụ trên Vue không cho phép việc tự động add thêm root-level cho reactive property cho một instance đã được tạo sẵn. Tuy nhiên chúng ta vẫn có thể add reactive property thông qua `Vue.set(object, key, value)`

```
Vue.set(vm.someObject, 'b', 2)
```

Hoặc chúng ta cũng có thể sử dụng vue instance method `vm.$set`
```
this.$set(this.someObject, 'b', 2)
```

Hoặc sử dụng [Vue.util.defineReactive](https://jsfiddle.net/Herteby/rs26ycmk/)

Nhiều khi chúng ta cũng muốn gán nhiều giá trị thuộc tính vào một object đã có sẵn thông qua hàm `Object.assign()` hoặc `_.extend()`. Tuy nhiên những thuộc tính được add thêm vào object này cũng sẽ không được vue nhận ra thay đổi (hay là những nonactivity property). Trong trường hợp này hãy tạo ra một object mới với những thuộc tính muốn add thêm và trộn chúng với object đã tồn tại ở trên

```
// instead of `Object.assign(this.someObject, { a: 1, b: 2 })`
this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
```
Nếu có thể hãy khai báo những property có thể lường trước trong Object ngay cả khi gía trị của nó chưa được khởi tạo, để vue sẽ làm nhiệm vụ giám sát những thay đổi đó cho chúng ta, còn nếu không bạn vẫn có thể sử dụng những cách bên trên.

Tương tự thì với Array chúng ta cũng cần biết khi nào nó là nonactivity. Vue sẽ không phát hiện được thay đổi với array trong những trường hợp sau:
- Khi mà bạn set giá trị trực tiếp cho một item trong array với index của nó
```
vm.items[indexOfItem] = newValue
```
- Khi bạn thay đổi length của array
```
vm.items.length = newLength
```
```
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
})
vm.items[1] = 'x' // is NOT reactive
vm.items.length = 2 // is NOT reactive
```

Để  giải quyết vấn đề với array reactivity đã nêu trên thì mình phải báo với reactivity system rằng trạng thái đã được thay đổi, hãy cập nhật đi
```
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)

hoặc sử dụng `array proxifyed functions ` như `push` hay `splice`

// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
```

Trên Vue docs có khuyên chúng ta nên sử dụng data component như là một plain Javascript Object thay vì Class Object, tương tự với các thuộc tính độc lập trong data.
Lý do là gì?
Có rất nhiều cách để một object hay class có thể điều khiển dữ liệu bên trong chúng mà reactivity system không thể nhận ra. Do đó có chúng ta cần phải hiểu đó là việc implementation chi tiết của class hay object để biết được phần nào là reactivity và phần nào không.
Ví dụ Vue không thể làm cho thuộc tính prototype method là reactive. Nếu mà chúng là có class mà class đó sử dụng một method từ prototype của nó để quản lý state thì Vue sẽ không thể biết được.
Mặt khác thì một object có những property sẵn có (internal property) mà chúng ta không biết, nó lại được link đến một thằng khác, ví dụ như một object phức tạp như HTML element từ DOM. Và khi Vue làm cho nó reactivity có thể nhận lại lỗi *maximum call stack size exceeded* bởi vì độ phức tạp mà HTML element trả về có thể là toàn bộ DOM.
Do đó việc sử dụng plain object là cần thiết, tránh trường hợp rủi ro khi chúng ta sử dụng complex object hay class.
## Khai báo thuộc tính reactive
<hr>

Để Vue kiểm soát được trạng thái của các thuộc tính khi có thay đổi, ta cần phải khởi tạo Vue instances với việc khai báo tất cả *root-level* reactive data property, ngay cả dữ liệu đó là empty.
```
var vm = new Vue({
  data: {
    // declare message with an empty value
    message: ''
  },
  template: '<div>{{ message }}</div>'
})
// set `message` later
vm.message = 'Hello!'
```

*data* object giống như một lược đồ mà nhìn vào đó chúng ta có thể hình dung ra được component state, khai báo tất cả các thuộc tính reactive trước giúp cho component code dễ hiểu khi nó được sử dụng bởi một thành viên khác trong đội dự án của bạn.

## Hàng đợi cập nhật bất đồng bộ (Async Update Queue)
<hr>

Vue thực hiện việc cập nhật DOM một cách **bất đồng bộ**. Bất cứ khi nào dữ liệu được thay đổi và được phát hiện ra, nó sẽ mở ra một queue **lưu tạm** (buffer) tất cả những dữ liệu thay đổi đó trong cùng một event loop. Nếu cùng một **watcher** được kích hoạt nhiều lần, nó sẽ chỉ được đẩy vào hàng đợi (queue) một lần duy nhất. Việc dữ liệu lưu tạm được xóa bỏ trùng lặp là quan trọng để tránh những tính toán không cần thiết và sự thay đổi DOM. Sau đó trong event loop tiếp theo "tick", bạn có thể tìm hiều về (Vue.nextTick)[https://vuejs.org/v2/api/#Vue-nextTick] để hiểu rõ hơn, vue sẽ làm sạch queue và thực hiện công việc của nó. Bản chất bên trong Vue sẽ thực hiện `Promise.then` và `MessageChannel` cho hàng đợi bất đồng bộ và thực hiện `setTimeout(fn, 0)`. Bạn có thể tìm hiểu thêm lý do sử dụng [setTimeout 0](https://stackoverflow.com/questions/779379/why-is-settimeoutfn-0-sometimes-useful) nếu muốn.

```
var vm = new Vue({
  el: '#example',
  data: {
    message: '123'
  }
})
vm.message = 'new message' // change data
vm.$el.textContent === 'new message' // false
Vue.nextTick(function () {
  vm.$el.textContent === 'new message' // true
})
```

Bạn có thể muốn thử tự build một reactivity system với Javascript để có thể hiểu hơn về cơ chế họat động của nó, tham khảo tại đường dẫn sau: https://www.vuemastery.com/courses/advanced-components/build-a-reactivity-system/
## Nguồn tham khảo
- https://vuejs.org/v2/guide/reactivity.html
- https://vuejs.org/v2/guide/list.html#Caveats
- https://medium.com/js-dojo/reactivity-in-vue-js-and-its-pitfalls-de07a29c9407