Chào các bạn, lại là mình đây, dạo này dự án đang code Vue thì mình lại làm một bài chia sẻ về một số điểm kiến thức về Vue nhá.
Khi các bạn build một `dynamic` website với Vue thì rất có thể bạn sẽ muốn các thêm, sửa, xóa, mở dialog, đóng dialog, vân vân và mây mây. Ví dụ như nếu bạn click vào một cái button để submit form hay sự kiện di chuyển chuột chẳng hạn, bạn muốn website có thể respond một vài thứ gì đó ví như hiện confirm, hay là hover hiện dòng chữ lên. Vậy bài viết hôm nay mình sẽ nói về các cách xử lý sự kiện(events) trong Vue nhé.
![](https://images.viblo.asia/d85b3f4b-de8a-4b6c-b1f9-d4428cee412e.png)

# Xử lý events trong Vue
Ví dụ như mình có thể chặn sự kiện bằng cách thêm `v-on` directive vào DOM element. Đại khái là mình muốn xử lý sự kiện click vào button element thì chúng ta có thể thêm như sau
```javascript
<button v-on:click="handleSubmit"></button>
```

Chú ý chúng ta add thêm tham số sau `v-on` directive , cái này sẽ bảo với Vue đây là tên loại sự kiện mà chúng ta muốn xử lý, trong trường hợp trên nó là sự kiện `click`.

Sau đó mình sẽ bind method xử lý sự kiện click này, trong trưởng hợp này nó là `handleSubmit`.

Chú ý : `v-on` directive còn có thể viết gọn hơn bằng cú pháp `@` như sau:
```javascript
<button @click="handleSubmit"></button>
```
# Các dạng events handle
Bên cạnh `click` event vậy những DOM events khác có thể được xử lý như nào trong Vue? Câu hỏi đặt ra chắc hẳn sẽ có câu trả lời thôi : Vue có thể xử lý bất kỳ dạng web hay mobile native event nào cũng như các `custom event` bao gồm như sau:
* submit
* keyup
* drag
* scroll

Các bạn có thể tham khảo list các DOM Event [phổ biến](https://en.wikipedia.org/wiki/DOM_events#Common_events) ở đây nhé mình chỉ liệt kê một số ở trên.

# Phương thức Event Handling
Nếu chúng ta bind một phương thức vào sau tên sự kiện thì chúng ta có thể chạy những mã code mà bạn viết trong phương đó.

Ví dụ, đơn giản như bạn muốn in ra một message console thì các bạn cũng có thể làm như sau
```javascript
<template>
    <button v-on:click="handleSubmit"></button>
</template>

<script>
    export default {
        methods: {
            handleSubmit () {
              console.log("You clicked the button!");
            }
        }
    }
</script>
```

# Cách dùng Event Object
Như các bạn đã biết, khi xảy ra một sự kiện thì javascript sẽ tạo ra một `event` object, nó chứa các thông tin liên quan đến event có thể như vị trí chuột so với trình duyệt, vị trí chuột so với phần tử hiện tại phát ra sự kiện. Ở trong Vue thì khi chúng ta sử dụng các directive thì auto object này đã được pass vào trong hàm xử lý sự kiện để dùng.

```javascript
handleSubmit (event) {
  console.log(`The button was clicked at ${event.timeStamp}.`);
}
```

# Event Modifiers
Mình sẽ ví dụ trước nhé : ví dụ khi bạn thực hiện submit trong form thì thường các phương thức gửi form sẽ redirect trước khi chạy các mã code trong `event handling method`. Để ngăn cản chuyển này xảy ra thì chúng ta sẽ xử lý như sau trong `event handling method`:
```javascript
handleSubmit (event) {
  event.preventDefault();
}
```

Vue cung cấp cho chúng ta những `event modifier` với các directive. 
```javascript
<form @submit.prevent="handleSubmit"></form>
```
Vue cho chúng ta một số các `event modifier` có thể xử lý trong nhiều tình huống khác nhau
* `.stop`
* `.prevent`
* `.capture`
* `.self`
* `.once`
* `.passive`

# Custom events
Như chúng ta đã biết thì Vue được thiết kế theo hướng `component`, chính vì thế liệu chúng ta có thể làm cho một component emit ra event của chính nó hay không? Câu trả lời là hoàn toàn có thể,. 

Ví dụ như chúng ta muốn một component con send data lên component cha chẳng hạn. Ở đây chúng ta không thể sử dụng props được bởi vì chỉ được truyền từ cha xuống con, nếu bạn cố tình thay đổi data đó trong component con thì sẽ báo lỗi `avoid` nhá. Vậy làm cách nào mà component con có thể bảo với component cha để component cha có thể thay đổi data đó.

Để làm điều nay, chúng ta sẽ gọi `this.$emit("my-event")` từ component con khi chúng ta muốn kích hoạt event nào đó để thay đổi data của cha truyền xuống con. Ví dụ, chúng ta muốn tăng lên một đơn vị của counter thì chúng ta sẽ làm như sau:
**ParentComponent**
```javascript
<template>
    <div>
        <child-component @increase="handleEvent" :counter="counter" />
    </div>
</template>
<script>
    export default {
        data() {
            return {
                counter: 1,
            }
        },
        methods: {
            handleEvent() {
                this.counter += 1;
            }
        }
    }
</script>
```

**ChildComponent**
```javascript
<template>
    <div>
        <p>{{ counter }}</p>
        <button @click="increase">Increase</button>
    </div>
</template>

<script>
    export default {
        props: {
            counter: Number,
        },
        methods: {
            increase() {
                this.$emit("increase");
            }
        },
    };
</script>
```
# Event bus
Như các bạn đã xem ở trên thì component con có thể emit event lên component cha. Nhưng nếu mà chúng ta muốn component con đó emit lên bất cứ component nào ví dụ như component ông, component cụ, kị chẳng hạn,... 

Để làm được điều này thì các bạn có thể sử dụng `event bus`. Đây là nơi mà chúng ta tạo một instance Vue để có thể gọi đến event ở bất cứ component nào mà import nó. Các bạn cứ hiểu nó là phương tiện để giúp component có thế thực hiện emit lên bất cứ component mà import.

Đầu tiên các bạn tạo một file js trong một folder bất kỳ trong project của bạn với nội dung như sau
**eventBus.js**
```javascript
import Vue from "vue";
export default new Vue();
```

Bước tiếp theo là import file này vào component nào mà bạn muốn emit event. Bạn có thể sử dụng `$emit` method 
```javascript
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

Cuối cùng import file js này vào component mà có thể lăng nghe sự kiện này khi component con kia nó emit để có thể bắt được. Mình thì suggest các bạn sử dụng lifecycle hook `created` bởi vì bạn có thể access Vue instance của component ở đây. Và tiếp sau đó bạn sử dụng `$on` method của bus để lắng nghe sự : tham số đầu tiên là tên event, tham số thứ 2 là callback của nó.
```javascript
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

Đây chính là cách mà mà các component có thể chia sẻ data cho nhau. Các bạn cũng có thể tham khảo thêm Vuex nhé.
# Kết luận
Vậy qua một vài chia sẻ của mình ở trên thì mong rằng các bạn cũng hiểu một phần nào về event và các cách xử lý event trong Vue. Cảm ơn các bạn đã đọc bài viết của mình.
# Tham chiếu
https://vuejs.org/v2/guide/events.html