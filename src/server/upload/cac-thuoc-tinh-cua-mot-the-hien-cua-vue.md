## Giới thiệu 
- Các thuộc tính của một thể hiện của vue, bao gồm *$data, $props, $el, $options, $parent, $root, $children, $slots, $scopedSlots, $refs, $isServer, $attrs, $listenters*. Dưới đây sẽ là chi tiết các thuộc tính của một thể hiện của vue.


### vm.$data 
- Kiểu : Object 
- Chi tiết: 
  Là đối tượng dữ liệu của một thể hiện của vue. Có thể truy cập vào dữ liệu của mỗi thể hiện của Vue . 
- Xem thêm Options/Data-data 

### vm.$props 
- Kiểu: Object 
- Chi tiết : Liệt kê chi tiết các thành phần mà mỗi thể hiện của vue được nhận. Mỗi thể hiện của vue có thể truy cập đến thuộc tính được nhận ở props. 

### vm.$el 
- Kiểu: Element 
- Chỉ đọc 
- Chi tiết: 
Là thành phần root DOM (Document Object Model) mà thể hiện của vue quản lý. 

### vm.$options 
- Kiểu: Object 
- Chỉ đọc 
- Chi tiết:
- Các options được khởi tạo và sữ dụng ở mỗi thể hiện của Vue. Nó thường được sử dụng khi bạn muốn thêm vào một thuộc tính tùy biến tùy chọn. 
```js
new Vue({
  customOption: 'foo',
  created: function () {
    console.log(this.$options.customOption) // => 'foo'
  }
})
```
### vm.$parent 
- Kiểu : **Vue instance**
- Chỉ đọc 
- Chi tiết: 
- Là thể hiện cha của thể hiện vue hiện tại nếu nó có. 

### vm.$root 
- Kiểu: **Vue instance**
- Chỉ đọc
- Chi tiết:
Truy cập đến thể hiện vue ở tầng root trong cây thành phần của thể hiện của vue hiện tại. Nếu thể hiện vue hiện tại không có thể hiện cha, thì nó được đặt là chính nó.
HIểu đơn giản là vm.$parent truy cập đến thể hiện vue là cha của thể hiện vue hiện tại, còn vm.$root thì truy cập đến thể hiện vue đầu tiên của cây, nó không có bât cứ thể hiện cha nào. A->B->C->D thì vm.$parent của D là C, nhưng vm.$root là A. ##

### vm.$children
- Kiểu: **Array<Vue instance>**
- Chỉ đọc
- Chi tiết:
Liệt kê danh sách các component con của thể hiện vue hiện tại. Có điều cần chú ý nó phải là tồn tại một mảng, có thể là mảng rỗng, và nó không **reactive**. Khi code, luôn hiểu nó là một mảng và sử dụng như một mảng là được. 

### vm.$slots
- Kiểu: {[name: string]: ?Array<VNode>}   
- Chỉ đọc 
- Chi tiết:
Được sử dụng tương tự @section trong .blade thông thường. nó định nghĩa các khoảng thành phần chứa các nội dung được thêm vào sau, hay tùy chọn giá trị ở mỗi các thành phần khi tạo ra. 

### vm.$scopedSlots
Khả dụng từ phiên bản 2.1.0+, và co sự thay đổi ở bản 2.6.0+
- Kiểu: { [name: string]: props => Array<VNode> | undefined }
- Chỉ đọc(Read only)
- Chi tiết
Được sử dụng để truy cập đến **scoped slots**. Với mỗi **slot**, thêm vào slot **default**, là một hàm tương ứng trả về VNodes (hoặc undefined)
Từ bản 2.6.0+, 
    1. Scoped slot function phải trả về một mảng các VNodes, nếu không giá trị trả về sẽ không khả dụng (trả về undefined)
    2. Mọi **$slot** giờ đều có thể sử dụng **$scopedSlots** như là các hàm. Nếu bạn sử dụng nó như một hàm render, thì nó được khuyên là sử dụng thông qua **scopedSlots**, tuy nhiên chúng ta có thể quyết định việc sử dụng hoặc không. Ở tài liệu này , dường như tác giả có để cập đến bản vue3, sẽ đưa mọi slots thành các function. 
### vm.$refs
- Kiểu : Object 
- Chỉ đọc
- Chi tiết:
Một đối tượng chứa các DOM thành phần hoặc các thể hiện thành phần, được đăng ký thông quá **ref**
    
### vm.$isServer 
- Kiểu: Boolean
- Chỉ đọc 
- Chi tiết:
Trả về khi thể hiện Vue đang chạy trên Server. 
### vm.$attrs
Khả dụng từ phiên bản 2.4.0+
Bao gồm các binding của parent-scope (ngoại trừ class và style), nó được sử dụng như props. Khi một component không có bất kỳ một khai báo **props** nào, thì nó sẽ chứa toàn bộ các binding của parent-scope(ngoại trừ class và style**, và nó có thể đẩy dữ liệu xuống giữa các coponent thông quá **v-bind="$attrs"**

### vm.$listeners
Khả dụng từ bản 2.4.0+ 
- Kiểu {[key:string]: Function | Array<Function>}
- Chỉ đọc