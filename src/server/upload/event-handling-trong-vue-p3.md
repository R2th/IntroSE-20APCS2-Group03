Như ở bài trước chúng ta đã render ra được list users. Bây giờ ta muốn thêm 1 user vào list user, làm như nào chúng t cùng đi vào tìm hiểu ở dưới đây.
## Event Handling

###  Listen to Events
Trong Vue.js chúng ta có thể dùng directive v-on để lắng nghe các sự kiện DOM và thực thi JavaScript khi những sự kiện này được kích hoạt. 

Ví dụ: Lắng nghe sự kiện click trên DOM.
```vue
<div id="app">
    <button v-on:click="counter++">Click</button>
    <p>Click vào button lần thứ {{ counter }}</p>
</div>
<script src="https://unpkg.com/vue@2.4.2" type="text/javascript"></script>
<script type="text/javascript">
    var app = new Vue({
        el: '#app',
        data: {
            counter: 0,
        }
    });
</script>
```
Kết quả: 
![](https://images.viblo.asia/dcf2304b-2ba3-46c3-b8ed-b5a8b755a748.PNG)
v-on:click trong đoạn code phía trên tương đương với onClick attribute trên HTML
Các sự kiện có thể dùng đến như:
* click
* hover
* mouserover
* scroll
* drop
* ...

Bạn có thẻ tham khảo list Dom event[ tại đây](https://en.wikipedia.org/wiki/DOM_events#Common_events)

### Phương thức Event Handling
Nếu chúng ta bind một phương thức vào sau tên sự kiện thì chúng ta có thể chạy những mã code mà bạn viết trong phương đó.

Ví dụ, đơn giản như bạn muốn in ra một message console thì các bạn cũng có thể làm như sau:
```vue
<div class="container mt-4" id="app">
      <button v-on:click="handleSubmit">Xin chào</button>
    </div>
    <script src="https://unpkg.com/vue@2.4.2" type="text/javascript"></script>
    <script type="text/javascript">
      var app = new Vue({
        el: "#app",
        data: {
          counter: 0,
        },
        methods: {
          handleSubmithandleSubmit() {
            console.log("Xin chào mọi người");
          },
        },
      });
    </script>
 ```
 ![](https://images.viblo.asia/b7b4e675-52e8-40bf-9f9b-66752b6ef4d9.PNG)
* Cách dùng Event Object
Như các bạn đã biết, khi xảy ra một sự kiện thì javascript sẽ tạo ra một event object, nó chứa các thông tin liên quan đến event có thể như vị trí chuột so với trình duyệt, vị trí chuột so với phần tử hiện tại phát ra sự kiện. Ở trong Vue thì khi chúng ta sử dụng các directive thì auto object này đã được pass vào trong hàm xử lý sự kiện để dùng.
```
handleSubmit (event) {
  console.log(`The button was clicked at ${event.timeStamp}.`);
}
```
Event Modifiers
Ví dụ khi bạn thực hiện submit trong form thì thường các phương thức gửi form sẽ redirect trước khi chạy các mã code trong event handling method. Để ngăn cản chuyển này xảy ra thì chúng ta sẽ xử lý như sau trong event handling method:

```
handleSubmit (event) {
  event.preventDefault();
}
```
Vue cung cấp cho chúng ta những event modifier với các directive.
```
<form @submit.prevent="handleSubmit"></form>
```
Một số các event modifier có thể xử lý trong nhiều tình huống khác nhau
* .stop
* .prevent
* .capture
* .self
* .once
* .passive
## Custom events
Vue được thiết kế theo hướng component, chính vì thế liệu chúng ta có thể làm cho một component emit ra event của chính nó hay không? Câu trả lời là hoàn toàn có thể,.

Ví dụ như chúng ta muốn một component con send data lên component cha chẳng hạn. Ở đây chúng ta không thể sử dụng props được bởi props vì chỉ được từ cha xuống con, nếu bạn cố tình thay đổi data đó trong component con thì sẽ báo lỗi avoid . Vậy làm cách nào mà component con có thể bảo với component cha để component cha có thể thay đổi data đó.

Để làm điều nay, chúng ta sẽ gọi this.$emit("my-event") từ component con khi chúng ta muốn kích hoạt event nào đó để thay đổi data của cha truyền xuống con. Ví dụ, chúng ta muốn tăng lên một đơn vị của counter thì chúng ta sẽ làm như sau:
### ParentComponent
```
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
### ChildComponent
```
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
## Event bus
Như các bạn đã xem ở trên thì component con có thể emit event lên component cha. Nhưng nếu mà chúng ta muốn component con đó emit lên bất cứ component nào
Để làm được điều này thì các bạn có thể sử dụng event bus. Đây là nơi mà chúng ta tạo một instance Vue để có thể gọi đến event ở bất cứ component nào mà import nó. Các bạn cứ hiểu nó là phương tiện để giúp component có thế thực hiện emit lên bất cứ component mà import.

Đầu tiên các bạn tạo một file js trong một folder bất kỳ trong project của bạn với nội dung như sau 

eventBus.js
```
import Vue from "vue";
export default new Vue();
```

Header.vue
```
<template>
  <div class="header ">
    <div class="m-auto">
      <button @click="myMethod">Call method</button>
    </div>
  </div>
</template>
<script>
import eventBus from "./../assets/js/eventBus";
export default {
  name: "CompHeader",
  methods: {
    myMethod() {
      var data = {
        title:'push data event bus'
      }
      eventBus.$emit("my-event",data);
    }
  }
};
</script>
```
Cuối cùng import file js này vào component mà có thể lăng nghe sự kiện này khi component con kia nó emit để có thể bắt được. Mình thì suggest các bạn sử dụng lifecycle hook created bởi vì bạn có thể access Vue instance của component ở đây. Và tiếp sau đó bạn sử dụng $on method của bus để lắng nghe sự : tham số đầu tiên là tên event, tham số thứ 2 là callback của nó.

File handle event
```
<template>
  <div class="hello">
   
    <Header />
  </div>
</template>
<script>
import Header from "./Header.vue";
import eventBus from "./../assets/js/eventBus";

export default {
  name: "HelloWorld",
  components: {
    Header,
    ComponentA
  },
   created() {
    eventBus.$on("my-event", (data) => {
      console.log("my-event called on global event bus "+data.title);
    });
  },
```
Đây chính là cách mà mà các component có thể chia sẻ data cho nhau. Các bạn cũng có thể tham khảo thêm Vuex nhé.
Kết luận
Các bạn cũng hiểu một phần nào về event và các cách xử lý event trong Vue.