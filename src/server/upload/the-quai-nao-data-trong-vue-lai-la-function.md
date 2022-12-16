![](https://images.viblo.asia/f770a7d2-7bc4-46a4-b883-3006de3140fd.jpg)

Chào các bạn, mình là Hoàng.
Hôm nay chúng ta sẽ đi thẳng vào vấn đề luôn **tại sao data trong Vue lại là function?**
Mình đã rất thắc mắc điều này, vì đa phần thì chúng ta đều thấy dữ liệu không phải là một function, vậy tại sao trong Vue lại khác??
Dưới đây là một số giải thích mình cho là hợp lý cho đến thời điểm hiện tại, nếu các bạn có ý kiến gì thì cứ comment ở dưới cho mình biết nhé.
Cùng xét ví dụ sau để thấy sự khác biệt, và cùng đi sâu vào tìm hiểu xem lý do tại sao nhé

#### Foreword

Đối với data khai báo là một function trả về object.

```js
// Define a new component called button-counter
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
```

```js
<div id="components-demo">
  <button-counter></button-counter>
  <button-counter></button-counter>
  <button-counter></button-counter>
</div>
```

```js
new Vue({ el: '#components-demo' })
```

![](https://images.viblo.asia/9462a18d-1773-4277-bc55-1505816f271d.gif)

Đối với data được khai báo là một **object**

```js
data: {
  count: 0
}
```

![](https://images.viblo.asia/839e217b-ad19-46b9-9d3b-1b87eb0ffdc9.gif)

Như chúng ta thấy thì sự khác nhau rõ ràng nhất là: Nếu khai báo data là object, thì **data sẽ bị dùng chung bởi các instance của component** đó. Đây là điều chúng ta trong phần lớn trường hợp là không hề mong muốn.

#### Core concepts
- Vue làm việc với component, và component trong Vue phần lớn là static.
- Một Vue component định nghĩa các methods, computed, ..., và nó được chia sẻ giữa tất cả các instance của component đó trong toàn bộ ứng dụng. Khi Vue cần sử dụng các methods đối với một instance cụ thể nào đó của component, nó sẽ `apply()`s chúng để lấy đối tượng thích hợp là `this`

#### Reason: Saving Memory
- Rất nhiều frameworks như angular 2, hoặc đôi khi là react sẽ tạo mỗi một instance của một component là một đối tượng riêng biệt.
- Angular 2 là trường hợp tệ nhất, trong đó mọi component là instance của một class, điều này nghĩa là mọi thứ mà component có bên trong sẽ được khởi tạo lại cho mọi component. Tuy nhiên, với mỗi instance của các component, chúng ta chỉ thực sự cần **data** là **riêng biệt**, còn các methods, định nghĩa về computed, watcher, .. vẫn như cũ.
- Vue làm được điều này bằng cách là khai báo data là một **function trả về một object**. Điều đó cho phép các component riêng biệt có các trạng thái riêng của nó (dữ liệu) mà không cần phải khởi tạo lại toàn bộ component. Các **methods**, định nghĩa về **computed**, ..., và các **life cycle hook** chỉ cần một lần tạo ra và lưu trữ, sau đó có thể sử dụng trên mọi instance của component đó.

#### Reason: Static Components
- Vue 2 hoàn toàn bao hàm các ý tưởng về static component nhanh, nhẹ. Chúng không có các trạng thái dữ liệu bên trong và thường được hiển thị một lần hoặc chỉ thay đổi trạng thái bên ngoài. Điều này cho phép các chức năng của component là cưc kỳ nhanh.
- Để tận dụng tính năng này bạn có thể sử dụng v-once để render thuộc tính một lần trong template, hoặc khai báo component hoạt động với `functional: true` trong định nghĩa của nó. 

#### Potential Confusion
- Những người mới sử dụng Vue thường thấy rằng chúng ta khai báo dữ liệu trong data, methods trong methods, thuộc tính tính toán trong computed, ..., tất cả chúng đều được truy cập trên this.thing thay vì sử dụng this.type.thing (ví dụ `this.myMethod()` thay vì `this.methods.myMethod()` )
- Điều này, một lần nữa, là bởi vì các định nghĩa component chỉ đơn giản là định nghĩa mà thôi. Vue cần các định nghĩa về computed, methods, props, data, ... để có thể biết cách xây dựng component, nhưng để thuận tiện, nó ánh xạ chúng đên root của component thay vì các thuộc tính đó

#### Conclusion
- Vue sử dụng khai báo data bằng function trả về một object thay vì một object.
- Các methods, computed, watcher, props, life cycle hook chỉ một lần tạo ra và được lưu trữ lại để dùng chung cho mọi instance của computed.

Rất mong góp ý của các bạn để có thể cải thiện chất lượng bài viết.

Best regards,


-----
Ghé qua blog mình ủng hộ nha, link bài gốc tại đây https://hoangpn.com/p/tai-sao-data-trong-vue-lai-la-function