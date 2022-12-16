Chào mừng các bạn quay trở lại với series học VueJS của mình. Ở bài trước chúng ta đã tìm hiểu cách sử dụng của [methods](https://viblo.asia/p/bai-4-tim-hieu-ve-methods-trong-vuejs-yMnKM11NK7P) trong Vue, bài này chúng ta sẽ tìm hiểu về `computed`, cách sử dụng và so sánh sự khác nhau giữa `computed` và `methods`
# Computed là gì và cách sử dụng
Khi component được khởi tạo thì computed sẽ được biến đổi giống như một property. Bạn có thể coi computed giống như dữ liệu ở trong `data`.
Mình sẽ lấy ví dụ giống như trên vuejs.org để giải thích cho các bạn. Nhiều khi trong ứng dụng của chúng ta có nhiều xử lý kiểu như sau: 
```html
<template>
    <div class="my-component">
        <div>{{ message.split('').reverse().join('') }}</div>
    </div>
</template>
```
Điều này làm cho `template` của chúng ta nhìn không được gọn gàng, phải mất một lúc nhìn thì các bạn mới nhận ra đoạn code trên sẽ hiển thị `message` theo thứ tự ngược lại. Điều này sẽ ngày càng tệ hơn nếu như trong component các bạn muốn làm điều tương tự nhiều lần. Đó là lúc chúng ta cần sử dụng đến `computed`.

Về cách sử dụng thì `computed` được sử dụng gần giống như `methods`. Chúng ta cùng làm thử một ví dụ như sau:
```html
<template>
    <div class="my-component">
        <div>{{ reverseMessage }}</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: 'this is text'
            }
        },
        computed: {
            reverseMessage() {
                return this.message.split('').reverse().join('')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .my-component {
        color: red;
    }
</style>
```
Ở đây mình tạo một computed tên là `reverseMessage` với mục đích chuyển một đoạn text theo thứ tự ngược lại. Nhìn có vẻ giống với `methods` như ở bài trước mình giới thiệu đó nhỉ.
# Sự khác nhau giữa computed và methods
Điều gì xảy ra nếu các ở trong cặp dấu `{{ }}` ở `template` các bạn viết là `reverseMessage()` thay vì `reverseMessage`, khi đó lúc chạy ở console sẽ báo lỗi `_vm.reverseMessage is not a function`. Từ đây mình muốn rút ra cho các bạn một số điểm khác biệt giữa `computed` và `methods`:
* Khi gọi computed ta không được thêm cặp dấu `()` đằng sau, điều đó tức là `computed` cũng không thể nhận tham số đầu vào như `methods`
* Vì không nhận tham số đầu vào nên `computed` chỉ nên dùng với các dữ liệu có sẵn trong `data` của component
* `computed` sẽ chỉ tính toán lại mỗi khi các biến phụ thuộc trong nó thay đổi, còn `methods` sẽ được tính toán bất kì khi nào nó được gọi, nên nếu biết tận dụng `computed` để tính toán các dữ liệu có sẵn thì sẽ cải thiện được performance app của các bạn. Điều tuyệt vời của `computed` là nó sẽ được cached nên giả sử bạn có 1 computed với hàng loạt tính toán, nhiều vòng lặp trong đó, mà nếu các các biến phụ thuộc không thay đổi thì khi sử dụng nó sẽ chỉ mất thời gian tính 1 lần, những lần sau kết quả sẽ được sử dụng lại từ lần trước.

> Nếu bạn nào đã dùng React thì `computed` ở đây khá giống với `useMemo`
# Kết luận
Kiến thức trong bài mình tổng hợp từ những gì mình học được và mình thấy cần thiết khi xây dựng dự án, để hiểu sâu về `computed` thì còn nhiều thứ như `getter` hay `setter` nhưng mình thấy không thực sự cần thiết và có thể sẽ làm cho các bạn mới bắt đầu khó hiểu. Trong tương lai nếu có thể mình sẽ hướng dẫn thêm các bạn về chúng.

Ở bài tiếp theo chúng ta sẽ tìm hiểu về watcher trong VueJS nhé.

Cám ơn các bạn đã theo dõi ^^ !