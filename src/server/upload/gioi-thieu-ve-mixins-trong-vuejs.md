Xin chào năm mới năm me! Hôm nay mình sẽ tiếp tục chia sẻ cho các bạn những vấn đề liên quan đến Vuejs. Ở bài trước mình đã giới thiệu về [tính năng Filter](https://viblo.asia/p/don-gian-ve-filter-trong-vuejs-RQqKLbzNl7z) và lần này, mình xin chia sẻ với các bạn về một khái niệm cũng rất quen thuộc. Đó là **Mixins**, hãy cùng tìm hiểu xem nó là gì nhé!

### Mixins là gì?
- Nói một cách dễ hiểu thì mixins là một phương pháp để tái sử dụng các chức năng (reusable functionalities) giữa các components với nhau. 
- Vậy thì nó có gì đặc biệt hơn so với các funtions helper hay utils khác? Đó là mixins `có đầy đủ các options tương tự như một components` như lifecycle, methods...

### Sử dụng mixins
- Cũng khá đơn giản, chúng ta có 1 file mixin như sau:
```js
// file mixin.js
export default {
  data () {
    return {
      name: 'Quoc Anh dep trai'
    }
  }
}
```

- Và một file component sử dụng mixins bên trên:
```js
// file component
import mixin from './mixin.js'
export default {
   mixins: [mixin],
   
   created() {
      console.log(this.name)
      // Kết quả là 'Quoc Anh dep trai'
   }
}
```
Để sử dụng mixin ta sử dụng cú pháp mixins: [...] và như chúng ta thấy, kết quả được log ra là state được khai báo ở file mixins. Vậy nếu ở components sử dụng mixins cũng khai báo một state name với giá trị khác thì sẽ như thế nào? Chúng ta qua phần xử lý trùng lặp nhé :D

### Mixed options
- Cũng như ví dụ trên, nhưng trong component ta khai báo thêm state trùng với mixins:
```js
// file mixin.js
export default {
  data () {
    return {
      name: 'Quoc Anh dep trai',
      age: '20'
    }
  }
}
```

- Và một file component sử dụng mixins bên trên:
```js
// file component
import mixin from './mixin.js'
export default {
   mixins: [mixin],
   
    data () {
     return {
      name: 'Quoc Anh xau trai'
     }
    }
   
   created() {
      console.log(this.name)
      // Kết quả là 'Quoc Anh xau trai'

       console.log(this.age)
      // Kết quả là '20'
   }
}
```
- Như chúng ta thấy kết quả thì tất cả state đã được **hợp-trộn** lại với nhau, và nếu có trùng lặp, state ở component được ưu tiên hơn và override state trong mixins.

### Tổng kết
- Đơn giản và dễ hiểu đúng không nào  ^^. Đây là một tính năng khá hay ho được mình sử dụng nhiều trong các dự án.
- Hi vọng qua bài chia sẻ này sẽ giúp các bạn hiểu hơn về mixins. Cám ơn đã theo dõi, hẹn gặp lại!