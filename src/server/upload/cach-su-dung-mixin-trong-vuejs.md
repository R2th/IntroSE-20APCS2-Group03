# `Cách sử dụng Mixin trong Vuejs`
Một trong những điều tuyệt với nhất khi tôi phát triển sản phẩm với Vue đó là mixin. Đây là một trong những cách đơn giản nhất để tăng tính reusable code giữa các component khác nhau với nhau.
![](https://images.viblo.asia/795bfb90-7527-4104-a27c-5fff266561ca.jpg)
## Mixin là gì
Mixin có chứa đầy đủ tính chất của một component bình thường như các hàm lifecycle created, mounted, update, destroyed, state, methods. Khi inject mixin vào component, những hàm lifecycle không bị đè lên nhau mà còn được mix và phân luồng chạy một cách rõ ràng. 
```js
export default {
   data () {
      greeting: ‘Hello I am a mixin’
   },

   created: function () {
      console.log(‘Mixin was applied!’)
   },

   methods: {
      greet() {
         console.log(this.greeting’)
      }
   }
}
```

```js
import mixin from ‘./mixin.js’

export default {
   mixins: [mixin],

   created() {
      console.log('Created')
      this.displayMessage()
   }
}
// => "Created"
// => "Mixin was applied!"
// => "Hello I am a mixin"
```

Trên là một ví dụ cực kỳ đơn giản cho thấy mixin có thể dễ dàng tiếp cận như thế nào. Bạn có thể truy cập đến bất kỳ state nào trong mixin.
## Xử lý khi các khai báo bị trùng nhau
Với trường hợp đặt tên bị trùng nhau thì sao?
Điều này có thể dễ dàng xảy ra khi bạn bắt đầu có nhiều mixin hơn, các mixin này chưa có một cấu trúc và convention nào cụ thể. Nhưng nếu điều này xảy ra, thay vì được mix lại như các hàm lifecycle, chúng được override theo một thứ tự ưu tiên nhất định
Giả dụ cả mixin và component đều có khai báo state A, state A trên component sẽ được ưu tiên hơn và in ra kết quả
```js
export default {
   data () {
      title: ‘Mixin’
   }
}
```
```js
import mixin from ‘./mixin.js’
export default {
   mixins: [mixin],
   
   data () {
      title: ‘Component’
   },
   
   created: function () {
      console.log(this.title)
   }
}
// => "Component"
```
## Conclusion
Trên đây là một số cách sử dụng đơn giản với mixin, nếu bạn muốn tìm hiểu sâu hơn và cách áp dụng đa dạng hơn, document Vue chính là một lựa chọn tuyệt vời. Áp dụng vào dự án của bạn, bạn sẽ thấy mixin tuyệt vời như thế nào
## `References`
1. https://levelup.gitconnected.com/how-to-use-mixins-in-vuejs-a40cc3fb4428
1. https://vuejs.org/v2/guide/mixins.html