## Bài toán

Giả sử chúng ta có công thức tính tổng số tiền dựa vào  số lượng và giá của sản phẩm như sau:
```js
let price = 5
let quantity = 2
let total = price * quantity // = 10
```
Nếu chúng ta thay đổi giá của sản phầm
```js
price = 20
console.log(total) // 10
```
Thì lúc này `total` vẫn bằng 10. Bởi vì đó là cách mà `javascript` hoạt động. 

Vậy có cách nào để làm giá trị của `total` này trở nên `reactive`. Tức là giá trị của nó sẽ thay đổi dựa vào `price` và `quantity`?  Chúng ta hãy cùng xem tiếp bài viết nhé <3

## Lời giải

Mình sẽ đặt phép tính `total` ở trên trong một hàm và tạm gọi nó là một `effect`

```js
const effect = () => {
    total = price * quantity
}
```

Như vậy, để giải quyết bài toán trên, chúng ta sẽ tìm cách chạy lại hàm `effect` này mỗi khi `price` và `quantity` thay đổi.

Và để làm được điều đó, chúng ta sẽ định nghĩa `price` và `quantity` trong một `object`. Kiểu như sau:
```js
const state = {
    price: 5,
    quantity: 2
}
```
Và `effect` của chúng ta sẽ trở thành
```js
let effect = () => {
    total = state.price * state.quantity
}
```
Tiếp theo chúng ta sẽ lặp qua từng `property` trong `state` object và sử dụng `Object.defineProperty` để định nghĩa lại `getter` và  `setter` cho `state` như sau:
```js
Object.keys(state).forEach(key => {
    let internalValue = state[key] // Phải khởi tạo biến này với let
    Object.defineProperty(state, key, {
        get() {
            return internalValue;
        },
        set(newValue) {
            internalValue = newValue;
            effect(); // lúc thay đổi giá trị sẽ chạy lại effect
        }
    })
})
```
Như vậy, khi chúng ta gán giá trị `state.price = 10` chẳng hạn thì nó sẽ chạy lại hàm `effect`. 

![](https://images.viblo.asia/ef7a31c8-51ac-4bb6-a8df-9e3cbee882cb.PNG)

Và thế là `total` được update!

Hơn nữa, chúng ta có thể tạo ra một hàm để sử dụng lại cho các object khác như sau:
```js
const reactive = data => {
    let newData = {...data};
    Object.keys(newData).forEach(key => {
        let internalValue = newData[key]
        Object.defineProperty(newData, key, {
            get() {
                return internalValue;
            },
            set(newValue) {
                internalValue = newValue;
                effect();
            }
        })
    })
    return newData;
}
```
Và `state` của chúng ta sẽ như sau:
```js
const state = reactive({
    price: 5,
    quantity: 2
})
```

OK, ngon lành rồi.

Mà khoan, xong rồi sao. Sao chưa thấy nói gì đến `Proxy` ?

Đây!. Với `Proxy` chúng ta có thể định nghĩa lại hàm `reactive` một cách ngắn gọn hơn như sau:
```js
const reactive = data => {
    return new Proxy(data, {
        get(target, key, receiver) {
            return target[key]
        },
        set(target, key, value, receiver) {
            target[key] = value;
            effect()
        }
    })
}
```

Và nếu dùng `Reflect`:
```js
const reactive = data => {
    return new Proxy(data, {
        get(target, key, receiver) {
            return Reflect.get(...arguments) // arguments trong mỗi function đều có mn nhé :) 
        },
        set(target, key, value, receiver) {
            Reflect.set(...arguments)
            effect()
        }
    })
}
```

Bây giờ nếu khởi tạo `state` bằng `reactive`, chúng ta sẽ thu được một `Proxy` như sau:

![](https://images.viblo.asia/bd8fe5fd-598d-41a1-9c9a-70262793946e.PNG)

OK, xịn xò. 

Thật ra `Proxy` không chỉ giúp cho code của chúng ta ngắn gọn hơn mà còn giúp trong việc xử lý `reactive` với array,...

Ở bài viết này, mình chỉ giới thiệu khái quát một phần về `reactive`. Chúng ta có thể thấy `effect` trong thực tế cũng phải được lưu lại và tính toán như thế nào đó để có thể sử dụng nhiều `effect` cùng lúc. 

Bài viết đến đây thôi, thật ra mình cũng không hiểu lắm đâu. Các bạn có thể tìm hiểu kỹ hơn ở link bên dưới nhé. Chúc các bạn thành công <3

## Tài liệu tham khảo 
https://www.vuemastery.com/courses/vue-3-reactivity/vue3-reactivity
https://www.vuemastery.com/courses/advanced-components/build-a-reactivity-system