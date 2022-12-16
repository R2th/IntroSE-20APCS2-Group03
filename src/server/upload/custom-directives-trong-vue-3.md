## Directives là gì?
**Vue Directives** là một đoạn lệnh nhỏ mà các bạn có thể chèn chúng vào các phần tử DOM. Tên của các đoạn lệnh đó được bắt đầu bằng tiền tố v- dùng để Vue có thể biết được rằng bạn đang sử dụng một chút đánh dấu đặc biệt và để cho cú pháp được nhất quán. 

* Để tìm hiểu kỹ hơn về định nghĩa, bạn có thể đọc tại:  [Giới thiệu Vue Directives và cách tạo Custom Directives](https://viblo.asia/p/gioi-thieu-vue-directives-va-cach-tao-custom-directives-gDVK2Mwr5Lj#_tu-tao-custom-directives-1)
    
    
## Custom Directives

Bên cạnh những directive được cung cấp mặc định như (`v-model` và `v-show`), Vue cũng cho phép bạn tự tạo directive tùy ý. Chúng gọi là Custom Directives hay tạm dịch là Directives tùy biến.
Custom Directive được định nghĩa là đối tượng có chứa lifecycle hooks giống như một Componets. Các hooks của nó nhận vào các phần thử mà đã directive của chúng đã được ràng buộc. 

Trong Vue hiện có hai hình thức tái sử dụng code: Components và Composables. Trong khi Components như những khối vuông để lắp ráp xây dựng, thì Composables lại tập trung chủ yếu vào việc tái sử dụng logic trạng thái (Stateful Logic). Mặt khác, Custom Directives lại hữu ích khi muốn sử dụng lại logic liên quan tới việc truy xuất cấp thấp tới các phần tử web.

Ví dụ: Một phần tử `input` được focus tự động.

```
const focus = {
  mounted: (el) => el.focus()
}

export default {
  directives: {
    // enables v-focus in template
    focus
  }
}
```

```
<input v-focus />
```

Nếu bạn chưa click bất kỳ đâu trên web này, chiếc `input` ở trên sẽ được auto-focus.


Vậy thì, việc cài đặt như thế này khác gì so với thuộc tính `autofocus` có sẵn? Nó sẽ được auto-focus mỗi khi Vue chèn phần tử này vào, thay vì chỉ thực hiện mỗi khi load trang.

Cũng tương tự như các Components, Custom Directives cần phải được đăng ký để có thể sử dụng trong temple (như trên đoạn code trên).

Người ta cũng rất hay có xu hướng đăng ký Custom Directives gobal để có thể sử dụng lên toàn app:

```
const app = createApp({})

// make v-focus usable in all components
app.directive('focus', {
  /* ... */
})
```

> ***Chú ý:*** Custom directive chỉ nên sử dụng khi mà bạn cần một chức năng mà bắt buộc phải thao tác với DOM trực tiếp. Hãy sử dụng các Directive có sẵn (Built-in Directives) như là v-bind vì nó hiệu quả hơn và thân thiện với server-rendering nhiều hơn.

## Directive Hooks

Directive khi được định nghĩa cung cấp cho ta một số hàm hook (tất cả đều tùy chọn):


```
const myDirective = {
  // called before bound element's attributes
  // or event listeners are applied
  created(el, binding, vnode, prevVnode) {
    // see below for details on arguments
  },
  // called right before the element is inserted into the DOM.
  beforeMount() {},
  // called when the bound element's parent component
  // and all its children are mounted.
  mounted() {},
  // called before the parent component is updated
  beforeUpdate() {},
  // called after the parent component and
  // all of its children have updated
  updated() {},
  // called before the parent component is unmounted
  beforeUnmount() {},
  // called when the parent component is unmounted
  unmounted() {}
}
```

## Hook Arguments

Các Directive Hook nhận các đối số sau:

* **el:** Chỉ tới phần tử mà Directive liên kết tới. Nó có thể sử dụng luôn để thao tác trực tiếp với DOM.
* **binding:**  sẽ là một đối tượng có chứa các thuộc tính sau.
    * value: Giá trị được truyền cho Directive. Ví dụ: `v-my-directive="1 + 1"` sẽ cho ra value `2`.
    * oldValue: Giá trị value trước đó, chỉ khả dụng ở trong `beforeUpdate `và `updated`, luôn có sẵn không kể giá trị có thay đổi hay không.
    * arg: Đối số được pass cho Directive (nếu có). Ví dụ: `v-my-directive:foo`, arg sẽ là `"foo"`.
    * modifiers: Một objects chứa các modifer. Ví dụ: `v-my-directive.foo.bar` modifer sẽ là object: `{ foo: true, bar: true }`
    * instance: Instance của Component mà Directive đang được sử dụng.
    * dir: Object Directive được định nghĩa
    * vnode: Vnode được trình biên dịch của Vue tạo ra.
 
Tham khảo ví dụ sau:
```
<div v-example:foo.bar="baz">
```

Đối số `binding` sẽ là object kiểu:
```
{
  arg: 'foo',
  modifiers: { bar: true },
  value: /* value of `baz` */,
  oldValue: /* value of `baz` from previous update */
}
```

Và cũng tương tự như các directives có sẵn, các đối số của Custom Directive cũng có thể dynamic. Ví dụ:
```
<div v-example:[arg]="value"></div>
```

Bài viết được tổng hợp và dịch từ các nguồn:
https://vi.vuejs.org/v2/guide/custom-directive.html
https://vuejs.org/guide/reusability/custom-directives.html
https://viblo.asia/p/gioi-thieu-vue-directives-va-cach-tao-custom-directives-gDVK2Mwr5Lj