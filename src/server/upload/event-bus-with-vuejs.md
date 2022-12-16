# `Event Bus with Vue.js`
Đã bao giờ bạn hay gặp phải vấn đề giao tiếp, xử lý callback giữa các component, container mà không phải là cha con, bà cháu hay chỉ là anh em cùng cha khác ông nội chưa?<Br>
Event Bus hay còn là publish - subscribe pattern, mặc dù có một vài điểm chưa tốt, nhưng đây vẫn là một pattern tuyệt vời để giải quyết vấn đề giao tiếp giữa các component mà chẳng mấy họ hàng với nhau mà đôi khi bài toàn ứng dụng ta thỉnh thoảng gặp phải. Một vài library đã giúp ta implement pattern này nhưng với Vue, tại sao không thử tận dụng luôn sức mạnh của chính thư viện này.
![](https://images.viblo.asia/e1243c89-c922-41cb-b7a3-4b4541a34d36.jpg)

## Initialize
Bạn nên thực hiện hết sức cẩn thận vì việc setup này hết sức "phức tạp". `app/EventBus.js`
```js
import Vue from 'vue'
const EventBus = new Vue()
export default EventBus
```
Done. Pattern đã được thực hiện. Đó là tất cả những vì bạn phải làm. EventBus đơn giản chỉ là một instance của chính vue, thừa kế các method mà Vue đã cung cấp. Rất nhẹ và linh hoạt
## Sending Event
Tại một button nào đó trong app, sẽ là nơi để kick hoạt ra event. Import EventBus vào và dùng $emit của Vue để gửi đi event và các param mong muốn.
```js
<script>
import EventBus from './EventBus'

export default {
  methods: {
    emitGlobalClickEvent() {
      // Send the event on a channel (hello) with a payload
      EventBus.$emit('hello', 'i hear you');
    }
  }
}
```
Giờ thì chắc hẳn bạn đã biết tại sao tên của param thứ của $emit lại được gọi là payload rồi đó. Awesome!
## Listening Event
Tại một component bất kỳ mà bạn mong muốn, import EventBus và sử dụng $on để lắng nghe sự kiện. Để tránh memory leak đừng quên $off để ngừng listen hay sử dụng $once tùy mục đích hướng tới.
```js
import EventBus from './EventBus'

export default {
  created() {
    // Listening the event hello
    EventBus.$on('hello', this.handler);
  },
  destroyed() {
    // Stop listening the event hello with handler
    EventBus.$off('hello', this.handler);
  },
  methods: {
    handler(e) {
      alert('recieved: ', e)
    }
  },
}
```
## Conclusion
Trên đây là toàn bộ implement EventBus nhanh chóng trên Vue. Còn rất nhiều thứ hay ho thú vị mà Vue đã cung cấp
Bonus: no need import EventBus
```js
import Vue from 'vue'
const EventBus = new Vue()
Vue.prototype.$eventBus = EventBus
```

### `References`
1. https://alligator.io/vuejs/global-event-bus/
2. https://medium.com/@soffritti.pierfrancesco/create-a-simple-event-bus-in-javascript-8aa0370b3969