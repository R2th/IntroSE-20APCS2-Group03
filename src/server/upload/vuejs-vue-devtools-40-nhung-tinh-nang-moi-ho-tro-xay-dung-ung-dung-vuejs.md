Nếu bạn đã và đang phát triển một ứng dụng Vue thì chắc hẳn bạn đã từng sử dụng [Vue devtools](https://github.com/vuejs/vue-devtools) - Browser devtools extension for debugging Vue.js applications.
Những tính năng mới dưới đây rất hữu ích khi chúng ta xây dựng ứng dụng Vue.js nhưng có thể chúng ta lại rất ít sử dụng hoặc chưa từng sử dụng. Mình cũng vậy sau khi tìm hiểu thì thấy có rất nhiều tính năng hữu ích mà Vue devtools cung cấp, tuy nhiên lại chưa từng sử dụng.

**Nguồn** [What’s new in Vue Devtools 4.0 by Guillaume CHAU](https://medium.com/the-vue-point/whats-new-in-vue-devtools-4-0-9361e75e05d0)
## Editable component data
Bạn có thể thay đổi dữ liệu **data** trong **component** một cách trực tiếp tại **Component inspector**
1. Lựa chọn component
2. Đưa chuột tới một *key* phía dưới **data section**
3. Click và biếu tượng cái *bút*
4. Thay đổi giá trị mong muốn của bạn và submit thay đổi bằng việc nhấn vào biểu tượng hoàn thằng hoặc nhấn *enter*
{@youtube: https://www.youtube.com/watch?time_continue=15&v=xeBRtXLrQYAƯ}

Nội dung của từng **field** là các giá trị serialized JSON. Ví dụ nếu bạn muốn thêm vào một string, hãy nhập vào "hello" với *double-quotes*(**"**). Nếu là mảng thì sẽ trông như thế này [1, 2, "bar"] và object có dạng { "a": 1, "b": "foo" }

Hiện tại những kiểu dữ liệu có thể được chỉnh sửa như sau:
- `null` and `undefined`
- `String`
- `Boolean`, `Number`, `Infinity`, `-Infinity` và `NaN`
- `Arrays`
- `Objects`
Đối với `Arrays` và `Object` thì việc chỉnh sửa dữ liệu có thể sử dụng icon dành riêng, ví dụ như việc thay đổi tên trường của Object
{@youtube: https://www.youtube.com/watch?v=fx1zjvHryJ0}

Một cảnh báo sẽ được đưa ra nếu như dữ liệu đưa vào không phải là JSON hợp lệ.Tuy nhiên thì `undefined` hay `NaN` bạn có thể nhập vào trực tiếp.
Một số kiểu dữ liệu khác có thể sẽ được hỗ trợ trong những bản release tiếp theo!

## Quick Edit
Một số kiểu dữ liệu có thể được bằng một click với tính năng *Quick edit*. Ví dụ giá trị kiểu `Boolean` có thể thay đổi trực tiếp với *checkbox icon*
{@youtube: https://www.youtube.com/watch?v=llNJapRZaHo}
Dữ liệu `Number` có thể tăng hoặc giảm bằng việc click icon **+** hay **-**
{@youtube: https://www.youtube.com/watch?v=ZCToaOpId0w}
Bạn cũng có thể sử dụng các phím mũi tên trên bàn phím cho việc tăng hoặc giảm các giá trị kiểu Number một cách nhanh chóng.

## Open component in editor
Nếu bạn đang sử dụng **vue-loader** hay **Nuxt** trong dự án, giờ bạn có thể mở code của từng component trong *code editor* mà bạn muốn (Các component của bạn cần được xây dựng dạng Single File Component)
1. Làm theo các bước trong [hướng dẫn cài đặt](https://github.com/vuejs/vue-devtools/blob/master/docs/open-in-editor.md) (nếu bạn đang sử dụng Nuxt thì không cần làm bước này)
2. Tại *Component inspector* đưa trỏ chuột đến tên của một *component* và bạn sẽ nhìn thấy *tooltip* đường dẫn tới file component
3. Click và tên component và phần code trong Component file tương ứng sẽ được mở bởi một editor chọn trước.
{@youtube: https://www.youtube.com/watch?time_continue=9&v=XBKStgyhY18}

## Show the original component names
Thông thường thì tên của tất cả các compoent được format dạng *Camelcase*. Bạn có thể tắt tinh năng này bằng việc bât tắt *"Format component names"* button.
{@youtube: https://www.youtube.com/watch?v=PoZmEcCdSbU}

## Inspecting components just got easier
Trong khi bạn đang bật Vue devtools bạn có thể click chuột phải trên một *component* và kiểm tra (inspect) thành phần của nó.
![](https://cdn-images-1.medium.com/max/800/1*8fhP5VTb6uev-8HfI4stYw.png)
Bạn cũng có thể đưa tính năng *inspect* này vào trong code thông qua một phương thức đặc biệt là **$inspect**
```
<template>
  <div>
    <button @click="inspect">Inspect me!</button>
  </div>
</template>

<script>
export default {
  methods: {
    inspect () {
      this.$inspect()
    }
  }
}
</script>
```
Dù bằng cách nào thì *component tree* sẽ mở rộng tới thành phần mới được chọn một cách tự động.

## Filter events by component
Bây giờ bạn có thể lọc các **Event history** theo các Component nơi mà những sự kiện này được `emit`
{@youtube: https://www.youtube.com/watch?v=wytquoUPSFo}

## Vuex inspector filter
{@youtube: https://www.youtube.com/watch?v=T095k5hI_pA}

## Vertical layout
Khi mà devtools không đủ rộng thì các thành phần sẽ được hiểu thị và bố trí theo chiều dọc.
{@youtube: https://www.youtube.com/watch?v=33tJ_md8bX8}

## Improved scroll-to-component
Theo nhưng mặc định khi lựa chọn một component sẽ không còn *scroll view* đến component đó nữa mà thay vào đó bạn cần click vào *"Scroll into view"* icon.
![](https://cdn-images-1.medium.com/max/800/1*TJEfzB4ifK8t-5kpbZieRw.png)

## Collapsible inspectors
{@youtube: https://www.youtube.com/watch?time_continue=1&v=bblGueKPsjE}

## Kết luận
Trên đây là một số tính năng theo mình thấy là rất hữu ích khi bạn làm việc với một project sử dụng Vue.js, có thể các bạn cũng giống như mình ban đầu chỉ sử dụng để soi xem `data`, `props`, `state` hay `event` thay đổi như thế nào chứ chưa sử dụng các tính năng trên của vue devtools đúng không?
Hãy thử ngay đi nhé!