# console.log
Chắc hẳn phần lớn các bạn 1 khi đã tiếp xúc với Vue.js đều sẽ biết tới 1 chrome extension quan trọng không thể thiếu trong công cuộc debugging là [**Vue.js DevTools**](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd). Đôi khi chúng ta sẽ muốn debug xem những gì đang được hoạt động bên trong template của component và với việc có thể sử dụng JavaScript expression ngay bên trong template thì mình chắc chắn sẽ có nhiều bạn nghĩ ngay tới việc đặt `console.log` vào để kiểm tra giá trị.

```js
<h1>{{ console.log(message) }}</h1>
```

![](https://images.viblo.asia/b3e61e41-d2af-48c2-9975-5d7af7a45eb7.png)

Trường hợp warning này xảy ra là vì những câu lệnh được đặt trong template sẽ được Vue tìm kiếm trong instance, cho nên để pass case này chúng ta có thể tạo 1 method log trong component để Vue có thể tìm thấy.

```js
// component A
// in script
methods: {
    log (message) {
        console.log(message);
    }
}

// in template
{{ log(message) }}
```

Trường hợp debug cùng lúc nhiều component thì việc lặp đi lặp lại đoạn code trên sẽ khá mất thời gian nên chúng ta có thể [thêm thuộc tính cho instance](https://vuejs.org/v2/cookbook/adding-instance-properties.html), sử dụng Vue.prototype để thêm method log rồi sử dụng `$log` trong các component template. Ngoài ra vì `console.log` chỉ có tác dụng print ra console sau đó trả về giá trị `undefined` nên chúng ta có thể sử dụng lazy evaluation với toán tử OR để Vue vẫn có thể render được giá trị lên template.

```js
// main.js
Vue.prototype.$log = console.log;

// in any component's template
<h1>{{ $log(message) || message }}</h1>
```

# debugger
Trường hợp muốn đặt breakpoint để có thể debug trực tiếp trong source thì nhiều bạn sẽ thử cách dưới đây:

```js
<h1>{{ debugger }}</h1>
```

Hành động này sẽ làm cho template không được compile, và chúng ta sẽ thấy trong source chỉ có đoạn code bên dưới thay vì template chúng ta muốn hiển thị.

![](https://images.viblo.asia/8314bc5f-3884-4a76-8781-0c19b35e3084.png)

Nên để cho breakpoint trong template có thể hoạt động chính xác thì cần phải sử dụng đến [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)(Immediately Invoked Function Expression), wrap câu lệnh `debugger` trong `function(){}`.

```js
<h1>{{ (function(){debugger;})() || message }}</h1>
```

Và có thể thấy là breakpoint đã dừng lại đúng vị trí giữa template mà chúng ta mong muốn.

![](https://images.viblo.asia/894c1d2a-1ca7-4586-9056-58263849cb18.png)

Chúng ta còn có thể kiểm tra biến được render ra template bằng cách đem vào trong `function(){}` và đặt ngay sau `debugger`.

```js
<h1>{{ (function(){debugger;message})() || message }}</h1>
```

![](https://images.viblo.asia/520f3313-7857-484c-bdfe-532a0fe3ae00.png)

Tới đây là hết rồi :grinning:. Hy vọng những gì mình viết sẽ giúp ích cho các bạn trong công cuộc debugging Vue template và tiến tới những sản phẩm không còn bug. :100: