# 1 Component là gì 
> Component là một trong những tính năng quan trọng nhất trong Vue mà mình cần phải biết. Nó giúp cho việc kế thừa các thành phần HTML cơ bản, dễ dàng đóng gói và tái sử dụng code. Ở mức cao hơn thì component như là custom elements mà trình biên dịch của Vue sẽ gắn các xử lý vào đó. 
# 2 Giao tiếp giữa các component
Khi chúng ta làm một project nào đó, chắc hẳn sẽ tạo ra rất nhiều các component và các component này cũng có thể có mối quan hệ với nhau, chẳng hạn : component này là cha của componet kia, 2 component có cùng cha với nhau, ... hoặc cũng chả  có mối quan hệ nào cả. Vậy thì chúng có thể giao tiếp với nhau như thế nào?

Sau đây mình xin trình bày 2 loại giao tiếp giữa các component với nhau
# 2.1 Giao tiếp giữa component cha và con
Khi mà các component có quan hệ cha con, tức là component cha sử dụng lại component con. Với mối quan hệ này, bạn chỉ cần ghi nhớ một câu “prop down emit up”. Tức là khi component con muốn nhận dữ liệu từ cha của mình thì thằng cha cần prop giá trị xuống cho con, còn thằng cha mà muốn nhận dữ liệu từ con truyền lên thì thằng con cần phải emit event
![](https://images.viblo.asia/da1269bf-51b7-4b88-8f68-3ed9cca24bef.png)
## 2.1.1 Prop dữ liệu từ cha xuống con
Mỗi component instance đều có một scope riêng của nó, nghĩa là mình không thể và cũng không nên trực tiếp gọi tới parent data trong child component template. Data có thể gửi xuống từ compoent cha thông qua một custom attribute là props. Ví dụ mình sẽ truyền data name từ component cha component-a xuống component-b. Sử dụng props trong child component (component-b.vue).

Trong đó  component-a, component-b với nội dung lần lượt như sau:
```js
// component-a
<template>
  <div>Component A</div>
  <component-b :name="name"></component-b>
</template>
<script>
export default {
  data() {
    return {
        name: 'component-a',
    }
  },
  methods: {
  }
}
</script>
```
```js
// component-b
<template>
  // khi này component-b lấy được giá trị name của commpoent-a prop xuống
  <div>{{ name }}</div>
</template>
<script>
export default {
  prop: ['name'],
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>
```
## 2.1.2 Emit event từ con lên cha
Trong component-b với nội dung như sau:
```js
// component-b
<template>
  <button @click="selectComponentB"></button>
  <div>{{ name }}</div>
</template>
<script>
export default {
  prop: ['name'],
  data() {
    return {
    }
  },
  methods: {
      selectComponentB: function() {
          // phát ra sự kiện 'selectedComponentB' với data là 'component-b đã được chọn'
          this.$emit('selectedComponentB', 'component-b đã được chọn');
      }
  }
}
</script>
```
Khi đó component-a sẽ lắng nghe sự kiện mà component-b phát đi
```js
// component-a
<template>
  <div>Component A</div>
  // lắng nghe sự kiện 'selectedComponentB' phát ra từ component-b và xử lý nó với function 'handleEvent' 
  <component-b :name="name" @selectedComponentB="handleEvent"></component-b>
</template>
<script>
export default {
  data() {
    return {
        name: 'component-a',
    }
  },
  methods: {
      handleEvent: function(data) {
          // in ra data từ component-b gửi lên
          console.log(data);
      }
  }
}
</script>
```
# 2.2  Giao tiếp giữa các component không có quan hệ
Trong ứng dụng không phải lúc nào quan hệ giữa các component cũng là quan hệ cha con, có khi hai component ngang hàng nhau cũng cần có sự giao tiếp với nhau. Khi các component không có quan hệ với nhau, ta có thể sử dụng pattern event bus. 

Đầu tiên, chúng ta cần tạo ra event bus và export nó để các module khác hoặc component khác có thể sử dụng lại.

Tạo một file event-bus.js với nội dung:
```js
import Vue from 'vue';
export const EventBus = new Vue();
```
Nội dung của file này là tạo ra một module, nó import Vue và export instance (EventBus) để sử dụng trong các component. Mỗi component sẽ có thể gửi đi một sự kiện và component khác có thể lắng nghe sự kiện thông qua event bus. Mình sẽ lấy ví dụ minh họa về cách thức hoạt động
## 2.2.1 Gửi đi một sự kiện
Tạo component-a với nội dung sau (tạo file component-a.js):
```js
<template>
  <div @click="emitMethod">Component A</div>
</template>
<script>
// import EventBus tạo ở trên
import { EventBus } from './event-bus.js';

export default {
  data() {
    return {
      clickCount: 0
    }
  },
  methods: {
    emitMethod() {
      console.log('Component A gửi đi một sự kiện vào event bus chung');
      // Sử dụng phương thức $emit để gửi sự kiện vào bus chung
      EventBus.$emit('component-a-clicked', this.clickCount);
    }
  }
}
</script>
```
## 2.2.2 Nhận một sự kiện
Tiếp theo, component-b còn lại sẽ lắng nghe sự kiện component-a phát ra bằng cách sử dụng phương thức $on trên EventBus instance: EventBus.$on(channel: string, callback(payload1,…)).

Tạo file component-b.js với nội dung:
```js
// Import EventBus.
import { EventBus } from './event-bus.js';

// Lắng nghe component-a-clicked từ component-a
EventBus.$on('component-a-clicked', clickCount => {
  console.log('Nhận được ${clickCount} click từ component A')
});
```
Như vậy, khi sử dụng các component-a, component-b trong một ứng dụng (tạo file app.js), khi đó hai component-a và component-b đã giao tiếp với nhau:
```js
import Vue from 'vue';
import ComponentA form './component-a'
import ComponentB form './component-b';

new Vue({
  el: "#app",
  components: {
    ComponentA,
    ComponentB
  }
});
```
# 3 Kết luận
Component là khái niệm quan trọng trong Vue.js nó giúp mô đun hóa các ứng dụng lớn. 

Các component có thể giao tiếp với nhau với cả mô hình component cha con và mô hình component ngang hàng
# 4 Tài liệu tham khảo
https://vuejs.org/v2/guide/components-custom-events.html

https://vuejs.org/v2/guide/components.html