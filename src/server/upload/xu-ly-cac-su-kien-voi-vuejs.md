Khi bạn xây dựng một trang web động với Vue, bạn có thể muốn phản hồi lại các sự kiện. Ví dụ nếu người dùng click vào một button, submit một form, hoặc sự kiện chỉ là di chuyển con chuột, chắc chắn bạn muốn trang web Vue của bạn phản hồi theo một cách nào đó, và bạn cần nắm cơ bản về xử lý sự kiện mình sẽ giới thiệu sau đây
## Xử lý sự kiện với Vue
Bạn có thể chặn một sự kiện bằng cách thêm `v-on` vào phần tử DOM liên quan. Ví dụ bạn muốn xử lý sự kiện click vào phần tử button, bạn chỉ cần thềm vào Vue template như sau:

`<button v-on:click="clickHandler"></button>`

Ở đây ta thêm một *argument* vào v-on, đó là tên xự kiện chúng ta muốn xử lý ở đây là `click`. Sau đó chúng ta thêm một expression với v-on, thông thường sẽ là một phương thức xử lý để xử lý sự kiện, trong trường hợp này chúng ta gọi nó là `clickHandler`. Ở đây với directive `v-on` ta có thể thay thế bằng `@` như thế này:

`<button @click="clickHandler"></button>`

## Các loại sự kiện bạn có thể xử lý

Ngoài `click` Vue còn xử lý nhiều sự kiên DOM khác trên web và trên cả thiết bị di động như:

* submit
* keyup
* drag
* scroll

Và nhiều hơn thế nữa, danh sách các sự kiện DOM phổ biến bạn có thể tham khảo [tại đây](https://en.wikipedia.org/wiki/DOM_events#Common_events).
## Phương thức xử lý sự kiện

Nếu chúng ta liên kết một phương thức với directive `v-on` xử lý sự kiện, ta có thể chạy một số mã tùy chỉnh. Ví dụ đơn giản trong trường hợp này khi click vào button ta sẽ hiển thị một thông bao trong console là 'You clicked the button!', bạn có thể làm vài cái vui hơn như ẩn hiện một element khác, hay tăng một bộ đếm, ...

```
<div id="app">
  <button v-on:click="clickHanlder"></button>
</div>
new Vue({
  el: "#app",
  methods: {
    clickHandler () {
      console.log("You clicked the button!");
    }
  }
})
```

## Event object

Một `event` object sẽ được chuyển đến xử lý sự kiện của bạn, nó mở ra nhiều khả năng hơn cho cách bạn có thể phản ứng với một sự kiện. Object này chứa rất nhiều thuộc tính và phương thức hữu ích như tham chiếu đến phần tử có nguồn gốc sự kiện `event.target `, thời gian sự kiện xảy ra `event.timeStamp`, ...

```
clickHandler (event) {
  console.log(`The button was clicked at ${event.timeStamp}.`);
}
```

Lưu ý rằng đối tượng này được cung cấp bởi API Web gốc chứ không phải Vue, vì vậy nó sẽ là cùng một đối tượng mà bạn tìm thấy trong JavaScript thuần. [Đây](https://developer.mozilla.org/en-US/docs/Web/API/Event) là tài liệu tham khảo event interface để thuận tiện cho bạn.

## Event modifiers

Một pattern phổ biến trong các ứng dụng Javascript là xử lý một form submit bằng cách thủ công hơn là sử dụng chức năng gốc. Để làm điều này, bạn cần sử dụng phương thức `preventDefault` trước khi chạy code sử lý form của bạn, nếu không trang sẽ được chuyển hướng trước khi nó hoàn thành

```
formHandler (event) {
  event.preventDefault();
  // form handling logic
}
```

Thay vì làm điều này bằng tay trong xử lý của bạn, Vue cung cấp một event *modifier* để làm trực tiếp từ template, một *modifier* sẽ được thêm sau dấu `.` trong directive

```
<form @submit.prevent="formHandler"></form>
```

Vue cung cấp một số *modifier* sự kiện khác nhau hữu ích trong các tình huống xử lý sự kiện phổ biến:

* .stop
* .prevent
* .capture
* .self
* .once
* .passive

## Custom events

Đến bây giờ, chúng ta đã nói đến xử lý các sự kiện *native*. Tuy nhiên Vue là một framework dựa trên component, và chúng ta cũng có thể làm cho component của chúng ta phát ra sự kiện. Để component con truyền dữ liệu sang component cha chúng ta không thể dùng props.
```
ParentComponent
 |
 | (Dữ liệu được truyền thông qua props, và không có chiều ngược lại)  
 v 
ChildComponent
```

Giải pháp là để component con emit ra một sự kiện và component cha lắng nghe nó, để làm điều này dùng `this.$emit("my-event")` từ component con khi bạn muốn sự kiện được emit. Ví dụ chúng ta có một component là *DialogComponent* cần thông báo cho component cha *MainPage* rằng dialog đã đóng

**DialogComponent**

```
export default {
  methods: {
    onClose() {
      this.$emit("dialog-closed");
    }
  }
};
```
Component cha sau đó sẽ xử lý sự kiện giống như cách xử lý sự kiện đã trình bày ở trên

**MainPage**

```
<div>
  <dialog-component @dialog-closed="eventHandler" />
</div>
```

Bạn cũng có thể gửi dữ liệu trong sự kiện tùy chỉnh và có thể nhận được trong phương thức xử lý:

**DialogComponent**

```
onClose() {
  this.$emit("dialog-closed", { time: Date.now() });
}
```

**MainPage**

```
eventHandler (event, { time }) {
  console.log(`Dialog was closed at ${time}`);
}
```
## Event bus
Như chúng tôi đã thấy ở trên, component con có thể gởi một sự kiện qua component cha. Tuy nhiên nếu bạn muốn một component có thể gởi một sự kiện sang bất kỳ component nào chúng ta có thể sử dụng một pattern là *event bus*. 

Đầu tiên ta tạo và export một Vue instance trong một module file

**eventBus.js**

```
import Vue from "vue";
export default new Vue();
```
Tiếp theo ta sẽ import the bus vào component nơi mà bạn muốn phát ra sự kiện. Bạn có thể sử dụng phương thức `$emit` của bus Vue instance của bạn.
```
import eventBus from "./eventBus";
export default {
  ...
  methods: {
    myMethod () {
      eventBus.$emit("my-event")
    }
  }
}
```
Cuối cùng import bus vào component nơi mà bạn muốn lắng nghe sự kiện. Bạn nên thiết lập một trình nghe ở đâu đó trong mã của bạn. Tôi gợi ý bạn nên dùng ở một lifecycle hook như `created` 

Điều này được thực hiện bởi phương thức `$on` của bus với hai arguments là sự kiện bạn lắng nghe và một callback

```
import eventBus from "./eventBus";
export default {
  ...
  created () {
    eventBus.$on("my-event", () => {
      console.log("my-event called on global event bus");
    });
  }
}
```
Và đây là một cách bạn chia sẻ dữ liệu giữa bất kỳ component nào trong app. Một giải pháp mở rộng hơn là dùng Vuex bạn có thể tham khảo [tại đây](https://vuex.vuejs.org/guide/).