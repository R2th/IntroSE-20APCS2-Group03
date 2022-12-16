Xin chào mọi người, hôm này mình trở lại với một bài viết nhỏ về Vuejs, là một framework lớn vì thế có rất nhiều thứ đáng để chia sẻ. Vì vậy mình chỉ xin giới thiệu một phần nhỏ liên quan về Vuejs, đó là Virtual DOM. Nếu các bạn đã từng làm việc với các framework Js khác thì chắc sẽ không lạ lẫm với Virtual DOM nữa, chúng ta bắt đầu thôi.

![](https://images.viblo.asia/06cb0e92-44e1-4bbd-8950-44c512ccca78.png)

Với Vue 2.0, tất cả đều hoạt động trong Virtual DOM. Thậm chí HTML mà chúng ta viết trong template của Vue Component sẽ được biên dịch thành Virtual DOM khi component được render. Trên thực tế, Vue có một API compiler dùng để biên dịch chuyển đổi code HTML thành Virtual DOM một cách tự động.

```js
> var res = Vue.compile('<div><span>{{ msg }}</span></div>')
> res.render
ƒ anonymous() {
  with(this){ return _c('div',[_c('span',[_v(_s(msg))])]) }
}
```

HTML template được biên dịch bên trong theo cách này. Mỗi khi bạn cập nhập dữ liệu trong Vue, hàm render được gọi để lấy  Virtual DOM với dữ liệu mới nhất được cập nhập. Trong ví dụ này, `msg` sẽ được thay thế thành giá trị hiện tại của dữ liệu.

### Quá trình render
Vue có một quy trình dài trước khi DOM được render với Virtual DOM. Trong phần tiếp theo, chúng ta sẽ cùng nhau tìm hiểu 4 bước cơ bản hoạt động bên trong Vue (defineProperty, Watch, Queue, và nextTick).

Đầu tiên, Vue sẽ sử dụng defineProperty để định nghĩa setter và getter cho mỗi phần tử dữ liệu bên trong Component. Mỗi lần bạn cập nhập dữ liệu trong các phương thức, defineProperty đang được gọi. Ví dụ hãy thử mở trình duyệt Chrome hoặc Firefox console và thử như sau:

```js
> var obj = {};
> Object.defineProperty(obj, "text", {
   get: function() {
     return text + "get";
   },
   set: function (newText) {
     text = newText + "set";
   }
  });
> obj.text = "text";
"text"
> obj.text
"textsetget"
```

Trong đoạn code này, hàm set được gọi khi bạn cập nhập thuộc tính obj.text. Điều này nghĩa rằng nó sẽ lưu “textset” như một thuộc tính. Nếu sử dụng logic tương tự khi đọc thuộc tính obj.text, thì chúng ta thấy rằng nó sẽ gọi hàm get. Vue sử dụng cơ chế tương tự để lắng nghe khi có dữ liệu cập nhập.

Vue sẽ xử lý như thế nào khi chúng ta gọi hàm set. Nó sẽ thông báo đến các object Watcher bên trong Virtual DOM của Vue. Một Watcher được tạo cho mỗi Component khi một ứng dụng Vue được khởi tạo. Vai trò của Watcher là cập nhập Virtual DOM và DOM thật. Tuy nhiên Watcher không cập nhập từng DOM ngay sau khi được thông báo.

Khi các Watcher được thông báo bằng các hàm setter, Watcher đã cho sẽ tự thêm nó vào trong một Queue. Vue sử dụng Queue để tránh việc chạy cùng một Watcher nhiều lần.

Một ví dụ mà chúng ta có thể thấy khi dữ liệu của chúng ta có nhiều thuộc tính được gọi là message và title. Điều gì xảy ra nếu message và title được cập nhập cùng một lúc? Component được cập nhập 2 lần là không hiệu quả. Để tránh việc không hiệu quả này, Watcher được thêm vào trong Queue, sau đó được sắp xếp theo thứ tự cụ thể khi nó được sử dụng. Ví dụ về thứ tự như là Component cha rồi đến Component con, trong suốt quá trình này, các Watcher trùng lặp sẽ bị xoá đi khỏi Queue của Vue.

![](https://images.viblo.asia/ced6dcef-908e-4054-b24d-8db564d47e60.png)


Ngoài ra bạn cần nhớ là nextTick API. Đây là một hàm của Vue xử lý và đẩy tất cả các Watcher bên trong queue ra. Một khi tất cả các Watcher đã được xử lý và đẩy ra, DOM sẽ được cập nhập trong hàm run() của Watcher. API được gọi một cách tự động bởi Vue nên bạn sẽ không cần quan tâm đễn xử lý này. Tuy nhiên thì bạn vẫn có thể tự gọi hàm run().

Cuối cùng là phần render Virtual DOM và DOM thật cùng nhau. Điều này diễn ra bên trong hàm run(), được lưu trữ trong mỗi object Watcher. Hàm này cập nhập DOM của Component với Virtual DOM – cuối cùng đồng nhất cả 2 và tạo ra một ứng dụng Vue tuyệt vời.

### Tổng kết
- Bài chia sẻ khá nhiều chữ hi vọng các bạn "chịu khó đọc" :D, cám ơn các bạn đã theo dõi,
- Nguồn: [Medium](https://medium.com/@koheimikami/understanding-rendering-process-with-virtual-dom-in-vue-js-a6e602811782)