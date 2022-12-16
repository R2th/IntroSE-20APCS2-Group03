## Lời mở đầu
Như bạn có thể mong đợi, Vue 3 mang đến rất nhiều tính năng thú vị mới và những thay đổi đối với một số tính năng hiện có nhằm mục đích làm cho việc phát triển với framework dễ dàng hơn và dễ bảo trì hơn rất nhiều. Rất may, Vue chủ yếu giới thiệu các bổ sung và cải tiến so với các API hiện tại hơn là các thay đổi lớn để những người đã biết Vue 2 sẽ nhanh chóng cảm thấy thoải mái với các cú pháp mới. Trong bài viết này, chúng ta sẽ xem xét một số tính năng mới này và cách bắt đầu với chúng

## Các tính năng mới trên Vue 3
### Composition API
`Composition API` là cú pháp nổi bật và phổ biến nhất của phiên bản Vue3. Đó là một cách tiếp cận hoàn toàn mới để tái sử dụng logic và tổ chức code.

Hiện tại, chúng ta xây dựng các thành phần với cái mà chúng ta gọi là Composition API. Để thêm logic vào thành phần Vue, chúng ta điền vào các thuộc tính (tùy chọn) như `data, methods, computed, v.v`. Nhược điểm lớn nhất của phương pháp này là thực tế đây không phải là một mã `JavaScript` hoạt động. Bạn cần biết chính xác thuộc tính nào có thể truy cập được.Trình biên dịch Vue cần chuyển đổi các thuộc tính này thành mã làm việc.

Hãy xem một ví dụ rất đơn giản về một thành phần sử dụng `Composition API` mới để hiểu cách hoạt động của nó.
```javascript
<template>
  <button @click="increment">
    Count is: {{ count }}, double is {{ double }}, click to increment.
  </button>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const double = computed(() => count.value * 2)

    function increment() {
      count.value++
    }

    onMounted(() => console.log('component mounted!'))

    return {
      count,
      double,
      increment
    }
  }
}
</script>
```
Bây giờ chúng ta hãy chia mã này thành nhiều phần để hiểu điều gì đã xảy ra
```javascript
import { ref, computed, onMounted } from 'vue'
```
Composition API hiển thị các thuộc tính thành phần dưới dạng các `functions`. Trong case này, chúng ta cần import `ref`, `computed` và truy cập vào lifecycle hook với `onMounted`.

Bây giờ, chúng ta xem method `setup`.

Nói một cách ngắn gọn, nó chỉ là một hàm trả về các thuộc tính và chức năng. Chúng ta đang khai báo tất cả các `data`, `computed`, `watchers` và lifecycle hooks ở đây và sau đó return chúng để chúng ta có thể sử dụng trong code.
```javascript
const count = ref(0)
```
Chúng ta đang khai báo một biến `count` và dùng hàm `ref` và truyền giá trị vào, bạn chỉ cần gọi biến `count.value` là được
```javascript
const double = computed(() => count.value * 2)

function increment() {
  count.value++
}
```
và đây chúng ta khai báo `double` và dùng `computed` để tính toán lại giá trị biến `count` và khai báo `func increment`
```javascript
onMounted(() => console.log('component mounted!'))
```
Chúng ta dùng `hook onMounted` để `log` lại khi component đã được mounted
```javascript
return {
  count,
  double,
  increment
}
```
Cuối cùng, chúng ta `return` về `count, double` và `method increment` để chúng ta sử dụng.
```javascript
<template>
  <button @click="increment">
    Count is: {{ count }}, double is {{ double }}. Click to increment.
  </button>
</template>
```
Bây giờ chúng ta có thể truy cập các `biến` và `func` được trả về bởi method setup.

### Suspense
Bạn nào đã làm với `React` thì chắc đã biết tới  `Suspense`. Một ý tưởng tuyệt vời khác từ hệ sinh thái `React` sẽ được áp dụng trong Vue3 là `component Suspense`.

`Suspense` sẽ tạm ngừng render component của bạn và hiển thị component dự phòng cho đến khi đáp ứng được một điều kiện.
```javascript
<Suspense>
  <template >
    <Suspended-component />
  </template>
  <template #fallback>
    Loading...
  </template>
</Suspense>
```
Khi đang nạp dữ liệu thì sẽ hiển thị `#fallback` cho đến khi quá trình nạp dữ liệu xong thì `<Suspended-component /> `bắt đầu chạy.
### Multiple v-models
V-model là một directive mà chúng ta có thể sử dụng cho ràng buộc hai chiều.
```javascript
<input v-model="property />
```
Nhưng bạn có biết rằng bạn có thể sử dụng `v-model` với mọi component không? `v-model` chỉ là một phím tắt để chuyển thuộc tính giá trị và lắng nghe sự kiện đầu vào. Viết lại ví dụ trên thành cú pháp dưới đây sẽ có cùng tác dụng:
```javascript
<input 
  v-bind:value="property"
  v-on:input="property = $event.target.value"
/>
```
Thật không may, bạn chỉ có thể có một `v-model` cho mỗi thành phần.
May mắn thay, điều này sẽ không thành vấn đề trong Vue3! Bạn sẽ có thể dùng multiple v-model tùy thích. 

Dưới đây là ví dụ
```javascript
<ContactForm
  v-model:name="conatctName"
  v-model:email="contactEmail"
/>
```
## Tổng kết
Ngoài `Composition API` là API mới lớn nhất trong Vue 3, chúng ta cũng có thể tìm thấy rất nhiều cải tiến nhỏ hơn. Chúng ta có thể thấy rằng Vue đang hướng tới trải nghiệm nhà phát triển tốt hơn.

Ok! Cảm ơn các bạn đã đọc bài viết của mình, do chưa có nhiều thời gian tìm hiểu nên có chỗ nào sai xót mong các bạn comment để cho mình biết mình sửa và hẹn các bạn ở các bài viết tiếp theo :heart_eyes::heart_eyes: