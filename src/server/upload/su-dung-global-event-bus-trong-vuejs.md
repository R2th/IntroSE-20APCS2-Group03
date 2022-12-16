Chào các bạn, ở bài viết này mình sẽ chia sẽ cách sử dụng global event bus trong vue.js.

### 1. Global event bus
![](https://images.viblo.asia/c1013480-2942-45d7-9c67-6efa9d4856f9.png)

Trong vue.js, các component tương tác với nhau thông qua một mô hinh gọi là Parent-Child Communication, hiểu đơn giản là props down, events up. Tuy nhiên, như ở hình vẽ trên, nếu bạn muốn truyền dữ liệu từ component C đến component A thì bạn phải emit qua một chuỗi các component (trên hình thì chỉ có component B thôi nhưng thực tế thì có thể là một chuỗi các component) đến component Root, sau đó `props` mới lấy được dữ liệu ở component A, có nhất thiết phải phức tạp như vậy không. Trong thực tế thì chúng ta hay gặp trường hợp các component giao tiếp với nhau mà quan hệ giữa các component này không phải là cha con, đó chính là lý do mà Vuex - một giải pháp quản lý state ra đời.
Với những ứng dụng không quá phức tạp, thì chúng ta có thể sử dụng global event bus để giải quyết vấn đề communicate giữa các component mà không mất quá nhiều time và effort.
### 2. Event bus instantiation
Thực ra thì event bus cũng chỉ là một vue component mà thôi. Nó là một component chuyên dụng mà có thể được sử dụng trong bất kỳ component nào.
```
const EventBus = new Vue()
```
Bây giờ chúng ta sẽ phải đính nó vào Vue global để có thử sử dụng nó ở mọi nơi trong ứng dụng.
```
const EventBus = new Vue()

Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
})
```
### 3. Trigger global event
Bây giờ chúng ta sẽ trigger event trong component
```
export default {
  name: 'my-component',
  methods: {
    triggerMyEvent () {
      this.$bus.$emit('my-event', { ... pass some event data ... })
    }
  }
}
```
Để đơn giản hơn thì bạn có thể viết luôn vào html templete như sau:
```
<div>
  <button @click="$bus.$emit('my-event')">Click to trigger event</button>
</div>
```
### 4. Listen to events
Sau khi chúng ra đã trigger global event thì bây giờ chủng ta có thể lắng nghe ở bất kỳ component nào trong ứng dụng.
```
export default {
  name: 'my-component',
  created () {
    this.$bus.$on('my-event', ($event) => {
      console.log('My event has been triggered', $event)
    })
  }
}
```
Thậm chí chúng ta có thể dử dụng như sau:
```
const EventBus = new Vue({
  created () {
    this.$on('my-event', this.handleMyEvent)
  },
  methods: {
    handleMyEvent ($event) {
      console.log('My event caught in global event bus', $event)
    }
  }
})
```
### 5. Conclude
Trên đây mình đã sơ lượt qua mục đích và cách sử dụng cơ bản về global event bus trong vue.js. Như các bạn cũng đã biết là cái gì global nó cũng tiềm ẩn nguy cơ, và global event bus cũng không phải là ngoại lệ, giá trị mà chúng ta truyền giữa các component có thể bị thay đổi và khó control. Đối với những ứng dụng lớn, khi số lượng component nhiều lên thì để quản lý state một cách hiệu quả bạn nên dùng Vuex( Vuex được cài đặt trên design pattern Flux, bạn cứ hình dùng các thư viện như Vuex hay Redux nó implement Flux pattern gần giống như cách mà các framework khác implement MVC pattern vậy).
Ở bài viết sau mình sẽ giới thiệu đến các bạn về Vuex, rất cảm ơn các bạn đã đọc.